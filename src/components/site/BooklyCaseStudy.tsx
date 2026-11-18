import { useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Cpu,
  FileText,
  Github,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Lock,
  Target,
  QrCode,
  Route,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import {
  SiCloudflare,
  SiGooglegemini,
  SiLaravel,
  SiPostgresql,
  SiReact,
  SiRender,
  SiResend,
  SiSupabase,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import Carousel from "@/components/ui/ReactBitsCarousel";
import CountUp from "@/components/ui/CountUp";
import { GlareHover } from "@/components/ui/GlareHover";
import type { CaseStudy, Project } from "@/content/portfolio";
import { ProjectCover } from "./ProjectCover";

/**
 * Bookly case study (inside the project dialog). Short, scannable blocks, each with its own
 * colour, in the order a recruiter reads: what it is, why, how I built it, what it does,
 * how it fits together, how it is kept safe, what went wrong, what I learned.
 */

type Icon = ComponentType<{ className?: string; style?: CSSProperties; strokeWidth?: number }>;

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";
const EASE = [0.23, 1, 0.32, 1] as const;

// One hue per block, so the long dialog has landmarks.
const HUE = {
  overview: "#6366f1",
  built: "#0ea5e9",
  features: "#f59e0b",
  architecture: "#10b981",
  engineering: "#8b5cf6",
  challenges: "#f43f5e",
  lessons: "#eab308",
} as const;

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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Tinted icon tile: the block's hue at low opacity behind a solid icon. */
function Tile({ icon: I, hue, size = 36 }: { icon: Icon; hue: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-[10px]"
      style={{
        width: size,
        height: size,
        background: `color-mix(in oklab, ${hue} 14%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${hue} 22%, transparent)`,
      }}
    >
      <I className="h-[18px] w-[18px]" style={{ color: hue }} strokeWidth={1.75} />
    </span>
  );
}

function Block({
  id,
  title,
  icon,
  hue,
  children,
}: {
  id: string;
  title: string;
  icon: Icon;
  hue: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="pt-2">
      <Rise className="flex items-center gap-3">
        <Tile icon={icon} hue={hue} />
        <h4
          id={id}
          className="text-[19px] font-semibold tracking-[-0.025em] text-fg sm:text-[21px]"
        >
          {title}
        </h4>
      </Rise>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* ---------------- 1. Hero ---------------- */

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
      className={`btn-apple ${primary ? "btn-apple-primary" : "btn-apple-secondary"} group/l inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-medium ${FOCUS}`}
    >
      {children}
    </a>
  );
}

function Hero({ project, cs }: { project: Project; cs: CaseStudy }) {
  const repos = project.repos ?? [{ label: "Source", url: project.githubUrl }];
  return (
    <div className="grid gap-6">
      <Rise>
        <GlareHover
          glareColor="#ffffff"
          glareOpacity={0.16}
          variant="sheen"
          borderRadius="20px"
          transitionDuration={900}
          width="100%"
          className="block w-full"
        >
          <div className="w-full overflow-hidden rounded-[20px] border border-[var(--edge)]">
            <ProjectCover project={project} hover={false} banner />
          </div>
        </GlareHover>
      </Rise>

      <Rise delay={0.05}>
        <p className="max-w-[40em] text-pretty text-[17px] leading-[1.55] text-fg">{cs.pitch}</p>
      </Rise>

      <Rise delay={0.1}>
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--edge)] sm:grid-cols-4">
          {cs.facts.map((f, i) => (
            <div
              key={f.label}
              className={`bg-surface-1/50 px-4 py-3.5 ${i % 2 === 0 ? "border-r" : "sm:border-r"} ${i < 2 ? "border-b sm:border-b-0" : ""} ${i === 3 ? "sm:border-r-0" : ""} border-[var(--edge)]`}
            >
              <dt className="text-[12px] text-fg-subtle">{f.label}</dt>
              <dd className="mt-1 text-[14.5px] font-medium text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Rise>

      <Rise delay={0.14}>
        <div className="flex flex-wrap gap-2">
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
      </Rise>
    </div>
  );
}

/* ---------------- 2. Overview ---------------- */

function Overview({ cs }: { cs: CaseStudy }) {
  const rows = [
    { k: "The problem", v: cs.problem, hue: "#f43f5e" },
    { k: "What I built", v: cs.solution, hue: "#10b981" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map((r, i) => (
        <Rise key={r.k} delay={i * 0.06}>
          <div
            className="h-full rounded-2xl border border-[var(--edge)] bg-surface-1/50 p-5"
            style={{ boxShadow: `inset 3px 0 0 ${r.hue}` }}
          >
            <p className="text-[12.5px] font-medium" style={{ color: r.hue }}>
              {r.k}
            </p>
            <p className="mt-1.5 text-pretty text-[15px] leading-[1.55] text-fg">{r.v}</p>
          </div>
        </Rise>
      ))}
    </div>
  );
}

/* ---------------- 3. How I built it ---------------- */

const STEP_HUES = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];

function Built({ cs }: { cs: CaseStudy }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      {/* the track that draws itself across the steps (desktop) */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[8%] right-[8%] top-[15px] hidden h-[2px] origin-left rounded-full md:block"
        style={{ background: `linear-gradient(90deg, ${STEP_HUES.join(",")})`, opacity: 0.5 }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <ol className="relative grid gap-4 md:grid-cols-6 md:gap-2">
        {cs.steps.map((s, i) => (
          <motion.li
            key={s.title}
            className="flex items-center gap-3 md:flex-col md:items-center md:text-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease: EASE }}
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[12.5px] font-semibold text-white shadow-[0_6px_14px_-6px_rgba(0,0,0,0.5)]"
              style={{ background: STEP_HUES[i % STEP_HUES.length] }}
            >
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold text-fg md:mt-2.5">{s.title}</span>
              <span className="block text-[12.5px] leading-[1.45] text-fg-muted">{s.text}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------- 4. Features: topic list + React Bits Carousel ---------------- */

const SLIDE_HUES = ["#6366f1", "#0ea5e9", "#f59e0b", "#ec4899", "#10b981", "#8b5cf6", "#f43f5e"];

/** One slide: a real screenshot, framed as a browser window or a phone. */
function Slide({ f }: { f: CaseStudy["features"][number] }) {
  return (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(90%_90%_at_30%_10%,#2a3bb8,#0b1147)] p-[5%]">
      {f.phone ? (
        <img
          src={f.image}
          alt={f.alt}
          draggable={false}
          decoding="async"
          className="h-full w-auto rounded-[16px] border-[3px] border-[#0b0f2e] object-cover object-top shadow-[0_24px_48px_-18px_rgba(0,0,0,0.7)]"
        />
      ) : (
        <div className="w-full overflow-hidden rounded-[10px] bg-white shadow-[0_24px_48px_-18px_rgba(0,0,0,0.7)]">
          <div className="flex h-5 items-center gap-1 border-b border-black/5 bg-[#f4f4f6] px-2">
            {[0, 1, 2].map((k) => (
              <span key={k} aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-black/15" />
            ))}
            <span className="mx-auto flex items-center gap-1 font-mono text-[8px] text-black/45">
              <Lock aria-hidden="true" className="h-2 w-2" strokeWidth={2} />
              bookly.site
            </span>
          </div>
          <img
            src={f.image}
            alt={f.alt}
            draggable={false}
            decoding="async"
            className="block w-full"
          />
        </div>
      )}
    </div>
  );
}

function Features({ cs }: { cs: CaseStudy }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  return (
    <Rise>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center">
        <ol className="hidden gap-1 lg:grid" aria-label="Screens in the slideshow">
          {cs.features.map((x, i) => {
            const on = i === active;
            const hue = SLIDE_HUES[i % SLIDE_HUES.length]!;
            return (
              <li
                key={x.title}
                aria-current={on ? "true" : undefined}
                className="relative flex items-center gap-2.5 rounded-xl px-3 py-2"
              >
                {on ? (
                  <motion.span
                    layoutId="bookly-slide-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl border border-[var(--edge)] bg-surface-1 shadow-[var(--elev-1)]"
                    transition={
                      reduce ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.15 }
                    }
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="relative h-2 w-2 shrink-0 rounded-full transition-transform duration-200"
                  style={{
                    background: hue,
                    transform: on ? "scale(1.35)" : "scale(1)",
                    opacity: on ? 1 : 0.55,
                  }}
                />
                <span
                  className={`relative text-[14px] transition-colors duration-200 ${on ? "font-semibold text-fg" : "text-fg-muted"}`}
                >
                  {x.title}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="text-center text-[14px] font-semibold text-fg lg:hidden" aria-live="polite">
          {cs.features[active]?.title}
        </p>
        <div className="min-w-0 overflow-hidden rounded-[20px]">
          <Carousel
            items={cs.features.map((f) => (
              <Slide key={f.title} f={f} />
            ))}
            baseWidth="100%"
            aspectRatio={16 / 10}
            peek={0}
            gap={12}
            radius={20}
            effect="slide"
            indicator="bars"
            arrows
            autoplay={!reduce}
            autoplayDelay={3200}
            pauseOnHover
            loop
            draggable
            theme="dark"
            frame={false}
            style={
              {
                "--carousel-tile-edge": "transparent",
                "--carousel-tile-highlight": "transparent",
                "--carousel-tile-shadow": "none",
              } as CSSProperties
            }
            onChange={setActive}
          />
        </div>
      </div>
    </Rise>
  );
}

/* ---------------- 5. Architecture: three lanes + services ---------------- */

type Node = { name: string; note: string; icon: Icon; color: string };

const LANES: { title: string; host: string; hostIcon: Icon; hue: string; nodes: Node[] }[] = [
  {
    title: "Frontend",
    host: "Vercel",
    hostIcon: SiVercel,
    hue: "#0ea5e9",
    nodes: [
      { name: "React", note: "Storefront + admin", icon: SiReact, color: "#58c4dc" },
      { name: "TypeScript", note: "Typed API client", icon: SiTypescript, color: "#3178c6" },
      { name: "Tailwind", note: "Design system", icon: SiTailwindcss, color: "#38bdf8" },
    ],
  },
  {
    title: "Backend",
    host: "Render",
    hostIcon: SiRender,
    hue: "#f43f5e",
    nodes: [
      { name: "Laravel API", note: "REST /api/v1", icon: SiLaravel, color: "#ff2d20" },
      { name: "Auth", note: "Sanctum · OTP · 2FA", icon: Lock, color: "#f59e0b" },
      { name: "Jobs", note: "Emails, payments", icon: Cpu, color: "#8b5cf6" },
    ],
  },
  {
    title: "Data",
    host: "Supabase",
    hostIcon: SiSupabase,
    hue: "#10b981",
    nodes: [
      { name: "PostgreSQL", note: "Books, orders, users", icon: SiPostgresql, color: "#4f8cc9" },
      { name: "pgvector", note: "Similar books", icon: Layers, color: "#10b981" },
    ],
  },
];

const SERVICES: Node[] = [
  { name: "Bakong KHQR", note: "Payments", icon: QrCode, color: "#e11d48" },
  { name: "Resend", note: "Email", icon: SiResend, color: "currentColor" },
  { name: "Telegram", note: "Order updates", icon: SiTelegram, color: "#26a5e4" },
  { name: "Gemini", note: "Embeddings", icon: SiGooglegemini, color: "#8e75ff" },
  { name: "Turnstile", note: "Bot check", icon: SiCloudflare, color: "#f38020" },
];

function Connector() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center md:h-full">
      <span className="block h-6 w-px border-l border-dashed border-[var(--line-strong)] md:h-px md:w-full md:border-l-0 md:border-t" />
      {reduce ? null : (
        <motion.span
          className="absolute h-1.5 w-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"
          animate={{ x: ["-120%", "120%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
        />
      )}
    </div>
  );
}

function Lane({ lane }: { lane: (typeof LANES)[number] }) {
  const H = lane.hostIcon;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--edge)] bg-surface-2 shadow-[var(--elev-1)]">
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{ background: `color-mix(in oklab, ${lane.hue} 12%, transparent)` }}
      >
        <span className="text-[13px] font-semibold" style={{ color: lane.hue }}>
          {lane.title}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg-muted">
          <H aria-hidden="true" className="h-3 w-3" />
          {lane.host}
        </span>
      </div>
      <ul className="grid gap-1 p-2">
        {lane.nodes.map((n) => {
          const I = n.icon;
          return (
            <li key={n.name} className="flex items-center gap-2.5 rounded-xl px-2 py-1.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-1">
                <I
                  aria-hidden="true"
                  className="h-4 w-4"
                  style={{ color: n.color }}
                  strokeWidth={1.75}
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-medium leading-tight text-fg">
                  {n.name}
                </span>
                <span className="block text-[11.5px] text-fg-subtle">{n.note}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Architecture() {
  return (
    <Rise>
      <figure
        className="rounded-[22px] border border-[var(--edge)] p-3 sm:p-5"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, #10b981 7%, transparent), transparent 60%), var(--surface-1)",
        }}
      >
        <div className="grid items-stretch gap-0 md:grid-cols-[1fr_36px_1fr_36px_1fr]">
          <Lane lane={LANES[0]!} />
          <Connector />
          <Lane lane={LANES[1]!} />
          <Connector />
          <Lane lane={LANES[2]!} />
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-[var(--line-strong)] p-3">
          <p className="px-1 text-[12px] text-fg-subtle">The API also talks to</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {SERVICES.map((s) => {
              const I = s.icon;
              return (
                <li
                  key={s.name}
                  className="inline-flex h-8 items-center gap-2 rounded-full border border-[var(--edge)] bg-surface-2 pl-2 pr-3 text-[12.5px]"
                >
                  <I
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    style={{ color: s.color }}
                    strokeWidth={1.75}
                  />
                  <span className="font-medium text-fg">{s.name}</span>
                  <span className="text-fg-subtle">{s.note}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <figcaption className="sr-only">
          React app on Vercel calls the Laravel API on Render, which stores data in PostgreSQL on
          Supabase. The API also uses Bakong KHQR, Resend, Telegram, Gemini and Turnstile.
        </figcaption>
      </figure>
    </Rise>
  );
}

/* ---------------- 6. Engineering ---------------- */

const STAT_HUES = ["#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b"];

function Engineering({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid gap-4">
      <Rise>
        <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {cs.stats.map((s, i) => (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-2xl border border-[var(--edge)] bg-surface-2 p-4 shadow-[var(--elev-1)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: STAT_HUES[i] }}
              />
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
      <Rise delay={0.08}>
        <ul className="flex flex-wrap gap-1.5" aria-label="Security and quality">
          {cs.practices.map((p) => (
            <li
              key={p}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--edge)] bg-surface-1/60 px-3 text-[12.5px] text-fg"
            >
              <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#10b981]" strokeWidth={2.25} />
              {p}
            </li>
          ))}
        </ul>
      </Rise>
    </div>
  );
}

/* ---------------- 7. Challenges ---------------- */

function Challenges({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid gap-2.5 md:grid-cols-3">
      {cs.challenges.map((c, i) => (
        <Rise key={c.title} delay={i * 0.06}>
          <article className="flex h-full flex-col rounded-2xl border border-[var(--edge)] bg-surface-2 p-4 shadow-[var(--elev-1)]">
            <h5 className="text-[14.5px] font-semibold leading-snug text-fg">{c.title}</h5>
            <p className="mt-2 flex-1 text-[13.5px] leading-[1.5] text-fg-muted">{c.fix}</p>
            <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#10b981]/12 px-2.5 py-1 text-[12px] font-medium text-[#0f9b6e] dark:text-[#34d399]">
              <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.25} />
              {c.result}
            </p>
          </article>
        </Rise>
      ))}
    </div>
  );
}

/* ---------------- 8. Lessons + next ---------------- */

function Lessons({ cs }: { cs: CaseStudy }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2.5 md:grid-cols-3">
        {cs.lessons.map((l, i) => (
          <Rise key={l} delay={i * 0.06}>
            <blockquote className="relative h-full rounded-2xl border border-[var(--edge)] bg-surface-1/50 p-4 pt-7">
              <span
                aria-hidden="true"
                className="absolute left-4 top-1 font-serif text-[34px] leading-none text-[#eab308]"
              >
                “
              </span>
              <p className="text-[14.5px] leading-[1.5] text-fg">{l}</p>
            </blockquote>
          </Rise>
        ))}
      </div>
      <Rise delay={0.1}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[12.5px] text-fg-subtle">Up next</span>
          {cs.next.map((n) => (
            <span
              key={n}
              className="inline-flex h-8 items-center rounded-full border border-dashed border-[var(--line-strong)] px-3 text-[12.5px] text-fg-muted"
            >
              {n}
            </span>
          ))}
        </div>
      </Rise>
    </div>
  );
}

export function BooklyCaseStudy({ project, header }: { project: Project; header: ReactNode }) {
  const cs = project.caseStudy!;
  return (
    <div className="grid gap-12">
      <div className="grid gap-6">
        {header}
        <Hero project={project} cs={cs} />
      </div>
      <Block id="cs-overview" title="Why I built it" icon={Target} hue={HUE.overview}>
        <Overview cs={cs} />
      </Block>
      <Block id="cs-built" title="How I built it" icon={Route} hue={HUE.built}>
        <Built cs={cs} />
      </Block>
      <Block id="cs-features" title="What it does" icon={Sparkles} hue={HUE.features}>
        <Features cs={cs} />
      </Block>
      <Block
        id="cs-architecture"
        title="How it fits together"
        icon={Workflow}
        hue={HUE.architecture}
      >
        <Architecture />
      </Block>
      <Block id="cs-engineering" title="Built to last" icon={Lock} hue={HUE.engineering}>
        <Engineering cs={cs} />
      </Block>
      <Block id="cs-challenges" title="What went wrong" icon={Wrench} hue={HUE.challenges}>
        <Challenges cs={cs} />
      </Block>
      <Block id="cs-results" title="What I learned" icon={Lightbulb} hue={HUE.lessons}>
        <Lessons cs={cs} />
      </Block>
    </div>
  );
}
