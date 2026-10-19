import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, PROFILE } from "@/content/portfolio";
import { useTheme } from "@/lib/use-theme";
import { PillNav } from "@/components/ui/PillNav";
import { ShinyText } from "@/components/ui/ShinyText";
import { SlingButton } from "@/components/ui/SlingButton";

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 transition-all duration-200 pointer-events-none ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line/40 shadow-xs" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[1240px] grid-cols-[1fr_auto_1fr] items-center pointer-events-auto"
      >
        {/* Left: Brand Name outside the pill */}
        <div className="flex items-center justify-start">
          <a
            href="#home"
            className="inline-flex items-center py-1.5 transition-opacity hover:opacity-80 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm"
          >
            <ShinyText
              text={PROFILE.name}
              color={dark ? "#a1a1aa" : "#18181b"}
              shineColor={dark ? "#ffffff" : "#c9973a"}
              speed={2}
              delay={0.5}
              shineWidth={65}
              softness={0.5}
              glow={0.7}
              trigger="loop"
              className="font-display text-[15px] sm:text-[16px] font-extrabold tracking-[0.05em] uppercase whitespace-nowrap"
            />
          </a>
        </div>

        {/* Center: Dedicated Floating Pill Navigation Capsule */}
        <div className="hidden md:flex justify-center">
          <PillNav
            items={navItems}
            activeHref={active ? `#${active}` : undefined}
            layout="joined"
            surface="glass"
            itemStyle="default"
            hoverEffect="fill"
            indicator="dot"
            collapse="never"
            ariaLabel="Sections"
            theme={dark ? "dark" : "light"}
            highlightColor={dark ? "#c9973a" : "#b0822d"}
            highlightTextColor={dark ? "#0a0a0b" : "#ffffff"}
            className={`transition-all duration-300 shadow-float ${scrolled ? "scale-[0.99] ring-1 ring-line/30" : ""}`}
          />
        </div>

        {/* Right: Theme Toggle & Mobile Menu outside the pill */}
        <div className="flex items-center justify-end gap-2">
          {/* Theme Switcher SlingButton */}
          <SlingButton
            onSend={toggle}
            ariaLabel={themeLabel}
            padColor={dark ? "#1c1c20" : "#ffffff"}
            iconColor={dark ? "#EDEDEF" : "#111113"}
            accentColor={dark ? "#c9973a" : "#b0822d"}
            wellColor={dark ? "#111113" : "#e4e4e7"}
            bandColor={dark ? "#c9973a" : "#b0822d"}
            size={40}
            strokeWidth={2.5}
            armAt={32}
            maxPull={110}
            launchSpeed={2600}
            recoil={0.2}
            flight={100}
            particles={14}
            spread={60}
            axis="any"
            tapSends={true}
            className="shadow-2xs"
          >
            <ThemeIcon className="h-4.5 w-4.5 transition-transform duration-200" strokeWidth={2} aria-hidden="true" />
          </SlingButton>

          {/* Mobile Menu trigger (Sheet drawer) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-line bg-surface/80 backdrop-blur-md text-fg transition-all duration-150 hover:border-line-strong hover:bg-surface shadow-xs md:hidden active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
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
      </nav>
    </header>
  );
}

export default SiteNav;
