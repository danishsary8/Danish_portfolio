import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, FileText, Github } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import type { CaseStudy, Project } from "@/content/portfolio";
import { ProjectCover } from "./ProjectCover";
import { SkillIcon, hasSkillIcon, themedSkillColor } from "./SkillIcon";

/**
 * Bookly case study, inside the project dialog. Nine short sections in the order a recruiter
 * reads: what it is, links, overview, how I built it, features, architecture, engineering,
 * challenges, results and lessons. Each block rises in as it scrolls into the dialog.
 */

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";
const EASE = [0.23, 1, 0.32, 1] as const;

function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(4px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-[var(--edge)] pt-8">
      <Rise>
        <h4 id={id} className="text-[20px] font-semibold tracking-[-0.03em] text-fg sm:text-[22px]">
          {title}
        </h4>
      </Rise>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function LinkKey({
  href,
  label,
  children,
  primary,
}: {
  href: string;
  label: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`btn-apple ${primary ? "btn-apple-primary" : "btn-apple-secondary"} group/l inline-flex h-11 items-center gap-2 rounded-full px-4 text-[13.5px] font-medium sm:h-10 ${FOCUS}`}
    >
      {children}
    </a>
  );
}

function Links({ project }: { project: Project }) {
  const repos = project.repos ?? [{ label: "Source", url: project.githubUrl }];
  return (
    <div className="flex flex-wrap gap-2.5">
      <LinkKey href={project.liveUrl} label={`Open the live ${project.title} site`} primary>
        Live site
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover/l:-translate-y-px group-hover/l:translate-x-px"
        />
      </LinkKey>
      {repos.map((r, i) => (
        <LinkKey
          key={r.url}
          href={r.url}
          label={
            i === 0
              ? `${project.title} source on GitHub`
              : `${project.title} ${r.label} source on GitHub`
          }
        >
          <Github aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          {r.label}
        </LinkKey>
      ))}
      {project.apiDocsUrl ? (
        <LinkKey href={project.apiDocsUrl} label={`${project.title} API documentation`}>
          <FileText aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          API docs
        </LinkKey>
      ) : null}
    </div>
  );
}

function Overview({ cs }: { cs: CaseStudy }) {
  return (
    <dl className="grid overflow-hidden rounded-2xl border border-[var(--edge)] sm:grid-cols-2">
      {cs.overview.map((o, i) => (
        <Rise
          key={o.label}
          delay={i * 0.06}
          className={`bg-surface-1/50 p-4 sm:p-5 ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "border-b" : i === 2 ? "border-b sm:border-b-0" : ""} border-[var(--edge)]`}
        >
          <dt className="text-[12.5px] font-medium text-fg-subtle">{o.label}</dt>
          <dd className="mt-1.5 text-pretty text-[14.5px] leading-[1.6] text-fg">{o.text}</dd>
        </Rise>
      ))}
    </dl>
  );
}

