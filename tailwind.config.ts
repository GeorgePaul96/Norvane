import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface": {
          "50": "#f4f5f8",
          "100": "#e8eaed",
          "800": "#1c2030",
          "850": "#151820",
          "900": "#0f1115",
          "950": "#0b0d10",
        },
        "ink": {
          "100": "#e2e4ea",
          "200": "#b8bcc8",
          "300": "#8890a4",
          "400": "#5a6175",
          "700": "#2a2e3c",
          "800": "#1a1e28",
          "900": "#111318",
        },
        "steel": {
          "300": "#8dbae0",
          "400": "#6a9ab8",
          "500": "#4878a0",
          "600": "#2d5c80",
          "700": "#1a3d5c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        "widest-2": "0.2em",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
        "dot-grid-light": "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
        "grid-lines": `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        "40": "40px 40px",
        "60": "60px 60px",
      },
      animation: {
        "fade-in": "fadeIn 0.9s ease-out forwards",
        "slide-up": "slideUp 0.9s ease-out forwards",
        "draw": "draw 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          "0%": { strokeDashoffset: "200" },
          "50%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-200" },
        },
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
      },
    },
  },
  plugins: [],
};

export default config;
