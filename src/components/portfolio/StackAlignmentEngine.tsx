import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Server,
  Database,
  Layers,
  FileCode,
  Zap,
  Globe,
  Terminal,
} from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

export interface RequirementCriterion {
  id: string;
  name: string;
  shortDesc: string;
  category: "backend" | "frontend" | "database" | "devops" | "specialty";
  matchedEvidence: {
    project: string;
    proof: string;
    actionLabel: string;
    actionType: "live" | "api" | "topology" | "query" | "infra" | "adr";
    actionTarget: string;
  }[];
}

export const ROLE_REQUIREMENTS: RequirementCriterion[] = [
  {
    id: "rest-backend",
    name: "REST API & Backend Architecture",
    shortDesc: "Laravel 11, PHP, Python Flask, clean service layers, and RESTful route design",
    category: "backend",
    matchedEvidence: [
      {
        project: "Bookly",
        proof:
          "Modular Laravel 11 REST API with JWT token validation, Swagger/OpenAPI documentation, and Eloquent repositories.",
        actionLabel: "INSPECT BOOKLY API",
        actionType: "api",
        actionTarget: "bookly",
      },
      {
        project: "Diabetes Expert System",
        proof:
          "Deterministic clinical inference REST endpoints with input validation and medical threshold evaluations.",
        actionLabel: "INSPECT INFERENCE RULES",
        actionType: "live",
        actionTarget:
          "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
      },
    ],
  },
  {
    id: "relational-db",
    name: "Relational DB & SQL Optimization",
    shortDesc: "PostgreSQL, Supabase, 3NF schema normalization, and EXPLAIN ANALYZE tuning",
    category: "database",
    matchedEvidence: [
      {
        project: "Bookly",
        proof:
          "Managed PostgreSQL 16 schema with composite B-Tree indexes, elimination of N+1 queries, and transactional orders.",
        actionLabel: "VIEW EXPLAIN ANALYZE",
        actionType: "query",
        actionTarget: "bookly",
      },
      {
        project: "Database ERD",
        proof:
          "Multi-table relational schema with foreign key cascades, unique constraints, and ACID transactions.",
        actionLabel: "INSPECT RELATIONAL ERD",
        actionType: "topology",
        actionTarget: "bookly",
      },
    ],
  },
  {
    id: "react-typescript",
    name: "Modern React & TypeScript UI",
    shortDesc:
      "Strict typing, zero layout shift, optical alignment, and accessible component trees",
    category: "frontend",
    matchedEvidence: [
      {
        project: "Bookly Frontend",
        proof:
          "React & TypeScript SPA deployed to Vercel Edge with optimistic cart updates and strict component separation.",
        actionLabel: "OPEN LIVE BOOKLY",
        actionType: "live",
        actionTarget: "https://bookly-frontend-five.vercel.app/",
      },
      {
        project: "Swiss Broadsheet Portfolio",
        proof:
          "Custom design system built with Radix primitives, Tailwind CSS, Emil Kowalski motion physics, and 100% test pass rate.",
        actionLabel: "READ ADR-001 BLUEPRINT",
        actionType: "adr",
        actionTarget: "adr-001",
      },
    ],
  },
  {
    id: "auth-rbac",
    name: "Authentication & Role-Based Access",
    shortDesc: "Stateless JWT, token issuance, secure cookies, and RBAC authorization middleware",
    category: "backend",
    matchedEvidence: [
      {
        project: "Diabetes Expert System",
        proof:
          "Bilingual clinical access control with patient/practitioner RBAC guards and protected diagnostic routes.",
        actionLabel: "VIEW CLINICAL SYSTEM",
        actionType: "live",
        actionTarget:
          "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
      },
      {
        project: "Bookly",
        proof:
          "JWT Bearer authentication on /api/v1/checkout and profile endpoints with automated token refresh.",
        actionLabel: "INSPECT JWT SCHEMA",
        actionType: "topology",
        actionTarget: "bookly",
      },
    ],
  },
  {
    id: "cloud-cicd",
    name: "Cloud Deployment & CI/CD Pipelines",
    shortDesc:
      "Automated test gates, Docker packaging, multi-cloud hosting (Vercel, Render, Netlify)",
    category: "devops",
    matchedEvidence: [
      {
        project: "All 4 Production Apps",
        proof:
          "Zero-downtime rolling deploys across Vercel Global Edge, Render PaaS containers, and Netlify CDN with health probes.",
        actionLabel: "INSPECT CI/CD TOPOLOGY",
        actionType: "infra",
        actionTarget: "bookly",
      },
    ],
  },
  {
    id: "bilingual-i18n",
    name: "Bilingual Khmer/EN Localization",
    shortDesc: "Norton AI Award winner, Khmer Unicode font loading without FOIT/layout jank",
    category: "specialty",
    matchedEvidence: [
      {
        project: "Norton Award 2026",
        proof:
          "Won Norton University AI Expert System Competition 2026 with a dual-language English/Khmer clinical diagnostic engine.",
        actionLabel: "VIEW AWARD PROTOTYPE",
        actionType: "live",
        actionTarget:
          "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
      },
    ],
  },
  {
    id: "mobile-flutter",
    name: "Cross-Platform Mobile / Flutter",
    shortDesc: "Flutter 3.x, Dart, CanvasKit WebAssembly compilation, offline theory quiz storage",
    category: "specialty",
    matchedEvidence: [
      {
        project: "Driving Rules App",
        proof:
          "Cambodian road theory learning platform built with Flutter and deployed to Netlify with PWA support.",
        actionLabel: "TEST DRIVING APP",
        actionType: "live",
        actionTarget: "https://drivingruletest.netlify.app/",
      },
    ],
  },
];

