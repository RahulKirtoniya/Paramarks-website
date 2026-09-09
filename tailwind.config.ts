import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — deep plum-purple. Rich and dark: established, boutique.
        plum: {
          950: "#140A24",
          900: "#1B0F30", // hero / immersive base
          800: "#251740",
          700: "#2E1B4B", // primary brand purple
          600: "#3D2A60",
          500: "#513C7C",
          400: "#6E579E",
          300: "#9B88BF",
          200: "#C8BCDD",
          100: "#E8E2F1",
        },
        // Accent — refined muted gold / brass. Precious metal, used sparingly.
        gold: {
          700: "#96762E",
          600: "#AC8B3D",
          500: "#C6A15B",
          400: "#D6B778",
          300: "#E4CE9E",
          200: "#F0E2C6",
          100: "#F7F1E3",
        },
        // Cool porcelain neutrals — deliberately NOT warm cream.
        sand: {
          50: "#F3F2F7",
          100: "#ECEAF3",
          200: "#E1DEEC",
          300: "#D0CBE0",
          400: "#B4AECB",
        },
        paper: "#FBFAFE",
        ink: {
          900: "#191330",
          700: "#282341",
          500: "#524C68",
          400: "#6F6987",
        },
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.9rem, 6.2vw, 5.5rem)", { lineHeight: "1.0", letterSpacing: "-0.015em" }],
        "display": ["clamp(2.3rem, 4.6vw, 3.9rem)", { lineHeight: "1.04", letterSpacing: "-0.012em" }],
        "headline": ["clamp(1.8rem, 3vw, 2.6rem)", { lineHeight: "1.1", letterSpacing: "-0.008em" }],
        "title": ["clamp(1.2rem, 2vw, 1.55rem)", { lineHeight: "1.2", letterSpacing: "-0.005em" }],
      },
      maxWidth: {
        prose: "66ch",
        container: "1220px",
      },
      spacing: {
        section: "clamp(4.5rem, 9vw, 8.5rem)",
      },
      borderRadius: {
        card: "6px",
        panel: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 10, 36, 0.05), 0 18px 40px -22px rgba(20, 10, 36, 0.28)",
        lift: "0 2px 6px rgba(20, 10, 36, 0.08), 0 34px 60px -28px rgba(20, 10, 36, 0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
