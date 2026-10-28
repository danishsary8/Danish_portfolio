import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Mail, MapPin } from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { PROFILE } from "@/content/portfolio";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";
import { Reveal, SECTION } from "./Reveal";

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  const icon = "absolute h-4 w-4 transition-[opacity,transform] duration-150 ease-[var(--ease-out)]";
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : `Copy email address ${PROFILE.email}`}
      className={`btn-apple btn-apple-secondary relative grid h-11 w-11 shrink-0 place-items-center rounded-full text-fg-muted hover:text-fg ${FOCUS}`}
    >
      <Copy
        className={`${icon} ${copied ? "scale-75 opacity-0" : "opacity-100"}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Check
        className={`${icon} text-fg ${copied ? "opacity-100" : "scale-75 opacity-0"}`}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

/** One row of the grouped contact list: icon tile, label, value. */
function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex min-h-[72px] items-center gap-4 bg-surface-2 bg-[image:var(--sheen)] px-5 py-3">
      <span
        aria-hidden="true"
        className="icon-tile-light squircle [--r:9px] grid h-9 w-9 shrink-0 place-items-center text-fg-muted"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12.5px] text-fg-subtle">{label}</span>
        {children}
      </span>
    </li>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const nameError = submitted && !name.trim() ? "Add your name so I know who's writing." : "";
  const messageError = submitted && !message.trim() ? "Write a short message first." : "";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!name.trim() || !message.trim()) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form noValidate onSubmit={onSubmit} className="tactile squircle [--r:20px] grid gap-5 p-6 sm:p-7">
      <div>
        <p className="text-[17px] font-semibold tracking-[-0.015em] text-fg">Send a message</p>
        <p className="mt-1 text-[13.5px] text-fg-subtle">
          Opens your email app with this message ready to send.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field h-11 border-transparent px-3.5 text-[16px] sm:text-[15px]"
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "contact-name-error" : undefined}
        />
        {nameError ? (
          <p id="contact-name-error" className="text-[13px] text-destructive">
            {nameError}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          className="field min-h-[140px] w-full resize-y px-3.5 py-3 text-[16px] leading-[1.55] text-fg placeholder:text-fg-subtle sm:text-[15px]"
        />
        {messageError ? (
          <p id="contact-message-error" className="text-[13px] text-destructive">
            {messageError}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className={`btn-apple btn-apple-primary inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[14.5px] font-medium sm:w-fit ${FOCUS}`}
      >
        <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        Write email
      </button>
    </form>
  );
}

export function Contact() {
  const time = useLocalTime(PROFILE.timezone);
  const hasCv = CV_HREF !== "#" && CV_HREF !== "";
  const sectionRef = useRef<HTMLElement>(null);

  const linkRow =
    "group flex min-w-0 items-center gap-3 text-[15px] text-fg transition-colors duration-150";
  const arrow =
    "h-4 w-4 shrink-0 text-fg-subtle transition-[transform,color] duration-150 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-fg";

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className={SECTION}>
      {/* Closing statement: weight follows the pointer (React Bits VariableProximity) */}
      <Reveal>
        <h2
          id="contact-title"
          className="max-w-[10.928em] text-[44px] font-semibold leading-[1] tracking-[-0.045em] text-fg sm:text-[60px] lg:text-[80px]"
        >
          <span className="sr-only">Let’s build something useful.</span>
          <span aria-hidden="true">
            <VariableProximity
              label="Let’s build something useful."
              fromFontVariationSettings="'wght' 560"
              toFontVariationSettings="'wght' 860"
              containerRef={sectionRef}
              radius={140}
              falloff="gaussian"
            />
          </span>
        </h2>
      </Reveal>
      <Reveal index={1}>
        <p className="mt-6 max-w-[34.476em] text-[16px] leading-[1.6] text-fg-muted">
          Hiring for a web team, or have a project in mind? Email reaches me fastest; Telegram works
          too.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <Reveal index={2}>
          <ul className="tactile squircle [--r:20px] grid gap-px overflow-hidden bg-[var(--edge)]">
            <Row icon={<Mail className="h-4 w-4" strokeWidth={1.5} />} label="Email">
              <span className="flex items-center gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="min-w-0 truncate text-[15px] text-fg underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-fg-subtle"
                >
                  {PROFILE.email}
                </a>
                <span className="ml-auto">
                  <CopyEmail />
                </span>
              </span>
            </Row>
            <Row icon={<SiGithub className="h-4 w-4" />} label="GitHub">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className={linkRow}>
                <span className="truncate">github.com/{PROFILE.githubHandle}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className={arrow} />
              </a>
            </Row>
            <Row icon={<SiTelegram className="h-4 w-4 text-[#229ED9]" />} label="Telegram">
              <a href={PROFILE.telegram} target="_blank" rel="noreferrer" className={linkRow}>
                <span className="truncate">{PROFILE.telegramHandle}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className={arrow} />
              </a>
            </Row>
            <Row icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />} label="Based in">
              <span className="block text-[15px] text-fg">
                Phnom Penh, Cambodia ·{" "}
                <span className="font-mono text-[13.5px] tabular-nums">{time ?? "--:--"}</span>{" "}
                <span className="text-fg-subtle">{PROFILE.timezoneLabel}</span>
              </span>
            </Row>
            {hasCv ? (
              <Row icon={<FileText className="h-4 w-4" strokeWidth={1.5} />} label="Résumé">
                <a {...getCvLinkProps()} className={linkRow}>
                  <span>Download CV</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className={arrow} />
                </a>
              </Row>
            ) : null}
          </ul>
        </Reveal>
        <Reveal index={3}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.015em] text-fg">{PROFILE.name}</p>
          <p className="mt-1 text-[13.5px] text-fg-subtle">
            Web developer &amp; student · © {new Date().getFullYear()}
          </p>
        </div>
        <div className="-mx-3 flex items-center text-[13.5px] text-fg-subtle">
          <Link
            to="/design-system"
            className="inline-flex min-h-11 items-center rounded-control px-3 transition-colors duration-150 hover:text-fg"
          >
            Design system
          </Link>
          <a
            href="#home"
            className="group inline-flex min-h-11 items-center gap-1.5 rounded-control px-3 transition-colors duration-150 hover:text-fg"
          >
            Back to top
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-150 ease-[var(--ease-out)] group-hover:-translate-y-px"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
