import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Bot,
  Bug,
  Code,
  Coffee,
  Github,
  LayoutGrid,
  Mail,
  Maximize2,
  Minimize2,
  RotateCcw,
  Rocket,
  Send,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { JARVIS_CONTACT, JARVIS_WELCOME, STARTER_PROMPTS } from "../data/jarvisKnowledge";
import {
  MAX_INPUT_CHARS,
  isRemoteAvailable,
  sanitizeInput,
  streamJarvisResponse,
  warmUpJarvis,
} from "../services/jarvisApi";
import { JarvisMarkdown, StreamCaret } from "./jarvis/JarvisMarkdown";

/**
 * Jarvis chat panel. The floating robot button lives in site/ChatbotWidget.tsx and
 * drives this component through `open` / `onClose`.
 *
 * Streaming pipeline
 *   streamJarvisResponse (SSE tokens) -> targetRef (everything received so far)
 *   -> 15ms ticker reveals it a few characters at a time -> `live` state -> JarvisMarkdown
 *   The ticker drains faster when it falls behind, so text glides in without lagging the stream.
 *
 * Props
 *  - open            whether the panel is visible (it stays mounted so a pending reply survives closing)
 *  - onClose(reason) "escape" | "outside" | "button"
 *  - triggerRef      ref of the floating button (clicks on it are not "outside")
 *  - avatar          node rendered in the header avatar tile
 *  - onBusyChange    (busy: boolean) => void, true while Jarvis is thinking or streaming
 *  - onBotMessage    (message) => void, called for every finished reply (used for the unread badge)
 */

const STORAGE_KEY = "jarvis-chat-v1";
const MAX_STORED_MESSAGES = 40;
/** Distance from the bottom (px) within which new text keeps the view pinned to the newest line. */
const STICK_THRESHOLD = 80;
/**
 * Typing ticker (ChatGPT / Gemini feel): text is revealed word by word on a time budget, and each
 * new word fades in (see .jarvis-word). The base pace is a calm reading speed; it only speeds up
 * when the stream is far ahead, so long answers never lag minutes behind.
 */
const TICK_MS = 16;
const BASE_WORDS_PER_SEC = 13;
const MAX_WORDS_PER_SEC = 26;
/** Backlog (in words) the ticker tolerates before it starts to speed up. */
const BACKLOG_EASE_WORDS = 80;
/** Runs longer than this without a space (Khmer, Chinese, URLs) are revealed in small slices. */
const LONG_RUN = 12;
const SLICE_CHARS = 3;
/** How long a finished reply keeps its fade spans and fading dot (covers the last word's fade). */
const CARET_FADE_MS = 650;

const ICONS = {
  user: User,
  rocket: Rocket,
  trophy: Trophy,
  code: Code,
  bug: Bug,
  users: Users,
  coffee: Coffee,
  mail: Mail,
};

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

const cx = (...parts) => parts.filter(Boolean).join(" ");

const nowLabel = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

let idCounter = 0;
const nextId = (prefix) => `${prefix}-${Date.now().toString(36)}-${(idCounter += 1)}`;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
  );
}

const COMBINING = /[\p{M}\u200D\uFE0F]/u;

/**
 * Moves a cut point forward so it never splits an emoji, a surrogate pair or a Khmer cluster
 * (combining vowel signs and the coeng U+17D2 + subscript consonant).
 */
export function safeCut(s, i) {
  let j = Math.min(i, s.length);
  while (j < s.length) {
    const code = s.charCodeAt(j);
    const lowSurrogate = code >= 0xdc00 && code <= 0xdfff;
    if (lowSurrogate || COMBINING.test(s[j]) || s[j - 1] === "\u17D2") j += 1;
    else break;
  }
  return j;
}

/** Words per second for a given backlog: calm by default, faster only when far behind. */
export function wordsPerSecond(backlogWords) {
  const extra = Math.max(0, backlogWords - BACKLOG_EASE_WORDS) * 0.2;
  return Math.min(MAX_WORDS_PER_SEC, BASE_WORDS_PER_SEC + extra);
}

/**
 * End index of the next reveal unit after `i`: one whole word (with its leading whitespace).
 * While the stream is still open, a trailing word without whitespace after it is held back
 * (it may still be growing). Long runs without spaces are sliced so they still glide in.
 * Returns `i` when nothing can be revealed yet.
 */
