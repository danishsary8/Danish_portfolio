import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Lock, Sparkles, TriangleAlert } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";

/**
 * Project covers: one consistent 16:10 poster per project. A tinted stage in the project's own
 * colour, the name and one line, and the product itself (real screenshots for Bookly, a drawn
 * preview for the others until their screenshots are ready). Each cover reads without the image.
 */

type Theme = { stage: string; ink: string; sub: string; dot: string };

const THEMES: Record<Project["id"], Theme> = {
  // Bookly's own lapis + gold.
  bookly: {
    stage: "bg-[radial-gradient(120%_90%_at_15%_10%,#2a3bb8_0%,#16207a_45%,#0b1147_100%)]",
    ink: "text-white",
    sub: "text-white/70",
    dot: "bg-[#f5c451]",
  },
  loomora: {
    stage: "bg-[radial-gradient(120%_90%_at_15%_10%,#3f7d6b_0%,#1f4a3f_50%,#0f2722_100%)]",
    ink: "text-white",
    sub: "text-white/70",
    dot: "bg-[#9be3c6]",
  },
  diabetes: {
    stage: "bg-[radial-gradient(120%_90%_at_15%_10%,#2f6fa8_0%,#173f66_50%,#0b2038_100%)]",
    ink: "text-white",
    sub: "text-white/70",
    dot: "bg-[#f5c451]",
  },
  sport: {
    stage: "bg-[radial-gradient(120%_90%_at_15%_10%,#1d2b5c_0%,#0d1430_50%,#070a18_100%)]",
    ink: "text-white",
    sub: "text-white/75",
    dot: "bg-[#e11d48]",
  },
  pitchkh: {
    stage: "bg-[radial-gradient(120%_90%_at_15%_10%,#1f7a46_0%,#0f4d2b_50%,#062616_100%)]",
    ink: "text-white",
    sub: "text-white/75",
    dot: "bg-[#f5c451]",
  },
  driving: {
    stage: "bg-[radial-gradient(120%_90%_at_15%_10%,#c2412d_0%,#7d2418_50%,#3d110b_100%)]",
    ink: "text-white",
    sub: "text-white/75",
    dot: "bg-[#ffd166]",
  },
};

const host = (url: string) => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

