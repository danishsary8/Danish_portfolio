import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import {
  buildContents,
  detectVisitorMode,
  findInstantAnswer,
  findLocalAnswer,
  generateFollowUps,
  localChunks,
  MODEL_CHAIN,
  parseSseEvent,
  previousReplyEdges,
  splitChips,
  streamJarvisResponse,
  visibleText,
} from "@/services/jarvisApi";
import {
  FOLLOW_UP_SUGGESTIONS,
  JARVIS_SYSTEM_PROMPT,
  LOCAL_FALLBACK_QA,
  PLAYBOOK_SIZE,
} from "@/data/jarvisKnowledge";
import {
  JarvisMarkdown,
  parseBlocks,
  stabilizeStreaming,
} from "@/components/jarvis/JarvisMarkdown";
import { nextUnitEnd, safeCut, wordsPerSecond } from "@/components/JarvisChat";
import { ChatbotWidget } from "@/components/site/ChatbotWidget";

type Msg = { sender: "user" | "bot"; text: string; kind?: string; followUps?: string[] };
type StreamEvent =
  | { type: "chunk"; delta: string; text: string; source: string }
  | {
      type: "done";
      result: {
        text: string;
        source: string;
        model: string | null;
        followUps: string[];
        showContactCard: boolean;
      };
    };

