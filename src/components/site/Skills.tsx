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

// How the everyday stack fits together, top (what users touch) to bottom (where data lives).
const LAYERS = [
  { name: "Interface", note: "What people touch", tools: ["React", "Tailwind CSS", "JavaScript"] },
  { name: "API", note: "Rules and security", tools: ["Laravel", "REST APIs", "JWT"] },
  { name: "Data", note: "Where it’s kept", tools: ["PostgreSQL", "Supabase"] },
] as const;

/** Three slabs stacked like a real architecture: each lifts toward you on hover. */
function StackDiagram() {
  return (
    <figure className="m-0">
      <div role="list" aria-label="My everyday stack" className="skills-stack relative space-y-3">
        {LAYERS.map((layer, i) => (
          <div
            role="listitem"
            key={layer.name}
            className="skills-slab tactile squircle [--r:18px] relative flex items-center gap-4 bg-surface-2 px-5 py-3.5"
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="w-[124px] shrink-0">
              <p className="text-[15px] font-semibold tracking-[-0.015em] text-fg">{layer.name}</p>
              <p className="mt-0.5 text-[12px] text-fg-subtle">{layer.note}</p>
            </div>
            <span aria-hidden="true" className="h-8 w-px bg-line" />
            <div className="min-w-0">
              <div aria-hidden="true" className="flex gap-1.5">
                {layer.tools.map((t) => (
                  <span
                    key={t}
                    className="grid h-8 w-8 place-items-center rounded-[8px] border border-line bg-surface-1"
                  >
                    <SkillIcon name={t} className="h-4 w-4" style={{ color: themedSkillColor(t) }} />
                  </span>
                ))}
              </div>
              <p className="mt-1.5 text-[13px] text-fg-muted">{layer.tools.join(" · ")}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-[13px] leading-[1.55] text-fg-muted">
        The stack I reach for first: a React interface on a secure Laravel API, backed by PostgreSQL.
      </figcaption>
    </figure>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6 [&>div:first-child]:lg:mb-10"
    >
      <SectionHeader
        id="skills-title"
        title="Skills"
        lede="Everything on my CV, grouped by where it sits in the stack."
      />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        {/* Left: how the everyday stack fits together, then the people skills */}
        <div>
          <Reveal className="slide-from-left">
            <StackDiagram />
          </Reveal>
          <Reveal index={1} className="slide-from-left mt-8">
            <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">Beyond the code</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <li
                  key={s}
                  className="inline-flex h-8 items-center rounded-full border border-line-strong px-3 text-[13px] text-fg-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right: the full toolbox as a hairline ledger; chips magnify like a dock on hover */}
        <Reveal index={1} className="slide-from-right">
          <div className="tactile squircle [--r:20px] divide-y divide-line overflow-hidden bg-surface-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="grid gap-3 px-6 py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                <div className="flex items-baseline gap-2 sm:block">
                  <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">{group.title}</h3>
                  <p className="font-mono text-[12px] tabular-nums text-fg-subtle sm:mt-1">
                    {group.skills.length} tools
                  </p>
                </div>
                <ul className="skills-dock flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex h-8 items-center gap-2 rounded-[8px] border border-line bg-surface-1 pl-2 pr-3 text-[13.5px] text-fg"
                      style={{ "--brand": themedSkillColor(skill) } as React.CSSProperties}
                    >
                      <SkillIcon name={skill} className="h-[18px] w-[18px]" style={{ color: themedSkillColor(skill) }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;
