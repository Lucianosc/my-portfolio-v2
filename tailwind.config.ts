import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        bp820: "820px",
      },
      colors: {
        // Base colors
        primary: "#04d9ff",
        secondary: "#ff8a1a",
        background3: "#0e1a21",
        background2: "#282828",
        background: "#1d1d1d",
        text: "#909096",
        error: "#eb1414",

        // UI system colors
        foreground: "#ffffff",
        border: "#282828",
        input: "#282828",
        ring: "#04d9ff",

        destructive: {
          DEFAULT: "#eb1414",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1d1d1d",
          foreground: "#909096",
        },
        accent: {
          DEFAULT: "#1d1d1d",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#282828",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#282828",
          foreground: "#ffffff",
        },
      },
      scale: {
        "110": "1.10",
        "120": "1.20",
        "130": "1.30",
        "140": "1.40",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontSize: {
        h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "0.5px" }],
        "h1-md": ["3rem", { lineHeight: "1.2", letterSpacing: "0.5px" }],
        h2: ["2rem", { lineHeight: "1.2", letterSpacing: "0.5px" }],
        "h2-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "0.5px" }],
        h3: ["1.4rem", { lineHeight: "1.2", letterSpacing: "0.5px" }],
        "h3-md": ["1.5rem", { lineHeight: "1.2", letterSpacing: "0.5px" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
