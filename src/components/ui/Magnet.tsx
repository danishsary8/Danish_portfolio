import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from "react";

interface MagnetProps {
  children: ReactNode;
  /** Distance around the element (px) that activates the magnetic pull */
  padding?: number;
  /** How strongly the element is pulled toward the cursor (0.1 to 0.5) */
  magnetStrength?: number;
  /** Transition curve while tracking */
  activeTransition?: string;
  /** Transition curve when releasing back to center */
  inactiveTransition?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Magnet({
  children,
  padding = 30,
  magnetStrength = 0.22,
  activeTransition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
  inactiveTransition = "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  disabled = false,
  className = "",
  style,
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer and no reduced-motion
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const el = magnetRef.current;
      if (!el || disabled) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < maxDist) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) * magnetStrength;
        const offsetY = (e.clientY - centerY) * magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else if (isActive) {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, magnetStrength, disabled, isActive]);

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={magnetRef}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: isActive ? "transform" : "auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Magnet;
