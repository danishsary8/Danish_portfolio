import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

// Adapted from React Bits SpotlightCard: local pointer coordinates drive a CSS light.
// https://github.com/DavidHDev/react-bits/tree/main/src/ts-tailwind/Components/SpotlightCard
// Theme colors live in styles.css; no global listeners or always-running animation loop.
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={move} className={cn("spotlight-card", className)}>
      <span className="spotlight-light" aria-hidden />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}