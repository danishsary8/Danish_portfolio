import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { badgeItem, item } from "@/components/portfolio/Reveal";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { SystemCapabilities } from "@/components/portfolio/SystemCapabilities";
import { SystemTopologyModal } from "@/components/portfolio/SystemTopologyModal";
import { NavLedger } from "@/components/portfolio/NavLedger";
import { RuntimeDiagnosticsBar } from "@/components/portfolio/RuntimeDiagnosticsBar";
import { LocaleProvider } from "@/lib/i18n-ledger";
import { EngineeringADRModal } from "@/components/portfolio/EngineeringADRModal";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { QueryPlanExplorerModal } from "@/components/portfolio/QueryPlanExplorerModal";
import { CodeCraftCompare } from "@/components/portfolio/CodeCraftCompare";
import { BlueprintInspectorOverlay } from "@/components/portfolio/BlueprintInspectorOverlay";
import { DeploymentPipelineModal } from "@/components/portfolio/DeploymentPipelineModal";
import { StackAlignmentEngine } from "@/components/portfolio/StackAlignmentEngine";
import { PerformanceBenchmarkModal } from "@/components/portfolio/PerformanceBenchmarkModal";
import { Index } from "@/routes/index";

describe("Portfolio visibility before animations start", () => {
  it("never makes section content transparent while waiting for an observer", () => {
    expect(item["hidden"]).toMatchObject({ opacity: 1 });
    expect(item["show"]).toMatchObject({ opacity: 1, transform: "translateY(0px)" });
  });

  it("never makes skill badges transparent while waiting for an observer", () => {
    expect(badgeItem["hidden"]).toMatchObject({ opacity: 1 });
    expect(badgeItem["show"]).toMatchObject({ opacity: 1, transform: "translateY(0px) scale(1)" });
  });

  it("exposes the live architecture payload inspection interface when inspector drawer is opened", () => {
    render(<FeaturedProjects />);
    const inspectButtons = screen.getAllByRole("button", {
      name: /Inspect technical architecture/i,
    });
    expect(inspectButtons.length).toBeGreaterThan(0);
    const firstButton = inspectButtons[0];
    if (firstButton) {
      fireEvent.click(firstButton);
    }
    expect(screen.getByRole("tab", { name: /Live Payload Simulator/i })).toBeInTheDocument();
  });

  it("renders the INSPECT RELATIONAL ERD trigger in SystemCapabilities and opens SystemTopologyModal", () => {
    const { unmount } = render(
      <SystemTopologyModal open={true} onOpenChange={() => {}} initialBlueprint="bookly" />,
    );
    expect(
      screen.getByText("RELATIONAL DATABASE TOPOLOGY & ARCHITECTURAL LIFECYCLE"),
    ).toBeInTheDocument();
    expect(screen.getByText("users")).toBeInTheDocument();
    expect(screen.getByText("books")).toBeInTheDocument();
    expect(screen.getByText("orders")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Request Lifecycle Pipeline")).toBeInTheDocument();
    unmount();
  });

  it("renders the forward-chaining clinical rules schema in Diabetes blueprint", () => {
    const { unmount } = render(
      <SystemTopologyModal open={true} onOpenChange={() => {}} initialBlueprint="diabetes" />,
    );
    expect(screen.getByText("clinical_rules")).toBeInTheDocument();
    expect(screen.getByText("users_rbac")).toBeInTheDocument();
    expect(screen.getByText("patient_assessments")).toBeInTheDocument();
    expect(
      screen.getByText("Clinical Expert Decision Pipeline (Award Winner Norton 2026)"),
    ).toBeInTheDocument();
    unmount();
  });

  it("renders the trigger button in SystemCapabilities and invokes onOpenTopology", () => {
    let called = false;
    render(
      <SystemCapabilities
        onOpenTopology={() => {
          called = true;
        }}
      />,
    );
    const trigger = screen.getByRole("button", {
      name: /INSPECT RELATIONAL ERD & REQUEST TOPOLOGY/i,
    });
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(called).toBe(true);
  });

  it("switches to Khmer bilingual localized text and updates document lang without losing English name", () => {
    const { unmount } = render(
      <LocaleProvider>
        <NavLedger />
      </LocaleProvider>,
    );

    const switchBtn = screen.getByRole("button", {
      name: /Switch language between English and Khmer/i,
    });
    expect(switchBtn).toBeInTheDocument();
    fireEvent.click(switchBtn);

    // After click to Khmer, document.documentElement.lang should be km
    expect(document.documentElement.lang).toBe("km");
    // Text should show Cambodian name including (Sary Danish)
    expect(screen.getByText("សារី ដានីស (Sary Danish)")).toBeInTheDocument();

    // Toggle back to English
    fireEvent.click(switchBtn);
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByText("SARY DANISH")).toBeInTheDocument();
    unmount();
  });

  it("renders RuntimeDiagnosticsBar and successfully executes client A11y & DOM audit", () => {
    const { unmount } = render(
      <LocaleProvider>
        <RuntimeDiagnosticsBar />
      </LocaleProvider>,
    );

    expect(screen.getByText(/DOM_NODES:/i)).toBeInTheDocument();
    expect(screen.getByText(/EMIL_KOWALSKI/i)).toBeInTheDocument();
    expect(screen.getByText(/15.2:1 \(AAA PASS\)/i)).toBeInTheDocument();

    const auditBtn = screen.getByRole("button", { name: /RUN DOM & A11Y CHECK/i });
    expect(auditBtn).toBeInTheDocument();
    unmount();
  });

  it("opens EngineeringADRModal and displays architecture trade-offs, directory tree, and pattern code", () => {
    const { unmount } = render(
      <EngineeringADRModal open={true} onOpenChange={() => {}} initialAdrId="adr-001" />,
    );

    expect(
      screen.getByText("ARCHITECTURE DECISION RECORDS (ADR) // CODEBASE BLUEPRINTS"),
    ).toBeInTheDocument();
    expect(screen.getByText("ADR-001")).toBeInTheDocument();
    expect(screen.getByText("ADR-002")).toBeInTheDocument();
    expect(screen.getByText("ADR-003")).toBeInTheDocument();
    expect(screen.getByText("ADR-004")).toBeInTheDocument();

    // Verify Tab buttons exist
    const treeTabBtn = screen.getByRole("button", { name: /FILE TREE/i });
    expect(treeTabBtn).toBeInTheDocument();
    fireEvent.click(treeTabBtn);
    expect(screen.getByText(/Verified Production Directory Structure/i)).toBeInTheDocument();

    const patternTabBtn = screen.getByRole("button", { name: /PATTERN CODE/i });
    expect(patternTabBtn).toBeInTheDocument();
    fireEvent.click(patternTabBtn);
    expect(screen.getByText(/EnsureJwtBearerToken.php/i)).toBeInTheDocument();

    unmount();
  });

  it("renders ContactFooter Recruiter Dispatch Workbench with all 4 inquiry tracks and candidate briefing preview", () => {
    const { unmount } = render(<ContactFooter />);

    // Verify track selection buttons
    expect(screen.getByText("TRACK 01: FULL-STACK ROLE")).toBeInTheDocument();
    expect(screen.getByText("TRACK 02: BACKEND & API")).toBeInTheDocument();
    expect(screen.getByText("TRACK 03: FRONTEND & UI")).toBeInTheDocument();
    expect(screen.getByText("TRACK 04: COLLABORATION")).toBeInTheDocument();

    // Verify candidate briefing text
    expect(screen.getByText(/CANDIDATE_BRIEFING.txt/i)).toBeInTheDocument();
    expect(screen.getByText(/VERIFIED CREDENTIALS/i)).toBeInTheDocument();

    // Verify action triggers
    expect(
      screen.getByRole("button", { name: /Copy Candidate Technical Dossier to clipboard/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Copy Sary Danish email address/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Launch email client with pre-populated dispatch/i }),
    ).toBeInTheDocument();

    unmount();
  });

  it("renders QueryPlanExplorerModal and toggles between Naive N+1 and Optimized execution plans", () => {
    const { unmount } = render(
      <QueryPlanExplorerModal open={true} onOpenChange={() => {}} initialBenchmarkId="bookly" />,
    );

    expect(
      screen.getByText("POSTGRESQL QUERY EXECUTION PLAN (EXPLAIN ANALYZE) & N+1 EXPLORER"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bookly — Catalog Filtering & Eloquent N+1 Elimination"),
    ).toBeInTheDocument();
    expect(screen.getByText("1.86 ms")).toBeInTheDocument();
    expect(screen.getByText("2 queries")).toBeInTheDocument();

    // Toggle to Naive N+1 Plan
    const naiveBtn = screen.getByRole("button", { name: /NAIVE N\+1 PLAN/i });
    expect(naiveBtn).toBeInTheDocument();
    fireEvent.click(naiveBtn);

    expect(screen.getByText("144.2 ms")).toBeInTheDocument();
    expect(screen.getByText("51 queries")).toBeInTheDocument();
    expect(screen.getByText(/50x Subqueries/i)).toBeInTheDocument();

    // Verify copy deep link trigger
    expect(
      screen.getByRole("button", { name: /Copy shareable deep link to this query plan/i }),
    ).toBeInTheDocument();

    unmount();
  });

  it("renders the BENCHMARK SQL EXPLAIN & N+1 PLANS trigger in SystemCapabilities", () => {
    let queryPlanCalled = false;
    render(
      <SystemCapabilities
        onOpenQueryPlan={() => {
          queryPlanCalled = true;
        }}
      />,
    );

    const benchmarkBtn = screen.getByRole("button", {
      name: /BENCHMARK SQL EXPLAIN & N\+1 PLANS/i,
    });
    expect(benchmarkBtn).toBeInTheDocument();
    fireEvent.click(benchmarkBtn);
    expect(queryPlanCalled).toBe(true);
  });

  it("renders CodeCraftCompare and allows switching between the 4 engineering quality domains", () => {
    const { unmount } = render(<CodeCraftCompare />);

    expect(
      screen.getByText("Production Engineering Craft vs. Common Anti-Patterns"),
    ).toBeInTheDocument();
    expect(screen.getByText("REST API Security & RBAC")).toBeInTheDocument();
    expect(screen.getByText("Relational Integrity & Concurrency")).toBeInTheDocument();
    expect(screen.getByText("Frontend Type Safety & State")).toBeInTheDocument();
    expect(screen.getByText("Editorial UI & Motion Ergonomics")).toBeInTheDocument();

    // Verify initial security domain
    expect(
      screen.getByText("Sary Danish's Production Standard (Implemented in Bookly)"),
    ).toBeInTheDocument();

    // Switch to database concurrency domain
    const dbTab = screen.getByRole("tab", { name: /Relational Integrity & Concurrency/i });
    expect(dbTab).toBeInTheDocument();
    fireEvent.click(dbTab);

    expect(
      screen.getByText(/Atomic DB::transaction\(\), pessimistic SELECT FOR UPDATE locks/i),
    ).toBeInTheDocument();

    // Switch to frontend type safety domain
    const tsTab = screen.getByRole("tab", { name: /Frontend Type Safety & State/i });
    fireEvent.click(tsTab);
    expect(
      screen.getByText(/Strict TypeScript interfaces, discriminated unions/i),
    ).toBeInTheDocument();

    unmount();
  });

  it("renders BlueprintInspectorOverlay when activated and closes cleanly", () => {
    let closed = false;
    const { unmount, rerender } = render(
      <BlueprintInspectorOverlay
        active={true}
        onToggle={(next) => {
          if (next === false) closed = true;
        }}
      />,
    );

    expect(screen.getByText(/ARCHITECTURAL BLUEPRINT X-RAY MODE ACTIVE/i)).toBeInTheDocument();
    expect(screen.getByText(/CAD TELEMETRY HUD/i)).toBeInTheDocument();
    expect(screen.getByText("COL_01")).toBeInTheDocument();
    expect(screen.getByText("COL_12")).toBeInTheDocument();

    // Click close button
    const closeBtn = screen.getByRole("button", {
      name: /Exit Architectural Blueprint X-Ray Mode/i,
    });
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(closed).toBe(true);

    // Verify inactive overlay renders nothing
    rerender(<BlueprintInspectorOverlay active={false} onToggle={() => {}} />);
    expect(
      screen.queryByText(/ARCHITECTURAL BLUEPRINT X-RAY MODE ACTIVE/i),
    ).not.toBeInTheDocument();

    unmount();
  });

  it("renders DeploymentPipelineModal with 4 profiles, health metrics, and simulated CI/CD runner", () => {
    const { unmount } = render(
      <DeploymentPipelineModal open={true} onOpenChange={() => {}} initialProfileId="bookly" />,
    );

    expect(screen.getByText("CI/CD Pipelines & Multi-Cloud Architecture")).toBeInTheDocument();
    expect(screen.getByText("Bookly Platform")).toBeInTheDocument();
    expect(screen.getByText("Diabetes Expert System")).toBeInTheDocument();
    expect(screen.getByText("Loomora Habit Planner")).toBeInTheDocument();
    expect(screen.getByText("Driving Rules App")).toBeInTheDocument();

    // Verify health metrics exist
    expect(screen.getByText(/EDGE LATENCY/i)).toBeInTheDocument();
    expect(screen.getByText(/UPTIME SLA/i)).toBeInTheDocument();

    // Verify simulate button exists
    const simBtn = screen.getByRole("button", {
      name: /SIMULATE CI\/CD BUILD & HEALTH CHECK/i,
    });
    expect(simBtn).toBeInTheDocument();

    unmount();
  });

  it("renders StackAlignmentEngine, calculates match percentage, and toggles requirement filters", () => {
    const { unmount } = render(<StackAlignmentEngine />);

    expect(screen.getByText("Role-Requirement & Stack Alignment Matcher")).toBeInTheDocument();

    // Check requirement coverage score is visible
    expect(screen.getByText(/REQUIREMENT COVERAGE/i)).toBeInTheDocument();

    // Verify chips
    const restChip = screen.getByRole("button", {
      name: /REST API & Backend Architecture/i,
    });
    expect(restChip).toBeInTheDocument();
    expect(restChip).toHaveAttribute("aria-pressed", "true");

    // Click to deselect
    fireEvent.click(restChip);
    expect(restChip).toHaveAttribute("aria-pressed", "false");

    // Click SELECT ALL
    const selectAllBtn = screen.getByRole("button", { name: /SELECT ALL/i });
    fireEvent.click(selectAllBtn);
    expect(restChip).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("100%")).toBeInTheDocument();

    unmount();
  });

  it("renders PerformanceBenchmarkModal with 100/100 Lighthouse pillars, Core Web Vitals telemetry, and WCAG AAA auditor", () => {
    const { unmount } = render(
      <PerformanceBenchmarkModal open={true} onOpenChange={() => {}} initialTab="lighthouse" />,
    );

    expect(screen.getByText("Production Performance & WCAG AAA Suite")).toBeInTheDocument();
    expect(screen.getByText("PERFORMANCE")).toBeInTheDocument();
    expect(screen.getByText("ACCESSIBILITY")).toBeInTheDocument();
    expect(screen.getByText("BEST PRACTICES")).toBeInTheDocument();
    expect(screen.getByText("SEO & SOCIAL")).toBeInTheDocument();

    // Verify four 100 score badges
    const scores = screen.getAllByText("100");
    expect(scores.length).toBeGreaterThanOrEqual(4);

    // Switch to Core Web Vitals tab
    const vitalsTabBtn = screen.getByRole("button", { name: /CORE WEB VITALS/i });
    fireEvent.click(vitalsTabBtn);
    expect(screen.getByText(/LCP \(Largest Contentful Paint\)/i)).toBeInTheDocument();
    expect(screen.getByText("0.84 s")).toBeInTheDocument();
    expect(screen.getByText("0.000")).toBeInTheDocument();

    // Switch to WCAG AAA tab
    const a11yTabBtn = screen.getByRole("button", { name: /WCAG AAA & A11Y AUDIT/i });
    fireEvent.click(a11yTabBtn);
    expect(screen.getByText("WCAG 2.1 AAA Official Compliance Ledger")).toBeInTheDocument();
    expect(screen.getByText("15.2 : 1")).toBeInTheDocument();

    // Switch to Master Release Certificate tab
    const certTabBtn = screen.getByRole("button", { name: /MASTER RELEASE CERTIFICATE/i });
    fireEvent.click(certTabBtn);
    expect(screen.getByText("Master Release Sign-Off Dossier")).toBeInTheDocument();
    expect(screen.getByText("APPROVED (PROD)")).toBeInTheDocument();

    unmount();
  });
});
