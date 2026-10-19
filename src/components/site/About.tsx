import { FACTS, PROFILE, SKILL_GROUPS } from "@/content/portfolio";
import { RevealGroup, RevealItem } from "./Reveal";
import { SkillIcon } from "./SkillIcon";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-24 sm:px-6 lg:py-36"
    >
      <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <RevealGroup className="lg:sticky lg:top-28 lg:self-start">
          <RevealItem>
            <h2
              id="about-title"
              className="font-display text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.035em] text-primaryText"
            >
              About
            </h2>
          </RevealItem>
          {PROFILE.bio.map((p) => (
            <RevealItem key={p.slice(0, 24)}>
              <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.65] text-mutedText">{p}</p>
            </RevealItem>
          ))}
          <RevealItem>
            <dl className="mt-10 grid grid-cols-3 gap-3">
              {FACTS.map((f) => (
                <div key={f.label} className="glass-panel px-4 py-4">
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(1.6rem,3.5vw,2.25rem)] font-bold leading-none tracking-[-0.03em] text-primaryText">
                      {f.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-2 block text-[12.5px] leading-[1.35] text-mutedText"
                    >
                      {f.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </RevealItem>
        </RevealGroup>

        <div>
          <h3 className="sr-only">Skills</h3>
          <RevealGroup className="gap-4 sm:columns-2 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {SKILL_GROUPS.map((g) => (
              <RevealItem key={g.title} className="glass-card p-5 sm:p-6">
                <h4 className="text-[15px] font-semibold text-primaryText">{g.title}</h4>
                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1 xl:grid-cols-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className="group/skill flex min-h-12 items-center gap-3 rounded-[10px] border border-transparent px-2.5 py-2 transition-colors hover:border-glass-border hover:bg-[var(--glass-surface-strong)]"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] border border-glass-border bg-[var(--glass-surface-strong)]">
                        <SkillIcon
                          name={s}
                          className="h-[17px] w-[17px] text-primaryText transition-colors group-hover/skill:text-gold-ink"
                        />
                      </span>
                      <span className="text-[14px] font-medium leading-tight text-primaryText">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