/** A fake Gemini SSE response that sends `pieces` as separate chunks. */
function sse(pieces: string[], delayMs = 5) {
  const enc = new TextEncoder();
  const body = new ReadableStream({
    async start(ctrl) {
      for (const p of pieces) {
        await new Promise((r) => setTimeout(r, delayMs));
        const ev = { candidates: [{ content: { parts: [{ text: p }] } }] };
        ctrl.enqueue(enc.encode(`data: ${JSON.stringify(ev)}\r\n\r\n`));
      }
      ctrl.close();
    },
  });
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

async function collect(history: Msg[], onChunk?: (d: string, t: string, s: string) => void) {
  const events: StreamEvent[] = [];
  for await (const ev of streamJarvisResponse(history, onChunk) as AsyncGenerator<StreamEvent>) {
    events.push(ev);
  }
  const done = events.find((e) => e.type === "done") as Extract<StreamEvent, { type: "done" }>;
  return { events, chunks: events.filter((e) => e.type === "chunk"), result: done.result };
}

const ask = (text: string, before: Msg[] = []) => collect([...before, { sender: "user", text }]);

const CASES: Array<[string, string]> = [
  ["Hi", "greeting-en"],
  ["សួស្តី", "greeting-km"],
  ["你好", "greeting-zh"],
  ["Who is Danish?", "who-is-danish"],
  ["Tell me about Danish", "who-is-danish"],
  ["Where did Danish grow up and study?", "roots"],
  ["What was his favourite subject in high school?", "roots"],
  ["How does maths show up in his work?", "roots"],
  ["What is Danish's origin story?", "origin"],
  ["Tell me about Danish's flagship projects", "projects-overview"],
  ["What did Danish build in Bookly?", "bookly"],
  ["What does Bookly's Telegram bot do?", "bookly"],
  ["How did he model Bookly's data?", "database"],
  ["Tell me about the 2026 AI Expert System award", "award"],
  ["What did Danish contribute to the Diabetes Expert System?", "diabetes"],
  ["What is Loomora?", "loomora"],
  ["What is the Driving Rules app?", "driving"],
  ["What is Danish's core tech stack?", "skills-overview"],
  ["What is Danish's frontend stack?", "frontend"],
  ["See Danish's backend stack", "backend"],
  ["How does Danish keep apps secure?", "security"],
  ["How does he use RBAC?", "security"],
  ["Which projects use PostgreSQL?", "database"],
  ["Tell me about Danish's team and internship experience", "experience"],
  ["How does he resolve Git merge conflicts?", "teamwork"],
  ["How does Danish handle deadlines?", "deadlines"],
  ["Why should we hire Danish?", "why-hire"],
  ["Why hire a junior when seniors are available?", "junior-vs-senior"],
  ["Is Danish available for hire?", "availability"],
  ["What are Danish's salary expectations?", "salary"],
  ["When can Danish start?", "start-date"],
  ["How can I hire or contact Danish?", "contact"],
  ["Where can I download Danish's CV?", "cv"],
  ["What does Danish do outside of coding?", "hobbies"],
  ["Does he play football on weekends?", "hobbies"],
  ["What does Danish's daily routine look like?", "routine"],
  ["What keeps Danish motivated?", "motivation"],
  ["Does he want to help Cambodia's tech industry?", "motivation"],
  ["What are his weaknesses?", "growth"],
  ["Does he know Next.js or AWS?", "unknown-tech"],
  ["What languages does Danish speak?", "languages"],
  ["Who built you?", "jarvis"],
  ["Thanks, bye", "thanks"],
  ["Hi, what's his tech stack?", "skills-overview"],
];

beforeEach(() => {
  window.sessionStorage.clear();
  window.localStorage.clear();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("Jarvis knowledge", () => {
  it("compiles a grounded prompt that cross-references contacts, stack and new facts", () => {
    for (const s of [
      "@sarydanish",
      "danishsary4@gmail.com",
      "087 680 999",
      "github.com/danishsary8",
    ]) {
      expect(JARVIS_SYSTEM_PROMPT.split(s).length - 1, s).toBeGreaterThanOrEqual(3);
    }
    for (const s of ["React", "Laravel", "PostgreSQL", "Supabase", "Docker", "Flutter"]) {
      expect(JARVIS_SYSTEM_PROMPT.split(s).length - 1, s).toBeGreaterThanOrEqual(3);
    }
    for (const s of [
      "FUTURE AND REAL-TIME UPDATES PROTOCOL",
      "Russey Keo High School",
      "Mathematics",
      "Arizon School",
      "Cambodia's tech industry",
      "high school friends",
      "[[chips]]",
      "Anti-repetition",
    ]) {
      expect(JARVIS_SYSTEM_PROMPT, s).toContain(s);
    }
    expect(JARVIS_SYSTEM_PROMPT).toMatch(/currently four projects/);
    expect(JARVIS_SYSTEM_PROMPT).not.toMatch(/undefined|\[object Object\]/);
    expect(PLAYBOOK_SIZE).toBeGreaterThanOrEqual(60);
    expect(LOCAL_FALLBACK_QA.length).toBeGreaterThanOrEqual(30);
    for (const e of LOCAL_FALLBACK_QA) {
      expect((FOLLOW_UP_SUGGESTIONS as Record<string, string[]>)[e.topic], e.topic).toBeTruthy();
      for (const a of [e.answer].flat()) expect(a).not.toMatch(/undefined/);
    }
  });

  it("routes offline questions to the right entry", () => {
    const misses = CASES.map(([q, id]) => [q, id, findLocalAnswer(q)?.id ?? "none"]).filter(
      ([, id, got]) => id !== got,
    );
    expect(misses).toEqual([]);
  });
});

describe("Jarvis streaming engine", () => {
  it("serves instant answers with no network call", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "k");
    const spy = vi.spyOn(globalThis, "fetch");
    const { result, chunks } = await ask("Hi");
    expect(result.source).toBe("instant");
    expect(chunks).toHaveLength(1);
    expect(spy).not.toHaveBeenCalled();
    expect(findInstantAnswer("Hi, what's his tech stack?")).toBeNull();
    expect(findInstantAnswer("Hi", [{ sender: "user", text: "x" }])).toBeNull();
  });

  it("streams Gemini tokens, hides the chips line, and never replays a cached reply", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "k");
    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async () =>
        sse([
          "Danish leads with **React**",
          ", Laravel and PostgreSQL.\n\nWant more?\n[[ch",
          "ips]] How does he use Docker? | 🚀 Tell me about Bookly | Is he available?",
        ]),
      );
    const deltas: string[] = [];
    const q = "What is Danish's core tech stack?";
    const { result, chunks } = await collect([{ sender: "user", text: q }], (d) => deltas.push(d));
    expect(result.source).toBe("gemini");
    expect(result.model).toBe(MODEL_CHAIN[0]);
    expect(result.text).toBe("Danish leads with **React**, Laravel and PostgreSQL.\n\nWant more?");
    expect(result.followUps).toEqual([
      "How does he use Docker?",
      "Tell me about Bookly",
      "Is he available?",
    ]);
    expect(chunks.length).toBeGreaterThanOrEqual(2);
    expect(chunks.some((c) => /\[\[|chips/.test(c.text))).toBe(false);
    expect(deltas.join("")).toBe(result.text);

    const url = String(spy.mock.calls[0]![0]);
    expect(url).toMatch(/\/models\/[^/]+:streamGenerateContent\?alt=sse&key=k$/);
    const body = JSON.parse(String((spy.mock.calls[0]![1] as RequestInit).body));
    expect(body.system_instruction.parts[0].text).toBe(JARVIS_SYSTEM_PROMPT);
    expect(body.system_instruction.parts[1].text).toMatch(/SITE SIGNAL/);
    expect(body.contents[0].role).toBe("user");

    // Asking again goes back to Gemini for fresh wording instead of replaying a cached reply.
    const again = await ask(q);
    expect(again.result.source).toBe("gemini");
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("rotates offline phrasings so the same question never repeats word for word", async () => {
    const answers = [];
    for (let i = 0; i < 6; i += 1) answers.push((await ask("Hi")).result.text);
    for (let i = 1; i < answers.length; i += 1) expect(answers[i]).not.toBe(answers[i - 1]);
  });

  it("tells Gemini how the previous reply opened and closed (anti-repetition)", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "k");
    const spy = vi.spyOn(globalThis, "fetch").mockImplementation(async () => sse(["Sure."]));
    const before: Msg[] = [
      { sender: "user", text: "Tell me about Bookly" },
      { sender: "bot", text: "**Bookly** is his bookstore. It ships fast. Want the stack?" },
    ];
    expect(previousReplyEdges(before)).toEqual({
      opening: "Bookly is his bookstore.",
      closing: "Want the stack?",
    });
    await ask("How is it secured?", before);
    const body = JSON.parse(String((spy.mock.calls[0]![1] as RequestInit).body));
    expect(body.system_instruction.parts[1].text).toContain(
      'opened with "Bookly is his bookstore." and closed with "Want the stack?"',
    );
  });

  it("fails over through the chain, remembers a 404 and streams the local answer", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "k");
    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation(async (url) =>
        String(url).includes(MODEL_CHAIN[0]!)
          ? new Response(JSON.stringify({ error: { message: "gone" } }), { status: 404 })
          : new Response(JSON.stringify({ error: { message: "busy" } }), { status: 503 }),
      );
    const { result, chunks } = await ask("Tell me about Loomora in detail please");
    expect(result.source).toBe("local");
    expect(result.text).toMatch(/Loomora/);
    expect(chunks.length).toBeGreaterThan(5); // simulated streaming
    expect(chunks.at(-1)!.text).toBe(result.text);
    expect(spy).toHaveBeenCalledTimes(MODEL_CHAIN.length);
    expect(JSON.parse(window.localStorage.getItem("jarvis-dead-models-v1")!)).toHaveProperty(
      MODEL_CHAIN[0]!,
    );
    spy.mockClear();
    await ask("Tell me about Loomora in detail please");
    expect(spy.mock.calls.some(([u]) => String(u).includes(MODEL_CHAIN[0]!))).toBe(false);
  });

  it("answers locally when there is no API key", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "your_actual_google_api_key_here");
    const spy = vi.spyOn(globalThis, "fetch");
    const { result } = await ask("What are Danish's salary expectations?");
    expect(result.source).toBe("local");
    expect(result.showContactCard).toBe(true);
    expect(spy).not.toHaveBeenCalled();
  });

  it("keeps the strict 10s budget when Gemini hangs", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "k");
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (_u, init) =>
        new Promise((_res, rej) => {
          (init as RequestInit).signal?.addEventListener("abort", () =>
            rej(new DOMException("aborted", "AbortError")),
          );
        }),
    );
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const t0 = Date.now();
    const p = ask("Tell me about Bookly in detail please");
    await vi.advanceTimersByTimeAsync(10_500);
    const { result } = await p;
    expect(result.source).toBe("local");
    expect(Date.now() - t0).toBeLessThan(11_500);
  });

  it("keeps text that already arrived when the stream stalls", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "k");
    const enc = new TextEncoder();
    vi.spyOn(globalThis, "fetch").mockImplementation(async (_u, init) => {
      const body = new ReadableStream({
        start(ctrl) {
          const ev = { candidates: [{ content: { parts: [{ text: "Partial answer." }] } }] };
          ctrl.enqueue(enc.encode(`data: ${JSON.stringify(ev)}\n\n`));
          (init as RequestInit).signal?.addEventListener("abort", () =>
            ctrl.error(new Error("abort")),
          );
        },
      });
      return new Response(body, { status: 200 });
    });
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const p = ask("What are his weaknesses in detail?");
    await vi.advanceTimersByTimeAsync(10_500);
    const { result } = await p;
    expect(result.source).toBe("gemini");
    expect(result.text).toBe("Partial answer.");
  });
});

