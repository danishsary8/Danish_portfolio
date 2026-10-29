import { useState, type CSSProperties, type PointerEvent } from "react";
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

// Every tool once, in group order, tagged with its group so selection can light it up.
const TILES = SKILL_GROUPS.flatMap((g) => g.skills.map((skill) => ({ skill, group: g.title })));

/** React Bits TiltedCard idea: the tile turns a few degrees toward the pointer (fine pointers). */
function tilt(e: PointerEvent<HTMLLIElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--rx", `${(-y * 14).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
}
function untilt(e: PointerEvent<HTMLLIElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

export function Skills() {
  // null = everything lit; a group title = only that group lit, the rest stay visible but quiet.
  const [active, setActive] = useState<string | null>(null);

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

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        {/* Left: category rail. Choosing one highlights its tools in the wall. */}
        <div>
          <Reveal className="slide-from-left">
            <div className="space-y-1">
              {SKILL_GROUPS.map((g) => {
                const on = active === g.title;
                return (
                  <div key={g.title} className="relative">
                    {on ? (
                      <motion.span
                        layoutId="skills-rail"
                        transition={SPRING_UI}
                        aria-hidden="true"
                        className="tactile squircle [--r:14px] absolute inset-0 bg-surface-2"
                      />
                    ) : null}
                    <div className="relative flex items-center justify-between gap-4 px-4 py-3.5">
                      <h3
                        className={`text-[17px] font-medium tracking-[-0.015em] transition-colors duration-150 ${on ? "text-fg" : "text-fg-muted"}`}
                      >
                        {g.title}
                      </h3>
                      <span className="font-mono text-[12.5px] tabular-nums text-fg-subtle">
                        {String(g.skills.length).padStart(2, " ")}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={`Highlight ${g.title}`}
                      onClick={() => setActive(on ? null : g.title)}
                      onMouseEnter={() => setActive(g.title)}
                      className="absolute inset-0 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              className={`mt-3 px-4 text-[13px] text-fg-subtle underline decoration-line-strong underline-offset-4 transition-opacity duration-150 hover:text-fg ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
              tabIndex={active ? 0 : -1}
            >
              Show everything
            </button>
          </Reveal>

          <Reveal index={1} className="slide-from-left mt-8 border-t border-line pt-6">
            <h3 className="px-4 text-[15px] font-medium tracking-[-0.01em] text-fg">Beyond the code</h3>
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2 px-4">
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

        {/* Right: the wall. Every tool stays visible; the chosen group lights up. */}
        <Reveal index={1} className="slide-from-right" >
          <ul
            onMouseLeave={() => setActive(null)}
            className="skills-wall grid grid-cols-4 gap-3 sm:grid-cols-6"
          >
            {TILES.map(({ skill, group }, i) => {
              const dim = active !== null && active !== group;
              return (
                <li
                  key={skill}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                  data-dim={dim || undefined}
                  className="skills-tile tactile squircle [--r:16px] flex aspect-square flex-col items-center justify-center gap-2.5 bg-surface-2 px-1 text-center text-[12.5px] leading-tight text-fg"
                  style={{ "--brand": themedSkillColor(skill), "--i": i } as CSSProperties}
                >
                  <SkillIcon name={skill} className="h-7 w-7" style={{ color: themedSkillColor(skill) }} />
                  {skill}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;
