/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        surface: "var(--glass-surface)",
        card: "var(--glass-surface)",
        primaryText: "var(--text-primary)",
        mutedText: "var(--text-muted)",
        gold: {
          DEFAULT: "var(--accent-gold)",
          hover: "var(--accent-gold-hover)",
          ink: "var(--accent-gold-ink)",
        },
        borderSubtle: "var(--glass-border)",
        borderStrong: "var(--glass-border-strong)",
        focus: "var(--border-focus)",
        glass: {
          surface: "var(--glass-surface)",
          border: "var(--glass-border)",
          "border-strong": "var(--glass-border-strong)",
        },
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        brand: "16px" /* Soft iOS-style radius for cards/panels */,
        control: "10px" /* Buttons, inputs, badges, tabs */,
      },
      backdropBlur: {
        card: "18px",
        chrome: "28px",
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
