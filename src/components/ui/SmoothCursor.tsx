import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./SmoothCursor.css";

export interface SmoothCursorProps {
  /** CSS selector for interactive elements that trigger hover expansion */
  targetSelector?: string;
  /** Spring smoothing lerp speed (0.1 to 0.35, default 0.18) */
  smoothing?: number;
  /** Whether to replace the native browser cursor on desktop */
  hideDefaultCursor?: boolean;
}

export function SmoothCursor({
  targetSelector = ".cursor-target, a, button, [role='button'], input[type='button'], input[type='submit']",
  smoothing = 0.18,
  hideDefaultCursor = true,
}: SmoothCursorProps) {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only mount on desktop fine pointer devices
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (hideDefaultCursor) {
      document.documentElement.classList.add("has-smooth-cursor");
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;
    let isHovering = false;
    let isMouseDown = false;
    let isVisible = false;

    const container = containerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        container?.classList.add("smooth-cursor--visible");
      }

      // Update dot directly with zero latency
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // Check if hovering interactive element
      const target = (e.target as HTMLElement | null)?.closest(targetSelector);
      if (target && !isHovering) {
        isHovering = true;
        container?.classList.add("smooth-cursor--hover");
      } else if (!target && isHovering) {
        isHovering = false;
        container?.classList.remove("smooth-cursor--hover");
      }
    };

    const onPointerDown = () => {
      isMouseDown = true;
      container?.classList.add("smooth-cursor--down");
    };

    const onPointerUp = () => {
      isMouseDown = false;
      container?.classList.remove("smooth-cursor--down");
    };

    const onMouseLeave = () => {
      isVisible = false;
      container?.classList.remove("smooth-cursor--visible");
    };

    const onMouseEnter = () => {
      isVisible = true;
      container?.classList.add("smooth-cursor--visible");
    };

    // Smooth lerp loop for the trailing ring
    const render = () => {
      if (isVisible && ring) {
        ringX += (mouseX - ringX) * smoothing;
        ringY += (mouseY - ringY) * smoothing;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("has-smooth-cursor");
    };
  }, [mounted, targetSelector, smoothing, hideDefaultCursor]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div ref={containerRef} className="smooth-cursor" aria-hidden="true">
      <div ref={ringRef} className="smooth-cursor__ring" />
      <div ref={dotRef} className="smooth-cursor__dot" />
    </div>,
    document.body
  );
}

export default SmoothCursor;
