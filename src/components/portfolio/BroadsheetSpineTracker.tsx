import React, { useEffect, useState, useCallback } from "react";

interface SectionAnchor {
  id: string;
  code: string;
  label: string;
}

const SECTIONS: SectionAnchor[] = [
  { id: "top", code: "TOP", label: "HERO" },
  { id: "capabilities", code: "SYS", label: "STACK" },
  { id: "projects", code: "WRK", label: "PROJECTS" },
  { id: "experience", code: "EXP", label: "LEDGER" },
  { id: "role-alignment-engine", code: "ROL", label: "ROLE" },
  { id: "contact", code: "DSP", label: "DISPATCH" },
];

export function BroadsheetSpineTracker() {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Compute scroll percentage and active viewport section
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100))) : 0;
    setScrollProgress(progress);

    // Identify current active section based on scroll offset
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = SECTIONS[i];
      if (!section) continue;
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Broadsheet Section and Scroll Depth Index"
      className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-1.5 font-mono text-[10px]"
    >
      <div className="flex flex-col items-stretch rounded-brand border border-borderSubtle bg-card/90 backdrop-none p-1.5 divide-y divide-borderSubtle shadow-none">
        {/* Section Ticks */}
        <div className="flex flex-col gap-1 pb-1.5">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollTo(sec.id)}
                aria-label={`Jump to section ${sec.label}`}
                className={`flex items-center justify-between gap-2.5 px-2 py-1 rounded-[2px] transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "bg-gold text-[#0A0A0A] font-bold"
                    : "text-mutedText hover:bg-surface hover:text-primaryText"
                }`}
              >
                <span className="tracking-wider">{sec.code}</span>
                <span className="text-[9px] opacity-80">// {sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Progress Metric Readout */}
        <div className="pt-1.5 px-2 flex items-center justify-between gap-2 text-mutedText">
          <span className="text-[9px] uppercase">READ:</span>
          <span className="tabular-nums font-semibold text-primaryText">
            {String(scrollProgress).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </nav>
  );
}
