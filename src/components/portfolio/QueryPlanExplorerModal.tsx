import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Database,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Cpu,
  Zap,
  Terminal,
  Link2,
  Check,
} from "lucide-react";

export interface QueryPlanExplorerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialBenchmarkId?: string;
}

export interface QueryBenchmark {
  id: string; // "bookly", "diabetes", "loomora"
  title: string;
  scenario: string;
  database: string;
  naive: {
    label: string;
    description: string;
    code: string;
    scanType: string;
    executionTimeMs: number;
    queryCount: number;
    bufferHits: string;
    cost: string;
    explainTree: string[];
    bottleneck: string;
  };
  optimized: {
    label: string;
    description: string;
    code: string;
    scanType: string;
    executionTimeMs: number;
    queryCount: number;
    bufferHits: string;
    cost: string;
    explainTree: string[];
    gain: string;
  };
}

export const QUERY_BENCHMARKS: QueryBenchmark[] = [
  {
    id: "bookly",
    title: "Bookly — Catalog Filtering & Eloquent N+1 Elimination",
    scenario: "Paginated category catalog retrieval with author metadata and inventory counts.",
    database: "PostgreSQL 16 // Laravel 11 Eloquent",
    naive: {
      label: "NAIVE N+1 & SEQ SCAN",
      description:
        "Unindexed catalog search with lazy-loaded relationships inside a foreach resource loop.",
      code: `// Laravel Controller: Naive Implementation
public function index(Request $request) {
    // Bottleneck 1: Missing composite index on (category_id, price)
    $books = Book::where('category_id', $request->category_id)
                 ->orderBy('price', 'asc')
                 ->get();

    // Bottleneck 2: N+1 queries executed in serialization loop
    return $books->map(function ($book) {
        return [
            'id' => $book->id,
            'title' => $book->title,
            'author' => $book->author->name, // 50 separate SQL queries!
        ];
    });
}`,
      scanType: "SEQUENTIAL TABLE SCAN",
      executionTimeMs: 144.2,
      queryCount: 51,
      bufferHits: "shared read=840 (Disk I/O)",
      cost: "0.00..1842.00",
      explainTree: [
        "Seq Scan on books (cost=0.00..1842.00 rows=50 width=412) (actual time=18.40..138.62 ms)",
        "  Filter: (category_id = 'cat_8829')",
        "  Rows Removed by Filter: 49,950",
        "  Buffers: shared read=840",
        "-> 50x Subqueries: SELECT name FROM authors WHERE id = ? (cost=0.15..8.17)",
      ],
      bottleneck:
        "50 secondary round-trips over network + 49,950 non-matching rows scanned sequentially.",
    },
    optimized: {
      label: "DANISH PRODUCTION ARCHITECTURE",
      description:
        "Composite B-Tree index with strict Eloquent eager loading and projection limit.",
      code: `-- 1. PostgreSQL Schema Composite B-Tree Index
CREATE INDEX idx_books_cat_price 
ON books (category_id, price ASC) 
INCLUDE (stock_count);

// 2. Laravel 11 Production Eager Loading
public function index(Request $request) {
    return Book::query()
        ->select(['id', 'category_id', 'author_id', 'title', 'price', 'stock_count'])
        ->where('category_id', $request->category_id)
        ->with(['author:id,name', 'category:id,slug'])
        ->orderBy('price', 'asc')
        ->paginate(20);
}`,
      scanType: "COMPOSITE B-TREE INDEX SCAN",
      executionTimeMs: 1.86,
      queryCount: 2,
      bufferHits: "shared hit=14 (100% RAM Cache)",
      cost: "0.29..12.45",
      explainTree: [
        "Index Scan using idx_books_cat_price on books (cost=0.29..12.45 rows=20 width=184) (actual time=0.14..1.12 ms)",
        "  Index Cond: (category_id = 'cat_8829')",
        "  Buffers: shared hit=8",
        "-> 1x Batched Subquery: Index Scan using authors_pkey on authors",
        "  Index Cond: (id = ANY('{auth_1, auth_2, ...}'::uuid[]))",
        "  Buffers: shared hit=6",
      ],
      gain: "77.5x FASTER // -96.1% QUERIES ELIMINATED // 0 DISK READS",
    },
  },
  {
    id: "diabetes",
    title: "Diabetes Expert System — High-Risk Clinical Audit Log (Award Winner 2026)",
    scenario:
      "Clinician querying high-risk glycemic records with bilingual diagnostic rules under RBAC scope.",
    database: "PostgreSQL 16 // Clinical Inference Engine",
    naive: {
      label: "FULL TABLE SCAN + RUNTIME FILTER",
      description: "Querying raw JSON payloads and evaluating clinical antecedents in memory.",
      code: `// Naive JSON blob search without PostgreSQL partial index
$assessments = PatientAssessment::where('clinic_id', $user->clinic_id)
    ->get()
    ->filter(function ($record) {
        $data = json_decode($record->raw_biometrics, true);
        return $data['hba1c'] >= 6.5; // Memory filter on 25,000 records
    });`,
      scanType: "FULL TABLE SCAN + RUNTIME EVALUATION",
      executionTimeMs: 89.4,
      queryCount: 14,
      bufferHits: "shared read=512",
      cost: "0.00..980.50",
      explainTree: [
        "Seq Scan on patient_assessments (cost=0.00..980.50 rows=25000 width=580) (actual time=12.20..84.10 ms)",
        "  Filter: (clinic_id = 'cl_norton')",
        "  Buffers: shared read=512",
        "-> Application memory deserialization of 25,000 JSON payloads (latency 5.3ms)",
      ],
      bottleneck:
        "Transfers entire JSON table into RAM before filtering out 98% of unneeded normal records.",
    },
    optimized: {
      label: "DANISH PRODUCTION ARCHITECTURE",
      description:
        "Normalized relational columns backed by a Partial Index and RBAC scope injection.",
      code: `-- 1. PostgreSQL Targeted Partial Index
CREATE INDEX idx_high_risk_assessments 
ON patient_assessments (clinic_id, evaluated_at DESC)
WHERE risk_tier = 'HIGH_CLINICAL_RISK';

// 2. Query Builder with Direct Database Projection
public function highRiskAudit(ClinicianScope $scope) {
    return PatientAssessment::query()
        ->where('clinic_id', $scope->clinicId)
        ->where('risk_tier', 'HIGH_CLINICAL_RISK')
        ->where('hba1c_percent', '>=', 6.5)
        ->with('patient:id,khmer_name,age')
        ->limit(50)
        ->get();
}`,
      scanType: "PARTIAL B-TREE INDEX SCAN",
      executionTimeMs: 1.15,
      queryCount: 1,
      bufferHits: "shared hit=8 (100% RAM Cache)",
      cost: "0.15..4.85",
      explainTree: [
        "Bitmap Heap Scan on patient_assessments (cost=0.15..4.85 rows=32 width=142) (actual time=0.08..0.92 ms)",
        "  Recheck Cond: ((clinic_id = 'cl_norton') AND (risk_tier = 'HIGH_CLINICAL_RISK'))",
        "  -> Bitmap Index Scan on idx_high_risk_assessments",
        "  Buffers: shared hit=8",
      ],
      gain: "77.7x FASTER // PARTIAL INDEX COVERS ONLY HIGH-RISK DATA",
    },
  },
  {
    id: "loomora",
    title: "Loomora — Timezone-Aware Streak Window Aggregation",
    scenario:
      "Calculating consecutive daily completion streaks across Phnom Penh (ICT UTC+7) midnight.",
    database: "PostgreSQL 16 // Temporal Habit Machine",
    naive: {
      label: "CLIENT MEMORY ITERATION",
      description:
        "Transferring thousands of raw historical completion dates to the client application.",
      code: `// Naive client iteration: Downloads 365 days of habit logs
const res = await fetch(\`/api/habits/\${habitId}/logs\`);
const logs = await res.json(); // 48.2 KB payload

let streak = 0;
// Complex date looping in browser prone to UTC vs ICT date-shift bugs!`,
      scanType: "SEQUENTIAL SCAN + FULL WIRE TRANSFER",
      executionTimeMs: 64.5,
      queryCount: 6,
      bufferHits: "shared read=240",
      cost: "0.00..412.00",
      explainTree: [
        "Seq Scan on habit_logs (cost=0.00..412.00 rows=3650 width=64) (actual time=6.10..58.40 ms)",
        "  Filter: (habit_id = 'hab_loomora_01')",
        "-> Transfer 48.2 KB JSON payload over network to client",
      ],
      bottleneck:
        "Transfers unbounded historical logs to client; miscalculates streaks after 7:00 AM UTC.",
    },
    optimized: {
      label: "DANISH PRODUCTION ARCHITECTURE",
      description:
        "PostgreSQL Window Function (Island-and-Gap) evaluating streak directly in SQL engine.",
      code: `-- SQL Window Aggregation (Phnom Penh Midnight Normalization)
WITH normalized_dates AS (
  SELECT 
    (completed_at AT TIME ZONE 'Asia/Phnom_Penh')::date AS log_date,
    ROW_NUMBER() OVER (ORDER BY (completed_at AT TIME ZONE 'Asia/Phnom_Penh')::date DESC) AS rn
  FROM habit_logs
  WHERE habit_id = :habitId AND status = 'COMPLETED'
)
SELECT COUNT(*) AS active_streak
FROM normalized_dates
WHERE log_date = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Phnom_Penh')::date - (rn - 1);`,
      scanType: "WINDOW AGGREGATE + COMPOUND INDEX",
      executionTimeMs: 2.1,
      queryCount: 1,
      bufferHits: "shared hit=6 (100% RAM Cache)",
      cost: "0.15..8.20",
      explainTree: [
        "Aggregate (cost=0.15..8.20 rows=1 width=8) (actual time=0.12..1.98 ms)",
        "  -> WindowAgg",
        "    -> Index Only Scan using idx_habits_time on habit_logs",
        "       Index Cond: (habit_id = 'hab_loomora_01')",
        "  Buffers: shared hit=6",
      ],
      gain: "30.7x FASTER // ZERO CLIENT MEMORY OVERHEAD // 0.64 KB PAYLOAD",
    },
  },
];

