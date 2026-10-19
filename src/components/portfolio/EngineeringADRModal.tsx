import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  FileText,
  FolderTree,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Layers,
  ArrowRight,
  GitBranch,
  Cpu,
  Link2,
  Check,
} from "lucide-react";

export interface EngineeringADRModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialAdrId?: string;
}

export interface ADRRecord {
  id: string; // "adr-001"
  number: string; // "ADR-001"
  projectTitle: string;
  title: string;
  status: "ACCEPTED // PRODUCTION VERIFIED" | "ACCEPTED // NORTON UNIVERSITY AI AWARD WINNER 2026";
  date: string;
  context: string;
  decision: string;
  tradeoffsAndConsequences: string[];
  fileTree: string;
  implementationSnippet: {
    title: string;
    language: string;
    code: string;
  };
  liveUrl: string;
  githubUrl: string;
}

export const ADR_RECORDS: ADRRecord[] = [
  {
    id: "adr-001",
    number: "ADR-001",
    projectTitle: "Bookly Online Bookstore Platform",
    title:
      "Decoupled Laravel 11 REST API + Stateless JWT Authentication over Monolithic Session State",
    status: "ACCEPTED // PRODUCTION VERIFIED",
    date: "2026-03-12 [ICT UTC+7]",
    context:
      "Bookly required an independent React/TypeScript single-page frontend deployed globally on Vercel communicating across origins with a backend deployed on Render and a PostgreSQL database. A monolithic Blade/Session architecture would tightly couple the UI layer, preventing independent frontend release velocity and introducing CORS session-cookie edge cases on third-party mobile browsers.",
    decision:
      "Engineered a strictly decoupled, stateless REST API architecture under `/api/v1` powered by Laravel 11 and JWT (JSON Web Token) bearer authentication. Custom Laravel middleware validates cryptographic signatures on every incoming mutation. To prevent catastrophic N+1 query bottlenecks on catalog browsing, Eloquent queries enforce deterministic eager-loading (`with(['category', 'author'])`) paired with composite B-Tree indexes on PostgreSQL.",
    tradeoffsAndConsequences: [
      "PRO: Complete separation of concerns allows React/Vite frontend and Laravel backend to be deployed and scaled independently with zero downtime.",
      "PRO: Stateless bearer token auth completely eliminates server-side session serialization overhead and allows seamless cross-origin requests.",
      "CON: Token revocation requires explicit short token TTLs (15 min) or a database blacklist check on privileged administrative mutations.",
      "CON: Cross-origin resource sharing (CORS) pre-flight requests require strict header whitelisting (`Access-Control-Allow-Origin: vercel.app`).",
    ],
    fileTree: `bookly-production/
├── backend-laravel-11/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/V1/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── BookCatalogController.php
│   │   │   │   └── OrderProcessingController.php
│   │   │   ├── Middleware/
│   │   │   │   └── EnsureJwtBearerToken.php
│   │   │   └── Requests/
│   │   │       └── CreateOrderRequest.php
│   │   └── Models/
│   │       ├── Book.php
│   │       ├── Category.php
│   │       └── Order.php
│   └── database/migrations/
│       ├── 2026_01_01_000001_create_books_table.php
│       └── 2026_01_01_000002_create_orders_table.php
└── frontend-react-ts/
    ├── src/
    │   ├── components/catalog/
    │   ├── hooks/useAuthSession.ts
    │   └── services/apiClient.ts
    └── vite.config.ts`,
    implementationSnippet: {
      title: "app/Http/Middleware/EnsureJwtBearerToken.php",
      language: "php",
      code: `<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Tymon\\JWTAuth\\Facades\\JWTAuth;
use Symfony\\Component\\HttpFoundation\\Response;

class EnsureJwtBearerToken
{
    /**
     * Handle an incoming API request and verify stateless JWT claims.
     */
    public function handle(Request $request, Closure $next, ?string $requiredRole = null): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'ERR_UNAUTHORIZED', 'message' => 'User token not found.'], 401);
            }
            if ($requiredRole && $user->role !== $requiredRole) {
                return response()->json(['error' => 'ERR_FORBIDDEN', 'message' => 'Insufficient role permissions.'], 403);
            }
            $request->attributes->set('auth_user', $user);
            return $next($request);
        } catch (\\Exception $e) {
            return response()->json(['error' => 'ERR_INVALID_TOKEN', 'message' => $e->getMessage()], 401);
        }
    }
}`,
    },
    liveUrl: "https://bookly-frontend-five.vercel.app/",
    githubUrl: "https://github.com/danishsary8",
  },
  {
    id: "adr-002",
    number: "ADR-002",
    projectTitle: "Diabetes Expert System (Winner Norton AI 2026)",
    title: "Deterministic Forward-Chaining Inference Engine & Bilingual RBAC Isolation",
    status: "ACCEPTED // NORTON UNIVERSITY AI AWARD WINNER 2026",
    date: "2026-05-18 [ICT UTC+7]",
    context:
      "Clinical risk assessment applications cannot tolerate non-deterministic 'black-box' hallucinations common in probabilistic Large Language Models. Diagnoses must be 100% explainable, mathematically auditable, and adhere to Cambodian Ministry of Health / WHO glycemic standards. Furthermore, the application required bilingual accessibility (English & Khmer) for Cambodian clinicians and patients with strict Role-Based Access Control (RBAC).",
    decision:
      "Engineered an atomic, forward-chaining rule inference engine that evaluates biometric vectors (`fasting_glucose`, `postprandial_glucose`, `hba1c_pct`, `bmi`, `age`) against an auditable rule ledger. Each rule execution returns structured inference traces ('EXPLANATION_TRACE') citing specific clinical thresholds. Clinical records are isolated via cryptographic JWT RBAC guards (`Patient`, `Clinician`, `Admin`), while localization utilizes a zero-latency synchronous dictionary.",
    tradeoffsAndConsequences: [
      "PRO: 100% deterministic reproducibility: identical biometric inputs always yield identical risk tiers and verified clinical explanations.",
      "PRO: Explainability satisfies medical audit compliance and won Norton University AI Expert System Competition 2026.",
      "CON: Rule sets require manual updates by clinical domain specialists when clinical guidelines evolve.",
      "CON: Does not automatically detect novel edge-case comorbidities without explicit multi-variable antecedent rules.",
    ],
    fileTree: `diabetes-expert-system/
├── backend-engine/
│   ├── app/
│   │   ├── Domain/
│   │   │   ├── Engine/
│   │   │   │   ├── ForwardChainingInferenceEngine.php
│   │   │   │   └── ExplanationTraceBuilder.php
│   │   │   ├── Rules/
│   │   │   │   ├── FastingGlucoseRule.php
│   │   │   │   ├── HbA1cThresholdRule.php
│   │   │   │   └── ComorbidityRiskFactorRule.php
│   │   │   └── ValueObjects/
│   │   │       └── BiometricProfile.php
│   │   └── Http/Middleware/
│   │       └── EnforceClinicalRoleRbac.php
│   └── database/migrations/
│       └── create_patient_assessments_table.sql
└── frontend-bilingual/
    ├── src/
    │   ├── components/assessment/
    │   ├── locales/
    │   │   ├── en/clinical.json
    │   │   └── km/clinical.json
    │   └── lib/i18n.ts
    └── package.json`,
    implementationSnippet: {
      title: "app/Domain/Engine/ForwardChainingInferenceEngine.php",
      language: "php",
      code: `<?php

namespace App\\Domain\\Engine;

use App\\Domain\\ValueObjects\\BiometricProfile;

class ForwardChainingInferenceEngine
{
    /**
     * Evaluates patient biometric vector against deterministic clinical rules.
     */
    public function evaluate(BiometricProfile $profile): array
    {
        $facts = [
            'fasting_glucose' => $profile->fastingGlucose,
            'hba1c' => $profile->hba1c,
            'bmi' => $profile->bmi,
            'age' => $profile->age,
        ];

        $matchedRules = [];
        $riskScore = 0;

        // Rule R-01: Severe Glycemic Elevation
        if ($facts['fasting_glucose'] >= 126.0 || $facts['hba1c'] >= 6.5) {
            $matchedRules[] = 'R-01: Glycemic threshold exceeds diagnostic criteria for Diabetes Mellitus (Fasting >= 126 mg/dL or HbA1c >= 6.5%).';
            $riskScore += 80;
        }

        // Rule R-02: Impaired Fasting Glucose (Pre-Diabetes)
        elseif ($facts['fasting_glucose'] >= 100.0 && $facts['fasting_glucose'] < 126.0) {
            $matchedRules[] = 'R-02: Impaired fasting glucose indicated (100-125 mg/dL).';
            $riskScore += 45;
        }

        $tier = $riskScore >= 75 ? 'HIGH_RISK_DIABETIC' : ($riskScore >= 40 ? 'MODERATE_PREDIABETIC' : 'NORMAL');

        return [
            'classification' => $tier,
            'risk_score' => $riskScore,
            'inference_trace' => $matchedRules,
            'evaluated_at' => now()->toIso8601String(),
        ];
    }
}`,
    },
    liveUrl: "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
    githubUrl: "https://github.com/danishsary8",
  },
  {
    id: "adr-003",
    number: "ADR-003",
    projectTitle: "Loomora Routine & Habit Planner",
    title: "Optimistic UI State Mutations & Timezone-Safe Daily Streak Boundary Normalization",
    status: "ACCEPTED // PRODUCTION VERIFIED",
    date: "2026-07-20 [ICT UTC+7]",
    context:
      "Daily habit planners feel unresponsive if toggle operations wait for round-trip server latency before updating streak counters. However, naive local client mutations risk streak corruption if time zone boundaries shift between device local time and server UTC midnight.",
    decision:
      "Implemented an optimistic UI state machine with automatic rollback on network failure, paired with server-side UTC midnight normalization pegged to the user's explicit IANA time zone (`Asia/Phnom_Penh`). Checkbox completions update the DOM within 16ms (Emil Kowalski feedback guideline), while background idempotency keys guarantee no duplicate habit logs are created.",
    tradeoffsAndConsequences: [
      "PRO: Perceived UI latency drops to 0ms; users experience instantaneous tactile feedback on habit toggles.",
      "PRO: Timezone-safe date boundaries eliminate the classic bug where checking off habits after 7:00 AM ICT registers to the wrong UTC date.",
      "CON: Requires rollback logic in React state when an API request fails, restoring the prior streak count.",
      "CON: Database requires unique compound index on `(habit_id, logged_date)` to reject duplicate race-condition mutations.",
    ],
    fileTree: `loomora-fullstack/
├── backend/
│   ├── app/
│   │   ├── Services/
│   │   │   └── StreakNormalizationService.php
│   │   └── Http/Controllers/
│   │       └── HabitLogController.php
│   └── database/migrations/
│       └── create_habit_logs_table.php
└── frontend/
    ├── src/
    │   ├── hooks/useOptimisticHabit.ts
    │   ├── components/HabitRow.tsx
    │   └── utils/timezoneDate.ts
    └── package.json`,
    implementationSnippet: {
      title: "src/hooks/useOptimisticHabit.ts",
      language: "typescript",
      code: `import { useState, useCallback } from 'react';

export function useOptimisticHabit(initialCompleted: boolean, habitId: string, initialStreak: number) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [streak, setStreak] = useState(initialStreak);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggle = useCallback(async () => {
    // 1. Optimistic snapshot & immediate DOM state update
    const previousCompleted = completed;
    const previousStreak = streak;
    const nextCompleted = !completed;
    const nextStreak = nextCompleted ? previousStreak + 1 : Math.max(0, previousStreak - 1);

    setCompleted(nextCompleted);
    setStreak(nextStreak);
    setIsSyncing(true);

    try {
      const res = await fetch(\`/api/v1/habits/\${habitId}/toggle\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: nextCompleted, client_date: new Date().toISOString() })
      });
      if (!res.ok) throw new Error('API Mutation Failed');
    } catch {
      // 2. Automatic rollback on failure
      setCompleted(previousCompleted);
      setStreak(previousStreak);
    } finally {
      setIsSyncing(false);
    }
  }, [completed, habitId, streak]);

  return { completed, streak, isSyncing, toggle };
}`,
    },
    liveUrl: "https://daycraft-vnid.onrender.com/",
    githubUrl: "https://github.com/danishsary8",
  },
  {
    id: "adr-004",
    number: "ADR-004",
    projectTitle: "Cambodian Driving Rules App",
    title:
      "Modular Question Bank Composition & Zero-Latency Assessment Evaluation in Flutter & Dart",
    status: "ACCEPTED // PRODUCTION VERIFIED",
    date: "2026-08-04 [ICT UTC+7]",
    context:
      "Cambodian citizens practicing driver license theory exams on low-bandwidth mobile connections require instantaneous quiz scoring, clear visual traffic sign breakdowns, and smooth 60fps rendering without loading spinners between questions.",
    decision:
      "Structured the Flutter architecture around immutable Dart data models, pure state assessment evaluation functions, and offline-first asset caching. Regulatory traffic sign vectors are bundled locally to guarantee immediate visual presentation regardless of network latency.",
    tradeoffsAndConsequences: [
      "PRO: Instantaneous question transitions with zero network latency; 100% offline-ready on mobile and web.",
      "PRO: Pure function quiz evaluation makes automated regression testing trivial.",
      "CON: Initial Flutter Web bundle size requires optimized tree-shaking and deferred asset loading.",
      "CON: Updates to official Cambodian Ministry of Transport question banks require app rebuilds or JSON delta syncing.",
    ],
    fileTree: `driving-rules-flutter/
├── lib/
│   ├── core/
│   │   ├── theme/app_theme.dart
│   │   └── localization/khmer_strings.dart
│   ├── models/
│   │   ├── question.dart
│   │   └── traffic_sign.dart
│   ├── services/
│   │   └── exam_evaluator.dart
│   └── views/
│       ├── exam_screen.dart
│       └── signs_grid_screen.dart
└── pubspec.yaml`,
    implementationSnippet: {
      title: "lib/services/exam_evaluator.dart",
      language: "dart",
      code: `class ExamResult {
  final int totalQuestions;
  final int correctAnswers;
  final bool hasPassed;
  final double scorePercentage;

  ExamResult({
    required this.totalQuestions,
    required this.correctAnswers,
    required this.hasPassed,
    required this.scorePercentage,
  });
}

class ExamEvaluator {
  static const double passingThreshold = 0.85; // 85% to pass in Cambodia

  static ExamResult evaluateExam(Map<int, int> userAnswers, Map<int, int> answerKey) {
    int correct = 0;
    answerKey.forEach((questionId, correctIndex) {
      if (userAnswers[questionId] == correctIndex) {
        correct++;
      }
    });

    final total = answerKey.length;
    final percentage = total > 0 ? (correct / total) : 0.0;
    final passed = percentage >= passingThreshold;

    return ExamResult(
      totalQuestions: total,
      correctAnswers: correct,
      hasPassed: passed,
      scorePercentage: percentage,
    );
  }
}`,
    },
    liveUrl: "https://drivingruletest.netlify.app/",
    githubUrl: "https://github.com/danishsary8",
  },
];

