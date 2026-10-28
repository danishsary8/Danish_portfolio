import type { CSSProperties, ReactNode } from "react";
import { Check, Code2, LayoutGrid, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { OrbitImages } from "@/components/ui/OrbitImages";
import { OrgLogo } from "./OrgLogo";
import { SkillIcon, themedSkillColor } from "./SkillIcon";
import { Reveal } from "./Reveal";

// The owner's statement (exact wording): words sharpen on scroll.
const STATEMENT =
  "I enjoy turning practical problems and business ideas into working software, as a collaborative teammate or an independent builder.";

// Paraphrase of PROFILE.goal (the modal quotes the original), so the two never repeat.
const GOAL =
  "Next, I want to grow into an engineer who ships complete, real-world products that people find genuinely useful.";

const PRINCIPLES = [
  { icon: LayoutGrid, term: "Effortless interfaces", detail: "Semantic, touch-friendly layouts that hold up on any screen." },
  { icon: ShieldCheck, term: "Trustworthy APIs", detail: "JWT sessions, OTP checks, Google sign-in, role-based access." },
  { icon: Code2, term: "Code a team can keep", detail: "Feature branches, reviewed PRs and tidy data models." },
] as const;

function Tile({ children, label }: { children: ReactNode; label: string }) {
  return (
    <span
      title={label}
      className="tactile squircle [--r:18px] grid h-full w-full place-items-center bg-surface-2"
    >
      {children}
    </span>
  );
}

const TECH = ["React", "Laravel", "PostgreSQL", "Tailwind CSS"] as const;
const ORGS = [
  ["norton", "Norton University"],
  ["etec", "ETEC"],
  ["kru", "KruITSolution"],
  ["ace", "ACE"],
] as const;

// Alternate places and tools around the orbit.
const ORBIT_ITEMS = ORGS.flatMap(([org, label], i) => {
  const tech = TECH[i] as string;
  return [
  <Tile key={org} label={label}>
    <OrgLogo org={org} size={44} />
  </Tile>,
  <Tile key={tech} label={tech}>
    <SkillIcon name={tech} className="h-8 w-8" style={{ color: themedSkillColor(tech) }} />
  </Tile>,
  ];
});

function OrbitCenter() {
  return (
    <div className="relative h-[168px] w-[168px] rounded-full p-1.5 tactile frame-float">
      <div className="h-full w-full overflow-hidden rounded-full bg-surface-1">
        <img
          src={ASSETS.profile.photo}
          alt={`Portrait of ${PROFILE.name}`}
          width={680}
          height={850}
          decoding="async"
          loading="lazy"
          className="h-full w-full origin-[50%_42%] scale-[1.22] object-cover object-[50%_76%]"
        />
      </div>
      <span
        role="img"
        aria-label="Available for work"
        className="absolute bottom-[10%] right-[10%] h-4 w-4 rounded-full bg-gold shadow-[0_0_0_4px_var(--bg)]"
      />
    </div>
  );
}

export function About() {
  const words = STATEMENT.split(" ");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="about-slide mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-4"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        {/* Left: the people and tools that shaped him, orbiting his portrait */}
        <Reveal className="slide-from-left">
          <OrbitImages
            images={ORBIT_ITEMS}
            shape="ellipse"
            radiusX={200}
            radiusY={70}
            rotation={-10}
            duration={32}
            itemSize={64}
            depth={0.6}
            showPath
            height={340}
            centerContent={<OrbitCenter />}
          />
          <p className="mt-1 text-center font-mono text-[11.5px] tabular-nums text-fg-subtle">
            Where I learned · what I build with
          </p>
        </Reveal>

        {/* Right: heading, statement, then the two widgets */}
        <div>
          <Reveal className="slide-from-right">
            <h2 id="about-title" className="text-[28px] font-semibold tracking-[-0.03em] text-fg">
              About
            </h2>
            <blockquote className="scroll-reveal m-0 mt-4 text-balance text-[25px] font-medium leading-[1.25] tracking-[-0.025em] text-fg xl:text-[28px]">
              {words.map((w, i) => (
                <span
                  key={i}
                  className="scroll-reveal-word"
                  style={{ "--p": i / Math.max(1, words.length - 1) } as CSSProperties}
                >
                  {w}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </blockquote>
            <p className="mt-4 max-w-[52ch] text-pretty text-[15px] leading-[1.6] text-fg-muted">{GOAL}</p>
          </Reveal>

          <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            {/* Right now: live status widget */}
            <Reveal index={1} className="slide-from-right">
              <div className="tactile squircle [--r:22px] h-full p-5">
                <p className="flex items-center gap-2 text-[12.5px] font-medium text-fg-subtle">
                  <span aria-hidden="true" className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.4s] motion-safe:[animation-iteration-count:3]" />
                    <span className="relative h-2 w-2 rounded-full bg-gold" />
                  </span>
                  Right now
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex shrink-0 -space-x-2">
                    <OrgLogo org="etec" size={32} />
                    <OrgLogo org="kru" size={32} className="ring-2 ring-surface-2" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15.5px] font-semibold leading-tight tracking-[-0.015em] text-fg">
                      Backend Developer Intern
                    </p>
                    <p className="text-[12.5px] text-fg-muted">ETEC &amp; KruITSolution</p>
                  </div>
                </div>
                <ol className="mt-4 grid grid-cols-2 gap-2" aria-label="Internship track">
                  <li>
                    <span aria-hidden="true" className="block h-1.5 rounded-full bg-fg/80" />
                    <p className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-fg">
                      <Check aria-hidden="true" strokeWidth={2.5} className="h-3 w-3 text-fg-subtle" />
                      Frontend
                    </p>
                    <p className="font-mono text-[11px] tabular-nums text-fg-subtle">Jul – Oct 2026</p>
                  </li>
                  <li>
                    <span aria-hidden="true" className="block h-1.5 overflow-hidden rounded-full bg-line-strong">
                      <span className="about-track-fill block h-full w-[62%] rounded-full bg-gold" />
                    </span>
                    <p className="mt-1.5 text-[12px] font-medium text-fg">Backend</p>
                    <p className="font-mono text-[11px] tabular-nums text-fg-subtle">Oct 2026 – now</p>
                  </li>
                </ol>
                <p className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[12.5px] text-fg-muted">
                  <OrgLogo org="norton" size={22} />
                  Also in my 4th year of Software Development
                </p>
              </div>
            </Reveal>

            {/* How I work: compact grouped list */}
            <Reveal index={2} className="slide-from-right">
              <dl className="tactile squircle [--r:22px] h-full divide-y divide-line overflow-hidden">
                {PRINCIPLES.map(({ icon: Icon, term, detail }) => (
                  <div
                    key={term}
                    className="group flex items-start gap-3 px-4 py-2.5 transition-colors duration-150 hover:bg-surface-1"
                  >
                    <span
                      aria-hidden="true"
                      className="icon-tile squircle [--r:9px] grid h-8 w-8 shrink-0 place-items-center transition-transform duration-200 ease-[var(--ease-out)] group-hover:-rotate-6"
                    >
                      <Icon strokeWidth={1.75} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[13.5px] font-medium text-fg">{term}</dt>
                      <dd className="text-[12.5px] leading-[1.45] text-fg-muted">{detail}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
