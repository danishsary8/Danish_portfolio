import type { CSSProperties } from "react";
import { SKILL_GROUPS } from "@/content/portfolio";
import { Reveal, SectionHeader } from "./Reveal";
import { SkillIcon, themedSkillColor } from "./SkillIcon";

// Soft skills, verbatim from the CV.
const SOFT_SKILLS = [
  "Teamwork",
  "Adaptable",
  "Problem-solving",
  "Communication",
  "Time management",
  "Flexibility",
  "Fast learner",
];

/**
 * Minimal ledger: no cards, just hairline rows. Group name on the left, the tools as plain
 * icon + name text on the right. Icons rest in grey and take their brand colour on hover;
 * the hairlines draw in one after another when the section arrives.
 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6 [&>div:first-child]:lg:mb-12"
    >
      <SectionHeader
        id="skills-title"
        title="Skills"
        lede="Everything on my CV, grouped by where it sits in the stack."
      />

      <Reveal className="skills-ledger group/ledger">
        {SKILL_GROUPS.map((group, i) => (
          <div
            key={group.title}
            className="skills-row relative grid gap-4 py-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-10"
            style={{ "--i": i } as CSSProperties}
          >
            <span aria-hidden="true" className="skills-rule absolute inset-x-0 top-0 h-px bg-line-strong" />
            <div className="flex items-baseline gap-3">
              <h3 className="text-[17px] font-medium tracking-[-0.015em] text-fg">{group.title}</h3>
              <span className="font-mono text-[12px] tabular-nums text-fg-subtle">
                {String(group.skills.length)}
              </span>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="skills-item inline-flex items-center gap-2.5 text-[15px] text-fg-muted"
                  style={{ "--brand": themedSkillColor(skill) } as CSSProperties}
                >
                  <SkillIcon name={skill} className="skills-icon h-[18px] w-[18px]" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div
          className="skills-row relative grid gap-4 py-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-10"
          style={{ "--i": SKILL_GROUPS.length } as CSSProperties}
        >
          <span aria-hidden="true" className="skills-rule absolute inset-x-0 top-0 h-px bg-line-strong" />
          <h3 className="text-[17px] font-medium tracking-[-0.015em] text-fg">Beyond the code</h3>
          <ul className="flex flex-wrap items-center gap-y-2 text-[15px] text-fg-muted">
            {SOFT_SKILLS.map((s, i) => (
              <li key={s} className="inline-flex items-center">
                {s}
                {i < SOFT_SKILLS.length - 1 ? (
                  <span aria-hidden="true" className="mx-3 text-line-strong">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="skills-rule absolute inset-x-0 bottom-0 h-px bg-line-strong" />
        </div>
      </Reveal>
    </section>
  );
}

export default Skills;
