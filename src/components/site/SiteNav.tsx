import { useEffect, useState } from "react";
import { FileText, Moon, Sun } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/content/portfolio";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useTheme } from "@/lib/use-theme";
import { PillNav } from "@/components/ui/PillNav";
import { GradientText } from "@/components/ui/GradientText";
import { SlingButton } from "@/components/ui/SlingButton";
import { GradualBlur } from "@/components/ui/GradualBlur";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const allIds = ["home", ...SECTION_IDS];
    const els = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!els.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (e.target.id === "home") {
              setActive("");
            } else {
              setActive(e.target.id);
            }
          }
        }
      },
      { rootMargin: "-30% 0px -50% 0px" },
    );

    els.forEach((el) => io.observe(el));

    const handleScroll = () => {
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.45) {
          setActive("");
        }
      } else if (window.scrollY < 200) {
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return active;
}

export function SiteNav() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
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
    <>
      {/* Progressive Stepped Gradual Blur underneath the top nav bar */}
      <GradualBlur
        position="top"
        target="page"
        height="6rem"
        strength={2}
        layers={8}
        curve="linear"
        exponential
        tint={dark ? "rgba(18, 15, 23, 0.6)" : "rgba(251, 251, 250, 0.65)"}
        autoHide
        zIndex={40}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 transition-all duration-200 pointer-events-none ${
          scrolled ? "border-b border-line/30 shadow-xs" : "bg-transparent"
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
            <GradientText
              colors={
                dark
                  ? ["#EDEDEF", "#C9973A", "#FFFFFF", "#C9973A"]
                  : ["#111113", "#B0822D", "#27272A", "#85601F"]
              }
              animationSpeed={8}
              variant="flow"
              glow={0.35}
              className="font-display nav-brand-text text-[15px] sm:text-[16px] font-extrabold tracking-[0.05em] uppercase whitespace-nowrap"
            >
              {PROFILE.name}
            </GradientText>
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

        {/* Right: Download CV & SlingButton Theme Toggle */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3">
          {/* Download CV Pill Button */}
          {CV_HREF ? (
            <a
              href={CV_HREF}
              {...getCvLinkProps()}
              className="ios-glass-pill ios-glass-pill-interactive cursor-target group inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 px-3.5 sm:px-4 text-[12.5px] sm:text-[13px] font-semibold text-fg tracking-tight select-none press shadow-2xs"
              aria-label="Download CV"
            >
              <FileText
                className="h-3.5 w-3.5 text-fg-subtle transition-colors duration-150 group-hover:text-gold"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </a>
          ) : null}

          {/* ReactBits SlingButton Theme Toggle */}
          <SlingButton
            onSend={toggle}
            ariaLabel={themeLabel}
            size={38}
            strokeWidth={2}
            padColor={dark ? "#18181B" : "#FFFFFF"}
            iconColor={dark ? "#EDEDEF" : "#111113"}
            accentColor={dark ? "#C9973A" : "#B0822D"}
            wellColor={dark ? "#27272A" : "#E5E5E3"}
            bandColor={dark ? "rgba(255,255,255,0.35)" : "rgba(10,10,12,0.3)"}
            shadow={
              dark
                ? "0 4px 14px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.16)"
                : "0 3px 10px -1px rgba(10, 10, 12, 0.16), 0 1px 3px 0 rgba(10, 10, 12, 0.1), 0 0 0 1px rgba(10, 10, 12, 0.12)"
            }
            flight={70}
            particles={8}
            className="group"
          >
            <ThemeIcon
              className="h-4.5 w-4.5 text-fg transition-transform duration-300 group-hover:rotate-12 group-hover:text-gold"
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </SlingButton>
        </div>
      </nav>
    </header>
  </>
);
}

export default SiteNav;
