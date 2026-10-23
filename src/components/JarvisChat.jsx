import { useCallback, useEffect, useRef, useState } from "react";
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
  askJarvis,
  isRemoteAvailable,
  sanitizeInput,
} from "../services/jarvisApi";
import { JarvisMarkdown } from "./jarvis/JarvisMarkdown";

/**
 * Jarvis chat panel. The floating robot button lives in site/ChatbotWidget.tsx and
 * drives this component through `open` / `onClose`.
 *
 * Props
 *  - open            whether the panel is visible (the panel stays mounted so a pending reply survives closing)
 *  - onClose(reason) "escape" | "outside" | "button"
 *  - triggerRef      ref of the floating button (clicks on it are not "outside")
 *  - avatar          node rendered in the header avatar tile
 *  - onBusyChange    (isThinking: boolean) => void
 *  - onBotMessage    (message) => void, called for every Jarvis reply (used for the unread badge)
 */

const STORAGE_KEY = "jarvis-chat-v1";
const MAX_STORED_MESSAGES = 40;

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
      (m) => m && typeof m.text === "string" && (m.sender === "user" || m.sender === "bot"),
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

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
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

function ContactCard() {
  const base =
    "press inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border px-2.5 text-[12px] font-medium no-underline transition-colors duration-150 max-sm:min-h-11";
  return (
    <div className="mt-3 rounded-xl border border-line bg-surface-2 p-2.5">
      <p className="mb-2 text-[12px] leading-tight text-fg-muted">
        <span className="font-semibold text-fg">Reach Danish.</span> Telegram is the fastest.
      </p>
      <div className="flex flex-wrap gap-1.5">
        <a
          href={JARVIS_CONTACT.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(base, "border-transparent bg-fg text-bg hover:opacity-90", FOCUS)}
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          Telegram
        </a>
        <a
          href={`mailto:${JARVIS_CONTACT.email}`}
          className={cx(base, "border-line-strong bg-surface-1 text-fg hover:border-gold", FOCUS)}
        >
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          Email
        </a>
        <a
          href={JARVIS_CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(base, "border-line-strong bg-surface-1 text-fg hover:border-gold", FOCUS)}
        >
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
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
    <div className="flex justify-start gap-2.5" role="status" aria-live="polite">
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
  const [thinking, setThinking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [explorer, setExplorer] = useState(false);

  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesRef = useRef(messages);
  const busyRef = useRef(false);
  const abortRef = useRef(null);
  const onBotMessageRef = useRef(onBotMessage);

  useEffect(() => {
    messagesRef.current = messages;
    saveSession(messages);
  }, [messages]);

  useEffect(() => {
    onBotMessageRef.current = onBotMessage;
  }, [onBotMessage]);

  useEffect(() => {
    onBusyChange?.(thinking);
  }, [thinking, onBusyChange]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  // Esc closes; clicking outside closes the compact window (the expanded reading view stays put).
  useEffect(() => {
    if (!open) return undefined;
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

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;
    if (typeof el.scrollTo === "function") {
      el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, thinking, open, explorer, expanded]);

  // Grow the textarea up to ~4 lines.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 104)}px`;
  }, [input, open]);

  const send = useCallback(async (raw) => {
    const text = sanitizeInput(raw);
    if (!text || busyRef.current) return;

    busyRef.current = true;
    const controller = new AbortController();
    abortRef.current = controller;
    const history = messagesRef.current;

    setMessages((prev) => [...prev, { id: nextId("u"), sender: "user", text, time: nowLabel() }]);
    setInput("");
    setExplorer(false);
    setThinking(true);

    try {
      const result = await askJarvis({ history, userText: text, signal: controller.signal });
      const botMsg = {
        id: nextId("b"),
        sender: "bot",
        text: result.text,
        time: nowLabel(),
        source: result.source,
        followUps: result.followUps,
        showContactCard: result.showContactCard,
      };
      setMessages((prev) => [...prev, botMsg]);
      onBotMessageRef.current?.(botMsg);
    } catch {
      if (controller.signal.aborted) return;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId("b"),
          sender: "bot",
          text: "Something went wrong on my side. Please try again, or reach Danish directly on Telegram @sarydanish.",
          time: nowLabel(),
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
        setThinking(false);
      }
    }
  }, []);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    busyRef.current = false;
    setThinking(false);
    setExplorer(false);
    setInput("");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setMessages([makeWelcome()]);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  const last = messages[messages.length - 1];
  const onlyWelcome = messages.length === 1 && last?.kind === "welcome";
  const lastSource = [...messages].reverse().find((m) => m.sender === "bot" && m.source)?.source;
  const offline = lastSource ? lastSource === "local" : !isRemoteAvailable();
  const showChips =
    !thinking && !explorer && last?.sender === "bot" && !onlyWelcome && last.followUps?.length > 0;

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
        "relative mb-2.5 origin-bottom-right select-text transition-[opacity,transform,visibility] duration-200 [transition-timing-function:var(--ease-out)] motion-reduce:translate-y-0 motion-reduce:scale-100",
        open
          ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
          : "pointer-events-none invisible translate-y-2 scale-[0.96] opacity-0",
      )}
    >
      <div
        className={cx(
          "flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface-2 shadow-[var(--elev-3)] ring-1 ring-black/[0.04] dark:ring-white/[0.06]",
          expanded
            ? "h-[min(820px,calc(100dvh-7.5rem))] w-[min(760px,calc(100vw-1.5rem))]"
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
                className={cx(
                  "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-surface-1",
                  offline ? "bg-gold" : "bg-emerald-500",
                )}
              />
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
              <p className="mt-0.5 truncate font-mono text-[11px] text-fg-subtle">
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

        {/* Body */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-surface-2"
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
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cx(
                    "flex gap-2.5",
                    m.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {m.sender === "bot" ? <BotAvatar /> : null}
                  <div
                    className={cx(
                      "min-w-0 rounded-2xl px-3.5 py-2.5",
                      expanded ? "max-w-[88%]" : "max-w-[86%]",
                      m.sender === "user"
                        ? "rounded-tr-sm bg-fg font-medium text-bg"
                        : "rounded-tl-sm border border-line bg-surface-1 text-fg-muted",
                    )}
                  >
                    {m.sender === "user" ? (
                      <p className="whitespace-pre-wrap break-words">{m.text}</p>
                    ) : (
                      <div className="break-words">
                        <JarvisMarkdown text={m.text} />
                      </div>
                    )}
                    {m.sender === "bot" && m.showContactCard ? <ContactCard /> : null}
                    <span
                      className={cx(
                        "mt-1.5 block font-mono text-[10px]",
                        m.sender === "user" ? "text-right text-bg/60" : "text-fg-subtle",
                      )}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {thinking ? <ThinkingBubble /> : null}

              {onlyWelcome && !thinking ? (
                <div className="flex flex-wrap gap-1.5 pl-[38px]">
                  {STARTER_PROMPTS.map((s) => (
                    <Chip key={s.id} icon={ICONS[s.icon]} onClick={() => send(s.prompt)}>
                      {s.label}
                    </Chip>
                  ))}
                </div>
              ) : null}

              {showChips ? (
                <div
                  className="flex flex-wrap gap-1.5 pl-[38px]"
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
          className="border-t border-line bg-surface-1 p-2.5 sm:p-3"
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
              className="max-h-[104px] min-h-10 flex-1 resize-none rounded-xl border border-line-strong bg-surface-2 px-3.5 py-2 text-[16px] leading-6 text-fg shadow-2xs transition-colors duration-150 placeholder:text-fg-subtle focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 sm:text-[13.5px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              aria-label="Send message"
              className={cx(
                "press flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-fg text-bg shadow-xs transition-opacity duration-150 hover:opacity-90 disabled:pointer-events-none disabled:opacity-25 max-sm:h-11 max-sm:w-11",
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
        className="absolute -bottom-1.5 right-[21px] z-10 h-3.5 w-3.5 rotate-45 border-b border-r border-line-strong bg-surface-1 sm:right-[25px]"
      />
    </div>
  );
}

export default JarvisChat;
