import type { CSSProperties } from "react";
import { Languages } from "lucide-react";
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
  "As a 4th-year Software Development student at Norton University, I build complete full-stack web apps with React, Laravel, and PostgreSQL — from secure REST APIs (JWT, OTP, Google OAuth, Cloudflare) and Bakong payments to clean, responsive interfaces built to scale. I’m ready to join an engineering team as a Web Developer, contribute from day one, and keep growing with new tools.";

const INTERNSHIP_STEPS = [
  {
    stage: "Frontend",
    detail: "Shipped UI dashboards wired to live REST APIs",
    period: "Jul – Oct 2026",
    active: false,
  },
  {
    stage: "Backend",
    detail: "Developing server-side APIs, databases & auth",
    period: "Nov 2026 – Present",
    active: true,
  },
] as const;

// Tools only around the orbit (owner: no photo, no school logos, no label).
const TECH = [
  "React",
  "JavaScript",
  "Laravel",
  "PHP",
  "PostgreSQL",
  "Tailwind CSS",
  "Docker",
  "Git",
] as const;

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
    className="orbit-tile tactile squircle [--r:18px] relative grid h-full w-full place-items-center bg-surface-2"
  >
    <span aria-hidden="true" className="orbit-tile-name">
      {tech}
    </span>
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
      <span
        aria-hidden="true"
        className="about-core-ring absolute inset-0 rounded-full border border-line-strong"
      />
      <span
        aria-hidden="true"
        className="about-core-ring absolute inset-0 rounded-full border border-line-strong [animation-delay:1.6s]"
      />
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
      className="relative isolate overflow-x-clip mx-auto flex w-full max-w-[1180px] flex-col justify-center px-5 py-24 sm:px-6 lg:min-h-[calc(100dvh-88px)] lg:py-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.34] dark:opacity-[0.2] [background-image:radial-gradient(var(--fg-subtle)_0.85px,transparent_0.85px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_78%_68%_at_50%_48%,#000_45%,transparent_100%)]"
      />
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
                <Languages
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="-mr-2 h-4 w-4 text-fg-subtle"
                />
                <dd className="text-fg-muted">
                  <span lang="km" className="font-khmer font-medium text-fg">
                    ខ្មែរ
                  </span>{" "}
                  <span className="font-medium text-fg">Khmer</span> · fluent
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
                <dd className="text-[16px] font-semibold tracking-[-0.01em] text-fg">
                  Open to full-time roles
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal
            index={2}
            className="slide-from-left mt-2 flex w-full justify-center overflow-visible"
          >
            <div className="flex h-[240px] sm:h-[350px] items-center justify-center">
              <div className="scale-[0.64] sm:scale-100 origin-center transition-transform">
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
                  pauseOnHover
                  height={350}
                  centerContent={<OrbitCenter />}
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: statement, CV summary, then one status card */}
        <div>
          <Reveal className="slide-from-right">
            <blockquote className="scroll-reveal relative m-0 text-balance text-[24px] font-medium leading-[1.28] tracking-[-0.025em] text-fg xl:text-[26px]">
              <span
                aria-hidden="true"
                className="absolute -left-[0.45em] font-serif select-none text-gold"
              >
                “
              </span>
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
              <span aria-hidden="true" className="font-serif select-none text-gold">
                ”
              </span>
            </blockquote>
          </Reveal>

          <Reveal index={1} className="slide-from-right">
            <p className="mt-4 max-w-[68ch] text-pretty text-[14.5px] leading-[1.6] text-fg-muted">
              {SUMMARY}
            </p>
          </Reveal>

          <Reveal index={2} className="slide-from-right mt-5">
            <div className="tactile squircle [--r:22px] overflow-hidden">
              {/* Now: current role, with a status pill */}
              <div className="flex items-center gap-3.5 px-5 py-3.5">
                <span className="flex shrink-0 -space-x-2">
                  <OrgLogo org="etec" size={34} />
                  <OrgLogo org="kru" size={34} className="ring-2 ring-surface-2" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[17px] font-semibold leading-tight tracking-[-0.015em] text-fg">
                    Developer Internship Trainee
                  </p>
                  <p className="mt-0.5 text-[13px] text-fg-muted">ETEC &amp; KRU IT Solution</p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full border border-line-strong px-2.5 py-1 text-[11.5px] font-medium text-fg-muted">
                  Right now
                </span>
              </div>

              {/* Internship track: in order, one clear row each; the current stage has the live dot */}
              <ol
                aria-label="Internship track"
                className="relative border-t border-line px-5 py-3.5 space-y-3"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-[26px] left-[27px] top-[26px] w-px bg-line-strong hidden sm:block"
                />
                {INTERNSHIP_STEPS.map(({ stage, detail, period, active }) => (
                  <li
                    key={stage}
                    className="relative flex flex-col gap-1 sm:grid sm:grid-cols-[16px_auto_minmax(0,1fr)_auto] sm:items-center sm:gap-x-3 sm:gap-y-0"
                  >
                    <div className="flex items-center justify-between gap-2 sm:contents">
                      <span className="inline-flex items-center gap-2 sm:contents">
                        <span
                          aria-hidden="true"
                          className="relative grid h-4 w-4 shrink-0 place-items-center rounded-full bg-surface-2"
                        >
                          <span
                            className={
                              active
                                ? "about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]"
                                : "h-2 w-2 rounded-full bg-fg-subtle"
                            }
                          />
                        </span>
                        <p className="text-[14px] font-medium text-fg">{stage}</p>
                      </span>
                      <time className="font-mono text-[12px] sm:text-[12.5px] tabular-nums text-fg-muted sm:order-4">
                        {period}
                      </time>
                    </div>
                    <p className="pl-6 text-[13px] text-fg-muted sm:order-3 sm:truncate sm:pl-0">
                      {detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
