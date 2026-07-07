/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nd: {
          bg: "#04070d",
          surface: "#0a0f1a",
          card: "#0f1729",
          elevated: "#131d33",
          border: "#1a2744",
          "border-soft": "#243352",
          muted: "#5a6d8a",
          secondary: "#8899b4",
          primary: "#f0f4f8",
          navy: "#1e3a5f",
          "navy-light": "#2d5390",
          gold: "#f59e0b",
          "gold-light": "#fbbf24",
          "gold-dark": "#d97706",
          "gold-glow": "rgba(245,158,11,0.35)",
          rose: "#f472b6",
          cyan: "#22d3ee",
          emerald: "#34d399",
          red: "#f87171",
        },
        // Tambahan warna untuk kompatibilitas
        dark: {
          DEFAULT: "#04070d",
          light: "#0a0f1a",
          card: "#0f1729",
        },
        amber: {
          light: "#fbbf24",
          DEFAULT: "#f59e0b",
          dark: "#d97706",
        },
        navy: {
          light: "#2d5390",
          DEFAULT: "#1e3a5f",
        },
        zinc: {
          light: "#f0f4f8",
          DEFAULT: "#8899b4",
          dark: "#5a6d8a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.75rem",
      },
      boxShadow: {
        "nd-card":
          "0 4px 24px rgba(245,158,11,0.06), 0 1px 3px rgba(0,0,0,0.4)",
        "nd-card-hover":
          "0 12px 40px rgba(245,158,11,0.12), 0 2px 8px rgba(0,0,0,0.5)",
        "nd-glow": "0 0 60px rgba(245,158,11,0.10)",
        "nd-button": "0 4px 14px rgba(245,158,11,0.25)",
        "nd-elevated": "0 8px 32px rgba(0,0,0,0.6)",
        "glow-amber": "0 0 30px rgba(245,158,11,0.15)",
        "glow-amber-hover": "0 0 40px rgba(245,158,11,0.25)",
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        wiggle: "wiggle 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "gradient-shift": "gradientShift 8s ease infinite",
        marquee: "marquee 30s linear infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "spin-slower": "spin 4s linear infinite reverse",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg) scale(1)" },
          "50%": { transform: "rotate(3deg) scale(1.02)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.8 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: 0, transform: "translateX(30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
