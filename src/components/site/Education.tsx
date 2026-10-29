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
const BACKEND = "#EA580C";
const NOW_GREEN = "#34C759";

// Timeline: months from Jan 2024 (0) to Jan 2027 (36). "Now" is late Oct 2026.
const SPAN = 36;
const NOW = 33.9;
const YEARS = [2024, 2025, 2026];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Every month gets a tick; Apr, Jul and Oct get a small label (skipped where "Now" sits).
const MONTH_TICKS = Array.from({ length: SPAN }, (_, m) => ({
  m,
  label: m % 3 === 0 && m % 12 !== 0 && Math.abs(m - NOW) > 1.5 ? MONTHS[m % 12] : "",
}));
const pct = (m: number) => `${(m / SPAN) * 100}%`;

const LANES = [
  [{ name: "Norton University", sub: "Software Development", when: "Jan 2024 – Present", from: 0, to: NOW, color: NORTON, live: true }],
  [{ name: "ACE", sub: "General English", when: "2024 – Present", from: 0, to: NOW, color: ACE, live: true }],
  [
    { name: "ETEC", sub: "Frontend course", when: "Jan – Aug 2025", from: 12, to: 20, color: ETEC, course: true },
    { name: "ETEC", sub: "Backend course", when: "Oct 2025 – Mar 2026", from: 21, to: 27, color: BACKEND, course: true },
  ],
] as const;

/** Year ruler with one thin colour track per school or course, labelled directly above it. */
function StudyTimeline() {
  return (
    <div aria-hidden="true" className="edu-card squircle [--r:24px] px-8 pb-7 pt-6" style={{ "--c": "var(--fg-subtle)" } as CSSProperties}>
      <p className="mb-4 text-[15px] font-semibold tracking-[-0.01em] text-fg">My learning journey</p>
      <div className="relative">
        {/* Ruler: years, then quarter months, with a tick for every month */}
        <div className="relative h-11 border-b border-line">
          {YEARS.map((y) => (
            <span key={y} className="absolute top-0 font-mono text-[12.5px] font-medium tabular-nums text-fg" style={{ left: pct((y - 2024) * 12) }}>
              {y}
            </span>
          ))}
          {MONTH_TICKS.map(({ m, label }) =>
            label ? (
              <span key={m} className="absolute top-[19px] -translate-x-1/2 font-mono text-[10.5px] text-fg-subtle" style={{ left: pct(m) }}>
                {label}
              </span>
            ) : null,
          )}
          {MONTH_TICKS.map(({ m, label }) => (
            <span
              key={`t${m}`}
              className={`absolute bottom-0 w-px ${m % 12 === 0 ? "h-3 bg-line-strong" : label ? "h-2 bg-line-strong" : "h-1 bg-line"}`}
              style={{ left: pct(m) }}
            />
          ))}
          <span className="absolute top-0 -translate-x-1/2 rounded-full bg-[#34C759]/12 px-1.5 font-mono text-[11.5px] font-medium text-[#248a3d] dark:text-[#34C759]" style={{ left: pct(NOW) }}>
            Now
          </span>
        </div>
        {YEARS.slice(1).map((y) => (
          <span key={y} className="absolute bottom-0 top-11 w-px bg-line" style={{ left: pct((y - 2024) * 12) }} />
        ))}
        <span className="absolute bottom-0 top-11 w-px bg-[#34C759]/50" style={{ left: pct(NOW) }} />

        <div className="relative grid gap-5 pb-2 pt-5">
          {LANES.map((lane, li) => (
            <div key={li} className="relative h-[44px]">
              {lane.map((b, bi) => (
                <div
                  key={b.sub}
                  className="edu-track absolute inset-y-0"
                  style={{ left: pct(b.from), width: pct(b.to - b.from), "--c": b.color, "--i": li * 2 + bi } as CSSProperties}
                >
                  <p className="whitespace-nowrap text-[13.5px] leading-tight">
                    <span className="font-semibold text-fg">{b.name}</span>
                    {"course" in b ? (
                      <span className="font-semibold" style={{ color: b.color }}> · {b.sub}</span>
                    ) : (
                      <span className="text-fg-muted"> · {b.sub}</span>
                    )}
                  </p>
                  <p className="mt-0.5 whitespace-nowrap font-mono text-[11.5px] tabular-nums text-fg-subtle">{b.when}</p>
                  <span className="edu-track-line absolute inset-x-0 bottom-[1px] h-[4px] rounded-full" />
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

      <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Education first */}
        <div className="grid grid-rows-[auto_1fr] gap-5">
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

          <Reveal index={1} className="slide-from-left h-full">
            <article className="edu-card squircle [--r:24px] flex h-full items-center gap-4 px-7 py-6" style={{ "--c": ACE } as CSSProperties}>
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

            <ol className="mb-2.5 mt-5 grid gap-2.5">
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

            <div className="edu-course mt-auto flex items-center gap-5 rounded-[14px] border border-line bg-surface-1 px-4 py-3">
              <CertificateThumb
                src={certFrontend}
                width={1100}
                height={1597}
                size={56}
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

      <Reveal className="mt-5">
        <StudyTimeline />
      </Reveal>
    </section>
  );
}
