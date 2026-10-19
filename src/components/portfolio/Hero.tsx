import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { EASE_OUT, heroContainerVariants, heroItemVariants } from "@/lib/motion";
import { useLocale } from "@/lib/i18n-ledger";
import photo from "@/assets/danish-photo.jpg";

const GITHUB_URL = "https://github.com/danishsary8";

const CORE_STACK = [
  "Laravel",
  "React & TypeScript",
  "PostgreSQL",
  "REST APIs",
  "Tailwind CSS",
  "Java & Python",
  "Git & GitHub",
];

export function Hero() {
  const { locale, t } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Hardware-accelerated 3D mouse tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25, mass: 0.5 });

  // Strictly clamp tilt to ±5deg (Anti-AI rule)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="top"
      data-blueprint-section="HERO_MASTHEAD // 65:35_SPLIT"
      className="relative w-full bg-base transition-colors duration-150 overflow-hidden"
    >
      {/* 1. Top Broadsheet Masthead Metadata Strip (Edition, Institution, Status) */}
      <div className="border-b border-borderSubtle bg-surface/50 px-5 py-2.5 font-mono text-[11px] text-mutedText">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="font-bold text-primaryText uppercase tracking-wider">
              EDITION // 2026
            </span>
            <span className="hidden sm:inline border-l border-borderSubtle pl-4">
              NORTON UNIVERSITY [YEAR 4]
            </span>
            <span className="hidden md:inline border-l border-borderSubtle pl-4">
              FACULTY OF COMPUTER SCIENCE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            <span className="font-semibold text-primaryText">STATUS: READY FOR INTERNSHIPS</span>
            <span className="hidden sm:inline text-mutedText">[ICT UTC+7]</span>
          </div>
        </div>
      </div>

      {/* 2. Main 12-Column Asymmetric Exposed Structural Grid (7 cols / 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-borderSubtle">
        {/* Left Editorial Column (lg:col-span-7) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 xl:p-16 space-y-8 relative">
          {/* Subtle Corner Registration Crosshair */}
          <div
            className="crosshair-corner absolute top-3 right-3 hidden sm:block opacity-60"
            aria-hidden="true"
          />

          {/* Telemetry Kicker */}
          <motion.div
            variants={heroItemVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="inline-flex items-center"
          >
            <span className="flex items-center font-mono text-xs text-mutedText tracking-wider">
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              {locale === "km"
                ? "រាជធានីភ្នំពេញ កម្ពុជា • និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រឆ្នាំទី ៤ សាកលវិទ្យាល័យន័រតុន"
                : "PHNOM PENH, CAMBODIA • 4TH-YEAR SOFTWARE DEV @ NORTON UNIVERSITY"}
            </span>
          </motion.div>

          {/* Oversized Architectural Headline */}
          <motion.div
            variants={heroItemVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-extrabold uppercase leading-[0.94] tracking-editorial text-primaryText">
              {t.heroHeadline}
            </h1>
          </motion.div>

          {/* Canonical Bio Paragraph */}
          <motion.div
            variants={heroItemVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
          >
            <p className="max-w-2xl font-body text-base md:text-lg leading-relaxed text-mutedText">
              My name is <span className="font-semibold text-primaryText">Sary Danish</span>, a
              fourth-year Software Development student at Norton University, Phnom Penh, Cambodia. I
              build and deploy full-stack web applications — from secure REST APIs to responsive
              React frontends with clean UI. I enjoy turning real problems into working software,
              writing maintainable code, and collaborating in teams. My dream is to become a highly
              skilled Full-Stack Developer, capable of building complete, real-world web
              applications that are scalable, maintainable, and genuinely useful to people.
            </p>
          </motion.div>

          {/* Action Button Matrix */}
          <motion.div
            variants={heroItemVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-brand bg-primaryText px-6 py-3.5 font-mono text-xs font-semibold text-base transition-colors duration-150 hover:bg-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-none"
            >
              <span>Inspect Works</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-brand border border-borderSubtle bg-surface px-6 py-3.5 font-mono text-xs font-medium text-primaryText transition-colors duration-150 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-none"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>Explore GitHub</span>
            </a>
          </motion.div>

          {/* Core Tech Stack Ledger Strip */}
          <motion.div
            variants={heroItemVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="pt-6 border-t border-borderSubtle flex flex-wrap items-center gap-2 sm:gap-2.5 font-mono text-[11px] text-mutedText"
          >
            <span className="font-semibold text-primaryText mr-1">TECH LEDGER:</span>
            {CORE_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-brand border border-borderSubtle bg-surface px-2.5 py-1 text-primaryText transition-colors hover:border-gold/50"
              >
                [{tech}]
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Portrait & Architectural Node Stage (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-surface/30 p-6 sm:p-10 lg:p-12 flex flex-col justify-between items-center relative">
          {/* Visual Registration Crosshairs on Right Column */}
          <div className="crosshair-corner absolute top-3 left-3 opacity-60" aria-hidden="true" />
          <div
            className="crosshair-corner absolute bottom-3 right-3 opacity-60"
            aria-hidden="true"
          />

          {/* Top Stage Specification Plate */}
          <div className="w-full flex items-center justify-between border-b border-borderSubtle pb-3 mb-6 font-mono text-[11px] text-mutedText">
            <span className="font-semibold text-primaryText">ORTHOGRAPHIC VIEWPORT // KH-01</span>
            <span className="tabular-nums">COORD: 11.5564° N, 104.9282° E</span>
          </div>

          {/* 3D Tactile Portrait Container */}
          <div
            style={{ perspective: 1000 }}
            className="w-full max-w-[360px] sm:max-w-[380px] my-auto"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={
                shouldReduceMotion
                  ? {}
                  : {
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }
              }
              className="group relative rounded-brand border border-borderSubtle bg-card p-3 shadow-none transition-colors duration-200"
            >
              <div className="relative h-[380px] sm:h-[420px] w-full overflow-hidden rounded-[2px] bg-surface">
                <img
                  src={photo}
                  alt="Sary Danish — Junior Full-Stack Developer & Software Development Student"
                  width={816}
                  height={816}
                  fetchPriority="high"
                  className="h-full w-full object-cover grayscale contrast-110 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:contrast-100"
                />

                {/* Flat Solid Architectural Frame */}
                <div className="pointer-events-none absolute inset-0 border border-borderSubtle/50" />

                {/* Floating Technical Telemetry Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-brand border border-borderSubtle bg-base px-3 py-2 font-mono text-[10px] text-primaryText">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <span className="font-semibold">STATUS: READY FOR INTERNSHIPS</span>
                  </div>
                  <span className="text-mutedText">ICT UTC+7</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Dossier Index Plate */}
          <div className="w-full border-t border-borderSubtle pt-4 mt-6 grid grid-cols-2 gap-4 font-mono text-[11px] text-mutedText">
            <div>
              <span className="block text-[10px] text-mutedText uppercase">PRIMARY FOCUS</span>
              <span className="font-medium text-primaryText">Full-Stack / REST & React</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-mutedText uppercase">LOCATION</span>
              <span className="font-medium text-primaryText">Phnom Penh, Cambodia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
