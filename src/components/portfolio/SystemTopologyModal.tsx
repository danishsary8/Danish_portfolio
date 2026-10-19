import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Database,
  Server,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Key,
  CheckCircle2,
  AlertTriangle,
  Lock,
  GitBranch,
  Link2,
  Check,
} from "lucide-react";

export interface SystemTopologyModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialBlueprint?: string;
}

type BooklyStage = "client" | "gateway" | "domain" | "db";
type DiabetesStage = "intake" | "rbac" | "inference" | "audit";

interface SchemaColumn {
  name: string;
  type: string;
  constraint: "PK" | "FK" | "UNIQUE" | "INDEX" | "NOT NULL" | "NULLABLE";
  ref?: string;
}

interface SchemaTable {
  id: string;
  name: string;
  engine: string;
  description: string;
  columns: SchemaColumn[];
}

const BOOKLY_TABLES: SchemaTable[] = [
  {
    id: "users",
    name: "users",
    engine: "PostgreSQL 16",
    description: "Authenticated customer & admin accounts with JWT role permissions.",
    columns: [
      { name: "id", type: "UUID", constraint: "PK" },
      { name: "email", type: "VARCHAR(255)", constraint: "UNIQUE" },
      { name: "password_hash", type: "VARCHAR(255)", constraint: "NOT NULL" },
      { name: "role", type: "VARCHAR(32)", constraint: "INDEX" },
      { name: "created_at", type: "TIMESTAMPTZ", constraint: "NOT NULL" },
    ],
  },
  {
    id: "categories",
    name: "categories",
    engine: "PostgreSQL 16",
    description: "Hierarchical taxonomy for book catalog classification.",
    columns: [
      { name: "id", type: "BIGSERIAL", constraint: "PK" },
      { name: "slug", type: "VARCHAR(64)", constraint: "UNIQUE" },
      { name: "name", type: "VARCHAR(128)", constraint: "NOT NULL" },
      { name: "display_order", type: "INTEGER", constraint: "INDEX" },
    ],
  },
  {
    id: "books",
    name: "books",
    engine: "PostgreSQL 16",
    description: "Normalized bookstore inventory items with pricing and stock.",
    columns: [
      { name: "id", type: "UUID", constraint: "PK" },
      { name: "category_id", type: "BIGINT", constraint: "FK", ref: "categories.id" },
      { name: "isbn", type: "VARCHAR(32)", constraint: "UNIQUE" },
      { name: "title", type: "VARCHAR(255)", constraint: "INDEX" },
      { name: "price_cents", type: "INTEGER", constraint: "NOT NULL" },
      { name: "stock_count", type: "INTEGER", constraint: "NOT NULL" },
    ],
  },
  {
    id: "orders",
    name: "orders",
    engine: "PostgreSQL 16",
    description: "Customer purchasing transaction headers and status lifecycle.",
    columns: [
      { name: "id", type: "UUID", constraint: "PK" },
      { name: "user_id", type: "UUID", constraint: "FK", ref: "users.id" },
      { name: "total_cents", type: "INTEGER", constraint: "NOT NULL" },
      { name: "status", type: "VARCHAR(32)", constraint: "INDEX" },
      { name: "created_at", type: "TIMESTAMPTZ", constraint: "NOT NULL" },
    ],
  },
  {
    id: "order_items",
    name: "order_items",
    engine: "PostgreSQL 16",
    description: "Relational junction items connecting orders and books (N:M).",
    columns: [
      { name: "id", type: "BIGSERIAL", constraint: "PK" },
      { name: "order_id", type: "UUID", constraint: "FK", ref: "orders.id" },
      { name: "book_id", type: "UUID", constraint: "FK", ref: "books.id" },
      { name: "quantity", type: "INTEGER", constraint: "NOT NULL" },
      { name: "unit_price_cents", type: "INTEGER", constraint: "NOT NULL" },
    ],
  },
];

