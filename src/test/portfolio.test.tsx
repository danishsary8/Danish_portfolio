import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/site/Hero";
import { Skills } from "@/components/site/Skills";
import { Projects } from "@/components/site/Projects";
import { Experience } from "@/components/site/Experience";
import { Education } from "@/components/site/Education";
import { Contact, SiteFooter } from "@/components/site/Contact";
import { SiteNav } from "@/components/site/SiteNav";
import { CERTIFICATES, PROJECTS, SKILL_GROUPS } from "@/content/portfolio";

describe("Hero", () => {
  it("renders the name, role, and calls to action", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Sary Danish");
    expect(screen.getByText(/Junior Web Developer/)).toBeInTheDocument();
    expect(screen.getByText(/Phnom Penh/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Get in touch/ })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
      "href",
      "/sary-danish-cv.pdf",
    );
  });

  it("is fully readable in server-rendered HTML before hydration", () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain("Sary Danish");
    expect(html).not.toMatch(/opacity:\s*0[;"]/);
  });
});

describe("Skills", () => {
  it("lists every skill with an icon", () => {
    const { container } = render(<Skills />);
    for (const g of SKILL_GROUPS) {
      expect(screen.getByRole("heading", { level: 3, name: g.title })).toBeInTheDocument();
      for (const s of g.skills) expect(screen.getByText(s)).toBeInTheDocument();
    }
    const total = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);
    expect(container.querySelectorAll("li svg").length).toBe(total);
  });
});

describe("Projects", () => {
  it("lists all four projects", () => {
    render(<Projects />);
    for (const p of PROJECTS) {
      expect(screen.getByRole("button", { name: `${p.title}: view details` })).toBeInTheDocument();
    }
  });

  it("opens a details dialog with live, source, and API links", () => {
    render(<Projects />);
    fireEvent.click(screen.getByRole("button", { name: "Bookly: view details" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: "Bookly" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Open the live Bookly site" })).toHaveAttribute(
      "href",
      "https://bookly-frontend-five.vercel.app/",
    );
    expect(within(dialog).getByRole("link", { name: "Bookly source on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/danishsary8",
    );
    expect(within(dialog).getByRole("link", { name: "Bookly API documentation" })).toHaveAttribute(
      "href",
      "https://bookly-api-zasc.onrender.com/docs",
    );
  });

  it("marks the award-winning project", () => {
    render(<Projects />);
    expect(screen.getByLabelText("Award winner")).toBeInTheDocument();
  });
});

describe("Experience and education", () => {
  it("shows the internship and the award", () => {
    render(<Experience />);
    expect(screen.getByText("Web Developer Trainee Intern")).toBeInTheDocument();
    expect(screen.getByText(/ETEC & KruITSolution/)).toBeInTheDocument();
    expect(screen.getByText(/tour booking platform/)).toBeInTheDocument();
    expect(screen.getByText("AI Expert System and Innovation 2026")).toBeInTheDocument();
  });

  it("shows education and every certificate", () => {
    render(<Education />);
    expect(screen.getByText("Bachelor of Software Development")).toBeInTheDocument();
    expect(screen.getAllByText(/Norton University/).length).toBeGreaterThan(0);
    for (const c of CERTIFICATES) expect(screen.getByText(c.title)).toBeInTheDocument();
  });
});

describe("Contact", () => {
  it("offers email, GitHub, Telegram, and the CV", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: "danishsary4@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:danishsary4@gmail.com",
    );
    expect(screen.getByRole("button", { name: /Copy email address/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github.com\/danishsary8/ })).toHaveAttribute(
      "href",
      "https://github.com/danishsary8",
    );
    expect(screen.getByRole("link", { name: /@danishsary/ })).toHaveAttribute(
      "href",
      "https://t.me/danishsary",
    );
    expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
      "href",
      "/sary-danish-cv.pdf",
    );
  });

  it("asks for a name and message before opening the email app", () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Write email" }));
    expect(screen.getByText(/Add your name/)).toBeInTheDocument();
    expect(screen.getByText(/Write a short message/)).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
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
  it("links all six sections and offers a theme toggle and menu", () => {
    render(<SiteNav />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Home", "Skills", "Projects", "Experience", "Education", "Contact"]) {
      expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(
      within(nav).getByRole("button", { name: /Switch to (dark|light) theme/ }),
    ).toBeInTheDocument();
    expect(within(nav).getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });
});
