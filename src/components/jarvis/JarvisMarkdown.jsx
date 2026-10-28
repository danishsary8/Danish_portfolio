import { ExternalLink, Github, Mail, Phone, Send } from "lucide-react";

/**
 * Lightweight, XSS-safe markdown renderer for Jarvis replies.
 * Output is React elements only (never innerHTML).
 *
 * Blocks: headers (#..####), bullet lists (- * •), numbered lists, paragraphs.
 * Inline: **bold**, *italic*, `code`, [label](url), bare URLs, and auto-linked contact details:
 *   danishsary4@gmail.com -> mailto badge    @sarydanish      -> t.me badge
 *   github.com/danishsary8 -> GitHub badge   087 680 999      -> tel badge
 */

const INLINE_RE = new RegExp(
  [
    "(`[^`\\n]+`)", // 1 code
    "(\\*\\*[^*\\n]+?\\*\\*)", // 2 bold
    "(\\[[^\\]\\n]+\\]\\([^)\\s]+\\))", // 3 markdown link
    "(https?:\\/\\/[^\\s<>()\\[\\]]*[^\\s<>()\\[\\].,;:!?'\"*])", // 4 bare url
    "([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)*\\.[A-Za-z]{2,})", // 5 email
    "(@sarydanish\\b)", // 6 telegram handle
    "((?:www\\.)?github\\.com\\/danishsary8\\b)", // 7 github (no scheme)
    "(\\b0\\d{2}[ -]?\\d{3}[ -]?\\d{3}\\b)", // 8 phone
    "(\\*[^*\\s][^*\\n]*?\\*)", // 9 italic
  ].join("|"),
  "g",
);

const BADGE =
  "mx-0.5 inline-flex items-center gap-1 rounded-md border border-line-strong bg-surface-2 px-1.5 py-px align-baseline text-[0.92em] font-medium text-fg no-underline transition-colors duration-150 hover:border-gold hover:text-gold-ink dark:hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

function safeHref(href) {
  if (/^(https?:\/\/|mailto:|tel:)/i.test(href)) return href;
  if (/^\/[A-Za-z0-9._~\-/]*$/.test(href)) return href; // site-relative, e.g. /sary-danish-cv.pdf
  return null;
}

