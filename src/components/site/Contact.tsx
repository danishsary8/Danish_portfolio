import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Mail, MapPin, Phone, Send } from "lucide-react";
import { SiFacebook, SiGithub, SiTelegram } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { PROFILE } from "@/content/portfolio";
import { CV_HREF } from "@/lib/cv-link";
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

/**
 * One row of the contact list. The value link stretches over the whole row (so the row is the
 * click target); an optional trailing control sits above it.
 */
function Row({
  icon,
  tint,
  label,
  note,
  href,
  external,
  value,
  linkLabel,
  action,
  trailing,
}: {
  icon: ReactNode;
  tint: string;
  label: string;
  note: string;
  href: string;
  external?: boolean;
  value: ReactNode;
  linkLabel?: string;
  action: string;
  trailing?: ReactNode;
}) {
  return (
    <li className="contact-row group/row relative flex items-center gap-4 px-5 py-4" style={{ "--c": tint } as CSSProperties}>
      <span aria-hidden="true" className="contact-channel-tile squircle [--r:12px] grid h-11 w-11 shrink-0 place-items-center text-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12.5px] text-fg-subtle">
          {label} <span className="text-fg-subtle/70">· {note}</span>
        </span>
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          {...(linkLabel ? { "aria-label": linkLabel } : {})}
          className={`block truncate text-[16.5px] font-semibold tracking-[-0.01em] text-fg after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] ${FOCUS}`}
        >
          {value}
        </a>
      </span>
      {trailing ? <span className="relative z-10">{trailing}</span> : null}
      <span aria-hidden="true" className="contact-row-action hidden items-center gap-1 rounded-full border border-line-strong px-3 py-1 text-[12.5px] font-medium text-fg-muted sm:inline-flex">
        {action}
        <ArrowUpRight strokeWidth={1.75} className="h-3.5 w-3.5" />
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
    const subject = encodeURIComponent(`Hello from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form noValidate onSubmit={onSubmit} className="contact-card squircle [--r:26px] flex h-full flex-col gap-5 p-7">
      <div>
        <p className="text-[20px] font-semibold tracking-[-0.02em] text-fg">Send me a message</p>
        <p className="mt-1 text-[13.5px] text-fg-subtle">Write it here and your email app opens with it ready to send to me.</p>
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
      <div className="flex flex-1 flex-col gap-2">
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
          className="field min-h-[132px] flex-1 w-full resize-none px-3.5 py-3 text-[16px] leading-[1.55] text-fg placeholder:text-fg-subtle sm:text-[15px]"
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

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className={SECTION}>
      {/* Hook: headline (weight follows the pointer), lede, live status + local time */}
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Reveal>
            <h2
              id="contact-title"
              className="max-w-[12em] text-[44px] font-semibold leading-[1] tracking-[-0.045em] text-fg sm:text-[60px] lg:text-[76px]"
            >
              <span className="sr-only">Let’s talk. My inbox is always open.</span>
              <span aria-hidden="true">
                <VariableProximity
                  label="Let’s talk. My inbox is always open."
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
              A question about my work, an idea you want to build, or just a quick hello: pick whichever
              way suits you below and I’ll reply as soon as I can.
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

      <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Contact list: every way to reach me, one tap each */}
        <Reveal index={3} className="slide-from-left">
          <div className="contact-card squircle [--r:26px] h-full overflow-hidden">
            <div className="flex items-baseline justify-between border-b border-line px-6 pb-3 pt-5">
              <p className="text-[17px] font-semibold tracking-[-0.015em] text-fg">Reach me</p>
              <p className="text-[12.5px] text-fg-subtle">Pick whatever suits you</p>
            </div>
            <ul className="divide-y divide-[var(--line)] p-1.5">
              <Row icon={<Mail className="h-5 w-5" strokeWidth={1.75} />} tint="#EA4335" label="Email" note="best for job offers" href={`mailto:${PROFILE.email}`} value={PROFILE.email} action="Write" trailing={<CopyEmail />} />
              <Row icon={<SiTelegram className="h-5 w-5" />} tint="#229ED9" label="Telegram" note="fastest reply" href={PROFILE.telegram} external value={PROFILE.telegramHandle} action="Chat" />
              <Row icon={<Phone className="h-5 w-5" strokeWidth={1.75} />} tint="#34C759" label="Phone" note="call or text" href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`} value={PROFILE.phone} action="Call" />
              <Row icon={<SiFacebook className="h-5 w-5" />} tint="#1877F2" label="Facebook" note="say hi" href={PROFILE.facebook} external value={PROFILE.facebookHandle} linkLabel={`Facebook: ${PROFILE.facebookHandle}`} action="Message" />
              <Row icon={<SiGithub className="h-5 w-5" />} tint="#24292F" label="GitHub" note="read my code" href={PROFILE.github} external value={PROFILE.githubHandle} linkLabel={`github.com/${PROFILE.githubHandle}`} action="Visit" />
              {hasCv ? (
                <Row icon={<FileText className="h-5 w-5" strokeWidth={1.75} />} tint="#6B6B75" label="Résumé" note="one-page PDF" href={CV_HREF} external value="Download CV" action="Get" />
              ) : null}
            </ul>
          </div>
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
