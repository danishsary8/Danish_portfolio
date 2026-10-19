import React, { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_SNAPPY, EASE_OUT_EXPO } from "@/lib/motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number; // Maximum displacement in pixels (default: 4px, anti-AI rule: <= 5px)
}

/**
 * Magnetic button wrapper: subtle cursor attraction strictly bounded to ±4px.
 * Automatically disabled on touch devices and when reduced motion is preferred.
 */
export function Magnetic({ children, className, strength = 4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Normalize distance and clamp strictly within [-strength, strength]
    const distanceX = (clientX - centerX) / (width / 2);
    const distanceY = (clientY - centerY) / (height / 2);
    const clampedX = Math.max(-strength, Math.min(strength, distanceX * strength));
    const clampedY = Math.max(-strength, Math.min(strength, distanceY * strength));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}

interface TelemetryCounterProps {
  value: string | number;
  label?: string;
  className?: string;
}

/**
 * TelemetryCounter: high-craft tabular slide reveal for numeric and status telemetry.
 * Ensures font-variant-numeric: tabular-nums to prevent optical layout jitter.
 */
export function TelemetryCounter({ value, label, className = "" }: TelemetryCounterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="overflow-hidden">
        <motion.span
          key={String(value)}
          {...(shouldReduceMotion
            ? { initial: false }
            : {
                initial: { y: "100%", opacity: 0 },
                exit: { y: "-100%", opacity: 0 },
              })}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
          className="inline-block font-mono tabular-nums tracking-tight text-primaryText"
        >
          {value}
        </motion.span>
      </div>
      {label && (
        <span className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-mutedText">
          {label}
        </span>
      )}
    </div>
  );
}

interface ArchitecturalTabProps {
  isActive: boolean;
  layoutId?: string;
  className?: string;
}

/**
 * ArchitecturalTabIndicator: smooth layout projection for tab switches.
 * Sharp 2px architectural highlight with zero bounce or blur.
 */
export function ArchitecturalTabIndicator({
  isActive,
  layoutId = "active-tab-indicator",
  className = "",
}: ArchitecturalTabProps) {
  if (!isActive) return null;

  return (
    <motion.span
      layoutId={layoutId}
      className={`absolute inset-0 rounded-[2px] bg-primaryText text-base -z-10 ${className}`}
      transition={{
        duration: 0.2,
        ease: EASE_SNAPPY,
      }}
    />
  );
}
