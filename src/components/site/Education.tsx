import type { CSSProperties } from "react";
import { BadgeCheck, BookOpen, GraduationCap, Languages } from "lucide-react";
import { CERTIFICATES, EDUCATION } from "@/content/portfolio";
import { OrgLogo } from "./OrgLogo";
import { CertificateThumb } from "./CertificateThumb";
import certFrontend from "@/assets/certificates/etec-frontend.webp";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

const [DEGREE, ENGLISH] = EDUCATION;

// One colour per school, shared by the timeline bands and the cards.
const NORTON = "#B4233C";
const ACE = "#2563EB";
const ETEC = "#7C3AED";
const NOW_GREEN = "#34C759";

// Timeline: months from Jan 2024 (0) to Jan 2027 (36). "Now" is late Oct 2026.
const SPAN = 36;
const NOW = 33.9;
const YEARS = [2024, 2025, 2026];
const pct = (m: number) => `${(m / SPAN) * 100}%`;

const LANES = [
  [{ name: "Norton University", sub: "Software Development", when: "Jan 2024 – Present", from: 0, to: NOW, color: NORTON, live: true }],
  [{ name: "ACE", sub: "General English", when: "2024 – 2026", from: 0, to: 36, color: ACE }],
  [
    { name: "ETEC", sub: "Frontend", when: "Jan – Aug 2025", from: 12, to: 20, color: ETEC },
    { name: "ETEC", sub: "Backend", when: "Oct 2025 – Mar 2026", from: 21, to: 27, color: ETEC },
  ],
] as const;

