import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#030014",
        foreground: "#f3f4f6",
        cyber: {
          dark: "#030014",
          card: "rgba(13, 10, 36, 0.6)",
          border: "rgba(139, 92, 246, 0.25)",
          purple: "#8b5cf6",
          violet: "#7c3aed",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          neonCyan: "#00f0ff",
          pink: "#ec4899",
          magenta: "#d946ef",
          green: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": "radial-gradient(circle, rgba(139, 92, 246, 0.15) 1px, transparent 1px)",
        "neon-glow": "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "border-glow": "borderGlow 4s ease infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "aurora": "aurora 60s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(15px) rotate(-3deg)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 15px rgba(139,92,246,0.5))" },
          "100%": { filter: "drop-shadow(0 0 30px rgba(6,182,212,0.8))" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(139, 92, 246, 0.4)" },
          "50%": { borderColor: "rgba(6, 182, 212, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-purple": "0 0 25px -5px rgba(139, 92, 246, 0.5)",
        "neon-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.5)",
        "neon-magenta": "0 0 25px -5px rgba(217, 70, 239, 0.5)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-elevated": "0 20px 50px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
