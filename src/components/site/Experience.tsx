import type { CSSProperties } from "react";
import { ArrowRight, BadgeCheck, GitPullRequest, LayoutDashboard, MessagesSquare, Trophy } from "lucide-react";
import { EXPERIENCE } from "@/content/portfolio";
import { OrgLogo } from "./OrgLogo";
import { Reveal, SectionHeader } from "./Reveal";

const [INTERN, AWARD] = EXPERIENCE;

// One icon per internship bullet, in the same order as the content.
const POINT_ICONS = [LayoutDashboard, GitPullRequest, MessagesSquare];

// 2026 at a glance: where each milestone sits along the year (0–100% of the strip).
const MILESTONES = [
  { at: 0, date: "Jul 2026", label: "Internship starts · Frontend" },
  { at: 45, date: "Sep 2026", label: "AI competition · 1st place", gold: true },
  { at: 72, date: "Oct 2026", label: "Frontend certified · Backend begins" },
  { at: 100, date: "Now", label: "Building REST APIs", live: true },
] as const;

const WORKED_WITH = ["REST APIs", "UI dashboards", "Git & GitHub", "Pull requests"];

function Timeline() {
  return (
    <div aria-hidden="true" className="exp-timeline relative mx-2 mb-7 mt-1 h-[54px] [@media(max-height:760px)]:mb-4">
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
 * Experience as two showcase cards under a 2026 timeline strip: the internship (two stages,
 * what the work touched) and the AI competition win (team project, gold accents only here).
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6 [&>div:first-child]:lg:mb-8 [@media(max-height:760px)]:[&>div:first-child]:lg:mb-5"
    >
      <SectionHeader
        id="experience-title"
        title="Experience"
        lede="A team internship on a real booking platform, and a first-place AI project."
      />

      <Reveal>
        <Timeline />
      </Reveal>

      <ol className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Internship */}
        <Reveal as="li" className="slide-from-left">
          <article className="exp-card tactile squircle [--r:24px] flex h-full flex-col bg-surface-2 p-6 [@media(max-height:760px)]:p-5">
            <div className="flex items-start gap-4">
              <div className="flex shrink-0 items-center">
                <OrgLogo org="etec" size={46} />
                <OrgLogo org="kru" size={46} className="-ml-2.5 ring-[3px] ring-surface-2" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[21px] font-semibold leading-tight tracking-[-0.025em] text-fg">{INTERN.title}</h3>
                <p className="mt-0.5 text-[14px] text-fg-muted">
                  <span className="text-fg">{INTERN.org}</span> · {INTERN.detail}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-[12px] tabular-nums text-fg">
                <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
                {INTERN.period}
              </span>
            </div>

            {/* Two stages */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 [@media(max-height:760px)]:mt-4">
              <div className="rounded-[14px] border border-line bg-surface-1 px-4 py-3">
                <p className="flex items-center gap-1.5 text-[13.5px] font-medium text-fg">
                  Frontend
                  <BadgeCheck aria-hidden="true" strokeWidth={2} className="h-4 w-4 text-[#34C759]" />
                </p>
                <p className="font-mono text-[12px] tabular-nums text-fg-subtle">Jul – Oct 2026 · certified</p>
              </div>
              <div className="rounded-[14px] border border-[color-mix(in_oklab,#34C759_40%,transparent)] bg-[color-mix(in_oklab,#34C759_7%,var(--surface-2))] px-4 py-3">
                <p className="text-[13.5px] font-medium text-fg">Backend</p>
                <p className="font-mono text-[12px] tabular-nums text-fg-subtle">Oct 2026 – now</p>
              </div>
            </div>

            <ul className="mt-5 grid gap-3 [@media(max-height:760px)]:mt-4 [@media(max-height:760px)]:gap-2">
              {INTERN.points.map((p, i) => {
                const Icon = POINT_ICONS[i] ?? LayoutDashboard;
                return (
                  <li key={p} className="flex gap-3 text-[14.5px] leading-[1.55] text-fg-muted [@media(max-height:760px)]:text-[13.5px] [@media(max-height:760px)]:leading-[1.45]">
                    <span aria-hidden="true" className="icon-tile-light squircle [--r:9px] grid h-8 w-8 shrink-0 place-items-center text-fg">
                      <Icon strokeWidth={1.75} className="h-4 w-4" />
                    </span>
                    <span className="pt-1">{p}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-4 [@media(max-height:760px)]:pt-3">
              <span className="mr-1 text-[13px] text-fg-subtle">Worked with</span>
              {WORKED_WITH.map((w) => (
                <span key={w} className="rounded-[8px] border border-line bg-surface-1 px-2.5 py-1 text-[12.5px] text-fg-muted">
                  {w}
                </span>
              ))}
            </div>
          </article>
        </Reveal>

        {/* Competition */}
        <Reveal as="li" index={1} className="slide-from-right">
          <article className="exp-card exp-award tactile squircle [--r:24px] relative flex h-full flex-col overflow-hidden bg-surface-2 p-6 [@media(max-height:760px)]:p-5">
            <div aria-hidden="true" className="exp-award-wash pointer-events-none absolute inset-0" />
            <div className="relative flex items-start justify-between gap-3">
              <span className="icon-tile-gold squircle [--r:14px] grid h-12 w-12 place-items-center">
                <Trophy aria-hidden="true" strokeWidth={1.75} className="h-6 w-6" />
              </span>
              <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[12px] tabular-nums text-fg">
                {AWARD.period}
              </span>
            </div>

            <p className="relative mt-5 [@media(max-height:760px)]:mt-3 text-[40px] [@media(max-height:760px)]:text-[34px] font-semibold leading-none tracking-[-0.04em] text-gold-ink dark:text-gold">
              1st Place
            </p>
            <h3 className="relative mt-2 text-[19px] font-semibold leading-tight tracking-[-0.02em] text-fg">{AWARD.title}</h3>
            <p className="relative mt-1 text-[13.5px] text-fg-muted">{AWARD.detail}</p>

            <ul className="relative mt-4 grid gap-2">
              {AWARD.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-[14px] leading-[1.55] text-fg-muted [@media(max-height:760px)]:text-[13.5px] [@media(max-height:760px)]:leading-[1.45]">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 [@media(max-height:760px)]:pt-3">
              <span className="text-[13px] text-fg-subtle">Team project · 4 members</span>
              <a
                href="#projects"
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
              >
                See the project
                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5" />
              </a>
            </div>
          </article>
        </Reveal>
      </ol>
    </section>
  );
}
