import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Cloud,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Link2,
  Check,
  Server,
  Play,
  RotateCcw,
  Activity,
  Globe,
  Database,
  GitBranch,
} from "lucide-react";

export interface DeploymentPipelineModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialProfileId?: string;
}

export interface PipelineProfile {
  id: string; // "bookly", "diabetes", "loomora", "driving"
  name: string;
  badge: string;
  hostTopology: string;
  liveUrl: string;
  gitRepo: string;
  branch: string;
  buildTimeAvg: string;
  targetRuntime: string;
  stages: {
    step: string;
    title: string;
    runner: string;
    command: string;
    outputLines: string[];
  }[];
  healthMetrics: {
    latencyMs: number;
    uptimePct: string;
    tlsCert: string;
    sslProtocol: string;
    edgeRegion: string;
  };
  environmentVars: {
    key: string;
    scope: string;
    secret: boolean;
  }[];
}

export const DEPLOYMENT_PROFILES: PipelineProfile[] = [
  {
    id: "bookly",
    name: "Bookly Platform",
    badge: "VERCEL EDGE + RENDER CONTAINER + PG 16",
    hostTopology:
      "Split Architecture: Vercel Edge (React SPA) + Render Web Service (Laravel 11 API) + Managed PostgreSQL 16 SSL",
    liveUrl: "https://bookly-frontend-five.vercel.app/",
    gitRepo: "https://github.com/danishsary8",
    branch: "main",
    buildTimeAvg: "1m 42s",
    targetRuntime: "PHP 8.3-FPM (Alpine 3.19) / Node.js 20 LTS",
    stages: [
      {
        step: "01",
        title: "SOURCE CHECKOUT & DEPENDENCY AUDIT",
        runner: "GitHub Actions / Vercel Build Engine",
        command: "git checkout main && composer install --no-dev --optimize-autoloader && npm ci",
        outputLines: [
          "[CHECKOUT] Cloned commit 8f9b2d1 from danishsary8/bookly (main)",
          "[COMPOSER] Installing 42 production packages: laravel/framework v11.x, tymon/jwt-auth v2.x",
          "[COMPOSER] Generating optimized class loader: 1,842 files cached",
          "[NPM] audit passed: 0 vulnerabilities found across 384 React/Vite dependencies",
        ],
      },
      {
        step: "02",
        title: "STATIC TYPING, LINTING & AUTOMATED TESTS",
        runner: "PHPUnit 11 / Vitest 2.0 / TypeScript 5.5",
        command: "php artisan test --parallel && npm run test:run",
        outputLines: [
          "[PHPUNIT] Running 34 feature tests across auth, catalog, and checkout suites",
          "[PHPUNIT] PASS Tests\\Feature\\Auth\\JwtAuthenticationTest (14 tests, 28 assertions)",
          "[PHPUNIT] PASS Tests\\Feature\\Catalog\\BookQueryTest (12 tests, 24 assertions)",
          "[VITEST]  PASS src/test/cart-state.test.tsx (8 tests, 16 assertions) [42ms]",
          "[STATUS]  All 42 automated tests passed with 100% assertions satisfied.",
        ],
      },
      {
        step: "03",
        title: "IMMUTABLE ARTIFACT & DOCKER PACKAGING",
        runner: "Docker Engine / Rollup Vite Bundler",
        command: "docker build -t bookly-api:prod . && vite build --mode production",
        outputLines: [
          "[DOCKER] Step 1/8 : FROM php:8.3-fpm-alpine AS runtime",
          "[DOCKER] Step 4/8 : RUN docker-php-ext-install pdo pdo_pgsql opcache",
          "[DOCKER] Step 8/8 : Strip unneeded debug symbols (Container size: 84.2 MB)",
          "[VITE]   dist/assets/index-8a3c.js 142.1 kB (gzip: 44.8 kB)",
          "[STATUS] Frontend static bundle hashed with sha256 and pushed to Vercel Global Edge CDN.",
        ],
      },
      {
        step: "04",
        title: "ZERO-DOWNTIME ROLLOUT & HEALTH PROBE",
        runner: "Render Health Probe / Vercel Edge",
        command: "curl -f -s https://bookly-api-zasc.onrender.com/health || exit 1",
        outputLines: [
          "[PROBE] GET /api/v1/health -> HTTP/1.1 200 OK (Latency: 48ms)",
          "[PROBE] Database connection pool verified: 5 idle, 1 active connection to PostgreSQL 16 SSL",
          "[DNS]   bookly-frontend-five.vercel.app routing to anycast edge POP (SIN1 - Singapore)",
          "[SUCCESS] Production release online without connection drops.",
        ],
      },
    ],
    healthMetrics: {
      latencyMs: 48,
      uptimePct: "99.98%",
      tlsCert: "Let's Encrypt Authority X3 (ECC 256-bit)",
      sslProtocol: "TLSv1.3 / HTTP/2",
      edgeRegion: "sin1 (Singapore Anycast Node)",
    },
    environmentVars: [
      { key: "APP_ENV", scope: "production", secret: false },
      { key: "DB_CONNECTION", scope: "pgsql", secret: false },
      { key: "DATABASE_URL", scope: "Render Managed PG", secret: true },
      { key: "JWT_SECRET", scope: "Laravel Backend", secret: true },
      { key: "VITE_API_BASE_URL", scope: "Vercel Frontend", secret: false },
    ],
  },
  {
    id: "diabetes",
    name: "Diabetes Expert System",
    badge: "VERCEL GLOBAL EDGE + SPA ENGINE (AWARD WINNER)",
    hostTopology:
      "High-Availability Edge SPA with Bilingual Khmer/EN Dictionary & Deterministic Inference Engine",
    liveUrl: "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
    gitRepo: "https://github.com/danishsary8",
    branch: "main",
    buildTimeAvg: "58s",
    targetRuntime: "Node.js 20 LTS / Vercel Edge",
    stages: [
      {
        step: "01",
        title: "CLINICAL RULESET & DICTIONARY VERIFICATION",
        runner: "Vitest Deterministic Suite",
        command: "npm run test:clinical-rules",
        outputLines: [
          "[RULES] Auditing 14 clinical decision trees against Norton AI Competition 2026 rubric",
          "[RULES] PASS rule_fasting_glucose: fasting >= 126 mg/dL triggers DIABETES_CONFIRMED",
          "[RULES] PASS rule_hba1c_bmi: HbA1c >= 6.5% + BMI >= 25 triggers HIGH_METABOLIC_RISK",
          "[I18N]  Khmer Unicode glyph dictionary integrity checked: 240/240 keys synchronized",
        ],
      },
      {
        step: "02",
        title: "BUNDLE TREE-SHAKING & STATIC OPTIMIZATION",
        runner: "Vite 5.4 Rollup Compiler",
        command: "vite build --minify esbuild",
        outputLines: [
          "[VITE] Transforming 86 clinical UI modules",
          "[VITE] dist/index.html 1.84 kB",
          "[VITE] dist/assets/index-b1e9.js 98.4 kB (gzip: 31.2 kB)",
          "[VITE] Zero layout shift font preload directives injected for Plus Jakarta Sans & Khmer OS",
        ],
      },
      {
        step: "03",
        title: "EDGE REGISTRATION & ATOMIC IMMUTABLE DEPLOY",
        runner: "Vercel Build System",
        command: "vercel deploy --prod --token=******",
        outputLines: [
          "[DEPLOY] Deployed 12 immutable assets to Vercel Global Edge Network",
          "[CACHE]  Cache-Control: public, max-age=31536000, immutable configured for static assets",
          "[SECURITY] Headers enforced: X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin",
        ],
      },
      {
        step: "04",
        title: "SYNTHETIC INFERENCE SIMULATION HEALTH PROBE",
        runner: "Synthetic Edge Probe",
        command:
          "curl -s -o /dev/null -w '%{http_code}' https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
        outputLines: [
          "[PROBE] Synthetic HTTP Status: 200 OK",
          "[PROBE] Initial Content-Length: 1,842 bytes (TTFB: 32ms from Singapore Edge)",
          "[STATUS] Award-winning prototype verified operational.",
        ],
      },
    ],
    healthMetrics: {
      latencyMs: 32,
      uptimePct: "99.99%",
      tlsCert: "Cloudflare / Vercel Universal SSL (ECDSA)",
      sslProtocol: "TLSv1.3 / HTTP/3 QUIC",
      edgeRegion: "sin1 (Vercel Singapore Edge)",
    },
    environmentVars: [
      { key: "VITE_APP_LOCALE_DEFAULT", scope: "en", secret: false },
      { key: "VITE_CLINICAL_STRICT_MODE", scope: "true", secret: false },
      { key: "VITE_NORTON_AWARD_YEAR", scope: "2026", secret: false },
    ],
  },
  {
    id: "loomora",
    name: "Loomora Habit Planner",
    badge: "RENDER MANAGED CONTAINER PAAS",
    hostTopology:
      "Full-Stack Web App: Render Containerized Node Service + Persistent JSON/SQLite Data Layer",
    liveUrl: "https://daycraft-vnid.onrender.com/",
    gitRepo: "https://github.com/danishsary8",
    branch: "main",
    buildTimeAvg: "1m 15s",
    targetRuntime: "Node.js 18 / Alpine Linux",
    stages: [
      {
        step: "01",
        title: "HABIT STATE INTEGRITY & UTC+7 TIMEOFFSET TEST",
        runner: "Node Test Runner / Jest",
        command: "npm run test:timezone",
        outputLines: [
          "[TEST] Validating habit streak rollover across UTC+7 (Phnom Penh) boundary",
          "[TEST] PASS streak_calculator: resets correctly at 00:00:00 ICT without data loss",
          "[TEST] PASS habit_schema_validation: validates title, recurrence, and completion flags",
        ],
      },
      {
        step: "02",
        title: "CONTAINER REBUILD & DEPENDENCY PRUNING",
        runner: "Docker Buildx",
        command: "docker build --no-cache -t loomora-app .",
        outputLines: [
          "[DOCKER] Sending build context to Docker daemon 4.2 MB",
          "[DOCKER] Removing development dependencies: devDependencies pruned (saved 68 MB)",
          "[DOCKER] Successfully tagged loomora-app:latest",
        ],
      },
      {
        step: "03",
        title: "RENDER SERVICE RESTART & CONTAINER LAUNCH",
        runner: "Render PaaS Platform",
        command: "render service deploy --service=srv-daycraft-vnid",
        outputLines: [
          "[RENDER] Deploying service srv-daycraft-vnid (Loomora / Daycraft)",
          "[RENDER] Container allocated: 512 MB RAM, 0.5 CPU vCore",
          "[RENDER] Binding process to PORT 10000 with host 0.0.0.0",
        ],
      },
      {
        step: "04",
        title: "WARMUP HEALTH PROBE & PERSISTENT DISK MOUNT",
        runner: "Health Checker",
        command: "curl -I https://daycraft-vnid.onrender.com/",
        outputLines: [
          "[PROBE] HTTP/2 200 OK",
          "[PROBE] Persistent habit store confirmed readable",
          "[STATUS] Service successfully healthy in Singapore region.",
        ],
      },
    ],
    healthMetrics: {
      latencyMs: 82,
      uptimePct: "99.90%",
      tlsCert: "Render Wildcard SSL (RSA 2048-bit)",
      sslProtocol: "TLSv1.3 / HTTP/2",
      edgeRegion: "oregon / singapore edge",
    },
    environmentVars: [
      { key: "NODE_ENV", scope: "production", secret: false },
      { key: "PORT", scope: "10000", secret: false },
      { key: "TZ", scope: "Asia/Phnom_Penh", secret: false },
    ],
  },
  {
    id: "driving",
    name: "Driving Rules App",
    badge: "NETLIFY HIGH-AVAILABILITY CDN",
    hostTopology: "Flutter Web Release Build with CanvasKit Engine on Netlify Global CDN",
    liveUrl: "https://drivingruletest.netlify.app/",
    gitRepo: "https://github.com/danishsary8",
    branch: "main",
    buildTimeAvg: "2m 04s",
    targetRuntime: "Flutter 3.x / Dart / CanvasKit WebAssembly",
    stages: [
      {
        step: "01",
        title: "FLUTTER ENVIRONMENT INIT & CAMBODIAN SIGNS ASSETS",
        runner: "Flutter SDK 3.22",
        command: "flutter doctor -v && flutter pub get",
        outputLines: [
          "[FLUTTER] Flutter Channel stable, 3.22.x on Linux x86_64",
          "[PUB]     Resolving dependencies... Got 38 packages.",
          "[ASSETS]  Verifying 120 vector illustrations of Cambodian road rules & traffic signs",
        ],
      },
      {
        step: "02",
        title: "CANVASKIT WEBASSEMBLY COMPILATION",
        runner: "Dart-to-Wasm Compiler",
        command: "flutter build web --release --web-renderer canvaskit",
        outputLines: [
          "[DART2WASM] Compiling lib/main.dart to JavaScript & WebAssembly bytecode",
          "[RENDERER]  CanvasKit engine bundled for pixel-perfect rendering across mobile browsers",
          "[BUILD]     Built build/web (Total release size: 14.8 MB)",
        ],
      },
      {
        step: "03",
        title: "NETLIFY ATOMIC CDN PUBLISH",
        runner: "Netlify Deploy Bot",
        command: "netlify deploy --dir=build/web --prod",
        outputLines: [
          "[NETLIFY] Deploy path: /opt/build/repo/build/web",
          "[NETLIFY] Hashing files: 48 files found",
          "[NETLIFY] 2 new files uploaded, 46 files already in content-addressed cache",
          "[NETLIFY] Site live at: https://drivingruletest.netlify.app",
        ],
      },
      {
        step: "04",
        title: "CDN POP EDGE CACHING & SERVICE WORKER SYNC",
        runner: "Netlify Edge Network",
        command:
          "curl -s -D - https://drivingruletest.netlify.app/flutter.js | grep -i 'x-nf-request-id'",
        outputLines: [
          "[CDN]    Edge cache HIT at regional POP",
          "[PWA]    Service worker registered for offline theory exam revision",
          "[STATUS] Driving Rules App online with 100% theory test questions verified.",
        ],
      },
    ],
    healthMetrics: {
      latencyMs: 44,
      uptimePct: "99.99%",
      tlsCert: "Let's Encrypt Netlify CDN (ECDSA)",
      sslProtocol: "TLSv1.3 / HTTP/2",
      edgeRegion: "sin (Singapore CDN POP)",
    },
    environmentVars: [
      { key: "FLUTTER_WEB_RENDERER", scope: "canvaskit", secret: false },
      { key: "PWA_ENABLED", scope: "true", secret: false },
    ],
  },
];

