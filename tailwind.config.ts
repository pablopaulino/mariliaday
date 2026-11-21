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
        background: "#09090B",
        surface: {
          DEFAULT: "#121215",
          elevated: "#18181D",
          hover: "#1F1F24",
          border: "#27272A",
        },
        gold: {
          50: "#FFFDF0",
          100: "#FDF8D8",
          200: "#F9EEA8",
          300: "#F4E071",
          400: "#E6C635",
          500: "#D4AF37", // Primary Queen Gold
          600: "#B89222",
          700: "#926E17",
          800: "#6F5215",
          900: "#4B3611",
        },
        amber: {
          500: "#F59E0B",
          600: "#D97706",
        },
        emerald: {
          500: "#10B981",
        },
        ruby: {
          500: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFFDF0 0%, #F59E0B 40%, #D4AF37 80%, #E6C635 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)",
        "card-gradient": "linear-gradient(180deg, rgba(24, 24, 29, 0.7) 0%, rgba(18, 18, 21, 0.95) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
