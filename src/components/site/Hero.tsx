import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight, Award, Briefcase, ChevronRight, Globe, GraduationCap } from "lucide-react";
import { AnimatedGithubIcon } from "@/components/ui/AnimatedGithubIcon";
import { PROFILE } from "@/content/portfolio";
import { ASSETS } from "@/lib/assets";
import { useLocalTime } from "@/lib/use-local-time";
import { useTheme } from "@/lib/use-theme";
import { SplitFlapText } from "@/components/ui/SplitFlapText";
import LogoLoop from "@/components/ui/LogoLoop";
import { SkillIcon, themedSkillColor } from "./SkillIcon";
import { ProfileModal } from "./ProfileModal";
import { PortraitCard } from "./PortraitCard";

// Main core stack only, from the CV.
const CORE_STACK = [
  "React",
  "JavaScript",
  "Laravel",
  "PHP",
  "PostgreSQL",
  "Tailwind CSS",
  "Flask",
  "Docker",
] as const;
const CORE_LOGOS = CORE_STACK.map((tech) => ({ title: tech }));

// Recruiter proof strip: every fact is from the CV.
const FACTS = [
  {
    href: "#projects",
    icon: Globe,
    title: "4 live projects",
    sub: "Bookly · Loomora · Diabetes Expert System · Driving Rules",
    meta: "Vercel · Render · Netlify",
    tone: "ink",
  },
  {
    href: "#experience",
    icon: Briefcase,
    title: "Web Developer Intern",
    sub: "ETEC & KruITSolution",
    meta: "Jul 2026 – Now",
    tone: "ink",
  },
  {
    href: "#education",
    icon: Award,
    title: "Award Winner (Team)",
    sub: "AI Expert System & Innovation 2026",
    meta: "Sep 2026",
    tone: "gold",
  },
  {
    href: "#education",
    icon: GraduationCap,
    title: "B.S. Software Development",
    sub: "Norton University · 4th year",
    meta: "2024 – Now",
    tone: "ink",
  },
] as const;

const NAME = [
  { key: "sary", text: "Sary" },
  { key: "danish", text: "Danish" },
] as const;

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

const brandColor = themedSkillColor;