function prettyUrl(href) {
  try {
    const u = new URL(href);
    const path = u.pathname === "/" ? "" : u.pathname.replace(/\/$/, "");
    return `${u.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return href;
  }
}

function Badge({ href, icon: Icon, children, external = true, label }) {
  return (
    <a
      href={href}
      className={BADGE}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {Icon ? <Icon className="h-3 w-3 shrink-0 opacity-70" aria-hidden="true" /> : null}
      <span className="break-all">{children}</span>
    </a>
  );
}

/**
 * Splits plain text into word spans that fade in once when they mount (streaming only).
 * Keys depend only on position, so words already on screen never re-animate.
 */
function fadeWords(str, keyPrefix) {
  const parts = str.match(/\s*\S+\s*|\s+/g) || [];
  return parts.map((w, i) => (
    <span key={`${keyPrefix}-w${i}`} className="jarvis-word">
      {w}
    </span>
  ));
}

/**
 * Inline markdown -> React nodes.
 * @param {string} text
 * @param {string} [keyPrefix]
 * @param {boolean} [animate] wrap words and badges so each new piece fades in while streaming
 */
export function renderInline(text, keyPrefix = "i", animate = false) {
  const out = [];
  let last = 0;
  let n = 0;
  let seg = 0;
  const pushText = (str) => {
    if (!str) return;
    if (animate) out.push(...fadeWords(str, `${keyPrefix}-s${seg++}`));
    else out.push(str);
  };
  // matchAll clones the regex, so the recursive calls below cannot disturb this loop's lastIndex.
  for (const m of text.matchAll(INLINE_RE)) {
    if (m.index > last) pushText(text.slice(last, m.index));
    const key = `${keyPrefix}-${n++}`;
    const before = out.length;
    const [token, code, bold, mdLink, url, email, tg, gh, phone, italic] = m;

    if (code) {
      out.push(
        <code
          key={key}
          className="rounded bg-surface-2 px-1 py-px font-mono text-[0.88em] text-fg ring-1 ring-line"
        >
          {code.slice(1, -1)}
        </code>,
      );
    } else if (bold) {
      out.push(
        <strong key={key} className="font-semibold text-fg">
          {renderInline(bold.slice(2, -2), key, animate)}
        </strong>,
      );
    } else if (mdLink) {
      const sep = mdLink.indexOf("](");
      const label = mdLink.slice(1, sep);
      const href = safeHref(mdLink.slice(sep + 2, -1));
      out.push(
        href ? (
          <Badge key={key} href={href} icon={ExternalLink}>
            {label}
          </Badge>
        ) : (
          label
        ),
      );
    } else if (url) {
      const href = safeHref(url);
      if (/^https?:\/\/(www\.)?github\.com\/danishsary8\/?$/i.test(url)) {
        out.push(
          <Badge
            key={key}
            href="https://github.com/danishsary8"
            icon={Github}
            label="Danish on GitHub"
          >
            github.com/danishsary8
          </Badge>,
        );
      } else if (/^https?:\/\/t\.me\/sarydanish\/?$/i.test(url)) {
        out.push(
          <Badge
            key={key}
            href="https://t.me/sarydanish"
            icon={Send}
            label="Message Danish on Telegram"
          >
            @sarydanish
          </Badge>,
        );
      } else if (href) {
        out.push(
          <Badge key={key} href={href} icon={ExternalLink}>
            {prettyUrl(url)}
          </Badge>,
        );
      } else {
        out.push(url);
      }
    } else if (email) {
      out.push(
        <Badge
          key={key}
          href={`mailto:${email}`}
          icon={Mail}
          external={false}
          label={`Email ${email}`}
        >
          {email}
        </Badge>,
      );
    } else if (tg) {
      out.push(
        <Badge
          key={key}
          href="https://t.me/sarydanish"
          icon={Send}
          label="Message Danish on Telegram"
        >
          @sarydanish
        </Badge>,
      );
    } else if (gh) {
      out.push(
        <Badge
          key={key}
          href="https://github.com/danishsary8"
          icon={Github}
          label="Danish on GitHub"
        >
          github.com/danishsary8
        </Badge>,
      );
    } else if (phone) {
      out.push(
        <Badge
          key={key}
          href={`tel:${phone.replace(/\D/g, "")}`}
          icon={Phone}
          external={false}
          label={`Call ${phone}`}
        >
          {phone}
        </Badge>,
      );
    } else if (italic) {
      out.push(
        <em key={key} className="italic">
          {renderInline(italic.slice(1, -1), key, animate)}
        </em>,
      );
    } else {
      pushText(token);
    }
    // Badges and inline code fade in as one piece (bold/italic fade word by word inside).
    if (animate && !bold && !italic) {
      for (let k = before; k < out.length; k += 1) {
        const node = out[k];
        if (node && typeof node === "object") {
          out[k] = (
            <span key={`${key}-fade${k}`} className="jarvis-word">
              {node}
            </span>
          );
        }
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) pushText(text.slice(last));
  return out;
}

const BULLET_RE = /^\s*(?:[-*\u2022])\s+(.*)$/;
const NUMBER_RE = /^\s*(\d{1,2})[.)]\s+(.*)$/;
const HEADER_RE = /^\s*#{1,4}\s+(.*)$/;
const QUOTE_RE = /^\s*>\s?(.*)$/;
const FENCE_RE = /^\s*```\s*([\w+-]*)\s*$/;
const FENCE_CLOSE_RE = /^\s*```\s*$/;

/**
 * Block grammar: headers, "- " / "1." lists, "> " blockquotes, ``` fenced code, paragraphs.
 * An unclosed fence (while streaming) still renders as a code block, so it never reflows.
 */
export function parseBlocks(text) {
  const blocks = [];
  let para = [];
  let list = null;
  let quote = null;
  let code = null;

  const flushPara = () => {
    if (para.length) blocks.push({ type: "p", lines: para });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };
  const flushQuote = () => {
    if (quote) blocks.push(quote);
    quote = null;
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
  };

  for (const line of String(text).replace(/\r\n?/g, "\n").split("\n")) {
    if (code) {
      if (FENCE_CLOSE_RE.test(line)) {
        blocks.push(code);
        code = null;
      } else {
        code.lines.push(line);
      }
      continue;
    }
    let match;
    if ((match = FENCE_RE.exec(line))) {
      flushAll();
      code = { type: "code", lang: match[1] ?? "", lines: [] };
    } else if (!line.trim()) {
      flushAll();
    } else if ((match = HEADER_RE.exec(line))) {
      flushAll();
      blocks.push({ type: "h", text: match[1] ?? "" });
    } else if ((match = QUOTE_RE.exec(line))) {
      flushPara();
      flushList();
      if (!quote) quote = { type: "quote", lines: [] };
      quote.lines.push((match[1] ?? "").trim());
    } else if ((match = BULLET_RE.exec(line))) {
      flushPara();
      flushQuote();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(match[1] ?? "");
    } else if ((match = NUMBER_RE.exec(line))) {
      flushPara();
      flushQuote();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [], start: Number(match[1]) };
      }
      list.items.push(match[2] ?? "");
    } else {
      flushList();
      flushQuote();
      para.push(line.trim());
    }
  }
  if (code) blocks.push(code);
  flushAll();
  return blocks;
}

/** True when the text ends inside an unclosed ``` fence. */
function insideOpenFence(s) {
  let open = false;
  for (const line of s.split("\n")) {
    if (open ? FENCE_CLOSE_RE.test(line) : FENCE_RE.test(line)) open = !open;
  }
  return open;
}

/**
 * While a reply is still streaming, hide markup that is only half typed, so the bubble never
 * shows raw `**`, a backtick or a link that then jumps into a badge (no flicker, no reflow).
 * Inline markup never spans lines, so only the last line needs fixing.
 */
