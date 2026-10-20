import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Code2, FileText, GraduationCap } from "lucide-react";
import { SiGithub } from "react-icons/si";
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
import GradientText from "@/components/ui/GradientText";
import GlareHover from "@/components/ui/GlareHover";
import SpecularButton from "@/components/ui/SpecularButton";
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

  const primaryFace = dark ? "#EDEDEF" : "#111113";
  const primaryDepth = dark ? "#3F3F46" : "#52525B";
  const goldFace = dark ? "#C9973A" : "#B0822D";
  const goldDepth = dark ? "#85601F" : "#785618";

  const saryFace = goldTarget === "sary" ? goldFace : primaryFace;
  const saryDepth = goldTarget === "sary" ? goldDepth : primaryDepth;
  const danishFace = goldTarget === "danish" ? goldFace : primaryFace;
  const danishDepth = goldTarget === "danish" ? goldDepth : primaryDepth;

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
              <span className="ios-glass-pill cursor-target gap-2 px-3 py-1.5 sm:px-3.5 select-none">
                <span aria-hidden="true" className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-gold/15 dark:bg-gold/20">
                  <span className="absolute h-2 w-2 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
                  <span className="relative h-2 w-2 rounded-full bg-gold shadow-[0_0_6px_var(--gold)]" />
                </span>
                <span className="text-fg font-medium tracking-[-0.01em]">Available to work full-time</span>
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

            {/* Main Headline: Interactive 3D DepthText with smooth alternating Gold/Default colors */}
            <h1
              id="hero-title"
              className="enter relative mt-1.5 sm:mt-2.5 select-none cursor-pointer flex items-center gap-3 sm:gap-4 flex-wrap"
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
              <DepthText
                text="Sary"
                layers={16}
                depth={1.5}
                faceColor={saryFace}
                depthColor={saryDepth}
                gradientDepth={false}
                hoverPush={0.35}
                float={false}
                tilt={5.5}
                pointerTracking
                smoothing={0.14}
                perspective={850}
                autoOrbit={false}
                fontSize="clamp(2.4rem, 6.2vw, 4.4rem)"
                fontWeight={800}
                shadow
                outline={false}
                intro
              />
              {" "}
              <DepthText
                text="Danish"
                layers={16}
                depth={1.5}
                faceColor={danishFace}
                depthColor={danishDepth}
                gradientDepth={false}
                hoverPush={0.35}
                float={false}
                tilt={5.5}
                pointerTracking
                smoothing={0.14}
                perspective={850}
                autoOrbit={false}
                fontSize="clamp(2.4rem, 6.2vw, 4.4rem)"
                fontWeight={800}
                shadow
                outline={false}
                intro
              />
            </h1>

            {/* Dynamic Typing Role: Junior [Software / Web / Fullstack] Developer */}
            <div className="enter mt-3 sm:mt-4 flex items-center" style={step(2)}>
              <div className="ios-glass-pill cursor-target inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 font-display text-[16px] sm:text-[19px] font-bold tracking-tight text-fg select-none transition-all duration-200">
                <span className="sr-only">Junior Web Developer</span>
                <span
                  className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 shrink-0 items-center justify-center rounded-[6px] bg-gold/12 text-gold border border-gold/25 shadow-2xs"
                  aria-hidden="true"
                >
                  <Code2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span aria-hidden="true" className="font-display font-bold text-fg tracking-tight">Junior</span>
                <span aria-hidden="true" className="inline-flex items-center font-display font-extrabold text-gold tracking-tight">
                  <TextType
                    text={["Web", "Software", "Full-Stack"]}
                    typingSpeed={60}
                    pauseDuration={2400}
                    deletingSpeed={40}
                    deleteMode="backspace"
                    typeEffect="fade"
                    mistakes={0}
                    cursorStyle="bar"
                    cursorGlide
                    showCursor
                    cursorColor={dark ? "#C9973A" : "#B0822D"}
                    className="font-display font-extrabold text-gold"
                  />
                </span>
                <span aria-hidden="true" className="font-display font-bold text-fg tracking-tight">Developer</span>
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
              <GlareHover
                borderRadius="8px"
                mode="hover"
                variant="streak"
                glareColor="#ffffff"
                glareOpacity={0.4}
                glareSize={30}
                softness={0.6}
                glareAngle={-45}
                blendMode="screen"
                rimGlint={true}
                transitionDuration={650}
                className="inline-grid rounded-control"
              >
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
              </GlareHover>

              {PROFILE.github ? (
                <GlareHover
                  borderRadius="8px"
                  mode="hover"
                  variant="streak"
                  glareColor="#ffffff"
                  glareOpacity={0.4}
                  glareSize={30}
                  softness={0.6}
                  glareAngle={-45}
                  blendMode="screen"
                  rimGlint={true}
                  transitionDuration={650}
                  className="inline-grid rounded-control"
                >
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neobrutal-github group inline-flex h-10.5 items-center justify-center gap-2.5 rounded-control px-5 text-[14px] font-semibold cursor-pointer select-none"
                    aria-label="GitHub profile"
                  >
                    <SiGithub
                      className="relative z-10 h-4.5 w-4.5 shrink-0 transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 font-semibold tracking-[-0.01em]">GitHub</span>
                  </a>
                </GlareHover>
              ) : null}
            </div>

            {/* Core Tech Stack & Current Focus Telemetry */}
            <div className="enter mt-5 sm:mt-6.5 flex flex-col gap-2.5 sm:gap-3 sm:max-w-[580px]" style={step(5)}>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <GradientText
                  colors={
                    dark
                      ? ["#40ffaa", "#4079ff", "#a78bfa", "#40ffaa"]
                      : ["#059669", "#2563eb", "#7c3aed", "#059669"]
                  }
                  animationSpeed={3}
                  scale={1.2}
                  glow={dark ? 0.35 : 0.15}
                  showBorder={false}
                  className="shrink-0 font-mono text-[12px] sm:text-[12.5px] font-bold tracking-wider uppercase select-none"
                >
                  Core Stack
                </GradientText>
                <span aria-hidden="true" className="shrink-0 text-fg-subtle/50 font-mono">/</span>
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
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[12px] sm:text-[12.5px]">
                <SpecularButton
                  href="#experience"
                  size="sm"
                  radius={18}
                  tint={dark ? "#ffffff" : "#000000"}
                  tintOpacity={dark ? 0.05 : 0.04}
                  textColor={dark ? "#f5f5f5" : "#111113"}
                  lineColor={dark ? "#ffffff" : "#B0822D"}
                  baseColor={dark ? "#525252" : "#d4d4d8"}
                  intensity={1}
                  idleIntensity={0.35}
                  shineSize={10}
                  shineFade={34}
                  thickness={1.2}
                  glow={1}
                  followMouse
                  proximity={250}
                  className="group gap-2 !px-3.5 !py-1.5 select-none press cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById("experience");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span aria-hidden="true" className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-gold/15 dark:bg-gold/20">
                    <span className="absolute h-2 w-2 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]" />
                    <span className="relative h-2 w-2 rounded-full bg-gold shadow-[0_0_6px_var(--gold)]" />
                  </span>
                  <span className="relative z-10 font-medium text-fg tracking-[-0.01em] transition-colors duration-150 group-hover:text-gold">
                    Web Developer Trainee Intern
                  </span>
                  <span className="relative z-10 text-fg-subtle">
                    at <span className="font-normal text-fg-muted">ETEC & KruITSolution</span>
                  </span>
                </SpecularButton>

                <SpecularButton
                  href="#education"
                  size="sm"
                  radius={18}
                  tint={dark ? "#ffffff" : "#000000"}
                  tintOpacity={dark ? 0.05 : 0.04}
                  textColor={dark ? "#f5f5f5" : "#111113"}
                  lineColor={dark ? "#ffffff" : "#B0822D"}
                  baseColor={dark ? "#525252" : "#d4d4d8"}
                  intensity={1}
                  idleIntensity={0.35}
                  shineSize={10}
                  shineFade={34}
                  thickness={1.2}
                  glow={1}
                  followMouse
                  proximity={250}
                  className="group gap-2 !px-3.5 !py-1.5 select-none press cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById("education");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span aria-hidden="true" className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-fg/[0.06] dark:bg-white/[0.08]">
                    <GraduationCap
                      className="h-3 w-3 text-fg-subtle transition-colors duration-150 group-hover:text-fg"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="relative z-10 font-medium text-fg tracking-[-0.01em] transition-colors duration-150 group-hover:text-fg">
                    4th-Year Software Development
                  </span>
                  <span className="relative z-10 text-fg-subtle">
                    at <span className="font-normal text-fg-muted">Norton University</span>
                  </span>
                </SpecularButton>
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
                handle={PROFILE.phone || "087 680 999"}
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

