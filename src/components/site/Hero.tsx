import type { CSSProperties } from "react";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { FACTS, PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";
import { useTheme } from "@/lib/use-theme";
import { RotatingText } from "@/components/ui/RotatingText";
import { ProfileCard } from "@/components/ui/ProfileCard";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
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

            {/* Main Headline: Sary (foreground) Danish (gold accent) */}
            <h1
              id="hero-title"
              className="enter mt-4 text-[clamp(2.75rem,6.2vw,4.5rem)] font-extrabold leading-[1.03] tracking-[-0.04em]"
              style={step(1)}
            >
              <span className="text-fg">Sary</span>{" "}
              <span className="text-gold dark:text-gold">Danish</span>
            </h1>

            {/* Dynamic Rotating Role: Junior [Web / Software / Fullstack] Developer */}
            <div className="enter mt-3 flex items-center" style={step(2)}>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong/80 bg-surface/80 px-3 py-1 text-[15px] sm:text-[17px] font-semibold text-fg shadow-2xs backdrop-blur-sm">
                <span className="sr-only">Junior Web Developer</span>
                <span aria-hidden="true" className="text-fg-muted font-medium">Junior</span>
                <span aria-hidden="true" className="inline-flex items-center rounded-md border border-gold/35 bg-gold/15 px-2 py-0.5 text-gold dark:text-gold font-bold">
                  <RotatingText
                    texts={["Web", "Software", "Fullstack"]}
                    effect="slide"
                    direction="up"
                    highlight={false}
                    staggerFrom="last"
                    staggerDuration={0.02}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    rotationInterval={2600}
                    className="font-bold text-gold"
                  />
                </span>
                <span aria-hidden="true" className="text-fg-muted font-medium">Developer</span>
              </div>
            </div>

            {/* Sharp, non-duplicative value proposition pitch */}
            <p
              className="enter mt-5 max-w-[52ch] text-[15.5px] leading-[1.65] text-fg-muted sm:text-[16.5px]"
              style={step(3)}
            >
              Building modern, high-performance web applications with clean user interfaces
              and robust APIs. Focused on scalable frontend architecture, secure backend services,
              and shipping reliable software.
            </p>

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

            {/* Facts and highlights ledger */}
            <dl
              className="enter mt-10 grid grid-cols-3 overflow-hidden rounded-brand border border-line bg-surface/50 backdrop-blur-sm sm:max-w-[620px]"
              style={step(5)}
            >
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-4 py-3.5 sm:px-5 ${i > 0 ? "border-l border-line" : ""}`}
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block text-[21px] font-semibold tracking-[-0.03em] text-fg sm:text-[25px]">
                      {f.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 block text-[12px] leading-[1.3] text-fg-subtle"
                    >
                      {f.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
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
                holo={0.3}
                glare={0.2}
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