export function stabilizeStreaming(text) {
  const s = String(text || "");
  if (insideOpenFence(s)) return s; // code is shown verbatim
  const cut = s.lastIndexOf("\n") + 1;
  const head = s.slice(0, cut);
  let tail = s.slice(cut);

  // A fence or block marker that is still being typed.
  if (
    /^\s*`{1,3}[\w+-]*$/.test(tail) ||
    /^\s*(?:[-*\u2022]|\d{1,2}[.)]|#{1,4}|>)?\s*$/.test(tail)
  ) {
    return head;
  }
  // Contact details, URLs and handles become badges only once complete: hold back the last token.
  tail = tail.replace(/(^|\s)(?:https?:|www\.|github\.|@|\S*@|0\d)\S*$/, "$1");
  // A link whose label or URL is still arriving: show the label as plain text.
  tail = tail.replace(/\[([^\]\n]*)\]\([^)\s]*$/, "$1").replace(/\[([^\]\n]*)$/, "$1");
  // Unclosed bold, code or italic: close it for now, so the text is styled from its first word
  // (like ChatGPT) instead of popping into bold when the closing marker arrives. A marker with
  // nothing after it yet is hidden.
  tail = tail.replace(/\s*(?:\*\*|`|\*)$/, (m) => (m.trim() ? "" : m));
  if (((tail.match(/\*\*/g) || []).length & 1) === 1) tail += "**";
  if (((tail.match(/`/g) || []).length & 1) === 1) tail += "`";
  if (/(^|[^*])\*(?=[^\s*])[^*\n]*$/.test(tail.replace(/\*\*/g, ""))) tail += "*";
  return head + tail;
}

/** Streaming indicator: a small gold dot that breathes at the end of the text (ChatGPT-style). */
export function StreamCaret() {
  return (
    <span
      aria-hidden="true"
      data-jarvis-caret=""
      className="jarvis-caret ml-1 inline-block h-[0.62em] w-[0.62em] rounded-full bg-gold-ink align-middle dark:bg-gold"
    />
  );
}

function withTail(nodes, tail) {
  return tail ? [...nodes, <span key="tail">{tail}</span>] : nodes;
}

/**
 * Renders a Jarvis reply.
 *  - streaming: hides half-typed markup (see stabilizeStreaming)
 *  - tail: node appended inline at the very end of the text (the streaming caret)
 *  - fade: render words as fade-in spans (defaults to `streaming`)
 * @param {{ text: string, streaming?: boolean, fade?: boolean, tail?: import("react").ReactNode }} props
 */
export function JarvisMarkdown({ text, streaming = false, fade = streaming, tail = null }) {
  const blocks = parseBlocks(streaming ? stabilizeStreaming(text) : text);
  // `fade` keeps the word spans for a moment after streaming ends, so the last words finish
  // their fade instead of snapping in.
  const animate = fade;
  if (!blocks.length && tail) return <p>{tail}</p>;
  const lastIndex = blocks.length - 1;

  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        const key = `b${i}`;
        const t = i === lastIndex ? tail : null;

        if (b.type === "h") {
          return (
            <p key={key} className="pt-0.5 font-semibold tracking-[-0.01em] text-fg">
              {withTail(renderInline(b.text, key, animate), t)}
            </p>
          );
        }
        if (b.type === "code") {
          return (
            <div key={key} className="overflow-hidden rounded-lg border border-line bg-surface-2">
              {b.lang ? (
                <div className="border-b border-line px-3 py-1 font-mono text-[10.5px] uppercase tracking-wide text-fg-subtle">
                  {b.lang}
                </div>
              ) : null}
              <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[12px] leading-relaxed text-fg">
                <code>{b.lines.join("\n")}</code>
                {t}
              </pre>
            </div>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote key={key} className="border-l-2 border-gold/60 pl-3 text-fg">
              {b.lines.map((ln, j) => (
                <span key={`${key}-${j}`}>
                  {j > 0 ? <br /> : null}
                  {renderInline(ln, `${key}-${j}`, animate)}
                </span>
              ))}
              {t}
            </blockquote>
          );
        }
        if (b.type === "ul" || b.type === "ol") {
          const Tag = b.type;
          return (
            <Tag
              key={key}
              start={b.type === "ol" ? b.start : undefined}
              className={
                b.type === "ul"
                  ? "space-y-1 pl-4 [&>li]:list-disc [&>li]:marker:text-fg-subtle"
                  : "space-y-1 pl-5 [&>li]:list-decimal [&>li]:marker:font-mono [&>li]:marker:text-fg-subtle"
              }
            >
              {b.items.map((it, j) => (
                <li key={`${key}-${j}`} className="pl-0.5">
                  {withTail(
                    renderInline(it, `${key}-${j}`, animate),
                    j === b.items.length - 1 ? t : null,
                  )}
                </li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={key}>
            {b.lines.map((ln, j) => (
              <span key={`${key}-${j}`}>
                {j > 0 ? <br /> : null}
                {renderInline(ln, `${key}-${j}`, animate)}
              </span>
            ))}
            {t}
          </p>
        );
      })}
    </div>
  );
}
