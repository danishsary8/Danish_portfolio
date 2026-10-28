import type { CSSProperties } from "react";
import { Code2, GitBranch, LayoutGrid, ShieldCheck } from "lucide-react";
import { OrbitImages } from "@/components/ui/OrbitImages";
import { OrgLogo } from "./OrgLogo";
import { SkillIcon, themedSkillColor } from "./SkillIcon";
import { Reveal } from "./Reveal";

// The owner's statement (exact wording): words sharpen on scroll.
const STATEMENT =
  "I enjoy turning practical problems and business ideas into working software, as a collaborative teammate or an independent builder.";

// CV professional summary, condensed (the Hero pitch and modal goal say different things).
const SUMMARY =
  "4th-year Software Development student at Norton University. I build real web apps with React, Laravel and PostgreSQL: an online bookstore, a habit planner and a bilingual clinical expert system, secured with JWT, OTP verification and Google OAuth. Now looking for a Web Developer role on a team that ships real products.";

const PRINCIPLES = [
  { icon: LayoutGrid, term: "Responsive UI" },
  { icon: ShieldCheck, term: "Secure APIs" },
  { icon: GitBranch, term: "Clean, reviewed code" },
] as const;

// Tools only around the orbit (owner: no photo, no school logos, no label).
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
    <div className="relative grid h-[104px] w-[104px] place-items-center">
      <span aria-hidden="true" className="about-core-ring absolute inset-0 rounded-full border border-line-strong" />
      <span aria-hidden="true" className="about-core-ring absolute inset-0 rounded-full border border-line-strong [animation-delay:1.6s]" />
      <span className="icon-tile squircle [--r:22px] relative grid h-[72px] w-[72px] place-items-center">
        <Code2 aria-hidden="true" strokeWidth={1.75} className="h-8 w-8" />
      </span>
    </div>
  );
}

export function About() {
  const words = STATEMENT.split(" ");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Left: title over the tool orbit */}
        <div>
          <Reveal className="slide-from-left">
            <h2
              id="about-title"
              className="text-[32px] font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-[40px] lg:text-[48px]"
            >
              <span className="mask-rise">
                <span>About</span>
              </span>
            </h2>
          </Reveal>
          <Reveal index={1} className="slide-from-left">
            <OrbitImages
              images={ORBIT_ITEMS}
              shape="ellipse"
              radiusX={210}
              radiusY={84}
              rotation={-10}
              duration={34}
              itemSize={58}
              depth={0.6}
              showPath
              height={380}
              centerContent={<OrbitCenter />}
            />
          </Reveal>
        </div>

        {/* Right: statement, CV summary, then one status card */}
        <div>
          <Reveal className="slide-from-right">
            <blockquote className="scroll-reveal m-0 text-balance text-[24px] font-medium leading-[1.28] tracking-[-0.025em] text-fg xl:text-[27px]">
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
          </Reveal>

          <Reveal index={1} className="slide-from-right">
            <p className="mt-5 max-w-[60ch] text-pretty text-[15px] leading-[1.65] text-fg-muted">{SUMMARY}</p>
          </Reveal>

          <Reveal index={2} className="slide-from-right mt-7">
            <div className="tactile squircle [--r:22px] overflow-hidden">
              {/* Now: role + stage track */}
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="flex shrink-0 -space-x-2">
                  <OrgLogo org="etec" size={36} />
                  <OrgLogo org="kru" size={36} className="ring-2 ring-surface-2" />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[12px] text-fg-subtle">
                    <span aria-hidden="true" className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.4s] motion-safe:[animation-iteration-count:3]" />
                      <span className="relative h-2 w-2 rounded-full bg-gold" />
                    </span>
                    Right now
                  </p>
                  <p className="text-[16px] font-semibold tracking-[-0.015em] text-fg">
                    Backend Developer Intern{" "}
                    <span className="font-normal text-fg-muted">· ETEC &amp; KruITSolution</span>
                  </p>
                </div>
              </div>
              <ol className="grid grid-cols-2 border-t border-line" aria-label="Internship track">
                <li className="px-5 py-3">
                  <span aria-hidden="true" className="block h-1 rounded-full bg-fg/70" />
                  <p className="mt-2 flex justify-between text-[12.5px]">
                    <span className="font-medium text-fg">Frontend · done</span>
                    <span className="font-mono text-[11px] tabular-nums text-fg-subtle">Jul – Oct 2026</span>
                  </p>
                </li>
                <li className="border-l border-line px-5 py-3">
                  <span aria-hidden="true" className="block h-1 overflow-hidden rounded-full bg-line-strong">
                    <span className="about-track-fill block h-full w-[62%] rounded-full bg-gold" />
                  </span>
                  <p className="mt-2 flex justify-between text-[12.5px]">
                    <span className="font-medium text-fg">Backend · now</span>
                    <span className="font-mono text-[11px] tabular-nums text-fg-subtle">Oct 2026 –</span>
                  </p>
                </li>
              </ol>
              {/* How I work, as one quiet row */}
              <ul
                aria-label="How I work"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-surface-1/60 px-5 py-3"
              >
                {PRINCIPLES.map(({ icon: Icon, term }) => (
                  <li key={term} className="flex items-center gap-1.5 text-[13px] text-fg-muted">
                    <Icon aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-fg" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
