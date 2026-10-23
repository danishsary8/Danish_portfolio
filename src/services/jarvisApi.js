/**
 * Jarvis conversation engine.
 *
 *  1. Sends the multi-turn history (last 20 messages) to Google Gemini.
 *  2. Walks a model fallback chain when a model is gone, overloaded or rate-limited.
 *  3. Falls back to the offline LOCAL_FALLBACK_QA matcher when the key is missing/invalid,
 *     the network drops, or every model fails, so the chat never breaks.
 *  4. Generates three context-aware follow-up chips after every reply.
 *
 * SECURITY NOTE: VITE_* variables are bundled into client JavaScript, so the Gemini key is
 * visible to anyone who opens DevTools. Restrict the key to this site's HTTP referrers and set a
 * low quota in Google AI Studio / Cloud Console, or proxy the call through a server route.
 */
import {
  JARVIS_SYSTEM_PROMPT,
  LOCAL_FALLBACK_QA,
  LOCAL_FALLBACK_DEFAULT,
  FOLLOW_UP_SUGGESTIONS,
} from "../data/jarvisKnowledge";

const API_ROOT = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * Model fallback chain, fastest working model first.
 *  - gemini-2.0-flash was shut down on 2026-06-01 and 1.5 is long gone, so neither is listed
 *    (https://ai.google.dev/gemini-api/docs/deprecations).
 *  - Checked against the project's key on 2026-10-23: gemini-2.5-flash and -flash-lite answer 404
 *    ("no longer available to new users"), gemini-3.1-flash-lite answers in ~1s, gemini-3.6-flash in ~3s.
 *    The 2.5 models stay at the tail because they still work for older projects.
 *  - Set VITE_GEMINI_MODEL to put a different model first without touching code.
 */
const DEFAULT_MODEL_CHAIN = [
  "gemini-3.1-flash-lite",
  "gemini-3.6-flash",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
];

function buildModelChain() {
  const preferred = String((import.meta.env && import.meta.env.VITE_GEMINI_MODEL) || "").trim();
  return preferred
    ? [preferred, ...DEFAULT_MODEL_CHAIN.filter((m) => m !== preferred)]
    : DEFAULT_MODEL_CHAIN;
}

export const MODEL_CHAIN = buildModelChain();

/** Models that answered 404 this page session are skipped (as long as another model is left to try). */
const deadModels = new Set();

export const MAX_HISTORY_MESSAGES = 20;
export const MAX_INPUT_CHARS = 800;
const REQUEST_TIMEOUT_MS = 20000;
const RETRY_STATUSES = new Set([404, 408, 429, 500, 502, 503, 504]);
const CONTACT_TOPICS = new Set(["contact", "availability", "salary", "cv", "reference"]);
const CONTACT_INTENT =
  /\b(hire|hiring|recruit\w*|contact|reach (?:out|him)|get in touch|interview|salary|available for)\b/i;

/** Remote calls are paused here after an auth failure (session) or a full rate-limit (60s). */
let remoteBlockedUntil = 0;

class GeminiError extends Error {
  constructor(message, { status = 0, retryable = false, auth = false } = {}) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
    this.retryable = retryable;
    this.auth = auth;
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

/* -------------------------------------------------------------------------- */
/* Gemini contents                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Converts chat messages ({ sender: "user" | "bot", text }) into Gemini `contents`.
 * - keeps the last 20 messages including the new user turn
 * - drops leading model turns so the first item is always role "user"
 * - merges consecutive turns of the same role
 */
export function buildContents(history, userText) {
  const turns = [];
  for (const m of history || []) {
    if (!m || m.kind === "welcome" || !m.text) continue;
    turns.push({ role: m.sender === "user" ? "user" : "model", text: String(m.text) });
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

async function callGemini(model, contents, key, outerSignal) {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(new DOMException("timeout", "TimeoutError")),
    REQUEST_TIMEOUT_MS,
  );
  const onOuterAbort = () => controller.abort(outerSignal.reason);
  if (outerSignal) {
    if (outerSignal.aborted) onOuterAbort();
    else outerSignal.addEventListener("abort", onOuterAbort, { once: true });
  }

  const generationConfig = { temperature: 0.7, topP: 0.95, maxOutputTokens: 900 };
  // 2.5 models "think" by default; switch it off for fast chat replies. Other families reject/ignore it.
  if (model.startsWith("gemini-2.5-flash")) generationConfig.thinkingConfig = { thinkingBudget: 0 };

  try {
    const res = await fetch(`${API_ROOT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: JARVIS_SYSTEM_PROMPT }] },
        contents,
        generationConfig,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      let detail = "";
      try {
        const body = await res.json();
        detail = body?.error?.message || "";
      } catch {
        /* ignore non-JSON error bodies */
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
        },
      );
    }

    const data = await res.json();
    const text = (data?.candidates?.[0]?.content?.parts || [])
      .map((p) => p?.text || "")
      .join("")
      .trim();
    if (!text) {
      const why =
        data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason || "empty";
      throw new GeminiError(`Gemini ${model} returned no text (${why})`, { retryable: true });
    }
    return text;
  } catch (err) {
    if (err instanceof GeminiError) throw err;
    if (outerSignal?.aborted) throw err; // user cancelled: propagate
    // Timeouts and network failures: try the next model, then local mode.
    throw new GeminiError(err?.message || "Network error", { retryable: true });
  } finally {
    clearTimeout(timer);
    if (outerSignal) outerSignal.removeEventListener("abort", onOuterAbort);
  }
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
      // exact whole-question match, ignoring trailing punctuation
      if (q.replace(/[?!.\s]+$/g, "") === kw.slice(1)) score += 5;
    } else if (NON_ASCII.test(kw)) {
      if (q.includes(kw)) score += 3;
    } else if (keywordRegExp(kw).test(q)) {
      score += /[\s-]/.test(kw) ? 3 : 2;
    }
  }
  return score;
}

/** All entries with a positive score, best first (stable: earlier entries win ties). */
export function rankLocalEntries(text) {
  const q = normalise(text);
  if (!q) return [];
  return LOCAL_FALLBACK_QA.map((entry, index) => ({ entry, index, score: scoreEntry(entry, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
}

export function findLocalAnswer(text) {
  const best = rankLocalEntries(text)[0];
  return best && best.score >= 2 ? best.entry : null;
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
 * Three follow-up suggestions based on what was just discussed, never repeating
 * a question the visitor already asked.
 */
export function generateFollowUps({ userText, replyText = "", history = [], topic }) {
  const t = topic || detectTopic(userText, replyText);
  const asked = new Set([chipKey(userText)]);
  for (const m of history) if (m?.sender === "user") asked.add(chipKey(m.text));

  const pool = [
    ...(FOLLOW_UP_SUGGESTIONS[t] || []),
    ...FOLLOW_UP_SUGGESTIONS.default,
    ...Object.values(FOLLOW_UP_SUGGESTIONS).flat(),
  ];

  const picked = [];
  const seen = new Set();
  for (const s of pool) {
    const k = chipKey(s);
    if (asked.has(k) || seen.has(k)) continue;
    seen.add(k);
    picked.push(s);
    if (picked.length === 3) break;
  }
  return picked;
}

export function shouldShowContactCard({ topic, userText, replyText }) {
  return (
    CONTACT_TOPICS.has(topic) ||
    CONTACT_INTENT.test(userText || "") ||
    /@sarydanish|danishsary4@gmail\.com/i.test(replyText || "")
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function finalise({ text, source, model, userText, history, knownTopic }) {
  const topic = knownTopic || detectTopic(userText, text);
  return {
    text,
    source,
    model: model || null,
    topic,
    followUps: generateFollowUps({ userText, replyText: text, history, topic }),
    showContactCard: shouldShowContactCard({ topic, userText, replyText: text }),
  };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Ask Jarvis.
 * @param {{ history: Array<{sender: "user"|"bot", text: string, kind?: string}>, userText: string, signal?: AbortSignal }} args
 * @returns {Promise<{ text: string, source: "gemini"|"local", model: string|null, topic: string, followUps: string[], showContactCard: boolean }>}
 */
export async function askJarvis({ history = [], userText, signal } = {}) {
  const question = sanitizeInput(userText);
  const key = getApiKey();
  const online = typeof navigator === "undefined" || navigator.onLine !== false;

  if (question && key && online && Date.now() >= remoteBlockedUntil) {
    const contents = buildContents(history, question);
    let rateLimited = 0;
    const live = MODEL_CHAIN.filter((m) => !deadModels.has(m));
    const chain = live.length ? live : MODEL_CHAIN;

    for (const model of chain) {
      try {
        const text = await callGemini(model, contents, key, signal);
        return finalise({ text, source: "gemini", model, userText: question, history });
      } catch (err) {
        if (signal?.aborted) throw err;
        if (import.meta.env?.DEV) console.warn(`[Jarvis] ${err?.message || err}`);
        if (err.status === 404) deadModels.add(model);
        if (err.status === 429) rateLimited += 1;
        if (err.auth) {
          remoteBlockedUntil = Number.POSITIVE_INFINITY; // bad key: stop calling for this page session
          break;
        }
        if (!err.retryable) break;
      }
    }
    if (rateLimited === chain.length) remoteBlockedUntil = Date.now() + 60_000;
  }

  // Offline / quota / failure path
  const entry = findLocalAnswer(question);
  const text = entry ? entry.answer : LOCAL_FALLBACK_DEFAULT;
  await wait(Math.min(900, 380 + text.length * 0.6));
  return finalise({
    text,
    source: "local",
    userText: question,
    history,
    knownTopic: entry ? entry.topic : undefined,
  });
}