export interface StackAlignmentEngineProps {
  onOpenTopology?: (blueprint?: string) => void;
  onOpenQueryPlan?: (benchmarkId?: string) => void;
  onOpenInfra?: (profileId?: string) => void;
  onOpenAdr?: (adrId?: string) => void;
}

export function StackAlignmentEngine({
  onOpenTopology,
  onOpenQueryPlan,
  onOpenInfra,
  onOpenAdr,
}: StackAlignmentEngineProps) {
  const shouldReduceMotion = useReducedMotion();

  // Selected requirements state (defaults to first 5 selected)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "rest-backend",
    "relational-db",
    "react-typescript",
    "auth-rbac",
    "cloud-cicd",
  ]);

  const toggleRequirement = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(ROLE_REQUIREMENTS.map((r) => r.id));
  };

  const handleReset = () => {
    setSelectedIds(["rest-backend", "relational-db", "react-typescript"]);
  };

  // Match score calculation
  const totalAvailable = ROLE_REQUIREMENTS.length;
  const matchCount = selectedIds.length;
  const matchPercentage = Math.round((matchCount / totalAvailable) * 100);

  const activeRequirements = ROLE_REQUIREMENTS.filter((r) => selectedIds.includes(r.id));

  const handleAction = (
    type: "live" | "api" | "topology" | "query" | "infra" | "adr",
    target: string,
  ) => {
    if (type === "live") {
      window.open(target, "_blank", "noopener,noreferrer");
    } else if (type === "topology") {
      if (onOpenTopology) onOpenTopology(target);
      else window.dispatchEvent(new CustomEvent("portfolio:open-topology-modal"));
    } else if (type === "query") {
      if (onOpenQueryPlan) onOpenQueryPlan(target);
      else
        window.dispatchEvent(
          new CustomEvent("portfolio:open-query-plan-modal", {
            detail: { benchmarkId: target },
          }),
        );
    } else if (type === "infra") {
      if (onOpenInfra) onOpenInfra(target);
      else
        window.dispatchEvent(
          new CustomEvent("portfolio:open-deployment-modal", {
            detail: { profileId: target },
          }),
        );
    } else if (type === "adr") {
      if (onOpenAdr) onOpenAdr(target);
      else
        window.dispatchEvent(
          new CustomEvent("portfolio:open-adr-modal", {
            detail: { adrId: target },
          }),
        );
    } else if (type === "api") {
      // Dispatch project inspector
      window.dispatchEvent(
        new CustomEvent("portfolio:open-deployment-modal", {
          detail: { profileId: target },
        }),
      );
    }
  };

  return (
    <section
      id="role-alignment-engine"
      data-blueprint-section="RECRUITER_STACK_ALIGNMENT // INTERACTIVE_MATCHER"
      className="relative w-full bg-surface transition-colors duration-150 border-t border-borderSubtle py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-borderSubtle pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] text-mutedText uppercase tracking-wider">
              <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
              <span>RECRUITER &amp; CTO BENCHMARKING ENGINE</span>
              <span className="border border-borderSubtle px-1.5 py-0.2 bg-card text-gold">
                [G R]
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primaryText uppercase tracking-editorial">
              Role-Requirement &amp; Stack Alignment Matcher
            </h2>
            <p className="font-body text-xs sm:text-sm text-mutedText max-w-2xl leading-relaxed">
              Evaluating Sary Danish for a Junior Full-Stack or Frontend Developer opening? Toggle
              your team&apos;s stack requirements below to see exact production evidence, verifiable
              code architecture, and live deployment artifacts.
            </p>
          </div>

          {/* Dynamic Match Score Readout */}
          <div className="border border-borderSubtle bg-card p-4 rounded-brand min-w-[220px]">
            <span className="font-mono text-[10px] text-mutedText uppercase tracking-wider block">
              REQUIREMENT COVERAGE
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-3xl font-extrabold text-gold tabular-nums">
                {matchPercentage}%
              </span>
              <span className="font-mono text-xs text-mutedText tabular-nums">
                ({matchCount} of {totalAvailable} matched)
              </span>
            </div>
            <div className="w-full bg-surface h-1.5 mt-2 rounded-[1px] overflow-hidden border border-borderSubtle">
              <div
                className="bg-gold h-full transition-all duration-300"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Filter Control Matrix */}
        <div className="mt-8 border border-borderSubtle bg-card p-5 sm:p-6 rounded-brand">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borderSubtle pb-4">
            <span className="font-mono text-xs font-semibold text-primaryText uppercase flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span>TOGGLE YOUR ROLE REQUIREMENTS</span>
            </span>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={handleSelectAll}
                className="rounded-brand border border-borderSubtle bg-surface px-2.5 py-1 text-primaryText hover:border-gold hover:text-gold transition-colors cursor-pointer"
              >
                SELECT ALL
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-brand border border-borderSubtle bg-surface px-2.5 py-1 text-mutedText hover:text-primaryText transition-colors cursor-pointer"
              >
                RESET
              </button>
            </div>
          </div>

          {/* Requirement Toggle Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {ROLE_REQUIREMENTS.map((req) => {
              const isSelected = selectedIds.includes(req.id);
              return (
                <button
                  key={req.id}
                  type="button"
                  onClick={() => toggleRequirement(req.id)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-2 rounded-brand border px-3.5 py-2 font-mono text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "border-gold bg-surface text-primaryText font-semibold"
                      : "border-borderSubtle bg-base text-mutedText hover:border-gold/40 hover:text-primaryText"
                  }`}
                >
                  <div
                    className={`grid h-3.5 w-3.5 place-items-center rounded-[2px] border ${
                      isSelected
                        ? "border-gold bg-gold text-base"
                        : "border-borderSubtle bg-surface"
                    }`}
                  >
                    {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" aria-hidden="true" />}
                  </div>
                  <span>{req.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Matched Evidence Display Grid */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-mutedText border-b border-borderSubtle pb-2">
            <span>VERIFIED PORTFOLIO EVIDENCE ({activeRequirements.length} MATCHES)</span>
            <span>LIVE IN PRODUCTION</span>
          </div>

          {activeRequirements.length === 0 ? (
            <div className="border border-borderSubtle bg-card p-8 rounded-brand text-center font-mono text-xs text-mutedText">
              <span>
                No requirements selected. Click any skill chips above or click [SELECT ALL].
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeRequirements.map((req, idx) => (
                <motion.div
                  key={req.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    ease: EASE_OUT,
                    delay: shouldReduceMotion ? 0 : idx * 0.04,
                  }}
                  className="border border-borderSubtle bg-card p-5 rounded-brand flex flex-col justify-between space-y-4 transition-colors hover:border-gold/40"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-mutedText border-b border-borderSubtle pb-2">
                      <span className="text-gold uppercase font-semibold">
                        CATEGORY: {req.category.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-primaryText">
                        <CheckCircle2 className="h-3 w-3 text-gold" aria-hidden="true" />
                        <span>MATCHED</span>
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-primaryText">
                      {req.name}
                    </h3>
                    <p className="font-body text-xs text-mutedText leading-relaxed">
                      {req.shortDesc}
                    </p>

                    <div className="pt-2 space-y-2">
                      {req.matchedEvidence.map((ev, evIdx) => (
                        <div
                          key={evIdx}
                          className="border border-borderSubtle bg-surface p-3 rounded-brand space-y-2"
                        >
                          <div className="flex items-center justify-between font-mono text-[11px]">
                            <span className="font-semibold text-primaryText">{ev.project}</span>
                            <span className="text-mutedText text-[10px] uppercase">
                              {ev.actionType.toUpperCase()}
                            </span>
                          </div>
                          <p className="font-body text-xs text-mutedText leading-normal">
                            {ev.proof}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleAction(ev.actionType, ev.actionTarget)}
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-gold hover:text-goldHover transition-colors cursor-pointer"
                          >
                            <span>{ev.actionLabel}</span>
                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Direct Recruiter Dispatch Callout */}
        <div className="mt-8 border border-borderSubtle bg-card p-6 rounded-brand flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-gold uppercase tracking-wider block font-semibold">
              NEXT STEP FOR HIRING MANAGERS
            </span>
            <h4 className="font-display font-bold text-lg text-primaryText uppercase">
              Schedule an Interview or Technical Deep-Dive
            </h4>
            <p className="font-body text-xs text-mutedText max-w-xl">
              Sary Danish is actively interviewing for Junior Full-Stack Developer positions in
              Phnom Penh, Cambodia (or remote). Let&apos;s discuss how this architectural foundation
              translates to your team.
            </p>
          </div>

          <a
            href="mailto:danishsary4@gmail.com?subject=Interview%20Inquiry%20%E2%80%94%20Junior%20Full-Stack%20Developer&body=Hi%20Danish%2C%0A%0AWe%20reviewed%20your%20portfolio%20and%20architecture%20blueprints.%20We%20would%20like%20to%20schedule%20an%20interview."
            className="inline-flex items-center gap-2 rounded-brand border border-gold bg-gold px-5 py-3 font-mono text-xs font-semibold text-base transition-colors hover:bg-goldHover cursor-pointer shadow-none"
          >
            <span>SEND INTERVIEW INQUIRY</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
