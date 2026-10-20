import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { PortfolioBackground } from "@/components/site/PortfolioBackground";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { Projects } from "@/components/site/Projects";
import { Experience } from "@/components/site/Experience";
import { Education } from "@/components/site/Education";
import { Contact, SiteFooter } from "@/components/site/Contact";

const TITLE = "Sary Danish — Junior Web Developer | Phnom Penh, Cambodia";
const DESCRIPTION =
  "Portfolio of Sary Danish, fourth-year Software Development student at Norton University in Phnom Penh, Cambodia. Building real web applications with React, Laravel, and PostgreSQL.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-fg">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-control bg-fg px-4 py-2.5 text-[14px] font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <PortfolioBackground />
      <SiteNav />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}

export default Index;
