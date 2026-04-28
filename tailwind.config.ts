import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Fontlar ──────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      // ─── Renk Paleti ──────────────────────────────────────────────────────
      colors: {
        // Marka renkleri
        brand: {
          blue: {
            DEFAULT: "#0EA5E9",  // Elektrik mavisi — ana CTA
            50:  "#F0F9FF",
            100: "#E0F2FE",
            200: "#BAE6FD",
            300: "#7DD3FC",
            400: "#38BDF8",
            500: "#0EA5E9",
            600: "#0284C7",
            700: "#0369A1",
            800: "#075985",
            900: "#0C4A6E",
          },
          yellow: {
            DEFAULT: "#FBBF24",  // Güneş sarısı — vurgu
            50:  "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            300: "#FCD34D",
            400: "#FBBF24",
            500: "#F59E0B",
            600: "#D97706",
            700: "#B45309",
          },
          coral: {
            DEFAULT: "#F97316",  // Canlı mercan — ikincil aksiyon
            50:  "#FFF7ED",
            100: "#FFEDD5",
            200: "#FED7AA",
            300: "#FDBA74",
            400: "#FB923C",
            500: "#F97316",
            600: "#EA580C",
            700: "#C2410C",
          },
          mint: {
            DEFAULT: "#10B981",  // Tamamlayıcı yeşil — başarı
            400: "#34D399",
            500: "#10B981",
            600: "#059669",
          },
        },

        // Nötr tonlar (arka plan & boşluk için)
        surface: {
          DEFAULT: "#FFFFFF",
          50:  "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
      },

      // ─── Gölgeler ─────────────────────────────────────────────────────────
      boxShadow: {
        "glow-blue":   "0 0 30px rgba(14, 165, 233, 0.25)",
        "glow-yellow": "0 0 30px rgba(251, 191, 36, 0.30)",
        "glow-coral":  "0 0 30px rgba(249, 115, 22, 0.25)",
        "card":        "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)",
        "card-hover":  "0 4px 8px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12)",
        "story":       "0 2px 8px rgba(14, 165, 233, 0.12), 0 16px 48px rgba(14, 165, 233, 0.08)",
      },

      // ─── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ─── Animasyonlar ─────────────────────────────────────────────────────
      keyframes: {
        // Sayfa yüklenme animasyonları
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-right": {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        // Dekoratif / ambient
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.2)" },
          "50%":      { boxShadow: "0 0 40px rgba(14, 165, 233, 0.5)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-4px)" },
        },
        // Wizard progress
        "progress-fill": {
          "0%":   { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        // Ses dalgası
        "wave": {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%":      { transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-up":      "fade-up 0.5s ease-out forwards",
        "fade-in":      "fade-in 0.4s ease-out forwards",
        "scale-in":     "scale-in 0.35s ease-out forwards",
        "slide-right":  "slide-right 0.4s ease-out forwards",
        "float":        "float 3s ease-in-out infinite",
        "float-slow":   "float 5s ease-in-out infinite",
        "pulse-glow":   "pulse-glow 2s ease-in-out infinite",
        "shimmer":      "shimmer 2s linear infinite",
        "bounce-soft":  "bounce-soft 2s ease-in-out infinite",
        "wave":         "wave 1s ease-in-out infinite",
      },

      // ─── Transition ───────────────────────────────────────────────────────
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
      },

      // ─── Spacing & Sizing ─────────────────────────────────────────────────
      spacing: {
        "18":  "4.5rem",
        "88":  "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      // ─── Z-Index ──────────────────────────────────────────────────────────
      zIndex: {
        "60":  "60",
        "70":  "70",
        "80":  "80",
        "90":  "90",
        "100": "100",
      },

      // ─── Backdrop ─────────────────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;