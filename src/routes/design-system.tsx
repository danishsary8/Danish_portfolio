import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  ChevronRight,
  Copy,
  Github,
  Globe,
  Lock,
  Moon,
  RotateCcw,
  Sun,
} from "lucide-react";
import { SkillIcon, themedSkillColor } from "@/components/site/SkillIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SPRING_UI } from "@/lib/motion";
import { useTheme } from "@/lib/use-theme";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — Sary Danish" },
      {
        name: "description",
        content:
          "Colour tokens, type scale, components, surfaces, and motion behind Sary Danish's portfolio.",
      },
    ],
  }),
  component: DesignSystemPage,
});

const SECTIONS = [
  { id: "colour", label: "Colour" },
  { id: "type", label: "Typography" },
  { id: "components", label: "Components" },
  { id: "surfaces", label: "Surfaces" },
  { id: "apple", label: "Apple layer" },
  { id: "motion", label: "Motion" },
] as const;

type Token = { name: string; role: string; light: string; dark: string };

const SURFACE_TOKENS: Token[] = [
  { name: "--bg", role: "Page canvas", light: "#FAF9F6", dark: "#0A0A0B" },
  { name: "--surface-1", role: "Panels, hovered rows", light: "#F3F2EE", dark: "#111113" },
  { name: "--surface-2", role: "Raised: dialogs, popovers", light: "#FFFFFF", dark: "#18181B" },
  {
    name: "--line",
    role: "Hairline borders",
    light: "rgba(10,10,12,0.08)",
    dark: "rgba(255,255,255,0.08)",
  },
  {
    name: "--line-strong",
    role: "Inputs, secondary buttons",
    light: "rgba(10,10,12,0.14)",
    dark: "rgba(255,255,255,0.14)",
  },
];

const INK_TOKENS: Token[] = [
  { name: "--fg", role: "Headings, primary text", light: "#111113", dark: "#EDEDEF" },
  { name: "--fg-muted", role: "Body copy", light: "#5C5C66", dark: "#A1A1AA" },
  { name: "--fg-subtle", role: "Metadata, captions", light: "#6B6B75", dark: "#8A8A93" },
  { name: "--gold", role: "Status dot, award fills", light: "#B0822D", dark: "#C9973A" },
  { name: "--gold-ink", role: "Gold text, 4.5:1 or better", light: "#85601F", dark: "#C9973A" },
];

const TYPE_SCALE = [
  {
    label: "Display",
    spec: "Geist 600 · 72 / 1.02 · -0.045em",
    className: "text-[44px] sm:text-[72px] font-semibold leading-[1.02] tracking-[-0.045em]",
    sample: "Sary Danish",
  },
  {
    label: "Heading",
    spec: "Geist 600 · 32 / 1.15 · -0.03em",
    className: "text-[26px] sm:text-[32px] font-semibold leading-[1.15] tracking-[-0.03em]",
    sample: "Projects",
  },
  {
    label: "Title",
    spec: "Geist 500 · 17 / 1.4",
    className: "text-[17px] font-medium leading-[1.4] tracking-[-0.01em]",
    sample: "Web Developer Trainee Intern",
  },
  {
    label: "Body",
    spec: "Geist 400 · 15 / 1.6",
    className: "text-[15px] leading-[1.6] text-fg-muted max-w-[60ch]",
    sample:
      "I build real web applications with React, Laravel, and PostgreSQL, with secure APIs using JWT, OTP verification, and Google OAuth.",
  },
  {
    label: "Caption",
    spec: "Geist 400 · 13 / 1.45",
    className: "text-[13px] leading-[1.45] text-fg-subtle",
    sample: "Norton University · Fourth year · Phnom Penh",
  },
  {
    label: "Mono",
    spec: "Geist Mono 400 · 12.5 / 1.5 · tabular",
    className: "font-mono text-[12.5px] leading-[1.5] tabular-nums text-fg-subtle",
    sample: "Jul 2026 – Present · 14:32 ICT",
  },
];

