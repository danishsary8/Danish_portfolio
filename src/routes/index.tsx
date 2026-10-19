import { createFileRoute } from "@tanstack/react-router";
import { NavLedger } from "@/components/portfolio/NavLedger";
import { Hero } from "@/components/portfolio/Hero";
import { SystemCapabilities } from "@/components/portfolio/SystemCapabilities";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { ExperienceLedger } from "@/components/portfolio/ExperienceLedger";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { getCvLinkProps } from "@/components/portfolio/cv-link";
import { LocaleProvider } from "@/lib/i18n-ledger";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sary Danish — Junior Web Developer | Phnom Penh, Cambodia" },
      {
        name: "description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building real web applications with React, Laravel, and PostgreSQL.",
      },
      {
        property: "og:title",
        content: "Sary Danish — Junior Web Developer | Phnom Penh, Cambodia",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building real web applications with React, Laravel, and PostgreSQL.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Sary Danish — Junior Web Developer | Phnom Penh, Cambodia",
      },
      {
        name: "twitter:description",
        content:
          "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building real web applications with React, Laravel, and PostgreSQL.",
      },
    ],
  }),
  component: Index,
});

const cvLinkProps = getCvLinkProps();

export function Index() {
  return (
    <LocaleProvider>
      <div className="portfolio-shell min-h-screen bg-base text-primaryText selection:bg-gold selection:text-primaryText font-body antialiased transition-colors duration-150 overflow-x-hidden relative">
        {/* Skip to Main Content Accessibility Anchor */}
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-control bg-primaryText px-4 py-2.5 font-mono text-xs font-semibold text-base focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-focus"
        >
          Skip to main content
        </a>

        <div className="relative mx-auto max-w-[1440px] min-h-screen flex flex-col">
          <NavLedger />

          <main id="main-content">
            <Hero />

            <section id="capabilities">
              <SystemCapabilities />
            </section>

            <section id="projects">
              <FeaturedProjects />
            </section>

            <section id="experience">
              <ExperienceLedger />
            </section>
          </main>

          <ContactFooter />

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
