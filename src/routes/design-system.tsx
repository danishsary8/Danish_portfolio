import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Copy, Github, Moon, RotateCcw, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SPRING_ENTRANCE, SPRING_HOVER, SPRING_PRESS } from "@/lib/motion";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — Sary Danish" },
      {
        name: "description",
        content:
          "Colour tokens, type scale, components, glass surfaces, and motion presets behind Sary Danish's portfolio.",
      },
    ],
  }),
  component: DesignSystemPage,
});

const SECTIONS = [
  { id: "colour", label: "Colour" },
  { id: "type", label: "Typography" },
  { id: "components", label: "Components" },
  { id: "glass", label: "Glass" },
  { id: "motion", label: "Motion" },
] as const;

type Token = { name: string; role: string; light: string; dark: string };

const SURFACE_TOKENS: Token[] = [
  { name: "--bg-base", role: "Page canvas", light: "#F0EEE9", dark: "#0A0A0C" },
  { name: "--bg-elevated-1", role: "Mesh gradient, top stop", light: "#F7F5F0", dark: "#15131A" },
  { name: "--bg-elevated-2", role: "Mesh gradient, lower stop", light: "#ECE8DF", dark: "#0A0A0C" },
  {
    name: "--glass-surface",
    role: "Frosted panel fill",
    light: "rgba(255,255,255,0.55)",
    dark: "rgba(255,255,255,0.06)",
  },
  {
    name: "--glass-border",
    role: "Panel hairline",
    light: "rgba(10,10,10,0.10)",
    dark: "rgba(255,255,255,0.12)",
  },
];

const INK_TOKENS: Token[] = [
  { name: "--text-primary", role: "Headlines and body", light: "#0A0A0A", dark: "#F5F0E8" },
  { name: "--text-muted", role: "Supporting copy, metadata", light: "#5A554C", dark: "#9A948A" },
  { name: "--accent-gold", role: "Accent fills and highlights", light: "#B0822D", dark: "#C9973A" },
  {
    name: "--accent-gold-hover",
    role: "Accent, pressed / hover",
    light: "#9A6F26",
    dark: "#DDA94B",
  },
  {
    name: "--accent-gold-ink",
    role: "Gold text, 4.5:1 or better",
    light: "#85601F",
    dark: "#C9973A",
  },
  { name: "--border-focus", role: "Keyboard focus ring", light: "#0A0A0A", dark: "#C9973A" },
];

const TYPE_SCALE = [
  {
    label: "Display",
    spec: "Syne 800 · 88 / 0.95 · -0.04em",
    className:
      "font-display font-extrabold text-[56px] sm:text-[88px] leading-[0.95] tracking-[-0.04em]",
    sample: "Sary Danish",
  },
  {
    label: "Heading 1",
    spec: "Syne 700 · 56 / 1.0 · -0.03em",
    className: "font-display font-bold text-[40px] sm:text-[56px] leading-[1] tracking-[-0.03em]",
    sample: "Selected work",
  },
  {
    label: "Heading 2",
    spec: "Syne 700 · 36 / 1.05 · -0.02em",
    className:
      "font-display font-bold text-[30px] sm:text-[36px] leading-[1.05] tracking-[-0.02em]",
    sample: "Bookly, an online bookstore",
  },
  {
    label: "Heading 3",
    spec: "Plus Jakarta Sans 600 · 22 / 1.3",
    className: "font-body font-semibold text-[22px] leading-[1.3]",
    sample: "OTP and Google sign-in with JWT sessions",
  },
  {
    label: "Body large",
    spec: "Plus Jakarta Sans 400 · 18 / 1.6",
    className: "font-body text-[18px] leading-[1.6] max-w-[62ch]",
    sample:
      "I build real web applications with React, Laravel, and PostgreSQL, with secure APIs using JWT, OTP verification, and Google OAuth.",
  },
  {
    label: "Body",
    spec: "Plus Jakarta Sans 400 · 16 / 1.55",
    className: "font-body text-[16px] leading-[1.55] max-w-[62ch]",
    sample:
      "Web developer on a team tour booking platform, building UI dashboards and integrating REST APIs.",
  },
  {
    label: "Caption",
    spec: "Plus Jakarta Sans 500 · 13 / 1.4",
    className: "font-body font-medium text-[13px] leading-[1.4] text-mutedText",
    sample: "Norton University · 2024 – Present",
  },
  {
    label: "Mono",
    spec: "JetBrains Mono 500 · 13 / 1.5 · tabular",
    className: "font-mono font-medium text-[13px] leading-[1.5] tabular-nums",
    sample: "GET /api/v1/books?sort=price_asc  ·  14:32 ICT",
  },
];

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
    setDark(next);
  };
  return { dark, toggle };
}

