import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./OrbitImages.css";

/**
 * OrbitImages (React Bits API, rebuilt locally because reactbits.dev is not reachable
 * from the build sandbox). Items travel along an ellipse (or circle) around a centre
 * piece; items at the back shrink and fade by `depth`, items at the front pass over the
 * centre. Positions are computed for t = 0 on the server so the layout is complete
 * without JavaScript; the loop pauses off-screen and does not run under reduced motion.
 */
export type OrbitItem = string | ReactNode;

export interface OrbitImagesProps {
  images: OrbitItem[];
  shape?: "ellipse" | "circle";
  radiusX?: number;
  radiusY?: number;
  /** Tilt of the orbit, in degrees. */
  rotation?: number;
  /** Seconds per full turn. */
  duration?: number;
  itemSize?: number;
  /** 0..1: how much back items shrink and fade. */
  depth?: number;
  showPath?: boolean;
  centerContent?: ReactNode;
  /** Stage height; defaults to the orbit's own extent plus the item size. */
  height?: number;
  className?: string;
  /** Pause the orbit while a fine pointer is over it. */
  pauseOnHover?: boolean;
  /** Accessible names for image items (decorative when omitted). */
  alts?: string[];
}

const TAU = Math.PI * 2;

function place(angle: number, rx: number, ry: number, tilt: number, depth: number) {
  const x0 = Math.cos(angle) * rx;
  const y0 = Math.sin(angle) * ry;
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  const x = x0 * c - y0 * s;
  const y = x0 * s + y0 * c;
  const front = (Math.sin(angle) + 1) / 2; // 0 = back of the orbit, 1 = front
  const scale = 1 - depth * 0.45 * (1 - front);
  const opacity = 1 - depth * 0.55 * (1 - front);
  return { x, y, scale, opacity, front };
}

function styleFor(p: ReturnType<typeof place>): CSSProperties {
  return {
    transform: `translate(-50%, -50%) translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) scale(${p.scale.toFixed(3)})`,
    opacity: Number(p.opacity.toFixed(3)),
    zIndex: p.front > 0.5 ? 3 : 1,
  };
}

export function OrbitImages({
  images,
  shape = "ellipse",
  radiusX = 340,
  radiusY = 80,
  rotation = -8,
  duration = 30,
  itemSize = 90,
  depth = 0.6,
  showPath = false,
  centerContent,
  height,
  className = "",
  alts,
  pauseOnHover = false,
}: OrbitImagesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rx = radiusX;
  const ry = shape === "circle" ? radiusX : radiusY;
  const tilt = (rotation * Math.PI) / 180;
  const n = images.length;
  const stageH = height ?? Math.ceil(2 * Math.max(ry, Math.abs(rx * Math.sin(tilt))) + itemSize * 1.6);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || n === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let phase = 0;
    let visible = true;
    let hovered = false;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const enter = () => (hovered = true);
    const leave = () => (hovered = false);
    if (pauseOnHover && fine) {
      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointerleave", leave);
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!hovered) phase = (phase + (dt / duration) * TAU) % TAU;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = place(phase + (i / n) * TAU, rx, ry, tilt, depth);
        el.style.transform = styleFor(p).transform as string;
        el.style.opacity = String(p.opacity.toFixed(3));
        el.style.zIndex = p.front > 0.5 ? "3" : "1";
      });
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
    };
  }, [n, rx, ry, tilt, depth, duration, pauseOnHover]);

  return (
    <div
      ref={rootRef}
      className={`orbit-images ${className}`.trim()}
      style={{ height: stageH, "--orbit-item": `${itemSize}px` } as CSSProperties}
    >
      {showPath ? (
        <svg className="orbit-images__path" aria-hidden="true" overflow="visible">
          <ellipse
            cx="50%"
            cy="50%"
            rx={rx}
            ry={ry}
            transform={`rotate(${rotation})`}
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          />
        </svg>
      ) : null}

      {centerContent ? <div className="orbit-images__center">{centerContent}</div> : null}

      {images.map((item, i) => {
        const p = place((i / n) * TAU, rx, ry, tilt, depth);
        return (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="orbit-images__item"
            style={styleFor(p)}
          >
            {typeof item === "string" ? (
              <img src={item} alt={alts?.[i] ?? ""} draggable={false} decoding="async" />
            ) : (
              item
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrbitImages;
