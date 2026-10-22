import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, Check, Clock, Copy, Languages, Mail, Maximize2 } from "lucide-react";
import { GlareHover } from "@/components/ui/GlareHover";
import { PROFILE, PROJECTS } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

const ON_PHOTO =
  "border border-white/20 bg-black/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md";

const BOOKLY = PROJECTS.find((p) => p.id === "bookly");

// Personal details, all from the CV. "Phnom Penh" and the role title live in the hero copy already.
const DETAILS = [
  { icon: Languages, label: "Khmer, English" },
  { icon: Clock, label: "ICT · UTC+7" },
] as const;

/**
 * Hero profile card: a square portrait with the name set on it and a React Bits
 * GlareHover streak that crosses the photo on hover, then a compact panel with
 * languages, time zone and the email + copy row.
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
    <figure className="tactile frame-float squircle [--r:28px] relative w-full max-w-[360px] p-2">
      {/* Photo: square crop of the 4:5 source, anchored low so the face sits in the upper
          half and the suit carries the name. GlareHover owns the hover streak. */}
      <div className="relative aspect-square">
        <GlareHover
          width="100%"
          height="100%"
          borderRadius="20px"
          mode="hover"
          variant="streak"
          glareColor="#ffffff"
          glareOpacity={0.5}
          glareSize={30}
          softness={0.6}
          glareAngle={-45}
          blendMode="screen"
          rimGlint={true}
          transitionDuration={650}
          className="bg-surface-1"
        >
          <img
            src={ASSETS.profile.photo}
            alt={`Portrait of ${PROFILE.name}`}
            width={680}
            height={850}
            decoding="async"
            className="block h-full w-full object-cover object-[50%_85%]"
          />
        </GlareHover>

        {/* Legibility scrim + name, set on the photo like a profile card. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-[20px] bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-4 text-white">
          <span className="block text-[23px] font-semibold leading-tight tracking-[-0.025em]">
            {PROFILE.name}
          </span>
          <span className="mt-0.5 block text-[13.5px] text-white/80">
            Developer &amp; Software Development student
          </span>
        </figcaption>

        <button
          type="button"
          onClick={onView}
          aria-label="View profile"
          title="View profile"
          className={`${ON_PHOTO} btn-apple absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full hover:bg-black/45 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          <Maximize2 aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
        </button>
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

      <div className="px-2 pb-1 pt-3">
        {/* Personal details */}
        <ul className="flex flex-wrap gap-2" aria-label="Personal details">
          {DETAILS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="icon-tile-light squircle [--r:8px] inline-flex h-8 items-center gap-1.5 px-2.5 text-[12.5px] text-fg-muted"
            >
              <Icon aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-fg-subtle" />
              {label}
            </li>
          ))}
        </ul>

        {/* Email: the action recruiters reach for most */}
        <div className="mt-3 flex items-center gap-2.5 border-t border-line pl-1 pt-3">
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
      </div>
    </figure>
  );
}
