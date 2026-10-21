import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  Briefcase,
  Check,
  Copy,
  FileText,
  GraduationCap,
  MapPin,
  Move,
  Phone,
  Sparkles,
  Trophy,
} from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { dark } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [frontBadgeUrl, setFrontBadgeUrl] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate high-resolution executive badge with Danish's portrait photo
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";

    const renderBadge = () => {
      if (!active) return;
      try {
        const generated = generateExecutiveBadgeWithPhoto(img);
        if (generated) {
          setFrontBadgeUrl(generated);
        }
      } catch (err) {
        console.error("Failed to generate executive badge texture:", err);
      }
    };

    img.onload = renderBadge;
    img.src = ASSETS.profile.photo;
    if (img.complete && (img.naturalWidth > 0 || img.width > 0)) {
      renderBadge();
    }

    return () => {
      active = false;
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const hasCv = CV_HREF !== "#" && CV_HREF !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] md:w-[90vw] p-0 overflow-hidden bg-surface-2 border border-line rounded-2xl shadow-2xl">
        <DialogTitle className="sr-only">Sary Danish Profile & Interactive Badge</DialogTitle>
        <DialogDescription className="sr-only">
          Detailed developer biography, verified credentials, and interactive 3D physics lanyard badge for Sary Danish.
        </DialogDescription>

        <div className="flex flex-col lg:flex-row w-full h-full min-h-[580px] lg:h-[640px]">
          {/* Left Column: Interactive 3D Physics Lanyard Card Stage */}
          <div className="relative w-full lg:w-[46%] h-[420px] sm:h-[460px] lg:h-full bg-gradient-to-b from-[#18181b]/50 to-[#09090b]/90 dark:from-[#111113] dark:to-[#09090b] border-b lg:border-b-0 lg:border-r border-line overflow-hidden flex flex-col items-center justify-center select-none">
            {/* Subtle stage ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,151,58,0.15),transparent_65%)]"
            />

            {/* Top Telemetry & Pass Status Pill */}
            <div className="absolute top-3.5 z-20 flex items-center justify-center pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-lg text-[11px] font-mono text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                <span className="tracking-wider uppercase text-gold font-bold">EXECUTIVE PASS</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">3D PHYSICS LANYARD</span>
              </div>
            </div>

            {/* 3D Physics Lanyard Stage */}
            {mounted && open ? (
              <div className="w-full h-full relative cursor-grab active:cursor-grabbing pt-8">
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
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6">
                <div className="w-52 h-72 rounded-2xl border border-white/10 bg-surface-1 shadow-2xl flex items-center justify-center">
                  <span className="text-xs font-mono text-fg-subtle">Loading Interactive Card...</span>
                </div>
              </div>
            )}

            {/* Interactive hint prompt */}
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none z-10">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-sans text-zinc-400">
                <Move className="h-3 w-3 text-gold" />
                <span>Drag to swing • Fling to flip</span>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Engineering Dossier & Actions */}
          <div className="w-full lg:w-[54%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[580px] lg:max-h-full">
            <div className="space-y-5">
              {/* Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-[12px] font-semibold">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  Available for Full-Time Roles
                </span>
                <span className="inline-flex items-center gap-1.5 text-fg-subtle text-[12px] font-mono">
                  <MapPin className="h-3.5 w-3.5 text-fg-muted" />
                  Phnom Penh, Cambodia (UTC+7)
                </span>
              </div>

              {/* Name & Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight font-display">
                  {PROFILE.name}
                </h2>
                <p className="mt-1 text-[15px] font-medium text-gold font-display">
                  Junior Fullstack Developer • 4th-Year B.S. Software Development
                </p>
              </div>

              {/* Editorial Biography */}
              <div className="space-y-2.5 text-[14px] leading-[1.65] text-fg-muted">
                <p>{PROFILE.bio[0]}</p>
                <p>{PROFILE.bio[1]}</p>
              </div>

              {/* Verified Credentials Ledger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-lg border border-line bg-surface-1/70 flex items-start gap-2.5">
                  <div className="h-7 w-7 rounded-md bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="h-4 w-4 text-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-fg">Norton University</p>
                    <p className="text-[11.5px] text-fg-muted">B.S. in Software Development (2024–Present)</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-line bg-surface-1/70 flex items-start gap-2.5">
                  <div className="h-7 w-7 rounded-md bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Trophy className="h-4 w-4 text-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-fg">AI Innovation Winner</p>
                    <p className="text-[11.5px] text-fg-muted">AI Expert System 2026 Award (Clinical Engine)</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-line bg-surface-1/70 flex items-start gap-2.5">
                  <div className="h-7 w-7 rounded-md bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="h-4 w-4 text-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-fg">ETEC & KruITSolution</p>
                    <p className="text-[11.5px] text-fg-muted">Web Developer Trainee Intern (Weekend shifts)</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-line bg-surface-1/70 flex items-start gap-2.5">
                  <div className="h-7 w-7 rounded-md bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-4 w-4 text-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-fg">Bilingual Fluency</p>
                    <p className="text-[11.5px] text-fg-muted">Khmer (Native) & English (ACE Completed)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Communication & Action Hub */}
            <div className="pt-6 border-t border-line mt-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="press inline-flex h-10 items-center justify-center gap-2 px-4 rounded-control bg-fg text-bg font-semibold text-[13px] transition-opacity duration-150 hover:opacity-90 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Copied {PROFILE.email}!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={PROFILE.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex h-10 items-center justify-center gap-2 px-4 rounded-control border border-line-strong bg-surface-1 text-fg font-semibold text-[13px] hover:border-gold hover:text-gold transition-colors duration-150"
                >
                  <SiTelegram className="h-4 w-4 text-[#229ED9]" />
                  <span>Message on Telegram</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] pt-1">
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg font-mono transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-gold" />
                  <span>{PROFILE.phone}</span>
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg font-mono transition-colors"
                >
                  <SiGithub className="h-3.5 w-3.5" />
                  <span>github.com/{PROFILE.githubHandle}</span>
                </a>

                {hasCv ? (
                  <a
                    href={CV_HREF}
                    {...getCvLinkProps()}
                    className="inline-flex items-center gap-1.5 text-gold hover:underline font-medium"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Download CV</span>
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
