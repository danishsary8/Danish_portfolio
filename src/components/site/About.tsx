import type { CSSProperties } from "react";
import { Check, Code2, LayoutGrid, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { OrgLogo } from "./OrgLogo";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

// The owner's statement: the section's headline quote, words sharpen on scroll.
const STATEMENT =
  "I turn practical problems and business ideas into dependable software, as a collaborative teammate or an independent builder.";

// Paraphrase of PROFILE.goal (the modal quotes the original), so the two never repeat.
const GOAL =
  "I’m working toward becoming an engineer who creates new things: complete, real-world products that solve genuine problems and make a real difference for the people who use them.";

// Text on the rotating ring around the portrait (repeats twice around the circle).
const RING = "SARY DANISH · BUILDING DEPENDABLE SOFTWARE · ";

const PRINCIPLES = [
  {
    icon: LayoutGrid,
    term: "Interfaces that feel effortless",
    detail: "Mobile-first layouts, semantic HTML and touch-friendly controls that hold up on any screen.",
  },
  {
    icon: ShieldCheck,
    term: "APIs you can trust",
    detail: "Protected with JWT sessions, OTP checks, Google sign-in and role-based access.",
  },
  {
    icon: Code2,
    term: "Code a team can keep",
    detail: "Feature branches, reviewed pull requests and tidy data models, so the next change is easy.",
  },
] as const;

/** Round portrait inside a slowly rotating ring of text (React Bits CircularText idea, SVG + CSS). */
function Portrait() {
  return (
    <div className="about-portrait relative mx-auto aspect-square w-full max-w-[380px]">
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="about-ring absolute inset-0 h-full w-full text-fg-subtle"
      >
        <defs>
          <path id="about-ring-path" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
        </defs>
        <text className="fill-current font-mono text-[8.6px] tracking-[0.28em]">
          <textPath href="#about-ring-path" textLength="552" lengthAdjust="spacing">
            {RING + RING}
          </textPath>
        </text>
      </svg>

      {/* Photo disc with a hairline bezel; the gold dot marks availability */}
      <div className="absolute inset-[15%] rounded-full p-1.5 tactile frame-float">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-1">
          <img
            src={ASSETS.profile.photo}
            alt={`Portrait of ${PROFILE.name}`}
            width={680}
            height={850}
            decoding="async"
            loading="lazy"
            className="h-full w-full origin-[50%_42%] scale-[1.22] object-cover object-[50%_76%]"
          />
        </div>
        <span
          role="img"
          aria-label="Available for work"
          className="absolute bottom-[9%] right-[9%] h-4 w-4 rounded-full bg-gold shadow-[0_0_0_4px_var(--bg)]"
        />
      </div>
    </div>
  );
}

export function About() {
  const words = STATEMENT.split(" ");

  return (
    <section id="about" aria-labelledby="about-title" className={SECTION}>
      <SectionHeader
        id="about-title"
        title="About"
        lede="Who I am, what I build, and where I’m heading next."
      />

      {/* Row 1: portrait + manifesto */}
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal className="about-settle">
          <Portrait />
        </Reveal>

        <div>
          <blockquote className="scroll-reveal m-0 text-balance text-[28px] font-medium leading-[1.2] tracking-[-0.03em] text-fg sm:text-[34px] xl:text-[40px]">
            <span aria-hidden="true" className="select-none text-gold">
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
            <span aria-hidden="true" className="select-none text-gold">
              ”
            </span>
          </blockquote>
          <Reveal as="p" index={1} className="mt-8 max-w-[56ch] border-l-2 border-line-strong pl-5 text-pretty text-[16.5px] leading-[1.7] text-fg-muted">
            {GOAL}
          </Reveal>
        </div>
      </div>

      {/* Row 2: what he is doing now + how he works */}
      <div className="mt-20 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* Right now: an iOS-style status widget */}
        <Reveal>
          <h3 className="mb-4 flex items-center gap-2 text-[15px] font-medium text-fg">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.4s] motion-safe:[animation-iteration-count:3]" />
              <span className="relative h-2 w-2 rounded-full bg-gold" />
            </span>
            Right now
          </h3>
          <div className="tactile squircle [--r:24px] p-6 sm:p-7">
          <div className="flex items-center gap-3.5">
            <div className="flex shrink-0 -space-x-2">
              <OrgLogo org="etec" size={36} />
              <OrgLogo org="kru" size={36} className="ring-2 ring-surface-2" />
            </div>
            <div className="min-w-0">
              <p className="text-[18px] font-semibold leading-tight tracking-[-0.02em] text-fg">
                Backend Developer Intern
              </p>
              <p className="mt-0.5 text-[13.5px] text-fg-muted">ETEC &amp; KruITSolution · since Oct 2026</p>
            </div>
          </div>

          {/* Track: frontend stage completed, backend stage in progress */}
          <ol className="mt-6 grid grid-cols-2 gap-2" aria-label="Internship track">
            <li>
              <span aria-hidden="true" className="block h-1.5 rounded-full bg-fg/80" />
              <p className="mt-2 flex items-center gap-1 text-[12.5px] font-medium text-fg">
                <Check aria-hidden="true" strokeWidth={2.5} className="h-3.5 w-3.5 text-fg-subtle" />
                Frontend
              </p>
              <p className="font-mono text-[11.5px] tabular-nums text-fg-subtle">Jul – Oct 2026</p>
            </li>
            <li>
              <span aria-hidden="true" className="block h-1.5 overflow-hidden rounded-full bg-line-strong">
                <span className="about-track-fill block h-full w-[62%] rounded-full bg-gold" />
              </span>
              <p className="mt-2 text-[12.5px] font-medium text-fg">Backend · in progress</p>
              <p className="font-mono text-[11.5px] tabular-nums text-fg-subtle">Oct 2026 – now</p>
            </li>
          </ol>

          <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
            <OrgLogo org="norton" size={32} />
            <p className="text-[13.5px] text-fg-muted">
              <span className="font-medium text-fg">4th-year Software Development</span> · Norton
              University
            </p>
          </div>
          </div>
        </Reveal>

        {/* How I work: three principles, one clean list */}
        <Reveal index={1}>
          <h3 className="mb-4 text-[15px] font-medium text-fg">How I work</h3>
          <dl className="tactile squircle [--r:24px] divide-y divide-line overflow-hidden">
            {PRINCIPLES.map(({ icon: Icon, term, detail }) => (
              <div
                key={term}
                className="group grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-4 px-6 py-5 transition-colors duration-150 hover:bg-surface-1"
              >
                <span
                  aria-hidden="true"
                  className="icon-tile squircle [--r:12px] grid h-11 w-11 place-items-center transition-transform duration-200 ease-[var(--ease-out)] group-hover:-rotate-6"
                >
                  <Icon strokeWidth={1.75} className="h-[19px] w-[19px]" />
                </span>
                <div>
                  <dt className="text-[15.5px] font-medium tracking-[-0.01em] text-fg">{term}</dt>
                  <dd className="mt-1 text-[14.5px] leading-[1.6] text-fg-muted">{detail}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export default About;
