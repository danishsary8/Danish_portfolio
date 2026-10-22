import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, MapPin, Maximize2 } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";

const ON_PHOTO =
  "border border-white/20 bg-black/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md";

/**
 * Hero portrait: a framed 4:5 photo with a legibility scrim, name caption,
 * a "View profile" control (opens the profile modal) and a one-tap email copy
 * row, the action recruiters reach for most.
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
    <figure className="group tactile frame-float squircle [--r:28px] w-full max-w-[380px] p-2">
      <div className="squircle [--r:20px] relative aspect-[4/5] overflow-hidden bg-surface-1">
        <img
          src={ASSETS.profile.photo}
          alt={`Portrait of ${PROFILE.name}`}
          width={760}
          height={950}
          decoding="async"
          className="h-full w-full object-cover object-[50%_20%] transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        />

        <span
          className={`${ON_PHOTO} absolute left-3 top-3 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium`}
        >
          <MapPin aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
          {PROFILE.location.split(", ")[1]}
        </span>

        <button
          type="button"
          onClick={onView}
          className={`${ON_PHOTO} btn-apple absolute right-3 top-3 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium hover:bg-black/45 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          <Maximize2 aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
          View profile
        </button>

        <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
          <span className="block text-[24px] font-semibold leading-tight tracking-[-0.025em]">
            {PROFILE.name}
          </span>
          <span className="mt-1 block text-[13.5px] text-white/80">
            Developer &amp; Software Development student
          </span>
        </figcaption>
      </div>

      <div className="flex items-center gap-2.5 px-2.5 pb-1 pt-3">
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
          className="btn-apple btn-apple-secondary ml-auto inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
        >
          {copied ? (
            <Check aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5 text-gold-ink dark:text-gold" />
          ) : (
            <Copy aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
          )}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </figure>
  );
}
