import { SKILL_GROUPS } from "@/content/portfolio";
import { useTheme } from "@/lib/use-theme";
import { Reveal, SECTION, SectionHeader } from "./Reveal";
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

export function Skills() {
  const { dark } = useTheme();

  return (
    <section id="skills" aria-labelledby="skills-title" className={SECTION}>
      <SectionHeader
        id="skills-title"
        title="Skills"
        lede="Everything on my CV, grouped by where it sits in the stack."
      />

      <Reveal className="tactile squircle [--r:20px] overflow-hidden">
        <div className="group/skills grid gap-px bg-[var(--edge)] sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="bg-surface-2 p-6 lg:p-7 [&>*]:transition-opacity [&>*]:duration-200 [&>*]:ease-[var(--ease-out)] lg:group-hover/skills:[&>*]:opacity-50 lg:hover:[&>*]:!opacity-100"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">{group.title}</h3>
                <span className="font-mono text-[12px] tabular-nums text-fg-subtle">
                  {group.skills.length}
                </span>
              </div>
              <ul className="mt-5 space-y-0.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="-mx-2 flex h-10 items-center gap-3 rounded-[10px] px-2 text-[14.5px] text-fg-muted transition-colors duration-150 hover:bg-surface-1 hover:text-fg"
                  >
                    <span
                      aria-hidden="true"
                      className="squircle [--r:7px] grid h-7 w-7 shrink-0 place-items-center border border-[var(--edge)] bg-surface-1"
                    >
                      <SkillIcon
                        name={skill}
                        className="h-4 w-4"
                        style={{ color: themedSkillColor(skill, dark) }}
                      />
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal index={1} className="mt-8">
        <p className="text-[14.5px] leading-[1.7] text-fg-muted">
          <span className="font-medium text-fg">Beyond the code: </span>
          {SOFT_SKILLS.join(" · ")}
        </p>
      </Reveal>
    </section>
  );
}
