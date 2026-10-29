import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Mail, MapPin, Phone, Send } from "lucide-react";
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

/** One reach-me channel: brand tile, label, value link, optional trailing control. Lifts on hover. */
function Channel({
  icon,
  tint,
  label,
  note,
  children,
  trailing,
}: {
  icon: ReactNode;
  tint: string;
  label: string;
  note: string;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <li className="contact-channel squircle [--r:18px] flex items-center gap-4 px-5 py-4" style={{ "--c": tint } as CSSProperties}>
      <span aria-hidden="true" className="contact-channel-tile squircle [--r:12px] grid h-11 w-11 shrink-0 place-items-center text-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2 text-[12.5px] text-fg-subtle">
          {label}
          <span className="hidden text-fg-subtle/80 sm:inline">· {note}</span>
        </span>
        {children}
      </span>
      {trailing}
    </li>
  );
}

const REASONS = ["A full-time role", "An internship", "A project", "Just saying hi"] as const;

function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState<(typeof REASONS)[number]>(REASONS[0]);
  const [submitted, setSubmitted] = useState(false);
  const nameError = submitted && !name.trim() ? "Add your name so I know who's writing." : "";
  const messageError = submitted && !message.trim() ? "Write a short message first." : "";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!name.trim() || !message.trim()) return;
    const subject = encodeURIComponent(`${reason} · from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form noValidate onSubmit={onSubmit} className="contact-card squircle [--r:24px] grid h-full gap-5 p-7">
      <div>
        <p className="text-[19px] font-semibold tracking-[-0.02em] text-fg">Write me a note</p>
        <p className="mt-1 text-[13.5px] text-fg-subtle">It opens in your email app, ready to send. No sign-up, no spam.</p>
      </div>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-[14px] font-medium text-fg">What’s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {REASONS.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={reason === r}
              onClick={() => setReason(r)}
              className={`contact-reason inline-flex h-9 items-center rounded-full border px-3.5 text-[13.5px] ${FOCUS} ${
                reason === r ? "border-fg bg-fg text-bg" : "border-line-strong bg-surface-1 text-fg-muted hover:text-fg"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Your name or company"
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
          rows={4}
          placeholder="Tell me about the role, the team or the idea…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          className="field min-h-[120px] w-full resize-y px-3.5 py-3 text-[16px] leading-[1.55] text-fg placeholder:text-fg-subtle sm:text-[15px]"
        />
        {messageError ? (
          <p id="contact-message-error" className="text-[13px] text-destructive">
            {messageError}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          className={`btn-apple btn-apple-primary group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium ${FOCUS}`}
        >
          <Send className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
          Write email
        </button>
        <span className="text-[12.5px] text-fg-subtle">Sends to {PROFILE.email}</span>
      </div>
    </form>
  );
}

export function Contact() {
  const time = useLocalTime(PROFILE.timezone);
  const hasCv = CV_HREF !== "#" && CV_HREF !== "";
  const sectionRef = useRef<HTMLElement>(null);

  const value =
    "group/link inline-flex min-w-0 max-w-full items-center gap-1.5 text-[15.5px] font-medium text-fg";
  const arrow =
    "h-4 w-4 shrink-0 text-fg-subtle transition-[transform,color] duration-150 ease-[var(--ease-out)] group-hover/link:-translate-y-px group-hover/link:translate-x-px group-hover/link:text-fg";

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className={SECTION}>
      {/* Invitation: status, headline (weight follows the pointer), lede, local time */}
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-3 py-1 text-[13px] font-medium text-fg">
              <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
              Open to full-time Web Developer roles
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2
              id="contact-title"
              className="mt-5 max-w-[11em] text-[44px] font-semibold leading-[1] tracking-[-0.045em] text-fg sm:text-[60px] lg:text-[76px]"
            >
              <span className="sr-only">Hiring a web developer? Let’s talk.</span>
              <span aria-hidden="true">
                <VariableProximity
                  label="Hiring a web developer? Let’s talk."
                  fromFontVariationSettings="'wght' 560"
                  toFontVariationSettings="'wght' 860"
                  containerRef={sectionRef}
                  radius={140}
                  falloff="gaussian"
                />
              </span>
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-6 max-w-[36em] text-pretty text-[17px] leading-[1.6] text-fg-muted">
              I’m ready to join a team in Phnom Penh and ship real work from day one. A role, an
              internship, or an idea you want built: send it over and I’ll get back to you.
            </p>
          </Reveal>
        </div>
        <Reveal index={3} className="slide-from-right">
          <div className="contact-card squircle [--r:22px] w-[260px] p-5">
            <p className="flex items-center gap-1.5 text-[12.5px] text-fg-subtle">
              <MapPin aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
              Phnom Penh, Cambodia
            </p>
            <p className="mt-2 font-mono text-[34px] font-medium leading-none tabular-nums tracking-[-0.02em] text-fg">
              {time ?? "--:--"}
            </p>
            <p className="mt-2 text-[12.5px] text-fg-subtle">Local time · {PROFILE.timezoneLabel} (UTC+7)</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <Reveal index={4} className="slide-from-left">
          <div className="contact-card squircle [--r:24px] h-full p-3">
            <p className="px-4 pb-2 pt-3 text-[13px] font-medium text-fg-subtle">Fastest ways to reach me</p>
            <ul className="grid gap-1.5">
              <Channel icon={<Mail className="h-5 w-5" strokeWidth={1.75} />} tint="#EA4335" label="Email" note="best for job offers" trailing={<CopyEmail />}>
                <a href={`mailto:${PROFILE.email}`} className={`${value} truncate underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-fg-subtle`}>
                  {PROFILE.email}
                </a>
              </Channel>
              <Channel icon={<SiTelegram className="h-5 w-5" />} tint="#229ED9" label="Telegram" note="quick questions">
                <a href={PROFILE.telegram} target="_blank" rel="noreferrer" className={value}>
                  <span className="truncate">{PROFILE.telegramHandle}</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className={arrow} />
                </a>
              </Channel>
              <Channel icon={<Phone className="h-5 w-5" strokeWidth={1.75} />} tint="#34C759" label="Phone" note="call or text">
                <a href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`} className={value}>
                  <span className="truncate">{PROFILE.phone}</span>
                </a>
              </Channel>
              <Channel icon={<SiGithub className="h-5 w-5" />} tint="#24292F" label="GitHub" note="see the code">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className={value}>
                  <span className="truncate">github.com/{PROFILE.githubHandle}</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className={arrow} />
                </a>
              </Channel>
              {hasCv ? (
                <Channel icon={<FileText className="h-5 w-5" strokeWidth={1.75} />} tint="#6B6B75" label="Résumé" note="one-page PDF">
                  <a {...getCvLinkProps()} className={value}>
                    <span>Download CV</span>
                    <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className={arrow} />
                  </a>
                </Channel>
              ) : null}
            </ul>
          </div>
        </Reveal>
        <Reveal index={5} className="slide-from-right">
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
