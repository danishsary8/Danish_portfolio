/**
 * Jarvis conversation engine.
 *
 * Core API: `streamJarvisResponse(history, onChunk, { signal })`, an async generator.
 *   history  the whole conversation, ending with the visitor's new message ({ sender: "user" })
 *   onChunk  optional callback (delta, fullVisibleText, source) for every streamed piece
 *   yields   { type: "chunk", delta, text, source } while the answer arrives, then
 *            { type: "done", result } with the final text, follow-up chips and contact-card flag
 *
 * Answer path, fastest first:
 *  1. INSTANT  curated local answers for short static questions (greetings, contact, CV, thanks):
 *              no network, ~0ms, rotating between several phrasings.
 *  2. GEMINI   true token streaming over SSE (`streamGenerateContent?alt=sse`). A strict 10s budget
 *              covers the whole model chain; text that already arrived is always kept. Replies are
 *              never cached, so asking the same thing twice gets freshly worded answers.
 *  3. LOCAL    offline keyword matcher over LOCAL_FALLBACK_QA, streamed word by word (missing key,
 *              bad key, network down, quota, every model failed).
 *
 * Every reply ends with three follow-up chips: written by Gemini (the `[[chips]]` line the system
 * prompt asks for, never shown as text), or picked from FOLLOW_UP_SUGGESTIONS for the topic and
 * the visitor's style.
 *
 * SECURITY NOTE: VITE_* variables are bundled into the client JavaScript, so the Gemini key is
 * readable by anyone. Restrict it to this site's HTTP referrers and give it a low quota in Google
 * AI Studio / Cloud Console, or proxy the call through a server route.
 */
import {
  FOLLOW_UP_SUGGESTIONS,
  JARVIS_SYSTEM_PROMPT,
  LOCAL_FALLBACK_DEFAULT,
  LOCAL_FALLBACK_QA,
} from "../data/jarvisKnowledge";

const API_HOST = "https://generativelanguage.googleapis.com";
const API_ROOT = `${API_HOST}/v1beta/models`;

/**
 * Model chain, fastest working model first (re-checked with this project's key on 2026-10-24).
 *  - gemini-3.5-flash-lite: ~0.8-1.2s to the first token, no thinking. Primary.
 *  - gemini-3.1-flash-lite: fast when available, but returned 503 "high demand" during tests.
 *  - gemini-2.5-flash: requested by the owner, but Google answers 404 "no longer available to new
 *    users" for this key. Kept for keys that still have access; a 404 is remembered for 24h.
 *  - gemini-3.6-flash: stronger, ~1.3s+, last resort.
 *  gemini-2.0-flash is not listed: it was shut down on 2026-06-01 and answers 404 for every key
 *  (https://ai.google.dev/gemini-api/docs/deprecations).
 * Set VITE_GEMINI_MODEL in .env to put any model first (e.g. gemini-2.5-flash) without touching code.
 */
const DEFAULT_MODEL_CHAIN = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.6-flash",
];

function buildModelChain() {
  const preferred = String((import.meta.env && import.meta.env.VITE_GEMINI_MODEL) || "").trim();
  return preferred
    ? [preferred, ...DEFAULT_MODEL_CHAIN.filter((m) => m !== preferred)]
    : DEFAULT_MODEL_CHAIN;
}

export const MODEL_CHAIN = buildModelChain();

export const MAX_HISTORY_MESSAGES = 20;
export const MAX_INPUT_CHARS = 800;
/** Strict budget: the visitor never waits longer than this for Gemini's first token. */
export const REQUEST_TIMEOUT_MS = 10000;
/** Per-model cap while other models are still left to try, so one slow model cannot eat the budget. */
const ATTEMPT_CAP_MS = 6000;
/** Once text is streaming, a silence this long ends the reply with what has arrived. */
const STREAM_IDLE_MS = 10000;
/** Offline answers are streamed a few words at a time with this gap. */
const LOCAL_WORDS_PER_CHUNK = 3;
const LOCAL_CHUNK_MS = 14;

