import { useEffect, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Check,
  Cpu,
  FileText,
  Github,
  Layers,
  LayoutDashboard,
  Rocket,
  Lock,
  Target,
  QrCode,
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
          {project.demoUrl ? (
            <LinkKey href={project.demoUrl} label={`Open the ${project.title} demo site`}>
              Demo site
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
            </LinkKey>
          ) : null}
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

/* ---------------- 4. Features: one synced showcase (laptop + iPhone) ---------------- */

type Screen = CaseStudy["screens"][number];
const SLIDE_MS = 4000;

/** Browser window frame around a desktop screenshot. */
function Browser({ children }: { children: ReactNode }) {
  return (
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
      <div className="relative aspect-[1440/900] overflow-hidden bg-white">{children}</div>
    </div>
  );
}

/**
 * iPhone 15 Pro Max shell (430×932 screen): titanium band, black bezel, Dynamic Island, side buttons.
 */
function IPhone({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[224px]">
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[18%] h-[5%] w-[3px] rounded-l bg-[#6b6862]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[26%] h-[9%] w-[3px] rounded-l bg-[#6b6862]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[37%] h-[9%] w-[3px] rounded-l bg-[#6b6862]"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-[30%] h-[13%] w-[3px] rounded-r bg-[#6b6862]"
      />
      <div className="rounded-[44px] bg-[linear-gradient(145deg,#8d8a83,#4a4843_40%,#7b7872_70%,#3d3b37)] p-[3px] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)]">
        <div className="rounded-[41px] bg-black p-[7px]">
          <div className="relative overflow-hidden rounded-[34px] bg-white [aspect-ratio:430/932]">
            {/* status bar: the app starts below it, so the Dynamic Island never covers the page */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-30 flex h-[6.2%] items-center justify-between bg-white px-[9%] text-[9px] font-semibold text-[#111]"
            >
              <span className="tabular-nums">9:41</span>
              <span className="flex items-center gap-[3px]">
                <span className="flex items-end gap-[1.5px]">
                  {[3, 4.5, 6, 7.5].map((h) => (
                    <span
                      key={h}
                      className="w-[2px] rounded-[1px] bg-[#111]"
                      style={{ height: h }}
                    />
                  ))}
                </span>
                <span className="ml-[3px] h-[7px] w-[14px] rounded-[2.5px] border border-[#111]/60 p-[1px]">
                  <span className="block h-full w-[75%] rounded-[1px] bg-[#111]" />
                </span>
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 top-[6.2%] overflow-hidden">{children}</div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[1.4%] z-40 h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Slides an image in from the side it is coming from. */
function SlideImage({ src, alt, dir, k }: { src: string; alt: string; dir: number; k: string }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false} custom={dir}>
      <motion.img
        key={k}
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
        custom={dir}
        initial={reduce ? { opacity: 0 } : { x: `${dir * 100}%` }}
        animate={reduce ? { opacity: 1 } : { x: "0%" }}
        exit={reduce ? { opacity: 0 } : { x: `${dir * -100}%` }}
        transition={{ duration: 0.55, ease: EASE }}
      />
    </AnimatePresence>
  );
}

// Each screen gets its own calm accent, so the change of page is easy to notice.
const SCREEN_HUES = [
  "#4f46e5",
  "#0284c7",
  "#0d9488",
  "#059669",
  "#d97706",
  "#e11d48",
  "#7c3aed",
  "#2563eb",
];

const GROUP = {
  Customer: { label: "Customer", hue: "#6366f1" },
  Staff: { label: "Staff", hue: "#0ea5e9" },
  Admin: { label: "Admin", hue: "#f59e0b" },
} as const;

function Arrow({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  const I = dir < 0 ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={dir < 0 ? "Previous screen" : "Next screen"}
      onClick={onClick}
      className={`btn-apple btn-apple-secondary absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full ${
        dir < 0 ? "left-2 sm:-left-4" : "right-2 sm:-right-4"
      } ${FOCUS}`}
    >
      <I aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}

function Features({ cs }: { cs: CaseStudy }) {
  const reduce = useReducedMotion();
  const screens = cs.screens;
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const go = (next: number, d: number) => setState([(next + screens.length) % screens.length, d]);

  // One timer drives both screens, so the laptop and the phone always change together.
  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setTimeout(() => go(index + 1, 1), SLIDE_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reduce]);

  const s: Screen = screens[index]!;
  const g = GROUP[s.group];
  const hue = SCREEN_HUES[index % SCREEN_HUES.length]!;

  return (
    <Rise>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Bookly screens"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="grid gap-6 md:grid-cols-[minmax(0,1fr)_190px] md:items-center lg:grid-cols-[minmax(0,1fr)_224px]"
      >
        <div className="flex min-w-0 flex-col gap-4">
          {/* details */}
          <div
            className="flex items-end justify-between gap-4 px-1"
            aria-live={paused ? "polite" : "off"}
          >
            <div
              className="min-w-0 border-l-[3px] pl-3.5 transition-colors duration-500"
              style={{ borderColor: hue }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-medium"
                  style={{
                    color: g.hue,
                    background: `color-mix(in oklab, ${g.hue} 14%, transparent)`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: g.hue }}
                  />
                  {g.label} view
                </span>
                <span className="font-mono text-[12px] tabular-nums text-fg-subtle">
                  <span style={{ color: hue }} className="font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>{" "}
                  / {screens.length}
                </span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -14 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <h5
                    className="mt-2 text-[19px] font-semibold tracking-[-0.02em]"
                    style={{ color: hue }}
                  >
                    {s.title}
                  </h5>
                  <p className="mt-1 text-[15px] leading-[1.55] text-fg">{s.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* laptop, with the arrows on its sides */}
          <div className="relative">
            <div
              className="rounded-[20px] p-[4%] transition-[background] duration-700"
              style={{
                background: `radial-gradient(90% 90% at 30% 10%, color-mix(in oklab, ${hue} 70%, #0b1147), #0b1147)`,
              }}
            >
              <Browser>
                <SlideImage
                  src={s.desktop}
                  alt={`${s.title}, on a laptop`}
                  dir={dir}
                  k={`d-${index}`}
                />
              </Browser>
            </div>
            <Arrow dir={-1} onClick={() => go(index - 1, -1)} />
            <Arrow dir={1} onClick={() => go(index + 1, 1)} />
          </div>

          {/* progress: one bar per screen, coloured by who sees it */}
          <div className="flex items-center gap-1 px-1" aria-hidden="true">
            {screens.map((x, i) => {
              const hue = GROUP[x.group].hue;
              return (
                <span
                  key={x.title}
                  className="relative h-1 flex-1 overflow-hidden rounded-full"
                  style={{ background: `color-mix(in oklab, ${hue} 22%, transparent)` }}
                >
                  {i < index || (i === index && reduce) ? (
                    <span className="absolute inset-0" style={{ background: hue }} />
                  ) : i === index ? (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0"
                      style={{ background: hue }}
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </span>
              );
            })}
          </div>
        </div>

        {/* phone: same screen, same moment */}
        <div className="min-w-0">
          <IPhone>
            <SlideImage src={s.phone} alt={`${s.title}, on a phone`} dir={dir} k={`p-${index}`} />
          </IPhone>
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
      { name: "Cloudflare R2", note: "Covers, ebooks", icon: SiCloudflare, color: "#f38020" },
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

/* ---------------- 8. Future scale development ---------------- */

const WHEN_HUE: Record<string, string> = { Now: "#10b981", Next: "#0ea5e9", Later: "#8b5cf6" };

function Future({ cs }: { cs: CaseStudy }) {
  return (
    <ol className="relative grid gap-3 md:grid-cols-4">
      {/* the road ahead, drawn behind the cards on wide screens */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 right-4 top-[22px] hidden h-[2px] rounded-full bg-[linear-gradient(90deg,#10b981,#0ea5e9,#8b5cf6)] opacity-40 md:block"
      />
      {cs.future.map((f, i) => {
        const hue = WHEN_HUE[f.when] ?? "#6366f1";
        return (
          <Rise key={f.title} delay={i * 0.07}>
            <li className="relative h-full">
              <span
                className="relative z-10 inline-flex h-[44px] items-center gap-2 rounded-full border bg-surface-2 px-3.5 text-[12.5px] font-semibold"
                style={{ color: hue, borderColor: `color-mix(in oklab, ${hue} 35%, transparent)` }}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: hue }}
                />
                {f.when}
              </span>
              <div
                className="mt-3 rounded-2xl border border-[var(--edge)] bg-surface-1/50 p-4"
                style={{ boxShadow: `inset 0 3px 0 ${hue}` }}
              >
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-fg">{f.title}</p>
                <p className="mt-1.5 text-pretty text-[13.5px] leading-[1.55] text-fg-muted">
                  {f.text}
                </p>
              </div>
            </li>
          </Rise>
        );
      })}
    </ol>
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
      <Block id="cs-results" title="Future scale development" icon={Rocket} hue={HUE.lessons}>
        <Future cs={cs} />
      </Block>
    </div>
  );
}
