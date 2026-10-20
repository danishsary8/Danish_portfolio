import { useTheme } from "@/lib/use-theme";
import Particles from "@/components/ui/Particles";

export function PortfolioBackground() {
  const { dark } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Dark Theme Ambient Gradient Layer (Cohesive obsidian / charcoal / whisper of warm bronze) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          dark ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: `
            radial-gradient(ellipse 1200px 750px at 50% -80px, rgba(201, 151, 58, 0.075), transparent 70%),
            radial-gradient(ellipse 850px 600px at 85% 40%, rgba(201, 151, 58, 0.038), transparent 65%),
            linear-gradient(165deg, #090A0C 0%, #0D0E12 35%, #101116 70%, #0A0B0E 100%)
          `,
        }}
      />

      {/* Light Theme Ambient Gradient Layer (Editorial warm parchment / linen stone / whisper of warm amber) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          !dark ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: `
            radial-gradient(ellipse 1200px 750px at 50% -80px, rgba(176, 130, 45, 0.05), transparent 70%),
            radial-gradient(ellipse 850px 600px at 85% 40%, rgba(176, 130, 45, 0.028), transparent 65%),
            linear-gradient(165deg, #FAF8F5 0%, #F4F0E8 35%, #EFEAE0 70%, #FAF8F5 100%)
          `,
        }}
      />

      {/* Ultra-Lightweight Calm Drifting Particles Layer (Zero-lag, 20 particles, 0 hover overhead) */}
      <div className="absolute inset-0 opacity-60 dark:opacity-75 transition-opacity duration-700">
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
          glow={dark ? 0.35 : 0.22}
          twinkle={0.2}
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