const RETRY_STATUSES = new Set([404, 408, 429, 500, 502, 503, 504]);
const CONTACT_TOPICS = new Set(["contact", "availability", "salary", "cv", "reference", "junior"]);
const CONTACT_INTENT =
  /\b(hire|hiring|recruit\w*|contact|reach (?:out|him)|get in touch|interview|salary|available for)\b/i;

const CHIPS_MARKER = /\[\[\s*chips\s*\]\]/i;
const CHIPS_PARTIAL_TAIL = /\[(?:\[(?:\s*c(?:h(?:i(?:p(?:s(?:\s*\]?)?)?)?)?)?)?)?$/i;

/** Remote calls pause here after an auth failure (rest of the session) or a full rate-limit (60s). */
let remoteBlockedUntil = 0;

class GeminiError extends Error {
  constructor(message, { status = 0, retryable = false, auth = false, thinking = false } = {}) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
    this.retryable = retryable;
    this.auth = auth;
    this.thinking = thinking;
  }
}

/** Returns the Gemini key, or "" when it is missing or still a placeholder. */
export function getApiKey() {
  const raw = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
  const key = String(raw).trim();
  if (!key || /^your[_-]/i.test(key) || /your_actual/i.test(key)) return "";
  return key;
}

export function isRemoteAvailable() {
  return Boolean(getApiKey()) && Date.now() >= remoteBlockedUntil;
}

