import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Terminal,
  Database,
  Layers,
  ExternalLink,
  X,
  Code2,
  Play,
  FileCode,
  Link2,
  Check,
  Cloud,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArchitectureSimulator } from "@/components/portfolio/ArchitectureSimulator";
import { ASSETS } from "@/lib/assets";
import { EASE_OUT } from "@/lib/motion";

export interface ProjectData {
  id: string;
  domainTag: string;
  title: string;
  subtitle: string;
  summary: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  apiDocsUrl?: string;
  previewImage?: string;
  schemaSpec: {
    title: string;
    description: string;
    code: string;
  };
  apiSpec: {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    auth: string;
    requestPayload?: string;
    responsePayload: string;
  };
  architectureHighlights: string[];
}

const PROJECTS: ProjectData[] = [
  {
    id: "bookly",
    domainTag: "E-COMMERCE // FULL-STACK ARCHITECTURE",
    title: "Bookly Platform",
    subtitle: "Full-Stack Bookstore & REST API Architecture",
    summary:
      "Online bookstore platform with complete e-commerce lifecycle: tokenized JWT authentication backend in Laravel, normalized PostgreSQL relational catalog, and responsive React/TypeScript frontend.",
    tech: ["Laravel", "React", "TypeScript", "PostgreSQL", "JWT Auth", "REST API", "Tailwind CSS"],
    liveUrl: "https://bookly-frontend-five.vercel.app/",
    githubUrl: "https://github.com/danishsary8",
    apiDocsUrl: "https://bookly-api-zasc.onrender.com/docs",
    previewImage: ASSETS.projects.bookly.src,
    schemaSpec: {
      title: "PostgreSQL Normalized Catalog & Order Model",
      description:
        "Relational entity mapping with foreign key cascades and transactional consistency.",
      code: `-- Users & Authentication Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catalog Books Table
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(32) UNIQUE NOT NULL,
  price_cents INTEGER NOT NULL,
  stock_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders & Relational Items (1:N & N:M)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_cents INTEGER NOT NULL,
  status VARCHAR(32) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_cents INTEGER NOT NULL,
  PRIMARY KEY (order_id, book_id)
);`,
    },
    apiSpec: {
      endpoint: "/api/v1/books?category=software&sort=price_asc",
      method: "GET",
      auth: "Bearer <jwt_token> (Required for checkout/orders)",
      requestPayload: `// Query Parameters
{
  "category": "software",
  "limit": 20,
  "page": 1,
  "sort": "price_asc"
}`,
      responsePayload: `{
  "status": "success",
  "data": {
    "items": [
      {
        "id": "8f32c5f7-2090-43af-b3ac-514cb82112af",
        "title": "Clean Architecture: Software Structure",
        "price_cents": 3499,
        "in_stock": true
      }
    ],
    "pagination": {
      "total": 142,
      "page": 1,
      "pages": 8
    }
  }
}`,
    },
    architectureHighlights: [
      "Decoupled Laravel REST API with standard JSON envelope responses.",
      "Stateless JWT token issuance with auto-invalidation on logout.",
      "Optimistic UI cart mutations in React paired with database row locking on checkout.",
    ],
  },
  {
    id: "diabetes",
    domainTag: "CLINICAL // EXPERT SYSTEM & RBAC",
    title: "Diabetes Expert System",
    subtitle: "Clinical Assistance Prototype & Rule-Based Inference Engine",
    summary:
      "Full-stack clinical assistance prototype featuring bilingual EN/Khmer interface, JWT Role-Based Access Control (RBAC), and deterministic rule-based expert system for diabetes risk assessment. Winner of the AI Expert System Competition 2026 at Norton University.",
    tech: [
      "Full-Stack",
      "Rule-Based AI",
      "JWT RBAC",
      "Bilingual EN/Khmer",
      "React",
      "Laravel",
      "PostgreSQL",
    ],
    liveUrl: "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
    githubUrl: "https://github.com/danishsary8",
    schemaSpec: {
      title: "Clinical Patient Telemetry & Evaluation Record",
      description: "Relational record of patient biomarkers and diagnostic inference logs.",
      code: `-- Clinical Biomarkers & Patient Intake
CREATE TABLE patient_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_code VARCHAR(64) UNIQUE NOT NULL,
  fasting_glucose_mg_dl NUMERIC(5, 2) NOT NULL,
  hba1c_pct NUMERIC(4, 2) NOT NULL,
  bmi NUMERIC(4, 1) NOT NULL,
  systolic_bp INTEGER NOT NULL,
  risk_level VARCHAR(32) NOT NULL,
  inference_rule_id VARCHAR(64) NOT NULL,
  clinician_id UUID NOT NULL,
  evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RBAC Role Definitions
CREATE TABLE auth_roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(32) UNIQUE NOT NULL -- 'patient', 'clinician', 'admin'
);`,
    },
    apiSpec: {
      endpoint: "/api/v1/expert/evaluate-risk",
      method: "POST",
      auth: "Bearer <jwt_token> (Clinician or Admin Role Required)",
      requestPayload: `{
  "patient_code": "KH-PP-2026-089",
  "fasting_glucose": 134.5,
  "hba1c": 6.8,
  "bmi": 28.4,
  "systolic_bp": 138
}`,
      responsePayload: `{
  "evaluation_id": "c71a39d8-1120-4e2a-b605-df56e91a27b1",
  "risk_assessment": {
    "level": "HIGH",
    "indicator": "Type 2 Diabetes High Probability",
    "rule_triggered": "RULE_GLUC_HBA1C_THRESH_EXCEEDED",
    "recommendations": [
      "Immediate oral glucose tolerance confirmation test",
      "Endocrinology clinical consultation required"
    ]
  }
}`,
    },
    architectureHighlights: [
      "Deterministic expert rule engine with zero hallucination risk for medical decision support.",
      "Strict Role-Based Access Control: Patients view only their own records; Clinicians evaluate; Admins audit.",
      "First Place Winner — AI Expert System Competition 2026, Norton University.",
    ],
  },
  {
    id: "loomora",
    domainTag: "PRODUCTIVITY // HABIT SCHEDULER",
    title: "Loomora Habit Planner",
    subtitle: "Personal Routine & Habit Scheduling Web Application",
    summary:
      "Personal routine and habit planner web application deployed full-stack with dynamic scheduling features, daily streak calculation, and responsive client-side state synchronization.",
    tech: [
      "Full-Stack",
      "React",
      "Tailwind CSS",
      "State Management",
      "Scheduling Logic",
      "REST API",
    ],
    liveUrl: "https://daycraft-vnid.onrender.com/",
    githubUrl: "https://github.com/danishsary8",
    previewImage: ASSETS.projects.loomora.src,
    schemaSpec: {
      title: "Habit Recurring Schedule & Streak Tracking Schema",
      description: "Data structure supporting daily recurring cadences and completion history.",
      code: `-- Habit Entities & Cadence
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(128) NOT NULL,
  frequency VARCHAR(32) DEFAULT 'daily', -- 'daily', 'weekdays', 'custom'
  target_reps INTEGER DEFAULT 1,
  color_code VARCHAR(16) DEFAULT '#C9973A',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Execution Ledger
CREATE TABLE habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  logged_date DATE NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  streak_count INTEGER DEFAULT 1,
  UNIQUE(habit_id, logged_date)
);`,
    },
    apiSpec: {
      endpoint: "/api/v1/habits/:id/toggle-completion",
      method: "POST",
      auth: "Session Cookie / Bearer Token",
      requestPayload: `{
  "date": "2026-10-18",
  "completed": true
}`,
      responsePayload: `{
  "status": "success",
  "data": {
    "habit_id": "d04a62e1-45f8-410e-a60d-fb918a287c2b",
    "current_streak": 14,
    "longest_streak": 28,
    "completed_today": true
  }
}`,
    },
    architectureHighlights: [
      "Optimistic UI state updates ensure immediate feedback without network latency lag.",
      "Automated streak evaluation calculating time zone differences anchored to local client time.",
      "Lightweight responsive interface designed for frictionless mobile and desktop daily habit logging.",
    ],
  },
  {
    id: "driving",
    domainTag: "REGULATORY // FLUTTER WEB APP",
    title: "Driving Rules App",
    subtitle: "Cambodian Road Regulations & Theory Learning Application",
    summary:
      "Interactive theory and regulatory learning application built with Flutter & Dart, engineered to help Cambodian citizens practice and master road rules, signs, and license test question banks.",
    tech: ["Flutter", "Dart", "Responsive Web", "Stateful UI", "Question Bank Engine"],
    liveUrl: "https://drivingruletest.netlify.app/",
    githubUrl: "https://github.com/danishsary8",
    previewImage: ASSETS.projects.driving.src,
    schemaSpec: {
      title: "Regulatory Theory Categories & Question Tree Schema",
      description: "Hierarchical question taxonomy and multiple-choice evaluation model.",
      code: `-- Question Bank Structure
CREATE TABLE theory_categories (
  id SERIAL PRIMARY KEY,
  title_kh VARCHAR(128) NOT NULL,
  title_en VARCHAR(128) NOT NULL,
  icon_identifier VARCHAR(64)
);

CREATE TABLE theory_questions (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES theory_categories(id),
  question_text_kh TEXT NOT NULL,
  question_text_en TEXT NOT NULL,
  correct_option_index SMALLINT NOT NULL,
  options JSONB NOT NULL, -- Array of localized choices
  explanation TEXT
);`,
    },
    apiSpec: {
      endpoint: "/api/v1/quiz/evaluate-submission",
      method: "POST",
      auth: "Public / Local State Client Token",
      requestPayload: `{
  "category_id": 4,
  "answers": [
    { "question_id": 101, "selected_option": 2 },
    { "question_id": 102, "selected_option": 0 }
  ]
}`,
      responsePayload: `{
  "score": 38,
  "total": 40,
  "passed": true,
  "passing_threshold": 35,
  "review_needed": [
    { "question_id": 102, "correct_option": 1, "rule_reference": "CAM_TRAFFIC_ART_24" }
  ]
}`,
    },
    architectureHighlights: [
      "Cross-platform compilation with Flutter ensuring identical behavior on web and mobile screens.",
      "High-density offline question evaluation without mandatory round-trip network dependencies.",
      "Targeted specifically for local Cambodian drivers preparing for official Ministry of Public Works theory tests.",
    ],
  },
];

