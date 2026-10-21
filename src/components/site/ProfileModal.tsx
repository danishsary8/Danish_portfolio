import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Lanyard from "@/components/ui/Lanyard";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import executiveBadge from "@/assets/executive-badge.svg";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useTheme } from "@/lib/use-theme";
import {
  Briefcase,
  Check,
  Copy,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Move,
  Phone,
  Send,
  Sparkles,
  Trophy,
} from "lucide-react";
import { SiGithub, SiTelegram } from "react-icons/si";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Crisp SVG texture for the back of the physical developer badge
const BADGE_BACK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="850" viewBox="0 0 600 850" fill="%23111113">
  <rect width="600" height="850" fill="%23111113"/>
  <rect x="24" y="24" width="552" height="802" rx="20" fill="none" stroke="%23c9973a" stroke-width="2" stroke-opacity="0.35"/>
  <text x="300" y="85" text-anchor="middle" fill="%23c9973a" font-family="monospace" font-size="20" letter-spacing="4" font-weight="bold">DEVELOPER PASSPORT</text>
  <text x="300" y="120" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="14">KINGDOM OF CAMBODIA • ICT UTC+7</text>
  <line x1="50" y1="145" x2="550" y2="145" stroke="%2327272a" stroke-width="1.5"/>
  
  <text x="70" y="200" fill="%2371717a" font-family="monospace" font-size="12">IDENTIFIER</text>
  <text x="70" y="230" fill="%23ededef" font-family="monospace" font-size="20" font-weight="bold">DANISH-DEV-2026</text>
  
  <text x="70" y="290" fill="%2371717a" font-family="monospace" font-size="12">ORGANIZATION</text>
  <text x="70" y="320" fill="%23ededef" font-family="sans-serif" font-size="17" font-weight="bold">Norton University</text>
  <text x="70" y="345" fill="%23a1a1aa" font-family="sans-serif" font-size="14">B.S. Software Development (Year 4)</text>
  
  <text x="70" y="405" fill="%2371717a" font-family="monospace" font-size="12">CORE EXPERTISE</text>
  <text x="70" y="435" fill="%23c9973a" font-family="monospace" font-size="16" font-weight="bold">React • Laravel • PostgreSQL • REST</text>
  
  <text x="70" y="495" fill="%2371717a" font-family="monospace" font-size="12">DIRECT TELEMETRY</text>
  <text x="70" y="525" fill="%23ededef" font-family="monospace" font-size="15">github.com/danishsary8</text>
  <text x="70" y="555" fill="%23ededef" font-family="monospace" font-size="15">t.me/danishsary</text>
  
  <g transform="translate(70, 620)" fill="%23c9973a" opacity="0.85">
    <rect x="0" y="0" width="5" height="50"/>
    <rect x="9" y="0" width="3" height="50"/>
    <rect x="16" y="0" width="11" height="50"/>
    <rect x="33" y="0" width="5" height="50"/>
    <rect x="43" y="0" width="8" height="50"/>
    <rect x="58" y="0" width="13" height="50"/>
    <rect x="78" y="0" width="4" height="50"/>
    <rect x="88" y="0" width="9" height="50"/>
    <rect x="103" y="0" width="6" height="50"/>
    <rect x="114" y="0" width="15" height="50"/>
    <rect x="136" y="0" width="4" height="50"/>
    <rect x="146" y="0" width="8" height="50"/>
    <rect x="160" y="0" width="11" height="50"/>
    <rect x="178" y="0" width="5" height="50"/>
    <rect x="188" y="0" width="14" height="50"/>
    <rect x="208" y="0" width="6" height="50"/>
    <rect x="220" y="0" width="9" height="50"/>
    <rect x="236" y="0" width="4" height="50"/>
    <rect x="246" y="0" width="13" height="50"/>
    <rect x="266" y="0" width="6" height="50"/>
    <rect x="278" y="0" width="8" height="50"/>
    <rect x="292" y="0" width="15" height="50"/>
    <rect x="314" y="0" width="5" height="50"/>
    <rect x="324" y="0" width="9" height="50"/>
    <rect x="340" y="0" width="4" height="50"/>
    <rect x="350" y="0" width="11" height="50"/>
    <rect x="368" y="0" width="6" height="50"/>
    <rect x="380" y="0" width="14" height="50"/>
    <rect x="401" y="0" width="4" height="50"/>
    <rect x="411" y="0" width="9" height="50"/>
    <rect x="426" y="0" width="11" height="50"/>
    <rect x="444" y="0" width="6" height="50"/>
  </g>
  <text x="300" y="700" text-anchor="middle" fill="%2371717a" font-family="monospace" font-size="12" letter-spacing="3">8 8 0 2 0 2 6 0 8 7 6 8 0 9 9 9</text>
  <text x="300" y="755" text-anchor="middle" fill="%2352525b" font-family="monospace" font-size="11">SECURITY PASS VERIFIED • PHNOM PENH</text>
</svg>`;

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { dark } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          {/* Left Column: Interactive 3D Physics Lanyard Stage */}
          <div className="relative w-full lg:w-[46%] h-[340px] sm:h-[400px] lg:h-full bg-gradient-to-b from-[#18181b]/50 to-[#09090b]/90 dark:from-[#111113] dark:to-[#09090b] border-b lg:border-b-0 lg:border-r border-line overflow-hidden flex flex-col items-center justify-center select-none">
            {/* Subtle stage ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,151,58,0.15),transparent_65%)]"
            />

            {/* Stage telemetry pill */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span>3D PHYSICS PASS</span>
            </div>

            {/* 3D Lanyard Canvas */}
            {mounted && open ? (
              <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                <Lanyard
                  frontImage={executiveBadge}
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
                <img
                  src={executiveBadge}
                  alt={`${PROFILE.name} Executive Pass`}
                  className="w-52 h-72 object-contain rounded-2xl shadow-2xl"
                />
              </div>
            )}

            {/* Interactive hint prompt */}
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none z-10">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11.5px] font-sans text-zinc-400">
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