export function EngineeringADRModal({
  open = false,
  onOpenChange,
  initialAdrId = "adr-001",
}: EngineeringADRModalProps) {
  const [activeAdrId, setActiveAdrId] = useState<string>(initialAdrId);
  const [viewMode, setViewMode] = useState<"spec" | "tree" | "pattern">("spec");

  // Sync if initialAdrId changes
  React.useEffect(() => {
    if (initialAdrId) {
      setActiveAdrId(initialAdrId);
    }
  }, [initialAdrId]);

  const [copiedLink, setCopiedLink] = useState(false);

  const activeAdr = ADR_RECORDS.find((a) => a.id === activeAdrId) ?? ADR_RECORDS[0]!;

  const handleCopyDeepLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    ["project", "tab", "adr", "topology", "query"].forEach((k) => url.searchParams.delete(k));
    url.searchParams.set("adr", activeAdr.number);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="adr-modal-description"
        className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-brand border border-borderSubtle bg-base p-0 shadow-2xl flex flex-col"
      >
        {/* Header Ledger */}
        <div className="border-b border-borderSubtle bg-surface px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <DialogTitle className="font-mono text-xs font-bold uppercase tracking-wider text-primaryText">
                ARCHITECTURE DECISION RECORDS (ADR) // CODEBASE BLUEPRINTS
              </DialogTitle>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <button
                type="button"
                onClick={handleCopyDeepLink}
                aria-label="Copy shareable deep link to this ADR"
                className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-card px-2.5 py-1 text-primaryText hover:border-gold hover:text-gold transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3 w-3 text-gold" />
                    <span className="text-gold font-bold">
                      [LINK COPIED // ?adr={activeAdr.number}]
                    </span>
                  </>
                ) : (
                  <>
                    <Link2 className="h-3 w-3 text-gold" />
                    <span>[COPY DEEP LINK]</span>
                  </>
                )}
              </button>
              <span className="text-mutedText">RFC SPECIFICATION LEDGER • SARY DANISH</span>
            </div>
          </div>
          <DialogDescription id="adr-modal-description" className="sr-only">
            Architectural Decision Records and codebase blueprints documenting technical trade-offs,
            directory structures, and code patterns.
          </DialogDescription>
        </div>

        {/* Asymmetric 40 / 60 Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-[520px]">
          {/* Left Column (40% md:col-span-5): ADR Index & Project Switcher */}
          <div className="md:col-span-5 border-r border-borderSubtle bg-base p-4 overflow-y-auto flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText mb-3 block">
                Navigable ADR Ledger
              </span>

              <div className="space-y-2">
                {ADR_RECORDS.map((adr) => {
                  const isActive = adr.id === activeAdr.id;
                  return (
                    <button
                      key={adr.id}
                      type="button"
                      onClick={() => setActiveAdrId(adr.id)}
                      className={`w-full text-left p-3 rounded-brand border transition-colors cursor-pointer ${
                        isActive
                          ? "border-gold bg-card text-primaryText"
                          : "border-borderSubtle bg-surface/50 text-mutedText hover:border-gold/50 hover:text-primaryText"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                        <span className="text-gold font-bold">{adr.number}</span>
                        <span className="tabular-nums">{adr.date.split(" ")[0]}</span>
                      </div>
                      <div className="font-display text-xs font-bold text-primaryText mb-1 line-clamp-1">
                        {adr.projectTitle}
                      </div>
                      <div className="font-mono text-[10px] text-mutedText line-clamp-2 leading-relaxed">
                        {adr.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Link to Current Project Repo / Live */}
            <div className="mt-4 pt-4 border-t border-borderSubtle flex items-center justify-between font-mono text-[11px]">
              <a
                href={activeAdr.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-gold hover:underline"
              >
                <span>Live Deploy</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={activeAdr.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-mutedText hover:text-primaryText"
              >
                <span>GitHub Source</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column (60% md:col-span-7): Specification & Code View */}
          <div className="md:col-span-7 bg-card p-6 overflow-y-auto flex flex-col">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between border-b border-borderSubtle pb-4 mb-4">
              <div className="font-mono text-xs font-bold text-gold">
                {activeAdr.number}: {activeAdr.projectTitle}
              </div>

              <div className="flex items-center gap-1 bg-surface rounded-brand p-0.5 border border-borderSubtle">
                <button
                  type="button"
                  onClick={() => setViewMode("spec")}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded-[2px] transition-colors cursor-pointer ${
                    viewMode === "spec"
                      ? "bg-card text-primaryText font-semibold border border-borderSubtle"
                      : "text-mutedText hover:text-primaryText"
                  }`}
                >
                  SPECIFICATION
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("tree")}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded-[2px] transition-colors cursor-pointer ${
                    viewMode === "tree"
                      ? "bg-card text-primaryText font-semibold border border-borderSubtle"
                      : "text-mutedText hover:text-primaryText"
                  }`}
                >
                  FILE TREE
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("pattern")}
                  className={`px-2.5 py-1 font-mono text-[10px] rounded-[2px] transition-colors cursor-pointer ${
                    viewMode === "pattern"
                      ? "bg-card text-primaryText font-semibold border border-borderSubtle"
                      : "text-mutedText hover:text-primaryText"
                  }`}
                >
                  PATTERN CODE
                </button>
              </div>
            </div>

            {/* View Mode 1: Full RFC Architecture Specification */}
            {viewMode === "spec" && (
              <div className="space-y-5 font-body text-xs text-mutedText leading-relaxed">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primaryText font-bold block mb-1">
                    STATUS &amp; CONSENSUS
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-gold">
                    <CheckCircle2 className="h-3 w-3" />
                    {activeAdr.status}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primaryText font-bold block mb-1">
                    CONTEXT &amp; PROBLEM STATEMENT
                  </span>
                  <p className="font-body text-xs text-mutedText leading-relaxed">
                    {activeAdr.context}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primaryText font-bold block mb-1">
                    ARCHITECTURAL DECISION
                  </span>
                  <p className="font-body text-xs text-primaryText leading-relaxed bg-surface/60 p-3 rounded-brand border border-borderSubtle">
                    {activeAdr.decision}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primaryText font-bold block mb-1">
                    TRADE-OFFS &amp; CONSEQUENCES
                  </span>
                  <ul className="space-y-1.5 font-mono text-[11px]">
                    {activeAdr.tradeoffsAndConsequences.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-gold font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* View Mode 2: Clean Production Directory Structure */}
            {viewMode === "tree" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-mutedText">
                  <FolderTree className="h-4 w-4 text-gold" />
                  <span>Verified Production Directory Structure</span>
                </div>
                <pre className="rounded-brand border border-borderSubtle bg-base p-4 font-mono text-xs leading-relaxed text-primaryText overflow-x-auto selection:bg-gold selection:text-base">
                  {activeAdr.fileTree}
                </pre>
              </div>
            )}

            {/* View Mode 3: Canonical Pattern Code Implementation */}
            {viewMode === "pattern" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-mutedText">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-gold" />
                    <span className="text-primaryText font-semibold">
                      {activeAdr.implementationSnippet.title}
                    </span>
                  </div>
                  <span className="uppercase text-[10px] text-gold">
                    {activeAdr.implementationSnippet.language}
                  </span>
                </div>
                <pre className="rounded-brand border border-borderSubtle bg-base p-4 font-mono text-xs leading-relaxed text-primaryText overflow-x-auto max-h-[380px] selection:bg-gold selection:text-base">
                  {activeAdr.implementationSnippet.code}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer Telemetry */}
        <div className="border-t border-borderSubtle bg-surface px-6 py-2.5 flex items-center justify-between font-mono text-[11px] text-mutedText">
          <div className="flex items-center gap-2">
            <Cpu className="h-3 w-3 text-gold" />
            <span>PRESS ESC TO CLOSE // NAVIGATION KEYBOARD ACCESSIBLE</span>
          </div>
          <span className="tabular-nums">REVISION 2026.10 // 4 VERIFIED RECORDS</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
