import type { Config } from "tailwindcss";

/**
 * AceBoard design tokens.
 * Hex values are lifted 1:1 from the audited Preppinbee design system,
 * remapped to neutral semantic names. The brand accent is the single
 * customizable identity color (see lib/brand.ts + CSS var --brand).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent — driven by a CSS var so it can be re-themed in one place.
        brand: {
          DEFAULT: "var(--brand)",
          deep: "#135673", // teal subject-switcher background
        },
        // Core surfaces
        canvas: "#111827", // gray-900 — app body + sidebar
        panel: "#1F2A2E", // tinted slate-teal panel / pills
        // Text ramp
        ink: {
          primary: "#F7F6F2", // big stat numbers, headings
          body: "#E2E8F0", // slate-200 default body
          secondary: "#CBD5E1", // slate-300 sub-labels
          muted: "#9CA3AF", // gray-400 captions (workhorse muted)
          faint: "#6B7280", // gray-500 legal text
        },
        // Accents
        accent: {
          blue: "#3B82F6",
          "blue-light": "#60A5FA",
          purple: "#A855F7",
          red: "#FA4949",
          amber: "#F2C141",
        },
        line: {
          subtle: "#374151", // gray-700 borders/dividers
          light: "#E6E3DB", // light-mode hairline border
        },
        // The five KPI glass tints (30% opacity over canvas)
        tint: {
          indigo: "rgba(30,27,75,0.30)",
          green: "rgba(10,63,30,0.30)",
          amber: "rgba(69,26,3,0.30)",
          purple: "rgba(59,7,100,0.30)",
          red: "rgba(96,15,15,0.30)",
        },
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "12px",
        cta: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        "card-light": "0 10px 15px -3px rgba(0,0,0,0.1)",
        focus: "0 0 10px rgba(59,130,246,0.5)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4,0,0.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
