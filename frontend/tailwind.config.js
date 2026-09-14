/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cool, neutral canvas rather than plain white — reads as a
        // considered product rather than a default browser background.
        paper: {
          DEFAULT: "#F5F6F9",
          raised: "#FFFFFF",
          sunken: "#EEEFF4",
        },
        ink: {
          DEFAULT: "#13151F",
          soft: "#565A70",
          faint: "#8D91A6",
        },
        line: {
          DEFAULT: "#E2E3EC",
          strong: "#CACCDA",
        },
        // Brand: a deep indigo-violet instead of the expected teal/blue —
        // distinctive, still restrained enough for a finance product.
        brand: {
          50: "#EEECFB",
          100: "#DDD9F6",
          200: "#B9B0EC",
          300: "#9187E0",
          400: "#6A5DD3",
          500: "#4F42C4",
          600: "#4034A6",
          700: "#332984",
          800: "#251E60",
        },
        // Secondary accent — warm copper, used sparingly (highest expense,
        // secondary emphasis) so it reads intentional, not decorative.
        amber: {
          100: "#F8E7CE",
          300: "#E3AC69",
          500: "#BE7B31",
          700: "#8C5A21",
        },
        // Danger — muted brick rather than pure red, matches the rest of
        // the palette's restraint.
        danger: {
          100: "#F8E0DB",
          300: "#E0968A",
          500: "#BD5140",
          700: "#8B392C",
        },
        success: {
          100: "#DCEEE1",
          500: "#2F8F5B",
          700: "#236B45",
        },
        // A small rotation of muted tones for category badges/chart bars,
        // so distinct categories are visually distinguishable without
        // resorting to bright, saturated colors.
        tag: {
          plum: { 100: "#EEE1F1", 700: "#6C3E7C" },
          teal: { 100: "#DAEEEA", 700: "#20685D" },
          rose: { 100: "#F7E1E6", 700: "#9C3B57" },
          slate: { 100: "#E6E7EF", 700: "#454A63" },
        },
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"IBM Plex Sans\"", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(19, 21, 31, 0.05), 0 1px 1px rgba(19, 21, 31, 0.04)",
        raised: "0 4px 16px -4px rgba(19, 21, 31, 0.12), 0 2px 6px -2px rgba(19, 21, 31, 0.08)",
        popover: "0 12px 32px -8px rgba(19, 21, 31, 0.22), 0 4px 12px -4px rgba(19, 21, 31, 0.12)",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.2s ease-out",
        "fade-in": "fade-in 0.15s ease-out",
        "scale-in": "scale-in 0.15s ease-out",
      },
    },
  },
  plugins: [],
};
