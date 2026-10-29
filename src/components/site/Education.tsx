import type { CSSProperties } from "react";
import { BadgeCheck, BookOpen, GraduationCap, Languages } from "lucide-react";
import { CERTIFICATES, EDUCATION } from "@/content/portfolio";
import { OrgLogo } from "./OrgLogo";
import { CertificateThumb } from "./CertificateThumb";
import certFrontend from "@/assets/certificates/etec-frontend.webp";
import { Reveal, SECTION, SectionHeader } from "./Reveal";

const [DEGREE, ENGLISH] = EDUCATION;


// Study path at a glance, in the same strip style as Experience. Each school has its own colour.
const MILESTONES = [
  { at: 0, date: "2023", label: "ACE · English begins", color: "#2563EB" },
  { at: 26, date: "Jan 2024", label: "Norton University · Degree begins", color: "#B4233C" },
  { at: 52, date: "Jan 2025", label: "ETEC · Frontend course", color: "#7C3AED" },
  { at: 74, date: "Nov 2025", label: "ETEC · Backend course", color: "#7C3AED" },
  { at: 100, date: "Now", label: "Fourth year at Norton", color: "#34C759", live: true },
] as const;

function StudyTimeline() {
  return (
    <div aria-hidden="true" className="exp-timeline relative mx-2 mb-10 mt-1 h-[54px]">
      <span className="absolute inset-x-0 top-[7px] h-px bg-line-strong" />
      <span className="exp-timeline-fill absolute inset-x-0 top-[7px] h-px bg-fg" />
      {MILESTONES.map((m, i) => (
        <div
          key={m.date}
          className="exp-milestone absolute top-0 flex flex-col"
          style={
            {
              left: `${m.at}%`,
              "--i": i,
              transform: m.at === 100 ? "translateX(-100%)" : m.at === 0 ? "none" : "translateX(-50%)",
              alignItems: m.at === 100 ? "flex-end" : m.at === 0 ? "flex-start" : "center",
            } as CSSProperties
          }
        >
          <span
            className={`relative block h-[15px] w-[15px] rounded-full shadow-[0_0_0_4px_var(--bg)] ${"live" in m ? "about-live-dot" : ""}`}
            style={{ background: m.color }}
          />
          <span className="mt-2 font-mono text-[12px] tabular-nums text-fg">{m.date}</span>
          <span className="whitespace-nowrap text-[12px] text-fg-subtle">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Education: a study chart (2023–2026) on top, then the degree and English programme first,
 * and the ETEC courses after, with the frontend course certificate.
 */
export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className={SECTION}>
      <SectionHeader
        id="education-title"
        title="Education"
        lede="A software degree in progress, four years of English, and two hands-on ETEC courses."
      />

      <Reveal>
        <StudyTimeline />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* Education first */}
        <div className="grid gap-4">
          <Reveal className="slide-from-left">
            <article className="tactile squircle [--r:24px] bg-surface-2 p-7">
              <div className="flex items-start gap-4">
                <OrgLogo org="norton" size={56} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.03em] text-fg">{DEGREE.title}</h3>
                  <p className="mt-1 text-[14.5px] text-fg-muted">{DEGREE.org} · Phnom Penh</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-[12px] tabular-nums text-fg">
                  <span aria-hidden="true" className="about-live-dot relative h-2 w-2 rounded-full bg-[#34C759]" />
                  {DEGREE.period}
                </span>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-line bg-[var(--line)] text-[13.5px]">
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
                  <dd className="mt-1 font-medium text-fg">Software Security Technology, Business Intelligence</dd>
                </div>
              </dl>
            </article>
          </Reveal>

          <Reveal index={1} className="slide-from-left">
            <article className="tactile squircle [--r:24px] flex items-center gap-4 bg-surface-2 px-7 py-5">
              <OrgLogo org="ace" size={44} />
              <div className="min-w-0 flex-1">
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">{ENGLISH.title}</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-fg-muted">
                  <Languages aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-fg-subtle" />
                  {ENGLISH.org}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-[12.5px] tabular-nums text-fg">{ENGLISH.period}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[12.5px] text-fg-subtle">
                  <BadgeCheck aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5 text-[#34C759]" />
                  {ENGLISH.detail}
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Then the courses */}
        <Reveal index={2} className="slide-from-right">
          <article className="tactile squircle [--r:24px] flex h-full flex-col bg-surface-2 p-7">
            <div className="flex items-center gap-3">
              <OrgLogo org="etec" size={40} />
              <div>
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">Courses</h3>
                <p className="text-[13px] text-fg-subtle">ETEC Center · Phnom Penh</p>
              </div>
            </div>

            <ol className="relative mt-6 grid gap-5">
              <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-line-strong" />
              {CERTIFICATES.map((c) => (
                <li key={c.title} className="relative flex gap-4">
                  <span aria-hidden="true" className="mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-fg bg-surface-2" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <p className="text-[15.5px] font-medium text-fg">{c.title}</p>
                      <p className="font-mono text-[12px] tabular-nums text-fg-subtle">{c.date}</p>
                    </div>
                    <p className="mt-1 text-[14px] leading-[1.55] text-fg-muted">{c.topics}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-auto flex items-center gap-5 border-t border-line pt-5">
              <CertificateThumb
                src={certFrontend}
                width={1100}
                height={1597}
                size={84}
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