export function nextUnitEnd(s, i, complete) {
  const re = /\s*\S+/y;
  re.lastIndex = i;
  const m = re.exec(s);
  if (!m) return complete ? s.length : i;
  const lead = m[0].length - m[0].trimStart().length;
  const wordLen = m[0].length - lead;
  if (wordLen > LONG_RUN) return safeCut(s, i + lead + SLICE_CHARS);
  const end = i + m[0].length;
  if (end >= s.length && !complete) return i; // last word may still be arriving
  return safeCut(s, end);
}

/** Rough count of words left to reveal. */
function backlogWords(s, i) {
  const rest = s.slice(i);
  const spaced = (rest.match(/\S+/g) || []).length;
  return Math.max(spaced, Math.ceil(rest.length / 7));
}

const makeWelcome = () => ({
  id: "welcome",
  kind: "welcome",
  sender: "bot",
  text: JARVIS_WELCOME,
  time: nowLabel(),
});

function loadSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.messages) || parsed.messages.length === 0) return null;
    const ok = parsed.messages.filter(
      (m) =>
        m &&
        !m.streaming &&
        typeof m.text === "string" &&
        m.text &&
        (m.sender === "user" || m.sender === "bot"),
    );
    return ok.length ? ok : null;
  } catch {
    return null;
  }
}

function saveSession(messages) {
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages: messages.slice(-MAX_STORED_MESSAGES) }),
    );
  } catch {
    /* storage full or blocked: the chat still works, it just will not persist */
  }
}

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */

function HeaderButton({ label, onClick, pressed, className, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={cx(
        "press inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border text-fg-muted transition-colors duration-150 hover:border-line-strong hover:bg-surface-2 hover:text-fg max-sm:h-11 max-sm:w-11",
        pressed ? "border-line-strong bg-surface-2 text-fg" : "border-transparent",
        FOCUS,
        className,
      )}
    >
      {children}
    </button>
  );
}