export function sanitizeInput(text) {
  return String(text ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, MAX_INPUT_CHARS);
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

/* -------------------------------------------------------------------------- */
/* Storage helpers (sessionStorage for the cache, localStorage for dead models) */
/* -------------------------------------------------------------------------- */

function store(kind) {
  try {
    return typeof window === "undefined" ? null : window[kind];
  } catch {
    return null; // storage disabled (privacy mode, sandboxed iframe)
  }
}

function readJSON(kind, key) {
  try {
    const raw = store(kind)?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJSON(kind, key, value) {
  try {
    store(kind)?.setItem(key, JSON.stringify(value));
  } catch {
    /* full or blocked: everything still works without persistence */
  }
}

/* Models that answered 404 are skipped for 24h, so a gone model costs one request per day. */
const DEAD_KEY = "jarvis-dead-models-v1";
const DEAD_TTL_MS = 24 * 60 * 60 * 1000;

function deadModels() {
  const raw = readJSON("localStorage", DEAD_KEY) || {};
  const now = Date.now();
  return new Set(Object.keys(raw).filter((m) => now - raw[m] < DEAD_TTL_MS));
}

function markDead(model) {
  const raw = readJSON("localStorage", DEAD_KEY) || {};
  raw[model] = Date.now();
  writeJSON("localStorage", DEAD_KEY, raw);
}

/* -------------------------------------------------------------------------- */
/* Answer variants                                                            */
/* -------------------------------------------------------------------------- */

/** Last variant shown per entry, so the same question never gets the same wording twice in a row. */
const lastVariant = new Map();

/** An entry's `answer` may be one string or a list of phrasings; pick a fresh one each time. */
export function pickAnswer(entry) {
  const list = Array.isArray(entry?.answer) ? entry.answer : [entry?.answer ?? ""];
  if (list.length === 1) return list[0];
  const prev = lastVariant.get(entry.id);
  const options = list.map((_, i) => i).filter((i) => i !== prev);
  const i = options[Math.floor(Math.random() * options.length)];
  lastVariant.set(entry.id, i);
  return list[i];
}

/* -------------------------------------------------------------------------- */
/* Warm-up                                                                    */
/* -------------------------------------------------------------------------- */

let warmed = false;

/**
 * Opens the TLS connection to Gemini early (hover/open of the robot button), so the first
 * question skips DNS + TLS setup. `crossorigin` must match fetch's anonymous CORS mode.
 */
export function warmUpJarvis() {
  if (warmed || typeof document === "undefined" || !getApiKey()) return;
  warmed = true;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = API_HOST;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

/* -------------------------------------------------------------------------- */
/* Visitor mode, language and site signal                                     */
/* -------------------------------------------------------------------------- */

const TECH_RE =
  /\b(jwt|rbac|oauth|otp|auth\w*|schema|database|postgres\w*|sql|supabase|eloquent|orm|migration|middleware|api|apis|rest|endpoint|architecture|stack|react|hooks?|state|laravel|flask|php|python|docker|deploy\w*|ci|cd|git|security|secure|encryption|hash\w*|cors|xss|csrf|injection|performance|latency|cache|code|debug\w*|bug|flutter|dart|typescript|node|component|design pattern|mvc|query|index\w*)\b/gi;
const RECRUITER_RE =
  /\b(hire|hiring|recruit\w*|role|roles|position|salary|compensation|pay|start|notice|full-?time|part-?time|intern\w*|available|availability|interview|cv|resume|candidate|fit|team|culture|offer|remote|hybrid|on-?site|relocat\w*|references?|junior|senior|seniors|experience level)\b/gi;
const CASUAL_RE =
  /\b(hi|hello|hey|yo|sup|lol|haha|cool|nice|awesome|fun|hobby|hobbies|football|soccer|coffee|gym|movie|movies|music|photo\w*|weekend|life|friends?|parents|family|book|books|read|reading|habit\w*|routine|thanks|thank you)\b/gi;

function countMatches(re, text) {
  re.lastIndex = 0;
  return (String(text).match(re) || []).length;
}

/**
 * "technical" | "recruiter" | "casual" | "unclear", from the visitor's own words.
 * The current message counts double; older ones fade.
 */
export function detectVisitorMode(history, userText) {
  const turns = [
    ...(history || [])
      .filter((m) => m?.sender === "user")
      .slice(-5)
      .map((m) => m.text),
    userText,
    userText,
  ];
  const score = { technical: 0, recruiter: 0, casual: 0 };
  turns.forEach((t, i) => {
    const w = 0.6 + (0.4 * (i + 1)) / turns.length;
    score.technical += countMatches(TECH_RE, t) * w;
    score.recruiter += countMatches(RECRUITER_RE, t) * w;
    score.casual += countMatches(CASUAL_RE, t) * w;
  });
  const [mode, value] = Object.entries(score).sort((a, b) => b[1] - a[1])[0];
  return value >= 1 ? mode : "unclear";
}

/** Script-based language hint; Latin-script messages are left to the model. */
export function detectLanguage(text) {
  const s = String(text || "");
  if (/[\u1780-\u17FF]/.test(s)) return "Khmer";
  if (/[\u4E00-\u9FFF]/.test(s)) return "Chinese";
  return "";
}

const MODE_HINT = {
  technical: "technical (lean into patterns, schemas and security practices)",
  recruiter: "recruiter or hiring (crisp, evidence-led, give the next step)",
  casual: "casual (warm and witty; blend his drive with his active life)",
  unclear: "unclear (short balanced answer)",
};

/** First and last sentence of Jarvis's previous reply, for the anti-repetition rule. */
export function previousReplyEdges(history) {
  const last = [...(history || [])]
    .reverse()
    .find((m) => m?.sender === "bot" && m.kind !== "welcome" && m.text);
  if (!last) return null;
  const plain = String(last.text)
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const sentences =
    plain
      .match(/[^.!?។]+[.!?។]?/g)
      ?.map((s) => s.trim())
      .filter(Boolean) ?? [];
  if (!sentences.length) return null;
  const clip = (s) => (s.length > 120 ? `${s.slice(0, 117)}...` : s);
  return { opening: clip(sentences[0]), closing: clip(sentences[sentences.length - 1]) };
}

/**
 * A random opening and closing style for each reply, so separate conversations do not all
 * fall into the same stock phrases ("take a look...", "Would you like...").
 */
const OPENING_STYLES = [
  "start straight with the most interesting fact",
  "start with a short, friendly reaction to the question, then answer",
  "start with a simple one-line summary, then add detail",
  "start by connecting the answer to something real people do with his work",
  "start with a plain, confident statement about Danish",
];
const CLOSING_STYLES = [
  "close by offering one specific next thing you can show",
  "close with a light question about the visitor (what they are looking for, or what they do)",
  "close by inviting them to try one of his live apps",
  "close with a short either/or choice between two topics",
  "close with a friendly one-line offer, not a question",
];

function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function siteSignal({ mode, isFirstReply, language, edges }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Phnom_Penh",
  });
  const lang = language
    ? `The visitor's latest message is in ${language}: write the whole reply and the chips line in ${language}.`
    : "Reply in the language of the visitor's latest message.";
  const lines = [
    "# SITE SIGNAL (auto-generated for this request)",
    `- Today in Phnom Penh: ${today}.`,
    `- ${lang}`,
    `- Likely visitor mode: ${MODE_HINT[mode] ?? MODE_HINT.unclear}. Treat it as a hint; the visitor's words win.`,
    `- ${isFirstReply ? "This is the visitor's first question. The site's welcome message already introduced you, so do not introduce yourself again; answer it directly." : "The conversation is under way; continue it naturally and never re-introduce yourself."}`,
  ];
  lines.push(
    `- Style for this reply: ${pickOne(OPENING_STYLES)}, and ${pickOne(CLOSING_STYLES)}. Avoid stock phrases such as "take a look", "Would you like to" and "Shall we".`,
  );
  if (edges) {
    lines.push(
      `- Your previous reply opened with "${edges.opening}" and closed with "${edges.closing}". Do not reuse that opening, that closing or their wording.`,
    );
  }
  return lines.join("\n");
}

/* -------------------------------------------------------------------------- */
/* Gemini contents                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Converts chat messages ({ sender, text, followUps? }) into Gemini `contents`.
 * - keeps the last 20 messages including the new user turn
 * - drops leading model turns so the first item is always role "user"
 * - merges consecutive turns of the same role
 * - re-attaches each bot reply's chips line, so the model keeps the `[[chips]]` format
 */
export function buildContents(history, userText) {
  const turns = [];
  for (const m of history || []) {
    if (!m || m.kind === "welcome" || !m.text || m.streaming) continue;
    if (m.sender === "user") {
      turns.push({ role: "user", text: String(m.text) });
    } else {
      const chips = m.followUps?.length ? `\n[[chips]] ${m.followUps.join(" | ")}` : "";
      turns.push({ role: "model", text: `${m.text}${chips}` });
    }
  }
  turns.push({ role: "user", text: userText });

  let window = turns.slice(-MAX_HISTORY_MESSAGES);
  while (window.length && window[0].role !== "user") window = window.slice(1);

  const contents = [];
  for (const t of window) {
    const last = contents[contents.length - 1];
    if (last && last.role === t.role) {
      last.parts[0].text += `\n\n${t.text}`;
    } else {
      contents.push({ role: t.role, parts: [{ text: t.text }] });
    }
  }
  return contents;
}

/* -------------------------------------------------------------------------- */
/* Chips line                                                                 */
/* -------------------------------------------------------------------------- */

/** Text safe to show while streaming: everything before the chips line, minus a half-typed marker. */
export function visibleText(raw) {
  const s = String(raw || "");
  const m = CHIPS_MARKER.exec(s);
  if (m) return s.slice(0, m.index).trimEnd();
  return s.replace(CHIPS_PARTIAL_TAIL, "").trimEnd();
}

/** Splits a finished reply into its visible text and the chips Gemini proposed. */
export function splitChips(raw) {
  const s = String(raw || "");
  const m = CHIPS_MARKER.exec(s);
  if (!m) return { text: s.trim(), chips: [] };
  const line = s.slice(m.index + m[0].length).split(/\r?\n/)[0] ?? "";
  const chips = line
    .split("|")
    .map((c) =>
      c
        .replace(/^[\s\-*•\d.)"'“”]+/, "")
        .replace(/["'“”\s]+$/, "")
        .replace(/\p{Extended_Pictographic}\uFE0F?/gu, "")
        .trim(),
    )
    .filter((c) => c.length >= 3 && c.length <= 90 && !/\[\[|https?:\/\//i.test(c));
  return { text: s.slice(0, m.index).trim(), chips };
}

/* -------------------------------------------------------------------------- */
/* SSE stream from Gemini                                                     */
/* -------------------------------------------------------------------------- */

function thinkingFor(model) {
  if (/^gemini-2\.5-flash/.test(model)) return { thinkingBudget: 0 };
  if (/^gemini-3\.(1|5|6)-/.test(model)) return { thinkingLevel: "minimal" };
  return undefined; // unknown family: use the model default
}

/** Text of one SSE JSON event: candidates[0].content.parts[*].text, skipping thought parts. */
export function textOfChunk(json) {
  return (json?.candidates?.[0]?.content?.parts || [])
    .filter((p) => p && !p.thought)
    .map((p) => p.text || "")
    .join("");
}

/** Parses one SSE event block ("data: {...}" lines) into JSON, or null. */
export function parseSseEvent(block) {
  const data = String(block)
    .split("\n")
    .filter((l) => l.startsWith("data:"))
    .map((l) => l.slice(5).trimStart())
    .join("");
  if (!data || data === "[DONE]") return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * Async generator over one model's SSE stream: yields raw text pieces as they arrive.
 * `firstTokenMs` bounds the wait for the first piece; after that STREAM_IDLE_MS applies.
 * If the stream stalls or drops after text arrived, it ends quietly (the text is kept).
 */
async function* geminiPieces({ model, contents, system, key, signal, firstTokenMs, noThinking }) {
  const controller = new AbortController();
  let timer = null;
  let timedOut = false;
  let gotText = false;
  let blockReason = "";
  const arm = (ms) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, ms);
  };
  const onOuterAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", onOuterAbort, { once: true });
  }

  // Higher temperature: fresh wording every time instead of the same scripted reply.
  const generation_config = { temperature: 0.95, topP: 0.95, maxOutputTokens: 1000 };
  const thinking = noThinking ? undefined : thinkingFor(model);
  if (thinking) generation_config.thinkingConfig = thinking;

  arm(firstTokenMs);
  try {
    // Key in the query string + text/plain body = a CORS "simple request": the browser skips the
    // preflight OPTIONS round trip. The key is public in the bundle either way.
    const url = `${API_ROOT}/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ system_instruction: { parts: system }, contents, generation_config }),
      signal: controller.signal,
    });

    if (!res.ok) {
      let detail = "";
      try {
        detail = (await res.json())?.error?.message || "";
      } catch {
        /* non-JSON error body */
      }
      throw new GeminiError(
        `Gemini ${model} responded ${res.status}${detail ? `: ${detail}` : ""}`,
        {
          status: res.status,
          retryable: RETRY_STATUSES.has(res.status),
          auth:
            res.status === 401 ||
            res.status === 403 ||
            (res.status === 400 && /api[ _]key/i.test(detail)),
          thinking: res.status === 400 && /thinking/i.test(detail),
        },
      );
    }

    const handle = (block) => {
      const json = parseSseEvent(block);
      if (!json) return "";
      blockReason = json?.promptFeedback?.blockReason || blockReason;
      return textOfChunk(json);
    };

    if (res.body && typeof res.body.getReader === "function") {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
        let i;
        while ((i = buf.indexOf("\n\n")) >= 0) {
          const piece = handle(buf.slice(0, i));
          buf = buf.slice(i + 2);
          if (piece) {
            gotText = true;
            arm(STREAM_IDLE_MS);
            yield piece;
          }
        }
      }
      const tail = buf.trim() ? handle(buf) : "";
      if (tail) {
        gotText = true;
        yield tail;
      }
    } else {
      // No streaming body (very old browsers): read it all, then hand it over in event order.
      for (const block of (await res.text()).replace(/\r\n/g, "\n").split("\n\n")) {
        const piece = handle(block);
        if (piece) {
          gotText = true;
          yield piece;
        }
      }
    }

    if (!gotText) {
      throw new GeminiError(`Gemini ${model} returned no text (${blockReason || "empty"})`, {
        retryable: true,
      });
    }
  } catch (err) {
    if (signal?.aborted) throw err; // the visitor cancelled
    if (gotText) return; // stalled or dropped mid-reply: keep what already arrived
    if (err instanceof GeminiError) throw err;
    throw new GeminiError(
      timedOut ? `Gemini ${model} timed out` : err?.message || "Network error",
      { retryable: true },
    );
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onOuterAbort);
    controller.abort(); // closes the connection if the consumer stopped early
  }
}

/** Splits a finished local answer into small word groups for simulated streaming. */
export function localChunks(text, wordsPerChunk = LOCAL_WORDS_PER_CHUNK) {
  const words = String(text).match(/\S+\s*|\s+/g) || [];
  const out = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    out.push(words.slice(i, i + wordsPerChunk).join(""));
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/* Offline matcher                                                            */
/* -------------------------------------------------------------------------- */

const NON_ASCII = /[^\x00-\x7F]/;
const regexCache = new Map();

function normalise(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Short ASCII words need a whole-word match (so "age" never hits "language"); longer ones match as stems. */
function keywordRegExp(kw) {
  let re = regexCache.get(kw);
  if (!re) {
    const body = escapeRegExp(kw);
    re =
      kw.length <= 4
        ? new RegExp(`(?:^|[^a-z0-9])${body}(?:s|es)?(?![a-z0-9])`)
        : new RegExp(`(?:^|[^a-z0-9])${body}`);
    regexCache.set(kw, re);
  }
  return re;
}

function scoreEntry(entry, q) {
  let score = 0;
  for (const raw of entry.keywords) {
    const kw = raw.toLowerCase();
    if (kw.startsWith("=")) {
      if (q.replace(/[?!.\s]+$/g, "") === kw.slice(1)) score += 5;
    } else if (NON_ASCII.test(kw)) {
      if (q.includes(kw)) score += 3;
    } else if (keywordRegExp(kw).test(q)) {
      score += /[\s-]/.test(kw) ? 3 : 2;
    }
  }
  return score;
}

/**
 * Entries with a positive score, best first. "Weak" entries (greetings, thanks) sink below any
 * real topic, so "Hi, what's his stack?" is about the stack. Ties keep file order.
 */
export function rankLocalEntries(text) {
  const q = normalise(text);
  if (!q) return [];
  const ranked = LOCAL_FALLBACK_QA.map((entry, index) => ({
    entry,
    index,
    score: scoreEntry(entry, q),
  })).filter((r) => r.score > 0);
  const hasStrong = ranked.some((r) => !r.entry.weak && r.score >= 2);
  return ranked.sort(
    (a, b) =>
      (hasStrong ? Number(Boolean(a.entry.weak)) - Number(Boolean(b.entry.weak)) : 0) ||
      b.score - a.score ||
      a.index - b.index,
  );
}

export function findLocalAnswer(text) {
  const best = rankLocalEntries(text)[0];
  return best && best.score >= 2 ? best.entry : null;
}

/**
 * Curated answer that can be served without the network: a short question whose clear best
 * match is marked `instant`. Greetings only count before the visitor has asked anything.
 */
export function findInstantAnswer(text, history = []) {
  const q = normalise(text);
  if (!q || q.split(" ").length > 8) return null;
  const [best, second] = rankLocalEntries(q);
  if (!best?.entry.instant || best.score < 2) return null;
  if (second && !second.entry.weak && second.score >= best.score) return null;
  if (best.entry.topic === "greeting" && history.some((m) => m?.sender === "user")) return null;
  return best.entry;
}

/* -------------------------------------------------------------------------- */
/* Topics, follow-up chips, contact card                                      */
/* -------------------------------------------------------------------------- */

export function detectTopic(userText, replyText = "") {
  const fromUser = rankLocalEntries(userText)[0];
  if (fromUser && fromUser.score >= 2) return fromUser.entry.topic;
  const fromReply = rankLocalEntries(replyText)[0];
  if (fromReply && fromReply.score >= 6) return fromReply.entry.topic;
  return "default";
}

function chipKey(s) {
  return normalise(s).replace(/[?!.]+$/g, "");
}

/**
 * Exactly three follow-up chips: Gemini's own suggestions first (when present), then two from
 * the topic and one that fits the visitor's style, never repeating a question already asked.
 * @param {{ userText: string, replyText?: string, history?: Array<{sender?: string, text?: string}>,
 *   topic?: string, mode?: string, modelChips?: string[] }} args
 * @returns {string[]}
 */
export function generateFollowUps({
  userText,
  replyText = "",
  history = [],
  topic,
  mode,
  modelChips = [],
}) {
  const t = topic || detectTopic(userText, replyText);
  const asked = new Set([chipKey(userText)]);
  for (const m of history) if (m?.sender === "user") asked.add(chipKey(m.text));

  const picked = [];
  const seen = new Set();
  const take = (list, limit) => {
    for (const s of list || []) {
      if (picked.length >= limit) return;
      const k = chipKey(s);
      if (!k || asked.has(k) || seen.has(k)) continue;
      seen.add(k);
      picked.push(s);
    }
  };

  take(modelChips, 3);
  const topicList = FOLLOW_UP_SUGGESTIONS[t] || [];
  const modeList = mode && mode !== "unclear" ? FOLLOW_UP_SUGGESTIONS[`mode_${mode}`] : null;
  take(topicList, modeList ? 2 : 3);
  if (modeList) take(modeList, 3);
  take(topicList, 3);
  take(FOLLOW_UP_SUGGESTIONS.default, 3);
  take(Object.values(FOLLOW_UP_SUGGESTIONS).flat(), 3);
  return picked;
}

export function shouldShowContactCard({ topic, userText, replyText }) {
  return (
    CONTACT_TOPICS.has(topic) ||
    CONTACT_INTENT.test(userText || "") ||
    /@sarydanish|danishsary4@gmail\.com/i.test(replyText || "")
  );
}

function finalise({ text, source, model, userText, history, knownTopic, mode, modelChips }) {
  const topic = knownTopic || detectTopic(userText, text);
  return {
    text,
    source,
    model: model || null,
    topic,
    mode,
    followUps: generateFollowUps({ userText, replyText: text, history, topic, mode, modelChips }),
    showContactCard: shouldShowContactCard({ topic, userText, replyText: text }),
  };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Streams Jarvis's answer to the last user message in `history`.
 * @param {Array<{sender: "user"|"bot", text: string, kind?: string, followUps?: string[]}>} history
 * @param {(delta: string, text: string, source: string) => void} [onChunk]
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {AsyncGenerator<
 *   {type: "chunk", delta: string, text: string, source: string} |
 *   {type: "done", result: {text: string, source: "instant"|"cache"|"gemini"|"local",
 *     model: string|null, topic: string, mode: string, followUps: string[], showContactCard: boolean}}
 * >}
 */
export async function* streamJarvisResponse(history = [], onChunk, { signal } = {}) {
  const all = Array.isArray(history) ? history : [];
  let lastUser = -1;
  for (let i = all.length - 1; i >= 0; i -= 1) {
    if (all[i]?.sender === "user") {
      lastUser = i;
      break;
    }
  }
  const question = sanitizeInput(lastUser >= 0 ? all[lastUser].text : "");
  const prior = lastUser >= 0 ? all.slice(0, lastUser) : all;
  const mode = detectVisitorMode(prior, question);

  let shown = "";
  const emit = (text, source) => {
    const delta = text.startsWith(shown) ? text.slice(shown.length) : text;
    shown = text;
    onChunk?.(delta, text, source);
    return { type: "chunk", delta, text, source };
  };

  // 1. Instant curated answers: one chunk, no network.
  const instant = findInstantAnswer(question, prior);
  if (instant) {
    const instantText = pickAnswer(instant);
    yield emit(instantText, "instant");
    yield {
      type: "done",
      result: finalise({
        text: instantText,
        source: "instant",
        userText: question,
        history: prior,
        knownTopic: instant.topic,
        mode,
      }),
    };
    return;
  }

  // 2. Gemini: true token streaming inside a strict budget.
  const key = getApiKey();
  const online = typeof navigator === "undefined" || navigator.onLine !== false;
  if (question && key && online && Date.now() >= remoteBlockedUntil) {
    const contents = buildContents(prior, question);
    const system = [
      { text: JARVIS_SYSTEM_PROMPT }, // identical on every request, so Gemini can cache the prefix
      {
        text: siteSignal({
          mode,
          isFirstReply: !prior.some((m) => m?.sender === "user"),
          language: detectLanguage(question),
          edges: previousReplyEdges(prior),
        }),
      },
    ];
    const dead = deadModels();
    const live = MODEL_CHAIN.filter((m) => !dead.has(m));
    const chain = live.length ? live : MODEL_CHAIN;
    const deadline = Date.now() + REQUEST_TIMEOUT_MS;
    let rateLimited = 0;

    for (let i = 0; i < chain.length; i += 1) {
      const model = chain[i];
      const remaining = deadline - Date.now();
      if (remaining < 750) break;
      const firstTokenMs = i < chain.length - 1 ? Math.min(remaining, ATTEMPT_CAP_MS) : remaining;
      let raw = "";
      try {
        for (let noThinking = false; ; noThinking = true) {
          try {
            for await (const piece of geminiPieces({
              model,
              contents,
              system,
              key,
              signal,
              firstTokenMs,
              noThinking,
            })) {
              raw += piece;
              const visible = visibleText(raw);
              if (visible && visible !== shown) yield emit(visible, "gemini");
            }
            break;
          } catch (err) {
            // This model rejects the thinking setting: retry once without it.
            if (err?.thinking && !noThinking && !raw) continue;
            throw err;
          }
        }
        const { text, chips } = splitChips(raw);
        if (text !== shown) yield emit(text, "gemini");
        const result = finalise({
          text,
          source: "gemini",
          model,
          userText: question,
          history: prior,
          mode,
          modelChips: chips,
        });
        yield { type: "done", result };
        return;
      } catch (err) {
        if (signal?.aborted) throw err;
        if (import.meta.env?.DEV) console.warn(`[Jarvis] ${err?.message || err}`);
        if (err.status === 404) markDead(model);
        if (err.status === 429) rateLimited += 1;
        if (err.auth) {
          remoteBlockedUntil = Number.POSITIVE_INFINITY; // bad key: stop calling this session
          break;
        }
        if (!err.retryable) break;
      }
    }
    if (rateLimited > 0 && rateLimited === chain.length) remoteBlockedUntil = Date.now() + 60_000;
  }

  // 3. Offline / quota / failure path: simulated streaming of the best local answer.
  const entry = findLocalAnswer(question);
  const text = entry ? pickAnswer(entry) : LOCAL_FALLBACK_DEFAULT;
  let acc = "";
  for (const piece of localChunks(text)) {
    await wait(LOCAL_CHUNK_MS, signal);
    acc += piece;
    yield emit(acc, "local");
  }
  yield {
    type: "done",
    result: finalise({
      text,
      source: "local",
      userText: question,
      history: prior,
      knownTopic: entry?.topic,
      mode,
    }),
  };
}

/**
 * Promise wrapper around streamJarvisResponse.
 * @param {{ history?: Array, userText: string, signal?: AbortSignal, onToken?: (text: string) => void }} args
 * @returns the same `result` object the generator's "done" event carries
 */
export async function askJarvis({ history = [], userText, signal, onToken } = {}) {
  const conversation = [...history, { sender: "user", text: userText }];
  let result = null;
  for await (const ev of streamJarvisResponse(conversation, undefined, { signal })) {
    if (ev.type === "chunk") onToken?.(ev.text);
    else if (ev.type === "done") result = ev.result;
  }
  return result;
}