export interface FeaturedProjectsProps {
  onOpenTopology?: (blueprint?: string) => void;
  onOpenAdr?: (adrId?: string) => void;
  onOpenInfra?: (profileId?: string) => void;
}

export function FeaturedProjects({
  onOpenTopology,
  onOpenAdr,
  onOpenInfra,
}: FeaturedProjectsProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [activeInspectorProject, setActiveInspectorProject] = useState<ProjectData | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  return (
    <section
      id="projects"
      data-blueprint-section="FEATURED_PROJECTS // 12-COL_BROADSHEET"
      className="relative w-full bg-base transition-colors duration-150 border-t border-borderSubtle"
    >
      {/* 1. Header Broadsheet Banner with Filter Strip */}
      <div className="border-b border-borderSubtle p-6 sm:p-10 lg:p-12 xl:p-14 bg-surface/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="font-mono text-[11px] text-mutedText uppercase tracking-wider flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
              <span>VERIFIED PRODUCTION REPOSITORIES // 4 WORKS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primaryText uppercase tracking-editorial leading-tight">
              Production Full-Stack Applications &amp; Clinical Prototypes.
            </h2>
            <p className="font-body text-mutedText text-base max-w-3xl leading-relaxed">
              Every project represents working production code deployed on public
              infrastructure—from secure Laravel REST APIs and PostgreSQL database modeling to
              clinical decision logic and responsive frontends.
            </p>
          </div>

          {/* Tabular Architectural Filter Strip (All works remain in DOM for Vitest compliance) */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] shrink-0 border border-borderSubtle bg-card p-1 rounded-brand">
            <span className="px-3 py-1.5 bg-primaryText text-base font-semibold rounded-[2px]">
              ALL WORKS (4)
            </span>
            <span className="px-2.5 py-1.5 text-mutedText hidden sm:inline">[FULL-STACK]</span>
            <span className="px-2.5 py-1.5 text-mutedText hidden sm:inline">[CLINICAL AI]</span>
            <span className="px-2.5 py-1.5 text-mutedText hidden sm:inline">
              [MOBILE &amp; WEB]
            </span>
          </div>
        </div>
      </div>

      {/* 2. Full-Bleed 12-Column Cellular Project Rows with Hairline Separators */}
      <div className="divide-y divide-borderSubtle">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.38, ease: EASE_OUT }}
              className="group p-6 sm:p-10 lg:p-12 xl:p-14 hover:bg-surface/20 transition-colors duration-150 relative"
            >
              {/* Corner crosshairs */}
              <div
                className="crosshair-corner absolute top-3 right-3 hidden sm:block opacity-40"
                aria-hidden="true"
              />

              <div
                className={`grid grid-cols-1 items-center gap-8 lg:gap-14 lg:grid-cols-12 ${
                  isEven ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                {/* Content Column (7 cols on Even, 5 cols on Odd) */}
                <div className={isEven ? "lg:col-span-7 space-y-6" : "lg:col-span-6 space-y-6"}>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderSubtle pb-4">
                    <span className="font-mono text-xs text-mutedText tracking-wider">
                      {project.domainTag}
                    </span>
                    {project.id === "diabetes" && (
                      <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-gold uppercase tracking-wider">
                        Winner AI Competition 2026
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primaryText mb-1.5">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-gold font-medium mb-4">
                      {project.subtitle}
                    </p>
                    <p className="font-body text-sm md:text-base leading-relaxed text-mutedText">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2" aria-label="Project technologies">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-[2px] border border-borderSubtle bg-card px-2.5 py-1 font-mono text-[11px] text-primaryText transition-colors hover:border-gold/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Controls Matrix */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-borderSubtle">
                    {/* Live Demo Trigger */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-brand bg-primaryText px-4 py-2.5 font-mono text-xs font-semibold text-base transition-colors duration-150 hover:bg-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-none"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>

                    {/* GitHub Repository Trigger */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-brand border border-borderSubtle bg-surface px-4 py-2.5 font-mono text-xs font-medium text-primaryText transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-none"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>Source</span>
                    </a>

                    {/* Optional API Documentation Trigger */}
                    {project.apiDocsUrl && (
                      <a
                        href={project.apiDocsUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View API documentation for ${project.title}`}
                        className="inline-flex items-center gap-2 rounded-brand border border-borderSubtle bg-surface px-4 py-2.5 font-mono text-xs font-medium text-primaryText transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-none"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        <span>API Docs</span>
                      </a>
                    )}

                    {/* Architecture & Schema Inspector Drawer Trigger */}
                    <button
                      type="button"
                      onClick={() => setActiveInspectorProject(project)}
                      aria-label={`Inspect technical architecture and schema for ${project.title}`}
                      className="inline-flex items-center gap-2 rounded-brand border border-borderSubtle bg-card px-4 py-2.5 font-mono text-xs font-medium text-primaryText transition-colors duration-150 hover:border-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
                    >
                      <Terminal className="h-4 w-4 text-gold" aria-hidden="true" />
                      <span>Inspect Architecture</span>
                    </button>

                    {/* Architecture Decision Record (ADR) Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        const adrMap: Record<string, string> = {
                          bookly: "adr-001",
                          diabetes: "adr-002",
                          loomora: "adr-003",
                          driving: "adr-004",
                        };
                        const adrId = adrMap[project.id] || "adr-001";
                        if (onOpenAdr) {
                          onOpenAdr(adrId);
                        } else {
                          window.dispatchEvent(
                            new CustomEvent("portfolio:open-adr-modal", { detail: { adrId } }),
                          );
                        }
                      }}
                      aria-label={`Read Architecture Decision Record (ADR) for ${project.title}`}
                      className="inline-flex items-center gap-2 rounded-brand border border-borderSubtle bg-surface px-4 py-2.5 font-mono text-xs font-medium text-primaryText transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
                    >
                      <FileCode className="h-4 w-4 text-gold" aria-hidden="true" />
                      <span>READ ADR &amp; BLUEPRINT</span>
                    </button>

                    {/* CI/CD & Cloud Topology Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenInfra) {
                          onOpenInfra(project.id);
                        } else {
                          window.dispatchEvent(
                            new CustomEvent("portfolio:open-deployment-modal", {
                              detail: { profileId: project.id },
                            }),
                          );
                        }
                      }}
                      aria-label={`Inspect CI/CD deployment pipeline and cloud topology for ${project.title}`}
                      className="inline-flex items-center gap-2 rounded-brand border border-borderSubtle bg-surface px-4 py-2.5 font-mono text-xs font-medium text-primaryText transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer shadow-none"
                    >
                      <Cloud className="h-4 w-4 text-gold" aria-hidden="true" />
                      <span>CI/CD &amp; CLOUD</span>
                    </button>
                  </div>
                </div>

                {/* Visual Viewfinder Frame (5 cols on Even, 6 cols on Odd) */}
                <div className={isEven ? "lg:col-span-5" : "lg:col-span-6"}>
                  <div className="relative overflow-hidden rounded-[3px] border border-borderSubtle bg-surface aspect-[16/10] flex items-center justify-center">
                    {project.previewImage ? (
                      <img
                        src={project.previewImage}
                        alt={`${project.title} Interface Preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top grayscale contrast-105 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100"
                      />
                    ) : (
                      /* Bespoke Clinical Rule Schematic Frame for Diabetes Expert System */
                      <div className="w-full h-full p-6 flex flex-col justify-between font-mono bg-card/80 text-left">
                        <div className="flex items-center justify-between border-b border-borderSubtle pb-2 text-[10px] text-mutedText">
                          <span className="text-gold font-bold">
                            SCHEMATIC // CLINICAL INFERENCE
                          </span>
                          <span>NORTON 2026</span>
                        </div>
                        <div className="space-y-2 py-3 text-[11px]">
                          <div className="flex items-center justify-between bg-surface px-2.5 py-1 border border-borderSubtle">
                            <span className="text-mutedText">
                              RULE_01: FASTING_GLUCOSE &gt; 126
                            </span>
                            <span className="text-gold font-semibold">[HIGH RISK]</span>
                          </div>
                          <div className="flex items-center justify-between bg-surface px-2.5 py-1 border border-borderSubtle">
                            <span className="text-mutedText">
                              RULE_02: HBA1C &gt; 6.5% + BMI &gt; 25
                            </span>
                            <span className="text-gold font-semibold">[DIABETIC]</span>
                          </div>
                          <div className="flex items-center justify-between bg-surface px-2.5 py-1 border border-borderSubtle">
                            <span className="text-mutedText">INFERENCE: FORWARD CHAINING</span>
                            <span className="text-primaryText font-semibold">[DETERMINISTIC]</span>
                          </div>
                        </div>
                        <div className="border-t border-borderSubtle pt-2 flex items-center justify-between text-[10px] text-mutedText">
                          <span>BILINGUAL: EN / KHMER</span>
                          <span className="text-gold">AWARD WINNER</span>
                        </div>
                      </div>
                    )}

                    {/* Subtle Technical Frame Overlay */}
                    <div className="pointer-events-none absolute inset-0 border border-borderSubtle/60" />
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Signature Interactive Architecture & API Schema Inspector Sheet Drawer */}
      <Sheet
        open={!!activeInspectorProject}
        onOpenChange={(open) => {
          if (!open) setActiveInspectorProject(null);
        }}
      >
        <SheetContent
          side="right"
          className="flex h-full w-full sm:max-w-xl md:max-w-2xl flex-col justify-between border-l border-borderSubtle bg-base p-6 sm:p-8 shadow-2xl overflow-y-auto"
        >
          {activeInspectorProject && (
            <div>
              <SheetHeader className="text-left border-b border-borderSubtle pb-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-gold uppercase tracking-wider block">
                    SYSTEM ARCHITECTURE INSPECTOR
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window === "undefined") return;
                      const url = new URL(window.location.href);
                      ["project", "tab", "adr", "topology", "query"].forEach((k) =>
                        url.searchParams.delete(k),
                      );
                      url.searchParams.set("project", activeInspectorProject.id);
                      navigator.clipboard.writeText(url.toString()).then(() => {
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      });
                    }}
                    aria-label="Copy shareable deep link to this project inspector"
                    className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-surface px-2.5 py-1 font-mono text-[11px] text-primaryText hover:border-gold hover:text-gold transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3 w-3 text-gold" />
                        <span className="text-gold font-bold">
                          [LINK COPIED // ?project={activeInspectorProject.id}]
                        </span>
                      </>
                    ) : (
                      <>
                        <Link2 className="h-3 w-3 text-gold" />
                        <span>[COPY DEEP LINK]</span>
                      </>
                    )}
                  </button>
                </div>
                <SheetTitle className="font-display text-2xl font-bold text-primaryText">
                  {activeInspectorProject.title}
                </SheetTitle>
                <SheetDescription className="font-mono text-xs text-mutedText mt-1">
                  Technical specification, relational database schemas, and REST API contracts.
                </SheetDescription>
              </SheetHeader>

              {/* Inspector Multi-View Tabs */}
              <Tabs defaultValue="api" className="w-full">
                <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                  <TabsTrigger value="api" className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>REST API</span>
                  </TabsTrigger>
                  <TabsTrigger value="database" className="flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5" />
                    <span>PostgreSQL Schema</span>
                  </TabsTrigger>
                  <TabsTrigger value="overview" className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Architecture Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="simulator" className="flex items-center gap-1.5">
                    <Play className="h-3.5 w-3.5 text-gold" />
                    <span>Live Payload Simulator</span>
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: REST API Endpoints & Contracts */}
                <TabsContent value="api" className="space-y-4">
                  <div className="rounded-brand border border-borderSubtle bg-surface p-4">
                    <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block mb-1">
                      Endpoint & Authorization:
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold">
                      <span className="rounded-[2px] bg-gold px-2 py-0.5 text-primaryText font-bold text-[10px]">
                        {activeInspectorProject.apiSpec.method}
                      </span>
                      <span className="text-primaryText">
                        {activeInspectorProject.apiSpec.endpoint}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-mutedText mt-2">
                      <strong className="text-primaryText">Auth Rule:</strong>{" "}
                      {activeInspectorProject.apiSpec.auth}
                    </p>
                  </div>

                  {activeInspectorProject.apiSpec.requestPayload && (
                    <div>
                      <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block mb-1.5">
                        Sample Request:
                      </span>
                      <pre className="overflow-x-auto rounded-brand border border-borderSubtle bg-card p-4 font-mono text-[11px] text-primaryText leading-relaxed">
                        <code>{activeInspectorProject.apiSpec.requestPayload}</code>
                      </pre>
                    </div>
                  )}

                  <div>
                    <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block mb-1.5">
                      Sample Response Envelope:
                    </span>
                    <pre className="overflow-x-auto rounded-brand border border-borderSubtle bg-card p-4 font-mono text-[11px] text-primaryText leading-relaxed">
                      <code>{activeInspectorProject.apiSpec.responsePayload}</code>
                    </pre>
                  </div>
                </TabsContent>

                {/* Tab 2: Database Schema & Relational Models */}
                <TabsContent value="database" className="space-y-4">
                  <div className="rounded-brand border border-borderSubtle bg-surface p-4">
                    <h4 className="font-display font-bold text-sm text-primaryText">
                      {activeInspectorProject.schemaSpec.title}
                    </h4>
                    <p className="font-body text-xs text-mutedText mt-1">
                      {activeInspectorProject.schemaSpec.description}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block mb-1.5">
                      DDL SQL Definition:
                    </span>
                    <pre className="overflow-x-auto rounded-brand border border-borderSubtle bg-card p-4 font-mono text-[11px] text-primaryText leading-relaxed max-h-[380px]">
                      <code>{activeInspectorProject.schemaSpec.code}</code>
                    </pre>
                  </div>
                </TabsContent>

                {/* Tab 3: Architecture Overview */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-3 rounded-brand border border-borderSubtle bg-surface p-4">
                    <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block">
                      Core Architecture Highlights:
                    </span>
                    <ul className="space-y-2">
                      {activeInspectorProject.architectureHighlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs font-body text-primaryText"
                        >
                          <span className="text-gold font-mono font-bold mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block mb-2">
                      Integrated Stacks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeInspectorProject.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-[2px] border border-borderSubtle bg-card px-2.5 py-1 font-mono text-xs text-primaryText"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 4: Interactive Live Payload & Inference Simulator */}
                <TabsContent value="simulator" className="space-y-4">
                  <ArchitectureSimulator
                    projectId={activeInspectorProject.id}
                    projectTitle={activeInspectorProject.title}
                    apiDocsUrl={activeInspectorProject.apiDocsUrl}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Drawer Bottom Controls */}
          {activeInspectorProject && (
            <div className="pt-6 border-t border-borderSubtle flex items-center justify-between gap-3 mt-6">
              <div className="flex items-center gap-3">
                <a
                  href={activeInspectorProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-brand bg-primaryText px-4 py-2 font-mono text-xs font-medium text-base transition-colors hover:bg-gold hover:text-primaryText"
                >
                  <span>Launch App</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {activeInspectorProject.apiDocsUrl && (
                  <a
                    href={activeInspectorProject.apiDocsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-brand border border-borderSubtle bg-surface px-4 py-2 font-mono text-xs font-medium text-primaryText transition-colors hover:border-gold hover:text-gold"
                  >
                    <span>API Docs</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const bp = activeInspectorProject.id.includes("diabetes")
                      ? "diabetes"
                      : activeInspectorProject.id === "bookly"
                        ? "bookly"
                        : "sync";
                    if (onOpenTopology) {
                      onOpenTopology(bp);
                    } else {
                      window.dispatchEvent(
                        new CustomEvent("portfolio:open-topology-modal", {
                          detail: { blueprint: bp },
                        }),
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-surface px-3.5 py-2 font-mono text-xs font-medium text-primaryText transition-colors hover:border-gold hover:text-gold cursor-pointer"
                >
                  <Database className="h-3.5 w-3.5 text-gold" />
                  <span>VIEW FULL ERD TOPOLOGY</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const adrMap: Record<string, string> = {
                      bookly: "adr-001",
                      diabetes: "adr-002",
                      loomora: "adr-003",
                      driving: "adr-004",
                    };
                    const adrId = adrMap[activeInspectorProject.id] || "adr-001";
                    if (onOpenAdr) {
                      onOpenAdr(adrId);
                    } else {
                      window.dispatchEvent(
                        new CustomEvent("portfolio:open-adr-modal", { detail: { adrId } }),
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-surface px-3.5 py-2 font-mono text-xs font-medium text-primaryText transition-colors hover:border-gold hover:text-gold cursor-pointer"
                >
                  <FileCode className="h-3.5 w-3.5 text-gold" />
                  <span>READ ADR</span>
                </button>
              </div>

              <SheetClose asChild>
                <button
                  type="button"
                  className="rounded-brand border border-borderSubtle bg-surface px-4 py-2 font-mono text-xs font-medium text-primaryText transition-colors hover:border-gold"
                >
                  Close Inspector
                </button>
              </SheetClose>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
