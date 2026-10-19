import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Play,
  Check,
  ExternalLink,
  RefreshCw,
  Cpu,
  Database,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { EASE_OUT, DURATION } from "@/lib/motion";

export interface ArchitectureSimulatorProps {
  projectId: string;
  projectTitle: string;
  apiDocsUrl?: string | undefined;
}

type BooklyMode = "catalog" | "jwt";
type DiabetesProfile = "profileA" | "profileB" | "profileC";

export function ArchitectureSimulator({
  projectId,
  projectTitle,
  apiDocsUrl,
}: ArchitectureSimulatorProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);
  const [liveLatency, setLiveLatency] = useState(42);

  // Project 1: Bookly State
  const [booklyMode, setBooklyMode] = useState<BooklyMode>("catalog");

  // Project 2: Diabetes Expert System State
  const [diabetesProfile, setDiabetesProfile] = useState<DiabetesProfile>("profileC");

  const runSimulation = () => {
    setIsExecuting(true);
    // Deterministic random latency within tight realistic backend envelope
    const simulatedLatency = Math.floor(Math.random() * 12) + 36; // 36ms - 48ms
    setTimeout(() => {
      setLiveLatency(simulatedLatency);
      setIsExecuting(false);
      setHasExecuted(true);
    }, 220);
  };

  return (
    <div className="space-y-4">
      {/* Telemetry Console Header */}
      <div className="rounded-brand border border-borderSubtle bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderSubtle pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            <span className="font-mono text-xs font-bold uppercase text-primaryText">
              Live Architecture & Inference Workbench
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-mutedText tabular-nums">
            <span>
              STATUS:{" "}
              <strong className="text-primaryText font-semibold">
                {isExecuting ? "EXECUTING_QUERY..." : "200 OK"}
              </strong>
            </span>
            <span>//</span>
            <span>
              LATENCY:{" "}
              <strong className="text-gold font-semibold">
                {isExecuting ? "--" : `${liveLatency}ms`}
              </strong>
            </span>
            <span>//</span>
            <span className="hidden sm:inline">REGION: SIN-1 (UTC+7)</span>
          </div>
        </div>

        {/* Project-Specific Interactive Control Panes */}
        {projectId === "bookly" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider">
                Select Request Preset:
              </span>
              {apiDocsUrl && (
                <a
                  href={apiDocsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-gold hover:underline"
                >
                  <span>Interactive Swagger Docs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setBooklyMode("catalog");
                  runSimulation();
                }}
                className={`flex flex-col items-start p-2.5 rounded-brand border text-left transition-colors cursor-pointer ${
                  booklyMode === "catalog"
                    ? "border-gold bg-card text-primaryText"
                    : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                  <span className="rounded-[2px] bg-gold px-1.5 py-0.2 text-[10px] text-primaryText">
                    GET
                  </span>
                  <span>/api/v1/books</span>
                </div>
                <span className="font-mono text-[10px] text-mutedText mt-1">
                  Indexed catalog scan & relational pagination
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setBooklyMode("jwt");
                  runSimulation();
                }}
                className={`flex flex-col items-start p-2.5 rounded-brand border text-left transition-colors cursor-pointer ${
                  booklyMode === "jwt"
                    ? "border-gold bg-card text-primaryText"
                    : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                  <span className="rounded-[2px] bg-primaryText px-1.5 py-0.2 text-[10px] text-base">
                    POST
                  </span>
                  <span>/api/v1/auth/jwt/verify</span>
                </div>
                <span className="font-mono text-[10px] text-mutedText mt-1">
                  Bearer Token RBAC claim validation
                </span>
              </button>
            </div>
          </div>
        )}

        {projectId === "diabetes" && (
          <div className="space-y-3">
            <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block">
              Forward-Chaining Clinical Inference Profiles:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setDiabetesProfile("profileA");
                  runSimulation();
                }}
                className={`flex flex-col p-2.5 rounded-brand border text-left transition-colors cursor-pointer ${
                  diabetesProfile === "profileA"
                    ? "border-gold bg-card text-primaryText"
                    : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                }`}
              >
                <span className="font-mono text-xs font-bold text-primaryText">
                  Profile A: Baseline
                </span>
                <span className="font-mono text-[10px] text-mutedText mt-0.5">
                  FPG: 92 mg/dL | HbA1c: 5.3%
                </span>
                <span className="font-mono text-[9px] text-gold mt-1">
                  Status: Normal Homeostasis
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDiabetesProfile("profileB");
                  runSimulation();
                }}
                className={`flex flex-col p-2.5 rounded-brand border text-left transition-colors cursor-pointer ${
                  diabetesProfile === "profileB"
                    ? "border-gold bg-card text-primaryText"
                    : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                }`}
              >
                <span className="font-mono text-xs font-bold text-primaryText">
                  Profile B: Elevated
                </span>
                <span className="font-mono text-[10px] text-mutedText mt-0.5">
                  FPG: 114 mg/dL | HbA1c: 6.1%
                </span>
                <span className="font-mono text-[9px] text-gold mt-1">Status: Pre-Diabetic</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDiabetesProfile("profileC");
                  runSimulation();
                }}
                className={`flex flex-col p-2.5 rounded-brand border text-left transition-colors cursor-pointer ${
                  diabetesProfile === "profileC"
                    ? "border-gold bg-card text-primaryText"
                    : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                }`}
              >
                <span className="font-mono text-xs font-bold text-primaryText">
                  Profile C: Critical
                </span>
                <span className="font-mono text-[10px] text-mutedText mt-0.5">
                  FPG: 148 mg/dL | HbA1c: 7.2%
                </span>
                <span className="font-mono text-[9px] text-gold mt-1">
                  Status: Type-2 Clinical Risk
                </span>
              </button>
            </div>
          </div>
        )}

        {projectId === "loomora" && (
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block">
              Optimistic UI State Synchronizer:
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-brand border border-borderSubtle bg-base">
              <div className="font-mono text-xs text-primaryText">
                <span className="font-bold text-gold">POST</span> /api/v1/routines/sync-completion
              </div>
              <div className="font-mono text-[11px] text-mutedText">
                Target: Routine #RT-MORNING-DEEP-WORK (Day 25)
              </div>
            </div>
          </div>
        )}

        {projectId === "driving" && (
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-mutedText uppercase tracking-wider block">
              Cambodian Traffic Law Theory Evaluator:
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-brand border border-borderSubtle bg-base">
              <div className="font-mono text-xs text-primaryText">
                <span className="font-bold text-gold">EVAL</span>{" "}
                /engine/quiz-assessment/right-of-way-kh
              </div>
              <div className="font-mono text-[11px] text-mutedText">
                Rule: Article 21 (Priority to the Right)
              </div>
            </div>
          </div>
        )}

        {/* Action Dispatch Bar */}
        <div className="mt-4 pt-3 border-t border-borderSubtle flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={runSimulation}
            disabled={isExecuting}
            className="inline-flex items-center gap-2 rounded-brand bg-primaryText px-3.5 py-1.5 font-mono text-xs font-semibold text-base transition-colors hover:bg-gold hover:text-primaryText disabled:opacity-50 cursor-pointer"
          >
            {isExecuting ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current" />
            )}
            <span>
              {projectId === "diabetes"
                ? "RUN INFERENCE ENGINE"
                : projectId === "driving"
                  ? "EVALUATE RULE LOGIC"
                  : "EXECUTE REQUEST"}
            </span>
          </button>

          <span aria-live="polite" className="font-mono text-[10px] text-mutedText tabular-nums">
            {isExecuting
              ? "Dispatched query to virtual runtime..."
              : `Completed in ${liveLatency}ms`}
          </span>
        </div>
      </div>

      {/* Simulated Response Payload Output */}
      {hasExecuted && (
        <motion.div
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.98 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: DURATION.fast, ease: EASE_OUT },
              })}
          className="space-y-2"
        >
          <div className="flex items-center justify-between font-mono text-[11px] text-mutedText">
            <span className="uppercase tracking-wider">Simulated Response Stream:</span>
            <span className="tabular-nums">application/json // 200 OK</span>
          </div>

          <pre className="overflow-x-auto rounded-brand border border-borderSubtle bg-card p-4 font-mono text-[11px] text-primaryText leading-relaxed max-h-[340px]">
            <code>
              {projectId === "bookly" &&
                booklyMode === "catalog" &&
                `// HTTP/1.1 200 OK
// Content-Type: application/json
// X-Powered-By: Laravel-11 / PostgreSQL-16
// X-Response-Time: ${liveLatency}ms

{
  "status": "success",
  "http_code": 200,
  "latency_ms": ${liveLatency},
  "database": {
    "engine": "PostgreSQL 16.2",
    "query_plan": "Index Scan using idx_books_category on books",
    "execution_time_ms": 1.18
  },
  "data": [
    {
      "id": "b8a3e721-6a2e-48e2-9b2f-7c48529201aa",
      "isbn": "978-0132350884",
      "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
      "author": "Robert C. Martin",
      "price_usd": "38.99",
      "stock_count": 14,
      "category": "software-engineering",
      "currency": "USD"
    },
    {
      "id": "c1f8d492-3c1a-4d7e-8a1b-9e48271032bb",
      "isbn": "978-0201633610",
      "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
      "author": "Erich Gamma et al.",
      "price_usd": "44.50",
      "stock_count": 8,
      "category": "software-engineering",
      "currency": "USD"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 2,
    "total_records": 48,
    "has_more": true
  }
}`}

              {projectId === "bookly" &&
                booklyMode === "jwt" &&
                `// HTTP/1.1 200 OK
// Content-Type: application/json
// X-Powered-By: Laravel-11 / tymon-jwt
// X-Response-Time: ${liveLatency}ms

{
  "status": "authenticated",
  "http_code": 200,
  "latency_ms": ${liveLatency},
  "auth_provider": "Laravel JWT (tymon/jwt-auth)",
  "token_claims": {
    "iss": "https://bookly-api-zasc.onrender.com",
    "sub": "u91e-482a-89cf-12aa7e",
    "role": "customer",
    "permissions": ["catalog:read", "cart:write", "checkout:create"],
    "iat": 1729318800,
    "exp": 1729326000,
    "signature_verified": true
  },
  "session": {
    "status": "active",
    "user_email": "danish.evaluator@norton.edu.kh"
  }
}`}

              {projectId === "diabetes" &&
                diabetesProfile === "profileA" &&
                `// INFERENCE RESULT: RULE_EVAL_COMPLETE
// Engine: Forward-Chaining Clinical Expert System (Norton 2026 Winner)
// Locale: Bilingual EN / KM (ភាសាខ្មែរ)
// Latency: ${liveLatency}ms

{
  "status": "evaluated",
  "http_code": 200,
  "matched_rule_id": "RULE_GLUC_HOMEOSTASIS_01",
  "risk_classification": "LOW",
  "clinical_score": "0.08 / 1.0",
  "rbac_access_scope": "CLINICIAN_AND_PATIENT_VIEW",
  "inputs": {
    "fasting_blood_glucose_mg_dl": 92,
    "hba1c_percentage": 5.3,
    "bmi_index": 21.8
  },
  "recommendations": {
    "recommendation_en": "Glycemic biomarkers within optimal homeostasis parameters. Annual preventative check-up and standard balanced nutrition recommended.",
    "recommendation_km": "កម្រិតជាតិស្ករក្នុងឈាម និង HbA1c ស្ថិតក្នុងកម្រិតធម្មតា។ សូមបន្តរក្សារបៀបរស់នៅដែលមានសុខភាពល្អ និងពិនិត្យសុខភាពប្រចាំឆ្នាំ។"
  }
}`}

              {projectId === "diabetes" &&
                diabetesProfile === "profileB" &&
                `// INFERENCE RESULT: RULE_EVAL_COMPLETE
// Engine: Forward-Chaining Clinical Expert System (Norton 2026 Winner)
// Locale: Bilingual EN / KM (ភាសាខ្មែរ)
// Latency: ${liveLatency}ms

{
  "status": "evaluated",
  "http_code": 200,
  "matched_rule_id": "RULE_GLUC_ELEVATED_PREDIABETES_02",
  "risk_classification": "MODERATE_PREDIABETIC",
  "clinical_score": "0.54 / 1.0",
  "rbac_access_scope": "CLINICIAN_AND_PATIENT_VIEW",
  "inputs": {
    "fasting_blood_glucose_mg_dl": 114,
    "hba1c_percentage": 6.1,
    "bmi_index": 26.4
  },
  "recommendations": {
    "recommendation_en": "Impaired fasting glycemia detected. Lifestyle intervention, refined carbohydrate reduction, and 90-day HbA1c re-evaluation strongly advised.",
    "recommendation_km": "កម្រិតជាតិស្ករពេលព្រឹកនិង HbA1c ខ្ពស់ជាងធម្មតា (ដំណាក់កាលត្រៀមទឹកនោមផ្អែម)។ ណែនាំឱ្យកាត់បន្ថយជាតិស្ករ ធ្វើលំហាត់ប្រាណ និងពិនិត្យឈាមឡើងវិញក្នុងរយៈពេល ៩០ ថ្ងៃ។"
  }
}`}

              {projectId === "diabetes" &&
                diabetesProfile === "profileC" &&
                `// INFERENCE RESULT: RULE_EVAL_COMPLETE
// Engine: Forward-Chaining Clinical Expert System (Norton 2026 Winner)
// Locale: Bilingual EN / KM (ភាសាខ្មែរ)
// Latency: ${liveLatency}ms

{
  "status": "evaluated",
  "http_code": 200,
  "matched_rule_id": "RULE_GLUC_HBA1C_CRITICAL_04",
  "risk_classification": "HIGH_CLINICAL_RISK",
  "clinical_score": "0.92 / 1.0",
  "rbac_access_scope": "CLINICIAN_AND_PATIENT_VIEW",
  "inputs": {
    "fasting_blood_glucose_mg_dl": 148,
    "hba1c_percentage": 7.2,
    "bmi_index": 29.1
  },
  "recommendations": {
    "recommendation_en": "Biomarkers satisfy Type-2 Diabetes diagnostic criteria (FPG >= 126 mg/dL, HbA1c >= 6.5%). Urgent endocrinology consultation and glucose stabilization protocol indicated.",
    "recommendation_km": "លទ្ធផលឈាមបំពេញតាមលក្ខខណ្ឌវិនិច្ឆ័យជំងឺទឹកនោមផ្អែមប្រភេទទី២ (ជាតិស្ករ >= 126 mg/dL, HbA1c >= 6.5%)។ ត្រូវជួបពិគ្រោះជាមួយគ្រូពេទ្យជំនាញជាបន្ទាន់ដើម្បីរៀបចំការព្យាបាល។"
  }
}`}

              {projectId === "loomora" &&
                `// HTTP/1.1 200 OK
// Content-Type: application/json
// X-Optimistic-Latency: 0ms
// X-Sync-Time: ${liveLatency}ms

{
  "status": "success",
  "http_code": 200,
  "latency_ms": ${liveLatency},
  "optimistic_ui_commit": "0ms (client-side reconciled)",
  "streak_synchronization": {
    "routine_id": "rt-morning-deep-work",
    "routine_title": "Morning 90m Deep Work Block",
    "previous_streak_days": 24,
    "current_streak_days": 25,
    "streak_multiplier": "1.25x",
    "persistence_status": "COMMITTED"
  },
  "telemetry": {
    "timezone": "Asia/Phnom_Penh (ICT UTC+7)",
    "sync_vector": "OFFLINE_FIRST_RECONCILED",
    "server_clock": "${new Date().toISOString()}"
  }
}`}

              {projectId === "driving" &&
                `// EVAL RESULT: KH_THEORY_SUCCESS
// Engine: Dart Theory Engine (Flutter Web)
// Execution-Time: 1.4ms (within 16.6ms 60fps frame budget)

{
  "engine": "Dart Theory Engine (Flutter Web)",
  "status": "evaluated",
  "http_code": 200,
  "execution_time": "1.4ms (within 16.6ms 60fps frame budget)",
  "evaluation": {
    "question_category": "Priority & Intersection Rules (Cambodia)",
    "rule_code": "KH-TRAFFIC-ART-21",
    "scenario": "Unregulated 4-way intersection without signal lights",
    "selected_answer": "Yield priority to vehicle approaching from the right",
    "selected_option_valid": true,
    "score_delta": "+1",
    "current_exam_score": "38/40",
    "passing_threshold": "35/40",
    "exam_status": "PASSING_HONORS",
    "legal_citation": "Cambodian Road Traffic Law 2015, Article 21, Clause 1"
  }
}`}
            </code>
          </pre>
        </motion.div>
      )}
    </div>
  );
}

export default ArchitectureSimulator;
