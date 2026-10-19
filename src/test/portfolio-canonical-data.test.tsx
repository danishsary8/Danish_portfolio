import { renderToStaticMarkup } from "react-dom/server";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/portfolio/Hero";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { SystemCapabilities } from "@/components/portfolio/SystemCapabilities";
import { ExperienceLedger } from "@/components/portfolio/ExperienceLedger";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { NavLedger } from "@/components/portfolio/NavLedger";
import { CommandLedger } from "@/components/portfolio/CommandLedger";
import { ArchitectureSimulator } from "@/components/portfolio/ArchitectureSimulator";
import { Index } from "@/routes/index";

describe("Canonical Portfolio Data & Source of Truth", () => {
  it("renders Sary Danish's canonical bio, university, and location in Hero", () => {
    const markup = renderToStaticMarkup(<Hero />);
    expect(markup).toContain("Sary Danish");
    expect(markup).toContain("Norton University");
    expect(markup).toContain("Phnom Penh, Cambodia");
    expect(markup).toContain("https://github.com/danishsary8");
    expect(markup).toContain("ICT UTC+7");
  });

  it("renders all 4 canonical production projects, live deployment URLs, and Bookly API docs", () => {
    const markup = renderToStaticMarkup(<FeaturedProjects />);
    // 1. Bookly
    expect(markup).toContain("Bookly Platform");
    expect(markup).toContain("https://bookly-frontend-five.vercel.app/");
    expect(markup).toContain("https://bookly-api-zasc.onrender.com/docs");
    // 2. Diabetes Expert System
    expect(markup).toContain("Diabetes Expert System");
    expect(markup).toContain(
      "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
    );
    // 3. Loomora
    expect(markup).toContain("Loomora Habit Planner");
    expect(markup).toContain("https://daycraft-vnid.onrender.com/");
    // 4. Driving Rules App
    expect(markup).toContain("Driving Rules App");
    expect(markup).toContain("https://drivingruletest.netlify.app/");
  });

  it("renders the 4 system capability pillars with exact core technologies", () => {
    const markup = renderToStaticMarkup(<SystemCapabilities />);
    expect(markup).toContain("Backend &amp; REST APIs");
    expect(markup).toContain("Frontend &amp; Interfaces");
    expect(markup).toContain("Data Persistence");
    expect(markup).toContain("Workflow &amp; Tooling");
    expect(markup).toContain("Laravel");
    expect(markup).toContain("PostgreSQL");
    expect(markup).toContain("React");
  });

  it("renders professional trajectory, industry training, and university education", () => {
    const markup = renderToStaticMarkup(<ExperienceLedger />);
    expect(markup).toContain("ETEC &amp; KruITSolution");
    expect(markup).toContain("Norton University");
    expect(markup).toContain("AI Expert System Competition 2026");
    expect(markup).toContain("Australian Centre for Education");
  });

  it("renders canonical contact dispatch email and GitHub in ContactFooter", () => {
    const markup = renderToStaticMarkup(<ContactFooter />);
    expect(markup).toContain("danishsary4@gmail.com");
    expect(markup).toContain("https://github.com/danishsary8");
  });

  it("renders the persistent Phnom Penh telemetry and location in NavLedger", () => {
    const markup = renderToStaticMarkup(<NavLedger />);
    expect(markup).toContain("PHNOM PENH, KH");
    expect(markup).toContain("ICT UTC+7");
    expect(markup).toContain("ETEC &amp; KruITSolution");
  });

  it("renders the accessible skip-to-content anchor in Index route", () => {
    const markup = renderToStaticMarkup(<Index />);
    expect(markup).toContain("Skip to main content");
    expect(markup).toContain('href="#main-content"');
  });

  it("opens the Architecture & Schema Inspector Drawer when triggering Inspect Architecture", () => {
    render(<FeaturedProjects />);
    const inspectButtons = screen.getAllByRole("button", {
      name: /Inspect technical architecture/i,
    });
    expect(inspectButtons.length).toBeGreaterThan(0);

    // Trigger drawer inspection on first project (Bookly)
    const firstButton = inspectButtons[0];
    expect(firstButton).toBeDefined();
    if (firstButton) {
      fireEvent.click(firstButton);
    }

    // Verify Inspector Sheet opens with Schema, API, and Live Simulator tabs
    expect(screen.getByText("SYSTEM ARCHITECTURE INSPECTOR")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /REST API/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /PostgreSQL Schema/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Architecture Overview/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Live Payload Simulator/i })).toBeInTheDocument();
  });

  it("renders the interactive ArchitectureSimulator with live execution workbench for Bookly and Diabetes", () => {
    const { unmount } = render(
      <ArchitectureSimulator
        projectId="bookly"
        projectTitle="Bookly Platform"
        apiDocsUrl="https://bookly-api-zasc.onrender.com/docs"
      />,
    );
    expect(screen.getByText("Live Architecture & Inference Workbench")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /EXECUTE REQUEST/i })).toBeInTheDocument();
    expect(screen.getByText("Indexed catalog scan & relational pagination")).toBeInTheDocument();
    unmount();

    render(<ArchitectureSimulator projectId="diabetes" projectTitle="Diabetes Expert System" />);
    expect(screen.getByRole("button", { name: /RUN INFERENCE ENGINE/i })).toBeInTheDocument();
    expect(screen.getByText(/Profile A: Baseline/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile C: Critical/i)).toBeInTheDocument();
  });

  it("opens CommandLedger via the CMD trigger button in NavLedger", () => {
    render(<Index />);
    const cmdButtons = screen.getAllByRole("button", { name: /Open command palette/i });
    expect(cmdButtons.length).toBeGreaterThan(0);
    const primaryCmdButton = cmdButtons[0];
    if (primaryCmdButton) {
      fireEvent.click(primaryCmdButton);
    }

    expect(
      screen.getByPlaceholderText(/Type a command, project, or section anchor/i),
    ).toBeInTheDocument();
  });

  it("renders all canonical command actions inside CommandLedger when open", () => {
    render(<CommandLedger open={true} onOpenChange={() => {}} />);
    expect(
      screen.getByPlaceholderText(/Type a command, project, or section anchor/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Download Curriculum Vitae (PDF)")).toBeInTheDocument();
    expect(screen.getByText("Copy Developer Dispatch Email")).toBeInTheDocument();
    expect(screen.getByText("GitHub Developer Profile")).toBeInTheDocument();
    expect(screen.getByText("Launch Bookly — Online Bookstore")).toBeInTheDocument();
    expect(screen.getByText("Inspect Bookly — REST API Documentation")).toBeInTheDocument();
    expect(screen.getByText("Launch Diabetes Expert System")).toBeInTheDocument();
    expect(screen.getByText("Launch Loomora Habit Planner")).toBeInTheDocument();
    expect(screen.getByText("Launch Cambodian Driving Rules App")).toBeInTheDocument();
    expect(screen.getByText("System Capabilities & Architecture Matrix")).toBeInTheDocument();
  });
});