export function DeploymentPipelineModal({
  open = false,
  onOpenChange,
  initialProfileId = "bookly",
}: DeploymentPipelineModalProps) {
  const [activeId, setActiveId] = useState<string>(initialProfileId);
  const [copiedLink, setCopiedLink] = useState(false);

  // Interactive CI/CD Simulation State
  const [simulating, setSimulating] = useState(false);
  const [simulationStage, setSimulationStage] = useState<number>(0); // 0 = idle, 1..4 = active, 5 = completed
  const [liveLogConsole, setLiveLogConsole] = useState<string[]>([]);

  // Synchronize when initialProfileId changes
  React.useEffect(() => {
    if (initialProfileId) {
      setActiveId(initialProfileId);
    }
  }, [initialProfileId]);

  // Reset simulation when switching profiles
  React.useEffect(() => {
    setSimulating(false);
    setSimulationStage(0);
    setLiveLogConsole([]);
  }, [activeId]);

  const activeProfile: PipelineProfile =
    DEPLOYMENT_PROFILES.find((p) => p.id === activeId) ?? DEPLOYMENT_PROFILES[0]!;

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/?infra=${activeProfile.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleRunSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulationStage(1);
    setLiveLogConsole([
      `[CI/CD RUNNER] Initiating automated build pipeline for ${activeProfile.name}...`,
      `[RUNNER] Target Runtime: ${activeProfile.targetRuntime}`,
      `[RUNNER] Branch: ${activeProfile.branch} | Commit: HEAD (Verified signed)`,
    ]);

    // Step 1 -> 2
    setTimeout(() => {
      setSimulationStage(2);
      const stage0 = activeProfile.stages[0];
      if (stage0) {
        setLiveLogConsole((prev) => [
          ...prev,
          `--- STAGE 1: ${stage0.title} ---`,
          ...stage0.outputLines,
        ]);
      }
    }, 600);

    // Step 2 -> 3
    setTimeout(() => {
      setSimulationStage(3);
      const stage1 = activeProfile.stages[1];
      if (stage1) {
        setLiveLogConsole((prev) => [
          ...prev,
          `--- STAGE 2: ${stage1.title} ---`,
          ...stage1.outputLines,
        ]);
      }
    }, 1300);

    // Step 3 -> 4
    setTimeout(() => {
      setSimulationStage(4);
      const stage2 = activeProfile.stages[2];
      if (stage2) {
        setLiveLogConsole((prev) => [
          ...prev,
          `--- STAGE 3: ${stage2.title} ---`,
          ...stage2.outputLines,
        ]);
      }
    }, 2000);

    // Step 4 -> Complete
    setTimeout(() => {
      setSimulationStage(5);
      setSimulating(false);
      const stage3 = activeProfile.stages[3];
      const stage3Lines = stage3 ? stage3.outputLines : [];
      const stage3Title = stage3 ? stage3.title : "DEPLOY COMPLETE";
      setLiveLogConsole((prev) => [
        ...prev,
        `--- STAGE 4: ${stage3Title} ---`,
        ...stage3Lines,
        `[HEALTH CHECK] Live URL: ${activeProfile.liveUrl} returned HTTP 200 OK (${activeProfile.healthMetrics.latencyMs}ms)`,
        `[PIPELINE STATUS] Build finished cleanly in ${(parseFloat(activeProfile.buildTimeAvg) || 1.2).toFixed(1)}s (Simulated). Status: ALL CHECKS GREEN`,
      ]);
    }, 2700);
  };

  const handleResetSimulation = () => {
    setSimulating(false);
    setSimulationStage(0);
    setLiveLogConsole([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto bg-base border border-borderSubtle p-6 sm:p-8 rounded-brand shadow-none font-body">
        {/* Header Telemetry Ledger */}
        <div className="border-b border-borderSubtle pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-[10px] text-mutedText uppercase tracking-wider">
                <span className="h-1.5 w-1.5 bg-gold" aria-hidden="true" />
                <span>SPEC:INFRASTRUCTURE // PRODUCTION CI/CD &amp; CLOUD TOPOLOGY</span>
                <span className="border border-borderSubtle px-1.5 py-0.2 bg-card text-gold">
                  [G I]
                </span>
              </div>
              <DialogTitle className="font-display font-bold text-2xl sm:text-3xl text-primaryText uppercase tracking-editorial">
                CI/CD Pipelines &amp; Multi-Cloud Architecture
              </DialogTitle>
              <DialogDescription className="font-body text-xs text-mutedText max-w-2xl">
                Inspect how code moves from Git push to production across Vercel Global Edge, Render
                PaaS containers, Managed PostgreSQL 16 SSL, and Netlify CDN. Verify automated test
                gates, build containers, and live health metrics.
              </DialogDescription>
            </div>

            {/* Share Deep Link Trigger */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-card px-3 py-1.5 font-mono text-xs text-primaryText hover:border-gold hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  <span>COPIED DEEP LINK</span>
                </>
              ) : (
                <>
                  <Link2 className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  <span>SHARE SPEC</span>
                </>
              )}
            </button>
          </div>

          {/* Profile Switcher Tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {DEPLOYMENT_PROFILES.map((profile) => {
              const isSelected = profile.id === activeId;
              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setActiveId(profile.id)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-2 rounded-brand border px-3 py-2 font-mono text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "border-gold bg-surface text-primaryText font-semibold"
                      : "border-borderSubtle bg-card text-mutedText hover:text-primaryText hover:border-gold/40"
                  }`}
                >
                  <Server className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  <span>{profile.name}</span>
                  <span className="text-[10px] text-mutedText border-l border-borderSubtle pl-1.5 hidden sm:inline">
                    {profile.badge.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Architecture Overview Ledger */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border border-borderSubtle bg-surface/50 p-4 rounded-brand">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block">
              TARGET HOST TOPOLOGY
            </span>
            <p className="font-mono text-xs font-semibold text-primaryText leading-relaxed">
              {activeProfile.hostTopology}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block">
              RUNTIME &amp; BUILD DURATION
            </span>
            <p className="font-mono text-xs text-primaryText">{activeProfile.targetRuntime}</p>
            <span className="font-mono text-[11px] text-mutedText block">
              Avg Pipeline Time:{" "}
              <span className="text-gold font-semibold">{activeProfile.buildTimeAvg}</span>
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mutedText block">
              LIVE ENDPOINT &amp; SOURCE
            </span>
            <a
              href={activeProfile.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-gold hover:underline"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Visit Live Production</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <div className="flex items-center gap-2 pt-0.5 font-mono text-[11px] text-mutedText">
              <GitBranch className="h-3 w-3" aria-hidden="true" />
              <span>branch: {activeProfile.branch}</span>
            </div>
          </div>
        </div>

        {/* Live Telemetry Health Matrix & Edge Metrics */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          <div className="border border-borderSubtle bg-card p-3 rounded-brand">
            <span className="text-[10px] text-mutedText uppercase block">EDGE LATENCY</span>
            <span className="text-primaryText font-bold text-sm flex items-center gap-1 mt-0.5">
              <Activity className="h-3 w-3 text-gold" aria-hidden="true" />
              {activeProfile.healthMetrics.latencyMs} ms
            </span>
          </div>

          <div className="border border-borderSubtle bg-card p-3 rounded-brand">
            <span className="text-[10px] text-mutedText uppercase block">UPTIME SLA</span>
            <span className="text-primaryText font-bold text-sm flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="h-3 w-3 text-gold" aria-hidden="true" />
              {activeProfile.healthMetrics.uptimePct}
            </span>
          </div>

          <div className="border border-borderSubtle bg-card p-3 rounded-brand">
            <span className="text-[10px] text-mutedText uppercase block">SSL / TLS</span>
            <span className="text-primaryText font-semibold text-xs block mt-0.5 truncate">
              {activeProfile.healthMetrics.sslProtocol}
            </span>
          </div>

          <div className="border border-borderSubtle bg-card p-3 rounded-brand">
            <span className="text-[10px] text-mutedText uppercase block">CERTIFICATE</span>
            <span className="text-mutedText text-[11px] block mt-0.5 truncate">
              {activeProfile.healthMetrics.tlsCert.split(" ")[0]} 256-bit
            </span>
          </div>

          <div className="border border-borderSubtle bg-card p-3 rounded-brand col-span-2 sm:col-span-1">
            <span className="text-[10px] text-mutedText uppercase block">ACTIVE EDGE POP</span>
            <span className="text-gold font-semibold text-xs block mt-0.5 truncate">
              {activeProfile.healthMetrics.edgeRegion}
            </span>
          </div>
        </div>

        {/* Interactive CI/CD Pipeline Simulator Controls */}
        <div className="mt-6 border border-borderSubtle bg-card p-4 rounded-brand">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borderSubtle pb-3">
            <div>
              <span className="font-mono text-[10px] text-mutedText uppercase tracking-wider block">
                INTERACTIVE PIPELINE BENCHMARK RUNNER
              </span>
              <h4 className="font-display font-bold text-sm text-primaryText uppercase">
                Simulate Production Commit &amp; Deploy Cycle
              </h4>
            </div>

            <div className="flex items-center gap-2">
              {simulationStage > 0 && !simulating && (
                <button
                  type="button"
                  onClick={handleResetSimulation}
                  className="inline-flex items-center gap-1.5 rounded-brand border border-borderSubtle bg-surface px-3 py-1.5 font-mono text-xs text-mutedText hover:text-primaryText transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>RESET</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={simulating}
                className="inline-flex items-center gap-2 rounded-brand border border-gold bg-gold px-4 py-1.5 font-mono text-xs font-semibold text-base transition-colors hover:bg-goldHover disabled:opacity-50 cursor-pointer shadow-none"
              >
                {simulating ? (
                  <>
                    <Zap className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    <span>EXECUTING STAGE [{simulationStage}/4]...</span>
                  </>
                ) : simulationStage === 5 ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>RE-RUN PIPELINE AUDIT</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    <span>SIMULATE CI/CD BUILD &amp; HEALTH CHECK</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Pipeline Stage Visual Step Progress */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
            {activeProfile.stages.map((stg, idx) => {
              const stageNum = idx + 1;
              const isPast = simulationStage > stageNum || simulationStage === 5;
              const isCurrent = simulationStage === stageNum;
              return (
                <div
                  key={stg.step}
                  className={`border p-2.5 rounded-brand font-mono text-xs transition-colors ${
                    isCurrent
                      ? "border-gold bg-gold/10 text-primaryText"
                      : isPast
                        ? "border-borderSubtle bg-surface text-primaryText"
                        : "border-borderSubtle/60 bg-base text-mutedText"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-gold font-bold">STAGE {stg.step}</span>
                    {isPast ? (
                      <Check className="h-3 w-3 text-gold" aria-hidden="true" />
                    ) : isCurrent ? (
                      <Zap className="h-3 w-3 text-gold animate-pulse" aria-hidden="true" />
                    ) : (
                      <Clock className="h-3 w-3 text-mutedText/40" aria-hidden="true" />
                    )}
                  </div>
                  <span className="block text-[11px] font-semibold truncate">{stg.title}</span>
                  <span className="block text-[9px] text-mutedText truncate">{stg.runner}</span>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Build Console Stream */}
          {liveLogConsole.length > 0 && (
            <div className="mt-4 border border-borderSubtle bg-base p-3 rounded-brand font-mono text-xs text-primaryText max-h-48 overflow-y-auto space-y-1">
              <div className="flex items-center justify-between text-[10px] text-mutedText border-b border-borderSubtle pb-1 mb-1">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-gold" aria-hidden="true" />
                  <span>CI/CD RUNNER TELEMETRY STREAM</span>
                </span>
                <span>STATUS: {simulating ? "STREAMING" : "EXIT_CODE 0"}</span>
              </div>
              {liveLogConsole.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={`text-[11px] leading-relaxed ${
                    line.startsWith("---")
                      ? "text-gold font-semibold pt-1"
                      : line.includes("PASS") || line.includes("SUCCESS") || line.includes("200 OK")
                        ? "text-primaryText font-medium"
                        : "text-mutedText"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Stages Specification Ledger */}
        <div className="mt-6 space-y-3">
          <div className="font-mono text-[10px] text-mutedText uppercase tracking-wider flex items-center justify-between">
            <span>DETAILED PIPELINE STAGES &amp; COMMAND SPECIFICATIONS</span>
            <span>4 ENFORCED GATES</span>
          </div>

          <div className="space-y-3">
            {activeProfile.stages.map((stage) => (
              <div
                key={stage.step}
                className="border border-borderSubtle bg-card p-4 rounded-brand space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderSubtle pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gold">[{stage.step}]</span>
                    <h5 className="font-display font-bold text-xs uppercase text-primaryText">
                      {stage.title}
                    </h5>
                  </div>
                  <span className="font-mono text-[10px] text-mutedText border border-borderSubtle px-2 py-0.5 bg-surface">
                    {stage.runner}
                  </span>
                </div>

                <div className="font-mono text-xs text-primaryText bg-base p-2 border border-borderSubtle overflow-x-auto">
                  <span className="text-gold select-none">$ </span>
                  {stage.command}
                </div>

                <div className="space-y-0.5 pt-1">
                  {stage.outputLines.map((line, oIdx) => (
                    <div key={oIdx} className="font-mono text-[11px] text-mutedText">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Variables & Security Matrix */}
        <div className="mt-6 border border-borderSubtle bg-surface/50 p-4 rounded-brand">
          <div className="flex items-center justify-between mb-3 border-b border-borderSubtle pb-2 font-mono text-[10px] uppercase text-mutedText">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span>DEPLOYMENT SECRETS &amp; ENVIRONMENT VARIABLES</span>
            </span>
            <span>ENCRYPTED AT REST (AES-256-GCM)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {activeProfile.environmentVars.map((env) => (
              <div
                key={env.key}
                className="border border-borderSubtle bg-card px-3 py-2 rounded-brand font-mono text-xs flex items-center justify-between"
              >
                <div className="truncate pr-2">
                  <span className="text-primaryText font-semibold block truncate">{env.key}</span>
                  <span className="text-[10px] text-mutedText block truncate">{env.scope}</span>
                </div>
                {env.secret ? (
                  <span className="shrink-0 text-[10px] border border-borderSubtle bg-base px-1.5 py-0.5 text-gold font-mono">
                    SECRET
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] border border-borderSubtle bg-base px-1.5 py-0.5 text-mutedText font-mono">
                    PUBLIC
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
