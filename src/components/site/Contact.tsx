import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Mail, MapPin } from "lucide-react";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { SiGithub, SiTelegram } from "react-icons/si";
import { PROFILE } from "@/content/portfolio";
import { useLocalTime } from "@/lib/use-local-time";
import { RevealGroup, RevealItem } from "./Reveal";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  const Icon = copied ? Check : Copy;
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${PROFILE.email}`}
      className="glass-panel inline-flex h-12 items-center gap-2 rounded-control px-4 text-[15px] font-medium text-primaryText transition-[border-color,transform] duration-150 hover:border-gold active:scale-[0.98]"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

export function Contact() {
  const time = useLocalTime(PROFILE.timezone);

  const channels = [
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
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-[1240px] scroll-mt-24 px-4 pb-16 pt-24 sm:px-6 lg:pt-36"
    >
      <RevealGroup className="glass-card glass-elevated overflow-hidden p-6 sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <RevealItem>
              <h2
                id="contact-title"
                className="font-display text-[clamp(2.6rem,7vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-primaryText"
              >
                Let&rsquo;s build something useful.
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.6] text-mutedText">
                I&rsquo;m looking for a web developer role where I can contribute to real products
                and grow with a collaborative team. The fastest way to reach me is email.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex h-12 max-w-full items-center gap-2.5 rounded-control bg-gold px-5 text-[15px] font-semibold text-[#0A0A0A] transition-[background-color,transform] duration-150 hover:bg-gold-hover active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span className="truncate">{PROFILE.email}</span>
                </a>
                <CopyEmail />
                {CV_HREF !== "#" && CV_HREF !== "" ? (
                  <a
                    {...getCvLinkProps()}
                    className="glass-panel inline-flex h-12 items-center gap-2 rounded-control px-4 text-[15px] font-medium text-primaryText transition-[border-color,transform] duration-150 hover:border-gold active:scale-[0.98]"
                  >
                    <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    Download CV
                  </a>
                ) : null}
              </div>
            </RevealItem>
          </div>

          <RevealItem>
            <ul className="grid gap-3">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel group flex min-h-16 items-center gap-4 px-4 py-3 transition-[border-color,transform] duration-150 hover:border-gold active:scale-[0.99]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-glass-border bg-[var(--glass-surface-strong)]">
                      <Icon className="h-[18px] w-[18px] text-primaryText" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] text-mutedText">{label}</span>
                      <span className="block truncate text-[16px] font-medium text-primaryText">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-mutedText transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primaryText"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
              <li className="glass-panel flex min-h-16 items-center gap-4 px-4 py-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-glass-border bg-[var(--glass-surface-strong)]">
                  <MapPin
                    className="h-[18px] w-[18px] text-primaryText"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <span className="block text-[14px] text-mutedText">Based in</span>
                  <span className="block text-[16px] font-medium text-primaryText">
                    {PROFILE.location} ·{" "}
                    <span className="font-mono text-[15px] tabular-nums">{time ?? "--:--"}</span>{" "}
                    {PROFILE.timezoneLabel}
                  </span>
                </span>
              </li>
            </ul>
          </RevealItem>
        </div>
      </RevealGroup>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1240px] px-4 pb-10 pt-6 sm:px-6">
      <div className="flex flex-col gap-4 text-[14px] text-mutedText sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. Built with React and Tailwind CSS.
        </p>
        <div className="flex items-center gap-1">
          <Link
            to="/design-system"
            className="inline-flex min-h-11 items-center rounded-control px-3 transition-colors hover:text-primaryText"
          >
            Design system
          </Link>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-control px-3 transition-colors hover:text-primaryText"
          >
            Back to top
            <ArrowUp className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
