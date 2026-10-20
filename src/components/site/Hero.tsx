import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, FileText, GraduationCap } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";
import { useTheme } from "@/lib/use-theme";
import { TextType } from "@/components/ui/TextType";
import { ProfileCard } from "@/components/ui/ProfileCard";
import DepthText from "@/components/ui/DepthText";
import LogoLoop from "@/components/ui/LogoLoop";
import CountUp from "@/components/ui/CountUp";
import ScrambledText from "@/components/ui/ScrambledText";
import FuseButton from "@/components/ui/FuseButton";
import { SpecularButton } from "@/components/ui/SpecularButton";
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
  const time = useLocalTime(PROFILE.timezone);
  const timeParts = time ? time.split(":").map((v) => parseInt(v, 10)) : null;
  const hours = timeParts?.[0] ?? 0;
  const minutes = timeParts?.[1] ?? 0;
  const { dark } = useTheme();
  const hasCv = CV_HREF !== "#" && CV_HREF !== "";

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
              <span className="inline-flex items-center gap-1.5">
                <span>{PROFILE.location.split(",")[0]}</span>
                {time && timeParts ? (
                <span className="inline-flex items-center font-mono tabular-nums text-fg">
                  <CountUp
                    from={0}
                    to={hours}
                    mode="count"
                    easing="easeOut"
                    duration={1.2}
                    padDigits={2}
                    replayOnHover
                    trigger="view"
                  />
                  <span className="motion-safe:animate-pulse mx-px">:</span>
                  <CountUp
                    from={0}
                    to={minutes}
                    mode="count"
                    easing="easeOut"
                    duration={1.2}
                    padDigits={2}
                    replayOnHover
                    trigger="view"
                  />
                </span>
              ) : (
                <span className="font-mono tabular-nums text-fg">--:--</span>
              )}
                <span className="text-fg-subtle">{PROFILE.timezoneLabel}</span>
              </span>
            </div>

            {/* Main Headline: Interactive 3D DepthText */}
            <h1
              id="hero-title"
              className="enter relative mt-1.5 sm:mt-2.5 select-none"
              style={step(1)}
            >
              <DepthText
                text="Sary Danish"
                layers={18}
                depth={1.65}
                faceColor={dark ? "#3b82f6" : "#2563eb"}
                depthColor={dark ? "#1d4ed8" : "#1e40af"}
                gradientDepth={false}
                hoverPush={0.35}
                float={false}
                tilt={6}
                pointerTracking
                smoothing={0.14}
                perspective={850}
                autoOrbit={true}
                orbitSpeed={0.2}
                fontSize="clamp(2.4rem, 6.2vw, 4.4rem)"
                fontWeight={800}
                shadow
                outline={false}
                intro
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

            {/* Crisp Value Proposition Pitch with ScrambledText interactive animation */}
            <div className="enter mt-2.5 sm:mt-3.5" style={step(3)}>
              <ScrambledText
                className="max-w-[50ch] text-[14.5px] leading-[1.58] text-fg-muted sm:text-[15.5px] cursor-default select-none"
                effect="scramble"
                radius={100}
                strength={1}
                trail={0.6}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
                clickBurst
                intro
              >
                Building web apps that are fast, seamless, and reliable. Engineered with clean code, secure APIs, and turning real ideas into software that just works.
              </ScrambledText>
            </div>

            {/* Call to action buttons */}
            <div className="enter mt-4 sm:mt-5.5 flex flex-wrap items-center gap-3 sm:gap-3.5" style={step(4)}>
              <a
                href="#contact"
                className="btn-neobrutal-primary group inline-flex h-10.5 items-center gap-2 rounded-control px-5 text-[14px] font-semibold text-white cursor-pointer select-none"
              >
                <span className="relative z-10 font-semibold text-white">Get in touch</span>
                <ArrowRight
                  className="relative z-10 h-4 w-4 text-white transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
              <a
                href="#projects"
                className="btn-neobrutal-secondary inline-flex h-10.5 items-center justify-center rounded-control px-5 text-[14px] font-semibold cursor-pointer select-none"
              >
                <span className="relative z-10">View projects</span>
              </a>
              {hasCv ? (
                <FuseButton
                  label="Download CV"
                  undoLabel="Cancel"
                  doneLabel="Opening CV..."
                  icon={<FileText className="relative z-10 h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
                  href={CV_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  color={dark ? "#EDEDEF" : "#111113"}
                  background={dark ? "#18181B" : "#F4F4F3"}
                  fuseColor="#F59E0B"
                  undoWindow={2000}
                  fuse="outline"
                  fuseThickness={2}
                  radius={8}
                  size="md"
                  commitOn="fuseEnd"
                  settle="reset"
                  className="btn-neobrutal-tertiary select-none"
                />
              ) : null}
            </div>

            {/* Core Tech Stack & Current Focus Telemetry */}
            <div className="enter mt-5 sm:mt-6.5 flex flex-col gap-2.5 sm:gap-3 sm:max-w-[580px]" style={step(5)}>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="shrink-0 font-mono text-[12px] text-fg-subtle">Core Stack</span>
                <span aria-hidden="true" className="shrink-0 text-fg-subtle/50">/</span>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <LogoLoop
                    logos={CORE_STACK.map((tech) => ({
                      title: tech,
                      color: getSkillColor(tech),
                      glow: getSkillGlow(tech),
                      node: (
                        <SkillIcon
                          name={tech}
                          useBrandColor
                          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:scale-110"
                        />
                      ),
                    }))}
                    speed={32}
                    direction="left"
                    logoHeight={28}
                    gap={10}
                    pauseOnHover={true}
                    fadeOut={true}
                    fadeOutWidth={0.08}
                    draggable={true}
                    intro={false}
                    ariaLabel="Core Tech Stack"
                    renderItem={(item) => (
                      <span
                        className="tech-badge group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-1/80 px-2.5 py-1 text-[12.5px] font-medium text-fg-muted cursor-default select-none hover:bg-surface-1 hover:text-fg whitespace-nowrap"
                        style={
                          {
                            "--badge-color": item.color,
                            "--badge-glow": item.glow,
                          } as CSSProperties
                        }
                      >
                        {item.node}
                        <span>{item.title}</span>
                      </span>
                    )}
                  />
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
                    Web Developer Trainee Intern
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
                tiltStrength={0}
                parallax={0}
                radius={16}
                enableTilt={false}
                intro={false}
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

