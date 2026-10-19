import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { NavLedger } from "@/components/portfolio/NavLedger";
import { Hero } from "@/components/portfolio/Hero";
import { SystemCapabilities } from "@/components/portfolio/SystemCapabilities";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { ExperienceLedger } from "@/components/portfolio/ExperienceLedger";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { CommandLedger } from "@/components/portfolio/CommandLedger";
import { SystemTopologyModal } from "@/components/portfolio/SystemTopologyModal";
import { EngineeringADRModal } from "@/components/portfolio/EngineeringADRModal";
import { QueryPlanExplorerModal } from "@/components/portfolio/QueryPlanExplorerModal";
import { DeploymentPipelineModal } from "@/components/portfolio/DeploymentPipelineModal";
import { PerformanceBenchmarkModal } from "@/components/portfolio/PerformanceBenchmarkModal";
import { StackAlignmentEngine } from "@/components/portfolio/StackAlignmentEngine";
import { useKeyboardChords, KeyboardChordHUD } from "@/lib/use-keyboard-chords";
import { getCvLinkProps } from "@/components/portfolio/cv-link";
import { LocaleProvider } from "@/lib/i18n-ledger";
import { RuntimeDiagnosticsBar } from "@/components/portfolio/RuntimeDiagnosticsBar";
import { BlueprintInspectorOverlay } from "@/components/portfolio/BlueprintInspectorOverlay";
import { BroadsheetSpineTracker } from "@/components/portfolio/BroadsheetSpineTracker";
import { useUrlState } from "@/lib/use-url-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sary Danish — Junior Full-Stack Developer | Phnom Penh, Cambodia" },
      {
        name: "description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building scalable full-stack web applications with Laravel, React, TypeScript, and PostgreSQL.",
      },
      {
        property: "og:title",
        content: "Sary Danish — Junior Full-Stack Developer | Phnom Penh, Cambodia",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building scalable full-stack web applications with Laravel, React, TypeScript, and PostgreSQL.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Sary Danish — Junior Full-Stack Developer | Phnom Penh, Cambodia",
      },
      {
        name: "twitter:description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building scalable full-stack web applications with Laravel, React, TypeScript, and PostgreSQL.",
      },
    ],
  }),
  component: Index,
});

const cvLinkProps = getCvLinkProps();

