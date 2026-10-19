import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Award, GraduationCap, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
}

interface AwardItem {
  title: string;
  organization: string;
  period: string;
  summary: string;
  type: "award" | "education";
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Frontend & Backend Developer Trainee",
    organization: "ETEC & KruITSolution",
    location: "Phnom Penh, Cambodia",
    period: "July 2026 – Present",
    summary:
      "Weekend internship training in web development covering frontend and backend technologies, with hands-on practice on real production projects.",
    highlights: [
      "RESTful API design and database integrations",
      "Component-driven frontend architecture with React & TypeScript",
      "Team-based Git workflow and sprint collaboration",
    ],
  },
  {
    role: "B.S. in Software Development (4th Year)",
    organization: "Norton University",
    location: "Phnom Penh, Cambodia",
    period: "2023 – Present (Expected 2027)",
    summary:
      "Rigorous software engineering curriculum focused on full-stack architecture, relational database management, data structures, and algorithmic problem solving.",
    highlights: [
      "Core Stacks: Java, Python, PHP, JavaScript, PostgreSQL, Oracle",
      "Full-stack web application development and REST architectures",
      "Award-winning clinical decision support prototype development",
    ],
  },
];

const CREDENTIALS: AwardItem[] = [
  {
    title: "Winner — AI Expert System Competition 2026",
    organization: "Norton University",
    period: "2026",
    summary:
      "First Place award for developing the bilingual EN/Khmer Diabetes Expert System, featuring deterministic rule-based inference and JWT RBAC.",
    type: "award",
  },
  {
    title: "English Language Program",
    organization: "ACE (Australian Centre for Education)",
    period: "Completed",
    summary:
      "Advanced professional English communication, technical presentation, and collaborative dialogue.",
    type: "education",
  },
  {
    title: "Frontend & Backend Development Courses",
    organization: "ETEC Training Center",
    period: "Completed",
    summary:
      "Intensive practical coursework covering modern responsive web engineering, PHP, React, and server-side logic.",
    type: "education",
  },
];

export function ExperienceLedger() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      data-blueprint-section="EXPERIENCE_LEDGER // ACADEMIC_AND_TRAINING"
      className="relative w-full bg-surface transition-colors duration-150 border-t border-borderSubtle"
    >
      {/* 1. Header Broadsheet Banner */}
      <div className="border-b border-borderSubtle p-6 sm:p-10 lg:p-12 xl:p-14 bg-base">
        <div className="font-mono text-[11px] text-mutedText uppercase tracking-wider flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
          <span>TRAJECTORY &amp; INSTITUTIONAL CREDENTIALS</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primaryText uppercase tracking-editorial leading-tight mb-4">
          Academic Foundation &amp; Industry Experience.
        </h2>
        <p className="font-body text-mutedText text-base max-w-3xl leading-relaxed">
          Combining rigorous academic software engineering at Norton University with active hands-on
          industry training at ETEC &amp; KruITSolution in Phnom Penh.
        </p>
      </div>

      {/* 2. Exposed Asymmetric Structural Columns (7 cols left / 5 cols right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-borderSubtle">
        {/* Column 1: Industry Training & University (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 xl:p-14 space-y-8">
          <div className="flex items-center justify-between border-b border-borderSubtle pb-3">
            <h3 className="font-display text-xl font-bold tracking-tight text-primaryText flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gold" aria-hidden="true" />
              <span>Industry Training &amp; University Degree</span>
            </h3>
            <span className="font-mono text-[11px] text-mutedText uppercase">
              [TRACK: EXPERIENCE]
            </span>
          </div>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.36, ease: EASE_OUT, delay: index * 0.08 }}
                className="rounded-brand border border-borderSubtle bg-card p-6 sm:p-8 shadow-none transition-colors duration-150 hover:border-gold/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderSubtle pb-4 mb-4 font-mono text-xs text-mutedText">
                  <span className="flex items-center gap-1.5 text-primaryText font-medium">
                    <Calendar className="h-3.5 w-3.5 text-gold" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </span>
                </div>

                <h4 className="font-display text-2xl font-bold text-primaryText mb-1">
                  {exp.role}
                </h4>
                <p className="font-mono text-xs text-gold font-medium mb-4">{exp.organization}</p>
                <p className="font-body text-sm leading-relaxed text-mutedText mb-5">
                  {exp.summary}
                </p>

                <ul className="space-y-2 pt-4 border-t border-borderSubtle">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs font-body text-primaryText"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Column 2: Honors, Awards & Language Credentials (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 xl:p-14 space-y-8 bg-card/30">
          <div className="flex items-center justify-between border-b border-borderSubtle pb-3">
            <h3 className="font-display text-xl font-bold tracking-tight text-primaryText flex items-center gap-2">
              <Award className="h-5 w-5 text-gold" aria-hidden="true" />
              <span>Honors &amp; Professional Programs</span>
            </h3>
            <span className="font-mono text-[11px] text-mutedText uppercase">[VERIFIED]</span>
          </div>

          <div className="space-y-4">
            {CREDENTIALS.map((cred, index) => (
              <motion.div
                key={cred.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.36, ease: EASE_OUT, delay: index * 0.08 }}
                className="rounded-brand border border-borderSubtle bg-base p-6 shadow-none transition-colors duration-150 hover:border-gold/50"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-mutedText border-b border-borderSubtle pb-3 mb-3">
                  <span className="rounded-[2px] bg-surface px-2 py-0.5 font-medium text-primaryText">
                    {cred.period}
                  </span>
                  <span className="uppercase text-[10px] tracking-wider text-gold font-semibold">
                    {cred.type === "award" ? "COMPETITION WINNER" : "COMPLETED"}
                  </span>
                </div>

                <h4 className="font-display text-base font-bold text-primaryText mb-1">
                  {cred.title}
                </h4>
                <p className="font-mono text-xs text-mutedText mb-3">{cred.organization}</p>
                <p className="font-body text-xs leading-relaxed text-mutedText">{cred.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
