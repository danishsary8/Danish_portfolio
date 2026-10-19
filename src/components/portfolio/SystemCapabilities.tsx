import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Server, Layout, Database, Cpu, Check, Zap, Cloud } from "lucide-react";
import { Reveal, RevealItem } from "./Reveal";
import { CodeCraftCompare } from "./CodeCraftCompare";
import { EASE_OUT } from "@/lib/motion";

interface Pillar {
  id: string;
  specCode: string;
  title: string;
  icon: React.ElementType;
  summary: string;
  technologies: string[];
}

export interface SystemCapabilitiesProps {
  onOpenTopology?: () => void;
  onOpenQueryPlan?: () => void;
  onOpenInfra?: () => void;
}

const PILLARS: Pillar[] = [
  {
    id: "backend",
    specCode: "SPEC:SERVER",
    title: "Backend & REST APIs",
    icon: Server,
    summary:
      "Engineering robust API endpoints, JWT role-based access control, and scalable server-side business logic.",
    technologies: ["Laravel", "PHP", "Python", "Flask", "Java", "RESTful APIs", "JWT Auth"],
  },
  {
    id: "frontend",
    specCode: "SPEC:CLIENT",
    title: "Frontend & Interfaces",
    icon: Layout,
    summary:
      "Crafting high-density, accessible component architectures with strict optical typography and zero layout shift.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML5 / CSS3",
      "Bootstrap",
      "Vite",
      "TanStack Router",
    ],
  },
  {
    id: "data",
    specCode: "SPEC:STORE",
    title: "Data Persistence",
    icon: Database,
    summary:
      "Designing normalized relational database schemas, indexes, and transactional query integrity.",
    technologies: [
      "PostgreSQL",
      "Supabase",
      "SQLite",
      "Oracle Database",
      "Relational Modeling",
      "SQL",
    ],
  },
  {
    id: "toolchain",
    specCode: "SPEC:TOOLCHAIN",
    title: "Workflow & Tooling",
    icon: Cpu,
    summary:
      "Operating modern autonomous development environments, git workflows, and rapid UI prototyping pipelines.",
    technologies: [
      "Git",
      "GitHub",
      "Antigravity IDE",
      "Claude Code CLI",
      "Gemini Code Assist",
      "Figma",
      "Napkin AI",
    ],
  },
];

