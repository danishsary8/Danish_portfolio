import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Clock,
  Copy,
  Languages,
  Mail,
  Maximize2,
  Quote,
} from "lucide-react";
import { PROFILE, PROJECTS } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

const BOOKLY = PROJECTS.find((p) => p.id === "bookly");

// Personal details, all from the CV. "Phnom Penh" and the role title live in the hero copy already.
const DETAILS = [
  { icon: Languages, label: "Khmer, English" },
  { icon: Clock, label: "ICT · UTC+7" },
] as const;

/**
 * Hero profile card: a head-and-shoulders photo over a personal panel (name, a short
 * bio in his own words, languages and time zone, email + copy). A flash of light sweeps
 * across the card once after it settles in, and again each time it is hovered.
 */
export function PortraitCard({ onView }: { onView: () => void }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <figure className="profile-card tactile frame-float squircle [--r:28px] relative w-full max-w-[392px] p-2">
      {/* Photo: 4:3 head-and-shoulders crop. The source is 4:5 with tall headroom, so the
          window sits 52% down: hair just clears the top, shoulders fill the bottom. */}
      <div className="squircle [--r:20px] relative aspect-[4/3] overflow-hidden bg-surface-1">
        <img
          src={ASSETS.profile.photo}
          alt={`Portrait of ${PROFILE.name}`}
          width={680}
          height={850}
          decoding="async"
          className="h-full w-full object-cover object-[50%_52%]"
        />
        {/* A faint floor shade grounds the photo against the panel below. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent"
        />
      </div>

      {/* Signature: an iOS Live Activity docked on the frame's corner, pointing at shipped work. */}
      {BOOKLY ? (
        <a
          href={BOOKLY.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bookly, live on Vercel (opens in a new tab)"
          className={`live-activity tactile absolute left-4 top-4 z-30 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 lg:-left-7 lg:top-7 ${FOCUS}`}
        >
          <span
            aria-hidden="true"
            className="icon-tile squircle [--r:9px] grid h-8 w-8 shrink-0 place-items-center"
          >
            <BookOpen className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-fg">Bookly</span>
            <span className="mt-1 text-[11.5px] text-fg-muted">Live on Vercel</span>
          </span>
          <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="ml-1 h-4 w-4 text-fg-subtle" />
        </a>
      ) : null}

      <figcaption className="px-3 pb-2 pt-4">
        {/* Identity row */}
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[21px] font-semibold leading-tight tracking-[-0.025em] text-fg">
              {PROFILE.name}
            </p>
            <p className="mt-1 text-[13.5px] text-fg-muted">
              Developer &amp; Software Development student
            </p>
          </div>
          <button
            type="button"
            onClick={onView}
            aria-label="View profile"
            title="View profile"
            className={`btn-apple btn-apple-secondary relative z-30 grid h-9 w-9 shrink-0 place-items-center rounded-full ${FOCUS}`}
          >
            <Maximize2 aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
          </button>
        </div>

        {/* About me: a short bio in his own words (paraphrased from the CV summary) */}
        <div className="mt-4 rounded-[14px] border border-[var(--edge)] bg-surface-1 shadow-[var(--field-inset)]">
          <blockquote className="flex gap-2.5 px-4 pb-3 pt-3.5">
            <Quote aria-hidden="true" strokeWidth={1.75} className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" />
            <p className="text-pretty text-[14px] leading-[1.55] text-fg">
              I focus on responsive interfaces and clean, maintainable code, and I’m growing into a
              full-stack developer who builds apps that are genuinely useful.
            </p>
          </blockquote>
          {/* Personal details */}
          <ul
            className="flex flex-wrap gap-x-4 gap-y-1 border-t border-[var(--edge)] px-4 py-2.5"
            aria-label="Personal details"
          >
            {DETAILS.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5 text-[12.5px] text-fg-muted">
                <Icon aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-fg-subtle" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Email: the action recruiters reach for most */}
        <div className="mt-3 flex items-center gap-2.5 border-t border-line pl-1 pt-3">
          <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 shrink-0 text-fg-subtle" />
          <a
            href={`mailto:${PROFILE.email}`}
            className="relative z-30 min-w-0 truncate text-[13.5px] text-fg-muted transition-colors duration-150 hover:text-fg"
          >
            {PROFILE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className={`btn-apple btn-apple-secondary relative z-30 ml-auto inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium ${FOCUS}`}
          >
            {copied ? (
              <Check aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5" />
            ) : (
              <Copy aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
            )}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </figcaption>

      {/* Flash of light: one diagonal sweep across the card (see .card-shine in styles.css). */}
      <span aria-hidden="true" className="card-shine" />
    </figure>
  );
}
