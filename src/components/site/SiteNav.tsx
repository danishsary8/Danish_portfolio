import { useEffect, useState } from "react";
import { FileText, Moon, Sun } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/content/portfolio";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";
import { useTheme } from "@/lib/use-theme";
import { PillNav } from "@/components/ui/PillNav";
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
  const isHero = !active || active === "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themeLabel = dark ? "Switch to light theme" : "Switch to dark theme";

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
        height="6.5rem"
        strength={4.5}
        layers={10}
        curve="linear"
        exponential
        tint="var(--nav-tint)"
        autoHide
        zIndex={40}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 transition-all duration-200 pointer-events-none ${
          scrolled ? "bg-bg/85 backdrop-blur-xl border-b border-line/40 shadow-xs" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto grid max-w-[1240px] grid-cols-[1fr_auto_1fr] items-center pointer-events-auto"
        >
        {/* Left: "DANISH" wordmark (owner request), with a crisp letterpress shadow and hero underline. */}
        <div className="flex items-center justify-start">
          <a
            href="#home"
            aria-label={`${PROFILE.name}, back to top`}
            title={PROFILE.name}
            className="group relative inline-flex flex-col items-center py-1.5 select-none rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus"
          >
            <span aria-hidden="true" className="nav-wordmark font-poster text-[17px] font-extrabold uppercase leading-none tracking-[0.14em] sm:text-[18px]">
              {PROFILE.shortName}
            </span>
            <span
              aria-hidden="true"
              className={`absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gold shadow-[0_0_8px_var(--gold)] transition-all duration-300 ease-[var(--ease-out)] ${
                isHero ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
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
            indicator="underline"
            collapse="never"
            ariaLabel="Sections"
            theme="auto"
            highlightColor="var(--gold)"
            highlightTextColor="var(--nav-pill-ink)"
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
            padColor="var(--sl-c-pad)"
            iconColor="var(--sl-c-icon)"
            accentColor="var(--gold)"
            wellColor="var(--sl-c-well)"
            bandColor="var(--sl-c-band)"
            shadow="var(--sl-c-shadow)"
            flight={70}
            particles={8}
            className="group"
          >
            {/* Both icons render; CSS picks one from the `dark` class so the first paint is right. */}
            <Sun
              className="hidden h-4.5 w-4.5 text-fg transition-transform duration-300 group-hover:rotate-12 group-hover:text-gold dark:block"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            <Moon
              className="h-4.5 w-4.5 text-fg transition-transform duration-300 group-hover:rotate-12 group-hover:text-gold dark:hidden"
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
