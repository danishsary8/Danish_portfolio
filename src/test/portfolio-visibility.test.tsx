import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { badgeItem, item } from "@/components/portfolio/Reveal";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { SystemCapabilities } from "@/components/portfolio/SystemCapabilities";
import { NavLedger } from "@/components/portfolio/NavLedger";
import { LocaleProvider } from "@/lib/i18n-ledger";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { CodeCraftCompare } from "@/components/portfolio/CodeCraftCompare";
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
});
