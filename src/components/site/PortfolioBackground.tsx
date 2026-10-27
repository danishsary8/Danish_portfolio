import { lazy, Suspense, useEffect, useState } from "react";
import { useTheme } from "@/lib/use-theme";

// React Bits Particles (WebGL2). Loaded lazily so it never weighs on first paint.
const Particles = lazy(() => import("@/components/ui/Particles"));

// Monochrome, white to black (owner request). Each theme takes the half of the ramp that reads
// against its canvas: on dark the brightest dots are nearest white and the rest recede into grey;
// on light the same field is printed in ink, from near-black out to soft grey.
const DARK_PARTICLES = ["#ffffff", "#f4f4f5", "#d4d4d8", "#a1a1aa", "#71717a"];
const LIGHT_PARTICLES = ["#0a0a0b", "#27272a", "#3f3f46", "#52525b", "#71717a"];

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

// Client-only: nothing renders on the server or before hydration, so the theme read below can
// never cause a hydration mismatch or a theme flash. Browsers without WebGL2 (and jsdom) keep
// the plain gradient backdrop.
function ParticleField() {
  const { dark } = useTheme();
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (typeof window.WebGL2RenderingContext === "undefined") return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setStill(motion.matches);
    syncMotion();
    motion.addEventListener("change", syncMotion);

    // Start the field after the hero entrance has had the main thread.
    const w = window as IdleWindow;
    let idleId = 0;
    let timerId = 0;
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    else timerId = window.setTimeout(() => setReady(true), 300);

    return () => {
      motion.removeEventListener("change", syncMotion);
      if (idleId) w.cancelIdleCallback?.(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Particles
        particleColors={dark ? DARK_PARTICLES : LIGHT_PARTICLES}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={35}
        sizeRandomness={1}
        glow={dark ? 0.5 : 0.2}
        twinkle={0.3}
        shimmer={0}
        opacity={dark ? 0.9 : 0.75}
        moveParticlesOnHover={false}
        hoverEffect="parallax"
        disableRotation
        clickBurst={false}
        intro={false}
        paused={still}
      />
    </Suspense>
  );
}

// The theme layers are chosen in CSS from the `dark` class, which the inline head script sets
// before first paint. (Choosing them from React state rendered the dark layer on the server for
// every visitor, so light-theme visitors saw a dark backdrop until hydration.)
export function PortfolioBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Dark Theme Ambient Gradient Layer (Rich twilight obsidian / charcoal / radiant warm bronze) */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 1100px 750px at 50% -60px, rgba(201, 151, 58, 0.35), transparent 72%),
            radial-gradient(circle 850px at 85% 24%, rgba(212, 165, 65, 0.24), transparent 65%),
            radial-gradient(circle 900px at 12% 58%, rgba(60, 85, 155, 0.28), transparent 65%),
            radial-gradient(circle 750px at 88% 78%, rgba(201, 151, 58, 0.2), transparent 65%),
            radial-gradient(circle 600px at 50% 50%, rgba(70, 95, 145, 0.12), transparent 70%),
            linear-gradient(150deg, #07080c 0%, #0d1017 32%, #141926 68%, #090a0e 100%)
          `,
        }}
      />

      {/* Light Theme Ambient Gradient Layer (Distinct, luminous, multi-tone warm gold & cool slate atmosphere) */}
      <div
        className="absolute inset-0 opacity-100 dark:opacity-0"
        style={{
          background: `
            radial-gradient(ellipse 900px 640px at 78% 22%, rgba(214, 168, 82, 0.2), transparent 70%),
            radial-gradient(ellipse 1200px 520px at 35% -60px, rgba(255, 255, 255, 0.95), transparent 65%),
            radial-gradient(circle 760px at 4% 96%, rgba(196, 206, 222, 0.28), transparent 65%),
            linear-gradient(165deg, #FBFAF7 0%, #F8F6F1 55%, #F3F1EB 100%)
          `,
        }}
      />

      {/* Drifting particle field over the gradients, behind all content (main is z-10). */}
      <div className="absolute inset-0">
        <ParticleField />
      </div>
    </div>
  );
}

export default PortfolioBackground;
