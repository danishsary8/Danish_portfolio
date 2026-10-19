import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, PROFILE } from "@/content/portfolio";
import { useTheme } from "@/lib/use-theme";
import { useSoundEffect } from "@/lib/sound";
import { PillNav } from "@/components/ui/PillNav";

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
  const { soundEnabled, toggleSound, playClick } = useSoundEffect();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeLabel = dark ? "Switch to light theme" : "Switch to dark theme";
  const ThemeIcon = dark ? Sun : Moon;

  const navItems = NAV_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
  }));

  const logoNode = (
    <div className="flex items-center gap-2 pr-1.5 select-none">
      <span
        aria-hidden="true"
        className="grid h-7 w-7 place-items-center rounded-full bg-fg font-mono text-[11px] font-semibold text-bg shadow-xs transition-transform duration-200 hover:scale-105"
      >
        SD
      </span>
      <span className="font-display text-[13px] sm:text-[14px] font-bold tracking-[0.03em] text-fg uppercase whitespace-nowrap">
        {PROFILE.name}
      </span>
    </div>
  );

  const rightActionsNode = (
    <div className="flex items-center gap-1 pl-1">
      {/* Sound / Equalizer feedback toggle */}
      <button
        type="button"
        onClick={() => {
          toggleSound();
        }}
        aria-label={soundEnabled ? "Mute audio feedback" : "Enable audio feedback"}
        title={soundEnabled ? "Audio on — click to mute" : "Audio off — click to enable"}
        className="inline-flex h-8 items-center gap-1.5 rounded-full px-2 text-fg-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
      >
        {soundEnabled ? (
          <Volume2 className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <VolumeX className="h-3.5 w-3.5 opacity-60" strokeWidth={1.75} aria-hidden="true" />
        )}
        {/* Tactile animated equalizer bars */}
        <span
          className="flex h-3.5 items-end gap-[2px] overflow-hidden px-0.5"
          aria-hidden="true"
        >
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              soundEnabled ? "bg-gold eq-bar-1" : "h-[3px] bg-fg-muted opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              soundEnabled ? "bg-gold eq-bar-2" : "h-[3px] bg-fg-muted opacity-40"
            }`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              soundEnabled ? "bg-gold eq-bar-3" : "h-[3px] bg-fg-muted opacity-40"
            }`}
          />
        </span>
      </button>

      <span className="mx-0.5 h-3.5 w-px bg-line opacity-60" aria-hidden="true" />

      {/* Theme Switcher */}
      <button
        type="button"
        onClick={() => {
          playClick();
          toggle();
        }}
        aria-label={themeLabel}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
      >
        <ThemeIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>

      {/* Quick Get in touch / Contact action on desktop */}
      <a
        href="#contact"
        onClick={() => playClick()}
        className="hidden xl:inline-flex h-8 items-center rounded-full bg-fg px-3.5 text-[12px] font-semibold tracking-wider uppercase text-bg transition-[background-color,transform] duration-150 hover:opacity-90 active:scale-[0.98] shadow-xs ml-1"
      >
        Get in touch
      </a>

      {/* Mobile Menu trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface lg:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
          >
            <Menu className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-[84vw] max-w-sm flex-col pt-20">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => {
              const isItemActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => {
                      playClick();
                      setOpen(false);
                    }}
                    className={`flex min-h-12 items-center border-b border-line text-[20px] font-medium tracking-tight transition-colors ${
                      isItemActive ? "text-fg font-semibold" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={`mailto:${PROFILE.email}`}
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex h-11 items-center justify-center rounded-full bg-fg px-5 text-[14px] font-bold tracking-wider uppercase text-bg shadow-md transition-opacity hover:opacity-90"
          >
            Email me
          </a>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4 pointer-events-none">
      <div className="pointer-events-auto">
        <PillNav
          logo={logoNode}
          logoAlt={PROFILE.name}
          logoHref="#home"
          items={navItems}
          activeHref={active ? `#${active}` : undefined}
          layout="joined"
          surface="glass"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          theme={dark ? "dark" : "light"}
          highlightColor={dark ? "#c9973a" : "#b0822d"}
          highlightTextColor={dark ? "#0a0a0b" : "#ffffff"}
          onItemClick={() => playClick()}
          rightActions={rightActionsNode}
          className={`transition-all duration-300 ${scrolled ? "shadow-float scale-[0.99]" : ""}`}
        />
      </div>
    </header>
  );
}

export default SiteNav;
