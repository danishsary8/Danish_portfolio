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
        className="hero-glow absolute inset-x-0 top-0 -z-10 h-[720px] pointer-events-none opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-28 -z-10 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[120px] dark:bg-gold/15"
      />

      <div className="mx-auto max-w-[1180px] px-5 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.18fr_auto] lg:gap-14 xl:gap-20">
          {/* Left Column: Headline, RotatingText, Bio, CTAs & Facts */}
          <div className="min-w-0">
            {/* Status & Phnom Penh time */}
            <div className="enter flex flex-wrap items-center gap-3" style={step(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong/80 bg-surface/80 px-3 py-1 text-[13px] text-fg-muted shadow-xs backdrop-blur-md">
                <span aria-hidden="true" className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="text-fg font-medium">Open to web developer roles</span>
              </span>
              <span aria-hidden="true" className="text-fg-subtle">
                /
              </span>
              <span className="text-[13px] text-fg-muted">
                {PROFILE.location.split(",")[0]}{" "}
                <span className="font-mono text-[12.5px] tabular-nums text-fg">{time ?? "--:--"}</span>{" "}
                <span className="text-fg-subtle">{PROFILE.timezoneLabel}</span>
              </span>
            </div>

            {/* Medium-large Lead: Software and Web Development */}
            <div className="enter mt-6 flex items-center gap-3" style={step(1)}>
              <div className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-3 py-1 dark:border-gold/25 dark:bg-gold/15">
                <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
                <span className="text-[15px] sm:text-[18px] md:text-[20px] font-semibold tracking-tight text-fg">
                  Software and Web Development
                </span>
              </div>
            </div>

            {/* Main Headline with Sary Danish & Dynamic Rotating Roles */}
            <h1
              id="hero-title"
              className="enter mt-4 text-[clamp(2.5rem,6.4vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]"
              style={step(2)}
            >
              <span className="text-fg">{PROFILE.name}</span>
              <span className="mt-3 block text-[clamp(1.4rem,3.8vw,2.35rem)] font-medium leading-[1.18] tracking-[-0.03em] text-fg-muted">
                <RotatingText
                  texts={[
                    "Junior Web Developer",
                    "Junior Software Developer",
                    "Junior Fullstack Developer",
                  ]}
                  effect="slide"
                  direction="up"
                  highlight={true}
                  highlightColor="rgba(176, 130, 45, 0.16)"
                  staggerFrom="last"
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                  rotationInterval={2800}
                  className="rounded-lg px-2.5 py-0.5 font-semibold text-fg transition-colors"
                />
              </span>
            </h1>

            {/* Bio description */}
            <p
              className="enter mt-6 max-w-[54ch] text-[16px] leading-[1.65] text-fg-muted sm:text-[17px]"
              style={step(3)}
            >
              Fourth-year Software Development student at Norton University and web developer
              trainee at ETEC &amp; KruITSolution, shipping production React and Laravel applications
              with PostgreSQL.
            </p>

            {/* Call to action buttons */}
            <div className="enter mt-9 flex flex-wrap items-center gap-3" style={step(4)}>
              <a
                href="#contact"
                className="press group inline-flex h-11 items-center gap-2 rounded-control bg-fg px-5 text-[14.5px] font-medium text-bg transition-[opacity,transform] duration-150 hover:opacity-90"
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
                className="press inline-flex h-11 items-center rounded-control border border-line-strong bg-surface px-5 text-[14.5px] font-medium text-fg transition-[background-color,transform] duration-150 hover:bg-raised"
              >
                View projects
              </a>
              {hasCv ? (
                <a
                  {...getCvLinkProps()}
                  className="press inline-flex h-11 items-center gap-2 rounded-control px-4 text-[14.5px] font-medium text-fg-muted transition-[color,transform] duration-150 hover:text-fg"
                >
                  <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  Download CV
                </a>
              ) : null}
            </div>

            {/* Facts and highlights ledger */}
            <dl
              className="enter mt-14 grid grid-cols-3 overflow-hidden rounded-brand border border-line bg-surface/50 backdrop-blur-sm sm:mt-16 sm:max-w-[640px]"
              style={step(5)}
            >
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-4 py-4 sm:px-5 ${i > 0 ? "border-l border-line" : ""}`}
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block text-[22px] font-semibold tracking-[-0.03em] text-fg sm:text-[26px]">
                      {f.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 block text-[12.5px] leading-[1.35] text-fg-subtle"
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
                className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-b from-gold/20 via-transparent to-transparent opacity-70 blur-2xl"
              />
              <ProfileCard
                name={PROFILE.name}
                title="Junior Software & Web Developer"
                handle={PROFILE.githubHandle}
                status="Open to roles"
                contactText="Contact"
                avatarUrl={ASSETS.profile.photo}
                miniAvatarUrl={ASSETS.profile.photo}
                holo={0.7}
                glare={0.45}
                tiltStrength={12}
                parallax={8}
                radius={18}
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

