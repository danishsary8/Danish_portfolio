import { useRef, type CSSProperties } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";
import { useTheme } from "@/lib/use-theme";
import { TextType } from "@/components/ui/TextType";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { SplitText } from "@/components/ui/SplitText";
import { SkillIcon } from "./SkillIcon";

const CORE_STACK = [
  "React",
  "TypeScript",
  "Laravel",
  "PostgreSQL",
  "Tailwind CSS",
  "REST APIs",
  "Docker",
] as const;

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const time = useLocalTime(PROFILE.timezone);
  const { dark } = useTheme();
  const hasCv = CV_HREF !== "#" && CV_HREF !== "";

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="hero-glow absolute inset-x-0 top-0 -z-10 h-[640px] pointer-events-none opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-24 -z-10 h-[360px] w-[360px] rounded-full bg-gold/10 blur-[110px] dark:bg-gold/15"
      />

      <div className="mx-auto w-full max-w-[1180px] px-5 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 lg:pt-32 lg:pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_auto] lg:gap-12 xl:gap-16">
          {/* Left Column: Status, Headline, Rotating Role, Bio Pitch, CTAs & Facts */}
          <div className="min-w-0">
            {/* Status & Phnom Penh time */}
            <div className="enter flex flex-wrap items-center gap-3 text-[13px] text-fg-muted" style={step(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong/80 bg-surface/80 px-3 py-1 shadow-2xs backdrop-blur-md">
                <span aria-hidden="true" className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="text-fg font-medium">Available to work full-time</span>
              </span>
              <span aria-hidden="true" className="text-fg-subtle">
                /
              </span>
              <span>
                {PROFILE.location.split(",")[0]}{" "}
                <span className="font-mono text-[12.5px] tabular-nums text-fg">{time ?? "--:--"}</span>{" "}
                <span className="text-fg-subtle">{PROFILE.timezoneLabel}</span>
              </span>
            </div>

            {/* Main Headline: Sary (foreground) Danish (gold accent) with Syne architectural display & VariableProximity */}
            <h1
              ref={headlineRef}
              id="hero-title"
              className="enter hero-name-heading relative mt-4 cursor-default select-none text-[clamp(2.85rem,6.4vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.03em]"
              style={step(1)}
            >
              <VariableProximity
                label="Sary"
                className="text-fg hero-name-sary"
                fromFontVariationSettings="'wght' 700"
                toFontVariationSettings="'wght' 800"
                containerRef={headlineRef}
                radius={130}
                falloff="linear"
                smoothing={0.2}
                scale={1.04}
                lift={0.03}
              />{" "}
              <VariableProximity
                label="Danish"
                className="text-gold dark:text-gold hero-name-danish"
                fromFontVariationSettings="'wght' 700"
                toFontVariationSettings="'wght' 800"
                containerRef={headlineRef}
                radius={130}
                falloff="linear"
                smoothing={0.2}
                scale={1.04}
                lift={0.03}
              />
            </h1>

            {/* Dynamic Typing Role: Junior [Software / Web / Fullstack] Developer */}
            <div className="enter mt-3 flex items-center" style={step(2)}>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong/80 bg-surface/80 px-3 py-1 text-[15px] sm:text-[17px] font-medium text-fg-muted shadow-2xs backdrop-blur-sm">
                <span className="sr-only">Junior Web Developer</span>
                <span aria-hidden="true" className="font-medium text-fg-muted">Junior</span>
                <span aria-hidden="true" className="inline-flex items-center font-medium text-fg-muted">
                  <TextType
                    text={["Software", "Web", "Fullstack"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    deletingSpeed={50}
                    deleteMode="backspace"
                    typeEffect="fade"
                    mistakes={0.2}
                    cursorStyle="bar"
                    cursorGlide
                    showCursor
                    cursorColor="currentColor"
                    className="font-medium text-fg-muted"
                  />
                </span>
                <span aria-hidden="true" className="font-medium text-fg-muted">Developer</span>
              </div>
            </div>

            {/* Sharp, non-duplicative value proposition pitch with SplitText */}
            <div className="enter" style={step(3)}>
              <SplitText
                text="Building web apps that feel smooth to use and stay rock-solid behind the scenes. Driven by clean code, secure APIs, and turning real ideas into software that just works."
                className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.65] text-fg-muted sm:text-[16.5px]"
                effect="rise"
                splitType="chars"
                delay={40}
                duration={1.25}
                staggerFrom="start"
                trigger="view"
                hoverEffect="lift"
                loop={false}
                loopDelay={1.5}
                mask={false}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                tag="p"
                onLetterAnimationComplete={() => {
                  /* Pitch letters animation complete */
                }}
              />
            </div>

            {/* Call to action buttons */}
            <div className="enter mt-7 flex flex-wrap items-center gap-3" style={step(4)}>
              <a
                href="#contact"
                className="press group inline-flex h-10.5 items-center gap-2 rounded-control bg-fg px-5 text-[14px] font-medium text-bg transition-[opacity,transform] duration-150 hover:opacity-90"
              >
                Get in touch
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </a>
              <a
                href="#projects"
                className="press inline-flex h-10.5 items-center rounded-control border border-line-strong bg-surface px-5 text-[14px] font-medium text-fg transition-[background-color,transform] duration-150 hover:bg-raised"
              >
                View projects
              </a>
              {hasCv ? (
                <a
                  {...getCvLinkProps()}
                  className="press inline-flex h-10.5 items-center gap-2 rounded-control px-4 text-[14px] font-medium text-fg-muted transition-[color,transform] duration-150 hover:text-fg"
                >
                  <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  Download CV
                </a>
              ) : null}
            </div>

            {/* Core Tech Stack & Current Focus Telemetry */}
            <div className="enter mt-9 flex flex-col gap-3.5 sm:max-w-[580px]" style={step(5)}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12px] text-fg-subtle">Core Stack</span>
                <span aria-hidden="true" className="text-fg-subtle/50">/</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {CORE_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-1/70 px-2.5 py-1 text-[12.5px] font-medium text-fg-muted transition-[border-color,background-color,color] duration-150 hover:border-line-strong hover:bg-surface-1 hover:text-fg"
                    >
                      <SkillIcon
                        name={tech}
                        className="h-3.5 w-3.5 text-fg-subtle transition-colors duration-150 group-hover:text-fg"
                      />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Role & University Trajectory */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-fg-subtle">
                <span className="inline-flex items-center gap-1.5 font-medium text-fg-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  Web Developer Trainee
                </span>
                <span>at ETEC & KruITSolution</span>
                <span aria-hidden="true" className="text-fg-subtle/40">&bull;</span>
                <span>4th-Year Software Development, Norton Univ</span>
              </div>
            </div>
          </div>

          {/* Right Column: ProfileCard */}
          <div
            className="enter flex justify-center lg:justify-end"
            style={step(2)}
          >
            <div className="relative">
              {/* Subtle radiant background aura */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-b from-gold/20 via-transparent to-transparent opacity-60 blur-2xl"
              />
              <ProfileCard
                name={PROFILE.name}
                title="Software & Web Developer"
                handle={PROFILE.githubHandle}
                status="Available to work"
                contactText="Contact"
                avatarUrl={ASSETS.profile.photo}
                holo={0}
                glare={0}
                tiltStrength={10}
                parallax={6}
                radius={16}
                enableTilt={true}
                intro={true}
                showUserInfo={true}
                enableMobileTilt={false}
                theme={dark ? "dark" : "light"}
                onContactClick={() => {
                  const el = document.getElementById("contact");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.hash = "#contact";
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

