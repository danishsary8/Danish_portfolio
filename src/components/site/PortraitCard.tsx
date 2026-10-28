import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Award, Phone } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { GlareHover } from "@/components/ui/GlareHover";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { TELEGRAM_QR } from "@/assets/telegram-qr";

const FOCUS_ON_PHOTO =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// Panel colour under the photo: the deep navy of the suit and the backdrop's shadow side.
const NAVY = "#0c1527";

// Frosted surface for anything that sits on the photo.
const GLASS =
  "border border-white/20 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl";

const CONTACTS = [
  {
    label: "Phone",
    value: PROFILE.phone,
    href: `tel:${PROFILE.phone.replace(/\s+/g, "")}`,
    Icon: Phone,
    external: false,
    // iOS Phone app green disc with a white handset (owner request).
    brand: "phone",
  },
  {
    label: "Telegram",
    value: PROFILE.telegramHandle,
    href: PROFILE.telegram,
    Icon: SiTelegram,
    external: true,
    // Real Telegram mark (owner request): brand-blue disc with the white plane.
    brand: "telegram",
  },
] as const;

// Keyboard flip control: hidden until it takes keyboard focus, then a small dark pill.
const KEY_FLIP =
  "sr-only focus:not-sr-only focus:absolute focus:right-3 focus:top-3 focus:z-10 focus:rounded-full focus:bg-black/60 focus:px-3 focus:py-1.5 focus:text-[12.5px] focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white";

// Faces swap visibility halfway through the 700ms turn; instantly under reduced motion.
const FACE_SWAP = "[transition:visibility_0s_linear_350ms] motion-reduce:[transition:none]";

/**
 * Hero profile card that flips when clicked anywhere (except its links and button).
 * Front: Apple-style portrait card. Back: the back of a real card: magnetic stripe,
 * the owner's handwritten signature on a guilloche panel, printed card data (ID, email,
 * phone, GitHub), a scannable Telegram QR, fine print, the award line and holographic foil.
 * Keyboard: a hidden "Flip card" button appears on focus. The hidden face is inert.
 * Reduced motion: instant swap.
 */
