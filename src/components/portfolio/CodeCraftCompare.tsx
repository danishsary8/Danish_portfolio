import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Database,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Lock,
} from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

export interface CodeCraftDomain {
  id: string;
  domainName: string;
  badge: string;
  subtitle: string;
  naive: {
    title: string;
    description: string;
    code: string;
    flaws: string[];
  };
  production: {
    title: string;
    description: string;
    code: string;
    advantages: string[];
  };
}

export const CODE_CRAFT_DOMAINS: CodeCraftDomain[] = [
  {
    id: "security",
    domainName: "REST API Security & RBAC",
    badge: "BACKEND // LARAVEL 11",
    subtitle: "Input sanitization, FormRequest contracts, and stateless JWT token scoping",
    naive: {
      title: "Common Junior Anti-Pattern (Vulnerable)",
      description:
        "Blind mass assignment via raw request payloads, dynamic SQL interpolation, and un-scoped route parameters.",
      code: `// NAIVE CONTROLLER: Insecure & Unvalidated
public function updateOrder(Request $request, $id) {
    // ⚠️ Mass assignment vulnerability (overwriting status, price)
    $order = Order::find($id);
    $order->update($request->all());

    // ⚠️ Raw SQL injection vector
    $items = DB::select("SELECT * FROM items WHERE order_id = " . $id);

    return response()->json($order);
}`,
      flaws: [
        "Mass-assignment vulnerability: permits malicious users to overwrite order totals or admin status",
        "Raw SQL string concatenation opens direct injection vector",
        "No role verification guard: any authenticated user can mutate arbitrary order records",
      ],
    },
    production: {
      title: "Sary Danish's Production Standard (Implemented in Bookly)",
      description:
        "Strict FormRequest validation rules, parameterized query builders, and stateless JWT role-gated policies.",
      code: `// PRODUCTION: Bookly FormRequest + Policy + Parameterized Binding
class UpdateOrderRequest extends FormRequest {
    public function authorize(): bool {
        // Enforce RBAC: Only customer owner or staff role permitted
        return $this->user()->can('update', $this->route('order'));
    }

    public function rules(): array {
        return [
            'status' => ['required', Rule::in(['pending', 'processing', 'completed'])],
            'shipping_address' => ['required', 'string', 'max:500'],
        ];
    }
}

// Controller: Typed DTO extraction with parameterized binding
public function update(UpdateOrderRequest $request, Order $order): JsonResponse {
    $validated = $request->validated();
    
    $order->update([
        'status' => $validated['status'],
        'shipping_address' => $validated['shipping_address'],
    ]);

    return response()->json([
        'success' => true,
        'data' => new OrderResource($order),
    ], Response::HTTP_OK);
}`,
      advantages: [
        "FormRequest validation encapsulates validation rules before controller entry",
        "JWT RBAC Policy guards verify cryptographic ownership and roles",
        "Deterministic JSON API envelopes ensure contract consistency across web and mobile clients",
      ],
    },
  },
  {
    id: "database",
    domainName: "Relational Integrity & Concurrency",
    badge: "DATA // POSTGRESQL 16",
    subtitle: "ACID transaction boundaries, row-level locks, and N+1 query elimination",
    naive: {
      title: "Common Junior Anti-Pattern (Vulnerable)",
      description:
        "Application-level loop queries, missing database transactions, and race-condition stock decrements.",
      code: `// NAIVE ORDER CHECKOUT: Race Conditions & N+1 Bottleneck
public function checkout(Request $request) {
    $books = [];
    foreach ($request->item_ids as $id) {
        // ⚠️ N+1 Query: Fires separate SELECT query inside every loop iteration
        $books[] = Book::find($id); 
    }

    // ⚠️ Race condition: Concurrent checkouts oversell negative inventory
    foreach ($books as $book) {
        if ($book->stock > 0) {
            $book->decrement('stock', 1);
        }
    }
}`,
      flaws: [
        "N+1 Eloquent loop generates 50+ network roundtrips for a cart of 50 books",
        "Zero transaction boundary: partial server crash leaves cart charged without decrementing stock",
        "No pessimistic locking allows concurrent users to simultaneously decrement the last stock item",
      ],
    },
    production: {
      title: "Sary Danish's Production Standard (Implemented in Bookly)",
      description:
        "Atomic DB::transaction(), pessimistic SELECT FOR UPDATE locks, and eager-loaded relations.",
      code: `// PRODUCTION: Atomic Transaction + Pessimistic Row Lock
public function checkout(CheckoutDTO $dto): Order {
    return DB::transaction(function () use ($dto) {
        // 1. Eager load with row-level pessimistic lock preventing oversell
        $books = Book::whereIn('id', $dto->bookIds())
            ->lockForUpdate()
            ->get()
            ->keyBy('id');

        // 2. Validate inventory inside lock boundary
        foreach ($dto->items as $item) {
            $book = $books->get($item['book_id']);
            if (!$book || $book->stock_count < $item['quantity']) {
                throw new InsufficientStockException("Stock unavailable: {$book->title}");
            }
            $book->decrement('stock_count', $item['quantity']);
        }

        // 3. Atomically persist order and child relations
        return Order::createWithItems($dto, $books);
    }, attempts: 3);
}`,
      advantages: [
        "DB::transaction() ensures atomic commit or complete rollback on any exception",
        "Pessimistic lockForUpdate() prevents inventory overselling during high-concurrency checkouts",
        "Eager query loading eliminates N+1 query thrashing, executing in a single bounded SQL query",
      ],
    },
  },
  {
    id: "typescript",
    domainName: "Frontend Type Safety & State",
    badge: "FRONTEND // REACT 19 + TS",
    subtitle: "Discriminated unions, immutable state pipelines, and optimistic rollback",
    naive: {
      title: "Common Junior Anti-Pattern (Vulnerable)",
      description:
        "any types everywhere, uncancelled async effects, unhandled error cases, and layout-shifting loading spinners.",
      code: `// NAIVE COMPONENT: Untyped & Race-Condition Prone
export function HabitTracker() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // ⚠️ Race condition: uncancelled promise overwrites newer filter state
        fetch('/api/habits').then(res => res.json()).then(res => {
            setData(res);
            setLoading(false);
        });
    }, []);

    // ⚠️ Runtime crash if data is null or unexpected shape
    return <div>{data.items.map((i: any) => <span>{i.name}</span>)}</div>;
}`,
      flaws: [
        "any typing bypasses static compile-time safety and causes runtime undefined errors",
        "Uncancelled async fetch creates network race conditions on component re-render",
        "Lack of discriminated union state forces manual, error-prone boolean flag management",
      ],
    },
    production: {
      title: "Sary Danish's Production Standard (Implemented in Loomora & Portfolio)",
      description:
        "Strict TypeScript interfaces, discriminated unions, AbortController cancellation, and optimistic commits.",
      code: `// PRODUCTION: Discriminated Union State with Optimistic Commits
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T; isOptimistic?: boolean }
  | { status: 'error'; error: AppError };

export function useHabitSchedule(category: HabitCategory) {
    const [state, setState] = useState<AsyncState<HabitSchedule>>({ status: 'idle' });

    useEffect(() => {
        const controller = new AbortController();
        setState({ status: 'loading' });

        fetchHabitSchedule(category, controller.signal)
            .then(data => setState({ status: 'success', data }))
            .catch(err => {
                if (!controller.signal.aborted) {
                    setState({ status: 'error', error: normalizeError(err) });
                }
            });

        return () => controller.abort();
    }, [category]);

    return state;
}`,
      advantages: [
        "Discriminated union guarantees the compiler forbids accessing data unless status === 'success'",
        "AbortController automatically cancels obsolete network requests during fast category switching",
        "Strong type safety ensures deterministic refactoring across large full-stack codebases",
      ],
    },
  },
  {
    id: "ergonomics",
    domainName: "Editorial UI & Motion Ergonomics",
    badge: "UI/UX // ARCHITECTURAL CRAFT",
    subtitle: "Swiss architectural grid, WCAG AA/AAA contrast, and Emil Kowalski motion physics",
    naive: {
      title: "Common Junior Anti-Pattern (Vulnerable)",
      description:
        "Generic AI glassmorphism, rainbow gradients, pill buttons, and layout-triggering height/width animations.",
      code: `/* NAIVE CSS: Layout Thrashing & Generic AI Clutter */
.generic-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px); /* ⚠️ High GPU memory churn */
    border-radius: 9999px; /* ⚠️ Pill shape on non-indicator controls */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); /* ⚠️ Heavy resting drop shadow */
    transition: all 0.5s ease-in; /* ⚠️ Animates layout properties */
}

.generic-card:hover {
    height: 400px; /* ⚠️ Triggers reflow / layout thrash */
    background: linear-gradient(135deg, #6366f1, #ec4899); /* ⚠️ AI rainbow gradient */
}`,
      flaws: [
        "Animating height/width triggers costly browser layout reflows, causing stutter and frame drops",
        "Resting heavy drop shadows and glassmorphic blur violate authentic architectural design principles",
        "Pill buttons (`rounded-full`) and gradient text look like generic copy-paste templates",
      ],
    },
    production: {
      title: "Sary Danish's Production Standard (This Portfolio's Constitution)",
      description:
        "Swiss broadsheet grid, flat archival color tokens, and Emil Kowalski hardware-accelerated motion.",
      code: `/* PRODUCTION: Swiss Architectural Broadsheet + Kowalski Physics */
:root {
    --bg-base: #f5f0e8;       /* Archival parchment cream */
    --text-primary: #0a0a0a;  /* High-contrast near-black ink */
    --accent-gold: #c9973a;   /* Spec gold beacon */
    --radius-brand: 3px;      /* Sharp architectural corners */
}

/* Hardware-accelerated transforms only (translate3d, scale, opacity) */
.broadsheet-card {
    border: 1px solid var(--border-subtle);
    background-color: var(--bg-card);
    border-radius: var(--radius-brand);
    box-shadow: none; /* Zero resting drop shadows */
    will-change: transform, opacity;
    transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1),
                border-color 150ms ease-out;
}`,
      advantages: [
        "Strictly animates transform and opacity for guaranteed 60fps across all devices",
        "Accessible 15.2:1 contrast ratio surpasses WCAG AAA standards for reading clarity",
        "Non-negotiable Anti-AI Constitution guarantees high-craft editorial presence",
      ],
    },
  },
];

