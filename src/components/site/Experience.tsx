import type { CSSProperties } from "react";
import { ArrowRight, BadgeCheck, GitPullRequest, LayoutDashboard, MessagesSquare, Trophy } from "lucide-react";
import { EXPERIENCE } from "@/content/portfolio";
import { OrgLogo } from "./OrgLogo";
import { CertificateThumb } from "./CertificateThumb";
import certInternship from "@/assets/certificates/internship-kru.webp";
import certAward from "@/assets/certificates/ai-competition-norton.webp";
import { Reveal, SectionHeader } from "./Reveal";

const [INTERN, AWARD] = EXPERIENCE;

// 2026 at a glance: where each milestone sits along the year (0–100% of the strip).
const MILESTONES = [
  { at: 0, date: "Jul 2026", label: "Internship starts · Frontend" },
  { at: 45, date: "Sep 2026", label: "AI competition · 1st place", gold: true },
  { at: 72, date: "Oct 2026", label: "Frontend certified · Backend begins" },
  { at: 100, date: "Now", label: "Building REST APIs", live: true },
] as const;

const WORKED_WITH = ["React", "Laravel", "REST APIs", "Git & GitHub", "Pull requests", "Teamwork"];

function Timeline() {
  return (
    <div aria-hidden="true" className="exp-timeline relative mx-2 mb-10 mt-1 h-[54px]">
      <span className="absolute inset-x-0 top-[7px] h-px bg-line-strong" />
      <span className="exp-timeline-fill absolute inset-x-0 top-[7px] h-px bg-fg" />
      {MILESTONES.map((m, i) => (
        <div
          key={m.date}
          className="exp-milestone absolute top-0 flex flex-col"
          style={
            {
              left: `${m.at}%`,
              "--i": i,
              transform: m.at === 100 ? "translateX(-100%)" : m.at === 0 ? "none" : "translateX(-50%)",
              alignItems: m.at === 100 ? "flex-end" : m.at === 0 ? "flex-start" : "center",
            } as CSSProperties
          }
        >
          <span
            className={`relative block h-[15px] w-[15px] rounded-full border-2 shadow-[0_0_0_4px_var(--bg)] ${
              "gold" in m ? "border-gold bg-gold" : "live" in m ? "border-[#34C759] bg-[#34C759] about-live-dot" : "border-fg bg-bg"
            }`}
          />
          <span className="mt-2 font-mono text-[12px] tabular-nums text-fg">{m.date}</span>
          <span className="whitespace-nowrap text-[12px] text-fg-subtle">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Experience as two full-width case cards under the 2026 timeline. Each card pairs the story
 * (what, how, with whom) with an evidence panel: the real certificate, clickable to view.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-6 lg:py-28"
    >
      <SectionHeader
        id="experience-title"
        title="Experience"
        lede="Where my skills met real work in 2026: a product team internship and a first-place competition project."
      />

      <Reveal>
        <Timeline />
      </Reveal>

      <ol className="grid gap-6">
        {/* Internship: header, then the two stages side by side */}
        <Reveal as="li" className="slide-from-left">
          <article className="exp-card tactile squircle [--r:28px] overflow-hidden bg-surface-2">
            <header className="flex flex-wrap items-start gap-x-6 gap-y-4 px-8 pb-6 pt-7">
              <div className="flex shrink-0 items-center">
                <OrgLogo org="etec" size={52} />
                <OrgLogo org="kru" size={52} className="-ml-2.5 ring-[3px] ring-surface-2" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-fg">{INTERN.title}</h3>
                <p className="mt-1 text-[14px] text-fg-muted">
                  <span className="font-medium text-fg">{INTERN.org}</span> · {INTERN.detail}
                </p>
                <p className="mt-3 max-w-[66ch] text-pretty text-[15.5px] leading-[1.6] text-fg-muted">{INTERN.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills used">
                  {WORKED_WITH.map((w) => (
                    <span key={w} className="rounded-[8px] border border-line bg-surface-1 px-2.5 py-1 text-[12.5px] text-fg-muted">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-[12px] tabular-nums text-fg">
                <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
                {INTERN.period}
              </span>
            </header>

            <div className="grid gap-4 px-8 pb-8 lg:grid-cols-2">
              {/* Frontend: done, with its certificate */}
              <section aria-label="Frontend stage" className="flex flex-col rounded-[20px] border border-line bg-surface-1 px-6 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2.5">
                    <span aria-hidden="true" className="icon-tile-light squircle [--r:10px] grid h-9 w-9 place-items-center text-fg">
                      <LayoutDashboard strokeWidth={1.75} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[18px] font-semibold tracking-[-0.02em] text-fg">Frontend</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 text-[12px] font-medium text-fg">
                    <BadgeCheck aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5 text-[#34C759]" />
                    Certified
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[12px] tabular-nums text-fg-subtle">Jul – Oct 2026</p>
                <ul className="mb-4 mt-3 grid gap-2">
                  {INTERN.frontend.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-[1.55] text-fg">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-fg-subtle" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-4 border-t border-line pt-4">
                  <CertificateThumb
                    src={certInternship}
                    width={1600}
                    height={1119}
                    size={92}
                    tilt={-3}
                    title="Certificate of Completion: Web Frontend Development"
                    caption="KRU IT Solution with ETEC Center · Granted October 15, 2026"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-fg">Certificate of Completion</p>
                    <p className="text-[12.5px] text-fg-subtle">Oct 15, 2026 · click to view</p>
                  </div>
                </div>
              </section>

              {/* Backend: in progress */}
              <section
                aria-label="Backend stage"
                className="flex flex-col rounded-[20px] border border-[color-mix(in_oklab,#34C759_35%,transparent)] bg-[color-mix(in_oklab,#34C759_6%,var(--surface-2))] px-6 py-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2.5">
                    <span aria-hidden="true" className="icon-tile-light squircle [--r:10px] grid h-9 w-9 place-items-center text-fg">
                      <GitPullRequest strokeWidth={1.75} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[18px] font-semibold tracking-[-0.02em] text-fg">Backend</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 text-[12px] font-medium text-fg">
                    <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
                    In progress
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[12px] tabular-nums text-fg-subtle">Oct 2026 – now</p>
                <ul className="mb-4 mt-3 grid gap-2">
                  {INTERN.backend.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-[1.55] text-fg">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#34C759]" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center gap-3 border-t border-line pt-4 text-[13px] text-fg-muted">
                  <MessagesSquare aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-fg-subtle" />
                  Frontend experience helps me design APIs that are easy to use
                </div>
              </section>
            </div>

          </article>
        </Reveal>

        {/* Competition: evidence left, story right */}
        <Reveal as="li" index={1} className="slide-from-right">
          <article className="exp-card exp-award tactile squircle [--r:28px] relative grid overflow-hidden bg-surface-2 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div aria-hidden="true" className="exp-award-wash pointer-events-none absolute inset-0" />
            <aside className="relative order-2 flex flex-col items-center justify-center gap-3 border-t border-line bg-surface-1 p-8 lg:order-none lg:border-r lg:border-t-0">
              <CertificateThumb
                src={certAward}
                width={1200}
                height={1911}
                size={176}
                tilt={3}
                title="Certificate of Achievement: 1st Place"
                caption="AI Expert System and Innovation 2026 · Norton University, Department of Computer Studies · September 26, 2026"
              />
              <p className="text-center text-[12.5px] text-fg-subtle">1st place certificate · click to view</p>
            </aside>

            <div className="relative flex flex-col p-8">
              <div className="flex items-center gap-3">
                <span className="icon-tile-gold squircle [--r:14px] grid h-12 w-12 place-items-center">
                  <Trophy aria-hidden="true" strokeWidth={1.75} className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-fg">Innovation Competition</p>
                  <p className="text-[13px] text-fg-subtle">Department of Computer Studies</p>
                </div>
                <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[12px] tabular-nums text-fg">
                  {AWARD.period}
                </span>
              </div>

              <h3 className="mt-7 text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-fg">
                Joined a project competition, won <span className="text-gold-ink dark:text-gold">1st place</span>
              </h3>
              <p className="mt-2 text-[15px] text-fg-muted">
                <span className="text-fg-subtle">Competition · </span>
                <span className="font-medium text-fg">{AWARD.title}</span>
              </p>
              <p className="mt-3 max-w-[60ch] text-pretty text-[16px] leading-[1.6] text-fg-muted">{AWARD.summary}</p>

              <ul className="mt-5 grid gap-2.5">
                {AWARD.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-[1.55] text-fg">
                    <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-1 flex-col">
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="text-[13px] text-fg-subtle">Team project · 4 members</span>
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
                  >
                    See the project
                    <ArrowRight aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </ol>
    </section>
  );
}
