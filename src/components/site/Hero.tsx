import type { CSSProperties } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { FACTS, PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useLocalTime } from "@/lib/use-local-time";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  const time = useLocalTime(PROFILE.timezone);
  const hasCv = CV_HREF !== "#" && CV_HREF !== "";

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate">
      <div aria-hidden="true" className="hero-glow absolute inset-x-0 top-0 -z-10 h-[640px]" />
      <div className="mx-auto max-w-[1120px] px-5 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28">
        <div className="enter flex flex-wrap items-center gap-3" style={step(0)}>
          <img
            src={ASSETS.profile.photo}
            alt=""
            width={816}
            height={816}
            decoding="async"
            className="h-9 w-9 rounded-full object-cover object-top ring-1 ring-line-strong"
          />
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] text-fg-muted">
            <span className="inline-flex items-center gap-2 text-fg">
              <span aria-hidden="true" className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
                <span className="relative h-2 w-2 rounded-full bg-gold" />
              </span>
              Open to web developer roles
            </span>
            <span aria-hidden="true" className="text-fg-subtle">
              /
            </span>
            <span>
              {PROFILE.location.split(",")[0]}{" "}
              <span className="font-mono text-[12.5px] tabular-nums">{time ?? "--:--"}</span>{" "}
              {PROFILE.timezoneLabel}
            </span>
          </p>
        </div>

        <h1
          id="hero-title"
          className="enter mt-8 max-w-[19ch] text-[clamp(2.4rem,6.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
          style={step(1)}
        >
          <span className="text-fg">{PROFILE.name}</span>{" "}
          <span className="text-fg-subtle">builds secure APIs and clean, responsive web apps.</span>
        </h1>

        <p
          className="enter mt-6 max-w-[54ch] text-[16px] leading-[1.65] text-fg-muted sm:text-[17px]"
          style={step(2)}
        >
          {PROFILE.role} and fourth-year Software Development student at Norton University.
          Currently a web developer trainee at ETEC &amp; KruITSolution, shipping React and Laravel
          apps.
        </p>

        <div className="enter mt-9 flex flex-wrap items-center gap-2.5" style={step(3)}>
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

        <dl
          className="enter mt-16 grid grid-cols-3 overflow-hidden rounded-brand border border-line sm:mt-20 sm:max-w-[640px]"
          style={step(4)}
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
    </section>
  );
}