/** Year ruler with one thin colour track per school or course, labelled directly above it. */
function StudyTimeline() {
  return (
    <div aria-hidden="true" className="mb-10">
      <div className="relative ml-1 mr-1">
        {/* Year ruler */}
        <div className="relative h-7 border-b border-line">
          {YEARS.map((y) => (
            <span key={y} className="absolute top-0 font-mono text-[12.5px] tabular-nums text-fg-muted" style={{ left: pct((y - 2024) * 12) }}>
              {y}
            </span>
          ))}
          <span className="absolute top-0 -translate-x-1/2 font-mono text-[12px] font-medium text-[#248a3d] dark:text-[#34C759]" style={{ left: pct(NOW) }}>
            Now
          </span>
        </div>
        {YEARS.slice(1).map((y) => (
          <span key={y} className="absolute bottom-0 top-7 w-px bg-line" style={{ left: pct((y - 2024) * 12) }} />
        ))}
        <span className="absolute bottom-0 top-7 w-px bg-[#34C759]/50" style={{ left: pct(NOW) }} />

        <div className="relative grid gap-6 pb-1 pt-5">
          {LANES.map((lane, li) => (
            <div key={li} className="relative h-[46px]">
              {lane.map((b, bi) => (
                <div
                  key={b.sub}
                  className="edu-track absolute inset-y-0"
                  style={{ left: pct(b.from), width: pct(b.to - b.from), "--c": b.color, "--i": li * 2 + bi } as CSSProperties}
                >
                  <p className="whitespace-nowrap text-[13.5px] leading-tight">
                    <span className="font-semibold text-fg">{b.name}</span>
                    <span className="text-fg-muted"> · {b.sub}</span>
                  </p>
                  <p className="mt-0.5 whitespace-nowrap font-mono text-[11.5px] tabular-nums text-fg-subtle">{b.when}</p>
                  <span className="edu-track-line absolute inset-x-0 bottom-0 h-[5px] rounded-full" />
                  <span className="absolute bottom-[-3.5px] left-0 h-3 w-3 rounded-full border-2 bg-surface-2" style={{ borderColor: b.color }} />
                  {"live" in b ? (
                    <span className="absolute bottom-[-3.5px] right-0 translate-x-1/2">
                      <span className="about-live-dot relative block h-3 w-3 rounded-full" style={{ background: NOW_GREEN }} />
                    </span>
                  ) : (
                    <span className="absolute bottom-[-3.5px] right-0 h-3 w-3 rounded-full" style={{ background: b.color }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Education: a colour-coded study timeline, then the degree and English programme first and the
 * ETEC courses after (with the frontend certificate). Cards share the timeline colours.
 */
export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className={SECTION}>
      <SectionHeader
        id="education-title"
        title="Education"
        lede="A software degree in progress, three years of English, and two hands-on ETEC courses."
      />

      <Reveal>
        <StudyTimeline />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Education first */}
        <div className="grid content-start gap-5">
          <Reveal className="slide-from-left">
            <article className="edu-card squircle [--r:24px] p-7" style={{ "--c": NORTON } as CSSProperties}>
              <div className="flex items-start gap-4">
                <OrgLogo org="norton" size={56} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.03em] text-fg">{DEGREE.title}</h3>
                  <p className="mt-1 text-[14.5px] text-fg-muted">{DEGREE.org} · Phnom Penh</p>
                </div>
                <span className="edu-pill inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 font-mono text-[12px] tabular-nums text-fg">
                  <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
                  {DEGREE.period}
                </span>
              </div>
              <dl className="mt-6 grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--line)] text-[13.5px]">
                <div className="bg-surface-1 px-4 py-3">
                  <dt className="flex items-center gap-1.5 text-fg-subtle">
                    <GraduationCap aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
                    Now in
                  </dt>
                  <dd className="mt-1 font-medium text-fg">{DEGREE.detail}</dd>
                </div>
                <div className="bg-surface-1 px-4 py-3">
                  <dt className="flex items-center gap-1.5 text-fg-subtle">
                    <BookOpen aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
                    This year
                  </dt>
                  <dd className="mt-1 font-medium text-fg">Software Security Technology · Business Intelligence</dd>
                </div>
              </dl>
            </article>
          </Reveal>

          <Reveal index={1} className="slide-from-left">
            <article className="edu-card squircle [--r:24px] flex items-center gap-4 px-7 py-6" style={{ "--c": ACE } as CSSProperties}>
              <OrgLogo org="ace" size={48} />
              <div className="min-w-0 flex-1">
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-fg">{ENGLISH.title}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-fg-muted">
                  <Languages aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-fg-subtle" />
                  {ENGLISH.org}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end">
                <span className="edu-pill inline-block rounded-full px-3 py-1 font-mono text-[12px] tabular-nums text-fg">{ENGLISH.period}</span>
                <p className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] text-fg-subtle">
                  <BadgeCheck aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5 text-[#34C759]" />
                  {ENGLISH.detail}
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Then the courses */}
        <Reveal index={2} className="slide-from-right">
          <article className="edu-card squircle [--r:24px] flex h-full flex-col p-7" style={{ "--c": ETEC } as CSSProperties}>
            <div className="flex items-center gap-3">
              <OrgLogo org="etec" size={44} />
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-fg">Courses</h3>
                <p className="text-[13px] text-fg-subtle">ETEC Center · Phnom Penh</p>
              </div>
            </div>

            <ol className="mt-5 grid gap-2.5">
              {CERTIFICATES.map((c) => (
                <li key={c.title} className="edu-course rounded-[14px] border border-line bg-surface-1 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[15px] font-medium text-fg">{c.title}</p>
                    <p className="shrink-0 font-mono text-[12px] tabular-nums text-fg-subtle">{c.date}</p>
                  </div>
                  <p className="mt-1 text-[13.5px] leading-[1.5] text-fg-muted">{c.topics}</p>
                </li>
              ))}
            </ol>

            <div className="mt-auto flex items-center gap-5 pt-5">
              <CertificateThumb
                src={certFrontend}
                width={1100}
                height={1597}
                size={76}
                tilt={-3}
                title="Certificate of Completion: Frontend Development"
                caption="ETEC Center · HTML, CSS, Bootstrap, JavaScript, ReactJS & project courses · Granted August 15, 2025"
              />
              <div>
                <p className="flex items-center gap-1.5 text-[14px] font-medium text-fg">
                  <BadgeCheck aria-hidden="true" strokeWidth={2} className="h-4 w-4 text-[#34C759]" />
                  Frontend certificate
                </p>
                <p className="mt-0.5 text-[12.5px] text-fg-subtle">Granted Aug 15, 2025 · click to view</p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
