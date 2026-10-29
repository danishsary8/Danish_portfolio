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

/** A reach-me tile: glossy brand icon, label, value. Tinted by its brand colour, lifts on hover. */
function Tile({
  icon,
  tint,
  label,
  note,
  children,
  className = "",
}: {
  icon: ReactNode;
  tint: string;
  label: string;
  note: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <li className={`contact-tile squircle [--r:22px] relative flex flex-col p-5 ${className}`} style={{ "--c": tint } as CSSProperties}>
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden="true" className="contact-channel-tile squircle [--r:13px] grid h-12 w-12 shrink-0 place-items-center text-white">
          {icon}
        </span>
        <span className="rounded-full border border-line bg-surface-2/70 px-2.5 py-0.5 text-[11.5px] text-fg-subtle">{note}</span>
      </div>
      <p className="mt-auto pt-6 text-[12.5px] text-fg-subtle">{label}</p>
      <div className="mt-0.5 min-w-0">{children}</div>
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
    const subject = encodeURIComponent(`Hello from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form noValidate onSubmit={onSubmit} className="contact-card squircle [--r:26px] flex h-full flex-col gap-5 p-7">
      <div>
        <p className="text-[20px] font-semibold tracking-[-0.02em] text-fg">Or leave a quick note</p>
        <p className="mt-1 text-[13.5px] text-fg-subtle">Two fields, one click. It lands straight in my inbox.</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Who’s saying hello?"
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
      <div className="grid flex-1 gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="The role, the team, the timeline…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={messageError ? true : undefined}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          className="field h-full min-h-[132px] w-full resize-none px-3.5 py-3 text-[16px] leading-[1.55] text-fg placeholder:text-fg-subtle sm:text-[15px]"
        />
        {messageError ? (
          <p id="contact-message-error" className="text-[13px] text-destructive">
            {messageError}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className={`btn-apple btn-apple-primary group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium ${FOCUS}`}
      >
        Write email
        <Send className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </form>
  );
}

export function Contact() {
  const time = useLocalTime(PROFILE.timezone);
  const hasCv = CV_HREF !== "#" && CV_HREF !== "";
  const sectionRef = useRef<HTMLElement>(null);

  const value =
    "group/link inline-flex min-w-0 max-w-full items-center gap-1.5 text-[16px] font-semibold tracking-[-0.01em] text-fg";
  const arrow =
    "h-4 w-4 shrink-0 text-fg-subtle transition-[transform,color] duration-150 ease-[var(--ease-out)] group-hover/link:-translate-y-px group-hover/link:translate-x-px group-hover/link:text-fg";

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className={SECTION}>
      {/* Hook: headline (weight follows the pointer), lede, live status + local time */}
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Reveal>
            <h2
              id="contact-title"
              className="max-w-[11.5em] text-[44px] font-semibold leading-[1] tracking-[-0.045em] text-fg sm:text-[60px] lg:text-[78px]"
            >
              <span className="sr-only">Your next developer is one message away.</span>
              <span aria-hidden="true">
                <VariableProximity
                  label="Your next developer is one message away."
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
            <p className="mt-6 max-w-[34em] text-pretty text-[17px] leading-[1.6] text-fg-muted">
              I turn ideas into React interfaces on secure Laravel APIs, and I’m looking for a team in
              Phnom Penh to build with. The quickest way to see if we fit? Say hello.
            </p>
          </Reveal>
        </div>
        <Reveal index={2} className="slide-from-right">
          <div className="contact-card squircle [--r:22px] w-[264px] p-5">
            <p className="inline-flex items-center gap-2 text-[13px] font-medium text-fg">
              <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
              Available for full-time work
            </p>
            <p className="mt-4 font-mono text-[34px] font-medium leading-none tabular-nums tracking-[-0.02em] text-fg">
              {time ?? "--:--"}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-[12.5px] text-fg-subtle">
              <MapPin aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
              Phnom Penh · {PROFILE.timezoneLabel} (UTC+7)
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Reach-me bento: email leads, the rest as tiles */}
        <Reveal index={3} className="slide-from-left">
          <ul className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3">
            <Tile icon={<Mail className="h-6 w-6" strokeWidth={1.75} />} tint="#EA4335" label="Email" note="Best for offers" className="col-span-2">
              <div className="flex items-center gap-3">
                <a href={`mailto:${PROFILE.email}`} className={`${value} truncate text-[20px] underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-fg-subtle`}>
                  {PROFILE.email}
                </a>
                <span className="ml-auto">
                  <CopyEmail />
                </span>
              </div>
            </Tile>
            <Tile icon={<SiTelegram className="h-6 w-6" />} tint="#229ED9" label="Telegram" note="Quick chat">
              <a href={PROFILE.telegram} target="_blank" rel="noreferrer" className={value}>
                <span className="truncate">{PROFILE.telegramHandle}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className={arrow} />
              </a>
            </Tile>
            <Tile icon={<Phone className="h-6 w-6" strokeWidth={1.75} />} tint="#34C759" label="Phone" note="Call or text">
              <a href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`} className={value}>
                <span className="truncate">{PROFILE.phone}</span>
              </a>
            </Tile>
            <Tile icon={<SiGithub className="h-6 w-6" />} tint="#24292F" label="GitHub" note="Read my code">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label={`github.com/${PROFILE.githubHandle}`} className={value}>
                <span className="truncate">{PROFILE.githubHandle}</span>
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className={arrow} />
              </a>
            </Tile>
            {hasCv ? (
              <Tile icon={<FileText className="h-6 w-6" strokeWidth={1.75} />} tint="#6B6B75" label="Résumé" note="1-page PDF">
                <a {...getCvLinkProps()} className={value}>
                  <span>Download CV</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className={arrow} />
                </a>
              </Tile>
            ) : null}
          </ul>
        </Reveal>
        <Reveal index={4} className="slide-from-right">
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
