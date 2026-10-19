import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Github,
  Terminal,
  MapPin,
  Clock,
  Briefcase,
  FileText,
  Send,
  Layers,
} from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

const EMAIL_ADDRESS = "danishsary4@gmail.com";
const GITHUB_URL = "https://github.com/danishsary8";

export type InquiryTrack = "fullstack" | "backend" | "frontend" | "collab";

interface TrackConfig {
  id: InquiryTrack;
  tabLabel: string;
  badge: string;
  heading: string;
  summary: string;
  stackMatch: string[];
  mailSubject: string;
  mailBody: string;
}

const INQUIRY_TRACKS: TrackConfig[] = [
  {
    id: "fullstack",
    tabLabel: "TRACK 01: FULL-STACK ROLE",
    badge: "FULL-STACK INTERNSHIP / JUNIOR ENGINEER",
    heading: "End-to-End Product Engineering & System Delivery",
    summary:
      "Engineered for roles requiring complete stack ownership: from normalized PostgreSQL relational modeling and secured Laravel 11 REST APIs to responsive, high-performance React & TypeScript frontends.",
    stackMatch: ["Laravel 11", "React", "TypeScript", "PostgreSQL", "JWT RBAC", "Tailwind CSS"],
    mailSubject: "Engineering Inquiry: Full-Stack Role / Sary Danish",
    mailBody: `Hi Sary,

We reviewed your portfolio and engineering projects (including Bookly and the Norton AI Award Winner Expert System) and would like to discuss a Full-Stack Software Developer opportunity with our team.

Let's coordinate a brief technical introductory call.

Best regards,`,
  },
  {
    id: "backend",
    tabLabel: "TRACK 02: BACKEND & API",
    badge: "BACKEND LARAVEL & POSTGRESQL FOCUS",
    heading: "Relational Architecture, Security Policies & REST APIs",
    summary:
      "Tailored for backend-heavy environments: database normalization, stateless JWT Bearer authentication, Eloquent query optimization (preventing N+1 bottlenecks), and clean MVC/service architecture.",
    stackMatch: ["PHP & Laravel", "Python & Flask", "PostgreSQL", "Supabase", "RESTful Contracts"],
    mailSubject: "Engineering Inquiry: Backend & API Architecture / Sary Danish",
    mailBody: `Hi Sary,

We are impressed by your database topology and REST API architecture in Laravel and PostgreSQL. We have a backend engineering role and would love to connect.

Best regards,`,
  },
  {
    id: "frontend",
    tabLabel: "TRACK 03: FRONTEND & UI",
    badge: "FRONTEND REACT & TYPESCRIPT FOCUS",
    heading: "Accessible Ergonomics, Micro-Typography & Motion Systems",
    summary:
      "Engineered for high-craft UI/UX teams: strict adherence to anti-AI design laws, zero-layout-shift bilingual typography, Emil Kowalski spring animations, and full WCAG AA/AAA keyboard accessibility.",
    stackMatch: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI Primitives"],
    mailSubject: "Engineering Inquiry: Frontend & UI Engineering / Sary Danish",
    mailBody: `Hi Sary,

Your editorial portfolio design, accessibility craftsmanship, and React component architecture caught our attention. We'd like to talk to you about a frontend engineering role.

Best regards,`,
  },
  {
    id: "collab",
    tabLabel: "TRACK 04: COLLABORATION",
    badge: "TECHNICAL COLLABORATION & RESEARCH",
    heading: "Rapid Prototyping, Team Git Workflows & Innovation",
    summary:
      "Ideal for software project collaborations and joint initiatives: hands-on experience as Trainee @ ETEC & KruITSolution, Norton University 4th-year coursework, and award-winning expert systems.",
    stackMatch: ["Git / GitHub Flow", "Figma-to-Code", "Bilingual EN/Khmer", "Clinical AI Systems"],
    mailSubject: "Collaboration Inquiry / Sary Danish",
    mailBody: `Hi Sary,

I came across your projects and would like to explore collaborating on a software project or technical initiative with you.

Best regards,`,
  },
];