const DIABETES_TABLES: SchemaTable[] = [
  {
    id: "users_rbac",
    name: "users_rbac",
    engine: "PostgreSQL 16",
    description: "Clinical RBAC accounts (Patient, Clinician, Competition Evaluator).",
    columns: [
      { name: "id", type: "UUID", constraint: "PK" },
      { name: "medical_license_id", type: "VARCHAR(64)", constraint: "UNIQUE" },
      { name: "role", type: "VARCHAR(32)", constraint: "INDEX" },
      { name: "locale_pref", type: "VARCHAR(8)", constraint: "NOT NULL" },
    ],
  },
  {
    id: "patient_assessments",
    name: "patient_assessments",
    engine: "PostgreSQL 16",
    description: "Immutable diagnostic assessment events with biometric telemetry.",
    columns: [
      { name: "id", type: "UUID", constraint: "PK" },
      { name: "patient_id", type: "UUID", constraint: "FK", ref: "users_rbac.id" },
      { name: "fpg_mg_dl", type: "DECIMAL(5,1)", constraint: "NOT NULL" },
      { name: "hba1c_pct", type: "DECIMAL(4,2)", constraint: "NOT NULL" },
      {
        name: "matched_rule_id",
        type: "VARCHAR(64)",
        constraint: "FK",
        ref: "clinical_rules.rule_id",
      },
      { name: "risk_level", type: "VARCHAR(32)", constraint: "INDEX" },
      { name: "evaluated_at", type: "TIMESTAMPTZ", constraint: "NOT NULL" },
    ],
  },
  {
    id: "clinical_rules",
    name: "clinical_rules",
    engine: "Knowledge Base",
    description: "Forward-chaining rule heuristics for glycemic threshold evaluation.",
    columns: [
      { name: "rule_id", type: "VARCHAR(64)", constraint: "PK" },
      { name: "fpg_min", type: "DECIMAL(5,1)", constraint: "NOT NULL" },
      { name: "hba1c_min", type: "DECIMAL(4,2)", constraint: "NOT NULL" },
      { name: "classification", type: "VARCHAR(32)", constraint: "INDEX" },
      { name: "clinical_weight", type: "DECIMAL(3,2)", constraint: "NOT NULL" },
    ],
  },
  {
    id: "bilingual_translations",
    name: "bilingual_translations",
    engine: "Knowledge Base",
    description: "Dual-locale clinical diagnostic recommendations (EN / Khmer).",
    columns: [
      { name: "id", type: "BIGSERIAL", constraint: "PK" },
      { name: "rule_id", type: "VARCHAR(64)", constraint: "FK", ref: "clinical_rules.rule_id" },
      { name: "content_en", type: "TEXT", constraint: "NOT NULL" },
      { name: "content_km", type: "TEXT", constraint: "NOT NULL" },
    ],
  },
];

