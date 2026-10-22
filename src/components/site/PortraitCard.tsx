import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, BookOpen, Check, Copy, Mail, Maximize2 } from "lucide-react";
import { GlareHover } from "@/components/ui/GlareHover";
import { PROFILE, PROJECTS } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";
const FOCUS_ON_PHOTO =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// Frosted controls that sit on the photo.
const GLASS =
  "border border-white/20 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md";

const BOOKLY = PROJECTS.find((p) => p.id === "bookly");

/**
 * Hero profile card, after an iOS-style creator card: a full-bleed portrait that melts
 * into a blurred, darkened copy of itself, with the name, a one-line bio, three CV facts
 * and the contact actions set on top. React Bits GlareHover owns the hover streak.
 * The card is always dark (it is a photo), so it reads the same in both themes.
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
    <div className="relative h-[560px] w-full max-w-[344px]">
      <GlareHover
        width="100%"
        height="100%"
        borderRadius="32px"
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
        background="#0b0b0d"
        className="frame-float"
      >
        <figure className="absolute inset-0 m-0 whitespace-normal text-left">
          {/* Backdrop: the same photo, blurred and dimmed, so the sharp portrait melts into it. */}
          <img
            src={ASSETS.profile.photo}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-125 object-cover object-bottom blur-2xl brightness-[0.45] saturate-[0.9]"
          />
          {/* Portrait: starts above the card edge to trim the source's tall headroom, and fades
              out at the bottom so the text block sits on the soft backdrop. */}
          <img
            src={ASSETS.profile.photo}
            alt={`Portrait of ${PROFILE.name}`}
            width={680}
            height={850}
            decoding="async"
            className="absolute inset-x-0 -top-[60px] h-[500px] w-full object-cover object-top [mask-image:linear-gradient(to_bottom,#000_58%,transparent_100%)]"
          />
          {/* Legibility: a deep floor shade behind the text. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          />

          <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 text-white">
            <p className="flex items-center gap-2 text-[26px] font-semibold leading-tight tracking-[-0.03em]">
              {PROFILE.name}
              <span
                role="img"
                aria-label="Available for work"
                title="Available for work"
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold shadow-[0_0_0_3px_rgba(0,0,0,0.35)]"
              />
            </p>
            <p className="mt-2 text-pretty text-[14.5px] leading-[1.5] text-white/75">
              I focus on responsive interfaces and clean, maintainable code.
            </p>

            {/* Three CV facts, divided by hairlines */}
            <dl className="mt-5 grid grid-cols-3 text-center">
              {/* Label first in the markup (dt before dd), value first on screen. */}
              <div className="flex flex-col-reverse items-center px-1">
                <dt className="mt-1.5 text-[12px] text-white/65">Live projects</dt>
                <dd className="text-[19px] font-semibold leading-none tracking-[-0.02em] tabular-nums">4</dd>
              </div>
              <div className="flex flex-col-reverse items-center border-x border-white/15 px-1">
                <dt className="mt-1.5 text-[12px] text-white/65">Award (team)</dt>
                <dd className="inline-flex items-center gap-1 text-[19px] font-semibold leading-none tracking-[-0.02em] tabular-nums">
                  <Award aria-hidden="true" strokeWidth={2} className="h-4 w-4 text-gold" />
                  2026
                </dd>
              </div>
              <div className="flex flex-col-reverse items-center px-1">
                <dt className="mt-1.5 text-[12px] text-white/65">Languages</dt>
                <dd className="text-[19px] font-semibold leading-none tracking-[-0.02em]">
                  EN · <span lang="km" className="font-khmer">ខ្មែរ</span>
                </dd>
              </div>
            </dl>

            {/* Actions: one bright capsule, one glass square */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="#contact"
                onClick={(e) => {
                  const el = document.getElementById("contact");
                  if (!el) return;
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`btn-apple inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[15px] font-medium tracking-[-0.01em] text-[#111113] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] hover:bg-white/90 ${FOCUS_ON_PHOTO}`}
              >
                <Mail aria-hidden="true" strokeWidth={1.75} className="h-[18px] w-[18px]" />
                Get in touch
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : `Copy email address ${PROFILE.email}`}
                title={copied ? "Copied" : "Copy email"}
                className={`${GLASS} btn-apple grid h-12 w-14 shrink-0 place-items-center rounded-full hover:bg-white/20 ${FOCUS_ON_PHOTO}`}
              >
                {copied ? (
                  <Check aria-hidden="true" strokeWidth={2} className="h-[18px] w-[18px]" />
                ) : (
                  <Copy aria-hidden="true" strokeWidth={1.75} className="h-[18px] w-[18px]" />
                )}
                <span aria-live="polite" className="sr-only">
                  {copied ? "Email copied" : ""}
                </span>
              </button>
            </div>
          </figcaption>

          <button
            type="button"
            onClick={onView}
            aria-label="View profile"
            title="View profile"
            className={`${GLASS} btn-apple absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full hover:bg-white/20 ${FOCUS_ON_PHOTO}`}
          >
            <Maximize2 aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
          </button>
        </figure>
      </GlareHover>

      {/* Signature: an iOS Live Activity docked on the card's corner, pointing at shipped work. */}
      {BOOKLY ? (
        <a
          href={BOOKLY.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Bookly, live on Vercel (opens in a new tab)"
          className={`live-activity tactile absolute left-4 top-4 z-10 inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 lg:-left-8 lg:top-8 ${FOCUS}`}
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
    </div>
  );
}
