import { ArrowUpRight, Award, Code2, LayoutGrid, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { OrgLogo } from "./OrgLogo";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

/**
 * Engineering practices and standards, reflecting Danish's hands-on full-stack workflow.
 */
const PRACTICES = [
  {
    icon: LayoutGrid,
    term: "Responsive & Intuitive Interfaces",
    detail:
      "Fluid, mobile-first layouts styled with Tailwind CSS, built with semantic HTML, optical balance, and responsive touch ergonomics across all viewports.",
  },
  {
    icon: ShieldCheck,
    term: "Secure APIs & Authentication",
    detail:
      "Robust REST services built with Laravel and Flask — integrating JWT sessions, OTP verification, Google OAuth, and granular role-based access control.",
  },
  {
    icon: Code2,
    term: "Clean Architecture & Collaboration",
    detail:
      "Scalable, readable codebases maintained through Git feature branching, thorough pull request reviews, and dependable data schemas.",
  },
] as const;

/**
 * Core Stack chips with authentic technologies from CV.
 */
const CORE_STACK = [
  "React",
  "Laravel",
  "PostgreSQL",
  "Tailwind CSS",
  "Flask",
  "Docker",
] as const;

/**
 * 4 Live Deliverables with quick jump targets.
 */
const LIVE_PROJECTS = [
  { name: "Bookly", kind: "Online bookstore" },
  { name: "Loomora", kind: "Habit planner" },
  { name: "Cambodian Driving Rules app", kind: "Driver theory app" },
  { name: "Clinical Expert System", kind: "AI award winner" },
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className={SECTION}>
      <SectionHeader
        id="about-title"
        title="About"
        lede="Who I am, what I build, and where I’m heading next."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5.2fr)_minmax(0,6.8fr)] lg:gap-14 xl:gap-20">
        {/* Left Column: Manifesto Quote & Authentic Credentials Card */}
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* Editorial Lead Pull-Quote */}
          <Reveal as="figure" className="tactile squircle [--r:24px] relative overflow-hidden p-7 sm:p-8">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                <Sparkles strokeWidth={2} className="h-3.5 w-3.5 text-gold" />
                Core Philosophy
              </span>
              <span className="font-mono text-[11px] text-fg-subtle tabular-nums">
                {PROFILE.location}
              </span>
            </div>

            <blockquote className="text-balance text-[24px] font-medium leading-[1.2] tracking-[-0.03em] text-fg sm:text-[28px] lg:text-[30px] xl:text-[32px]">
              <span aria-hidden="true" className="select-none text-gold">
                “
              </span>
              Building software isn't just about writing code — it's about solving real problems that make life easier.
              <span aria-hidden="true" className="select-none text-gold">
                ”
              </span>
            </blockquote>

            <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[13px] text-fg-muted">
              <span className="font-medium text-fg">{PROFILE.name}</span>
              <span className="font-mono text-[12px] text-fg-subtle tabular-nums">
                Russey Keo, Phnom Penh
              </span>
            </figcaption>
          </Reveal>

          {/* Authentic Identity & Milestone Ledger */}
          <Reveal index={1} className="tactile squircle [--r:24px] overflow-hidden p-6 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                Milestones &amp; Context
              </h3>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-gold tabular-nums">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                2024 — Present
              </span>
            </div>

            <div className="divide-y divide-line">
              {/* University */}
              <div className="flex items-center gap-4 py-3.5 first:pt-0">
                <OrgLogo org="norton" size={38} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-[-0.01em] text-fg">
                    4th-year Software Development student
                  </p>
                  <p className="text-[12.5px] text-fg-muted">
                    Norton University (Phnom Penh, Cambodia)
                  </p>
                </div>
              </div>

              {/* Internship */}
              <div className="flex items-center gap-4 py-3.5">
                <div className="flex shrink-0 -space-x-2">
                  <OrgLogo org="etec" size={32} />
                  <OrgLogo org="kru" size={32} className="ring-2 ring-surface-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-[-0.01em] text-fg">
                    Web Developer Intern
                  </p>
                  <p className="text-[12.5px] text-fg-muted">
                    ETEC &amp; KruITSolution (weekend shifts, shipping screens for a travel-booking product)
                  </p>
                </div>
              </div>

              {/* Clinical AI Award */}
              <div className="flex items-center gap-4 py-3.5">
                <span
                  aria-hidden="true"
                  className="icon-tile-gold squircle [--r:9px] grid h-[38px] w-[38px] shrink-0 place-items-center"
                >
                  <Award strokeWidth={1.8} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-[-0.01em] text-fg">
                    AI Expert System &amp; Innovation 2026 Award Winner
                  </p>
                  <p className="text-[12.5px] text-fg-muted">
                    Team winner for clinical expert system
                  </p>
                </div>
              </div>

              {/* Production Track Record */}
              <div className="flex items-center gap-4 py-3.5 last:pb-0">
                <span
                  aria-hidden="true"
                  className="icon-tile squircle [--r:9px] grid h-[38px] w-[38px] shrink-0 place-items-center"
                >
                  <Terminal strokeWidth={1.8} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium tracking-[-0.01em] text-fg">
                    4 Live Production Projects
                  </p>
                  <p className="text-[12.5px] text-fg-muted">
                    Bookly, Loomora, Driving Rules app, Clinical Expert System
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Narrative Prose, Engineering Practices & Deliverables */}
        <div className="space-y-10">
          {/* Narrative Storyline */}
          <div className="space-y-5 text-[15.5px] leading-[1.7] text-fg-muted sm:text-[16px]">
            <Reveal as="p" index={1}>
              I’m a <span className="text-fg">4th-year Software Development student at Norton University (Phnom Penh, Cambodia)</span>.{" "}
              <span className="text-fg font-medium">
                I enjoy turning practical problems and business ideas into working software.
              </span>
            </Reveal>

            <Reveal as="p" index={2}>
              On weekends, I serve as a{" "}
              <span className="text-fg font-medium">
                Web Developer Intern at ETEC &amp; KruITSolution (weekend shifts, shipping screens for a travel-booking product)
              </span>
              .{" "}
              <span>
                Always ready to learn and work with new tools or technologies.
              </span>{" "}
              My day-to-day focus is on{" "}
              <span className="text-fg">
                delivering clean, maintainable code whether collaborating in a team or building solo.
              </span>
            </Reveal>

            <Reveal as="p" index={3}>
              My engineering foundation relies on my{" "}
              <span className="text-fg font-medium">
                Core Stack: React, Laravel, PostgreSQL, Tailwind CSS, Flask, Docker
              </span>
              . Across my{" "}
              <span className="text-fg">
                4 live projects: Bookly (online bookstore), Loomora (habit planner), Cambodian Driving Rules app, and Clinical Expert System
              </span>{" "}
              — where our team achieved the{" "}
              <span className="font-medium text-gold-ink dark:text-gold">
                AI Expert System &amp; Innovation 2026 Award Winner (Team winner for clinical expert system)
              </span>{" "}
              — I bridge resilient backend endpoints with fluid, dependable interfaces.
            </Reveal>
          </div>

          {/* Interactive "How I Work" / Practices */}
          <Reveal index={4}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-fg">How I work</h3>
              <span className="font-mono text-[12px] text-fg-subtle">Engineering Standards</span>
            </div>

            <dl className="tactile squircle [--r:20px] grid gap-px overflow-hidden bg-[var(--edge)]">
              {PRACTICES.map(({ icon: Icon, term, detail }) => (
                <div
                  key={term}
                  className="group grid grid-cols-[38px_minmax(0,1fr)] gap-x-4 bg-surface-2 px-5 py-5 transition-colors duration-150 hover:bg-surface-1 sm:grid-cols-[38px_220px_minmax(0,1fr)] sm:items-center"
                >
                  <span
                    aria-hidden="true"
                    className="icon-tile squircle [--r:9px] row-span-2 grid h-9 w-9 place-items-center transition-transform duration-150 group-hover:scale-105 sm:row-span-1"
                  >
                    <Icon strokeWidth={1.75} className="h-[18px] w-[18px]" />
                  </span>
                  <dt className="self-center text-[15px] font-medium tracking-[-0.01em] text-fg">
                    {term}
                  </dt>
                  <dd className="mt-1 text-[14.5px] leading-[1.6] text-fg-muted sm:mt-0">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Core Stack & Live Projects Interactive Deck */}
          <Reveal index={5} className="tactile squircle [--r:22px] p-6 sm:p-7">
            <div className="space-y-6">
              {/* Stack Chips */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                    Core Technical Stack
                  </h4>
                  <span className="font-mono text-[11.5px] text-fg-subtle">Verified in production</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CORE_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="tactile squircle [--r:8px] inline-flex items-center px-3 py-1.5 font-mono text-[12.5px] font-medium text-fg shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-line-strong select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Quick-Links */}
              <div className="border-t border-line pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                    4 Live Projects
                  </h4>
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-1 text-[12.5px] font-medium text-gold hover:underline"
                  >
                    View projects
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {LIVE_PROJECTS.map((p) => (
                    <a
                      key={p.name}
                      href="#projects"
                      className="tactile squircle [--r:12px] group flex min-h-[44px] items-center justify-between px-3.5 py-2.5 transition-all duration-150 hover:-translate-y-0.5 hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-medium text-fg transition-colors group-hover:text-gold">
                          {p.name}
                        </p>
                        <p className="truncate text-[12px] text-fg-muted">{p.kind}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-fg-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
