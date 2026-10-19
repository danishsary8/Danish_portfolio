/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy aliases kept so untouched shadcn/ui primitives still resolve.
        base: "var(--bg)",
        primaryText: "var(--fg)",
        mutedText: "var(--fg-muted)",
        borderSubtle: "var(--line)",
        borderStrong: "var(--line-strong)",
        gold: {
          DEFAULT: "var(--gold)",
          ink: "var(--gold-ink)",
        },
      },
      borderRadius: {
        brand: "12px",
        control: "8px",
      },
    },
  },
  plugins: [],
};
