import { renderToStaticMarkup } from "react-dom/server";
import { render, screen, within } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/site/Hero";
import { Work } from "@/components/site/Work";
import { About } from "@/components/site/About";
import { Journey } from "@/components/site/Journey";
import { Contact, SiteFooter } from "@/components/site/Contact";
import { SiteNav } from "@/components/site/SiteNav";
import { revealItem } from "@/components/site/Reveal";
import { PROJECTS, SKILL_GROUPS } from "@/content/portfolio";

describe("Hero", () => {
  it("renders the name, role, and location", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("SaryDanish");
    expect(screen.getByText("Junior Web Developer")).toBeInTheDocument();
    expect(screen.getByText(/Phnom Penh/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/danishsary8",
    );
  });

  it("is fully readable in server-rendered HTML before hydration", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("Sary");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});

describe("Selected work", () => {
  it("lists all four projects with their live sites and source", () => {
    render(<Work />);
    for (const p of PROJECTS) {
      expect(screen.getByRole("heading", { level: 3, name: p.title })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: `Open the live ${p.title} site` })).toHaveAttribute(
        "href",
        p.liveUrl,
      );
      expect(screen.getByRole("link", { name: `${p.title} source on GitHub` })).toHaveAttribute(
        "href",
        p.githubUrl,
      );
    }
    expect(screen.getByRole("link", { name: "Bookly API documentation" })).toHaveAttribute(
      "href",
      "https://bookly-api-zasc.onrender.com/docs",
    );
    expect(screen.getByText(/AI Expert System and Innovation 2026/)).toBeInTheDocument();
  });

  it("keeps reveal content visible while waiting for the viewport", () => {
    expect(revealItem["hidden"]).toMatchObject({ opacity: 1 });
  });
});

describe("About", () => {
  it("shows the bio and every skill with an icon", () => {
    const { container } = render(<About />);
    expect(
      screen.getByText(/fourth-year Software Development student at Norton University/),
    ).toBeInTheDocument();
    for (const g of SKILL_GROUPS) {
      expect(screen.getByRole("heading", { level: 4, name: g.title })).toBeInTheDocument();
      for (const s of g.skills) expect(screen.getByText(s)).toBeInTheDocument();
    }
    const skillCount = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);
    expect(container.querySelectorAll("li svg").length).toBe(skillCount);
  });
});

describe("Experience and education", () => {
  it("shows the internship, the award, and education", () => {
    render(<Journey />);
    expect(screen.getByText("Web Developer Trainee")).toBeInTheDocument();
    expect(screen.getByText("ETEC & KruITSolution")).toBeInTheDocument();
    expect(screen.getByText(/tour booking platform/)).toBeInTheDocument();
    expect(screen.getByText("Bachelor of Software Development")).toBeInTheDocument();
    expect(screen.getByText("Norton University")).toBeInTheDocument();
    expect(screen.getByText("Australian Centre for Education (ACE)")).toBeInTheDocument();
  });
});

describe("Contact", () => {
  it("offers email, GitHub, and Telegram", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /danishsary4@gmail.com/ })).toHaveAttribute(
      "href",
      "mailto:danishsary4@gmail.com",
    );
    expect(screen.getByRole("button", { name: /Copy email address/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute(
      "href",
      "/sary-danish-cv.pdf",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/danishsary8",
    );
    expect(screen.getByRole("link", { name: /Telegram/ })).toHaveAttribute(
      "href",
      "https://t.me/danishsary",
    );
  });

  it("links the design system from the footer", async () => {
    const rootRoute = createRootRoute({ component: SiteFooter });
    const router = createRouter({
      routeTree: rootRoute.addChildren([
        createRoute({ getParentRoute: () => rootRoute, path: "/" }),
        createRoute({ getParentRoute: () => rootRoute, path: "/design-system" }),
      ]),
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    render(<RouterProvider router={router} />);
    expect(await screen.findByRole("link", { name: "Design system" })).toHaveAttribute(
      "href",
      "/design-system",
    );
  });
});

describe("Navigation", () => {
  it("links every section and offers a theme toggle", () => {
    render(<SiteNav />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Work", "About", "Experience", "Contact"]) {
      expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(
      within(nav).getByRole("button", { name: /Switch to (dark|light) theme/ }),
    ).toBeInTheDocument();
    expect(within(nav).getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });
});
