import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Lanyard from "@/components/ui/Lanyard";
import { drawBadgeBack, drawBadgeFront } from "@/lib/badge-faces";
import { PROFILE } from "@/content/portfolio";
import { CV_HREF } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";
import { useTheme } from "@/lib/use-theme";
import { ArrowUpRight, Check, Copy, FileText, Mail, Move, Phone } from "lucide-react";
import { SiTelegram } from "react-icons/si";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

// The owner's own goal statement: appears nowhere else on the site.
const GOAL = PROFILE.goal;

// Glossy app-icon tile for a contact row.
function Tile({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={`squircle [--r:9px] grid h-8 w-8 shrink-0 place-items-center ${className}`}
    >
      {children}
    </span>
  );
}

const ROW =
  "flex min-h-11 w-full items-center gap-3.5 px-4 py-1.5 text-left transition-colors duration-150 lg:[@media(max-height:740px)]:min-h-10 lg:[@media(max-height:740px)]:py-1";

function RowText({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="text-[12px] leading-tight text-fg-subtle">{label}</span>
      <span
        className={`mt-0.5 truncate text-[14px] leading-tight text-fg ${
          mono ? "font-mono tabular-nums tracking-[0.01em]" : "font-medium tracking-[-0.01em]"
        }`}
      >
        {value}
      </span>
    </span>
  );
}

