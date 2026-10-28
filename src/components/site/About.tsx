import type { CSSProperties } from "react";
import { Check, GitBranch, LayoutGrid, ShieldCheck } from "lucide-react";
import { OrbitImages } from "@/components/ui/OrbitImages";
import { OrgLogo } from "./OrgLogo";
import { SkillIcon, themedSkillColor } from "./SkillIcon";
import { Reveal } from "./Reveal";

// The owner's statement (exact wording): words sharpen on scroll.
const STATEMENT =
  "I enjoy turning practical problems and business ideas into working software, as a collaborative teammate or an independent builder.";

// Paraphrase of PROFILE.goal (the modal quotes the original), so the two never repeat.
// Where he is heading (never PROFILE.goal wording; the modal quotes that).
const GOAL =
  "Where I’m heading: owning features end to end, from the first sketch to a release people rely on every day.";

const PRINCIPLES = [
  { icon: LayoutGrid, term: "Interfaces that feel effortless", detail: "Semantic, touch-friendly, any screen." },
  { icon: ShieldCheck, term: "APIs you can trust", detail: "JWT, OTP, Google sign-in, roles." },
  { icon: GitBranch, term: "Code a team can keep", detail: "Branches, reviewed PRs, tidy models." },
] as const;

// Tools only around the orbit (owner: no photo, no school logos).
const TECH = ["React", "JavaScript", "Laravel", "PHP", "PostgreSQL", "Tailwind CSS", "Docker", "Git"] as const;

const ORBIT_ITEMS = TECH.map((tech) => (
  <span
    key={tech}
    title={tech}
    className="tactile squircle [--r:18px] grid h-full w-full place-items-center bg-surface-2"
  >
    <SkillIcon name={tech} className="h-7 w-7" style={{ color: themedSkillColor(tech) }} />
  </span>
));

function OrbitCenter() {
  return (
    <div className="tactile frame-float squircle [--r:28px] grid h-[132px] w-[132px] place-items-center bg-surface-2 text-center">
      <div>
        <p className="font-poster text-[30px] font-extrabold leading-none tracking-[-0.03em] text-fg">Full</p>
        <p className="font-poster text-[30px] font-extrabold leading-none tracking-[-0.03em] text-fg">stack</p>
        <p className="mt-2 font-mono text-[10.5px] text-fg-subtle">UI → API → DB</p>
      </div>
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
            radiusX={235}
            radiusY={95}
            rotation={-10}
            duration={32}
            itemSize={62}
            depth={0.6}
            showPath
            height={420}
            centerContent={<OrbitCenter />}
          />
        </Reveal>

        {/* Right: heading, statement, then the two widgets */}
        <div>
          <Reveal className="slide-from-right">
            <h2
              id="about-title"
              className="text-[32px] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-[40px] lg:text-[48px]"
            >
              <span className="mask-rise">
                <span>About</span>
              </span>
            </h2>
            <blockquote className="scroll-reveal m-0 mt-4 text-balance text-[23px] font-medium leading-[1.28] tracking-[-0.025em] text-fg xl:text-[26px]">
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
            <p className="mt-4 max-w-[52ch] border-l-2 border-gold/70 pl-4 text-pretty text-[15px] leading-[1.6] text-fg-muted">{GOAL}</p>
          </Reveal>

          {/* One console: "Now" pane (ink) + how-I-work pane */}
          <Reveal index={1} className="slide-from-right mt-6">
            <div className="tactile squircle [--r:24px] grid overflow-hidden xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div className="relative bg-fg p-5 text-bg">
                <p className="flex items-center gap-2 text-[12px] font-medium opacity-70">
                  <span aria-hidden="true" className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.4s] motion-safe:[animation-iteration-count:3]" />
                    <span className="relative h-2 w-2 rounded-full bg-gold" />
                  </span>
                  Right now
                </p>
                <p className="mt-2 text-[19px] font-semibold leading-tight tracking-[-0.02em]">
                  Backend Developer Intern
                </p>
                <div className="mt-1 flex items-center gap-2 text-[12.5px]">
                  <span className="flex -space-x-1.5">
                    <OrgLogo org="etec" size={20} />
                    <OrgLogo org="kru" size={20} />
                  </span>
                  <span className="opacity-70">ETEC &amp; KruITSolution</span>
                </div>
                <ol className="mt-5 space-y-2.5" aria-label="Internship track">
                  <li className="flex items-center gap-2.5 text-[12.5px]">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-bg/15">
                      <Check aria-hidden="true" strokeWidth={2.5} className="h-3 w-3" />
                    </span>
                    <span className="font-medium">Frontend</span>
                    <span className="ml-auto font-mono text-[11px] tabular-nums opacity-60">Jul – Oct 2026</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[12.5px]">
                    <span className="grid h-5 w-5 place-items-center rounded-full ring-1 ring-gold">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                    </span>
                    <span className="font-medium">Backend</span>
                    <span className="ml-auto font-mono text-[11px] tabular-nums opacity-60">Oct 2026 – now</span>
                  </li>
                </ol>
                <span aria-hidden="true" className="mt-3 block h-1 overflow-hidden rounded-full bg-bg/15">
                  <span className="about-track-fill block h-full w-[62%] rounded-full bg-gold" />
                </span>
              </div>

              <dl className="divide-y divide-line">
                {PRINCIPLES.map(({ icon: Icon, term, detail }) => (
                  <div key={term} className="group flex items-center gap-3 px-5 py-3.5 transition-colors duration-150 hover:bg-surface-1">
                    <span
                      aria-hidden="true"
                      className="icon-tile-light squircle [--r:10px] grid h-9 w-9 shrink-0 place-items-center transition-transform duration-200 ease-[var(--ease-out)] group-hover:-rotate-6"
                    >
                      <Icon strokeWidth={1.75} className="h-[17px] w-[17px]" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[14px] font-medium tracking-[-0.01em] text-fg">{term}</dt>
                      <dd className="text-[12.5px] text-fg-muted">{detail}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
