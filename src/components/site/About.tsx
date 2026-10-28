import type { CSSProperties } from "react";
import { GitBranch, Languages, LayoutGrid, Plug } from "lucide-react";
import { OrbitImages } from "@/components/ui/OrbitImages";
import { OrgLogo } from "./OrgLogo";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { Reveal } from "./Reveal";

// The owner's statement (exact wording): words sharpen on scroll.
const STATEMENT =
  "I enjoy turning practical problems and business ideas into working software, as a collaborative teammate or an independent builder.";

// CV professional summary, condensed (the Hero pitch and modal goal say different things).
const SUMMARY =
  "4th-year Software Development student at Norton University. I build real web apps with React, Laravel and PostgreSQL: an online bookstore, a habit planner and a bilingual clinical expert system, secured with JWT, OTP verification and Google OAuth. Now looking for a Web Developer role on a team that ships real products.";

const PRINCIPLES = [
  { icon: LayoutGrid, term: "Production dashboards" },
  { icon: Plug, term: "REST API integration" },
  { icon: GitBranch, term: "Branches & PR reviews" },
] as const;

// Tools only around the orbit (owner: no photo, no school logos, no label).
const TECH = ["React", "JavaScript", "Laravel", "PHP", "PostgreSQL", "Tailwind CSS", "Docker", "Git"] as const;

// Official full-colour logos (Devicon, MIT), same pinned source as the Hero stack.
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const DEVICON_SLUG: Record<(typeof TECH)[number], string> = {
  React: "react",
  JavaScript: "javascript",
  Laravel: "laravel",
  PHP: "php",
  PostgreSQL: "postgresql",
  "Tailwind CSS": "tailwindcss",
  Docker: "docker",
  Git: "git",
};

const ORBIT_ITEMS = TECH.map((tech) => (
  <span
    key={tech}
    title={tech}
    className="tactile squircle [--r:18px] grid h-full w-full place-items-center bg-surface-2"
  >
    <img
      src={`${DEVICON}/${DEVICON_SLUG[tech]}/${DEVICON_SLUG[tech]}-original.svg`}
      alt={tech}
      width={30}
      height={30}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="h-[30px] w-[30px] object-contain"
    />
  </span>
));

function OrbitCenter() {
  return (
    <div className="relative grid h-[136px] w-[136px] place-items-center">
      <span aria-hidden="true" className="about-core-ring absolute inset-0 rounded-full border border-line-strong" />
      <span aria-hidden="true" className="about-core-ring absolute inset-0 rounded-full border border-line-strong [animation-delay:1.6s]" />
      <span className="tactile frame-float relative block h-[104px] w-[104px] overflow-hidden rounded-full p-[3px]">
        <img
          src={ASSETS.profile.photo}
          alt={`Portrait of ${PROFILE.name}`}
          width={680}
          height={850}
          decoding="async"
          loading="lazy"
          className="h-full w-full origin-[50%_42%] scale-[1.22] rounded-full object-cover object-[50%_76%]"
        />
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
        {/* Left: title, quick facts, then the tool orbit */}
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
          {/* Quick facts between the title and the orbit: languages, then availability */}
          <Reveal index={1} className="slide-from-left">
            <dl className="mt-5 space-y-3 border-y border-line py-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13.5px]">
                <dt className="sr-only">Languages</dt>
                <Languages aria-hidden="true" strokeWidth={1.75} className="-mr-2 h-4 w-4 text-fg-subtle" />
                <dd className="text-fg-muted">
                  <span lang="km" className="font-medium text-fg">ខ្មែរ Khmer</span> · fluent
                </dd>
                <dd className="text-fg-muted">
                  <span className="font-medium text-fg">English</span> · good working proficiency
                </dd>
              </div>
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Availability</dt>
                <span aria-hidden="true" className="grid h-4 w-4 place-items-center">
                  <span className="about-live-dot relative h-2.5 w-2.5 rounded-full bg-[#34C759]" />
                </span>
                <dd className="text-[16px] font-semibold tracking-[-0.01em] text-fg">Open to full-time roles</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal index={2} className="slide-from-left">
            <OrbitImages
              images={ORBIT_ITEMS}
              shape="ellipse"
              radiusX={215}
              radiusY={100}
              rotation={-10}
              duration={34}
              itemSize={58}
              depth={0.6}
              showPath
              height={350}
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

          <Reveal index={2} className="slide-from-right mt-6">
            <div className="tactile squircle [--r:22px] overflow-hidden">
              {/* Now: current role, with a status pill */}
              <div className="flex items-center gap-4 px-5 pb-4 pt-5">
                <span className="flex shrink-0 -space-x-2">
                  <OrgLogo org="etec" size={40} />
                  <OrgLogo org="kru" size={40} className="ring-2 ring-surface-2" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[17px] font-semibold leading-tight tracking-[-0.015em] text-fg">
                    Developer Internship Trainee
                  </p>
                  <p className="mt-0.5 text-[13px] text-fg-muted">ETEC &amp; KruITSolution</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 text-[12px] font-medium text-fg">
                  <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
                  Right now
                </span>
              </div>

              {/* Internship track: in order, one clear row each; the current stage has the live dot */}
              <ol aria-label="Internship track" className="relative border-t border-line px-5 py-4">
                <span aria-hidden="true" className="absolute bottom-[34px] left-[27px] top-[30px] w-px bg-line-strong" />
                <li className="relative grid grid-cols-[16px_minmax(0,1fr)_auto] items-center gap-x-3">
                  <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-surface-2">
                    <span className="h-2 w-2 rounded-full bg-fg-subtle" />
                  </span>
                  <p className="text-[14px] font-medium text-fg">Frontend</p>
                  <time className="rounded-md border border-line bg-surface-1 px-2 py-0.5 font-mono text-[12px] font-medium tabular-nums text-fg">Jul – Oct 2026</time>
                  <p className="col-start-2 mt-0.5 text-[12.5px] text-fg-muted">Shipped UI dashboards wired to live REST APIs</p>
                </li>
                <li className="relative mt-4 grid grid-cols-[16px_minmax(0,1fr)_auto] items-center gap-x-3">
                  <span aria-hidden="true" className="relative grid h-4 w-4 place-items-center rounded-full bg-surface-2">
                    <span className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
                  </span>
                  <p className="text-[14px] font-medium text-fg">Backend</p>
                  <time className="rounded-md border border-line bg-surface-1 px-2 py-0.5 font-mono text-[12px] font-medium tabular-nums text-fg">Oct 2026 – Present</time>
                  <p className="col-start-2 mt-0.5 text-[12.5px] text-fg-muted">Building REST APIs alongside the team</p>
                </li>
              </ol>

              {/* How I work, as one quiet row */}
              <ul
                aria-label="How I work"
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line bg-surface-1/60 px-5 py-3"
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
