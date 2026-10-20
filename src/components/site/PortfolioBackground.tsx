import { useTheme } from "@/lib/use-theme";

// Pure CSS starlight motes configuration for smooth ambient drift
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
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          dark ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: `
            radial-gradient(ellipse 1100px 750px at 50% -40px, rgba(201, 151, 58, 0.32), transparent 72%),
            radial-gradient(circle 750px at 85% 26%, rgba(212, 165, 65, 0.22), transparent 65%),
            radial-gradient(circle 750px at 12% 70%, rgba(201, 151, 58, 0.16), transparent 65%),
            radial-gradient(circle 600px at 50% 50%, rgba(70, 90, 135, 0.10), transparent 70%),
            linear-gradient(145deg, #090a0f 0%, #10131d 35%, #161a29 65%, #0b0c11 100%)
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
            radial-gradient(ellipse 1100px 750px at 50% -40px, rgba(195, 145, 45, 0.28), transparent 72%),
            radial-gradient(circle 750px at 85% 26%, rgba(205, 155, 55, 0.18), transparent 65%),
            radial-gradient(circle 750px at 12% 70%, rgba(195, 145, 45, 0.14), transparent 65%),
            linear-gradient(145deg, #FDFBF7 0%, #F5ECE0 35%, #EBE0CD 70%, #F6EFE5 100%)
          `,
        }}
      />

      {/* Ultra-Lightweight CSS Ambient Starlight Motes (Zero-lag, 0 WebGL, 0 canvas) */}
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
              backgroundColor: dark ? "rgba(201, 151, 58, 0.75)" : "rgba(176, 130, 45, 0.65)",
              boxShadow: dark
                ? "0 0 8px 1px rgba(201, 151, 58, 0.55)"
                : "0 0 6px 1px rgba(176, 130, 45, 0.45)",
              opacity: m.opacity,
              animation: `floatMote ${m.duration} ease-in-out infinite`,
              animationDelay: m.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PortfolioBackground;