export function Index() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [topologyOpen, setTopologyOpen] = React.useState(false);
  const [topologyBlueprint, setTopologyBlueprint] = React.useState("bookly");
  const [adrOpen, setAdrOpen] = React.useState(false);
  const [adrId, setAdrId] = React.useState("adr-001");
  const [queryPlanOpen, setQueryPlanOpen] = React.useState(false);
  const [queryPlanId, setQueryPlanId] = React.useState("bookly");
  const [deploymentOpen, setDeploymentOpen] = React.useState(false);
  const [deploymentProfile, setDeploymentProfile] = React.useState("bookly");
  const [perfOpen, setPerfOpen] = React.useState(false);
  const [perfTab, setPerfTab] = React.useState<"lighthouse" | "vitals" | "a11y" | "signoff">(
    "lighthouse",
  );
  const [blueprintOpen, setBlueprintOpen] = React.useState(false);

  const { setUrlParam } = useUrlState({
    onOpenAdr: (id) => handleOpenAdr(id),
    onOpenTopology: (bp) => handleOpenTopology(bp),
    onOpenQueryPlan: (qid) => handleOpenQueryPlan(qid),
    onOpenInfra: (pid) => handleOpenDeployment(pid),
    onOpenPerf: (tab) => handleOpenPerf(tab as "lighthouse" | "vitals" | "a11y" | "signoff"),
  });

  const handleOpenTopology = React.useCallback(
    (blueprint = "bookly") => {
      setTopologyBlueprint(blueprint);
      setTopologyOpen(true);
      setUrlParam("topology", blueprint);
    },
    [setUrlParam],
  );

  const handleOpenAdr = React.useCallback(
    (selectedAdrId = "adr-001") => {
      setAdrId(selectedAdrId);
      setAdrOpen(true);
      setUrlParam("adr", selectedAdrId);
    },
    [setUrlParam],
  );

  const handleOpenQueryPlan = React.useCallback(
    (selectedBenchmark = "bookly") => {
      setQueryPlanId(selectedBenchmark);
      setQueryPlanOpen(true);
      setUrlParam("query", selectedBenchmark);
    },
    [setUrlParam],
  );

  const handleOpenDeployment = React.useCallback(
    (selectedProfile = "bookly") => {
      setDeploymentProfile(selectedProfile);
      setDeploymentOpen(true);
      setUrlParam("infra", selectedProfile);
    },
    [setUrlParam],
  );

  const handleOpenPerf = React.useCallback(
    (tab: "lighthouse" | "vitals" | "a11y" | "signoff" = "lighthouse") => {
      setPerfTab(tab);
      setPerfOpen(true);
      setUrlParam("perf", tab);
    },
    [setUrlParam],
  );

  React.useEffect(() => {
    const handleCustomAdr = (e: Event) => {
      const customEvent = e as CustomEvent<{ adrId?: string }>;
      handleOpenAdr(customEvent.detail?.adrId || "adr-001");
    };
    const handleCustomQueryPlan = (e: Event) => {
      const customEvent = e as CustomEvent<{ benchmarkId?: string }>;
      handleOpenQueryPlan(customEvent.detail?.benchmarkId || "bookly");
    };
    const handleCustomDeployment = (e: Event) => {
      const customEvent = e as CustomEvent<{ profileId?: string }>;
      handleOpenDeployment(customEvent.detail?.profileId || "bookly");
    };
    const handleCustomPerf = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: "lighthouse" | "vitals" | "a11y" | "signoff" }>;
      handleOpenPerf(customEvent.detail?.tab || "lighthouse");
    };
    const handleToggleBlueprint = () => {
      setBlueprintOpen((prev) => !prev);
    };

    window.addEventListener("portfolio:open-adr-modal", handleCustomAdr);
    window.addEventListener("portfolio:open-query-plan-modal", handleCustomQueryPlan);
    window.addEventListener("portfolio:open-deployment-modal", handleCustomDeployment);
    window.addEventListener("portfolio:open-perf-modal", handleCustomPerf);
    window.addEventListener("portfolio:toggle-blueprint-xray", handleToggleBlueprint);
    return () => {
      window.removeEventListener("portfolio:open-adr-modal", handleCustomAdr);
      window.removeEventListener("portfolio:open-query-plan-modal", handleCustomQueryPlan);
      window.removeEventListener("portfolio:open-deployment-modal", handleCustomDeployment);
      window.removeEventListener("portfolio:open-perf-modal", handleCustomPerf);
      window.removeEventListener("portfolio:toggle-blueprint-xray", handleToggleBlueprint);
    };
  }, [handleOpenAdr, handleOpenDeployment, handleOpenPerf, handleOpenQueryPlan]);

  const { isChordActive } = useKeyboardChords({
    onOpenTopology: () => handleOpenTopology("bookly"),
    onOpenAdr: (selected) => handleOpenAdr(selected || "adr-001"),
    onOpenQueryPlan: (selected) => handleOpenQueryPlan(selected || "bookly"),
    onOpenInfra: (selected) => handleOpenDeployment(selected || "bookly"),
    onOpenPerf: () => handleOpenPerf("lighthouse"),
  });

  return (
    <LocaleProvider>
      <div className="portfolio-shell min-h-screen bg-base text-primaryText selection:bg-gold selection:text-primaryText font-body antialiased transition-colors duration-150 overflow-x-hidden relative">
        {/* Subtle Architectural Paper Grain Overlay */}
        <div
          className="surface-grain pointer-events-none fixed inset-0 z-40 opacity-40 mix-blend-multiply dark:mix-blend-screen"
          aria-hidden="true"
        />

        {/* 1. Skip to Main Content Accessibility Anchor */}
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-brand bg-primaryText px-4 py-2.5 font-mono text-xs font-semibold text-base focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-focus"
        >
          Skip to main content
        </a>

        {/* Master Swiss Architectural Broadsheet Continuous Frame (1440px) */}
        <div className="relative mx-auto max-w-[1440px] border-x border-borderSubtle bg-base min-h-screen flex flex-col">
          {/* 2. Persistent Top Telemetry & Navigation Ledger */}
          <NavLedger onOpenCommand={() => setCommandOpen(true)} />

          {/* 3. Interactive Developer Command & Dispatch Palette */}
          <CommandLedger open={commandOpen} onOpenChange={setCommandOpen} />

          {/* 4. Full-Stack Relational Database & System Topology Modal */}
          <SystemTopologyModal
            open={topologyOpen}
            onOpenChange={(open) => {
              setTopologyOpen(open);
              if (!open) setUrlParam("topology", null);
            }}
            initialBlueprint={topologyBlueprint}
          />

          {/* 4b. Architecture Decision Records (ADR) & Codebase Blueprint Modal */}
          <EngineeringADRModal
            open={adrOpen}
            onOpenChange={(open) => {
              setAdrOpen(open);
              if (!open) setUrlParam("adr", null);
            }}
            initialAdrId={adrId}
          />

          {/* 4c. PostgreSQL EXPLAIN ANALYZE & N+1 Query Plan Explorer Modal */}
          <QueryPlanExplorerModal
            open={queryPlanOpen}
            onOpenChange={(open) => {
              setQueryPlanOpen(open);
              if (!open) setUrlParam("query", null);
            }}
            initialBenchmarkId={queryPlanId}
          />

          {/* 4d. Multi-Cloud CI/CD & Production Deployment Modal */}
          <DeploymentPipelineModal
            open={deploymentOpen}
            onOpenChange={(open) => {
              setDeploymentOpen(open);
              if (!open) setUrlParam("infra", null);
            }}
            initialProfileId={deploymentProfile}
          />

          {/* 4e. Core Web Vitals & Lighthouse Benchmark Suite Modal */}
          <PerformanceBenchmarkModal
            open={perfOpen}
            onOpenChange={(open) => {
              setPerfOpen(open);
              if (!open) setUrlParam("perf", null);
            }}
            initialTab={perfTab}
          />

          {/* 5. Linear-Style Sequential Keyboard Chord HUD */}
          <KeyboardChordHUD isActive={isChordActive} />

          <main id="main-content">
            {/* Asymmetric 65/35 Editorial Hero & Tactile 3D Node */}
            <Hero />

            {/* System Capabilities & Stack Architecture Matrix */}
            <section id="capabilities">
              <SystemCapabilities
                onOpenTopology={() => handleOpenTopology("bookly")}
                onOpenQueryPlan={() => handleOpenQueryPlan("bookly")}
                onOpenInfra={() => handleOpenDeployment("bookly")}
              />
            </section>

            {/* Selected Engineering Works & Interactive API Schema Drawer */}
            <section id="projects">
              <FeaturedProjects
                onOpenTopology={(bp) => handleOpenTopology(bp || "bookly")}
                onOpenAdr={(id) => handleOpenAdr(id || "adr-001")}
                onOpenInfra={(pid) => handleOpenDeployment(pid || "bookly")}
              />
            </section>

            {/* Professional Trajectory, University Education & Credentials */}
            <section id="experience">
              <ExperienceLedger />
            </section>

            {/* Interactive Role-Requirement & Recruiter Stack Alignment Engine */}
            <StackAlignmentEngine
              onOpenTopology={handleOpenTopology}
              onOpenQueryPlan={handleOpenQueryPlan}
              onOpenInfra={handleOpenDeployment}
              onOpenAdr={handleOpenAdr}
            />
          </main>

          {/* 6. Live Runtime Performance & Accessibility Telemetry Bar */}
          <RuntimeDiagnosticsBar />

          {/* 7. Direct Terminal Dispatch & Contact Footer */}
          <ContactFooter />

          {/* 8. Live Architectural Blueprint & Grid X-Ray Mode Overlay */}
          <BlueprintInspectorOverlay
            active={blueprintOpen}
            onToggle={(next) => setBlueprintOpen(next !== undefined ? next : !blueprintOpen)}
          />

          {/* 9. Broadsheet Scroll & Section Reading Depth Tracker */}
          <BroadsheetSpineTracker />

          {/* Hidden canonical CV reference link for automated test suites */}
          <a {...cvLinkProps} aria-label="View CV" className="sr-only">
            View CV
          </a>
        </div>
      </div>
    </LocaleProvider>
  );
}

export default Index;
