import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "@/content/portfolio";
import { SPRING_UI } from "@/lib/motion";
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
 * Swiss / minimal "typographic index": the four groups set large on the left like a contents
 * page; pointing at one (or clicking, or focusing) swaps the right column to that group's tools,
 * which rise in one after another. Every group's list stays in the DOM (inactive ones `hidden`),
 * so content is complete without JavaScript and for assistive tech.
 */
export function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6 [&>div:first-child]:lg:mb-14"
    >
      <SectionHeader
        id="skills-title"
        title="Skills"
        lede="Everything on my CV, grouped by where it sits in the stack."
      />

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-20">
        {/* Index */}
        <Reveal className="slide-from-left">
          <div role="tablist" aria-label="Skill groups" aria-orientation="vertical" className="relative">
            {SKILL_GROUPS.map((g, i) => {
              const on = i === active;
              return (
                <div key={g.title} className="relative py-1.5">
                  {on ? (
                    <motion.span
                      layoutId="skills-index-bar"
                      transition={SPRING_UI}
                      aria-hidden="true"
                      className="absolute -left-6 top-1/2 h-[2px] w-4 -translate-y-1/2 rounded-full bg-fg"
                    />
                  ) : null}
                  <div className="flex items-start gap-3">
                    <h3
                      className={`text-[44px] font-semibold leading-[1.08] tracking-[-0.035em] transition-colors duration-200 ${on ? "text-fg" : "text-fg-subtle/45"}`}
                    >
                      {g.title}
                    </h3>
                    <span className="mt-2 font-mono text-[13px] tabular-nums text-fg-subtle">
                      {g.skills.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="tab"
                    id={`skills-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`skills-panel-${i}`}
                    aria-label={g.title}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="absolute inset-0 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                  />
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Active group's tools */}
        <Reveal index={1} className="slide-from-right">
          <div className="min-h-[268px] border-t border-fg pt-5">
            {SKILL_GROUPS.map((g, i) => (
              <ul
                key={g.title}
                role="tabpanel"
                id={`skills-panel-${i}`}
                aria-labelledby={`skills-tab-${i}`}
                hidden={i !== active}
                className="skills-panel grid grid-cols-2 gap-x-10"
              >
                {g.skills.map((skill, j) => (
                  <li
                    key={skill}
                    className="skills-entry flex h-[52px] items-center gap-3.5 border-b border-line text-[19px] tracking-[-0.015em] text-fg"
                    style={{ "--j": j, "--brand": themedSkillColor(skill) } as CSSProperties}
                  >
                    <SkillIcon name={skill} className="skills-glyph h-5 w-5" />
                    {skill}
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-[13px] font-medium text-fg-subtle">Beyond the code</h3>
            <ul className="mt-2 flex flex-wrap gap-x-1 text-[15px] text-fg-muted">
              {SOFT_SKILLS.map((s, i) => (
                <li key={s}>
                  {s}
                  {i < SOFT_SKILLS.length - 1 ? <span aria-hidden="true">,&nbsp;</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;
