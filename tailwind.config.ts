import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "var(--color-forest)",
        "forest-mid": "var(--color-forest-mid)",
        olive: "var(--color-olive)",
        amber: "var(--color-amber)",
        cream: "var(--color-cream)",
        sand: "var(--color-sand)",
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
        arabic: ["Noto Naskh Arabic", "serif"],
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
