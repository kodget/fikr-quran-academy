import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Legacy tokens (kept for any residual usage) */
        forest: "#1E3A2A",
        "forest-mid": "#2C5238",
        olive: "#3A6645",
        amber: "#B8972A",
        cream: "#F8F6F1",
        sand: "#F2EFE8",
        gold: "#B8972A",
        /* Semantic tokens that map to CSS variables */
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-muted": "var(--surface-muted)",
        foreground: "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        "foreground-subtle": "var(--foreground-subtle)",
        primary: {
          DEFAULT: "var(--primary)",
          mid: "var(--primary-mid)",
          light: "var(--primary-light)",
          foreground: "var(--primary-foreground)",
        },
        "gold-token": "var(--gold)",
        "gold-light": "var(--gold-light)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
        arabic: ["Noto Naskh Arabic", "serif"],
      },
      screens: {
        xs: "475px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
