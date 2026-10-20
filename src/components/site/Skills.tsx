import { SKILL_GROUPS } from "@/content/portfolio";
import { Reveal, SectionHeader } from "./Reveal";
import { SkillIcon } from "./SkillIcon";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-[1120px] px-5 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeader
        id="skills-title"
        title="Skills"
        lede="The languages, frameworks, and tools I use to design, build, and ship web apps."
      />
      <div className="grid gap-px overflow-hidden rounded-brand border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal key={g.title} index={i} className="bg-surface-1/75 backdrop-blur-xs p-5 sm:p-6">
            <h3 className="text-[13px] font-medium text-fg-muted">{g.title}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-3 sm:grid-cols-1">
              {g.skills.map((s) => (
                <li
                  key={s}
                  className="group flex h-10 items-center gap-2.5 text-[14px] text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  <SkillIcon
                    name={s}
                    className="h-4 w-4 shrink-0 text-fg-subtle transition-colors duration-150 group-hover:text-fg"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