function Chip({ onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "press inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-strong bg-surface-2 px-3 py-1.5 text-left text-[12.5px] font-medium leading-snug text-fg-muted transition-colors duration-150 hover:border-gold hover:text-fg max-sm:min-h-11",
        FOCUS,
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 text-fg-subtle" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}

/** One-tap contact actions shown under replies about hiring or contacting Danish. */
function ContactCard() {
  const base =
    "btn-apple inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium no-underline max-sm:min-h-11";
  return (
    <div
      className="jarvis-rise mt-3 rounded-xl border border-line bg-surface-2 p-2.5"
      role="group"
      aria-label="Contact Danish"
    >
      <p className="mb-2 text-[12px] leading-tight text-fg-muted">
        <span className="font-semibold text-fg">Reach Danish.</span> Telegram is the fastest.
      </p>
      <div className="flex flex-wrap gap-1.5">
        <a
          href={JARVIS_CONTACT.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(base, "btn-apple-ink", FOCUS)}
        >
          <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Telegram
        </a>
        <a
          href={`mailto:${JARVIS_CONTACT.email}`}
          className={cx(base, "btn-apple-secondary", FOCUS)}
        >
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Email
        </a>
        <a
          href={JARVIS_CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(base, "btn-apple-secondary", FOCUS)}
        >
          <Github className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          GitHub
        </a>
      </div>
    </div>
  );
}

function BotAvatar() {
  return (
    <div
      aria-hidden="true"
      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface-1"
    >
      <Bot className="h-3.5 w-3.5 text-gold-ink dark:text-gold" />
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div className="jarvis-rise flex justify-start gap-2.5" role="status" aria-live="polite">
      <BotAvatar />
      <div className="flex items-center gap-2.5 rounded-2xl rounded-tl-sm border border-line bg-surface-1 px-3.5 py-2.5 text-fg-muted">
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-ink motion-safe:animate-bounce dark:bg-gold" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-ink motion-safe:animate-bounce [animation-delay:150ms] dark:bg-gold" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-ink motion-safe:animate-bounce [animation-delay:300ms] dark:bg-gold" />
        </span>
        <span className="text-[12.5px]">Jarvis is thinking...</span>
      </div>
    </div>
  );
}

function TopicExplorer({ expanded, onPick }) {
  return (
    <div className={cx("grid gap-2.5 p-4", expanded && "sm:grid-cols-2")}>
      <p className="text-[12.5px] leading-snug text-fg-muted sm:col-span-full">
        Pick a question to start. Jarvis answers from what Danish has published about himself.
      </p>
      {STARTER_PROMPTS.map((cat) => {
        const Icon = ICONS[cat.icon] || User;
        return (
          <section
            key={cat.id}
            className="overflow-hidden rounded-xl border border-line bg-surface-1"
          >
            <h3 className="flex items-center gap-2 border-b border-line px-3 py-2 text-[13px] font-semibold text-fg">
              <Icon className="h-3.5 w-3.5 text-fg-subtle" aria-hidden="true" />
              {cat.label}
            </h3>
            <ul>
              {cat.questions.map((q) => (
                <li key={q} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => onPick(q)}
                    className={cx(
                      "w-full cursor-pointer px-3 py-2 text-left text-[12.5px] leading-snug text-fg-muted transition-colors duration-150 hover:bg-surface-2 hover:text-fg max-sm:min-h-11",
                      FOCUS,
                    )}
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export function JarvisChat({ open, onClose, triggerRef, avatar, onBusyChange, onBotMessage }) {
  const [messages, setMessages] = useState(() => loadSession() ?? [makeWelcome()]);
  const [input, setInput] = useState("");
  /** "idle" | "waiting" (before the first token) | "streaming" */
  const [phase, setPhase] = useState("idle");
  /** Text currently revealed for the streaming message: { id, text } */
  const [live, setLive] = useState(null);
  /** Id of a just-finished message whose caret is fading out */
  const [fadingId, setFadingId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [explorer, setExplorer] = useState(false);

  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesRef = useRef(messages);
  const busyRef = useRef(false);
  const abortRef = useRef(null);
  const stickRef = useRef(true);
  const onBotMessageRef = useRef(onBotMessage);
  /** Ticker state for the streaming message */
  const streamRef = useRef(null);

  const busy = phase !== "idle";

  useEffect(() => {
    messagesRef.current = messages;
    // Persist finished conversations only; a half-streamed reply is never saved.
    if (!messages.some((m) => m.streaming)) saveSession(messages);
  }, [messages]);

  useEffect(() => {
    onBotMessageRef.current = onBotMessage;
  }, [onBotMessage]);

  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);

  const stopTicker = useCallback(() => {
    const st = streamRef.current;
    if (st?.timer) clearInterval(st.timer);
    if (st) st.timer = null;
  }, []);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      stopTicker();
    },
    [stopTicker],
  );

  useEffect(() => {
    if (!fadingId) return undefined;
    const t = setTimeout(() => setFadingId(null), CARET_FADE_MS);
    return () => clearTimeout(t);
  }, [fadingId]);

  // Esc closes; clicking outside closes the compact window (the expanded reading view stays put).
  useEffect(() => {
    if (!open) return undefined;
    warmUpJarvis();
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.("escape");
    };
    const onPointerDown = (e) => {
      if (expanded) return;
      const t = e.target;
      if (panelRef.current?.contains(t) || triggerRef?.current?.contains(t)) return;
      onClose?.("outside");
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, expanded, onClose, triggerRef]);

  // Focus the input when the panel opens (fine pointers only, so phones do not pop the keyboard).
  useEffect(() => {
    if (!open) return undefined;
    if (!window.matchMedia?.("(pointer: fine)").matches) return undefined;
    const t = setTimeout(() => textareaRef.current?.focus({ preventScroll: true }), 120);
    return () => clearTimeout(t);
  }, [open]);

  // Opening the panel or the Topic Explorer resets the scroll position.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;
    if (explorer) {
      el.scrollTop = 0;
    } else {
      stickRef.current = true;
      el.scrollTop = el.scrollHeight;
    }
  }, [open, explorer, expanded]);

  // New text keeps the newest line in view, unless the visitor scrolled up to read. While a reply
  // streams, each new line glides into view instead of jumping.
  const lastHeightRef = useRef(0);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || !open || explorer || !stickRef.current) return;
    const h = el.scrollHeight;
    if (h === lastHeightRef.current) return;
    lastHeightRef.current = h;
    const top = h - el.clientHeight;
    if (live && !prefersReducedMotion() && typeof el.scrollTo === "function") {
      el.scrollTo({ top, behavior: "smooth" });
    } else {
      el.scrollTop = h;
    }
  }, [messages, live, phase, open, explorer]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || explorer) return;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD;
  };

  // Grow the textarea up to ~4 lines.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 104)}px`;
    // Only show a scrollbar once the text is taller than the 4-line cap.
    el.style.overflowY = el.scrollHeight > 104 ? "auto" : "hidden";
  }, [input, open]);

  /** Reveals the next slice of the streaming text; resolves `drained` once it has caught up. */
  const tick = useCallback(() => {
    const st = streamRef.current;
    if (!st) return;
    const target = st.target;
    if (st.shown > target.length) st.shown = target.length; // text was rewritten
    const now = performance.now();
    const dt = Math.min(100, now - (st.last ?? now));
    st.last = now;
    if (st.shown < target.length) {
      st.budget = (st.budget ?? 1) + (dt / 1000) * wordsPerSecond(backlogWords(target, st.shown));
      let moved = false;
      while (st.budget >= 1) {
        const end = nextUnitEnd(target, st.shown, st.complete);
        if (end <= st.shown) {
          st.budget = Math.min(st.budget, 1); // waiting for the stream: do not bank speed
          break;
        }
        st.shown = end;
        st.budget -= 1;
        moved = true;
      }
      if (moved) setLive({ id: st.id, text: target.slice(0, st.shown) });
    }
    if (st.shown >= target.length && st.complete) {
      if (st.timer) clearInterval(st.timer);
      st.timer = null;
      st.drained?.();
    }
  }, []);

  const startTicker = useCallback(() => {
    const st = streamRef.current;
    if (!st || st.timer) return;
    if (st.instant) {
      st.shown = st.target.length;
      setLive({ id: st.id, text: st.target });
      if (st.complete) st.drained?.();
      return;
    }
    st.timer = setInterval(tick, TICK_MS);
    tick();
  }, [tick]);

  const send = useCallback(
    async (raw) => {
      const text = sanitizeInput(raw);
      if (!text || busyRef.current) return;

      busyRef.current = true;
      const controller = new AbortController();
      abortRef.current = controller;
      stickRef.current = true;

      const userMsg = { id: nextId("u"), sender: "user", text, time: nowLabel() };
      const conversation = [...messagesRef.current, userMsg];
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setExplorer(false);
      setPhase("waiting");

      const botId = nextId("b");
      const time = nowLabel();
      let drainedResolve;
      const drainedPromise = new Promise((resolve) => {
        drainedResolve = resolve;
      });
      streamRef.current = {
        id: botId,
        target: "",
        shown: 0,
        complete: false,
        timer: null,
        instant: prefersReducedMotion(),
        drained: drainedResolve,
      };
      let started = false;

      try {
        let result = null;
        for await (const ev of streamJarvisResponse(conversation, undefined, {
          signal: controller.signal,
        })) {
          if (controller.signal.aborted) return;
          if (ev.type === "chunk") {
            streamRef.current.target = ev.text;
            if (!started) {
              started = true;
              setPhase("streaming");
              setMessages((prev) => [
                ...prev,
                { id: botId, sender: "bot", text: "", time, streaming: true },
              ]);
            }
            startTicker();
          } else if (ev.type === "done") {
            result = ev.result;
          }
        }
        if (!result || controller.signal.aborted) return;

        const st = streamRef.current;
        st.target = result.text;
        st.complete = true;
        if (!started) {
          started = true;
          setMessages((prev) => [
            ...prev,
            { id: botId, sender: "bot", text: "", time, streaming: true },
          ]);
        }
        startTicker();
        tick();
        await drainedPromise;
        if (controller.signal.aborted) return;

        const botMsg = {
          id: botId,
          sender: "bot",
          text: result.text,
          time,
          source: result.source,
          followUps: result.followUps,
          showContactCard: result.showContactCard,
        };
        setMessages((prev) => prev.map((m) => (m.id === botId ? botMsg : m)));
        setLive(null);
        setFadingId(botId);
        onBotMessageRef.current?.(botMsg);
      } catch {
        if (controller.signal.aborted) return;
        stopTicker();
        setLive(null);
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== botId),
          {
            id: botId,
            sender: "bot",
            text: "Something went wrong on my side. Please try again, or reach Danish directly on Telegram @sarydanish.",
            time,
            source: "local",
            followUps: [
              "Who is Danish?",
              "Tell me about Danish's flagship projects",
              "How can I hire or contact Danish?",
            ],
            showContactCard: true,
          },
        ]);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
          busyRef.current = false;
          stopTicker();
          streamRef.current = null;
          setPhase("idle");
        }
      }
    },
    [startTicker, stopTicker, tick],
  );

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    busyRef.current = false;
    stopTicker();
    streamRef.current = null;
    setLive(null);
    setFadingId(null);
    setPhase("idle");
    setExplorer(false);
    setInput("");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setMessages([makeWelcome()]);
  }, [stopTicker]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  const last = messages[messages.length - 1];
  const onlyWelcome = messages.length === 1 && last?.kind === "welcome";
  // Instant and cached answers say nothing about the network, so only Gemini/local replies count.
  const lastNetwork = [...messages]
    .reverse()
    .find((m) => m.sender === "bot" && (m.source === "gemini" || m.source === "local"))?.source;
  const offline = !isRemoteAvailable() || lastNetwork === "local";
  const showChips =
    phase === "idle" &&
    !explorer &&
    last?.sender === "bot" &&
    !onlyWelcome &&
    last.followUps?.length > 0;

  const textSize = expanded ? "text-[14.5px]" : "text-[13px]";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby="jarvis-title"
      aria-hidden={!open}
      inert={!open}
      data-state={open ? "open" : "closed"}
      className={cx(
        // Absolute, above the robot: mounting the hidden panel never changes the widget's box,
        // so it causes no layout shift on page load.
        "absolute bottom-full right-0 mb-2.5 origin-bottom-right select-text transition-[opacity,transform,visibility] duration-200 [transition-timing-function:var(--ease-out)] motion-reduce:translate-y-0 motion-reduce:scale-100",
        open
          ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
          : "pointer-events-none invisible translate-y-2 scale-[0.96] opacity-0",
      )}
    >
      <div
        className={cx(
          "flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface-2 shadow-[var(--elev-3)] ring-1 ring-black/[0.04] dark:ring-white/[0.06]",
          expanded
            ? "h-[calc(100dvh-7.5rem)] w-[min(760px,calc(100vw-1.5rem))]"
            : "h-[min(580px,calc(100dvh-7.5rem))] w-[min(380px,calc(100vw-1.5rem))]",
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-2 border-b border-line bg-surface-1 px-3.5 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-visible rounded-xl border border-line-strong bg-surface-2">
              {avatar}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center"
              >
                {!offline ? (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping [animation-duration:2.4s]" />
                ) : null}
                <span
                  className={cx(
                    "relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-surface-1",
                    offline ? "bg-gold" : "bg-emerald-500",
                  )}
                />
              </span>
            </div>
            <div className="min-w-0">
              <h2
                id="jarvis-title"
                className="flex items-center gap-1.5 text-[14px] font-semibold leading-tight text-fg"
              >
                Jarvis
                <span className="rounded bg-gold/15 px-1 py-px font-mono text-[9.5px] font-medium text-gold-ink dark:text-gold">
                  AI
                </span>
              </h2>
              <p className="mt-0.5 truncate text-[11px] leading-tight tracking-[-0.01em] text-fg-subtle">
                {offline
                  ? "Offline mode \u2022 saved answers"
                  : "Online \u2022 Danish's AI Representative"}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <HeaderButton
              label={explorer ? "Back to chat" : "Topic explorer"}
              pressed={explorer}
              onClick={() => setExplorer((v) => !v)}
            >
              <LayoutGrid className="h-4 w-4" />
            </HeaderButton>
            <HeaderButton
              label={expanded ? "Shrink chat" : "Expand chat"}
              onClick={() => setExpanded((v) => !v)}
              className="max-sm:hidden"
            >
              {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </HeaderButton>
            <HeaderButton label="Clear chat" onClick={clearChat}>
              <RotateCcw className="h-4 w-4" />
            </HeaderButton>
            <HeaderButton label="Close chat" onClick={() => onClose?.("button")}>
              <X className="h-4 w-4" />
            </HeaderButton>
          </div>
        </header>

        {/* Body. A stable scrollbar gutter stops the text reflowing when the scrollbar appears. */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-surface-2 [scrollbar-gutter:stable]"
        >
          {explorer ? (
            <div className="animate-in fade-in duration-150">
              <TopicExplorer expanded={expanded} onPick={send} />
            </div>
          ) : (
            <div
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              className={cx("space-y-3.5 p-4 leading-relaxed", textSize)}
            >
              {messages.map((m) => {
                const isLive = m.streaming;
                const text = isLive ? (live?.id === m.id ? live.text : "") : m.text;
                const caret = isLive || fadingId === m.id;
                return (
                  <div
                    key={m.id}
                    className={cx(
                      "flex gap-2.5",
                      m.sender === "user" ? "jarvis-rise justify-end" : "justify-start",
                    )}
                  >
                    {m.sender === "bot" ? <BotAvatar /> : null}
                    <div
                      aria-busy={isLive ? true : undefined}
                      className={cx(
                        "min-w-0 rounded-2xl px-3.5 py-2.5",
                        expanded ? "max-w-[88%]" : "max-w-[86%]",
                        m.sender === "user"
                          ? "rounded-tr-sm bg-fg font-medium text-bg"
                          : "rounded-tl-sm border border-line bg-surface-1 text-fg-muted",
                        isLive && "jarvis-rise",
                      )}
                    >
                      {m.sender === "user" ? (
                        <p className="whitespace-pre-wrap break-words">{m.text}</p>
                      ) : (
                        <div className="break-words">
                          <JarvisMarkdown
                            text={text}
                            streaming={isLive}
                            fade={isLive || fadingId === m.id}
                            tail={
                              caret ? (
                                <span
                                  className={
                                    isLive
                                      ? "jarvis-caret-wrap"
                                      : "jarvis-caret-wrap jarvis-caret-out"
                                  }
                                >
                                  <StreamCaret />
                                </span>
                              ) : null
                            }
                          />
                        </div>
                      )}
                      {m.sender === "bot" && m.showContactCard ? <ContactCard /> : null}
                      {!isLive ? (
                        <span
                          className={cx(
                            "mt-1.5 block font-mono text-[10px] tabular-nums",
                            m.sender === "user" ? "text-right text-bg/60" : "text-fg-subtle",
                          )}
                        >
                          {m.time}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              {phase === "waiting" ? <ThinkingBubble /> : null}

              {onlyWelcome && !busy ? (
                <div className="flex flex-wrap gap-1.5 sm:pl-[38px]">
                  {STARTER_PROMPTS.map((s) => (
                    <Chip key={s.id} icon={ICONS[s.icon]} onClick={() => send(s.prompt)}>
                      {s.label}
                    </Chip>
                  ))}
                </div>
              ) : null}

              {showChips ? (
                <div
                  className="jarvis-rise flex flex-wrap gap-1.5 sm:pl-[38px]"
                  aria-label="Suggested follow-up questions"
                >
                  {last.followUps.map((q) => (
                    <Chip key={q} onClick={() => send(q)}>
                      {q}
                    </Chip>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-line bg-surface-2 p-2.5 sm:p-3"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              maxLength={MAX_INPUT_CHARS}
              placeholder="Ask about Danish's work..."
              aria-label="Message Jarvis"
              className="field max-h-[104px] min-h-10 flex-1 resize-none overflow-hidden px-3.5 py-2 text-[16px] leading-6 text-fg placeholder:text-fg-subtle sm:text-[13.5px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              aria-label="Send message"
              className={cx(
                "btn-apple btn-apple-ink flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl disabled:pointer-events-none disabled:opacity-30 max-sm:h-11 max-sm:w-11",
                FOCUS,
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1.5 text-[10.5px] leading-snug text-fg-subtle">
            <span className="max-sm:hidden">Enter to send, Shift+Enter for a new line. </span>
            Jarvis is an AI and can make mistakes. Confirm details with Danish.
          </p>
        </form>
      </div>

      {/* Speech-bubble tail pointing at the robot button */}
      <div
        aria-hidden="true"
        className="absolute -bottom-1.5 right-[21px] z-10 h-3.5 w-3.5 rotate-45 border-b border-r border-line-strong bg-surface-2 sm:right-[25px]"
      />
    </div>
  );
}

export default JarvisChat;