function LinkRow({
  href,
  external = false,
  label,
  value,
  mono,
  tile,
}: {
  href: string;
  external?: boolean;
  label: string;
  value: string;
  mono?: boolean;
  tile: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group ${ROW} hover:bg-surface-1 ${FOCUS} focus-visible:-outline-offset-2`}
      >
        {tile}
        <RowText label={label} value={value} mono={mono ?? false} />
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:translate-x-px motion-reduce:transition-none"
        />
      </a>
    </li>
  );
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { dark } = useTheme();
  const time = useLocalTime(PROFILE.timezone);
  const [copied, setCopied] = useState(false);
  const [faces, setFaces] = useState<{ front: string; back: string } | null>(null);
  const [lanyardVisible, setLanyardVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Badge faces are drawn once, in the background as soon as the page is idle (or at the
  // latest when the modal opens), so they are ready by the time someone clicks View profile.
  // One shared draw: opening mid-draw reuses it. The lanyard mounts only when both faces are
  // ready, so no placeholder flashes.
  const facesDraw = useRef<Promise<void> | null>(null);
  const ensureFaces = () => {
    facesDraw.current ??= Promise.all([drawBadgeFront(), drawBadgeBack()])
      .then(([front, back]) => setFaces({ front, back }))
      .catch((err) => {
        facesDraw.current = null;
        console.error("Failed to draw the badge faces:", err);
      });
  };

  useEffect(() => {
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(ensureFaces, { timeout: 4000 })
      : window.setTimeout(ensureFaces, 2500);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
    // Runs once on mount; ensureFaces only reads refs and stable setters.
  }, []);

  useEffect(() => {
    if (!open) {
      setLanyardVisible(false);
      return;
    }
    ensureFaces();
    // Allow the modal dialog popup animation to complete smoothly first at 60fps,
    // then mount the 3D Lanyard so the card drops down smoothly without initial lag.
    const t = window.setTimeout(() => {
      setLanyardVisible(true);
    }, 450);
    return () => window.clearTimeout(t);
  }, [open]);

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

  const hasCv = CV_HREF !== "#" && CV_HREF !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="squircle [--r:26px] w-[94vw] max-w-[1040px] gap-0 overflow-hidden border-[var(--edge)] bg-surface-2 p-0">
        <DialogDescription className="sr-only">
          Goal, personal details and contact options for {PROFILE.name}, with an interactive
          lanyard badge that shows the same card as the home page.
        </DialogDescription>

        <div className="flex h-full w-full flex-col lg:h-[min(780px,calc(100dvh-2rem))] lg:flex-row">
          {/* Badge stage: a softly lit surface the badge hangs over. */}
          <div className="relative flex h-[440px] w-full shrink-0 select-none items-center justify-center overflow-hidden border-b border-line bg-surface-1 lg:h-full lg:w-[40%] lg:border-b-0 lg:border-r">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_28%,var(--glow),transparent_72%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.12)] dark:shadow-[inset_0_0_90px_rgba(0,0,0,0.55)]"
            />

            {open && faces && lanyardVisible ? (
              // The badge drops straight down from the clip and the strap catches it, in view.
              <div className="relative h-full w-full cursor-grab active:cursor-grabbing motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
                <Lanyard
                  frontImage={faces.front}
                  backImage={faces.back}
                  cardColor="#0c1527"
                  finish="satin"
                  holder
                  // Holder frame contrasts with the stage: frosted white on dark, cool slate on light.
                  holderColor={dark ? "#dfe6f2" : "#8e98a8"}
                  strapLength={0.55}
                  strapColor="#141416"
                  strapWidth={0.55}
                  metal={dark ? "gold" : "silver"}
                  gravity={1.1}
                  damping={0.48}
                  elasticity={0.45}
                  breeze={0.35}
                  interactive={true}
                  intro="drop"
                />
              </div>
            ) : null}

            <div
              className={`pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center transition-opacity duration-300 ${
                lanyardVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="glass-pill inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] text-fg-muted">
                <Move aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
                Drag to swing · flick to flip
              </span>
            </div>
          </div>

          {/* Panel: only what the badge and the page do not already say. */}
          <div className="flex min-h-0 w-full flex-col overflow-y-auto p-7 sm:p-9 lg:w-[60%] lg:px-10 lg:py-8 lg:[@media(max-height:740px)]:py-6">
            <div className="flex flex-wrap items-center gap-2.5 pr-10">
              <span className="glass-pill inline-flex h-8 items-center gap-2 rounded-full pl-3 pr-3.5 text-[13px] font-medium text-fg">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                Available for Full-time Work
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] text-fg-subtle">
                Local time
                <span className="skeuo-well rounded-[6px] px-1.5 py-0.5 font-mono text-[12.5px] tabular-nums text-fg">
                  {time ?? "--:--"}
                </span>
                {PROFILE.timezoneLabel}
              </span>
            </div>

            <DialogTitle className="mt-4 text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
              {PROFILE.name}
            </DialogTitle>
            <p className="mt-1.5 text-[15px] text-fg-muted">
              Software Development student at Norton University
            </p>

            {/* Where he is heading: the one bio line no section repeats. */}
            <figure className="mt-3.5 shrink-0">
              {/* 13.5px keeps the owner's full goal sentence to three lines (owner request). */}
              <blockquote className="text-pretty text-[13.5px] leading-[1.55] tracking-[-0.005em] text-fg">
                <span aria-hidden="true" className="mr-0.5 text-fg-subtle">
                  “
                </span>
                {GOAL}
                <span aria-hidden="true" className="ml-0.5 text-fg-subtle">
                  ”
                </span>
              </blockquote>
            </figure>

            {/* Personal details as an ID data page: laminated security paper with the badge's
                holographic seal. Nothing here appears anywhere else on the site. */}
            <section aria-labelledby="profile-details" className="mt-5 shrink-0">
              <h3 id="profile-details" className="text-[13px] font-medium text-fg-muted">
                Details
              </h3>
              <div className="id-datapage squircle [--r:16px] relative mt-2 px-5 py-3.5">
                <span
                  aria-hidden="true"
                  className="card-holo absolute bottom-4 right-4 grid h-8 w-8 place-items-center rounded-[8px]"
                >
                  <span className="font-poster text-[10.5px] font-extrabold tracking-[-0.04em] text-[#3b4270]/55">
                    SD
                  </span>
                </span>
                <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2.5">
                  <div className="min-w-0">
                    <dt className="text-[11.5px] text-fg-subtle">Address</dt>
                    <dd className="mt-0.5 text-[14px] font-medium leading-snug tracking-[-0.01em] text-fg">
                      {PROFILE.address}
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[11.5px] text-fg-subtle">Date of birth</dt>
                    <dd className="mt-0.5 font-mono text-[13.5px] tabular-nums text-fg">
                      {PROFILE.birthDate}
                    </dd>
                  </div>
                  <div className="col-span-2 min-w-0 pr-10">
                    <dt className="text-[11.5px] text-fg-subtle">Languages</dt>
                    <dd className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[14px] leading-snug text-fg">
                      <span>
                        <span lang="km" className="font-khmer font-medium">
                          ខ្មែរ
                        </span>{" "}
                        <span className="text-fg-muted">Khmer · native</span>
                      </span>
                      <span>
                        <span className="font-medium">English</span>{" "}
                        <span className="text-fg-muted">· good working proficiency</span>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            {/* Contact console: one grouped list, every way to reach him. */}
            <h3 className="mt-5 text-[13px] font-medium text-fg-muted">Reach me</h3>
            <ul className="tactile squircle [--r:16px] mt-2 grid shrink-0 divide-y divide-[var(--line)] overflow-hidden">
              <li className={`${ROW}`}>
                <Tile className="icon-tile">
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                </Tile>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className={`min-w-0 flex-1 rounded-sm ${FOCUS}`}
                  aria-label={`Email ${PROFILE.email}`}
                >
                  <RowText label="Email" value={PROFILE.email} />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`btn-apple skeuo-key inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium ${FOCUS}`}
                >
                  {copied ? (
                    <Check aria-hidden="true" strokeWidth={2.25} className="h-3.5 w-3.5" />
                  ) : (
                    <Copy aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
                  )}
                  <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                </button>
              </li>
              <LinkRow
                href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                label="Phone"
                value={PROFILE.phone}
                mono
                tile={
                  <Tile className="skeuo-gloss bg-[#34C759] text-white">
                    <Phone className="h-4 w-4 fill-white" strokeWidth={1.5} />
                  </Tile>
                }
              />
              <LinkRow
                href={PROFILE.telegram}
                external
                label="Telegram"
                value={PROFILE.telegramHandle}
                tile={
                  <Tile className="skeuo-gloss bg-[#26A5E4] text-white">
                    <SiTelegram className="h-[18px] w-[18px]" />
                  </Tile>
                }
              />
              {hasCv ? (
                <LinkRow
                  href={CV_HREF}
                  external
                  label="Résumé"
                  value="Download CV (PDF)"
                  tile={
                    <Tile className="icon-tile-light text-fg">
                      <FileText className="h-4 w-4" strokeWidth={1.75} />
                    </Tile>
                  }
                />
              ) : null}
            </ul>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;
