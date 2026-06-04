import type { Config } from "tailwindcss";

/**
 * BRUTAL COUTURE design tokens.
 *
 * The project runs Tailwind v4, which is CSS-first. This legacy-style config
 * is loaded explicitly from `globals.css` via the `@config` directive so the
 * brand `colors` and `fontFamily` below are emitted as utilities
 * (`bg-acid`, `text-ink`, `font-display`, `font-mono`, ...).
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        acid: "#FFE600",
        ink: "#0A0A0A",
        chalk: "#F5F0E8",
        mid: "#1A1A1A",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
