import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Mail, MapPin } from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROFILE } from "@/content/portfolio";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";
import { Reveal, SectionHeader } from "./Reveal";

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
  const icon =
    "absolute h-4 w-4 transition-[opacity,transform] duration-150 ease-[var(--ease-out)]";
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : `Copy email address ${PROFILE.email}`}
      className="press relative grid h-11 w-11 shrink-0 place-items-center rounded-control text-fg-muted transition-[color,background-color,transform] duration-150 hover:bg-raised hover:text-fg"
    >
      <Copy
        className={`${icon} ${copied ? "scale-75 opacity-0" : "opacity-100"}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Check
        className={`${icon} ${copied ? "opacity-100" : "scale-75 opacity-0"}`}
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
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
    <form noValidate onSubmit={onSubmit} className="panel grid gap-5 p-5 sm:p-6">
      <div className="grid gap-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          aria-describedby={messageError ? "contact-message-error" : "contact-message-help"}
          className="min-h-[132px] w-full resize-y rounded-control border border-line-strong bg-surface px-3 py-2.5 text-[16px] leading-[1.55] text-fg transition-[border-color,background-color] duration-150 placeholder:text-fg-subtle hover:border-fg-subtle focus-visible:border-fg focus-visible:bg-raised focus-visible:outline-none aria-[invalid=true]:border-destructive sm:text-[15px]"
        />
        {messageError ? (
          <p id="contact-message-error" className="text-[13px] text-destructive">
            {messageError}
          </p>
        ) : (
          <p id="contact-message-help" className="text-[13px] text-fg-subtle">
            Opens your email app with this message ready to send.
          </p>
        )}
      </div>
      <button
        type="submit"
        className="press inline-flex h-11 items-center justify-center gap-2 rounded-control bg-fg px-5 text-[14.5px] font-medium text-bg transition-[opacity,transform] duration-150 hover:opacity-90 sm:w-fit"
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

  const row =
    "group flex min-h-16 items-center gap-4 border-t border-line px-1 py-3 first:border-t-0";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-[1120px] px-5 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeader
        id="contact-title"
        title="Contact"
        lede="Open to web developer roles and internships. Email is the fastest way to reach me."
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <ul>
            <li className={row}>
              <Mail
                className="h-[18px] w-[18px] shrink-0 text-fg-subtle"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] text-fg-subtle">Email</span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex min-h-11 items-center truncate text-[15px] text-fg underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-fg-subtle"
                >
                  {PROFILE.email}
                </a>
              </span>
              <CopyEmail />
            </li>
            {[
              {
                label: "GitHub",
                value: `github.com/${PROFILE.githubHandle}`,
                href: PROFILE.github,
                Icon: SiGithub,
              },
              {
                label: "Telegram",
                value: PROFILE.telegramHandle,
                href: PROFILE.telegram,
                Icon: SiTelegram,
              },
            ].map(({ label, value, href, Icon }) => (
              <li key={label} className={row}>
                <Icon className="h-[17px] w-[17px] shrink-0 text-fg-subtle" aria-hidden="true" />
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-w-0 flex-1 items-center gap-4"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] text-fg-subtle">{label}</span>
                    <span className="block truncate text-[15px] text-fg">{value}</span>
                  </span>
                  <ArrowUpRight
                    className="mr-3 h-4 w-4 text-fg-subtle transition-[transform,color] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
            <li className={row}>
              <MapPin
                className="h-[18px] w-[18px] shrink-0 text-fg-subtle"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                <span className="block text-[13px] text-fg-subtle">Based in</span>
                <span className="block text-[15px] text-fg">
                  {PROFILE.location} ·{" "}
                  <span className="font-mono text-[13.5px] tabular-nums">{time ?? "--:--"}</span>{" "}
                  {PROFILE.timezoneLabel}
                </span>
              </span>
            </li>
            {hasCv ? (
              <li className={row}>
                <FileText
                  className="h-[18px] w-[18px] shrink-0 text-fg-subtle"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <a {...getCvLinkProps()} className="flex min-w-0 flex-1 items-center gap-4">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] text-fg-subtle">Résumé</span>
                    <span className="block text-[15px] text-fg">Download CV</span>
                  </span>
                  <ArrowUpRight
                    className="mr-3 h-4 w-4 text-fg-subtle transition-[transform,color] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ) : null}
          </ul>
        </Reveal>
        <Reveal index={1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-5 py-8 text-[13.5px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · Phnom Penh
        </p>
        <div className="-mx-3 flex items-center">
          <Link
            to="/design-system"
            className="inline-flex min-h-11 items-center rounded-control px-3 transition-colors duration-150 hover:text-fg"
          >
            Design system
          </Link>
          <a
            href="#home"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-control px-3 transition-colors duration-150 hover:text-fg"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
