import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Lanyard from "@/components/ui/Lanyard";
import ReflectiveCard from "@/components/ui/ReflectiveCard";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
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

// Crisp vector SVG texture for the front of the physical developer badge
const BADGE_FRONT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="850" viewBox="0 0 600 850" fill="%23111113">
  <defs>
    <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="%23e6be68"/>
      <stop offset="50%" stop-color="%23c9973a"/>
      <stop offset="100%" stop-color="%2385601f"/>
    </linearGradient>
    <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="%2327272a"/>
      <stop offset="100%" stop-color="%2318181b"/>
    </linearGradient>
  </defs>
  <rect width="600" height="850" rx="36" fill="%23111113"/>
  <rect x="20" y="20" width="560" height="810" rx="26" fill="none" stroke="%23c9973a" stroke-width="2" stroke-opacity="0.4"/>
  <rect x="250" y="24" width="100" height="14" rx="7" fill="%2309090b" stroke="%233f3f46" stroke-width="1.5"/>
  
  <text x="300" y="85" text-anchor="middle" fill="%23c9973a" font-family="monospace" font-size="14" letter-spacing="4" font-weight="bold">EXECUTIVE DEVELOPER PASS</text>
  <text x="300" y="112" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12" letter-spacing="1">NORTON UNIVERSITY • ICT UTC+7</text>
  <line x1="50" y1="135" x2="550" y2="135" stroke="%2327272a" stroke-width="1.5"/>

  <g transform="translate(190, 160)">
    <rect width="220" height="250" rx="28" fill="url(%23shield-grad)" stroke="%23c9973a" stroke-width="2.5" stroke-opacity="0.8"/>
    <rect x="12" y="12" width="196" height="226" rx="20" fill="none" stroke="%23ffffff" stroke-width="1" stroke-opacity="0.1"/>
    
    <circle cx="110" cy="95" r="50" fill="%23111113" stroke="url(%23gold-grad)" stroke-width="3"/>
    <text x="110" y="115" text-anchor="middle" fill="url(%23gold-grad)" font-family="sans-serif" font-size="52" font-weight="900">SD</text>
    
    <g transform="translate(70, 175)" fill="%23c9973a" opacity="0.9">
      <rect width="80" height="50" rx="8" fill="none" stroke="%23c9973a" stroke-width="1.5"/>
      <line x1="25" y1="0" x2="25" y2="50" stroke="%23c9973a" stroke-width="1.5"/>
      <line x1="55" y1="0" x2="55" y2="50" stroke="%23c9973a" stroke-width="1.5"/>
      <line x1="0" y1="25" x2="80" y2="25" stroke="%23c9973a" stroke-width="1.5"/>
      <circle cx="40" cy="25" r="10" fill="%23c9973a"/>
    </g>
  </g>

  <text x="300" y="465" text-anchor="middle" fill="%23ededef" font-family="sans-serif" font-size="34" font-weight="bold" letter-spacing="1">SARY DANISH</text>
  <text x="300" y="505" text-anchor="middle" fill="%23c9973a" font-family="monospace" font-size="16" font-weight="bold" letter-spacing="1">Junior Fullstack Developer</text>
  <text x="300" y="535" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="14">React • Laravel • PostgreSQL • REST</text>

  <g transform="translate(160, 560)">
    <rect width="280" height="36" rx="18" fill="%2318181b" stroke="%2322c55e" stroke-width="1.5" stroke-opacity="0.6"/>
    <circle cx="24" cy="18" r="6" fill="%2322c55e"/>
    <text x="42" y="23" fill="%2322c55e" font-family="sans-serif" font-size="13" font-weight="bold">AVAILABLE FOR FULL-TIME</text>
  </g>

  <line x1="50" y1="625" x2="550" y2="625" stroke="%2327272a" stroke-width="1.5"/>
  <text x="70" y="660" fill="%2371717a" font-family="monospace" font-size="12">SECURITY IDENTIFIER</text>
  <text x="70" y="690" fill="%23ededef" font-family="monospace" font-size="19" font-weight="bold">DANISH-DEV-2026</text>
  <text x="530" y="690" text-anchor="end" fill="%23c9973a" font-family="monospace" font-size="14" font-weight="bold">VERIFIED</text>

  <g transform="translate(70, 720)" fill="%23c9973a" opacity="0.85">
    <rect x="0" y="0" width="5" height="45"/>
    <rect x="9" y="0" width="3" height="45"/>
    <rect x="16" y="0" width="11" height="45"/>
    <rect x="33" y="0" width="5" height="45"/>
    <rect x="43" y="0" width="8" height="45"/>
    <rect x="58" y="0" width="13" height="45"/>
    <rect x="78" y="0" width="4" height="45"/>
    <rect x="88" y="0" width="9" height="45"/>
    <rect x="103" y="0" width="6" height="45"/>
    <rect x="114" y="0" width="15" height="45"/>
    <rect x="136" y="0" width="4" height="45"/>
    <rect x="146" y="0" width="8" height="45"/>
    <rect x="160" y="0" width="11" height="45"/>
    <rect x="178" y="0" width="5" height="45"/>
    <rect x="188" y="0" width="14" height="45"/>
    <rect x="208" y="0" width="6" height="45"/>
    <rect x="220" y="0" width="9" height="45"/>
    <rect x="236" y="0" width="4" height="45"/>
    <rect x="246" y="0" width="13" height="45"/>
    <rect x="266" y="0" width="6" height="45"/>
    <rect x="278" y="0" width="8" height="45"/>
    <rect x="292" y="0" width="15" height="45"/>
    <rect x="314" y="0" width="5" height="45"/>
    <rect x="324" y="0" width="9" height="45"/>
    <rect x="340" y="0" width="4" height="45"/>
    <rect x="350" y="0" width="11" height="45"/>
    <rect x="368" y="0" width="6" height="45"/>
    <rect x="380" y="0" width="14" height="45"/>
    <rect x="401" y="0" width="4" height="45"/>
    <rect x="411" y="0" width="9" height="45"/>
    <rect x="426" y="0" width="11" height="45"/>
    <rect x="444" y="0" width="6" height="45"/>
  </g>
  <text x="300" y="795" text-anchor="middle" fill="%2352525b" font-family="monospace" font-size="11">CAMBODIA ICT TELEMETRY • VERIFIED PASS</text>
