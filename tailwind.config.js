/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        card: "var(--bg-card)",
        primaryText: "var(--text-primary)",
        mutedText: "var(--text-muted)",
        gold: {
          DEFAULT: "var(--accent-gold)",
          hover: "var(--accent-gold-hover)",
        },
        borderSubtle: "var(--border-subtle)",
        borderStrong: "var(--border-strong)",
        focus: "var(--border-focus)",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        brand: "3px" /* Enforce subtle 2px-4px radius, strictly no pill buttons */,
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        editorial: "-0.03em",
      },
      spacing: {
        "section-desktop": "160px",
        "section-mobile": "80px",
      },
    },
  },
  plugins: [],
};
