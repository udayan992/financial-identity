import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#dce6f3",
          200: "#b9cde7",
          300: "#8aadd4",
          400: "#5689be",
          500: "#3569a3",
          600: "#265388",
          700: "#1f4370",
          800: "#1c395d",
          900: "#1a3150",
          950: "#112035",
        },
        trust: {
          blue: "#1a3150",
          accent: "#f59e0b",
          emerald: "#10b981",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        passport: "0 4px 24px rgba(26, 49, 80, 0.12), 0 1px 3px rgba(26, 49, 80, 0.08)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
      },
      backgroundImage: {
        "passport-pattern":
          "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(26,49,80,0.03) 8px, rgba(26,49,80,0.03) 16px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