// Official full-colour logos (Devicon, MIT), pinned for stable rendering.
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const LOGOS: Record<string, { src: string; invertInDark?: boolean }> = {
  React: { src: `${DEVICON}/react/react-original.svg` },
  JavaScript: { src: `${DEVICON}/javascript/javascript-original.svg` },
  Laravel: { src: `${DEVICON}/laravel/laravel-original.svg` },
  PHP: { src: `${DEVICON}/php/php-original.svg` },
  PostgreSQL: { src: `${DEVICON}/postgresql/postgresql-original.svg` },
  "Tailwind CSS": { src: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  Flask: { src: `${DEVICON}/flask/flask-original.svg`, invertInDark: true }, // black mark
  Docker: { src: `${DEVICON}/docker/docker-original.svg` },
};

function StackChip({ tech, dark }: { tech: string; dark: boolean }) {
  const logo = LOGOS[tech];
  return (
    <span
      className="tactile squircle [--r:7px] inline-flex h-8 items-center gap-2 whitespace-nowrap pl-2.5 pr-3 text-[12.5px] font-medium leading-none text-fg transition-[color,border-color,background-color] duration-150 hover:border-[color-mix(in_oklab,var(--brand)_45%,transparent)] hover:bg-[color-mix(in_oklab,var(--brand)_8%,var(--surface-2))] hover:text-fg"
      style={{ "--brand": brandColor(tech, dark) } as CSSProperties}
    >
      {logo ? (
        <img
          src={logo.src}
          alt=""
          width={16}
          height={16}
          decoding="async"
          draggable={false}
          // Inline size beats LogoLoop's `.logoloop__item img { height: row }` rule.
          style={{ width: 16, height: 16 }}
          className={`shrink-0 object-contain ${logo.invertInDark ? "dark:invert" : ""}`}
        />
      ) : (
        <SkillIcon name={tech} className="h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} />
      )}
      {tech}
    </span>
  );
}

function scrollToHash(e: MouseEvent<HTMLAnchorElement>, hash: string) {
  const el = document.getElementById(hash.slice(1));
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const time = useLocalTime(PROFILE.timezone);
  const { dark } = useTheme();
  const [goldTarget, setGoldTarget] = useState<"danish" | "sary">("danish");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsProfileModalOpen(true);
    window.addEventListener("open-photo-modal", handleOpen);
    return () => window.removeEventListener("open-photo-modal", handleOpen);
  }, []);

  let letterIndex = 0;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden min-h-[100dvh] flex flex-col justify-center"
    >
      <div
        aria-hidden="true"
        className="hero-glow absolute inset-x-0 top-0 -z-10 h-full pointer-events-none opacity-80"
      />

      <div className="mx-auto w-full max-w-[1180px] px-5 pt-24 pb-16 sm:px-6 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          {/* Left column */}
          <div className="min-w-0">
            {/* Status + Phnom Penh time (split-flap telemetry) */}
            <div className="enter flex items-center gap-3" style={step(0)}>
            <img
              src={ASSETS.profile.photo}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[var(--edge)] lg:hidden"
            />
            <div
              className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1.5 glass-pill rounded-[16px] sm:rounded-full min-h-8 py-1.5 sm:py-1 pl-3 pr-3.5 text-[13px] leading-none select-none"
            >
              <span className="inline-flex items-center gap-2.5">
                <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="font-medium text-fg">Open to Web Developer roles</span>
              </span>
              <span aria-hidden="true" className="hidden h-3.5 w-px bg-line-strong sm:block" />
              <span className="inline-flex items-center gap-1.5 text-fg-muted">
                <span>{PROFILE.location.split(",")[0]}</span>
                <SplitFlapText
                  text={time ?? "--:--"}
                  padTo={5}
                  charset="0123456789"
                  intro={false}
                  loop={false}
                  tileStyle="minimal"
                  tileColor="transparent"
                  textColor="var(--fg)"
                  fontSize={13}
                  gap={0}
                  tileRadius={0}
                  flipsPerChar={4}
                  flipDuration={0.07}
                  stagger={0.03}
                  glare={0}
                  depth={0}
                  className="hero-clock"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: 0 }}
                />
                <span className="font-mono text-[12px] text-fg-subtle">{PROFILE.timezoneLabel}</span>
              </span>
            </div>
            </div>

            {/* Name: per-letter blur rise (CSS, pre-hydration). Click swaps the gold word. */}
            <h1
              id="hero-title"
              aria-label="Sary Danish"
              className="mt-8 text-[46px] sm:text-[60px] lg:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] select-none cursor-pointer group"
              onClick={() => setGoldTarget((prev) => (prev === "danish" ? "sary" : "danish"))}
              title="Click to alternate highlight"
            >
              {NAME.map((word, w) => (
                <span key={word.key}>
                  {w > 0 ? " " : null}
                  <span
                    className={`inline-block whitespace-nowrap transition-colors duration-150 ${
                      goldTarget === word.key
                        ? "text-gold"
                        : "text-fg group-hover:text-fg/80"
                    }`}
                  >
                    {word.text.split("").map((ch) => (
                      <span
                        key={letterIndex}
                        aria-hidden="true"
                        className="enter inline-block"
                        style={step(1 + letterIndex++ * 0.45)}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            {/* Pitch */}
            <div className="enter mt-5 max-w-[56ch]" style={step(6)}>
              <p className="text-[19px] sm:text-[22px] font-medium leading-[1.35] tracking-[-0.02em] text-fg text-pretty">
                Junior Web Developer experienced in building full-stack apps — from PostgreSQL
                schema to React screen.
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-fg-muted text-pretty">
                Clean React interfaces, Laravel and Flask APIs, and sign-in secured with JWT, OTP, and
                Google OAuth, built to hold up for real users.
              </p>
            </div>

            {/* CTAs: iOS capsules */}
            <div
              className="enter mt-10 flex flex-wrap items-center gap-3"
              style={step(7)}
            >
              <a
                href="#contact"
                className={`btn-apple btn-apple-primary group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium tracking-[-0.01em] sm:h-11 sm:text-[14px] select-none ${FOCUS}`}
              >
                Get in touch
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                />
              </a>

              {PROFILE.github ? (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className={`btn-apple btn-apple-secondary inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-5 text-[15px] font-medium tracking-[-0.01em] sm:h-11 sm:text-[14px] select-none ${FOCUS}`}
                >
                  <AnimatedGithubIcon className="h-4 w-4 shrink-0" dark={dark} aria-hidden="true" />
                  GitHub
                </a>
              ) : null}

            </div>

            {/* Core stack: React Bits LogoLoop of brand chips */}
            <div className="mt-14 max-w-[580px]">
              <p className="enter text-[13px] text-fg-subtle" style={step(8)}>
                Core stack
              </p>
              <div className="enter mt-3" style={step(9)}>
                <LogoLoop
                  logos={CORE_LOGOS}
                  renderItem={(item: { title: string }) => <StackChip tech={item.title} dark={dark} />}
                  speed={24}
                  direction="left"
                  logoHeight={32}
                  gap={8}
                  hoverSpeed={6}
                  fadeOut
                  fadeOutWidth={0.1}
                  intro={false}
                  draggable
                  ariaLabel="Core stack"
                  style={{ "--logoloop-pad": "3px" } as CSSProperties}
                />
              </div>
            </div>

          </div>

          {/* Right column: portrait frame */}
          <div className="enter flex justify-center lg:justify-end" style={step(4)}>
            <PortraitCard onView={() => setIsProfileModalOpen(true)} />
          </div>
        </div>

        {/* Proof strip: iOS inset-grouped panel, hairline cells, one scan for recruiters */}
        <nav
          aria-label="Highlights"
          className="enter mt-14 grid gap-px overflow-hidden border border-[var(--edge)] bg-[var(--edge)] shadow-[var(--shadow-contact)] squircle [--r:16px] sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          style={step(10)}
        >
          {FACTS.map((fact) => {
            const Icon = fact.icon;
            return (
              <a
                key={fact.title}
                href={fact.href}
                onClick={(e) => scrollToHash(e, fact.href)}
                className={`group grid grid-cols-[32px_minmax(0,1fr)_16px] items-start gap-3 bg-surface-2 p-4 transition-colors duration-150 hover:bg-surface-1 ${FOCUS} focus-visible:-outline-offset-2`}
              >
                <span
                  aria-hidden="true"
                  className={`squircle [--r:8px] grid h-8 w-8 place-items-center ${
                    fact.tone === "gold" ? "bg-gold text-white dark:text-bg" : "bg-fg text-bg"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium leading-tight tracking-[-0.01em] text-fg">
                    {fact.title}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-fg-muted">{fact.sub}</span>
                  <span className="mt-2 block font-mono text-[11.5px] tabular-nums text-fg-subtle">
                    {fact.meta}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="mt-2 h-4 w-4 text-fg-subtle transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                />
              </a>
            );
          })}
        </nav>
      </div>

      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} />
    </section>
  );
}