describe("Jarvis helpers", () => {
  it("detects the visitor mode", () => {
    expect(detectVisitorMode([], "How does he use JWT and RBAC middleware in Laravel?")).toBe(
      "technical",
    );
    expect(detectVisitorMode([], "Is he available for a full-time role? Salary?")).toBe(
      "recruiter",
    );
    expect(detectVisitorMode([], "haha cool, does he play football on weekends?")).toBe("casual");
  });

  it("always gives exactly three new chips", () => {
    for (const [q] of CASES) {
      const chips = generateFollowUps({ userText: q, history: [], mode: detectVisitorMode([], q) });
      expect(chips, q).toHaveLength(3);
      expect(new Set(chips).size).toBe(3);
      expect(chips.map((c) => c.toLowerCase())).not.toContain(q.toLowerCase());
    }
  });

  it("parses SSE events and the chips line", () => {
    expect(parseSseEvent('data: {"a":1}')).toEqual({ a: 1 });
    expect(parseSseEvent("data: [DONE]")).toBeNull();
    expect(parseSseEvent("data: {broken")).toBeNull();
    expect(visibleText("Hello [[chi")).toBe("Hello");
    expect(visibleText("Hello\n[[chips]] a | b")).toBe("Hello");
    expect(splitChips('Body\n[[chips]] - One? | "Two?" | 3. Three?').chips).toEqual([
      "One?",
      "Two?",
      "Three?",
    ]);
    expect(localChunks("a b c d e f g").join("")).toBe("a b c d e f g");
  });

  it("starts contents with a user turn and re-attaches chips to model turns", () => {
    const contents = buildContents(
      [
        { sender: "bot", kind: "welcome", text: "w" },
        { sender: "bot", text: "orphan" },
        { sender: "user", text: "q1" },
        { sender: "bot", text: "a1", followUps: ["x", "y", "z"] },
      ],
      "q2",
    );
    expect(contents[0]!.role).toBe("user");
    expect(contents[1]!.parts[0]!.text).toBe("a1\n[[chips]] x | y | z");
    expect(contents.at(-1)!.parts[0]!.text).toBe("q2");
  });

  it("never cuts an emoji or a Khmer cluster while typing", () => {
    expect(safeCut("🚀x", 1)).toBe(2);
    expect(safeCut("ក្ម", 1)).toBe(3); // coeng + subscript stay together
    expect(safeCut("កា", 1)).toBe(2); // vowel sign stays with its consonant
  });

  it("paces the reveal word by word at a calm speed", () => {
    expect(wordsPerSecond(0)).toBe(13);
    expect(wordsPerSecond(80)).toBe(13); // a normal reply never speeds up
    expect(wordsPerSecond(1000)).toBe(26);
    const s = "Danish builds apps";
    expect(nextUnitEnd(s, 0, false)).toBe(6); // "Danish"
    expect(nextUnitEnd(s, 6, false)).toBe(13); // " builds"
    expect(nextUnitEnd(s, 13, false)).toBe(13); // "apps" may still be growing
    expect(nextUnitEnd(s, 13, true)).toBe(18);
    const khmer = "ក្រៅពីការសរសេរកូដ";
    const end = nextUnitEnd(khmer, 0, false);
    expect(end).toBeGreaterThan(0);
    expect(end).toBeLessThan(khmer.length); // long runs without spaces are sliced
  });
});

