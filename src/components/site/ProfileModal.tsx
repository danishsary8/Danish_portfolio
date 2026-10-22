import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Lanyard from "@/components/ui/Lanyard";
import {
  BADGE_FRONT_FALLBACK_SVG,
  BADGE_BACK_SVG,
  generateExecutiveBadgeWithPhoto,
} from "@/lib/badge-texture";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useTheme } from "@/lib/use-theme";
import {
  Award,
  Briefcase,
  Check,
  Copy,
  FileText,
  GraduationCap,
  Languages,
  Move,
  Phone,
} from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Every fact is from the CV (public/sary-danish-cv.pdf).
const FACTS = [
  {
    icon: Briefcase,
    title: "Web Developer Intern (Weekends)",
    sub: "ETEC & KruITSolution",
    meta: "Jul 2026 – Now",
    gold: false,
  },
  {
    icon: Award,
    title: "Award Winner (Team)",
    sub: "AI Expert System and Innovation 2026",
    meta: "Sep 2026",
    gold: true,
  },
  {
    icon: GraduationCap,
    title: "B.S. Software Development",
    sub: "Norton University · 4th year",
    meta: "2024 – Now",
    gold: false,
  },
  {
    icon: Languages,
    title: "Khmer & English",
    sub: "Native · Good working proficiency",
    meta: "ACE · 2024 – 2026",
    gold: false,
  },
] as const;

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { dark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [frontBadgeUrl, setFrontBadgeUrl] = useState<string>("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    return () => window.clearTimeout(timer.current);
  }, []);

  // Badge front texture: rendered once from the portrait photo.
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";

    const renderBadge = () => {
      if (!active) return;
      try {
        const generated = generateExecutiveBadgeWithPhoto(img);
        if (generated) setFrontBadgeUrl(generated);
      } catch (err) {
        console.error("Failed to generate badge texture:", err);
      }
    };

    img.onload = renderBadge;
    img.src = ASSETS.profile.photo;
    if (img.complete && (img.naturalWidth > 0 || img.width > 0)) renderBadge();

    return () => {
      active = false;
    };
  }, []);

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
      <DialogContent className="squircle [--r:24px] w-[94vw] max-w-[1040px] gap-0 overflow-hidden border-[var(--edge)] bg-surface-2 p-0">
        <DialogTitle className="sr-only">{PROFILE.name}, profile</DialogTitle>
        <DialogDescription className="sr-only">
          Biography, experience, award, education and contact details for {PROFILE.name}, with an
          interactive lanyard badge.
        </DialogDescription>

        <div className="flex h-full w-full flex-col lg:h-[min(680px,calc(100dvh-4rem))] lg:flex-row">
          {/* Badge stage */}
          <div className="relative flex h-[420px] w-full shrink-0 select-none items-center justify-center overflow-hidden border-b border-line bg-surface-1 lg:h-full lg:w-[44%] lg:border-b-0 lg:border-r">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,var(--glow),transparent_70%)]"
            />

            {mounted && open ? (
              <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
                <Lanyard
                  frontImage={frontBadgeUrl || BADGE_FRONT_FALLBACK_SVG}
                  backImage={BADGE_BACK_SVG}
                  cardColor="#111113"
                  strapLength={0.55}
                  strapColor="#141416"
                  strapWidth={0.55}
                  metal={dark ? "gold" : "silver"}
                  gravity={1.1}
                  damping={0.48}
                  elasticity={0.45}
                  breeze={0.35}
                  interactive={true}
                  intro={true}
                />
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
              <span className="glass-pill inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] text-fg-muted">
                <Move aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
                Drag to swing · flick to flip
              </span>
            </div>
          </div>

          {/* Profile */}
          <div className="flex min-h-0 w-full flex-col overflow-y-auto p-7 sm:p-9 lg:w-[56%] lg:px-10 lg:py-9">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pr-10">
              <span className="glass-pill inline-flex h-8 items-center gap-2 rounded-full pl-3 pr-3.5 text-[13px] font-medium text-fg">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                Open to Web Developer roles
              </span>
              <span className="font-mono text-[12px] tabular-nums text-fg-subtle">
                Phnom Penh · {PROFILE.timezoneLabel} (UTC+7)
              </span>
            </div>

            <h2 className="mt-5 text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
              {PROFILE.name}
            </h2>
            <p className="mt-2 text-[15px] text-fg-muted">
              Junior Web Developer · Norton University, 4th year
            </p>

            <p className="mt-5 max-w-[62ch] shrink-0 text-[14.5px] leading-[1.65] text-fg-muted">
              {PROFILE.bio[0]}
            </p>

            <dl className="squircle [--r:14px] mt-6 grid shrink-0 gap-px overflow-hidden border border-[var(--edge)] bg-[var(--edge)] sm:grid-cols-2">
              {FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.title} className="flex items-start gap-3 bg-surface-2 p-4">
                    <span
                      aria-hidden="true"
                      className={`squircle [--r:8px] grid h-8 w-8 shrink-0 place-items-center ${
                        fact.gold ? "bg-gold text-white dark:text-bg" : "bg-fg text-bg"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[13.5px] font-medium leading-tight tracking-[-0.01em] text-fg">
                        {fact.title}
                      </dt>
                      <dd className="mt-1 text-[12.5px] leading-snug text-fg-muted">{fact.sub}</dd>
                      <dd className="mt-1.5 font-mono text-[11.5px] tabular-nums text-fg-subtle">
                        {fact.meta}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div className="mt-auto shrink-0 pt-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`btn-apple btn-apple-primary inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium ${FOCUS}`}
                >
                  {copied ? (
                    <Check aria-hidden="true" strokeWidth={2} className="h-4 w-4" />
                  ) : (
                    <Copy aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
                  )}
                  <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
                </button>
                <a
                  href={PROFILE.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-apple btn-apple-secondary inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium ${FOCUS}`}
                >
                  <SiTelegram aria-hidden="true" className="h-4 w-4 text-[#229ED9]" />
                  Telegram
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-apple btn-apple-secondary inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium ${FOCUS}`}
                >
                  <SiGithub aria-hidden="true" className="h-4 w-4" />
                  GitHub
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-1.5 font-mono tabular-nums text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  <Phone aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
                  {PROFILE.phone}
                </a>
                <span className="text-fg-subtle">{PROFILE.email}</span>
                {hasCv ? (
                  <a
                    href={CV_HREF}
                    {...getCvLinkProps()}
                    className="inline-flex items-center gap-1.5 font-medium text-gold-ink underline-offset-4 hover:underline dark:text-gold"
                  >
                    <FileText aria-hidden="true" strokeWidth={1.5} className="h-3.5 w-3.5" />
                    Download CV
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;
