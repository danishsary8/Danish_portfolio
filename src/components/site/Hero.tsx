import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, FileText, GraduationCap } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";
import { useTheme } from "@/lib/use-theme";
import { TextType } from "@/components/ui/TextType";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { VariableProximity } from "@/components/ui/VariableProximity";
import { SplitText } from "@/components/ui/SplitText";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { SplitFlapText } from "@/components/ui/SplitFlapText";
import { SkillIcon, getSkillColor, getSkillGlow } from "./SkillIcon";

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
  const [goldTarget, setGoldTarget] = useState<"danish" | "sary">("danish");
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        setGoldTarget((prev) => (prev === "danish" ? "sary" : "danish"));
      }
    }, 3400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden min-h-[100dvh] flex flex-col justify-center"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="hero-glow absolute inset-x-0 top-0 -z-10 h-full pointer-events-none opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-24 -z-10 h-[360px] w-[360px] rounded-full bg-gold/10 blur-[110px] dark:bg-gold/15"
      />

      <div className="mx-auto w-full max-w-[1180px] px-5 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-10 lg:pt-20 lg:pb-10 xl:pt-24 xl:pb-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_auto] lg:gap-10 xl:gap-14">
          {/* Left Column: Status, Headline, Rotating Role, Bio Pitch, CTAs & Facts */}
          <div className="min-w-0">
            {/* Status & Phnom Penh time */}
            <div className="enter flex flex-wrap items-center gap-2.5 text-[12.5px] sm:text-[13px] text-fg-muted" style={step(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong/80 bg-surface/80 px-2.5 py-1 sm:px-3 shadow-2xs backdrop-blur-md">
                <span aria-hidden="true" className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="text-fg font-medium">Available to work full-time</span>
              </span>
              <span aria-hidden="true" className="text-fg-subtle">
                /
              </span>
              <span className="inline-flex items-center gap-1.5 align-middle">
                <span>{PROFILE.location.split(",")[0]}</span>
                <span className="inline-flex items-center align-middle font-mono tabular-nums">
                  <SplitFlapText
                    words={[time || "--:--"]}
                    padTo={5}
                    flipDuration={0.12}
                    stagger={0.04}
                    cycleDelay={2400}
                    charset="0123456789:-"
                    flipsPerChar={5}
                    order="left"
                    align="left"
                    tileStyle="board"
                    tileColor={dark ? "#18181b" : "#f4f4f5"}
                    textColor={dark ? "#ededef" : "#111113"}
                    glare={0}
                    depth={0.3}
                    tileRadius={3}
                    gap={2}
                    fontSize={12.5}
                    loop={false}
                    intro={true}
                  />
                </span>
                <span className="text-fg-subtle">{PROFILE.timezoneLabel}</span>
              </span>
            </div>

            {/* Main Headline: Alternating Gold Accent between Sary and Danish with Syne display & VariableProximity */}
            <h1
              ref={headlineRef}
              id="hero-title"
              className="enter hero-name-heading relative mt-2.5 sm:mt-3.5 cursor-pointer select-none text-[clamp(2.5rem,5.2vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em]"
              style={step(1)}
              onPointerEnter={() => {
                isPausedRef.current = true;
              }}
              onPointerLeave={() => {
                isPausedRef.current = false;
              }}
              onClick={() => {
                setGoldTarget((prev) => (prev === "danish" ? "sary" : "danish"));
              }}
              title="Click to alternate highlight"
            >
              <VariableProximity
                label="Sary"
                className={`hero-name-sary hero-name-word ${
                  goldTarget === "sary" ? "hero-name-word--gold" : "hero-name-word--primary"
                }`}
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
                className={`hero-name-danish hero-name-word ${
                  goldTarget === "danish" ? "hero-name-word--gold" : "hero-name-word--primary"
                }`}
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
            <div className="enter mt-2 sm:mt-2.5 flex items-center" style={step(2)}>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong/80 bg-surface/80 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[14px] sm:text-[16px] font-medium text-fg-muted shadow-2xs backdrop-blur-sm">
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
                text="Building web apps that are fast, intuitive, and reliable. Powered by clean code, secure APIs, and turning real ideas into software that just works."
                className="mt-3 sm:mt-4 max-w-[50ch] text-[14.5px] leading-[1.58] text-fg-muted sm:text-[16px]"
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
            <div className="enter mt-4 sm:mt-5.5 flex flex-wrap items-center gap-2.5 sm:gap-3" style={step(4)}>
              <a
                href="#contact"
                className="btn-primary-flash press group inline-flex h-10.5 items-center gap-2 rounded-control px-5 text-[14px] font-medium text-white transition-[background-color,transform,box-shadow] duration-150"
              >
                <span className="relative z-10 font-medium text-white">Get in touch</span>
                <ArrowRight
                  className="relative z-10 h-4 w-4 text-white transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
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
            <div className="enter mt-5 sm:mt-6.5 flex flex-col gap-2.5 sm:gap-3 sm:max-w-[580px]" style={step(5)}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12px] text-fg-subtle">Core Stack</span>
                <span aria-hidden="true" className="text-fg-subtle/50">/</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {CORE_STACK.map((tech) => {
                    const brandColor = getSkillColor(tech);
                    const brandGlow = getSkillGlow(tech);
                    return (
                      <span
                        key={tech}
                        className="tech-badge group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-1/80 px-2.5 py-1 text-[12.5px] font-medium text-fg-muted cursor-default select-none hover:bg-surface-1 hover:text-fg"
                        style={
                          {
                            "--badge-color": brandColor,
                            "--badge-glow": brandGlow,
                          } as CSSProperties
                        }
                      >
                        <SkillIcon
                          name={tech}
                          useBrandColor
                          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:scale-110"
                        />
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Current Role & University Trajectory */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[12px] sm:text-[12.5px]">
                <a
                  href="#experience"
                  className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-1/70 px-3 py-1.5 transition-all duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-1 hover:shadow-xs press"
                >
                  <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]" />
                    <span className="relative h-2 w-2 rounded-full bg-gold" />
                  </span>
                  <span className="font-medium text-fg transition-colors duration-150 group-hover:text-gold">
                    Web Developer Trainee
                  </span>
                  <span className="text-fg-subtle">
                    at <span className="font-normal text-fg-muted">ETEC & KruITSolution</span>
                  </span>
                </a>

                <a
                  href="#education"
                  className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-1/70 px-3 py-1.5 transition-all duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-1 hover:shadow-xs press"
                >
                  <GraduationCap
                    className="h-3.5 w-3.5 shrink-0 text-fg-subtle transition-colors duration-150 group-hover:text-fg"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-fg transition-colors duration-150 group-hover:text-fg">
                    4th-Year Software Development
                  </span>
                  <span className="text-fg-subtle">
                    at <span className="font-normal text-fg-muted">Norton University</span>
                  </span>
                </a>
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
                status="Available to work full-time"
                statusColor={dark ? "#c9973a" : "#b0822d"}
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