export function ContactFooter() {
  const [activeTrackId, setActiveTrackId] = useState<InquiryTrack>("fullstack");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);
  const [phnomPenhTime, setPhnomPenhTime] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Phnom_Penh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => setPhnomPenhTime(formatter.format(new Date()));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeTrack = INQUIRY_TRACKS.find((t) => t.id === activeTrackId) ?? INQUIRY_TRACKS[0]!;

  const candidateDossierText = `================================================================================
CANDIDATE TECHNICAL BRIEFING & CREDENTIAL DOSSIER // SARY DANISH
================================================================================
CANDIDATE: Sary Danish (Danish)
ROLE: Junior Full-Stack Developer / 4th-Year Software Dev Student @ Norton University
LOCATION: Phnom Penh, Cambodia [ICT UTC+7]
EMAIL: ${EMAIL_ADDRESS}
GITHUB: ${GITHUB_URL}
CURRICULUM VITAE: /sary-danish-cv.pdf
--------------------------------------------------------------------------------
SELECTED FOCUS TRACK: ${activeTrack.badge}
CORE CAPABILITIES: ${activeTrack.summary}
STACK HIGHLIGHTS: ${activeTrack.stackMatch.join(" • ")}
--------------------------------------------------------------------------------
VERIFIED PRODUCTION DEPLOYMENTS:
1. Bookly (E-Commerce Platform):
   - Frontend: https://bookly-frontend-five.vercel.app/
   - API Docs: https://bookly-api-zasc.onrender.com/docs
2. Diabetes Expert System (Winner AI Competition Norton 2026):
   - Live Deploy: https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/
3. Loomora (Habit & Routine Planner):
   - Live Deploy: https://daycraft-vnid.onrender.com/
4. Cambodian Driving Rules App:
   - Live Deploy: https://drivingruletest.netlify.app/
--------------------------------------------------------------------------------
EDUCATION & TRAINING:
- Norton University: B.S. in Software Development (2023 - Present, Expected 2027)
- ETEC & KruITSolution: Frontend & Backend Developer Trainee (July 2026 - Present)
- American Culture and English (ACE): English Language Program (Completed)
- ETEC Frontend & Backend Courses (Completed)
================================================================================`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  const handleCopyDossier = async () => {
    try {
      await navigator.clipboard.writeText(candidateDossierText);
      setCopiedDossier(true);
      setTimeout(() => setCopiedDossier(false), 2200);
    } catch {
      // Fallback
    }
  };

  const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    activeTrack.mailSubject,
  )}&body=${encodeURIComponent(activeTrack.mailBody)}`;

  return (
    <footer
      id="contact"
      data-blueprint-section="CONTACT_FOOTER // DISPATCH_WORKBENCH"
      className="relative w-full bg-base transition-colors duration-150 border-t border-borderSubtle"
    >
      {/* 1. Header Broadsheet Banner */}
      <div className="border-b border-borderSubtle p-6 sm:p-10 lg:p-12 xl:p-14 bg-surface/30">
        <div className="font-mono text-[11px] text-mutedText uppercase tracking-wider flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
          <span>DIRECT DISPATCH &amp; RECRUITER DOSSIER // PHNOM PENH</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primaryText uppercase tracking-editorial leading-tight mb-4">
          Let's Build Scalable Software Together.
        </h2>
        <p className="font-body text-mutedText text-base max-w-3xl leading-relaxed">
          I am actively seeking Junior Full-Stack Developer opportunities, software engineering
          internships, and collaborative software projects in Phnom Penh and remote. Select your
          inquiry focus below to inspect a tailored candidate briefing or initiate direct dispatch.
        </p>
      </div>

      {/* 2. Exposed 12-Column Structural Colophon (7 cols dispatch workbench / 5 cols channels) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-borderSubtle">
        {/* Left Column: Structured Recruiter Technical Briefing & Workbench (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 xl:p-14 space-y-6">
          <div className="flex items-center justify-between border-b border-borderSubtle pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-mutedText flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-gold" />
              <span>CANDIDATE DISPATCH WORKBENCH</span>
            </span>
            <span className="font-mono text-[11px] text-gold font-semibold">[INTERACTIVE]</span>
          </div>

          {/* Track Selector Tab Bar */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText mb-2.5 block">
              SELECT HIRING DOMAIN / TRACK:
            </span>

            <div
              role="radiogroup"
              aria-label="Inquiry Tracks"
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {INQUIRY_TRACKS.map((track) => {
                const isActive = track.id === activeTrack.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setActiveTrackId(track.id)}
                    className={`min-h-[44px] px-3.5 py-2.5 text-left rounded-brand border font-mono text-xs transition-colors cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? "border-gold bg-surface text-primaryText font-semibold ring-1 ring-gold"
                        : "border-borderSubtle bg-card text-mutedText hover:border-gold/50 hover:text-primaryText"
                    }`}
                  >
                    <span className="text-[10px] text-gold">{track.tabLabel}</span>
                    <span className="text-xs truncate">{track.badge.split(" ")[0]} Focus</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Track Summary Banner */}
          <div className="p-4 rounded-brand border border-borderSubtle bg-surface/60">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-gold uppercase">
                {activeTrack.badge}
              </span>
              <div className="flex flex-wrap gap-1">
                {activeTrack.stackMatch.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[2px] border border-borderSubtle bg-card px-2 py-0.5 font-mono text-[10px] text-primaryText"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="font-body text-xs text-mutedText leading-relaxed">
              {activeTrack.summary}
            </p>
          </div>

          {/* Live Plain-Text Briefing Preview Console */}
          <div>
            <div className="flex items-center justify-between font-mono text-xs text-mutedText mb-2">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-gold" />
                <span>CANDIDATE_BRIEFING.txt</span>
              </span>
              <span className="text-[10px] tabular-nums">VERIFIED CREDENTIALS // 32 LINES</span>
            </div>

            <pre className="rounded-brand border border-borderSubtle bg-card p-4 font-mono text-[11px] leading-relaxed text-primaryText overflow-x-auto max-h-[220px] selection:bg-gold selection:text-base">
              {candidateDossierText}
            </pre>
          </div>

          {/* Multi-Action Dispatch Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-borderSubtle">
            {/* Copy Dossier Action */}
            <button
              type="button"
              onClick={handleCopyDossier}
              aria-label="Copy Candidate Technical Dossier to clipboard"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-brand bg-primaryText px-4 py-2.5 font-mono text-xs font-semibold text-base transition-colors duration-150 hover:bg-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
            >
              {copiedDossier ? (
                <>
                  <Check className="h-4 w-4 text-base" />
                  <span className="font-bold">[DOSSIER COPIED // 32 LINES]</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>COPY TECHNICAL BRIEFING</span>
                </>
              )}
            </button>

            {/* Copy Email Action */}
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy Sary Danish email address"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-brand border border-borderSubtle bg-surface px-4 py-2.5 font-mono text-xs font-medium text-primaryText transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-4 w-4 text-gold" />
                  <span>COPIED danishsary4@gmail.com</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 text-gold" />
                  <span>COPY EMAIL ADDRESS</span>
                </>
              )}
            </button>

            {/* Launch Direct Email Action */}
            <a
              href={mailtoUrl}
              aria-label="Launch email client with pre-populated dispatch"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-brand border border-gold/40 bg-gold/10 px-4 py-2.5 font-mono text-xs font-semibold text-gold transition-colors duration-150 hover:bg-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-none"
            >
              <Send className="h-4 w-4" />
              <span>LAUNCH EMAIL DISPATCH ↗</span>
            </a>
          </div>

          <div aria-live="polite" className="sr-only">
            {copiedDossier && "Candidate technical dossier copied to clipboard."}
            {copiedEmail && "Email address copied to clipboard."}
          </div>
        </div>

        {/* Right Column: Direct Channels & Telemetry (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 xl:p-14 space-y-6 bg-card/20">
          <div className="flex items-center justify-between border-b border-borderSubtle pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-mutedText">
              DIRECT VERIFIED CHANNELS
            </span>
            <span className="font-mono text-[11px] text-mutedText">[24/7]</span>
          </div>

          {/* GitHub Channel */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between rounded-brand border border-borderSubtle bg-card p-5 transition-colors hover:border-gold"
          >
            <div className="flex items-center justify-between mb-2">
              <Github className="h-4 w-4 text-primaryText" />
              <ArrowUpRight className="h-4 w-4 text-mutedText group-hover:text-gold transition-colors" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-mutedText uppercase block">
                Source Repositories &amp; Commits
              </span>
              <span className="font-display font-bold text-sm text-primaryText">
                GitHub Developer Profile (@danishsary8)
              </span>
            </div>
          </a>

          {/* Location & Status Channel */}
          <div className="flex flex-col justify-between rounded-brand border border-borderSubtle bg-card p-5">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="h-4 w-4 text-gold" />
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-mutedText uppercase block">
                Current Location &amp; Timezone
              </span>
              <span className="font-display font-bold text-sm text-primaryText">
                Phnom Penh, Cambodia [ICT UTC+7]
              </span>
            </div>
          </div>

          {/* Micro Telemetry Ledger */}
          <div className="border border-borderSubtle bg-surface p-4 rounded-brand font-mono text-[11px] space-y-2 text-mutedText">
            <div className="flex justify-between border-b border-borderSubtle pb-2">
              <span>LOCATION TELEMETRY</span>
              <span className="text-primaryText font-medium">PHNOM PENH, KH</span>
            </div>
            <div className="flex justify-between border-b border-borderSubtle pb-2">
              <span>ACTIVE CLOCK</span>
              <span className="tabular-nums text-primaryText font-medium">
                {phnomPenhTime || "12:00:00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>AVAILABILITY</span>
              <span className="text-gold font-bold">READY FOR HIRE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal Colophon Bar */}
      <div className="border-t border-borderSubtle p-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-mutedText bg-base">
        <div>
          <span>© {new Date().getFullYear()} SARY DANISH. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-primaryText">
            <Clock className="h-3.5 w-3.5 text-gold" />
            <span>PHNOM PENH [ICT UTC+7]:</span>
            <span className="tabular-nums font-medium">{phnomPenhTime || "12:00:00"}</span>
          </span>

          <span className="hidden md:inline text-borderSubtle">|</span>

          <span className="text-[11px] text-mutedText">
            SWISS BROADSHEET // REACT + VITE + TAILWIND
          </span>
        </div>
      </div>
    </footer>
  );
}
