import { ArrowRight, Award } from "lucide-react";
import { EXPERIENCE } from "@/content/portfolio";
import { OrgLogo } from "./OrgLogo";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

// What the internship work touched, named from its own bullet points.
const WORKED_WITH = ["REST APIs", "UI dashboards", "Git & GitHub", "Feature branches", "Pull requests"];

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className={SECTION}>
      <SectionHeader
        id="experience-title"
        title="Experience"
        lede="Team work on a real booking platform, and an award for applied AI."
      />

      <ol>
        {EXPERIENCE.map((entry, i) => {
          const isAward = entry.title.includes("Expert System");
          const isCurrent = entry.period.includes("Present");
          const last = i === EXPERIENCE.length - 1;
          return (
            <Reveal
              as="li"
              key={entry.title}
              index={i}
              className="grid gap-x-12 gap-y-3 lg:grid-cols-[240px_minmax(0,1fr)]"
            >
              {/* Dates */}
              <div className="lg:pt-8">
                <p className="font-mono text-[13px] tabular-nums text-fg">{entry.period}</p>
                {isCurrent ? (
                  <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-fg-muted">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Current role
                  </p>
                ) : null}
              </div>

              {/* Rail + entry */}
              <div className={`relative pl-10 ${last ? "" : "pb-16"}`}>
                {!last ? (
                  <span
                    aria-hidden="true"
                    className="timeline-rail absolute bottom-0 left-[7px] top-14 w-px bg-line-strong"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-9 grid h-[15px] w-[15px] place-items-center rounded-full border-2 shadow-[0_0_0_4px_var(--bg)] ${
                    isAward ? "border-gold bg-gold" : "border-fg bg-bg"
                  }`}
                />

                <div className="tactile squircle [--r:22px] p-7 lg:p-8">
                {!isAward ? (
                  // The two organisations behind the internship, as an overlapping logo pair.
                  <div className="mb-5 flex items-center">
                    <OrgLogo org="etec" size={44} />
                    <OrgLogo org="kru" size={44} className="-ml-2.5 ring-[3px] ring-surface-2" />
                  </div>
                ) : null}
                <h3 className="flex flex-wrap items-center gap-2.5 text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] text-fg">
                  {isAward ? (
                    <Award
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="h-5 w-5 text-gold-ink dark:text-gold"
                    />
                  ) : null}
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-[15px] text-fg-muted">
                  <span className={isAward ? "text-gold-ink dark:text-gold" : "text-fg"}>
                    {entry.org}
                  </span>
                  <span className="text-fg-subtle"> · {entry.detail}</span>
                </p>

                <ul className="mt-5 grid max-w-[68ch] gap-2.5">
                  {entry.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-[1.6] text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-fg-subtle"
                      />
                      {p}
                    </li>
                  ))}
                </ul>

                {isAward ? (
                  <a
                    href="#projects"
                    className="group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-fg underline decoration-[var(--line-strong)] underline-offset-4 transition-colors duration-150 hover:decoration-fg"
                  >
                    See the Diabetes Expert System
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                    />
                  </a>
                ) : (
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                    <span className="mr-1 text-[13.5px] text-fg-muted">Worked with</span>
                    {WORKED_WITH.map((w) => (
                      <span
                        key={w}
                        className="icon-tile-light squircle [--r:8px] inline-flex h-8 items-center px-3 text-[13px] text-fg-muted"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