</svg>`;

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
  const [cardMode, setCardMode] = useState<"reflective" | "physics">("reflective");

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
          {/* Left Column: Interactive Card & Lanyard Stage */}
          <div className="relative w-full lg:w-[46%] h-[420px] sm:h-[460px] lg:h-full bg-gradient-to-b from-[#18181b]/50 to-[#09090b]/90 dark:from-[#111113] dark:to-[#09090b] border-b lg:border-b-0 lg:border-r border-line overflow-hidden flex flex-col items-center justify-center select-none">
            {/* Subtle stage ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,151,58,0.15),transparent_65%)]"
            />

            {/* Stage Mode Switcher Pill */}
            <div className="absolute top-3.5 z-20 flex items-center justify-center pointer-events-auto">
              <div className="inline-flex p-0.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-lg text-[10.5px] font-mono">
                <button
                  type="button"
                  onClick={() => setCardMode("reflective")}
                  className={`px-3 py-1 rounded-full transition-all duration-150 flex items-center gap-1.5 ${
                    cardMode === "reflective"
                      ? "bg-gold text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>REFLECTIVE CARD</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCardMode("physics")}
                  className={`px-3 py-1 rounded-full transition-all duration-150 flex items-center gap-1.5 ${
                    cardMode === "physics"
                      ? "bg-gold text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Move className="h-3 w-3" />
                  <span>3D LANYARD</span>
                </button>
              </div>
            </div>

            {/* Stage Body */}
            {mounted && open ? (
              cardMode === "reflective" ? (
                /* React Bits ReflectiveCard with Lanyard Attachment */
                <div className="flex flex-col items-center justify-center w-full h-full pt-10 pb-6 relative z-10">
                  {/* Physical Lanyard Hanger (Woven Strap + Lobster Clasp Ring) */}
                  <div className="flex flex-col items-center -mb-2 z-20 pointer-events-none select-none">
                    {/* Woven Nylon Strap */}
                    <div className="w-8 h-10 bg-gradient-to-b from-black via-zinc-900 to-zinc-800 border-x border-white/10 shadow-lg relative flex items-center justify-center rounded-t-sm">
                      <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,#fff,#fff_1.5px,transparent_1.5px,transparent_4px)]" />
                      <span className="text-[7.5px] font-mono tracking-widest text-gold rotate-90 uppercase select-none opacity-80 font-bold">
                        DANISH
                      </span>
                    </div>
                    {/* Metallic Clasp & Ring */}
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-2 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 rounded-sm shadow-sm border-t border-white/40" />
                      <div className="w-6 h-5 rounded-full border-2 border-zinc-300 dark:border-zinc-400 bg-transparent -mt-1 shadow-sm flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full border border-zinc-400 dark:border-zinc-500 bg-black/40" />
                      </div>
                    </div>
                  </div>

                  {/* React Bits ReflectiveCard component */}
                  <div className="transform scale-[0.84] sm:scale-90 lg:scale-[0.92] transition-transform duration-200">
                    <ReflectiveCard
                      name={PROFILE.name}
                      role="Junior Fullstack Developer"
                      badge="Verified Pass"
                      status="Available"
                      statusColor="#22c55e"
                      idLabel="SECURITY ID"
                      idValue="DANISH-DEV-2026"
                      webcam={false}
                      tint={dark ? "#ffffff" : "#f4f4f5"}
                      metalness={1}
                      roughness={0.3}
                      blurStrength={6}
                      shine={1}
                      glare={0.5}
                      width={280}
                      height={415}
                      radius={24}
                      theme={dark ? "dark" : "light"}
                    />
                  </div>
                </div>
              ) : (
                /* 3D Physics Lanyard Canvas (Fully Fixed Vector Textures) */
                <div className="w-full h-full relative cursor-grab active:cursor-grabbing pt-10">
                  <Lanyard
                    frontImage={BADGE_FRONT_SVG}
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
              )
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
                {cardMode === "reflective" ? (
                  <>
                    <Sparkles className="h-3 w-3 text-gold" />
                    <span>Move pointer to catch specular light & 3D tilt</span>
                  </>
                ) : (
                  <>
                    <Move className="h-3 w-3 text-gold" />
                    <span>Drag to swing • Fling to flip</span>
                  </>
                )}
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