describe("Jarvis markdown", () => {
  it("renders lists, quotes, code blocks and contact badges safely", () => {
    const md = [
      "### Heading",
      "**Bold**, *italic* and `code`.",
      "",
      "> A short quote",
      "",
      "```js",
      "const a = 1;",
      "```",
      "",
      "- one",
      "1. first",
      "",
      "Mail danishsary4@gmail.com, Telegram @sarydanish, github.com/danishsary8, call 087 680 999. [x](javascript:alert(1))",
    ].join("\n");
    const { container } = render(<JarvisMarkdown text={md} />);
    expect(container.querySelector("blockquote")?.textContent).toBe("A short quote");
    expect(container.querySelector("pre code")?.textContent).toBe("const a = 1;");
    expect(container.querySelector("ul li")?.textContent).toBe("one");
    expect(container.querySelector("ol li")?.textContent).toBe("first");
    expect(Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"))).toEqual([
      "mailto:danishsary4@gmail.com",
      "https://t.me/sarydanish",
      "https://github.com/danishsary8",
      "tel:087680999",
    ]);
  });

  it("hides half-typed markup while streaming and keeps open code fences verbatim", () => {
    expect(stabilizeStreaming("Uses **Rea")).toBe("Uses **Rea**");
    expect(stabilizeStreaming("Uses **")).toBe("Uses");
    expect(stabilizeStreaming("Reads *Atomic Hab")).toBe("Reads *Atomic Hab*");
    expect(stabilizeStreaming("Email danishsary4@gm")).toBe("Email ");
    expect(stabilizeStreaming("See [the PDF](/sary-d")).toBe("See the PDF");
    expect(stabilizeStreaming("Run `npm")).toBe("Run `npm`");
    expect(stabilizeStreaming("- one\n- ")).toBe("- one\n");
    expect(stabilizeStreaming("Text\n``")).toBe("Text\n");
    expect(stabilizeStreaming("```js\nconst `x")).toBe("```js\nconst `x");
    expect(parseBlocks("```\nopen").at(-1)).toEqual({ type: "code", lang: "", lines: ["open"] });
  });

  it("places the caret inline at the end of the last block", () => {
    const { container } = render(
      <JarvisMarkdown text={"Para\n\n- a\n- b"} streaming tail={<i data-testid="caret" />} />,
    );
    expect(container.querySelector("ul li:last-child [data-testid='caret']")).toBeTruthy();
  });

  it("wraps words in fade spans only while streaming, with stable keys", () => {
    const { container, rerender } = render(
      <JarvisMarkdown text={"Danish **builds** apps"} streaming />,
    );
    const first = container.querySelector(".jarvis-word");
    expect(container.querySelectorAll(".jarvis-word").length).toBeGreaterThanOrEqual(3);
    expect(container.querySelector("strong")?.textContent).toBe("builds");
    rerender(<JarvisMarkdown text={"Danish **builds** apps for real users"} streaming />);
    expect(container.querySelector(".jarvis-word")).toBe(first); // already-shown words never remount
    rerender(<JarvisMarkdown text={"Danish **builds** apps for real users"} />);
    expect(container.querySelector(".jarvis-word")).toBeNull();
    expect(container.textContent).toBe("Danish builds apps for real users");
  });
});

