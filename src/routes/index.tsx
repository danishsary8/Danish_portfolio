import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  FileText,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Send,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Reveal, RevealItem, SectionHeader, SplitWords } from "@/components/portfolio/Reveal";
import { SpotlightCard } from "@/components/portfolio/SpotlightCard";
import { TechnicalSkills } from "@/components/portfolio/TechnicalSkills";
// Replace with actual photo: /assets/danish-photo.jpg
import photo from "@/assets/danish-photo.jpg";
import booklyShot from "@/assets/project-bookly.jpg.asset.json";
import loomoraShot from "@/assets/project-loomora.jpg.asset.json";
import drivingShot from "@/assets/project-driving.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sary Danish — Junior Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Sary Danish, a Junior Full Stack Developer from Phnom Penh, Cambodia. React, Laravel, Flask and REST APIs.",
      },
      { property: "og:title", content: "Sary Danish — Junior Full Stack Developer" },
      {
        property: "og:description",
        content: "Full-stack web apps, REST APIs, React, Laravel and Flask — built in Cambodia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CV_HREF = "#"; // CV PDF link here
const GITHUB = "https://github.com/danishsary8";
const NAV = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const PROJECTS = [
  {
    name: "Bookly",
    desc: "Online bookstore platform with full e-commerce features. REST API backend with Laravel, React/TypeScript frontend, JWT authentication, and PostgreSQL database.",
    tech: ["Laravel", "React", "TypeScript", "PostgreSQL", "Supabase"],
    live: "https://bookly-frontend-five.vercel.app/",
    docs: "https://bookly-api-zasc.onrender.com/docs",
    shot: booklyShot.url,
  },
  {
    name: "Loomora",
    desc: "Personal routine and habit planner web app. Deployed full-stack application with scheduling features and clean UI.",
    tech: ["React", "JavaScript", "CSS"],
    live: "https://daycraft-vnid.onrender.com/",
    shot: loomoraShot.url,
  },
  {
    name: "Diabetes Expert System",
    desc: "Full-stack clinical assistance prototype with bilingual EN/Khmer support, JWT RBAC, rule-based expert system for diabetes risk assessment.",
    tech: ["Flask", "React", "Vite", "Python", "JWT"],
    live: "https://diabetes-expert-system-3nk38gik3-danishs-projects-79a48970.vercel.app/",
    demoProtected: true,
  },
  {
    name: "Driving Rules App",
    desc: "Frontend web app for learning Cambodian driving theory and traffic rules. Built for local learners.",
    tech: ["Flutter", "Dart"],
    live: "https://drivingruletest.netlify.app/",
    shot: drivingShot.url,
  },
];

function Index() {
  return (
    <div className="portfolio-shell relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Awards />
        <Contact />
      </main>
      <Footer />
      {/* Floating CV button — CV PDF link here */}
      <a
        href={CV_HREF}
        aria-label="View CV"
        className="pulse-cta tappable fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+0.5rem)] right-[max(1rem,env(safe-area-inset-right))] z-40 flex h-11 w-11 items-center justify-center rounded-full bg-cta text-xs font-semibold uppercase tracking-wider text-cta-foreground transition-colors duration-200 ease-quint hover:bg-cta/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-auto sm:w-auto sm:justify-start sm:gap-2 sm:px-5 sm:py-3"
      >
        <FileText className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">CV</span>
      </a>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ease-quint ${
        scrolled ? "border-border bg-background/85" : "border-transparent bg-background/30"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"
        aria-label="Main"
      >
        <a
          href="#top"
          className="font-display text-2xl font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Danish.
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary-glow focus-visible:text-primary-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {n}
            </a>
          ))}
          <Button asChild variant="cta" size="sm" className="pulse-cta">
            {/* CV PDF link here */}
            <a href={CV_HREF}>
              <FileText aria-hidden /> View CV
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild variant="cta" size="sm" className="pulse-cta">
            <a href={CV_HREF}>View CV</a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-background">
              <SheetTitle className="font-display text-3xl text-primary-glow">Danish.</SheetTitle>
              <div className="mt-10 flex flex-col gap-6">
                {NAV.map((n) => (
                  <a
                    key={n}
                    href={`#${n.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl font-semibold hover:text-primary-glow"
                  >
                    {n}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative border-b border-border pt-16">
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-12 pt-8 sm:gap-8 sm:py-16 md:grid-cols-[1.35fr_1fr] md:px-8 lg:min-h-[660px] lg:py-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs text-highlight">
            <span className="relative flex h-2 w-2">
              <span className="relative h-2 w-2 rounded-full bg-highlight" />
            </span>
            Available for work · Phnom Penh
          </p>
          <h1 className="hero-wordmark font-bold">
            <SplitWords text="Sary" />
            <br />
            <span className="text-primary-glow">
              <SplitWords text="Danish." />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed sm:text-xl">
            Junior Software Developer from Cambodia,{" "}
            <span className="text-muted-foreground">
              building things that actually work, clean code, real results.
            </span>
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Full-Stack Web Development · REST APIs · React · Laravel · Flask
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild variant="cta" size="lg">
              <a href="#projects">
                View My Work <ArrowUpRight aria-hidden />
              </a>
            </Button>
            <Button asChild variant="blueOutline" size="lg">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <Github />
              </a>
            </Button>
          </div>
        </div>
        <motion.div
          initial={false}
          className="hero-portrait relative mx-auto h-[390px] w-full max-w-[370px] overflow-hidden rounded-lg sm:h-[430px] lg:h-[460px]"
        >
          <img
            src={photo}
            alt="Portrait of Sary Danish"
            width={816}
            height={816}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 max-sm:hidden">
            <p className="font-display text-2xl font-semibold">Sary Danish</p>
            <p className="mt-1 font-mono text-xs text-highlight">Full-Stack Dev</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="portfolio-section relative scroll-mt-16 border-t border-border/60 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

function About() {
  const stats = [
    { n: "4+", l: "Projects Deployed" },
    { n: "2+", l: "Years Learning" },
    { n: "FS", l: "Full-Stack Developer" },
  ];
  return (
    <Section id="about">
      <SectionHeader index="01" kicker="About" title="The person behind the code" />
      <Reveal className="grid items-center gap-8 lg:gap-16 md:grid-cols-[0.7fr_1.5fr]">
        <RevealItem>
          {/* Replace with actual photo: /assets/danish-photo.jpg */}
          <img
            src={photo}
            alt="Sary Danish"
            loading="lazy"
            width={816}
            height={816}
            className="aspect-[4/5] w-full max-w-sm rounded-lg border border-border object-cover "
          />
        </RevealItem>
        <div>
          <RevealItem>
            <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              My name is <span className="font-semibold text-primary-glow">Sary Danish</span>, a
              fourth-year Software Development student at Norton University. I build and deploy web
              applications — from secure REST APIs to responsive frontends with clean UI.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              I enjoy turning real problems into working software and collaborating in teams. My
              goal is to become a highly skilled Full-Stack Developer, building complete, real-world
              Software and web applications that are scalable, maintainable, and genuinely useful to
              people.
            </p>
          </RevealItem>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <RevealItem key={s.l} className="border-t border-border pt-5">
                <p className="font-display text-4xl font-semibold text-highlight">{s.n}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.l}
                </p>
              </RevealItem>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeader index="02" kicker="Stack" title="Technical Skills" />
      <TechnicalSkills />
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <SectionHeader index="03" kicker="Experience" title="Where I've worked" />
      <Reveal className="relative ml-2 border-l-2 border-primary pl-8 md:ml-6 md:pl-12">
        <RevealItem className="relative">
          <span
            className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center bg-background md:-left-[57px]"
            aria-hidden
          >
            <span className="h-3 w-3 rounded-full bg-primary-glow shadow-blue" />
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" aria-hidden /> July 2026 – Present
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> Phnom Penh, Cambodia
            </span>
          </div>
          <h3 className="mt-3 text-3xl font-bold md:text-4xl">
            Frontend & Backend Developer Trainee
          </h3>
          <p className="mt-1 flex items-center gap-2 text-primary-glow">
            <Briefcase className="h-4 w-4" aria-hidden /> ETEC & KruITSolution
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Weekend internship training in web development covering frontend and backend
            technologies. Hands-on practice with real projects.
          </p>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHeader index="04" kicker="Selected work" title="Projects" />
      <Reveal className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <RevealItem key={p.name} className="project-item">
            <SpotlightCard className="project-card group h-full">
              <div className="relative flex h-full flex-col p-6">
                <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden border-b border-border/60 bg-muted/40">
                  {p.shot ? (
                    <img
                      src={p.shot}
                      alt={`${p.name} interface preview`}
                      width={1280}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover object-top"
                    />
                  ) : (
                    <div className="grid aspect-[16/9] place-items-center bg-muted/40">
                      <span className="font-display text-3xl text-muted-foreground/70">
                        {p.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <Code2
                    className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary-glow"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="rounded-full font-mono text-[11px] font-normal"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-5">
                  {!p.demoProtected && (
                    <Button
                      asChild
                      variant="cta"
                      size="lg"
                      className="flex-1 text-sm shadow-blue focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.name} live demo`}
                      >
                        Live Demo <ArrowUpRight aria-hidden />
                      </a>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="blueOutline"
                    size="lg"
                    className="flex-1 border-2 border-primary bg-primary/10 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <a
                      href={GITHUB}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} on GitHub`}
                    >
                      <Github aria-hidden /> GitHub
                    </a>
                  </Button>
                  {p.docs && (
                    <Button asChild variant="ghost" size="sm" className="basis-full text-sm">
                      <a
                        href={p.docs}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.name} API docs`}
                      >
                        <BookOpen aria-hidden /> API Docs
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

function Education() {
  const edu = [
    {
      school: "Norton University",
      degree: "Bachelor of Science in Software Development",
      period: "2023 – Present (Expected 2027)",
      loc: "Phnom Penh, Cambodia",
    },
    {
      school: "ACE (American Culture and English)",
      degree: "English Language Program",
      period: "Completed",
      loc: "Phnom Penh, Cambodia",
    },
  ];
  const courses = ["ETEC Frontend Development Course", "ETEC Backend Development Course"];
  return (
    <Section id="education">
      <SectionHeader index="05" kicker="Education" title="Learning path" />
      <Reveal className="grid gap-5 md:grid-cols-2">
        {edu.map((e) => (
          <RevealItem key={e.school}>
            <Card className="h-full rounded-lg border border-border bg-card p-7 transition-colors duration-200 hover:border-primary-glow/60">
              <GraduationCap className="h-6 w-6 text-primary-glow" aria-hidden />
              <h3 className="mt-5 text-2xl font-bold md:text-3xl">{e.school}</h3>
              <p className="mt-2 text-foreground/90">{e.degree}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {e.period} · {e.loc}
              </p>
            </Card>
          </RevealItem>
        ))}
      </Reveal>
      <Reveal className="mt-10">
        <RevealItem>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Courses completed
          </p>
        </RevealItem>
        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <RevealItem
              key={c}
              className="flex flex-wrap items-center gap-3 border-b border-border py-5"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-glow" aria-hidden />
              <span className="text-sm font-medium">{c}</span>
              <span className="ml-auto text-xs text-muted-foreground">Completed</span>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Awards() {
  return (
    <Section id="awards">
      <SectionHeader index="06" kicker="Awards & Activities" title="Recognition" />
      <Reveal>
        <RevealItem>
          <Card className="flex flex-col gap-5 rounded-lg border border-border bg-card p-7 sm:flex-row sm:items-center">
            <Award className="h-10 w-10 shrink-0 text-primary-glow" aria-hidden />
            <div>
              <h3 className="text-2xl font-bold">AI Expert System Competition 2026</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Participant / Award · Norton University
              </p>
            </div>
          </Card>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:danishsary4@gmail.com?subject=${encodeURIComponent("Portfolio inquiry from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const field =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground backdrop-blur-md placeholder:text-muted-foreground transition-colors duration-200 focus:border-primary-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <Section id="contact">
      <SectionHeader index="07" kicker="Contact" title="Get in touch" />
      <Reveal className="grid gap-12 lg:grid-cols-2">
        <div>
          <RevealItem>
            <p className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Let's build something <span className="text-highlight">together.</span>
            </p>
          </RevealItem>
          <div className="mt-10 space-y-4">
            {[
              { icon: Mail, label: "danishsary4@gmail.com", href: "mailto:danishsary4@gmail.com" },
              { icon: Github, label: "github.com/danishsary8", href: GITHUB },
              { icon: MapPin, label: "Phnom Penh, Cambodia" },
            ].map(({ icon: Icon, label, href }) => (
              <RevealItem key={label}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 text-foreground/90 hover:text-primary-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:text-primary-glow"
                  >
                    <span className="glass grid h-10 w-10 place-items-center rounded-lg group-hover:border-primary-glow/60">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {label}
                  </a>
                ) : (
                  <p className="flex items-center gap-4 text-foreground/90">
                    <span className="glass grid h-10 w-10 place-items-center rounded-lg">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    {label}
                  </p>
                )}
              </RevealItem>
            ))}
          </div>
        </div>
        <RevealItem>
          <form
            onSubmit={onSubmit}
            className="space-y-5 border-t border-border pt-6 lg:border-t-0 lg:pt-0"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                maxLength={100}
                className={field}
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={255}
                className={field}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={2000}
                rows={5}
                className={field}
                placeholder="Tell me about your project"
              />
            </div>
            <Button type="submit" variant="cta" size="lg" className="w-full">
              <Send aria-hidden /> Send Message
            </Button>
            {sent && (
              <p role="status" className="text-center text-xs text-muted-foreground">
                Opening your email app…
              </p>
            )}
          </form>
        </RevealItem>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row md:px-8">
        <p>© 2024 Sary Danish. Built with React & ❤️</p>
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="hover:text-primary-glow"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
