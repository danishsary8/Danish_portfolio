import { useTheme } from "@/lib/use-theme";
import Particles from "@/components/ui/Particles";

export function PortfolioBackground() {
  const { dark } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Dark Theme Ambient Gradient Layer (Rich twilight obsidian / charcoal / radiant warm bronze) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          dark ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: `
            radial-gradient(ellipse 1100px 750px at 50% -50px, rgba(201, 151, 58, 0.22), transparent 72%),
            radial-gradient(circle 800px at 88% 35%, rgba(212, 165, 65, 0.15), transparent 65%),
            radial-gradient(circle 850px at 12% 70%, rgba(201, 151, 58, 0.10), transparent 65%),
            linear-gradient(155deg, #07080a 0%, #0d0f15 40%, #141622 75%, #090a0d 100%)
          `,
        }}
      />

      {/* Light Theme Ambient Gradient Layer (Editorial warm parchment / linen stone / radiant amber aura) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          !dark ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: `
            radial-gradient(ellipse 1100px 750px at 50% -50px, rgba(195, 145, 45, 0.22), transparent 72%),
            radial-gradient(circle 800px at 88% 35%, rgba(205, 155, 55, 0.15), transparent 65%),
            radial-gradient(circle 850px at 12% 70%, rgba(195, 145, 45, 0.10), transparent 65%),
            linear-gradient(155deg, #FAF7F0 0%, #F3ECDF 35%, #E9DECD 70%, #F6F1E6 100%)
          `,
        }}
      />

      {/* Ultra-Lightweight Calm Drifting Particles Layer (Zero-lag, 20 particles) */}
      <div className="absolute inset-0 opacity-70 dark:opacity-85 transition-opacity duration-700">
        <Particles
          particleCount={20}
          particleSpread={14}
          speed={0.012}
          particleColors={
            dark
              ? ["#C9973A", "#D4AF37", "#9A9AA3", "#4A4A52"]
              : ["#B0822D", "#C9973A", "#A1A1AA", "#C4C4C8"]
          }
          particleBaseSize={60}
          sizeRandomness={0.6}
          glow={dark ? 0.45 : 0.3}
          twinkle={0.25}
          moveParticlesOnHover={false}
          hoverEffect="none"
          particleHoverFactor={0}
          disableRotation
          pixelRatio={1}
          alphaParticles
          clickBurst={false}
          intro={false}
        />
      </div>
    </div>
  );
}

export default PortfolioBackground;