describe("Jarvis widget", { timeout: 20000 }, () => {
  it("glides a streamed reply in with a caret, then shows chips and the contact card", async () => {
    vi.stubEnv("VITE_GEMINI_API_KEY", "k");
    vi.spyOn(globalThis, "fetch").mockImplementation(async () =>
      sse(
        [
          "**Bookly** is his full-stack bookstore with a Laravel REST API, ",
          "React and PostgreSQL. Reach him at @sarydanish.\n",
          "[[chips]] A one? | B two? | C three?",
        ],
        40,
      ),
    );
    render(<ChatbotWidget />);
    fireEvent.click(await screen.findByLabelText("Chat with Jarvis, 1 new message"));
    const dialog = await screen.findByRole("dialog");
    const box = within(dialog).getByLabelText("Message Jarvis");
    fireEvent.change(box, { target: { value: "What did Danish build in Bookly?" } });
    fireEvent.keyDown(box, { key: "Enter" });

    expect(await within(dialog).findByText("Jarvis is thinking...")).toBeTruthy();
    const bubble = await waitFor(() => {
      const el = dialog.querySelector('[aria-busy="true"]');
      expect(el).toBeTruthy();
      return el as HTMLElement;
    });
    expect(bubble.querySelector("[data-jarvis-caret]")).toBeTruthy();

    // The ticker reveals the text progressively rather than in one jump.
    const lengths = new Set<number>();
    await waitFor(
      () => {
        lengths.add((dialog.querySelector('[aria-busy="true"]')?.textContent ?? "").length);
        expect(dialog.querySelector('[aria-busy="true"]')).toBeNull();
      },
      { timeout: 9000, interval: 15 },
    );
    expect(lengths.size).toBeGreaterThan(3);
    expect(dialog.textContent).not.toMatch(/\[\[/);

    const chips = await within(dialog).findByLabelText("Suggested follow-up questions");
    expect(
      within(chips)
        .getAllByRole("button")
        .map((b) => b.textContent),
    ).toEqual(["A one?", "B two?", "C three?"]);
    expect(within(dialog).getByRole("group", { name: "Contact Danish" })).toBeTruthy();
    await waitFor(() => expect(dialog.querySelector("[data-jarvis-caret]")).toBeNull());
    const saved = JSON.parse(window.sessionStorage.getItem("jarvis-chat-v1")!).messages;
    expect(saved.at(-1).text).toBe(
      "**Bookly** is his full-stack bookstore with a Laravel REST API, React and PostgreSQL. Reach him at @sarydanish.",
    );
  });

  it("clears, expands and closes with Esc", async () => {
    render(<ChatbotWidget />);
    fireEvent.click(await screen.findByLabelText(/Chat with Jarvis/));
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Hire / Contact" }));
    await within(dialog).findByLabelText("Suggested follow-up questions", {}, { timeout: 9000 });
    fireEvent.click(within(dialog).getByRole("button", { name: "Expand chat" }));
    expect(within(dialog).getByRole("button", { name: "Shrink chat" })).toBeTruthy();
    fireEvent.click(within(dialog).getByRole("button", { name: "Clear chat" }));
    expect(window.sessionStorage.getItem("jarvis-chat-v1")).not.toMatch(/Hire/);
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(dialog.getAttribute("data-state")).toBe("closed"));
  });
});