/** Small browser window used inside covers. */
function Window({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[10px] bg-white shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.12)] ${className}`}
    >
      <div className="flex h-5 items-center gap-1 border-b border-black/5 bg-[#f4f4f6] px-2">
        {[0, 1, 2].map((i) => (
          <span key={i} aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-black/15" />
        ))}
        <span className="mx-auto flex min-w-0 max-w-[80%] items-center gap-1 font-mono text-[8px] text-black/45">
          <Lock aria-hidden="true" className="h-2 w-2" strokeWidth={2} />
          <span className="truncate">{host(url)}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

/** Image that hides itself if it fails (before or after hydration). */
function Shot({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.currentSrc && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (!src || failed) return null;
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* ---------- drawn previews (honest sketches of each app's main screen) ---------- */

function LoomoraPreview() {
  const rows = [
    ["Morning run", true],
    ["Read 20 pages", true],
    ["Deep work · 2h", false],
    ["Plan tomorrow", false],
  ] as const;
  return (
    <div className="space-y-1.5 bg-[#f7faf8] p-3">
      <p className="text-[9px] font-semibold text-[#1f4a3f]">Today's routine</p>
      {rows.map(([t, done]) => (
        <div
          key={t}
          className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
        >
          <span
            className={`grid h-3 w-3 place-items-center rounded-full ${done ? "bg-[#3f7d6b] text-white" : "border border-[#3f7d6b]/40"}`}
          >
            {done ? <Check aria-hidden="true" className="h-2 w-2" strokeWidth={3} /> : null}
          </span>
          <span className={`text-[8.5px] ${done ? "text-black/40 line-through" : "text-black/75"}`}>
            {t}
          </span>
        </div>
      ))}
      <div className="h-1 overflow-hidden rounded-full bg-[#3f7d6b]/15">
        <div className="h-full w-1/2 rounded-full bg-[#3f7d6b]" />
      </div>
    </div>
  );
}

function DiabetesPreview() {
  return (
    <div className="bg-[#f6f9fc] p-3">
      <p className="text-[9px] font-semibold text-[#173f66]">
        Risk check ·{" "}
        <span lang="km" className="font-khmer">
          ការវាយតម្លៃ
        </span>
      </p>
      <div className="mt-2 flex items-center gap-3">
        <svg viewBox="0 0 60 34" className="h-9 w-16" aria-hidden="true">
          <path
            d="M5 30 A25 25 0 0 1 55 30"
            fill="none"
            stroke="#dbe5ef"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M5 30 A25 25 0 0 1 38 7"
            fill="none"
            stroke="#2f6fa8"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <p className="text-[11px] font-semibold text-[#173f66]">Moderate</p>
          <p className="text-[8px] text-black/50">3 of 8 rules matched</p>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        {["Care plan · diet", "Care plan · activity"].map((t) => (
          <div key={t} className="rounded bg-white px-2 py-1 text-[8px] text-black/65">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function DrivingPreview() {
  return (
    <div className="bg-[#fffaf5] p-3">
      <p className="text-[9px] font-semibold text-[#7d2418]">Practice exam · 12 / 30</p>
      <div className="mt-2 flex items-center gap-2.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center">
          <TriangleAlert
            aria-hidden="true"
            className="h-10 w-10 fill-[#ffd166] text-[#c2412d]"
            strokeWidth={1.75}
          />
        </span>
        <p className="text-[8.5px] leading-snug text-black/70">What does this sign mean?</p>
      </div>
      <div className="mt-2 grid gap-1">
        {[
          ["Danger ahead", true],
          ["No entry", false],
        ].map(([t, ok]) => (
          <div
            key={t as string}
            className={`rounded px-2 py-1 text-[8px] ${ok ? "bg-[#c2412d] text-white" : "bg-white text-black/60"}`}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- the cover ---------- */

export function ProjectCover({
  project,
  hover = true,
  banner = false,
}: {
  project: Project;
  hover?: boolean;
  /** Wide strip without the name (the case study already shows the title above it). */
  banner?: boolean;
}) {
  const t = THEMES[project.id];
  const lift = hover
    ? "transition-transform duration-700 ease-[var(--ease-out)] motion-safe:group-hover:-translate-y-1.5"
    : "";
  const liftSlow = hover
    ? "transition-transform duration-700 ease-[var(--ease-out)] motion-safe:group-hover:-translate-y-3"
    : "";

  const art = banner ? (project.bannerImage ?? project.coverImage) : project.coverImage;
  if (art) {
    return (
      <div
        className={`@container relative w-full overflow-hidden bg-[#0b2a26] ${banner ? "aspect-[16/10] sm:aspect-[2.4/1]" : "aspect-[16/10]"}`}
        role="img"
        aria-label={`${project.title} cover: ${project.coverLine ?? project.kind}`}
      >
        <img
          src={art}
          alt=""
          decoding="async"
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${banner ? "object-left" : ""} ${lift}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`@container relative w-full overflow-hidden ${banner ? "aspect-[16/10] sm:aspect-[2.4/1]" : "aspect-[16/10]"} ${t.stage}`}
      role="img"
      aria-label={`${project.title} cover: ${project.coverLine ?? project.kind}`}
    >
      {/* soft light + fine grain lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0_1px,transparent_1px_6px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -top-1/3 h-[90%] w-[70%] rounded-full bg-white/10 blur-3xl"
      />

      {/* label */}
      <div
        aria-hidden="true"
        className={`absolute left-[6%] top-[9%] z-10 w-[50%] ${banner ? "hidden" : ""}`}
      >
        <p
          className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${t.sub}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
          {project.kind.split(" · ")[0]}
        </p>
        <p
          className={`mt-2 text-[clamp(1.2rem,7.2cqw,2.6rem)] text-balance font-semibold leading-[0.95] tracking-[-0.04em] ${t.ink}`}
        >
          {project.title}
        </p>
        <p className={`mt-2 text-[clamp(0.7rem,2.3cqw,0.95rem)] leading-snug ${t.sub}`}>
          {project.coverLine}
        </p>
        {project.id === "bookly" ? (
          <div className="mt-[4cqw] flex flex-wrap gap-1.5 @max-md:hidden">
            {[
              { c: "KHQR · Cash", h: "#10b981" },
              { c: "English · ខ្មែរ", h: "#60a5fa" },
            ].map(({ c, h }) => (
              <span
                key={c}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-2 py-0.5 text-[clamp(0.55rem,1.45cqw,0.72rem)] font-medium text-white/85"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: h }} />
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* product */}
      <div aria-hidden="true" className="absolute inset-0">
        {banner && project.id === "bookly" ? (
          <>
            <Window
              url={project.liveUrl}
              className="absolute top-[16%] left-[26%] w-[64%] sm:top-[14%] sm:left-[30%] sm:w-[54%]"
            >
              <Shot src={ASSETS.projects.booklyShots.home} alt="" className="block w-full" />
            </Window>
            <div className="absolute top-[30%] left-[8%] w-[22%] overflow-hidden rounded-[14px] border-[3px] border-[#0b0f2e] bg-[#0b0f2e] shadow-[0_24px_40px_-14px_rgba(0,0,0,0.65)] sm:top-[24%] sm:left-[15%] sm:w-[13%]">
              <Shot
                src={ASSETS.projects.booklyShots.phoneHome}
                alt=""
                className="block w-full rounded-[10px]"
              />
            </div>
          </>
        ) : project.id === "bookly" ? (
          <>
            {/* warm reading light behind the devices */}
            <div className="pointer-events-none absolute -bottom-[25%] right-[2%] h-[85%] w-[75%] rounded-full bg-[#f5c451]/20 blur-3xl" />
            {/* laptop: the book page, slightly turned */}
            <div
              className={`absolute right-[-5%] top-[30%] w-[66%] [perspective:1400px] @max-md:top-[44%] ${lift}`}
            >
              <div className="origin-right [transform:rotateY(-14deg)_rotateX(4deg)]">
                <Window url="bookly.site">
                  <div className="relative overflow-hidden">
                    <Shot
                      src={ASSETS.projects.booklyShot("book")}
                      alt=""
                      className="block w-full"
                    />
                    <span className="bookly-cover-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)]" />
                  </div>
                </Window>
              </div>
            </div>
            {/* phone: the storefront, floating gently */}
            <div className="absolute bottom-[-16%] left-[24%] w-[18%] @max-md:left-[16%] @max-md:w-[22%] @max-md:bottom-[-34%]">
              <div
                className={`bookly-cover-float rounded-[18px] bg-[linear-gradient(145deg,#8d8a83,#3d3b37)] p-[2px] shadow-[0_28px_44px_-14px_rgba(0,0,0,0.7)] ${liftSlow}`}
              >
                <div className="overflow-hidden rounded-[16px] border-[3px] border-black bg-black">
                  <Shot
                    src={ASSETS.projects.booklyShots.phoneHome}
                    alt=""
                    className="block w-full rounded-[12px]"
                  />
                </div>
              </div>
            </div>
            {/* two live notifications that take turns */}
            <div className="absolute left-[40%] top-[19%] @max-md:hidden">
              <span className="bookly-cover-toast absolute whitespace-nowrap flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[clamp(0.5rem,1.45cqw,0.72rem)] font-semibold text-[#0f5132] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)]">
                <span className="grid h-[1.5em] w-[1.5em] place-items-center rounded-full bg-[#10b981] text-white">
                  <Check className="h-[0.9em] w-[0.9em]" strokeWidth={3} />
                </span>
                Paid with KHQR · $6.90
              </span>
              <span className="bookly-cover-toast bookly-cover-toast-2 absolute whitespace-nowrap flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[clamp(0.5rem,1.45cqw,0.72rem)] font-semibold text-[#4c1d95] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)]">
                <span className="grid h-[1.5em] w-[1.5em] place-items-center rounded-full bg-[#7c3aed] text-white">
                  <Sparkles className="h-[0.85em] w-[0.85em]" strokeWidth={2.5} />
                </span>
                AI found 6 similar books
              </span>
            </div>
          </>
        ) : (
          <Window
            url={project.liveUrl}
            className={`absolute bottom-[-8%] right-[6%] w-[46%] @max-md:bottom-[-38%] @max-md:w-[52%] ${lift}`}
          >
            <div className="relative">
              {project.id === "loomora" ? <LoomoraPreview /> : null}
              {project.id === "diabetes" ? <DiabetesPreview /> : null}
              {project.id === "driving" ? <DrivingPreview /> : null}
              {project.image ? (
                <Shot
                  src={project.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : null}
            </div>
          </Window>
        )}
      </div>

      {project.award ? (
        <span
          aria-hidden="true"
          className="absolute left-[6%] bottom-[8%] rounded-full border border-[#f5c451]/40 bg-[#f5c451]/15 px-2.5 py-1 text-[10.5px] font-medium text-[#f5c451]"
        >
          Award winner 2026
        </span>
      ) : null}
    </div>
  );
}
