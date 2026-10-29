import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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

// The everyday stack, top (what people touch) to bottom (where data lives).
const CORE = [
  { tool: "React", layer: "Interface" },
  { tool: "Laravel", layer: "API" },
  { tool: "PostgreSQL", layer: "Data" },
] as const;

// Official full-colour logos (Devicon, MIT), same pinned source as the Hero and About.
// Tools without a Devicon mark (REST APIs, JWT, Cloudinary) keep the brand-coloured icon.
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const LOGO: Record<string, string> = {
  JavaScript: "javascript/javascript-original",
  PHP: "php/php-original",
  Python: "python/python-original",
  Java: "java/java-original",
  HTML5: "html5/html5-original",
  CSS3: "css3/css3-original",
  React: "react/react-original",
  Laravel: "laravel/laravel-original",
  Flask: "flask/flask-original",
  "Tailwind CSS": "tailwindcss/tailwindcss-original",
  Bootstrap: "bootstrap/bootstrap-original",
  "Framer Motion": "framermotion/framermotion-original",
  Flutter: "flutter/flutter-original",
  PostgreSQL: "postgresql/postgresql-original",
  Supabase: "supabase/supabase-original",
  Oracle: "oracle/oracle-original",
  Git: "git/git-original",
  GitHub: "github/github-original",
  Docker: "docker/docker-original",
  Postman: "postman/postman-original",
  "VS Code": "vscode/vscode-original",
};
// Black marks that need flipping to stay visible on the dark theme.
const INVERT_IN_DARK = new Set(["Flask", "GitHub"]);

/** Real logo when Devicon has one; the brand-coloured icon otherwise or if the image fails. */
function Logo({ name, size }: { name: string; size: number }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const path = LOGO[name];
  // An image that failed before hydration never fires onError for React; check it once mounted.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  const icon = (
    <SkillIcon
      name={name}
      className={path && !failed ? "hidden" : "shrink-0"}
      style={{ color: themedSkillColor(name), width: size, height: size }}
    />
  );
  return (
    <>
      {path && !failed ? (
        <img
          ref={img}
          src={`${DEVICON}/${path}.svg`}
          alt=""
          width={size}
          height={size}
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
          className={`shrink-0 object-contain ${INVERT_IN_DARK.has(name) ? "dark:invert" : ""}`}
          style={{ width: size, height: size }}
        />
      ) : null}
      {icon}
    </>
  );
}

const group = (title: string) => SKILL_GROUPS.find((g) => g.title === title)!;

/** One bento cell: tactile card that lifts on hover. */
function Cell({ className = "", i, children }: { className?: string | undefined; i: number; children: ReactNode }) {
  return (
    <div
      className={`skills-cell tactile squircle [--r:22px] relative overflow-hidden bg-surface-2 p-5 ${className}`}
      style={{ "--i": i } as CSSProperties}
    >
      {children}
    </div>
  );
}

function GroupCell({ title, i, className }: { title: string; i: number; className?: string | undefined }) {
  const g = group(title);
  return (
    <Cell i={i} className={className}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">{g.title}</h3>
        <span className="font-mono text-[12px] tabular-nums text-fg-subtle">{g.skills.length}</span>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {g.skills.map((skill) => (
          <li
            key={skill}
            className="skills-pill inline-flex h-8 items-center gap-2 rounded-[8px] border border-line bg-surface-1 pl-2 pr-2.5 text-[13px] text-fg"
            style={{ "--brand": themedSkillColor(skill) } as CSSProperties}
          >
            <Logo name={skill} size={16} />
            {skill}
          </li>
        ))}
      </ul>
    </Cell>
  );
}

/**
 * Bento showcase (owner's pick): a tall "core stack" card beside cards for each CV group and
 * the soft skills. The core card repeats three tool names through CSS (`data-label`), so each
 * skill still appears once as text.
 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6 [&>div:first-child]:lg:mb-8"
    >
      <SectionHeader
        id="skills-title"
        title="Skills"
        lede="Everything on my CV, with the stack I reach for first up front."
      />

      <Reveal className="skills-bento grid grid-cols-12 gap-3">
        {/* Core stack: tall card, the three layers stacked with a connecting rail */}
        <Cell i={0} className="col-span-12 flex flex-col lg:col-span-5 lg:row-span-2">
          <div aria-hidden="true" className="skills-core-glow pointer-events-none absolute inset-0" />
          <p className="relative text-[15px] font-medium tracking-[-0.01em] text-fg">Core stack</p>
          <p className="relative mt-1 text-[13px] text-fg-muted">
            A React interface on a secure Laravel API, backed by PostgreSQL.
          </p>
          <div aria-hidden="true" className="relative mt-auto pt-6">
            <span className="absolute bottom-8 left-[27px] top-14 w-px bg-line-strong" />
            {CORE.map(({ tool, layer }, k) => (
              <div key={tool} className={`relative flex items-center gap-4 ${k ? "mt-4" : ""}`}>
                <span
                  className="skills-core-tile grid h-14 w-14 shrink-0 place-items-center rounded-[16px] border border-line bg-surface-1"
                  style={{ "--brand": themedSkillColor(tool) } as CSSProperties}
                >
                  <Logo name={tool} size={28} />
                </span>
                <div>
                  <p className="skills-core-name text-[20px] font-semibold tracking-[-0.02em] text-fg" data-label={tool} />
                  <p className="text-[12.5px] text-fg-subtle">{layer}</p>
                </div>
              </div>
            ))}
          </div>
        </Cell>

        <GroupCell title="Languages" i={1} className="col-span-12 lg:col-span-4" />
        <GroupCell title="Databases" i={2} className="col-span-12 lg:col-span-3" />
        <GroupCell title="Frameworks & UI" i={3} className="col-span-12 lg:col-span-7" />
        <GroupCell title="Tools & APIs" i={4} className="col-span-12 lg:col-span-7" />

        <Cell i={5} className="col-span-12 lg:col-span-5">
          <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">Soft skills</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SOFT_SKILLS.map((s) => (
              <li
                key={s}
                className="inline-flex h-7 items-center rounded-full border border-line-strong px-2.5 text-[12.5px] text-fg-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </Cell>
      </Reveal>
    </section>
  );
}

export default Skills;
