import React, { useEffect, useState, useRef, useCallback } from "react";
import { X, Layers, Compass, Eye, ShieldCheck, Ruler, Terminal } from "lucide-react";

export interface BlueprintInspectorOverlayProps {
  active: boolean;
  onToggle: (nextActive?: boolean) => void;
}

export function BlueprintInspectorOverlay({ active, onToggle }: BlueprintInspectorOverlayProps) {
  const [pointerCoord, setPointerCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<{
    tag: string;
    section: string;
    width: number;
    height: number;
    radius: string;
    surface: string;
  }>({
    tag: "<Hero />",
    section: "HERO_MASTHEAD // 65:35_SPLIT",
    width: 1440,
    height: 720,
    radius: "3px (--radius-brand)",
    surface: "var(--bg-base) #F5F0E8",
  });

  const animFrameRef = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!active) return;

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      animFrameRef.current = requestAnimationFrame(() => {
        setPointerCoord({ x: e.clientX, y: e.clientY });

        const target = e.target as HTMLElement | null;
        if (!target) return;

        const sectionEl = target.closest("[data-blueprint-section]") as HTMLElement | null;
        const rect = (sectionEl || target).getBoundingClientRect();

        const sectionName =
          sectionEl?.getAttribute("data-blueprint-section") ||
          target.getAttribute("data-blueprint-section") ||
          "SWISS_BROADSHEET_CONTAINER";

        const tagName = `<${target.tagName.toLowerCase()} />`;

        const computedStyle = window.getComputedStyle(target);
        const radius = computedStyle.borderRadius || "3px";
        const bg = computedStyle.backgroundColor || "var(--bg-base)";

        setHoveredNode({
          tag: tagName,
          section: sectionName,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          radius: radius === "0px" ? "0px (Sharp)" : `${radius} (--radius)`,
          surface: bg,
        });
      });
    },
    [active],
  );

  useEffect(() => {
    if (!active) return;

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onToggle(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, handlePointerMove, onToggle]);

  if (!active) return null;

  return (
    <div
      role="region"
      aria-label="Architectural Blueprint and Grid X-Ray Mode"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* 1. Top Architectural Mode Banner (Interactive clickable close button) */}
      <div className="pointer-events-auto absolute top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gold bg-[#0A0A0A] text-[#F5F0E8] px-4 py-2 font-mono text-xs shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-gold animate-ping" />
          <span className="font-bold text-gold tracking-wider">
            [ARCHITECTURAL BLUEPRINT X-RAY MODE ACTIVE — PRESS ESC OR G+B TO EXIT]
          </span>
          <span className="hidden md:inline text-stone-400 border-l border-stone-800 pl-3">
            SCALE: 1:1 // 12-COLUMN SWISS ARCHITECTURAL GRID // 60FPS
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggle(false)}
          aria-label="Exit Architectural Blueprint X-Ray Mode"
          className="flex items-center gap-1.5 rounded-[2px] border border-gold/60 bg-gold px-2.5 py-1 text-xs font-bold text-[#0A0A0A] hover:bg-gold/90 transition-colors cursor-pointer"
        >
          <span>CLOSE X-RAY [ESC]</span>
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* 2. 12-Column Swiss Structural Grid Rails (Max-width 1440px matches broadsheet) */}
      <div className="mx-auto max-w-[1440px] h-full w-full px-0 relative">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 h-full w-full divide-x divide-gold/20 border-x border-gold/30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative h-full">
              {/* Column Index Tag at Top */}
              <div className="absolute top-12 left-2 font-mono text-[9px] text-gold/60 tracking-wider">
                COL_{String(i + 1).padStart(2, "0")}
              </div>
              {/* Vertical Metric Hairline Dashes */}
              <div className="absolute inset-y-0 right-0 w-[1px] border-r border-dashed border-gold/20" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Live Floating Pointer CAD Telemetry HUD (Bottom-Left) */}
      <div className="pointer-events-auto fixed bottom-6 left-6 z-50 flex flex-col gap-1 rounded-brand border border-gold/60 bg-[#0A0A0A] p-3.5 font-mono text-[11px] text-[#F5F0E8] shadow-2xl max-w-sm">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-[10px] text-gold">
          <span className="flex items-center gap-1.5 font-bold">
            <Ruler className="h-3.5 w-3.5" />
            <span>CAD TELEMETRY HUD</span>
          </span>
          <span className="tabular-nums">
            X:{String(pointerCoord.x).padStart(4, "0")}px // Y:
            {String(pointerCoord.y).padStart(4, "0")}px
          </span>
        </div>

        <div className="space-y-1 pt-1.5 text-[10px]">
          <div className="flex justify-between gap-4">
            <span className="text-stone-400">ACTIVE_NODE:</span>
            <span className="font-semibold text-gold truncate">{hoveredNode.tag}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-stone-400">SECTION_SPEC:</span>
            <span className="text-[#F5F0E8] truncate font-medium">{hoveredNode.section}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-stone-400">BOUNDING_BOX:</span>
            <span className="tabular-nums font-semibold text-gold">
              W:{hoveredNode.width}px × H:{hoveredNode.height}px
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-stone-400">CORNER_RADIUS:</span>
            <span className="text-stone-200">{hoveredNode.radius}</span>
          </div>

          <div className="flex justify-between gap-4 border-t border-stone-800 pt-1 text-[9px]">
            <span className="text-stone-400">TOKEN_SURFACE:</span>
            <span className="text-gold truncate">{hoveredNode.surface}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
