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
          950: "#150B26", // deepest — footer base, hero base
          900: "#1C1030",
          800: "#241640",
          700: "#2E1B4B", // primary brand purple (headings, nav)
          600: "#3C2A5F",
          500: "#4E3878",
          400: "#6B559A",
          300: "#9784BE",
          200: "#C6BADD",
          100: "#E7E1F0",
        },
        // Accent — refined muted gold. Used sparingly.
        gold: {
          700: "#9A7B32",
          600: "#B08F41",
          500: "#C6A15B", // primary accent
          400: "#D4B573",
          300: "#E2CC9C",
          200: "#EFE0C4",
          100: "#F7F0E1",
        },
        // Warm neutrals
        sand: {
          50: "#FAF8F3", // off-white background
          100: "#F4EFE6",
          200: "#EFE9DD", // beige
          300: "#E3DACB",
          400: "#CFC3AF",
        },
        ink: {
          900: "#211D2B",
          700: "#2B2733", // body text (warm charcoal)
          500: "#524C5E",
          400: "#6E6879",
        },
      },
      fontFamily: {
        // Set via next/font in layout.tsx (CSS variables)
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // A deliberate editorial type scale
        "display-lg": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "headline": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "title": ["clamp(1.25rem, 2vw, 1.6rem)", { lineHeight: "1.2" }],
      },
      maxWidth: {
        prose: "68ch",
        container: "1200px",
      },
      spacing: {
        section: "clamp(4.5rem, 9vw, 8.5rem)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(21, 11, 38, 0.04), 0 12px 32px -12px rgba(21, 11, 38, 0.14)",
        lift: "0 2px 4px rgba(21, 11, 38, 0.06), 0 24px 48px -16px rgba(21, 11, 38, 0.22)",
      },
      keyframes: {
        "rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "var(--radix-height, auto)", opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
