import { useTheme } from "@/lib/use-theme";
import Particles from "@/components/ui/Particles";

export function PortfolioBackground() {
  const { dark } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Smooth Cohesive Ambient Gradient Background */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          background: dark
            ? `radial-gradient(ellipse 1100px 700px at 50% -80px, rgba(201, 151, 58, 0.14), transparent 75%),
               radial-gradient(ellipse 900px 600px at 90% 35%, rgba(201, 151, 58, 0.08), transparent 70%),
               radial-gradient(ellipse 850px 650px at 10% 75%, rgba(212, 175, 55, 0.06), transparent 70%),
               radial-gradient(circle 800px at 50% 100%, rgba(201, 151, 58, 0.05), transparent 70%),
               #0A0A0B`
            : `radial-gradient(ellipse 1100px 700px at 50% -80px, rgba(176, 130, 45, 0.10), transparent 75%),
               radial-gradient(ellipse 900px 600px at 90% 35%, rgba(176, 130, 45, 0.06), transparent 70%),
               radial-gradient(ellipse 850px 650px at 10% 75%, rgba(190, 145, 55, 0.045), transparent 70%),
               radial-gradient(circle 800px at 50% 100%, rgba(176, 130, 45, 0.04), transparent 70%),
               #FBFBFA`,
        }}
      />

      {/* Living Drifting Particles Layer (Smooth 60fps & calm drift) */}
      <div className="absolute inset-0 opacity-85 dark:opacity-90 transition-opacity duration-500">
        <Particles
          particleCount={85}
          particleSpread={12}
          speed={0.05}
          particleColors={
            dark
              ? ["#C9973A", "#E5C378", "#D4AF37", "#EDEDEF"]
              : ["#B0822D", "#C9973A", "#85601F", "#71717A"]
          }
          particleBaseSize={80}
          sizeRandomness={0.7}
          glow={dark ? 0.45 : 0.3}
          twinkle={0.25}
          moveParticlesOnHover
          hoverEffect="parallax"
          particleHoverFactor={0.25}
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
