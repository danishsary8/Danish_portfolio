import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, Code2, GraduationCap } from "lucide-react";
import { AnimatedGithubIcon } from "@/components/ui/AnimatedGithubIcon";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { useLocalTime } from "@/lib/use-local-time";
import { useTheme } from "@/lib/use-theme";
import { ProfileCard } from "@/components/ui/ProfileCard";
import LogoLoop from "@/components/ui/LogoLoop";
import CountUp from "@/components/ui/CountUp";
import { SkillIcon, getSkillColor, getSkillGlow } from "./SkillIcon";
import { ProfileModal } from "./ProfileModal";

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
  const [goldTarget, setGoldTarget] = useState<"danish" | "sary">("danish");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsProfileModalOpen(true);
    window.addEventListener("open-photo-modal", handleOpen);
    return () => window.removeEventListener("open-photo-modal", handleOpen);
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

            {/* Main Headline: Razor-Sharp Architectural Display Typography */}
            <h1
              id="hero-title"
              className="enter mt-2 sm:mt-2.5 text-[44px] sm:text-[58px] lg:text-[70px] font-semibold tracking-[-0.04em] leading-[1.02] select-none cursor-pointer group"
              style={step(1)}
              onClick={() => {
                setGoldTarget((prev) => (prev === "danish" ? "sary" : "danish"));
              }}
              title="Click to alternate highlight"
            >
              <span
                className={`transition-colors duration-300 ${
                  goldTarget === "sary"
                    ? "text-gold-ink dark:text-gold"
                    : "text-fg group-hover:text-fg/80"
                }`}
              >
                Sary{" "}
              </span>
              <span
                className={`transition-colors duration-300 ${
                  goldTarget === "danish"
                    ? "text-gold-ink dark:text-gold"
                    : "text-fg group-hover:text-fg/80"
                }`}
              >
                Danish
              </span>
            </h1>

            {/* Confident Architectural Subtitle */}
            <div className="enter mt-2.5 sm:mt-3 flex items-center gap-2.5" style={step(2)}>
              <span className="sr-only">Junior Web Developer — Junior Full-Stack Developer</span>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold/12 text-gold-ink dark:text-gold border border-gold/25 shadow-2xs"
                aria-hidden="true"
              >
                <Code2 className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              <p className="text-[17px] sm:text-[19px] font-medium tracking-tight text-fg">
                Junior{" "}
                <span className="font-semibold text-gold-ink dark:text-gold">
                  Full-Stack Developer
                </span>
              </p>
            </div>

            {/* Value Proposition Pitch */}
            <div className="enter mt-3 sm:mt-3.5" style={step(3)}>
              <p className="max-w-[50ch] text-[14.5px] leading-[1.6] text-fg-muted sm:text-[15.5px]">
                Building web apps that are fast, seamless, and reliable. Engineered with clean code, secure APIs, and turning real ideas into software that just works.
              </p>
            </div>

            {/* Call to action buttons */}
            <div className="enter mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-3.5" style={step(4)}>
              <a
                href="#contact"
                className="press group inline-flex h-10.5 items-center justify-center gap-2 px-5 rounded-control bg-gold hover:bg-gold-ink text-white font-medium text-[13.5px] sm:text-[14px] shadow-xs transition-colors duration-150 select-none cursor-pointer"
              >
                <span>Get in touch</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>

              {PROFILE.github ? (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press group inline-flex h-10.5 items-center justify-center gap-2.5 px-5 rounded-control bg-surface-2 hover:bg-surface-1 border border-line-strong text-fg font-medium text-[13.5px] sm:text-[14px] shadow-2xs transition-colors duration-150 select-none cursor-pointer"
                  aria-label="GitHub profile"
                >
                  <AnimatedGithubIcon
                    className="h-4.5 w-4.5 shrink-0 transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-110"
                    dark={dark}
                    aria-hidden="true"
                  />
                  <span>GitHub</span>
                </a>
              ) : null}
            </div>

            {/* Core Tech Stack & Current Focus Telemetry */}
            <div className="enter mt-5 sm:mt-6.5 flex flex-col gap-2.5 sm:gap-3 sm:max-w-[580px]" style={step(5)}>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="shrink-0 font-mono text-[11px] font-semibold tracking-wider text-fg-subtle uppercase select-none">
                  Core Stack
                </span>
                <span aria-hidden="true" className="shrink-0 text-fg-subtle/40 font-mono">/</span>
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
                    renderItem={(item: any) => (
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

              {/* Current Role & University Trajectory: Elegant Hairline Ledger */}
              <div className="mt-1 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 pt-2.5 border-t border-line/60 text-[12px] sm:text-[12.5px] text-fg-muted">
                <a
                  href="#experience"
                  className="group inline-flex items-center gap-1.5 hover:text-fg transition-colors duration-150 select-none cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center">
                    <span className="absolute h-full w-full rounded-full bg-gold opacity-75 motion-safe:animate-ping" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <span className="font-medium text-fg group-hover:text-gold transition-colors">
                    Web Developer Trainee
                  </span>
                  <span className="text-fg-subtle">at ETEC & KruITSolution</span>
                </a>

                <span aria-hidden="true" className="text-line-strong select-none">•</span>

                <a
                  href="#education"
                  className="group inline-flex items-center gap-1.5 hover:text-fg transition-colors duration-150 select-none cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <GraduationCap className="h-3.5 w-3.5 text-fg-subtle group-hover:text-fg transition-colors shrink-0" strokeWidth={1.8} />
                  <span className="font-medium text-fg group-hover:text-gold transition-colors">
                    4th-Year Software Development
                  </span>
                  <span className="text-fg-subtle">at Norton University</span>
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
                title="Junior Fullstack Developer"
                handle={PROFILE.phone || "087 680 999"}
                status="Available to work full-time"
                statusColor={dark ? "#c9973a" : "#b0822d"}
                contactText="Contact"
                avatarUrl={ASSETS.profile.photo}
                showViewButton={true}
                onViewClick={() => {
                  setIsProfileModalOpen(true);
                }}
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

      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} />
    </section>
  );
}

