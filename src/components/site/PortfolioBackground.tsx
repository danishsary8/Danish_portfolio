import { useTheme } from "@/lib/use-theme";
import Particles from "@/components/ui/Particles";

export function PortfolioBackground() {
  const { dark } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none"
    >
      {/* Subtle Cohesive Ambient Gradient Surface */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          background: dark
            ? "radial-gradient(circle 900px at 50% -120px, rgba(201, 151, 58, 0.08), transparent 70%), radial-gradient(circle 700px at 85% 45%, rgba(201, 151, 58, 0.035), transparent 65%), radial-gradient(circle 800px at 15% 85%, rgba(255, 255, 255, 0.02), transparent 70%), #0A0A0B"
            : "radial-gradient(circle 900px at 50% -120px, rgba(176, 130, 45, 0.055), transparent 70%), radial-gradient(circle 700px at 85% 45%, rgba(176, 130, 45, 0.025), transparent 65%), radial-gradient(circle 800px at 15% 85%, rgba(10, 10, 12, 0.015), transparent 70%), #FBFBFA",
        }}
      />

      {/* Living Drifting Particles Layer (Optimized for 60fps & zero lag) */}
      <div className="absolute inset-0 opacity-60 dark:opacity-80 transition-opacity duration-500">
        <Particles
          particleCount={75}
          particleSpread={12}
          speed={0.04}
          particleColors={
            dark
              ? ["#C9973A", "#EDEDEF", "#8A8A93"]
              : ["#B0822D", "#71717A", "#A1A1AA"]
          }
          particleBaseSize={70}
          sizeRandomness={0.75}
          glow={dark ? 0.35 : 0.15}
          twinkle={0.2}
          moveParticlesOnHover
          hoverEffect="parallax"
          particleHoverFactor={0.35}
          hoverRadius={180}
          disableRotation
          pixelRatio={1.2}
          alphaParticles
          clickBurst={false}
          intro
        />
      </div>
    </div>
  );
}

export default PortfolioBackground;