export function SystemTopologyModal({
  open: controlledOpen,
  onOpenChange,
  initialBlueprint = "bookly",
}: SystemTopologyModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(initialBlueprint);
  const [selectedBooklyStage, setSelectedBooklyStage] = useState<BooklyStage>("gateway");
  const [selectedDiabetesStage, setSelectedDiabetesStage] = useState<DiabetesStage>("inference");
  const [activeFkRelationship, setActiveFkRelationship] = useState<string | null>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(nextOpen);
      } else {
        setInternalOpen(nextOpen);
      }
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (initialBlueprint) {
      setCurrentTab(initialBlueprint);
    }
  }, [initialBlueprint]);

  // Global listener for custom open event
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ blueprint?: string }>;
      if (customEvent.detail?.blueprint) {
        setCurrentTab(customEvent.detail.blueprint);
      }
      setOpen(true);
    };

    window.addEventListener("portfolio:open-topology-modal", handleCustomOpen);
    return () => {
      window.removeEventListener("portfolio:open-topology-modal", handleCustomOpen);
    };
  }, [setOpen]);

  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyDeepLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    ["project", "tab", "adr", "topology", "query"].forEach((k) => url.searchParams.delete(k));
    url.searchParams.set("topology", currentTab);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl max-h-[88vh] overflow-y-auto p-5 sm:p-7 bg-card border-borderSubtle rounded-brand shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderSubtle pb-3">
          <DialogTitle className="font-display text-xl sm:text-2xl font-bold text-primaryText flex items-center gap-2.5">
            <Database className="h-5 w-5 text-gold" aria-hidden="true" />
            <span>RELATIONAL DATABASE TOPOLOGY &amp; ARCHITECTURAL LIFECYCLE</span>
          </DialogTitle>

          <button
            type="button"
            onClick={handleCopyDeepLink}
            aria-label="Copy shareable deep link to this database topology"
            className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-surface px-2.5 py-1 font-mono text-[11px] text-primaryText hover:border-gold hover:text-gold transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="h-3 w-3 text-gold" />
                <span className="text-gold font-bold">[LINK COPIED // ?topology={currentTab}]</span>
              </>
            ) : (
              <>
                <Link2 className="h-3 w-3 text-gold" />
                <span>[COPY DEEP LINK]</span>
              </>
            )}
          </button>
        </div>
        <DialogDescription className="font-mono text-xs text-mutedText mt-1">
          Interactive full-stack data flow pipelines, relational normalization schemas, and
          deterministic state topologies.
        </DialogDescription>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mt-4">
          <TabsList className="mb-5 w-full justify-start overflow-x-auto border-b border-borderSubtle pb-2">
            <TabsTrigger value="bookly" className="flex items-center gap-1.5 font-mono text-xs">
              <Server className="h-3.5 w-3.5" />
              <span>Bookly E-Commerce Pipeline &amp; ERD</span>
            </TabsTrigger>
            <TabsTrigger value="diabetes" className="flex items-center gap-1.5 font-mono text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <span>Diabetes Inference &amp; RBAC Topology</span>
            </TabsTrigger>
            <TabsTrigger value="sync" className="flex items-center gap-1.5 font-mono text-xs">
              <GitBranch className="h-3.5 w-3.5" />
              <span>Loomora &amp; Driving Sync Topology</span>
            </TabsTrigger>
          </TabsList>

          {/* BLUEPRINT 1: BOOKLY */}
          <TabsContent value="bookly" className="space-y-6">
            {/* 1. Request Lifecycle Pipeline */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase text-primaryText">
                  Full-Stack Request Lifecycle Pipeline
                </span>
                <span className="font-mono text-[11px] text-mutedText">
                  Click a stage to inspect its operational contract
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
                {/* Stage 1 */}
                <button
                  type="button"
                  onClick={() => setSelectedBooklyStage("client")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedBooklyStage === "client"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">
                    Stage 01 // Client
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    React + TypeScript SPA
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    Vite, Axios Interceptors, JWT Bearer
                  </div>
                </button>

                {/* Stage 2 */}
                <button
                  type="button"
                  onClick={() => setSelectedBooklyStage("gateway")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedBooklyStage === "gateway"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">
                    Stage 02 // Gateway
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    Laravel 11 JWT Guard
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    Route Middleware, 60 req/min limit
                  </div>
                </button>

                {/* Stage 3 */}
                <button
                  type="button"
                  onClick={() => setSelectedBooklyStage("domain")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedBooklyStage === "domain"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">Stage 03 // Logic</div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    Domain &amp; Eloquent ORM
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    DB::transaction, Inventory Locks
                  </div>
                </button>

                {/* Stage 4 */}
                <button
                  type="button"
                  onClick={() => setSelectedBooklyStage("db")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedBooklyStage === "db"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">
                    Stage 04 // Storage
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    PostgreSQL 16 Engine
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    ACID Isolation, B-Tree Indexes
                  </div>
                </button>
              </div>

              {/* Stage Operational Contract Detail */}
              <div className="mt-3 p-4 rounded-brand border border-borderSubtle bg-surface">
                {selectedBooklyStage === "client" && (
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="text-primaryText font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gold" />
                      <span>
                        Client Execution Contract: Axios Interceptor &amp; Optimistic State
                      </span>
                    </div>
                    <p className="text-mutedText text-[11px] leading-relaxed">
                      All outgoing API requests automatically inject the `Authorization: Bearer
                      &lt;JWT&gt;` header from localStorage. Response interceptors handle automated
                      401 token refresh handshakes and dispatch optimistic UI updates on cart
                      checkout mutations.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-mutedText">
                      <span>
                        Latency Budget: <strong>0ms (client-side)</strong>
                      </span>
                      <span>
                        Recovery: <strong>Exponential Backoff + Toast Alert</strong>
                      </span>
                    </div>
                  </div>
                )}

                {selectedBooklyStage === "gateway" && (
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="text-primaryText font-semibold flex items-center gap-2">
                      <Lock className="h-4 w-4 text-gold" />
                      <span>Gateway &amp; Security Contract: Laravel tymon/jwt-auth</span>
                    </div>
                    <p className="text-mutedText text-[11px] leading-relaxed">
                      Verifies HMAC SHA-256 token signatures on incoming request envelopes. Rejects
                      unauthorized probes with structured `401 Unauthorized` JSON. Throttles
                      anomalous traffic spikes at 60 requests per minute per IP address.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-mutedText">
                      <span>
                        Latency Budget: <strong>8ms - 12ms</strong>
                      </span>
                      <span>
                        Recovery: <strong>Standardized HTTP 401 / 429 Error Envelope</strong>
                      </span>
                    </div>
                  </div>
                )}

                {selectedBooklyStage === "domain" && (
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="text-primaryText font-semibold flex items-center gap-2">
                      <Server className="h-4 w-4 text-gold" />
                      <span>
                        Domain Service Contract: DB::transaction &amp; Pessimistic Locking
                      </span>
                    </div>
                    <p className="text-mutedText text-[11px] leading-relaxed">
                      Order placements execute within an atomic `DB::transaction()` block. Acquires
                      pessimistic row-level locks (`SELECT ... FOR UPDATE`) on target book inventory
                      rows to guarantee zero race conditions during simultaneous high-concurrency
                      checkout bursts.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-mutedText">
                      <span>
                        Latency Budget: <strong>15ms - 22ms</strong>
                      </span>
                      <span>
                        Recovery: <strong>409 Conflict Stock Rollback</strong>
                      </span>
                    </div>
                  </div>
                )}

                {selectedBooklyStage === "db" && (
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="text-primaryText font-semibold flex items-center gap-2">
                      <Database className="h-4 w-4 text-gold" />
                      <span>Persistence Contract: PostgreSQL 16 ACID Compliance</span>
                    </div>
                    <p className="text-mutedText text-[11px] leading-relaxed">
                      Enforces full ACID transactional consistency with foreign-key cascades (`ON
                      DELETE CASCADE` for orders, `ON DELETE RESTRICT` for inventory). B-Tree
                      indexes on `books(isbn)` and `books(category_id)` allow sub-millisecond index
                      scan queries.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-mutedText">
                      <span>
                        Execution Speed: <strong>1.18ms Index Scan</strong>
                      </span>
                      <span>
                        Integrity: <strong>Foreign Key Referential Enforcement</strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Interactive PostgreSQL Relational Schema Ledger (ERD) */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold uppercase text-primaryText">
                  PostgreSQL Normalized Relational Schema (ERD Matrix)
                </span>
                <span className="font-mono text-[11px] text-gold">
                  Click foreign key tags to inspect relational constraints
                </span>
              </div>

              {activeFkRelationship && (
                <div className="mb-3 p-2.5 rounded-brand border border-gold bg-base font-mono text-[11px] text-primaryText flex items-center justify-between">
                  <span>
                    ACTIVE RELATIONSHIP CONSTRAINT:{" "}
                    <strong className="text-gold">{activeFkRelationship}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveFkRelationship(null)}
                    className="text-[10px] text-mutedText hover:text-primaryText underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {BOOKLY_TABLES.map((table) => {
                  const isHighlighted =
                    activeFkRelationship &&
                    (activeFkRelationship.includes(table.name) ||
                      table.columns.some(
                        (c) => c.ref && activeFkRelationship.includes(c.ref.split(".")[0] || ""),
                      ));

                  return (
                    <div
                      key={table.id}
                      className={`rounded-brand border p-3.5 transition-colors ${
                        isHighlighted ? "border-gold bg-surface" : "border-borderSubtle bg-base"
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-borderSubtle pb-2 mb-2">
                        <div className="font-mono text-xs font-bold text-primaryText flex items-center gap-1.5">
                          <Database className="h-3.5 w-3.5 text-gold" />
                          <span>{table.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-mutedText">{table.engine}</span>
                      </div>

                      <p className="font-body text-[11px] text-mutedText mb-3 leading-snug">
                        {table.description}
                      </p>

                      <div className="space-y-1 font-mono text-[10.5px]">
                        {table.columns.map((col) => (
                          <div
                            key={col.name}
                            className="flex items-center justify-between py-0.5 border-b border-borderSubtle/50"
                          >
                            <span className="text-primaryText font-medium">{col.name}</span>
                            <div className="flex items-center gap-1.5 tabular-nums">
                              <span className="text-mutedText">{col.type}</span>
                              {col.constraint === "PK" && (
                                <span className="rounded-[2px] bg-gold px-1 py-0.2 text-[9px] font-bold text-primaryText">
                                  PK
                                </span>
                              )}
                              {col.constraint === "FK" && col.ref && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveFkRelationship(
                                      `${table.name}.${col.name} -> ${col.ref} (ON DELETE CASCADE)`,
                                    )
                                  }
                                  className="rounded-[2px] bg-primaryText px-1 py-0.2 text-[9px] font-bold text-base hover:bg-gold hover:text-primaryText cursor-pointer"
                                >
                                  FK
                                </button>
                              )}
                              {col.constraint === "UNIQUE" && (
                                <span className="rounded-[2px] border border-borderSubtle px-1 py-0.2 text-[9px] text-mutedText">
                                  UQ
                                </span>
                              )}
                              {col.constraint === "INDEX" && (
                                <span className="rounded-[2px] border border-borderSubtle px-1 py-0.2 text-[9px] text-mutedText">
                                  IDX
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* BLUEPRINT 2: DIABETES EXPERT SYSTEM */}
          <TabsContent value="diabetes" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold uppercase text-primaryText">
                  Clinical Expert Decision Pipeline (Award Winner Norton 2026)
                </span>
                <span className="font-mono text-[11px] text-mutedText">
                  Bilingual forward-chaining clinical inference architecture
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedDiabetesStage("intake")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedDiabetesStage === "intake"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">
                    Stage 01 // Intake
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    Bilingual React Intake UI
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    FPG mg/dL, HbA1c %, Locale KM/EN
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDiabetesStage("rbac")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedDiabetesStage === "rbac"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">
                    Stage 02 // Security
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    JWT RBAC Policy Guard
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    Role Isolation: Patient vs Clinician
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDiabetesStage("inference")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedDiabetesStage === "inference"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">
                    Stage 03 // Inference
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    Expert Heuristic Engine
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    Forward-Chaining Rule Matching
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDiabetesStage("audit")}
                  className={`p-3 rounded-brand border text-left transition-colors cursor-pointer ${
                    selectedDiabetesStage === "audit"
                      ? "border-gold bg-surface text-primaryText"
                      : "border-borderSubtle bg-base text-mutedText hover:text-primaryText"
                  }`}
                >
                  <div className="font-mono text-[10px] text-gold uppercase">Stage 04 // Audit</div>
                  <div className="font-display font-bold text-xs text-primaryText mt-0.5">
                    Immutable Audit Ledger
                  </div>
                  <div className="font-mono text-[10px] text-mutedText mt-1">
                    Dual-Script Diagnosis Dispatch
                  </div>
                </button>
              </div>

              {/* Stage Detail */}
              <div className="mt-3 p-4 rounded-brand border border-borderSubtle bg-surface font-mono text-xs">
                {selectedDiabetesStage === "intake" && (
                  <p className="text-mutedText text-[11px] leading-relaxed">
                    Client validates input boundaries (FPG 40-400 mg/dL, HbA1c 3.0-16.0%) and
                    packages the intake telemetry with active locale preferences for immediate
                    bilingual response generation.
                  </p>
                )}
                {selectedDiabetesStage === "rbac" && (
                  <p className="text-mutedText text-[11px] leading-relaxed">
                    Evaluates JWT claims to prevent unauthorized health record queries. Clinicians
                    gain diagnostic modification rights; patients receive read-only translated
                    advisories.
                  </p>
                )}
                {selectedDiabetesStage === "inference" && (
                  <p className="text-mutedText text-[11px] leading-relaxed">
                    Applies forward-chaining rules against WHO and ADA clinical matrices. Resolves
                    conflicts by firing the highest-weighted specific critical rule (e.g.,
                    `RULE_GLUC_HBA1C_CRITICAL_04`).
                  </p>
                )}
                {selectedDiabetesStage === "audit" && (
                  <p className="text-mutedText text-[11px] leading-relaxed">
                    Stores complete input snapshots, matched rule identifiers, and resulting
                    recommendations in Khmer (ភាសាខ្មែរ) and English to ensure non-repudiable
                    medical auditing.
                  </p>
                )}
              </div>
            </div>

            {/* Relational Table View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DIABETES_TABLES.map((table) => (
                <div
                  key={table.id}
                  className="rounded-brand border border-borderSubtle bg-base p-3.5"
                >
                  <div className="flex items-center justify-between border-b border-borderSubtle pb-2 mb-2 font-mono text-xs font-bold text-primaryText">
                    <span>{table.name}</span>
                    <span className="text-mutedText text-[10px]">{table.engine}</span>
                  </div>
                  <p className="font-body text-[11px] text-mutedText mb-2.5">{table.description}</p>
                  <div className="space-y-1 font-mono text-[10.5px]">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex items-center justify-between py-0.5 border-b border-borderSubtle/50"
                      >
                        <span className="text-primaryText">{col.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-mutedText">{col.type}</span>
                          <span className="rounded-[2px] bg-card px-1 py-0.2 text-[9px] text-gold font-bold">
                            {col.constraint}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* BLUEPRINT 3: LOOMORA & DRIVING RULES */}
          <TabsContent value="sync" className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Loomora */}
              <div className="rounded-brand border border-borderSubtle bg-base p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-borderSubtle pb-2">
                  <div className="font-mono text-xs font-bold text-primaryText">
                    Loomora Habit State Synchronizer
                  </div>
                  <span className="font-mono text-[10px] text-gold">OFFLINE-FIRST</span>
                </div>
                <p className="font-body text-xs text-mutedText leading-relaxed">
                  Full-stack architecture prioritizing zero-latency completion check-offs with
                  deterministic cloud synchronization.
                </p>
                <div className="space-y-2 font-mono text-[11px] text-primaryText">
                  <div className="p-2 rounded-[2px] bg-surface border border-borderSubtle">
                    1. <strong>Optimistic Client Mutate:</strong> Local state toggles in 0ms with
                    local storage persistence.
                  </div>
                  <div className="p-2 rounded-[2px] bg-surface border border-borderSubtle">
                    2. <strong>Background Sync Queue:</strong> Dispatches idempotent POST payloads
                    with UTC client timestamps.
                  </div>
                  <div className="p-2 rounded-[2px] bg-surface border border-borderSubtle">
                    3. <strong>Timezone Normalization:</strong> Reconciles calendar day borders
                    against Asia/Phnom_Penh (UTC+7).
                  </div>
                </div>
              </div>

              {/* Driving Rules */}
              <div className="rounded-brand border border-borderSubtle bg-base p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-borderSubtle pb-2">
                  <div className="font-mono text-xs font-bold text-primaryText">
                    Cambodian Driving Theory Engine
                  </div>
                  <span className="font-mono text-[10px] text-gold">FLUTTER DART WEB</span>
                </div>
                <p className="font-body text-xs text-mutedText leading-relaxed">
                  High-efficiency client-side state machine for evaluating Cambodian Road Traffic
                  Law 2015 test scenarios.
                </p>
                <div className="space-y-2 font-mono text-[11px] text-primaryText">
                  <div className="p-2 rounded-[2px] bg-surface border border-borderSubtle">
                    1. <strong>Embedded Question Store:</strong> Instant zero-network assessment
                    from local bundle.
                  </div>
                  <div className="p-2 rounded-[2px] bg-surface border border-borderSubtle">
                    2. <strong>Frame Budget:</strong> 1.4ms execution time well within the 16.6ms
                    60fps frame constraint.
                  </div>
                  <div className="p-2 rounded-[2px] bg-surface border border-borderSubtle">
                    3. <strong>Pass/Fail Ledger:</strong> Live threshold tracking (35/40 cutoff)
                    with category weakness analysis.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default SystemTopologyModal;
