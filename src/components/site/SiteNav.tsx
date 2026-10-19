import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, PROFILE } from "@/content/portfolio";
import { useTheme } from "@/lib/use-theme";
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

  // Clean, architectural display wordmark without the circular badge
  const logoNode = (
    <span className="font-display text-[13px] sm:text-[14px] font-extrabold tracking-[0.06em] text-fg uppercase whitespace-nowrap pl-1 pr-3 select-none">
      {PROFILE.name}
    </span>
  );

  // Clean right actions: Theme switch and mobile menu toggle
  const rightActionsNode = (
    <div className="flex items-center gap-0.5 pr-1">
      {/* Theme Switcher */}
      <button
        type="button"
        onClick={toggle}
        aria-label={themeLabel}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
      >
        <ThemeIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>

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
                    onClick={() => setOpen(false)}
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
          itemStyle="default"
          hoverEffect="fill"
          indicator="dot"
          theme={dark ? "dark" : "light"}
          highlightColor={dark ? "#c9973a" : "#b0822d"}
          highlightTextColor={dark ? "#0a0a0b" : "#ffffff"}
          rightActions={rightActionsNode}
          className={`transition-all duration-300 ${scrolled ? "shadow-float scale-[0.99]" : ""}`}
        />
      </div>
    </header>
  );
}

export default SiteNav;
