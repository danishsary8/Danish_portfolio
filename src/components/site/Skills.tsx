import { useState, type CSSProperties } from "react";
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

// Two-letter "element" symbols for the periodic-table layout (visual shorthand only).
const SYMBOL: Record<string, string> = {
  JavaScript: "Js",
  PHP: "Ph",
  Python: "Py",
  Java: "Jv",
  HTML5: "Ht",
  CSS3: "Cs",
  React: "Re",
  Laravel: "Lv",
  Flask: "Fl",
  "Tailwind CSS": "Tw",
  Bootstrap: "Bs",
  "Framer Motion": "Fm",
  Flutter: "Fu",
  PostgreSQL: "Pg",
  Supabase: "Sb",
  Oracle: "Or",
  Git: "Gt",
  GitHub: "Gh",
  "REST APIs": "Ra",
  JWT: "Jw",
  Docker: "Dk",
  Postman: "Pm",
  Cloudinary: "Cl",
  "VS Code": "Vs",
};

type Picked = { skill: string; group: string };

/**
 * "The elements of my stack": every CV tool as a periodic-table element, the four groups as
 * blocks of different heights. Pointing at an element shows it large in the key card. The key
 * card repeats the name through CSS (`attr()`), so the readable list stays the single source.
 */
export function Skills() {
  const [picked, setPicked] = useState<Picked>({ skill: "React", group: "Frameworks & UI" });
  let n = 0;

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6 [&>div:first-child]:lg:mb-8"
    >
      <SectionHeader
        id="skills-title"
        title="Skills"
        lede="The elements of my stack, grouped by where they sit."
      />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10">
        <div>
          {/* The table: four blocks side by side, two columns each */}
          <Reveal className="slide-from-left">
            <div className="flex items-start gap-6">
              {SKILL_GROUPS.map((g) => (
                <div key={g.title} className="min-w-0">
                  <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-line-strong pb-2">
                    <h3 className="text-[14px] font-medium tracking-[-0.01em] text-fg">{g.title}</h3>
                    <span className="font-mono text-[11.5px] tabular-nums text-fg-subtle">{g.skills.length}</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-2">
                    {g.skills.map((skill) => {
                      const i = n++;
                      const on = picked.skill === skill;
                      return (
                        <li
                          key={skill}
                          onMouseEnter={() => setPicked({ skill, group: g.title })}
                          data-on={on || undefined}
                          className="skills-element tactile squircle [--r:12px] relative flex h-[82px] w-[98px] flex-col justify-between bg-surface-2 p-2.5"
                          style={{ "--brand": themedSkillColor(skill), "--i": i } as CSSProperties}
                        >
                          <div className="flex items-start justify-between">
                            <span aria-hidden="true" className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-fg">
                              {SYMBOL[skill] ?? skill.slice(0, 2)}
                            </span>
                            <SkillIcon name={skill} className="h-3.5 w-3.5" style={{ color: themedSkillColor(skill) }} />
                          </div>
                          <span className="truncate text-[11px] leading-tight text-fg-muted">{skill}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Below the table, like the separate row on a real periodic table */}
          <Reveal index={1} className="slide-from-left mt-6 flex items-center gap-4 border-t border-line pt-4">
            <h3 className="shrink-0 text-[14px] font-medium tracking-[-0.01em] text-fg">Beyond the code</h3>
            <ul className="flex flex-wrap gap-1.5">
              {SOFT_SKILLS.map((s) => (
                <li key={s} className="rounded-[7px] border border-line-strong px-2 py-0.5 text-[12px] text-fg-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Key card: the element under the pointer, large */}
        <Reveal index={1} className="slide-from-right">
          <div
            aria-hidden="true"
            className="skills-key tactile squircle [--r:20px] relative overflow-hidden bg-surface-2 p-6"
            style={{ "--brand": themedSkillColor(picked.skill) } as CSSProperties}
          >
            <div className="flex items-start justify-between">
              <span className="text-[12px] text-fg-subtle">{picked.group}</span>
              <SkillIcon
                name={picked.skill}
                className="h-7 w-7"
                style={{ color: themedSkillColor(picked.skill) }}
              />
            </div>
            <p key={picked.skill} className="skills-key-symbol mt-6 text-[100px] font-semibold leading-[0.85] tracking-[-0.05em] text-fg">
              {SYMBOL[picked.skill]}
            </p>
            <p className="skills-key-name mt-5 text-[20px] font-medium tracking-[-0.02em] text-fg" data-label={picked.skill} />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-[var(--brand)] transition-colors duration-300" />
          </div>
          <p className="mt-4 text-[13px] leading-[1.55] text-fg-muted">
            Point at any element to look it up. Brand colours show the real tool.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;
