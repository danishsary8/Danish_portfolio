import { useTheme } from "@/lib/use-theme";

// Pure CSS starlight motes configuration for smooth ambient drift (Dark mode only)
const MOTES = [
  { top: "12%", left: "18%", size: 3, delay: "0s", duration: "18s", opacity: 0.45 },
  { top: "22%", left: "75%", size: 2.5, delay: "3s", duration: "22s", opacity: 0.5 },
  { top: "35%", left: "42%", size: 3.5, delay: "6s", duration: "25s", opacity: 0.4 },
  { top: "48%", left: "88%", size: 2, delay: "1s", duration: "20s", opacity: 0.35 },
  { top: "60%", left: "15%", size: 3, delay: "4s", duration: "24s", opacity: 0.4 },
  { top: "72%", left: "62%", size: 2.5, delay: "7s", duration: "26s", opacity: 0.38 },
  { top: "85%", left: "30%", size: 3, delay: "2s", duration: "19s", opacity: 0.42 },
  { top: "18%", left: "90%", size: 2, delay: "5s", duration: "21s", opacity: 0.3 },
  { top: "42%", left: "8%", size: 2.5, delay: "8s", duration: "23s", opacity: 0.35 },
  { top: "68%", left: "82%", size: 3, delay: "3.5s", duration: "27s", opacity: 0.4 },
  { top: "92%", left: "70%", size: 2, delay: "6.5s", duration: "20s", opacity: 0.3 },
  { top: "8%", left: "50%", size: 2.5, delay: "1.5s", duration: "24s", opacity: 0.45 },
];

export function PortfolioBackground() {
  const { dark } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Dark Theme Ambient Gradient Layer (Rich twilight obsidian / charcoal / radiant warm bronze) */}
      <div
        className={`absolute inset-0 ${
          dark ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
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
        className={`absolute inset-0 ${
          !dark ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: `
            radial-gradient(ellipse 900px 640px at 78% 22%, rgba(214, 168, 82, 0.2), transparent 70%),
            radial-gradient(ellipse 1200px 520px at 35% -60px, rgba(255, 255, 255, 0.95), transparent 65%),
            radial-gradient(circle 760px at 4% 96%, rgba(196, 206, 222, 0.28), transparent 65%),
            linear-gradient(165deg, #FBFAF7 0%, #F8F6F1 55%, #F3F1EB 100%)
          `,
        }}
      />

      {/* Ultra-Lightweight CSS Ambient Starlight Motes (Active ONLY in dark theme to avoid dirt/speckle artifacts) */}
      {dark && (
        <div className="absolute inset-0 motion-reduce:hidden">
          {MOTES.map((m, idx) => (
            <span
              key={idx}
              className="absolute rounded-full transition-opacity duration-700"
              style={{
                top: m.top,
                left: m.left,
                width: `${m.size}px`,
                height: `${m.size}px`,
                backgroundColor: "rgba(201, 151, 58, 0.75)",
                boxShadow: "0 0 8px 1px rgba(201, 151, 58, 0.55)",
                opacity: m.opacity,
                animation: `floatMote ${m.duration} ease-in-out infinite`,
                animationDelay: m.delay,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PortfolioBackground;
