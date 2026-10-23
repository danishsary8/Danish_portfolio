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

export function renderInline(text, keyPrefix = "i") {
  const out = [];
  let last = 0;
  let n = 0;
  // matchAll clones the regex, so the recursive calls below cannot disturb this loop's lastIndex.
  for (const m of text.matchAll(INLINE_RE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${n++}`;
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
          {renderInline(bold.slice(2, -2), key)}
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
          {renderInline(italic.slice(1, -1), key)}
        </em>,
      );
    } else {
      out.push(token);
    }
    last = m.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const BULLET_RE = /^\s*(?:[-*\u2022])\s+(.*)$/;
const NUMBER_RE = /^\s*(\d{1,2})[.)]\s+(.*)$/;
const HEADER_RE = /^\s*#{1,4}\s+(.*)$/;

function parseBlocks(text) {
  const blocks = [];
  let para = [];
  let list = null;

  const flushPara = () => {
    if (para.length) blocks.push({ type: "p", lines: para });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };

  for (const line of String(text).replace(/\r\n?/g, "\n").split("\n")) {
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    let match;
    if ((match = HEADER_RE.exec(line))) {
      flushPara();
      flushList();
      blocks.push({ type: "h", text: match[1] ?? "" });
    } else if ((match = BULLET_RE.exec(line))) {
      flushPara();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(match[1] ?? "");
    } else if ((match = NUMBER_RE.exec(line))) {
      flushPara();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [], start: Number(match[1]) };
      }
      list.items.push(match[2] ?? "");
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();
  return blocks;
}

export function JarvisMarkdown({ text }) {
  const blocks = parseBlocks(text);
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        const key = `b${i}`;
        if (b.type === "h") {
          return (
            <p key={key} className="pt-0.5 font-semibold tracking-[-0.01em] text-fg">
              {renderInline(b.text, key)}
            </p>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={key} className="space-y-1 pl-4 [&>li]:list-disc [&>li]:marker:text-fg-subtle">
              {b.items.map((it, j) => (
                <li key={`${key}-${j}`} className="pl-0.5">
                  {renderInline(it, `${key}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "ol") {
          return (
            <ol
              key={key}
              start={b.start}
              className="space-y-1 pl-5 [&>li]:list-decimal [&>li]:marker:font-mono [&>li]:marker:text-fg-subtle"
            >
              {b.items.map((it, j) => (
                <li key={`${key}-${j}`} className="pl-0.5">
                  {renderInline(it, `${key}-${j}`)}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={key}>
            {b.lines.map((ln, j) => (
              <span key={`${key}-${j}`}>
                {j > 0 ? <br /> : null}
                {renderInline(ln, `${key}-${j}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