export function SystemCapabilities({
  onOpenTopology,
  onOpenQueryPlan,
  onOpenInfra,
}: SystemCapabilitiesProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="capabilities"
      data-blueprint-section="SYSTEM_CAPABILITIES // 4-PILLAR_MATRIX"
      className="relative w-full bg-surface transition-colors duration-150 border-t border-borderSubtle"
    >
      {/* 12-Column Exposed Structural Grid (4 cols sticky spine / 8 cols exposed quadrants) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-borderSubtle">
        {/* Left Sticky Architectural Spine (lg:col-span-4) */}
        <div className="lg:col-span-4 p-6 sm:p-10 lg:p-12 space-y-6 lg:sticky lg:top-14 self-start">
          <div className="font-mono text-[11px] text-mutedText uppercase tracking-wider flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
            <span>CORE ARCHITECTURAL FOUNDATION</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primaryText uppercase tracking-editorial leading-tight">
            Engineered for Scale, Maintainability, and Precision.
          </h2>

          <p className="font-body text-mutedText text-sm sm:text-base leading-relaxed">
            From secure Laravel REST backends and relational PostgreSQL schemas to responsive React
            and TypeScript frontends, my technical foundation is built on writing clean,
            maintainable code that solves real-world operational problems.
          </p>

          {/* Action Bar inside Sticky Spine */}
          <div className="pt-6 border-t border-borderSubtle space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block">
              SYSTEM LEVEL VERIFICATION
            </span>

            <button
              type="button"
              onClick={() => {
                if (onOpenTopology) {
                  onOpenTopology();
                } else {
                  window.dispatchEvent(new CustomEvent("portfolio:open-topology-modal"));
                }
              }}
              className="w-full inline-flex items-center justify-between rounded-brand border border-borderSubtle bg-card px-4 py-3 font-mono text-xs font-semibold text-primaryText transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
            >
              <span className="flex items-center gap-2 text-left">
                <Database className="h-3.5 w-3.5 text-gold shrink-0" aria-hidden="true" />
                <span>INSPECT RELATIONAL ERD &amp; REQUEST TOPOLOGY</span>
              </span>
              <kbd className="rounded-[2px] border border-borderSubtle bg-base px-1.5 py-0.5 text-[10px] text-mutedText shrink-0">
                G+S
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenQueryPlan) {
                  onOpenQueryPlan();
                } else {
                  window.dispatchEvent(
                    new CustomEvent("portfolio:open-query-plan-modal", {
                      detail: { benchmarkId: "bookly" },
                    }),
                  );
                }
              }}
              className="w-full inline-flex items-center justify-between rounded-brand border border-borderSubtle bg-card px-4 py-3 font-mono text-xs font-semibold text-primaryText transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
            >
              <span className="flex items-center gap-2 text-left">
                <Zap className="h-3.5 w-3.5 text-gold shrink-0" aria-hidden="true" />
                <span>BENCHMARK SQL EXPLAIN &amp; N+1 PLANS</span>
              </span>
              <kbd className="rounded-[2px] border border-borderSubtle bg-base px-1.5 py-0.5 text-[10px] text-mutedText shrink-0">
                G+Q
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenInfra) {
                  onOpenInfra();
                } else {
                  window.dispatchEvent(
                    new CustomEvent("portfolio:open-deployment-modal", {
                      detail: { profileId: "bookly" },
                    }),
                  );
                }
              }}
              className="w-full inline-flex items-center justify-between rounded-brand border border-borderSubtle bg-card px-4 py-3 font-mono text-xs font-semibold text-primaryText transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
            >
              <span className="flex items-center gap-2 text-left">
                <Cloud className="h-3.5 w-3.5 text-gold shrink-0" aria-hidden="true" />
                <span>CI/CD PIPELINES &amp; CLOUD TOPOLOGY</span>
              </span>
              <kbd className="rounded-[2px] border border-borderSubtle bg-base px-1.5 py-0.5 text-[10px] text-mutedText shrink-0">
                G+I
              </kbd>
            </button>
          </div>
        </div>

        {/* Right Exposed 2x2 Architectural Quadrants (lg:col-span-8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-borderSubtle bg-base">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.36,
                  ease: EASE_OUT,
                  delay: shouldReduceMotion ? 0 : i * 0.06,
                }}
                className={`group relative flex flex-col justify-between p-6 sm:p-8 transition-colors duration-150 hover:bg-surface/50 ${
                  i >= 2 ? "border-t border-borderSubtle" : ""
                }`}
              >
                <div>
                  {/* Quadrant Top: Spec Index & Icon */}
                  <div className="flex items-center justify-between border-b border-borderSubtle pb-4 mb-4 font-mono text-xs text-mutedText">
                    <span className="text-gold font-semibold">{pillar.specCode}</span>
                    <div className="grid h-8 w-8 place-items-center rounded-brand border border-borderSubtle bg-surface text-primaryText transition-colors group-hover:border-gold group-hover:text-gold">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Technical Summary */}
                  <h3 className="font-display text-xl font-bold tracking-tight text-primaryText mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm leading-relaxed text-mutedText mb-6">
                    {pillar.summary}
                  </p>
                </div>

                {/* Technical Stack Chip Grid */}
                <div className="pt-4 border-t border-borderSubtle">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText mb-2.5 block">
                    Core Technologies:
                  </span>
                  <div
                    className="flex flex-wrap gap-1.5"
                    aria-label={`${pillar.title} technologies`}
                  >
                    {pillar.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 rounded-[2px] border border-borderSubtle bg-card px-2 py-0.5 font-mono text-[11px] font-medium text-primaryText transition-colors hover:border-gold/40"
                      >
                        <Check className="h-2.5 w-2.5 text-gold/80" aria-hidden="true" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Production Engineering Craft & Security Hardening Matrix */}
      <CodeCraftCompare />
    </section>
  );
}
