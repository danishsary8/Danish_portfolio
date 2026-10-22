import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, BookOpen, Check, Copy, Mail, Maximize2 } from "lucide-react";
import { PROFILE, PROJECTS } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

const BOOKLY = PROJECTS.find((p) => p.id === "bookly");

// ID-card facts, all from the CV. "Phnom Penh" and the role title live in the hero copy already.
const FACTS = [
  { label: "University", value: "Norton University" },
  { label: "Year", value: "4th year · 2024 – Now" },
  { label: "Languages", value: "Khmer, English" },
  { label: "Time zone", value: "ICT · UTC+7" },
] as const;

/**
 * Hero profile card: a head-and-shoulders photo over an ID-style info panel (name,
 * subtitle, CV facts, email + copy). On pointer hover a laminate glare follows the
 * cursor; the position lives in event-local CSS variables, so it stays SSR-safe.
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

  const moveGlare = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <figure
      onPointerMove={moveGlare}
      className="profile-card tactile frame-float squircle [--r:28px] relative w-full max-w-[392px] p-2"
    >
      {/* Photo: 5:4 head-and-shoulders crop. The source is 4:5 with tall headroom, so the
          window sits at 56% down: hair just clears the top, shoulders fill the bottom. */}
      <div className="squircle [--r:20px] relative aspect-[5/4] overflow-hidden bg-surface-1">
        <img
          src={ASSETS.profile.photo}
          alt={`Portrait of ${PROFILE.name}`}
          width={680}
          height={850}
          decoding="async"
          className="h-full w-full object-cover object-[50%_56%]"
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
          className={`live-activity tactile absolute left-4 top-4 z-10 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 lg:-left-7 lg:top-7 ${FOCUS}`}
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
            className={`btn-apple btn-apple-secondary grid h-9 w-9 shrink-0 place-items-center rounded-full ${FOCUS}`}
          >
            <Maximize2 aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
          </button>
        </div>

        {/* Facts: recessed 2×2 grid, like the data block on an ID card */}
        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[var(--edge)] bg-[var(--edge)] shadow-[var(--field-inset)]">
          {FACTS.map((f) => (
            <div key={f.label} className="bg-surface-1 px-3.5 py-2.5">
              <dt className="text-[11.5px] text-fg-subtle">{f.label}</dt>
              <dd className="mt-0.5 truncate text-[13px] font-medium text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Email: the action recruiters reach for most */}
        <div className="mt-3 flex items-center gap-2.5 pl-1">
          <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 shrink-0 text-fg-subtle" />
          <a
            href={`mailto:${PROFILE.email}`}
            className="min-w-0 truncate text-[13.5px] text-fg-muted transition-colors duration-150 hover:text-fg"
          >
            {PROFILE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className={`btn-apple btn-apple-secondary ml-auto inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium ${FOCUS}`}
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

      {/* Laminate glare: follows the pointer while hovered (fine pointers only). */}
      <span aria-hidden="true" className="card-glare" />
    </figure>
  );
}
