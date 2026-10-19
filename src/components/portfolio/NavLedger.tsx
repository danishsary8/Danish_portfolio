import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  ArrowUpRight,
  FileText,
  Github,
  Terminal,
  Languages,
  Compass,
  Zap,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { getCvLinkProps, CV_HREF } from "@/components/portfolio/cv-link";
import { useLocale } from "@/lib/i18n-ledger";
import { EASE_OUT, EASE_SNAPPY, DURATION } from "@/lib/motion";

const GITHUB_URL = "https://github.com/danishsary8";

export interface NavLedgerProps {
  onOpenCommand?: () => void;
}

export function NavLedger({ onOpenCommand }: NavLedgerProps = {}) {
  const { locale, toggleLocale, t } = useLocale();
  const [phnomPenhTime, setPhnomPenhTime] = useState<string>("");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent));
    }
  }, []);

  // Live ICT UTC+7 Clock (24-Hour Tabular Precision)
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Phnom_Penh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      setPhnomPenhTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync with persistent theme
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { label: t.navProjects, href: "#projects" },
    { label: t.navCapabilities, href: "#capabilities" },
    { label: t.navTrajectory, href: "#experience" },
    { label: t.navDispatch, href: "#contact" },
  ];

  const cvProps = getCvLinkProps(CV_HREF === "#" ? "/sary-danish-cv.pdf" : CV_HREF);

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-borderSubtle bg-base/95 backdrop-none transition-colors duration-150"
    >
      <div className="flex h-14 w-full items-stretch justify-between divide-x divide-borderSubtle">
        {/* Cell 1: Brand / Identity + Flag [KH-PNH] */}
        <div className="flex items-center px-4 sm:px-6">
          <a
            href="#"
            className="flex items-center gap-2 font-display text-sm font-extrabold tracking-tight text-primaryText transition-colors duration-150 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
          >
            <span className="h-2 w-2 bg-gold" aria-hidden="true" />
            <span>{locale === "km" ? "សារី ដានីស (Sary Danish)" : "SARY DANISH"}</span>
          </a>
          <span className="ml-3 hidden border-l border-borderSubtle pl-3 font-mono text-[10px] uppercase tracking-widest text-mutedText xl:inline-block">
            {t.roleKicker}
          </span>
        </div>

        {/* Cell 2: Live ICT UTC+7 Clock & Trainee Status (Tablet/Desktop) */}
        <div className="hidden items-center gap-4 px-4 font-mono text-[11px] lg:flex">
          <div className="flex items-center text-mutedText">
            <span className="text-[10px] tracking-wider text-mutedText">
              PHNOM PENH, KH [ICT UTC+7]
            </span>
            <span className="ml-2 font-mono font-medium tabular-nums text-primaryText">
              {phnomPenhTime || "12:00:00"}
            </span>
          </div>

          <div className="flex items-center border-l border-borderSubtle pl-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span className="font-mono text-[10px] font-medium text-primaryText">
              TRAINEE @ ETEC & KruITSolution
            </span>
          </div>
        </div>

        {/* Cell 3: Navigation Matrix with Linear Chord Badges */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center divide-x divide-borderSubtle font-body text-xs font-medium text-mutedText md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex h-full items-center px-4 transition-colors duration-150 hover:bg-surface hover:text-primaryText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Cell 4: Utility Controls Strip (X-Ray, CMD trigger, i18n, Theme, CV) */}
        <div className="flex items-center divide-x divide-borderSubtle px-2 sm:px-0">
          {/* Lighthouse & Core Web Vitals Trigger Button */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("portfolio:open-perf-modal"));
            }}
            aria-label="Open Lighthouse and Core Web Vitals Benchmark Suite"
            className="hidden sm:flex h-full items-center gap-1.5 px-3 font-mono text-[11px] text-mutedText hover:bg-surface hover:text-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span className="font-mono font-medium">PERF</span>
            <kbd className="rounded-[2px] border border-borderSubtle bg-card px-1 py-0.5 text-[9px] text-mutedText">
              G P
            </kbd>
          </button>

          {/* Blueprint X-Ray Mode Toggle Button */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("portfolio:toggle-blueprint-xray"));
            }}
            aria-label="Toggle Architectural Blueprint X-Ray Mode"
            className="hidden sm:flex h-full items-center gap-1.5 px-3 font-mono text-[11px] text-mutedText hover:bg-surface hover:text-gold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer"
          >
            <Compass className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span className="font-mono font-medium">X-RAY</span>
            <kbd className="rounded-[2px] border border-borderSubtle bg-card px-1 py-0.5 text-[9px] text-mutedText">
              G B
            </kbd>
          </button>

          {/* Command Palette Trigger Button */}
          <button
            type="button"
            onClick={() => {
              if (onOpenCommand) {
                onOpenCommand();
              } else {
                window.dispatchEvent(new CustomEvent("portfolio:open-command-ledger"));
              }
            }}
            aria-label="Open command palette"
            className="flex h-full items-center gap-1.5 px-3 font-mono text-[11px] text-mutedText hover:bg-surface hover:text-primaryText transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer"
          >
            <Terminal className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span className="hidden sm:inline font-mono font-medium">CMD</span>
            <kbd className="rounded-[2px] border border-borderSubtle bg-card px-1 py-0.5 text-[9px] text-mutedText">
              {isMac ? "⌘K" : "Ctrl+K"}
            </kbd>
          </button>

          {/* Bilingual Language Switcher Button */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label="Switch language between English and Khmer"
            className="flex h-full items-center gap-1.5 px-3 font-mono text-[11px] text-primaryText hover:bg-surface transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer"
          >
            <Languages className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span className={locale === "en" ? "font-bold text-gold" : "text-mutedText"}>EN</span>
            <span className="text-mutedText">/</span>
            <span className={locale === "km" ? "font-bold text-gold" : "text-mutedText"}>
              ខ្មែរ
            </span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-full w-12 place-items-center text-primaryText hover:bg-surface transition-colors duration-150 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "dark" : "light"}
                {...(shouldReduceMotion
                  ? { initial: false }
                  : {
                      initial: { opacity: 0, scale: 0.95 },
                      exit: { opacity: 0, scale: 0.95 },
                    })}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: DURATION.instant, ease: EASE_SNAPPY }}
                className="grid place-items-center"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Canonical CV Action Button */}
          <a
            {...cvProps}
            aria-label="View or download CV"
            className="hidden sm:flex h-full items-center gap-1.5 bg-primaryText px-4 font-mono text-xs font-semibold text-base transition-colors duration-150 hover:bg-gold hover:text-primaryText focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus shadow-none"
          >
            <span>RESUME</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          {/* Mobile Drawer Trigger */}
          <div className="flex h-full items-center md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open mobile navigation"
                  className="grid h-9 w-9 place-items-center rounded-brand border border-borderSubtle bg-surface text-primaryText transition-colors duration-150 hover:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus cursor-pointer"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-[300px] flex-col justify-between border-l border-borderSubtle bg-base p-6 shadow-2xl"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between border-b border-borderSubtle pb-4">
                    <SheetTitle className="font-display text-base font-bold text-primaryText">
                      {locale === "km" ? "សារី ដានីស (Sary Danish)" : "SARY DANISH"}
                    </SheetTitle>
                  </div>
                  <SheetDescription className="sr-only">
                    Mobile navigation and Phnom Penh engineering telemetry
                  </SheetDescription>

                  {/* Telemetry Block */}
                  <div className="mb-6 space-y-2 border-b border-borderSubtle pb-6 font-mono text-xs text-mutedText">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                      <span className="font-medium text-primaryText">
                        TRAINEE @ ETEC & KruITSolution
                      </span>
                    </div>
                    <div className="text-[11px] text-mutedText">
                      PHNOM PENH [ICT UTC+7]:{" "}
                      <span className="font-medium tabular-nums text-primaryText">
                        {phnomPenhTime || "12:00:00"}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav
                    aria-label="Mobile Navigation"
                    className="flex flex-col gap-3 font-mono text-sm"
                  >
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-brand px-2 py-2 text-mutedText transition-colors hover:bg-surface hover:text-primaryText"
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                </div>

                {/* Mobile Bottom Actions */}
                <div className="space-y-3 pt-6 border-t border-borderSubtle">
                  {/* Lighthouse & Core Web Vitals in Mobile Drawer */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      window.dispatchEvent(new CustomEvent("portfolio:open-perf-modal"));
                    }}
                    className="flex w-full items-center justify-between rounded-brand border border-borderSubtle bg-surface px-3 py-2 text-left font-mono text-xs text-primaryText transition-colors hover:border-gold hover:text-gold cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gold" />
                      <span>LIGHTHOUSE &amp; PERF</span>
                    </span>
                    <span className="font-bold text-gold">[G+P]</span>
                  </button>

                  {/* Blueprint X-Ray Mode in Mobile Drawer */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      window.dispatchEvent(new CustomEvent("portfolio:toggle-blueprint-xray"));
                    }}
                    className="flex w-full items-center justify-between rounded-brand border border-borderSubtle bg-surface px-3 py-2 text-left font-mono text-xs text-primaryText transition-colors hover:border-gold hover:text-gold cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-gold" />
                      <span>BLUEPRINT X-RAY</span>
                    </span>
                    <span className="font-bold text-gold">[G+B]</span>
                  </button>

                  {/* Language Toggle in Mobile Drawer */}
                  <button
                    type="button"
                    onClick={toggleLocale}
                    className="flex w-full items-center justify-between rounded-brand border border-borderSubtle bg-surface px-3 py-2 text-left font-mono text-xs text-primaryText transition-colors hover:border-gold hover:text-gold cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-gold" />
                      <span>{t.language}</span>
                    </span>
                    <span className="font-bold text-gold">
                      {locale === "en" ? "EN" : "ខ្មែរ (KM)"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      if (onOpenCommand) {
                        onOpenCommand();
                      } else {
                        window.dispatchEvent(new CustomEvent("portfolio:open-command-ledger"));
                      }
                    }}
                    className="flex w-full items-center justify-between rounded-brand border border-borderSubtle bg-surface px-3 py-2 text-left font-mono text-xs text-primaryText transition-colors hover:border-gold hover:text-gold cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-gold" />
                      <span>COMMAND PALETTE</span>
                    </span>
                    <kbd className="rounded-[2px] border border-borderSubtle bg-card px-1.5 py-0.5 text-[10px] text-mutedText">
                      {isMac ? "⌘K" : "Ctrl+K"}
                    </kbd>
                  </button>

                  <SheetClose asChild>
                    <a
                      {...cvProps}
                      onClick={() => setMobileOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-brand bg-primaryText py-2.5 font-mono text-xs font-medium text-base transition-colors hover:bg-gold hover:text-primaryText"
                    >
                      <FileText className="h-4 w-4" />
                      <span>DOWNLOAD CV</span>
                    </a>
                  </SheetClose>

                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-brand border border-borderSubtle bg-surface py-2 font-mono text-xs font-medium text-primaryText transition-colors hover:border-gold hover:text-gold"
                  >
                    <Github className="h-4 w-4" />
                    <span>GITHUB PROFILE</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