function DesignSystemPage() {
  const { dark, toggle } = useTheme();
  const ThemeIcon = dark ? Sun : Moon;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#ds-main"
        className="sr-only z-[60] rounded-control bg-fg px-4 py-2.5 text-[14px] text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5 sm:px-6">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-[14px] text-fg-muted transition-colors duration-150 hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Portfolio
          </Link>
          <nav aria-label="Design system sections" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex h-8 items-center rounded-[7px] px-3 text-[13.5px] text-fg-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
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
            className="press inline-flex h-11 w-11 items-center justify-center rounded-control text-fg-muted transition-colors duration-150 hover:text-fg"
          >
            <ThemeIcon className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="ds-main" className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <section className="pb-12 pt-20 sm:pt-28">
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            Design system
          </h1>
          <p className="mt-5 max-w-[56ch] text-[16px] text-fg-muted">
            The tokens, type, components, surfaces, and motion behind this portfolio. Monochrome
            with a single gold accent, flat layered surfaces, and hairline borders. Toggle the theme
            to see both modes.
          </p>
        </section>

        <ColourSection dark={dark} />
        <TypeSection />
        <ComponentsSection />
        <SurfacesSection />
        <AppleLayerSection />
        <MotionSection />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-8 text-[13.5px] text-fg-subtle sm:px-6">
          <span>Sary Danish · Phnom Penh</span>
          <Link to="/" className="inline-flex min-h-11 items-center gap-1.5 hover:text-fg">
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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-16 lg:py-20">
      <h2
        id={`${id}-title`}
        className="text-[26px] font-semibold tracking-[-0.03em] sm:text-[32px]"
      >
        {title}
      </h2>
      <p className="mb-8 mt-3 max-w-[58ch] text-fg-muted">{intro}</p>
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

  const group = (title: string, tokens: Token[]) => (
    <div className="panel overflow-hidden">
      <h3 className="border-b border-line px-5 py-3 text-[13px] font-medium text-fg-muted">
        {title}
      </h3>
      <ul className="divide-y divide-line">
        {tokens.map((t) => (
          <li
            key={t.name}
            className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 sm:grid-cols-[1.2fr_1fr_auto]"
          >
            <div className="min-w-0">
              <div className="truncate font-mono text-[12.5px] text-fg">{t.name}</div>
              <div className="text-[13px] text-fg-subtle">{t.role}</div>
            </div>
            <div className="hidden font-mono text-[12px] text-fg-subtle sm:block">
              {dark ? t.dark : t.light}
            </div>
            <div className="flex gap-1.5">
              {(["light", "dark"] as const).map((mode) => {
                const value = t[mode];
                const isCopied = copied === value;
                const base = mode === "dark" ? "#0A0A0B" : "#FBFBFA";
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => copy(value)}
                    aria-label={`Copy ${t.name} ${mode} value ${value}`}
                    className="press group relative h-11 w-11 overflow-hidden rounded-control border border-line"
                    style={{ background: `linear-gradient(${value}, ${value}), ${base}` }}
                  >
                    <span
                      className={`absolute inset-0 grid place-items-center transition-opacity duration-150 ${
                        isCopied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ color: mode === "dark" ? "#EDEDEF" : "#111113" }}
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
      intro="Greys carry the interface; gold appears only on the status dot, award markers, and gold text. Each swatch pair is the light and dark value. Click one to copy it."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {group("Surfaces", SURFACE_TOKENS)}
        {group("Ink and accent", INK_TOKENS)}
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
      intro="Geist for everything, Geist Mono for dates and data. Tight tracking on large sizes, relaxed leading on body copy."
    >
      <div className="panel divide-y divide-line">
        {TYPE_SCALE.map((t) => (
          <div
            key={t.label}
            className="grid gap-2 px-5 py-6 lg:grid-cols-[220px_1fr] lg:items-baseline lg:gap-10"
          >
            <div>
              <div className="text-[13.5px] font-medium">{t.label}</div>
              <div className="font-mono text-[12px] text-fg-subtle">{t.spec}</div>
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
      intro="Live shadcn/ui primitives: 8px radius on controls, 12px on panels, 1px borders, and a 0.97 press on every button."
    >
      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="panel p-5 sm:p-6">
          <h3 className="mb-4 text-[13px] font-medium text-fg-muted">Buttons</h3>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button size="lg">Primary</Button>
            <Button size="lg" variant="secondary">
              <Github strokeWidth={1.5} aria-hidden="true" />
              Secondary
            </Button>
            <Button size="lg" variant="outline">
              Outline
            </Button>
            <Button size="lg" variant="ghost">
              Ghost
            </Button>
            <Button size="lg" disabled>
              Disabled
            </Button>
            <Button variant="link">
              Link
              <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>

          <h3 className="mb-3 mt-9 text-[13px] font-medium text-fg-muted">Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>Laravel</Badge>
            <Badge>React</Badge>
            <Badge variant="secondary">PostgreSQL</Badge>
            <Badge variant="gold">Award Winner 2026</Badge>
            <Badge variant="solid">Live</Badge>
            <Badge variant="outline">Team project</Badge>
          </div>

          <h3 className="mb-3 mt-9 text-[13px] font-medium text-fg-muted">Tabs</h3>
          <Tabs defaultValue="api">
            <TabsList>
              <TabsTrigger value="api">REST API</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="stack">Stack</TabsTrigger>
            </TabsList>
            <TabsContent value="api" className="font-mono text-[12.5px] text-fg-subtle">
              GET /api/v1/books?category=software
            </TabsContent>
            <TabsContent value="schema" className="font-mono text-[12.5px] text-fg-subtle">
              users · books · orders · order_items
            </TabsContent>
            <TabsContent value="stack" className="font-mono text-[12.5px] text-fg-subtle">
              Laravel · React · PostgreSQL · Cloudinary
            </TabsContent>
          </Tabs>
        </div>

        <div className="panel p-5 sm:p-6">
          <h3 className="mb-4 text-[13px] font-medium text-fg-muted">Form field</h3>
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
            />
            <p
              id="ds-email-help"
              className={`text-[13px] ${invalid ? "text-destructive" : "text-fg-subtle"}`}
            >
              {invalid
                ? "That email doesn't look complete. Check for a missing @ or domain."
                : "Validated when you leave the field, not while you type."}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SurfacesSection() {
  const layers = [
    { label: "Canvas", token: "--bg", className: "bg-bg" },
    { label: "Panel", token: "--surface-1", className: "bg-surface" },
    { label: "Raised", token: "--surface-2", className: "bg-raised" },
  ];
  return (
    <Section
      id="surfaces"
      title="Surfaces"
      intro="Depth comes from three flat layers and hairline borders. The Apple layer below adds a specular top edge and a contact shadow of 2px or less; large shadows stay on floating layers like dialogs and the portrait."
    >
      <div className="grid gap-4 md:grid-cols-[1fr_1.15fr]">
        <div className="panel p-4">
          <div className="rounded-[10px] border border-line bg-bg p-4">
            <p className="font-mono text-[12px] text-fg-subtle">--bg</p>
            <div className="mt-3 rounded-[10px] border border-line bg-surface p-4">
              <p className="font-mono text-[12px] text-fg-subtle">--surface-1</p>
              <div className="mt-3 rounded-[10px] border border-line bg-raised p-4 shadow-[var(--shadow-float)]">
                <p className="font-mono text-[12px] text-fg-subtle">--surface-2 · --shadow-float</p>
                <p className="mt-2 text-[14px]">Floating layer</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-brand border border-line bg-line">
          {layers.map((l) => (
            <li
              key={l.token}
              className={`flex items-center justify-between px-5 py-5 ${l.className}`}
            >
              <span className="text-[14.5px] font-medium">{l.label}</span>
              <span className="font-mono text-[12px] text-fg-subtle">{l.token}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function AppleLayerSection() {
  const { dark } = useTheme();
  const focus =
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";
  const proofRows = [
    { icon: Globe, title: "4 live projects", meta: "Vercel · Render · Netlify", gold: false },
    { icon: Award, title: "Award Winner (Team)", meta: "Sep 2026", gold: true },
  ];
  return (
    <Section
      id="apple"
      title="Apple layer"
      intro="The classes behind the iOS feel, rendered live: .squircle with --r, .glass-pill, .tactile, .frame-float, and .btn-apple. Use the classes, never ad-hoc values."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-5 sm:p-6">
          <h3 className="mb-4 text-[13px] font-medium text-fg-muted">Capsule buttons · .btn-apple</h3>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={`btn-apple btn-apple-primary group inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium ${focus}`}
            >
              Get in touch
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5"
              />
            </button>
            <button
              type="button"
              className={`btn-apple btn-apple-secondary inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium ${focus}`}
            >
              <Github aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              Secondary
            </button>
          </div>

          <h3 className="mb-3 mt-9 text-[13px] font-medium text-fg-muted">
            Status capsule · .glass-pill
          </h3>
          <span className="glass-pill inline-flex h-8 items-center gap-2.5 rounded-full pl-3 pr-3.5 text-[13px]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            <span className="font-medium text-fg">Open to Web Developer roles</span>
          </span>

          <h3 className="mb-3 mt-9 text-[13px] font-medium text-fg-muted">Stack chips · .tactile</h3>
          <ul className="flex flex-wrap gap-2">
            {["React", "Laravel", "PostgreSQL", "Docker"].map((tech) => (
              <li
                key={tech}
                className="tactile squircle [--r:7px] inline-flex h-8 items-center gap-2 pl-2.5 pr-3 text-[12.5px] font-medium text-fg"
              >
                <SkillIcon
                  name={tech}
                  className="h-4 w-4"
                  style={{ color: themedSkillColor(tech, dark) }}
                />
                {tech}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 mt-9 text-[13px] font-medium text-fg-muted">Squircle radii · --r</h3>
          <div className="flex items-end gap-4">
            {[8, 14, 20, 28].map((radius) => (
              <div key={radius} className="text-center">
                <div
                  className="tactile squircle h-16 w-16"
                  style={{ "--r": `${radius}px` } as CSSProperties}
                />
                <p className="mt-2 font-mono text-[11.5px] text-fg-subtle">{radius}px</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className="panel p-5 sm:p-6">
            <h3 className="mb-4 text-[13px] font-medium text-fg-muted">
              Inset-grouped row (Hero proof strip)
            </h3>
            <div className="squircle [--r:16px] grid gap-px overflow-hidden border border-[var(--edge)] bg-[var(--edge)] sm:grid-cols-2">
              {proofRows.map(({ icon: Icon, title, meta, gold }) => (
                <div
                  key={title}
                  className="grid grid-cols-[32px_minmax(0,1fr)_16px] items-start gap-3 bg-surface-2 p-4"
                >
                  <span
                    aria-hidden="true"
                    className={`squircle [--r:8px] grid h-8 w-8 place-items-center ${
                      gold ? "bg-gold text-white dark:text-bg" : "bg-fg text-bg"
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-fg">{title}</span>
                    <span className="mt-1.5 block font-mono text-[11.5px] tabular-nums text-fg-subtle">
                      {meta}
                    </span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mt-2 h-4 w-4 text-fg-subtle"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5 sm:p-6">
            <h3 className="mb-4 text-[13px] font-medium text-fg-muted">
              Browser frame · .tactile .frame-float
            </h3>
            <div className="tactile frame-float squircle [--r:18px] overflow-hidden">
              <div className="flex h-10 items-center gap-3 border-b border-[var(--edge)] bg-surface-1 px-4">
                <span aria-hidden="true" className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
                  ))}
                </span>
                <span className="mx-auto flex h-6 items-center gap-1.5 rounded-[7px] bg-surface-2 px-2.5 font-mono text-[11.5px] text-fg-subtle">
                  <Lock aria-hidden="true" strokeWidth={1.75} className="h-3 w-3" />
                  bookly-frontend-five.vercel.app
                </span>
                <span aria-hidden="true" className="w-[42px]" />
              </div>
              <div className="grid aspect-[16/7] place-items-center bg-surface-1 text-[22px] font-semibold tracking-[-0.03em] text-fg-subtle">
                Bookly
              </div>
            </div>
          </div>

          <div className="panel p-5 sm:p-6">
            <h3 className="mb-4 text-[13px] font-medium text-fg-muted">
              Timeline markers · .timeline-rail
            </h3>
            <div className="relative pl-10">
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[7px] top-6 w-px bg-line-strong"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-fg bg-bg"
              />
              <p className="text-[16px] font-semibold tracking-[-0.02em] text-fg">Current role</p>
              <p className="mt-1 text-[13.5px] text-fg-muted">Outlined node in ink</p>
              <div className="relative mt-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-10 top-1 h-[15px] w-[15px] rounded-full border-2 border-gold bg-gold"
                />
                <p className="text-[16px] font-semibold tracking-[-0.02em] text-fg">Award</p>
                <p className="mt-1 text-[13.5px] text-fg-muted">Filled node in gold</p>
              </div>
            </div>
          </div>
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
      intro="Strong ease-out curves for entrances, springs for things that move with you, and plain fades when reduced motion is on. Only transform, opacity, and filter animate."
    >
      {reduce ? (
        <p className="panel mb-4 px-4 py-3 text-[14px] text-fg-muted">
          Your system has reduced motion on, so these samples fade instead of moving.
        </p>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <EntranceDemo />
        <IndicatorDemo />
        <PressDemo />
        <HoverDemo />
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
    <div className="panel flex flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-medium">{title}</h3>
          <div className="font-mono text-[12px] text-fg-subtle">{spec}</div>
        </div>
        {action}
      </div>
      <div className="grid min-h-[150px] flex-1 place-items-center rounded-[10px] border border-dashed border-line-strong p-4">
        {children}
      </div>
    </div>
  );
}

function EntranceDemo() {
  const [key, setKey] = useState(0);
  const items = ["Bookly", "Loomora", "Diabetes Expert System"];
  return (
    <DemoShell
      title="Staggered entrance"
      spec="600ms · ease-out · 60ms stagger · blur 4px → 0"
      action={
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setKey((k) => k + 1)}
          className="h-11 px-3"
        >
          <RotateCcw strokeWidth={1.5} aria-hidden="true" />
          Replay
        </Button>
      }
    >
      <ul key={key} className="grid w-full max-w-[260px] gap-2">
        {items.map((it, i) => (
          <li
            key={it}
            className="enter rounded-[8px] border border-line bg-raised px-3 py-2 text-[14px]"
            style={{ "--i": i } as CSSProperties}
          >
            {it}
          </li>
        ))}
      </ul>
    </DemoShell>
  );
}

function IndicatorDemo() {
  const reduce = useReducedMotion();
  const tabs = ["Home", "Skills", "Projects", "Contact"];
  const [active, setActive] = useState("Home");
  return (
    <DemoShell title="Sliding indicator" spec="spring · duration 0.35 · bounce 0.15">
      <div className="flex rounded-control border border-line bg-bg p-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={`relative h-9 rounded-[7px] px-3 text-[13.5px] transition-colors duration-150 ${
              active === t ? "text-fg" : "text-fg-muted hover:text-fg"
            }`}
          >
            {active === t ? (
              <motion.span
                layoutId="ds-pill"
                transition={reduce ? { duration: 0 } : SPRING_UI}
                className="absolute inset-0 rounded-[7px] border border-line bg-surface"
              />
            ) : null}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>
    </DemoShell>
  );
}

function PressDemo() {
  const [count, setCount] = useState(0);
  return (
    <DemoShell title="Press feedback" spec="scale 0.97 · 160ms · ease-out">
      <div className="flex flex-col items-center gap-3">
        <Button size="lg" onClick={() => setCount((c) => c + 1)}>
          Press me
        </Button>
        <span className="font-mono text-[12px] tabular-nums text-fg-subtle" aria-live="polite">
          {count} {count === 1 ? "press" : "presses"}
        </span>
      </div>
    </DemoShell>
  );
}

function HoverDemo() {
  return (
    <DemoShell title="Row hover" spec="background 150ms · arrow nudge 200ms · pointer devices only">
      <a
        href="#motion"
        className="group flex w-full max-w-[300px] items-center justify-between rounded-[8px] border border-line px-4 py-3 text-[14px] transition-colors duration-150 hover:bg-surface"
      >
        Bookly
        <ArrowUpRight
          className="h-4 w-4 text-fg-subtle transition-[transform,color] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </a>
    </DemoShell>
  );
}
