import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
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
  "Docker",
] as const;
const CORE_LOGOS = CORE_STACK.map((tech) => ({ title: tech }));

const NAME = [
  { key: "sary", text: "Sary" },
  { key: "danish", text: "Danish" },
] as const;

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]";

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
  Docker: { src: `${DEVICON}/docker/docker-original.svg` },
};

function StackChip({ tech }: { tech: string }) {
  const logo = LOGOS[tech];
  return (
    <span
      className="skeuo-key squircle [--r:7px] inline-flex h-8 items-center gap-2 whitespace-nowrap pl-2.5 pr-3 text-[12.5px] font-medium leading-none text-fg transition-[color,border-color,background-color] duration-150 hover:border-[color-mix(in_oklab,var(--brand)_45%,transparent)] hover:bg-[color-mix(in_oklab,var(--brand)_8%,var(--surface-2))] hover:text-fg"
      style={{ "--brand": brandColor(tech) } as CSSProperties}
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
  const time = useLocalTime(PROFILE.timezone, { seconds: true });
  const { dark } = useTheme();
  const [goldTarget, setGoldTarget] = useState<"danish" | "sary">("danish");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // The two name words trade the gold every 3s. Keyed on goldTarget, so a click restarts the
  // 3s count instead of being overridden a moment later.
  useEffect(() => {
    const t = window.setTimeout(
      () => setGoldTarget((prev) => (prev === "danish" ? "sary" : "danish")),
      3000,
    );
    return () => window.clearTimeout(t);
  }, [goldTarget]);

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
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="hero-glow absolute inset-x-0 top-0 -z-10 h-full pointer-events-none opacity-80"
      />

      <div className="mx-auto w-full max-w-[1180px] px-5 pt-[92px] pb-16 sm:px-6 lg:pt-0 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:min-h-[100dvh] lg:content-center lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 lg:pb-8 lg:pt-[88px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-20 min-[90rem]:grid-cols-[minmax(0,1fr)_360px] min-[90rem]:gap-24">
          {/* Left column */}
          <div className="min-w-0">
            {/* Status + Phnom Penh time (split-flap telemetry) - placed cleanly above name */}
            <div className="enter mb-5 flex items-center gap-3" style={step(0)}>
              <img
                src={ASSETS.profile.photo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover object-[50%_45%] ring-1 ring-[var(--edge)] lg:hidden"
              />
              <div className="inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 glass-pill rounded-[14px] sm:rounded-full min-h-7 py-1 px-3 text-[11.5px] sm:text-[12px] leading-none select-none">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-gold opacity-60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s] motion-safe:[animation-iteration-count:3]" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  <span className="font-medium text-fg">Available for Full-time Work</span>
                </span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
                <span className="font-medium text-fg-muted">{PROFILE.location.split(",")[0]}</span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
                <span className="inline-flex items-center gap-1.5 text-fg-muted">
                  <SplitFlapText
                    text={time ?? "--:--:--"}
                    padTo={8}
                    charset="0123456789"
                    intro={false}
                    loop={false}
                    tileStyle="minimal"
                    tileColor="transparent"
                    textColor="var(--fg)"
                    fontSize={11.5}
                    gap={0}
                    tileRadius={0}
                    flipsPerChar={1}
                    flipDuration={0.06}
                    stagger={0}
                    glare={0}
                    depth={0}
                    className="hero-clock skeuo-well rounded-[5px] px-1 py-0.5"
                    style={{ fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: 0 }}
                  />
                  <span className="font-mono text-[10.5px] text-fg-subtle">{PROFILE.timezoneLabel}</span>
                </span>
              </div>
            </div>

            {/* Big Name: commanding architectural scale with balanced letter-spacing */}
            <h1
              id="hero-title"
              aria-label="Sary Danish"
              className="uppercase whitespace-nowrap text-[clamp(44px,14vw,52px)] sm:text-[70px] lg:text-[78px] font-semibold tracking-[-0.045em] leading-[0.96] select-none cursor-pointer group"
              onClick={() => setGoldTarget((prev) => (prev === "danish" ? "sary" : "danish"))}
              title="Click to alternate highlight"
            >
              {NAME.map((word, w) => (
                <span key={word.key}>
                  {w > 0 ? " " : null}
                  <span
                    className={`inline-block whitespace-nowrap transition-colors duration-700 ease-[var(--ease-in-out)] ${
                      goldTarget === word.key ? "text-gold" : "text-fg group-hover:text-fg/80"
                    }`}
                  >
                    {word.text.split("").map((ch) => (
                      <span
                        key={letterIndex}
                        aria-hidden="true"
                        className="enter inline-block"
                        style={step(1 + letterIndex++ * 0.4)}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            {/* Role & Academic degree subtitle */}
            <div className="enter mt-4 sm:mt-5" style={step(2.5)}>
              <p className="text-[22px] sm:text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] text-fg">
                Junior Fullstack Web Developer
              </p>
              <div className="mt-2.5 sm:mt-3">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-[14px] sm:text-[15px] font-medium text-fg shadow-xs">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                  4th-year Software Development student
                </span>
              </div>
            </div>

            {/* Pitch: fluid editorial typography with balanced optical ragging */}
            <div
              className="enter mt-5 max-w-[32em] lg:max-w-[38em]"
              style={step(3.5)}
            >
              <p className="text-[18px] sm:text-[20px] font-medium leading-[1.4] tracking-[-0.02em] text-fg text-balance">
                Hands-on experience building reliable{" "}
                <span className="whitespace-nowrap font-semibold">full-stack</span> web apps that solve{" "}
                <span className="whitespace-nowrap font-semibold">real-world</span> problems&nbsp;— from idea to
                working software.
              </p>
              <p className="mt-2.5 text-[15px] sm:text-[16px] leading-[1.65] text-fg-muted text-balance">
                “I build responsive web apps using React on secure Laravel REST APIs and PostgreSQL
                with real authentication.”
              </p>
            </div>

            {/* CTAs as physical keys */}
            <div className="enter mt-7 flex flex-wrap items-center gap-3" style={step(4.5)}>
              <a
                href={`mailto:${PROFILE.email}`}
                className={`btn-apple skeuo-key-ink group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[14px] font-medium tracking-[-0.01em] sm:h-11 sm:px-6 select-none ${FOCUS}`}
              >
                <Mail
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-px group-hover:-rotate-[10deg] motion-reduce:transition-none"
                />
                Email me
              </a>

              <a
                href="#projects"
                onClick={(e) => scrollToHash(e, "#projects")}
                className={`btn-apple skeuo-key group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[14px] font-medium tracking-[-0.01em] sm:h-11 sm:px-5 select-none ${FOCUS}`}
              >
                View projects
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </a>

              {PROFILE.github ? (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub profile"
                  className={`btn-apple skeuo-key group inline-flex h-12 w-12 items-center justify-center rounded-full sm:h-11 sm:w-11 ${FOCUS}`}
                >
                  <span className="inline-flex transition-transform duration-300 ease-[var(--ease-out)] group-hover:-rotate-[8deg] group-hover:scale-110 motion-reduce:transition-none">
                    <AnimatedGithubIcon className="h-[18px] w-[18px] shrink-0" dark={dark} aria-hidden="true" />
                  </span>
                </a>
              ) : null}
            </div>

            {/* Core stack: React Bits LogoLoop of brand chips */}
            <div className="enter mt-7 max-w-[560px]" style={step(5.5)}>
              <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-fg-subtle">
                <span>Core stack</span>
                <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
              </div>
              <div className="mt-2.5">
                <LogoLoop
                  logos={CORE_LOGOS}
                  renderItem={(item: { title: string }) => <StackChip tech={item.title} />}
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

          {/* Right column: portrait frame settles in once the name has landed. On desktop its top
              lines up with the status pill; on wide screens (1440px+) it moves toward the text. */}
          <div className="enter-settle flex justify-center lg:justify-end lg:self-center" style={step(2)}>
            <PortraitCard onView={() => setIsProfileModalOpen(true)} />
          </div>
        </div>

      </div>

      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} />
    </section>
  );
}
