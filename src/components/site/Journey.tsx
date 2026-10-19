import { Award, Briefcase, GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "@/content/portfolio";
import { RevealGroup, RevealItem, SectionHeading } from "./Reveal";

export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-24 sm:px-6 lg:py-36"
    >
      <SectionHeading
        id="journey-title"
        title="Experience & education"
        lede="Hands-on team work on a real booking platform, an award for applied AI, and a steady path through university and focused courses."
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <div>
          <h3 className="mb-5 flex items-center gap-2.5 text-[15px] font-semibold text-primaryText">
            <Briefcase
              className="h-[18px] w-[18px] text-gold-ink"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Experience
          </h3>
          <RevealGroup as="ol" className="grid gap-4">
            {EXPERIENCE.map((e) => {
              const isAward = e.title.includes("Expert System");
              return (
                <RevealItem as="li" key={e.title} className="glass-card p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div className="min-w-0">
                      <h4 className="flex items-center gap-2 font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-primaryText sm:text-[24px]">
                        {isAward ? (
                          <Award
                            className="h-5 w-5 shrink-0 text-gold-ink"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        ) : null}
                        {e.title}
                      </h4>
                      <p className="mt-1 text-[15px] font-medium text-primaryText">{e.org}</p>
                      <p className="text-[14px] text-mutedText">{e.detail}</p>
                    </div>
                    <p className="font-mono text-[13px] tabular-nums text-mutedText">{e.period}</p>
                  </div>
                  <ul className="mt-5 grid gap-2.5">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-[1.55] text-mutedText">
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <div>
          <h3 className="mb-5 flex items-center gap-2.5 text-[15px] font-semibold text-primaryText">
            <GraduationCap
              className="h-[18px] w-[18px] text-gold-ink"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Education
          </h3>
          <RevealGroup as="ol" className="glass-card divide-y divide-glass-border">
            {EDUCATION.map((ed) => (
              <RevealItem as="li" key={ed.title} className="px-5 py-5 sm:px-6">
                <p className="font-mono text-[12.5px] tabular-nums text-mutedText">{ed.period}</p>
                <h4 className="mt-1.5 text-[16px] font-semibold leading-[1.35] text-primaryText">
                  {ed.title}
                </h4>
                <p className="text-[14px] text-mutedText">{ed.org}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
