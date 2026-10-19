import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, PROFILE } from "@/content/portfolio";
import { useTheme } from "@/lib/use-theme";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function SiteNav() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeLabel = dark ? "Switch to light theme" : "Switch to dark theme";
  const ThemeIcon = dark ? Sun : Moon;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`glass-panel mx-auto flex max-w-[1240px] items-center justify-between gap-3 py-1.5 pl-4 pr-1.5 transition-shadow duration-300 ${
          scrolled ? "glass-elevated" : ""
        }`}
      >
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-2.5 rounded-control font-display text-[17px] font-bold tracking-[-0.02em] text-primaryText"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-[9px] bg-primaryText font-display text-[11px] font-extrabold tracking-[-0.02em] text-[var(--bg-base)]"
          >
            SD
          </span>
          <span className="hidden sm:inline">{PROFILE.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-flex min-h-11 items-center rounded-control px-3.5 text-[14px] font-medium transition-colors ${
                    isActive ? "text-primaryText" : "text-mutedText hover:text-primaryText"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 bottom-2 h-px bg-gold transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label={themeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-control text-mutedText transition-colors hover:bg-[var(--glass-surface-strong)] hover:text-primaryText"
          >
            <ThemeIcon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden h-11 items-center rounded-control bg-gold px-4 text-[14px] font-semibold text-[#0A0A0A] transition-[background-color,transform] duration-150 hover:bg-gold-hover active:scale-[0.98] sm:inline-flex"
          >
            Email me
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-control text-primaryText transition-colors hover:bg-[var(--glass-surface-strong)] md:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[86vw] max-w-sm flex-col pt-20">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <ul className="flex flex-col">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center font-display text-[32px] font-bold tracking-[-0.03em] text-primaryText"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${PROFILE.email}`}
                className="mt-auto inline-flex h-12 items-center justify-center rounded-control bg-gold px-5 text-[15px] font-semibold text-[#0A0A0A]"
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