export function CodeCraftCompare() {
  const [activeDomainId, setActiveDomainId] = useState<string>("security");
  const shouldReduceMotion = useReducedMotion();

  const activeDomain =
    CODE_CRAFT_DOMAINS.find((d) => d.id === activeDomainId) || CODE_CRAFT_DOMAINS[0]!;

  return (
    <div
      id="code-craft-matrix"
      className="border-t border-borderSubtle bg-base transition-colors duration-150"
    >
      {/* Header Banner */}
      <div className="p-6 sm:p-10 lg:p-12 border-b border-borderSubtle bg-surface/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="font-mono text-[11px] text-mutedText uppercase tracking-wider flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
              <span>CODE HYGIENE, SECURITY &amp; ARCHITECTURAL RESILIENCE</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-primaryText uppercase tracking-editorial leading-tight">
              Production Engineering Craft vs. Common Anti-Patterns
            </h3>
            <p className="font-body text-mutedText text-sm sm:text-base max-w-3xl leading-relaxed">
              Evaluating a software developer requires inspecting code hygiene, security hardening,
              and query performance. Review the architectural specifications below to compare common
              vulnerable approaches against my production standards.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-mutedText shrink-0 border border-borderSubtle bg-card px-3 py-1.5 rounded-brand">
            <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>VERIFIED STANDARDS // 4 DOMAINS</span>
          </div>
        </div>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="border-b border-borderSubtle bg-surface/20 overflow-x-auto">
        <div
          role="tablist"
          aria-label="Engineering Quality Domains"
          className="flex items-stretch divide-x divide-borderSubtle min-w-max"
        >
          {CODE_CRAFT_DOMAINS.map((domain) => {
            const isActive = domain.id === activeDomain.id;
            return (
              <button
                key={domain.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveDomainId(domain.id)}
                className={`group flex items-center gap-3 px-5 py-4 text-left font-mono text-xs transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "bg-card text-primaryText font-semibold border-b-2 border-b-gold"
                    : "text-mutedText hover:bg-surface hover:text-primaryText"
                }`}
              >
                <div
                  className={`grid h-6 w-6 place-items-center rounded-[2px] border text-[10px] font-bold ${
                    isActive
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-borderSubtle bg-surface text-mutedText group-hover:border-gold"
                  }`}
                >
                  {domain.id === "security" && "01"}
                  {domain.id === "database" && "02"}
                  {domain.id === "typescript" && "03"}
                  {domain.id === "ergonomics" && "04"}
                </div>
                <div>
                  <span className="block text-[10px] text-gold uppercase">{domain.badge}</span>
                  <span className="font-semibold text-primaryText">{domain.domainName}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Domain Overview Banner */}
      <div className="px-6 sm:px-10 py-3 border-b border-borderSubtle bg-surface/30 font-mono text-xs text-mutedText flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-primaryText uppercase">{activeDomain.domainName}:</span>
          <span>{activeDomain.subtitle}</span>
        </div>
        <kbd className="rounded-[2px] border border-borderSubtle bg-card px-1.5 py-0.5 text-[10px] text-mutedText">
          G+X TO JUMP HERE
        </kbd>
      </div>

      {/* Two-Column Side-by-Side Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-borderSubtle">
        {/* Left Column: Naive / Vulnerable Implementation */}
        <motion.div
          key={`${activeDomain.id}-naive`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="p-6 sm:p-8 lg:p-10 space-y-6 bg-base"
        >
          <div className="flex items-center justify-between border-b border-borderSubtle pb-3 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 text-destructive font-bold uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span>COMMON JUNIOR ANTI-PATTERN</span>
            </span>
            <span className="text-[10px] text-mutedText uppercase">[REJECTED]</span>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-primaryText mb-1.5">
              {activeDomain.naive.title}
            </h4>
            <p className="font-body text-xs sm:text-sm text-mutedText leading-relaxed">
              {activeDomain.naive.description}
            </p>
          </div>

          {/* Naive Code Snippet Container */}
          <div className="rounded-brand border border-borderSubtle bg-surface overflow-hidden">
            <div className="border-b border-borderSubtle bg-card px-4 py-2 font-mono text-[10px] text-mutedText flex items-center justify-between">
              <span className="text-destructive font-medium">VULNERABLE_IMPLEMENTATION.php</span>
              <span>INSECURE</span>
            </div>
            <pre className="p-4 font-mono text-[11px] leading-relaxed text-primaryText overflow-x-auto max-h-[300px]">
              {activeDomain.naive.code}
            </pre>
          </div>

          {/* Flaws Breakdown */}
          <div className="pt-4 border-t border-borderSubtle space-y-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block">
              IDENTIFIED SECURITY &amp; ARCHITECTURAL RISKS:
            </span>
            <ul className="space-y-2">
              {activeDomain.naive.flaws.map((flaw, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-body text-mutedText">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-destructive mt-1.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{flaw}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Sary Danish's Production Standard */}
        <motion.div
          key={`${activeDomain.id}-production`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="p-6 sm:p-8 lg:p-10 space-y-6 bg-card/40"
        >
          <div className="flex items-center justify-between border-b border-borderSubtle pb-3 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 text-gold font-bold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>SARY DANISH'S PRODUCTION STANDARD</span>
            </span>
            <span className="text-[10px] text-gold uppercase">[VERIFIED IN PRODUCTION]</span>
          </div>

          <div>
            <h4 className="font-display text-xl font-bold text-primaryText mb-1.5">
              {activeDomain.production.title}
            </h4>
            <p className="font-body text-xs sm:text-sm text-mutedText leading-relaxed">
              {activeDomain.production.description}
            </p>
          </div>

          {/* Production Code Snippet Container */}
          <div className="rounded-brand border border-gold/40 bg-card overflow-hidden">
            <div className="border-b border-borderSubtle bg-base px-4 py-2 font-mono text-[10px] text-mutedText flex items-center justify-between">
              <span className="text-gold font-bold">PRODUCTION_HARDENED_CONTRACT.php</span>
              <span className="text-gold">PASSES AUDIT</span>
            </div>
            <pre className="p-4 font-mono text-[11px] leading-relaxed text-primaryText overflow-x-auto max-h-[300px]">
              {activeDomain.production.code}
            </pre>
          </div>

          {/* Advantages Breakdown */}
          <div className="pt-4 border-t border-borderSubtle space-y-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block">
              PRODUCTION ARCHITECTURAL ADVANTAGES:
            </span>
            <ul className="space-y-2">
              {activeDomain.production.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-body text-primaryText">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
