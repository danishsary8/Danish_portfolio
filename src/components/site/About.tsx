import {
  Terminal,
  ShieldCheck,
  Cpu,
  Database,
  Award,
  GraduationCap,
  Briefcase,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { PROFILE, FACTS } from "@/content/portfolio";
import { Reveal, SectionHeader } from "./Reveal";

const PRINCIPLES = [
  {
    icon: Terminal,
    title: "Clean, Scalable Architecture",
    description:
      "I prioritize clean code, modular directory structures, and separation of concerns. From maintainable React component composition to modular Laravel controllers, software should be clear to read, test, and scale.",
    tag: "Maintainability",
  },
  {
    icon: ShieldCheck,
    title: "Production-Grade Security",
    description:
      "Real applications demand rigorous authentication and defense-in-depth: stateless JWT sessions, time-limited OTP verification, role-based access control (RBAC), and secure Google OAuth flows.",
    tag: "Security by Default",
  },
  {
    icon: Cpu,
    title: "High-Performance Interfaces",
    description:
      "Interfaces must respond immediately. I engineer responsive, accessible (WCAG AA) layouts with fluid spring physics, zero layout thrashing, and sub-100ms feedback across mobile, tablet, and desktop screens.",
    tag: "Performance & UX",
  },
  {
    icon: Database,
    title: "Relational Data Modeling",
    description:
      "Clean schemas are the backbone of reliable software. I design normalized PostgreSQL schemas with foreign keys, transactional integrity, and optimized query paths for real-world reliability.",
    tag: "Data Integrity",
  },
];

const DOSSIER_FACTS = [
  {
    label: "Current Trajectory",
    title: "Web Developer Trainee Intern",
    subtitle: "ETEC & KruITSolution",
    description: "Collaborating on team tour booking platform, building dashboards, and integrating REST APIs.",
    icon: Briefcase,
    active: true,
  },
  {
    label: "University Degree",
    title: "4th-Year Software Development",
    subtitle: "Norton University, Phnom Penh",
    description: "B.S. in Software Development candidate (2024 – Present).",
    icon: GraduationCap,
    active: false,
  },
  {
    label: "Award Recognition",
    title: "AI Expert System and Innovation 2026",
    subtitle: "Award Winner (Team)",
    description: "Presented the bilingual (EN/Khmer) clinical expert system for early diabetes screening.",
    icon: Award,
    active: true,
  },
  {
    label: "Location & Reach",
    title: "Phnom Penh, Cambodia",
    subtitle: "ICT (UTC+7) · Available Full-Time",
    description: "Open to Junior Full-Stack / Web Developer roles and high-impact engineering teams.",
    icon: MapPin,
    active: false,
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[1120px] px-5 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeader
        id="about-title"
        title="About"
        lede="Background, engineering ethos, and the real-world standard I bring to every web application."
      />

      {/* Main 2-Column Asymmetric Grid: Narrative & Grounded Dossier */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14 xl:gap-16 items-start">
        {/* Left Column: Authoritative Editorial Story & Principles */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Editorial Manifesto */}
          <Reveal className="flex flex-col gap-5">
            <h3 className="font-display text-[22px] sm:text-[26px] lg:text-[28px] font-semibold leading-[1.22] tracking-[-0.03em] text-fg">
              Turning real-world problems into working, reliable software with clean architecture.
            </h3>
            <div className="flex flex-col gap-4 text-[15px] sm:text-[15.5px] leading-[1.65] text-fg-muted">
              <p>
                My name is <span className="font-medium text-fg">Sary Danish</span>. I am a fourth-year Software
                Development student at Norton University and a Web Developer Trainee Intern at ETEC &amp;
                KruITSolution in Phnom Penh, Cambodia.
              </p>
              <p>
                I build real, production-ready web applications with <span className="text-fg font-medium">React</span>,{" "}
                <span className="text-fg font-medium">Laravel</span>, and{" "}
                <span className="text-fg font-medium">PostgreSQL</span> — including an online bookstore, a habit
                planner, and an award-winning bilingual clinical expert system. Every application is built with secure
                APIs using JWT, OTP verification, and Google OAuth.
              </p>
              <p>
                I focus on responsive interfaces, scalable code, and maintainable systems. My goal is to grow into a
                skilled Full-Stack Developer, building software that is genuinely useful, reliable, and accessible to
                people.
              </p>
            </div>
          </Reveal>

          {/* Core Engineering Disciplines Hairline Ledger */}
          <div className="flex flex-col gap-4">
            <Reveal index={1}>
              <h4 className="text-[13px] font-mono uppercase tracking-wider text-fg-subtle">
                Engineering Invariants
              </h4>
            </Reveal>

            <div className="divide-y divide-line border-y border-line">
              {PRINCIPLES.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <Reveal
                    key={principle.title}
                    index={idx + 2}
                    className="group py-5 sm:py-6 transition-colors duration-150"
                  >
                    <div className="flex flex-col gap-2.5 sm:gap-3">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control border border-line bg-surface-1 transition-colors duration-200 group-hover:border-gold/40 group-hover:bg-gold/10">
                            <Icon className="h-4 w-4 text-fg-subtle transition-colors duration-200 group-hover:text-gold" strokeWidth={1.75} />
                          </div>
                          <h5 className="font-display text-[16px] sm:text-[17px] font-semibold text-fg tracking-tight">
                            {principle.title}
                          </h5>
                        </div>
                        <span className="hidden sm:inline-flex rounded-full border border-line bg-surface-1 px-2.5 py-0.5 text-[11px] font-mono text-fg-subtle">
                          {principle.tag}
                        </span>
                      </div>
                      <p className="text-[14px] leading-[1.6] text-fg-muted pl-11">
                        {principle.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Verified Dossier Panel */}
        <div className="flex flex-col gap-6">
          <Reveal index={2}>
            <div className="rounded-brand border border-line bg-surface-1 p-6 sm:p-7 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping" />
                    <span className="relative h-2 w-2 rounded-full bg-gold" />
                  </span>
                  <span className="font-mono text-[12px] font-medium uppercase tracking-wider text-fg">
                    Verified Trajectory
                  </span>
                </div>
                <span className="font-mono text-[11px] text-fg-subtle tabular-nums">
                  ICT UTC+7
                </span>
              </div>

              {/* Dossier Items */}
              <div className="flex flex-col gap-5">
                {DOSSIER_FACTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex flex-col gap-1.5 rounded-control border border-line/60 bg-surface-2 p-3.5 sm:p-4 transition-all duration-200 hover:border-line-strong hover:shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-fg-subtle">
                          {item.label}
                        </span>
                        {item.active && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-[10.5px] font-medium text-gold">
                            <Sparkles className="h-3 w-3" />
                            Active
                          </span>
                        )}
                      </div>
                      <div className="flex items-start gap-3 mt-1">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control bg-surface-1 border border-line text-fg-subtle transition-colors group-hover:text-fg">
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-[14px] text-fg leading-snug">
                            {item.title}
                          </p>
                          <p className="text-[12.5px] text-fg-muted font-normal">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-[12px] text-fg-subtle leading-relaxed mt-1 pl-10">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Summary Strip */}
              <div className="grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
                <div className="flex flex-col">
                  <span className="font-mono text-[18px] sm:text-[20px] font-bold text-fg tabular-nums">
                    4th
                  </span>
                  <span className="text-[11px] text-fg-subtle">Year Student</span>
                </div>
                <div className="flex flex-col border-x border-line">
                  <span className="font-mono text-[18px] sm:text-[20px] font-bold text-fg tabular-nums">
                    4
                  </span>
                  <span className="text-[11px] text-fg-subtle">Shipped Apps</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[18px] sm:text-[20px] font-bold text-gold tabular-nums">
                    2026
                  </span>
                  <span className="text-[11px] text-fg-subtle">Award Winner</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