function DesignSystemPage() {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen text-primaryText font-body antialiased">
      <a
        href="#ds-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 z-[60] rounded-control bg-primaryText px-4 py-2.5 text-sm text-base"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="glass-panel glass-elevated mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-control px-2 text-sm font-medium text-mutedText transition-colors hover:text-primaryText"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Portfolio
          </Link>
          <nav aria-label="Design system sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex min-h-11 items-center rounded-control px-3 text-sm text-mutedText transition-colors hover:text-primaryText"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-control transition-colors hover:border-gold"
          >
            {dark ? (
              <Sun className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <main id="ds-main" className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <section className="grid gap-8 pb-20 pt-20 sm:pt-28 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:pb-28">
          <h1 className="font-display text-[52px] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-[88px] lg:text-[112px]">
            Design
            <br />
            System
          </h1>
          <p className="max-w-[44ch] text-[17px] leading-[1.6] text-mutedText">
            The tokens, type, components, glass surfaces, and motion behind this portfolio. One gold
            accent, frosted panels over a warm mesh, and spring physics for anything that moves.
            Toggle the theme to see both modes.
          </p>
        </section>

        <ColourSection dark={dark} />
        <TypeSection />
        <ComponentsSection />
        <GlassSection />
        <MotionSection />
      </main>

      <footer className="mx-auto max-w-[1240px] px-4 pb-16 pt-8 sm:px-6">
        <div className="flex flex-col gap-3 text-sm text-mutedText sm:flex-row sm:items-center sm:justify-between">
          <span>Sary Danish · Phnom Penh, Cambodia</span>
          <Link to="/" className="inline-flex min-h-11 items-center gap-1.5 hover:text-primaryText">
            Back to portfolio
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 py-20 lg:py-28">
      <div className="mb-10 grid gap-4 lg:mb-14 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <h2
          id={`${id}-title`}
          className="font-display text-[36px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-[52px]"
        >
          {title}
        </h2>
        <p className="max-w-[56ch] text-[16px] leading-[1.6] text-mutedText">{intro}</p>
      </div>
      {children}
    </section>
  );
}

function ColourSection({ dark }: { dark: boolean }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied((c) => (c === value ? null : c)), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  const renderGroup = (title: string, tokens: Token[]) => (
    <div className="glass-card p-2 sm:p-3">
      <h3 className="px-3 pb-2 pt-3 text-[15px] font-semibold">{title}</h3>
      <ul>
        {tokens.map((t) => (
          <li
            key={t.name}
            className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-control px-3 py-3 sm:grid-cols-[1.2fr_1fr_auto]"
          >
            <div className="min-w-0">
              <div className="truncate font-mono text-[13px] font-medium">{t.name}</div>
              <div className="text-[13px] text-mutedText">{t.role}</div>
            </div>
            <div className="hidden font-mono text-[12px] text-mutedText sm:block">
              {dark ? t.dark : t.light}
            </div>
            <div className="flex gap-1.5">
              {(["light", "dark"] as const).map((mode) => {
                const value = t[mode];
                const isCopied = copied === value;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => copy(value)}
                    aria-label={`Copy ${t.name} ${mode} value ${value}`}
                    className="group relative h-11 w-11 overflow-hidden rounded-control border border-glass-border transition-transform active:scale-95"
                    style={{
                      background:
                        mode === "dark"
                          ? `linear-gradient(${value}, ${value}), #0A0A0C`
                          : `linear-gradient(${value}, ${value}), #F0EEE9`,
                    }}
                  >
                    <span
                      className={`absolute inset-0 grid place-items-center transition-opacity ${
                        isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ color: mode === "dark" ? "#F5F0E8" : "#0A0A0A" }}
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Section
      id="colour"
      title="Colour"
      intro="Neutrals carry the page; gold is reserved for one action or highlight at a time. Each pair of swatches shows the light and dark value. Click a swatch to copy it."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {renderGroup("Surfaces", SURFACE_TOKENS)}
        {renderGroup("Ink and accent", INK_TOKENS)}
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? `Copied ${copied}` : ""}
      </p>
    </Section>
  );
}

function TypeSection() {
  return (
    <Section
      id="type"
      title="Typography"
      intro="Syne for display, Plus Jakarta Sans for reading, JetBrains Mono for data and code. Tight leading on headlines, generous leading on body copy."
    >
      <div className="glass-card divide-y divide-glass-border">
        {TYPE_SCALE.map((t) => (
          <div
            key={t.label}
            className="grid gap-3 px-5 py-6 sm:px-7 lg:grid-cols-[220px_1fr] lg:items-baseline lg:gap-10"
          >
            <div>
              <div className="text-[14px] font-semibold">{t.label}</div>
              <div className="font-mono text-[12px] text-mutedText">{t.spec}</div>
            </div>
            <div className={`${t.className} min-w-0 break-words`}>{t.sample}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ComponentsSection() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = touched && email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);

  return (
    <Section
      id="components"
      title="Components"
      intro="Live shadcn/ui primitives restyled for glass: 10px radius on controls, 16px on panels, never a pill. Every control is at least 44px tall on touch screens."
    >
      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="glass-card p-5 sm:p-7">
          <h3 className="mb-5 text-[15px] font-semibold">Buttons</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Primary</Button>
            <Button size="lg" variant="cta">
              Hire me
            </Button>
            <Button size="lg" variant="glass">
              <Github strokeWidth={1.5} aria-hidden="true" />
              Source
            </Button>
            <Button size="lg" variant="outline">
              Outline
            </Button>
            <Button size="lg" variant="ghost">
              Ghost
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button>Default size</Button>
            <Button size="sm" variant="glass">
              Small
            </Button>
            <Button size="lg" disabled>
              Disabled
            </Button>
            <Button variant="link" className="px-0">
              Text link
              <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>

          <h3 className="mb-4 mt-10 text-[15px] font-semibold">Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>Laravel</Badge>
            <Badge>React</Badge>
            <Badge>PostgreSQL</Badge>
            <Badge variant="gold">Award Winner 2026</Badge>
            <Badge variant="solid">Live</Badge>
            <Badge variant="outline">Team project</Badge>
          </div>

          <h3 className="mb-4 mt-10 text-[15px] font-semibold">Tabs</h3>
          <Tabs defaultValue="api">
            <TabsList>
              <TabsTrigger value="api">REST API</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="stack">Stack</TabsTrigger>
            </TabsList>
            <TabsContent value="api" className="font-mono text-[13px] text-mutedText">
              GET /api/v1/books?category=software
            </TabsContent>
            <TabsContent value="schema" className="font-mono text-[13px] text-mutedText">
              users · books · orders · order_items
            </TabsContent>
            <TabsContent value="stack" className="font-mono text-[13px] text-mutedText">
              Laravel · React · TypeScript · PostgreSQL
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid gap-4">
          <div className="glass-card p-5 sm:p-7">
            <h3 className="mb-5 text-[15px] font-semibold">Form field</h3>
            <div className="grid gap-2">
              <Label htmlFor="ds-email">Email</Label>
              <Input
                id="ds-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={invalid}
                aria-describedby="ds-email-help"
                className={`text-[16px] ${invalid ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              <p
                id="ds-email-help"
                className={`text-[13px] ${invalid ? "text-destructive" : "text-mutedText"}`}
              >
                {invalid
                  ? "That email doesn't look complete. Check for a missing @ or domain."
                  : "Validated when you leave the field, not while you type."}
              </p>
            </div>
          </div>

          <ProjectCardSample />
        </div>
      </div>
    </Section>
  );
}

function ProjectCardSample() {
  const reduce = useReducedMotion();
  return (
    <motion.article
      whileHover={reduce ? {} : { y: -4, scale: 1.01 }}
      whileTap={reduce ? {} : { scale: 0.99 }}
      transition={SPRING_HOVER}
      className="glass-card p-5 sm:p-7"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-[24px] font-bold tracking-[-0.02em]">Bookly</h3>
        <Badge variant="solid">Live</Badge>
      </div>
      <p className="text-[15px] leading-[1.55] text-mutedText">
        Online bookstore with OTP and Google login, cart, checkout, order tracking, and an admin
        dashboard.
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge>Laravel</Badge>
        <Badge>React</Badge>
        <Badge>PostgreSQL</Badge>
      </div>
      <p className="mt-5 text-[13px] text-mutedText">Glass card · hover to lift</p>
    </motion.article>
  );
}

function GlassSection() {
  const levels = [
    { label: "No blur", blur: "0px", note: "Flat tint. Busy backgrounds bleed through." },
    { label: "Card · 18px", blur: "18px", note: "Content cards, chips, inputs." },
    { label: "Chrome · 28px", blur: "28px", note: "Navigation, sheets, dialogs." },
  ];
  return (
    <Section
      id="glass"
      title="Glass"
      intro="Blur only works when something sits behind it, so the page always has a soft mesh gradient. Panels keep text at 4.5:1 contrast or better against their fill."
    >
      <div className="relative overflow-hidden rounded-brand border border-glass-border p-4 sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-6 h-56 w-56 rounded-full bg-gold/60 blur-2xl" />
          <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-primaryText/25 blur-2xl" />
          <div className="absolute left-1/3 top-1/3 font-display text-[120px] font-extrabold leading-none text-primaryText/15 sm:text-[180px]">
            KH
          </div>
        </div>
        <div className="relative grid gap-4 md:grid-cols-[1fr_1.15fr_1.3fr]">
          {levels.map((l) => (
            <div
              key={l.label}
              className="rounded-brand border border-glass-border p-5"
              style={{
                background: "var(--glass-surface)",
                backdropFilter: `blur(${l.blur})`,
                WebkitBackdropFilter: `blur(${l.blur})`,
              }}
            >
              <div className="font-mono text-[12px] text-mutedText">
                backdrop-filter: blur({l.blur})
              </div>
              <div className="mt-6 text-[18px] font-semibold">{l.label}</div>
              <p className="mt-1 text-[14px] leading-[1.5] text-mutedText">{l.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.3fr]">
        <div className="glass-card p-5">
          <div className="font-mono text-[12px] text-mutedText">Resting</div>
          <p className="mt-2 text-[15px]">No shadow on content sitting on the page.</p>
        </div>
        <div className="glass-card glass-elevated p-5">
          <div className="font-mono text-[12px] text-mutedText">Elevated · --shadow-card</div>
          <p className="mt-2 text-[15px]">
            Soft shadow only for floating layers: nav, sheets, hover-lifted cards.
          </p>
        </div>
      </div>
    </Section>
  );
}

function MotionSection() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="motion"
      title="Motion"
      intro="Springs for anything that moves; plain fades when reduced motion is on. Only transform and opacity animate, and nothing enters from scale 0."
    >
      {reduce && (
        <p className="glass-panel mb-4 px-4 py-3 text-[14px] text-mutedText">
          Your system has reduced motion on, so these samples fade instead of moving.
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <EntranceDemo />
        <StaggerDemo />
        <HoverDemo />
        <PressDemo />
      </div>
    </Section>
  );
}

function DemoShell({
  title,
  spec,
  action,
  children,
}: {
  title: string;
  spec: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="glass-card flex flex-col p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[16px] font-semibold">{title}</h3>
          <div className="font-mono text-[12px] text-mutedText">{spec}</div>
        </div>
        {action}
      </div>
      <div className="grid min-h-[150px] flex-1 place-items-center rounded-control border border-dashed border-glass-border p-4">
        {children}
      </div>
    </div>
  );
}

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="glass" size="sm" onClick={onClick} className="h-11 px-3.5">
      <RotateCcw strokeWidth={1.5} aria-hidden="true" />
      Replay
    </Button>
  );
}

function EntranceDemo() {
  const reduce = useReducedMotion();
  const [key, setKey] = useState(0);
  return (
    <DemoShell
      title="Entrance"
      spec="spring · stiffness 300 · damping 30 · y 16 → 0 · scale 0.97 → 1"
      action={<ReplayButton onClick={() => setKey((k) => k + 1)} />}
    >
      <motion.div
        key={key}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={reduce ? { duration: 0.15 } : SPRING_ENTRANCE}
        className="glass-panel glass-elevated px-6 py-4 text-[15px] font-semibold"
      >
        Loomora
      </motion.div>
    </DemoShell>
  );
}

function StaggerDemo() {
  const reduce = useReducedMotion();
  const [key, setKey] = useState(0);
  const items = ["React", "Laravel", "PostgreSQL", "Flask", "Docker"];
  return (
    <DemoShell
      title="Stagger reveal"
      spec="spring entrance · 60ms between children"
      action={<ReplayButton onClick={() => setKey((k) => k + 1)} />}
    >
      <motion.ul
        key={key}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}
        className="flex flex-wrap justify-center gap-2"
      >
        {items.map((i) => (
          <motion.li
            key={i}
            variants={{
              hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: reduce ? { duration: 0.15 } : SPRING_ENTRANCE,
              },
            }}
          >
            <Badge className="px-3 py-1.5 text-[12px]">{i}</Badge>
          </motion.li>
        ))}
      </motion.ul>
    </DemoShell>
  );
}

function HoverDemo() {
  const reduce = useReducedMotion();
  return (
    <DemoShell title="Hover lift" spec="spring · stiffness 400 · damping 28 · y -4 · scale 1.01">
      <motion.div
        tabIndex={0}
        whileHover={reduce ? {} : { y: -4, scale: 1.01 }}
        whileFocus={reduce ? {} : { y: -4, scale: 1.01 }}
        transition={SPRING_HOVER}
        className="glass-card cursor-default px-6 py-4 text-[15px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        Hover or focus me
      </motion.div>
    </DemoShell>
  );
}

function PressDemo() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  return (
    <DemoShell title="Press feedback" spec="spring · stiffness 500 · damping 35 · scale 0.98">
      <div className="flex flex-col items-center gap-3">
        <motion.button
          type="button"
          whileTap={reduce ? {} : { scale: 0.96 }}
          transition={SPRING_PRESS}
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex h-12 items-center rounded-control bg-gold px-6 text-[15px] font-semibold text-[#0A0A0A] transition-colors hover:bg-gold-hover"
        >
          Press me
        </motion.button>
        <div className="h-5 font-mono text-[12px] tabular-nums text-mutedText" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={count}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={reduce ? { duration: 0.15 } : SPRING_PRESS}
              className="inline-block"
            >
              {count} {count === 1 ? "press" : "presses"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </DemoShell>
  );
}
