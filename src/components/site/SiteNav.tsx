import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, PROFILE } from "@/content/portfolio";
import { SPRING_UI } from "@/lib/motion";
import { useTheme } from "@/lib/use-theme";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

function useActiveSection() {
  const [active, setActive] = useState<string>(SECTION_IDS[0] ?? "");
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function SiteNav() {
  const { dark, toggle } = useTheme();
  const reduce = useReducedMotion();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ThemeIcon = dark ? Sun : Moon;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5 sm:px-6 lg:grid lg:h-[72px] lg:grid-cols-[1fr_auto_1fr]"
      >
        <a
          href="#home"
          className="flex min-h-11 items-center gap-2.5 justify-self-start text-[15px] font-semibold tracking-[-0.01em] text-fg"
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-[7px] bg-fg font-mono text-[11px] font-medium text-bg"
          >
            SD
          </span>
          {PROFILE.name}
        </a>

        <ul className="nav-track hidden items-center gap-0.5 rounded-full p-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <li key={l.href} className="relative">
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden="true"
                    transition={reduce ? { duration: 0 } : SPRING_UI}
                    className="nav-thumb absolute inset-0 rounded-full"
                  />
                ) : null}
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-flex h-9 items-center rounded-full px-4 text-[13.5px] font-medium tracking-[-0.005em] transition-[color,background-color] duration-150 ${
                    isActive ? "text-fg" : "text-fg-muted hover:bg-fg/[0.035] hover:text-fg"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 justify-self-end">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="nav-track press inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-[color,transform] duration-150 hover:text-fg"
          >
            <ThemeIcon className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <a
            href="#contact"
            className="press group hidden h-11 items-center gap-1.5 rounded-full bg-fg pl-5 pr-4 text-[13.5px] font-medium text-bg transition-[opacity,transform] duration-150 hover:opacity-90 sm:inline-flex"
          >
            Get in touch
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-px group-hover:-translate-y-px"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="press inline-flex h-11 w-11 items-center justify-center rounded-control text-fg lg:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[84vw] max-w-sm flex-col pt-20">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center border-b border-line text-[20px] font-medium tracking-[-0.02em] ${
                        active === l.href.slice(1) ? "text-fg" : "text-fg-muted"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${PROFILE.email}`}
                className="press mt-auto inline-flex h-11 items-center justify-center rounded-control bg-fg text-[15px] font-medium text-bg"
              >
                Email me
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
