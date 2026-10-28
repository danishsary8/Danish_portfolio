import type { CSSProperties, MouseEvent } from "react";
import { ArrowUpRight, Award, Check, Code2, LayoutGrid, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { OrgLogo } from "./OrgLogo";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

// The owner's philosophy line; each word sharpens on scroll (ScrollReveal).
const QUOTE =
  "Building software isn't just about writing code — it's about solving real problems that make life easier.";

// How he works: each line names a habit, then the concrete practice behind it (CV-true).
const PRACTICES = [
  {
    icon: LayoutGrid,
    term: "Interfaces that feel effortless",
    detail: "Mobile-first layouts in Tailwind CSS, semantic HTML and touch-friendly controls that hold up on any screen.",
  },
  {
    icon: ShieldCheck,
    term: "APIs you can trust",
    detail: "REST services in Laravel and Flask, protected with JWT sessions, OTP checks, Google sign-in and role-based access.",
  },
  {
    icon: Code2,
    term: "Code a team can keep",
    detail: "Feature branches, reviewed pull requests and tidy data models, so the next change is as easy as the first.",
  },
] as const;

const LIVE_PROJECTS = [
  { name: "Bookly", kind: "Online bookstore" },
  { name: "Loomora", kind: "Habit planner" },
  { name: "Driving Rules", kind: "Driving theory app" },
  { name: "Diabetes Expert System", kind: "Award-winning clinical assistant", award: true },
] as const;

function scrollToProjects(e: MouseEvent<HTMLAnchorElement>) {
  const el = document.getElementById("projects");
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth" });
}

export function About() {
  const words = QUOTE.split(" ");

  return (
    <section id="about" aria-labelledby="about-title" className={SECTION}>
      <SectionHeader
        id="about-title"
        title="About"
        lede="Who I am, what I build, and where I’m heading next."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-20">
        {/* Left: philosophy card + milestones well (sticky on desktop) */}
        <div className="space-y-12 lg:sticky lg:top-28 lg:self-start">
          <Reveal as="figure" className="neu-raised neu-paper squircle [--r:28px] m-0 p-7 sm:p-9">
            <blockquote className="scroll-reveal text-balance text-[26px] font-medium leading-[1.22] tracking-[-0.03em] text-fg sm:text-[30px] xl:text-[32px]">
              <span aria-hidden="true" className="select-none text-gold">
                “
              </span>
              {words.map((w, i) => (
                <span
                  key={i}
                  className="scroll-reveal-word"
                  style={{ "--p": i / Math.max(1, words.length - 1) } as CSSProperties}
                >
                  {w}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
              <span aria-hidden="true" className="select-none text-gold">
                ”
              </span>
            </blockquote>
            <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-4 text-[13.5px]">
              <span className="font-medium text-fg">{PROFILE.name}</span>
              <span className="text-fg-subtle">Russey Keo, Phnom Penh</span>
            </figcaption>
          </Reveal>

          {/* Milestones: a pressed-in well, read like an engraved plate */}
          <Reveal index={1}>
            <h3 className="mb-3 text-[15px] font-medium text-fg">Milestones</h3>
            <ol className="neu-inset squircle [--r:22px] divide-y divide-line px-5">
              <li className="flex items-center gap-4 py-4">
                <OrgLogo org="norton" size={38} />
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-medium tracking-[-0.01em] text-fg">
                    Software Development, 4th year
                  </p>
                  <p className="text-[13px] text-fg-muted">Norton University · 2024 – now</p>
                </div>
              </li>

              {/* Internship track: frontend stage completed, backend stage current */}
              <li className="flex gap-4 py-4">
                <div className="flex shrink-0 -space-x-2 self-start">
                  <OrgLogo org="etec" size={32} />
                  <OrgLogo org="kru" size={32} className="ring-2 ring-[var(--bg)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-fg-muted">ETEC &amp; KruITSolution</p>
                  <ol className="relative mt-2 space-y-2.5 border-l border-line-strong pl-4">
                    <li className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_0_3px_var(--bg)]"
                      />
                      <p className="flex flex-wrap items-baseline gap-x-2 text-[14.5px] font-medium tracking-[-0.01em] text-fg">
                        Backend Developer Intern
                        <span className="font-mono text-[11.5px] font-normal tabular-nums text-fg-subtle">
                          Oct 2026 – now
                        </span>
                      </p>
                    </li>
                    <li className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[22px] top-1 grid h-3 w-3 place-items-center rounded-full bg-[var(--bg)] text-fg-subtle shadow-[0_0_0_1px_var(--line-strong)]"
                      >
                        <Check strokeWidth={3} className="h-2 w-2" />
                      </span>
                      <p className="flex flex-wrap items-baseline gap-x-2 text-[14px] text-fg-muted">
                        Frontend Developer Intern
                        <span className="font-mono text-[11.5px] tabular-nums text-fg-subtle">
                          Jul – Oct 2026 · completed
                        </span>
                      </p>
                    </li>
                  </ol>
                </div>
              </li>

              <li className="flex items-center gap-4 py-4">
                <span
                  aria-hidden="true"
                  className="icon-tile-gold squircle [--r:10px] grid h-[38px] w-[38px] shrink-0 place-items-center"
                >
                  <Award strokeWidth={1.8} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-medium tracking-[-0.01em] text-fg">
                    AI Expert System &amp; Innovation 2026
                  </p>
                  <p className="text-[13px] text-gold-ink dark:text-gold">
                    Award winner (team) · Diabetes Expert System
                  </p>
                </div>
              </li>
            </ol>
          </Reveal>
        </div>

        {/* Right: story, how I work, live work */}
        <div className="space-y-12">
          <div className="space-y-5">
            <Reveal as="p" className="text-pretty text-[21px] font-medium leading-[1.4] tracking-[-0.02em] text-fg sm:text-[24px]">
              I turn practical problems and business ideas into dependable software, as a
              collaborative teammate or an independent builder.
            </Reveal>
            <Reveal as="p" index={1} className="max-w-[60ch] text-pretty text-[16px] leading-[1.7] text-fg-muted">
              I pick up new tools quickly and like seeing an idea all the way through, from the first
              sketch of the data model to the day people actually use it.
            </Reveal>
          </div>

          {/* How I work: one raised panel, each habit in a pressed-in icon well */}
          <Reveal index={2}>
            <h3 className="mb-4 text-[15px] font-medium text-fg">How I work</h3>
            <dl className="neu-raised squircle [--r:24px] divide-y divide-line px-6">
              {PRACTICES.map(({ icon: Icon, term, detail }) => (
                <div key={term} className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-4 py-5">
                  <span
                    aria-hidden="true"
                    className="neu-inset squircle [--r:12px] grid h-11 w-11 place-items-center text-fg"
                  >
                    <Icon strokeWidth={1.75} className="h-[19px] w-[19px]" />
                  </span>
                  <div>
                    <dt className="text-[15.5px] font-medium tracking-[-0.01em] text-fg">{term}</dt>
                    <dd className="mt-1 text-[14.5px] leading-[1.6] text-fg-muted">{detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Live work: keys that sink into the surface on hover */}
          <Reveal index={3}>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="text-[15px] font-medium text-fg">Live today</h3>
              <a
                href="#projects"
                onClick={scrollToProjects}
                className={`group inline-flex min-h-11 items-center gap-1 text-[13.5px] font-medium text-fg-muted transition-colors duration-150 hover:text-fg ${FOCUS}`}
              >
                See the projects
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:translate-x-px"
                />
              </a>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {LIVE_PROJECTS.map((p) => (
                <li key={p.name}>
                  <a
                    href="#projects"
                    onClick={scrollToProjects}
                    className={`neu-key squircle [--r:16px] group flex min-h-[64px] items-center justify-between gap-3 px-4 py-3 ${FOCUS}`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[14.5px] font-medium tracking-[-0.01em] text-fg">
                        {p.name}
                      </span>
                      <span
                        className={`block truncate text-[12.5px] ${
                          "award" in p ? "text-gold-ink dark:text-gold" : "text-fg-muted"
                        }`}
                      >
                        {p.kind}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-150 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:translate-x-px"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
