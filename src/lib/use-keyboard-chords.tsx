import React, { useEffect, useState, useRef, useCallback } from "react";

export interface ChordActionOptions {
  onOpenTopology?: () => void;
  onOpenAdr?: (adrId?: string) => void;
  onOpenQueryPlan?: (benchmarkId?: string) => void;
  onOpenInfra?: (profileId?: string) => void;
  onOpenPerf?: () => void;
}

export function useKeyboardChords(options: ChordActionOptions = {}) {
  const [isChordActive, setIsChordActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearChord = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsChordActive(false);
  }, []);

  const executeTarget = useCallback(
    (key: string) => {
      switch (key.toLowerCase()) {
        case "p": {
          if (options.onOpenPerf) {
            options.onOpenPerf();
          } else {
            window.dispatchEvent(new CustomEvent("portfolio:open-perf-modal"));
          }
          break;
        }
        case "w": {
          const el = document.getElementById("projects");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        case "c": {
          const el = document.getElementById("capabilities");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        case "e": {
          const el = document.getElementById("experience");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        case "d": {
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        case "t": {
          const el = document.getElementById("main-content") || document.documentElement;
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        case "s": {
          if (options.onOpenTopology) {
            options.onOpenTopology();
          } else {
            window.dispatchEvent(new CustomEvent("portfolio:open-topology-modal"));
          }
          break;
        }
        case "q": {
          if (options.onOpenQueryPlan) {
            options.onOpenQueryPlan("bookly");
          } else {
            window.dispatchEvent(
              new CustomEvent("portfolio:open-query-plan-modal", {
                detail: { benchmarkId: "bookly" },
              }),
            );
          }
          break;
        }
        case "a": {
          if (options.onOpenAdr) {
            options.onOpenAdr("adr-001");
          } else {
            window.dispatchEvent(
              new CustomEvent("portfolio:open-adr-modal", { detail: { adrId: "adr-001" } }),
            );
          }
          break;
        }
        case "l": {
          window.dispatchEvent(new CustomEvent("portfolio:toggle-locale"));
          break;
        }
        case "m": {
          window.dispatchEvent(new CustomEvent("portfolio:toggle-diagnostics"));
          break;
        }
        case "b": {
          window.dispatchEvent(new CustomEvent("portfolio:toggle-blueprint-xray"));
          break;
        }
        case "x": {
          const el = document.getElementById("code-craft-matrix");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        case "i": {
          if (options.onOpenInfra) {
            options.onOpenInfra("bookly");
          } else {
            window.dispatchEvent(
              new CustomEvent("portfolio:open-deployment-modal", {
                detail: { profileId: "bookly" },
              }),
            );
          }
          break;
        }
        case "r": {
          const el = document.getElementById("role-alignment-engine");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          break;
        }
        default:
          break;
      }
      clearChord();
    },
    [clearChord, options],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Guard: Ignore if modifier keys are held
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      // Guard: Ignore if typing inside form elements or editable surfaces
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable ||
          target.getAttribute("role") === "textbox")
      ) {
        return;
      }

      // Guard: Ignore if any dialog or sheet modal is currently open
      const hasOpenModal = document.querySelector('[role="dialog"][data-state="open"]');
      if (hasOpenModal) {
        if (isChordActive) clearChord();
        return;
      }

      const key = e.key.toLowerCase();

      // Cancel on Escape
      if (key === "escape") {
        if (isChordActive) {
          clearChord();
        }
        return;
      }

      if (!isChordActive) {
        // Start chord if 'g' is pressed
        if (key === "g") {
          setIsChordActive(true);
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            setIsChordActive(false);
          }, 1200);
        }
      } else {
        // Second chord key
        if (["p", "c", "e", "d", "t", "s", "q", "a", "l", "m", "b", "x", "i", "r"].includes(key)) {
          e.preventDefault();
          executeTarget(key);
        } else {
          clearChord();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isChordActive, executeTarget, clearChord]);

  return { isChordActive, clearChord };
}

export function KeyboardChordHUD({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-brand border border-gold bg-card px-3.5 py-2 font-mono text-[11px] text-primaryText shadow-2xl animate-in fade-in zoom-in-95 duration-150"
    >
      <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse" aria-hidden="true" />
      <span className="font-semibold text-gold">CHORD ACTIVE:</span>
      <span className="text-mutedText">[G] +</span>
      <div className="flex flex-wrap items-center gap-1.5 font-medium">
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [P] Perf
        </span>
        <span className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5 text-primaryText">
          [W] Works
        </span>
        <span className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5 text-primaryText">
          [C] Capabilities
        </span>
        <span className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5 text-primaryText">
          [E] Experience
        </span>
        <span className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5 text-primaryText">
          [D] Contact
        </span>
        <span className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5 text-primaryText">
          [T] Top
        </span>
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [S] Schema
        </span>
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [Q] SQL
        </span>
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [A] ADR
        </span>
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [B] X-Ray
        </span>
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [X] Craft
        </span>
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [I] CI/CD
        </span>
        <span className="rounded-[2px] border border-gold bg-base px-1 py-0.5 text-gold font-bold">
          [R] Role
        </span>
        <span className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5 text-primaryText">
          [L] Lang
        </span>
        <span className="rounded-[2px] border border-borderSubtle bg-base px-1 py-0.5 text-primaryText">
          [M] Metrics
        </span>
      </div>
    </div>
  );
}
