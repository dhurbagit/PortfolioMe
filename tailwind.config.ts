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
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F1F5F9",
          card: "#FFFFFF",
          elevated: "#FFFFFF",
        },
        flag: {
          crimson: {
            DEFAULT: "#DC2626",
            light: "#EF4444",
            dark: "#B91C1C",
            glow: "rgba(220, 38, 38, 0.15)",
          },
          royal: {
            DEFAULT: "#1D4ED8",
            light: "#3B82F6",
            dark: "#1E40AF",
            glow: "rgba(29, 78, 216, 0.15)",
          },
        },
      },
      boxShadow: {
        "card-soft": "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)",
        "card-hover": "0 12px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)",
        "glow-crimson": "0 0 25px -4px rgba(220, 38, 38, 0.35)",
        "glow-royal": "0 0 25px -4px rgba(29, 78, 216, 0.35)",
        "glow-dual": "0 0 25px -4px rgba(29, 78, 216, 0.2), 0 0 25px -4px rgba(220, 38, 38, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "nepal-gradient": "linear-gradient(135deg, #1D4ED8 0%, #DC2626 100%)",
        "nepal-subtle": "linear-gradient(135deg, rgba(29,78,216,0.08) 0%, rgba(220,38,38,0.08) 100%)",
        "light-grid": "linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