export function QueryPlanExplorerModal({
  open = false,
  onOpenChange,
  initialBenchmarkId = "bookly",
}: QueryPlanExplorerModalProps) {
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>(initialBenchmarkId);
  const [activeMode, setActiveMode] = useState<"naive" | "optimized">("optimized");
  const [copiedLink, setCopiedLink] = useState(false);

  React.useEffect(() => {
    if (initialBenchmarkId) {
      setActiveBenchmarkId(initialBenchmarkId);
    }
  }, [initialBenchmarkId]);

  const activeBenchmark =
    QUERY_BENCHMARKS.find((b) => b.id === activeBenchmarkId) ?? QUERY_BENCHMARKS[0]!;

  const currentPlan =
    activeMode === "optimized" ? activeBenchmark.optimized : activeBenchmark.naive;

  const handleCopyDeepLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    ["project", "tab", "adr", "topology", "query"].forEach((k) => url.searchParams.delete(k));
    url.searchParams.set("query", activeBenchmark.id);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby="query-plan-description"
        className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-brand border border-borderSubtle bg-base p-0 shadow-2xl flex flex-col"
      >
        {/* Header Ledger */}
        <div className="border-b border-borderSubtle bg-surface px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <DialogTitle className="font-mono text-xs font-bold uppercase tracking-wider text-primaryText">
              POSTGRESQL QUERY EXECUTION PLAN (EXPLAIN ANALYZE) &amp; N+1 EXPLORER
            </DialogTitle>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <button
              type="button"
              onClick={handleCopyDeepLink}
              aria-label="Copy shareable deep link to this query plan"
              className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-card px-2.5 py-1 text-primaryText hover:border-gold hover:text-gold transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3 w-3 text-gold" />
                  <span className="text-gold font-bold">
                    [LINK COPIED // ?query={activeBenchmark.id}]
                  </span>
                </>
              ) : (
                <>
                  <Link2 className="h-3 w-3 text-gold" />
                  <span>[COPY DEEP LINK]</span>
                </>
              )}
            </button>
            <span className="text-mutedText">POSTGRESQL 16 // ACID ENGINE</span>
          </div>
          <DialogDescription id="query-plan-description" className="sr-only">
            Inspect PostgreSQL EXPLAIN ANALYZE execution trees, buffer hits, index scans, and N+1
            query elimination benchmarks.
          </DialogDescription>
        </div>

        {/* Benchmark Selector Bar */}
        <div className="border-b border-borderSubtle bg-base px-6 py-2.5 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText mr-2">
            Production Benchmarks:
          </span>
          {QUERY_BENCHMARKS.map((benchmark) => {
            const isActive = benchmark.id === activeBenchmark.id;
            return (
              <button
                key={benchmark.id}
                type="button"
                onClick={() => setActiveBenchmarkId(benchmark.id)}
                className={`rounded-brand px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                  isActive
                    ? "border border-gold bg-card text-primaryText font-bold ring-1 ring-gold"
                    : "border border-borderSubtle bg-surface/50 text-mutedText hover:border-gold/50 hover:text-primaryText"
                }`}
              >
                {benchmark.title.split(" — ")[0]}
              </button>
            );
          })}
        </div>

        {/* Asymmetric 5 / 7 Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden min-h-[500px]">
          {/* Left Column (5 Cols): ORM / SQL Implementation & Mode Switcher */}
          <div className="lg:col-span-5 border-r border-borderSubtle bg-base p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block mb-1">
                  Scenario &amp; Workload
                </span>
                <h3 className="font-display text-sm font-bold text-primaryText mb-1">
                  {activeBenchmark.title}
                </h3>
                <p className="font-body text-xs text-mutedText leading-relaxed">
                  {activeBenchmark.scenario}
                </p>
              </div>

              {/* Optimization Mode Toggle */}
              <div className="mb-4 p-1 rounded-brand bg-surface border border-borderSubtle grid grid-cols-2 gap-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveMode("naive")}
                  className={`py-2 px-2.5 rounded-[2px] text-center transition-colors cursor-pointer ${
                    activeMode === "naive"
                      ? "border border-borderSubtle bg-card text-primaryText font-bold shadow-none"
                      : "text-mutedText hover:text-primaryText"
                  }`}
                >
                  NAIVE N+1 PLAN
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("optimized")}
                  className={`py-2 px-2.5 rounded-[2px] text-center transition-colors cursor-pointer ${
                    activeMode === "optimized"
                      ? "border border-gold bg-card text-gold font-bold shadow-none"
                      : "text-mutedText hover:text-primaryText"
                  }`}
                >
                  OPTIMIZED PLAN ★
                </button>
              </div>

              {/* Code Snippet Box */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block mb-1.5 flex items-center justify-between">
                  <span>Implementation Pattern:</span>
                  <span className="text-primaryText font-semibold">{currentPlan.label}</span>
                </span>
                <pre className="rounded-brand border border-borderSubtle bg-card p-4 font-mono text-[11px] leading-relaxed text-primaryText overflow-x-auto max-h-[250px] selection:bg-gold selection:text-base">
                  {currentPlan.code}
                </pre>
                <p className="font-body text-xs text-mutedText mt-2 leading-relaxed">
                  {currentPlan.description}
                </p>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="mt-4 pt-4 border-t border-borderSubtle font-mono text-[11px]">
              {activeMode === "optimized" ? (
                <div className="text-gold font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{activeBenchmark.optimized.gain}</span>
                </div>
              ) : (
                <div className="text-mutedText flex items-center gap-1.5">
                  <TrendingDown className="h-4 w-4 text-mutedText" />
                  <span>{activeBenchmark.naive.bottleneck}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (7 Cols): EXPLAIN (ANALYZE, BUFFERS) Execution Plan Tree */}
          <div className="lg:col-span-7 bg-card p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono">
                <div className="rounded-brand border border-borderSubtle bg-surface p-2.5">
                  <span className="text-[10px] text-mutedText block">EXECUTION TIME</span>
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      activeMode === "optimized" ? "text-gold" : "text-primaryText"
                    }`}
                  >
                    {currentPlan.executionTimeMs} ms
                  </span>
                </div>

                <div className="rounded-brand border border-borderSubtle bg-surface p-2.5">
                  <span className="text-[10px] text-mutedText block">TOTAL DB QUERIES</span>
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      activeMode === "optimized" ? "text-gold" : "text-primaryText"
                    }`}
                  >
                    {currentPlan.queryCount} {currentPlan.queryCount === 1 ? "query" : "queries"}
                  </span>
                </div>

                <div className="rounded-brand border border-borderSubtle bg-surface p-2.5">
                  <span className="text-[10px] text-mutedText block">SCAN TYPE</span>
                  <span className="text-xs font-semibold text-primaryText truncate block">
                    {currentPlan.scanType.split(" ")[0]}
                  </span>
                </div>

                <div className="rounded-brand border border-borderSubtle bg-surface p-2.5">
                  <span className="text-[10px] text-mutedText block">PLAN COST</span>
                  <span className="text-xs font-semibold text-primaryText tabular-nums truncate block">
                    {currentPlan.cost}
                  </span>
                </div>
              </div>

              {/* Buffer Hits Strip */}
              <div className="mb-4 rounded-brand border border-borderSubtle bg-surface/60 px-3 py-2 flex items-center justify-between font-mono text-[11px]">
                <span className="text-mutedText">I/O BUFFERS &amp; CACHE HIT RATIO:</span>
                <span className="font-semibold text-primaryText">{currentPlan.bufferHits}</span>
              </div>

              {/* PostgreSQL EXPLAIN Tree */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block mb-1.5 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-gold" />
                  <span>PostgreSQL EXPLAIN (ANALYZE, BUFFERS) Execution Tree:</span>
                </span>
                <div className="rounded-brand border border-borderSubtle bg-base p-4 font-mono text-xs text-primaryText overflow-x-auto space-y-1.5 selection:bg-gold selection:text-base">
                  {currentPlan.explainTree.map((node, idx) => (
                    <div
                      key={idx}
                      className={`${
                        node.startsWith("->")
                          ? "pl-4 text-primaryText"
                          : node.startsWith("  ")
                            ? "pl-6 text-mutedText text-[11px]"
                            : "font-semibold text-gold"
                      }`}
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tree Summary Footer */}
            <div className="mt-4 pt-3 border-t border-borderSubtle flex items-center justify-between font-mono text-[11px] text-mutedText">
              <span>QUERY PLAN ID: {activeBenchmark.id.toUpperCase()}_v16</span>
              <span className="tabular-nums">
                DELTA: {activeBenchmark.naive.executionTimeMs}ms →{" "}
                {activeBenchmark.optimized.executionTimeMs}ms
              </span>
            </div>
          </div>
        </div>

        {/* Footer Telemetry */}
        <div className="border-t border-borderSubtle bg-surface px-6 py-2.5 flex items-center justify-between font-mono text-[11px] text-mutedText">
          <div className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-gold" />
            <span>PRESS ESC TO CLOSE // KEYBOARD CHORD [G+Q] REGISTERED</span>
          </div>
          <span className="tabular-nums">SARY DANISH RELATIONAL ENGINEERING LEDGER</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