/** "How I built it": a connected track that draws itself in, one stop per step. */
function Workflow({ cs }: { cs: CaseStudy }) {
  const reduce = useReducedMotion();
  return (
    <ol className="relative grid gap-x-4 gap-y-5 sm:grid-cols-3">
      {cs.steps.map((s, i) => (
        <motion.li
          key={s.title}
          className="relative flex gap-3"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.5,
            delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.05,
            ease: EASE,
          }}
        >
          <span className="tactile squircle [--r:10px] grid h-8 w-8 shrink-0 place-items-center bg-surface-2 font-mono text-[12px] font-medium tabular-nums text-fg">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="text-[14.5px] font-semibold text-fg">{s.title}</p>
            <p className="mt-0.5 text-[13.5px] leading-[1.55] text-fg-muted">{s.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

function Features({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cs.features.map((f, i) => (
        <Rise key={f.title} delay={(i % 2) * 0.08}>
          <article className="group/f tactile squircle [--r:18px] h-full overflow-hidden bg-surface-2">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--edge)] bg-surface-1">
              {f.phone ? (
                <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(80%_80%_at_50%_30%,#2a3bb8,#0b1147)]">
                  <img
                    src={f.image}
                    alt={f.alt}
                    loading="lazy"
                    decoding="async"
                    className="mt-[18%] w-[34%] rounded-[12px] border-[3px] border-[#0b0f2e] shadow-[0_20px_36px_-14px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[var(--ease-out)] motion-safe:group-hover/f:-translate-y-2"
                  />
                </div>
              ) : (
                <img
                  src={f.image}
                  alt={f.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] motion-safe:group-hover/f:scale-[1.03]"
                />
              )}
            </div>
            <div className="p-4 sm:p-5">
              <h5 className="text-[15.5px] font-semibold tracking-[-0.01em] text-fg">{f.title}</h5>
              <p className="mt-1 text-[13.5px] leading-[1.55] text-fg-muted">{f.text}</p>
            </div>
          </article>
        </Rise>
      ))}
    </div>
  );
}

function Architecture({ cs }: { cs: CaseStudy }) {
  const { flow, services } = cs.architecture;
  return (
    <Rise>
      <figure className="tactile squircle [--r:20px] bg-surface-1/60 p-4 sm:p-6">
        <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {flow.map((n, i) => (
            <li key={n.name} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
              <div className="w-full rounded-xl border border-[var(--edge)] bg-surface-2 px-3 py-3 text-center shadow-[var(--elev-1)]">
                <p className="text-[14px] font-semibold text-fg">{n.name}</p>
                <p className="text-[12px] text-fg-muted">{n.role}</p>
                <p className="mt-1.5 font-mono text-[11px] text-fg-subtle">{n.host}</p>
              </div>
              {i < flow.length - 1 ? (
                <>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="hidden h-4 w-4 shrink-0 text-fg-subtle md:block"
                  />
                  <ArrowDown
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="h-4 w-4 shrink-0 text-fg-subtle md:hidden"
                  />
                </>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="mt-4 border-t border-dashed border-[var(--line-strong)] pt-4">
          <p className="text-center text-[12px] text-fg-subtle">The API also talks to</p>
          <ul className="mt-2.5 flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <li
                key={s.name}
                className="icon-tile-light squircle [--r:8px] inline-flex h-8 items-center gap-1.5 px-3 text-[12.5px]"
              >
                <span className="font-medium text-fg">{s.name}</span>
                <span className="text-fg-subtle">· {s.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="sr-only">
          Browser to React app on Vercel, to Laravel API on Render, to PostgreSQL on Supabase. The
          API also uses {services.map((s) => s.name).join(", ")}.
        </figcaption>
      </figure>
    </Rise>
  );
}

function Engineering({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <Rise>
        <dl className="grid grid-cols-2 gap-2.5">
          {cs.stats.map((s) => (
            <div key={s.label} className="tactile squircle [--r:16px] bg-surface-2 p-4">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-[28px] font-semibold leading-none tracking-[-0.04em] text-fg tabular-nums">
                  <CountUp to={s.value} separator="," suffix={s.suffix ?? ""} duration={1.6} />
                </span>
                <span aria-hidden="true" className="mt-2 block text-[12.5px] text-fg-muted">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Rise>
      <ul className="grid content-start gap-2.5">
        {cs.engineering.map((e, i) => (
          <Rise key={e} delay={i * 0.05}>
            <li className="flex gap-2.5 text-[14px] leading-[1.55] text-fg">
              <span
                aria-hidden="true"
                className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-fg-subtle"
              />
              {e}
            </li>
          </Rise>
        ))}
      </ul>
    </div>
  );
}

function Challenges({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid gap-3">
      {cs.challenges.map((c, i) => (
        <Rise key={c.title} delay={i * 0.06}>
          <article className="tactile squircle [--r:18px] bg-surface-2 p-4 sm:p-5">
            <h5 className="text-[15.5px] font-semibold text-fg">{c.title}</h5>
            <dl className="mt-3 grid gap-3 text-[13.5px] leading-[1.55] sm:grid-cols-3">
              {[
                ["Problem", c.problem],
                ["What I did", c.fix],
                ["Result", c.result],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[12px] font-medium text-fg-subtle">{k}</dt>
                  <dd className="mt-1 text-fg-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Rise>
      ))}
    </div>
  );
}

function Results({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Rise>
        <h5 className="text-[13px] font-medium text-fg-subtle">Where it is today</h5>
        <ul className="mt-2.5 grid gap-2">
          {cs.results.map((r) => (
            <li key={r} className="flex gap-2.5 text-[14px] leading-[1.55] text-fg">
              <span
                aria-hidden="true"
                className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
              />
              {r}
            </li>
          ))}
        </ul>
        <h5 className="mt-6 text-[13px] font-medium text-fg-subtle">Next</h5>
        <ul className="mt-2.5 grid gap-2">
          {cs.next.map((n) => (
            <li key={n} className="flex gap-2.5 text-[14px] leading-[1.55] text-fg-muted">
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="mt-[3px] h-4 w-4 shrink-0 text-fg-subtle"
              />
              {n}
            </li>
          ))}
        </ul>
      </Rise>
      <Rise delay={0.08}>
        <h5 className="text-[13px] font-medium text-fg-subtle">What I learned</h5>
        <ul className="mt-2.5 grid gap-2.5">
          {cs.lessons.map((l) => (
            <li
              key={l}
              className="rounded-xl border border-[var(--edge)] bg-surface-1/60 p-3.5 text-[14px] leading-[1.6] text-fg"
            >
              {l}
            </li>
          ))}
        </ul>
      </Rise>
    </div>
  );
}

export function BooklyCaseStudy({ project, header }: { project: Project; header: ReactNode }) {
  const cs = project.caseStudy!;
  return (
    <div className="grid gap-8">
      {/* 1. Hero */}
      <div className="grid gap-5">
        {header}
        <Rise>
          <div className="overflow-hidden rounded-[20px] border border-[var(--edge)]">
            <ProjectCover project={project} hover={false} />
          </div>
        </Rise>
        <Rise delay={0.05}>
          <p className="text-pretty text-[16px] leading-[1.65] text-fg">{cs.pitch}</p>
        </Rise>
        <Rise delay={0.1}>
          <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
            {project.stack.map((s) => (
              <li
                key={s}
                className="icon-tile-light squircle [--r:8px] inline-flex h-7 items-center gap-1.5 px-2.5 text-[12.5px] text-fg-muted"
              >
                {hasSkillIcon(s) ? (
                  <SkillIcon
                    name={s}
                    className="h-3.5 w-3.5"
                    style={{ color: themedSkillColor(s) }}
                  />
                ) : null}
                {s}
              </li>
            ))}
          </ul>
        </Rise>
        {/* 2. Links */}
        <Rise delay={0.14}>
          <Links project={project} />
        </Rise>
      </div>

      <Section id="cs-overview" title="Overview">
        <Overview cs={cs} />
      </Section>
      <Section id="cs-built" title="How I built it">
        <Workflow cs={cs} />
      </Section>
      <Section id="cs-features" title="Key features">
        <Features cs={cs} />
      </Section>
      <Section id="cs-architecture" title="Architecture">
        <Architecture cs={cs} />
      </Section>
      <Section id="cs-engineering" title="Engineering">
        <Engineering cs={cs} />
      </Section>
      <Section id="cs-challenges" title="Challenges">
        <Challenges cs={cs} />
      </Section>
      <Section id="cs-results" title="Results and lessons">
        <Results cs={cs} />
      </Section>
    </div>
  );
}