export function PortraitCard({ onView }: { onView: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const frontFlip = useRef<HTMLButtonElement>(null);
  const backFlip = useRef<HTMLButtonElement>(null);

  const flip = (toBack: boolean, fromKeyboard: boolean) => {
    setFlipped(toBack);
    if (!fromKeyboard) return;
    // Keyboard users keep their place: focus the flip control on the other face. That face
    // only becomes visible (and focusable) at the midpoint of the turn, so retry every 40ms
    // until it takes focus, for up to 1.2s.
    const target = toBack ? backFlip : frontFlip;
    const start = performance.now();
    const tryFocus = () => {
      target.current?.focus({ preventScroll: true });
      if (document.activeElement !== target.current && performance.now() - start < 1200) {
        window.setTimeout(tryFocus, 40);
      }
    };
    window.setTimeout(tryFocus, 0);
  };

  // A click anywhere flips the card, except on its own links and buttons.
  const onCardClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    flip(!flipped, false);
  };

  return (
    <div
      onClick={onCardClick}
      title={flipped ? "Click to flip back" : "Click to flip"}
      className="card-portrait-shadow relative h-[460px] w-full max-w-[312px] cursor-pointer select-none rounded-[28px] perspective-[1400px]"
    >
      <div
        className={`relative h-full w-full transform-3d transition-transform duration-[700ms] ease-[var(--ease-in-out)] motion-reduce:transition-none ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Each face also hides at the midpoint of the turn (when it is edge-on): Chrome paints
            composited children (blur, glare) through backface-visibility otherwise. */}
        <div
          className={`absolute inset-0 backface-hidden ${FACE_SWAP} ${flipped ? "invisible" : "visible"}`}
          inert={flipped}
        >
          <button ref={frontFlip} type="button" onClick={() => flip(true, true)} className={KEY_FLIP}>
            Flip card
          </button>
          <CardFront onView={onView} />
        </div>

        <div
          className={`absolute inset-0 rotate-y-180 backface-hidden ${FACE_SWAP} ${flipped ? "visible" : "invisible"}`}
          inert={!flipped}
        >
          <button ref={backFlip} type="button" onClick={() => flip(false, true)} className={KEY_FLIP}>
            Flip back
          </button>
          <CardBack />
        </div>
      </div>
    </div>
  );
}

// Printed card data. Plain text, as on a real card (the front and hero carry the links).
const CARD_DATA = [
  { label: "ID No.", value: "B20235079", mono: true },
  { label: "Email", value: PROFILE.email, mono: false },
  { label: "Phone", value: PROFILE.phone, mono: true },
  { label: "GitHub", value: `github.com/${PROFILE.githubHandle}`, mono: false },
] as const;

function CardBack() {
  return (
    <div className="card-stock card-portrait-shadow relative flex h-full w-full flex-col overflow-hidden rounded-[28px] text-left text-white">
      {/* Magnetic stripe, edge to edge. */}
      <div aria-hidden="true" className="card-magstripe mt-5 h-11 w-full shrink-0" />

      {/* Signature panel: the owner's own signature, in ink on security paper. */}
      <div className="px-5 pt-4">
        <div className="card-sigpanel relative h-14 overflow-hidden rounded-[4px]">
          <img
            src={ASSETS.profile.signature}
            alt={`Signature of ${PROFILE.name}`}
            width={1024}
            height={683}
            decoding="async"
            draggable={false}
            // Multiply drops the photo's white paper so only the ink sits on the panel.
            className="absolute left-1/2 top-1/2 h-[132px] w-auto max-w-none -translate-x-1/2 -translate-y-[52%] -rotate-2 mix-blend-multiply"
          />
        </div>
        <p className="mt-1.5 text-[10px] tracking-[0.02em] text-white/40">Authorized signature</p>
      </div>

      {/* Card data on the left, Telegram QR on the right. */}
      <div className="mt-4 flex items-start justify-between gap-3.5 px-5">
        <dl className="grid min-w-0 gap-y-1.5">
          {CARD_DATA.map(({ label, value, mono }) => (
            <div key={label} className="min-w-0">
              <dt className="text-[10px] leading-none tracking-[0.02em] text-white/45">{label}</dt>
              <dd
                className={`skeuo-engrave mt-1 truncate text-[12px] leading-tight text-white/85 ${
                  mono ? "font-mono tabular-nums tracking-[0.02em]" : "font-medium tracking-[-0.005em]"
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <figure className="m-0 flex shrink-0 flex-col items-center">
          <div className="rounded-[10px] bg-[#f6f3ea] p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.06)]">
            {/* Quiet zone of 2 modules on each side via the viewBox. */}
            <svg
              viewBox={`-2 -2 ${TELEGRAM_QR.size + 4} ${TELEGRAM_QR.size + 4}`}
              role="img"
              aria-label={`QR code: Telegram ${PROFILE.telegramHandle}`}
              className="block h-[86px] w-[86px]"
              shapeRendering="crispEdges"
            >
              <path d={TELEGRAM_QR.path} fill="#162447" />
            </svg>
          </div>
          <figcaption className="mt-1.5 inline-flex items-center gap-1 text-[10px] tracking-[0.02em] text-white/55">
            <SiTelegram aria-hidden="true" className="h-2.5 w-2.5 text-[#26A5E4]" />
            Scan for Telegram
          </figcaption>
        </figure>
      </div>

      {/* Fine print. */}
      <p className="skeuo-engrave mt-3.5 px-5 text-[11px] leading-[1.55]">
        The holder builds full-stack web apps with secure REST APIs, using React, Laravel and
        PostgreSQL. Designed by {PROFILE.shortName} in Cambodia.
      </p>

      {/* Bottom: award on the left, holographic foil on the right. */}
      <div className="mt-auto flex items-end justify-between gap-3 px-5 pb-5">
        <p className="inline-flex items-center gap-1.5 text-[11.5px] font-medium tracking-[0.01em] text-[#c9973a] [text-shadow:0_-1px_0_rgba(0,0,0,0.55)]">
          <Award aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5" />
          2026 Award Winner · Team
        </p>
        <div
          aria-hidden="true"
          className="card-holo grid h-11 w-11 shrink-0 place-items-center rounded-[9px]"
        >
          <span className="font-poster text-[14px] font-extrabold tracking-[-0.04em] text-[#3b4270]/55">
            SD
          </span>
        </div>
      </div>
    </div>
  );
}

function CardFront({ onView }: { onView: () => void }) {
  return (
    <GlareHover
      width="100%"
      height="460px"
      borderRadius="28px"
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
      background={NAVY}
      className="card-portrait-shadow max-w-[312px]"
    >
      <figure className="absolute inset-0 m-0 whitespace-normal text-left">
        <img
          src={ASSETS.profile.photo}
          alt={`Portrait of ${PROFILE.name}`}
          width={680}
          height={850}
          decoding="async"
          // Whole photo at card width (312 × 390), melting into the navy footer strip
          // (sampled from the suit and backdrop) instead of a hard edge.
          className="absolute inset-x-0 top-0 h-[398px] w-full object-cover object-top [mask-image:linear-gradient(to_bottom,#000_82%,transparent_100%)]"
        />

        {/* Headroom shade so the name reads on the backdrop. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent"
        />
        {/* Hairline rim so the card edge stays crisp on the light theme. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
        />

        <figcaption className="contents">
          <div className="absolute inset-x-0 top-6 flex flex-col items-center px-5 text-center text-white">
            <p className="text-balance [font-family:'Allura',cursive] text-[40px] font-normal leading-[1.1] tracking-[0.005em] [text-shadow:0_1px_2px_rgba(10,25,70,0.35),0_0_14px_rgba(10,25,70,0.25)]">
              {PROFILE.name}
            </p>
            <p
              className={`${GLASS} mt-2 inline-flex items-center gap-1.5 rounded-full py-[3px] pl-2 pr-2.5 text-[12.5px] font-medium tracking-[-0.005em]`}
            >
              <span
                role="img"
                aria-label="Available for work"
                title="Available for work"
                className="h-[7px] w-[7px] shrink-0 rounded-full bg-gold shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
              />
              {PROFILE.role}
            </p>
          </div>

          {/* Footer: one quiet row. Direct lines as text on the left, one capsule on the right. */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 pb-5 text-white">
            <ul className="flex min-w-0 flex-col">
              {CONTACTS.map(({ label, value, href, Icon, external, brand }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`${label}: ${value}${external ? " (opens in a new tab)" : ""}`}
                    className={`group inline-flex min-h-6 items-center gap-2 rounded-md text-[14px] font-medium tracking-[-0.01em] tabular-nums transition-colors duration-150 hover:text-white/75 ${FOCUS_ON_PHOTO}`}
                  >
                    {brand === "telegram" ? (
                      // The Simple Icons mark cuts the plane out of the disc; a white dot behind it
                      // fills the cut-out so it reads as the real app icon on the navy.
                      <span aria-hidden="true" className="relative grid h-4 w-4 shrink-0 place-items-center">
                        <span className="absolute inset-[3px] rounded-full bg-white" />
                        <Icon className="relative h-4 w-4 text-[#26A5E4]" />
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid h-4 w-4 shrink-0 place-items-center skeuo-gloss rounded-full bg-[#34C759]"
                      >
                        <Icon className="h-[9px] w-[9px] fill-white text-white" strokeWidth={1.5} />
                      </span>
                    )}
                    <span className="truncate">{value}</span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onView}
              className={`card-glass-btn group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full pl-4 pr-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white ${FOCUS_ON_PHOTO}`}
            >
              View profile
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={2.25}
                className="h-4 w-4 opacity-80 transition-[transform,opacity] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100 motion-reduce:transition-none"
              />
            </button>
          </div>
        </figcaption>
      </figure>
    </GlareHover>
  );
}
