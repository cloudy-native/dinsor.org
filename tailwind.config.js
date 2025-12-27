import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#FAFAF8", // Warm off-white
          foreground: "#1C2E1C", // Very dark forest green
          primary: {
            50: "#F2F7F2",
            100: "#E5EFE5",
            200: "#CCDFC9",
            300: "#A8C9A3",
            400: "#7DAD75",
            500: "#4A7C4A", // Deep leaf green
            600: "#3D6640",
            700: "#2F5033",
            800: "#223A26",
            900: "#152419",
            DEFAULT: "#4A7C4A",
            foreground: "#FFFFFF",
          },
          secondary: {
            50: "#F4F7F2",
            100: "#E8EFE5",
            200: "#D1DFCB",
            300: "#B5CAA8",
            400: "#92AF7D",
            500: "#658B4E", // Mid-tone green
            600: "#527240",
            700: "#3E5930",
            800: "#2B4020",
            900: "#182710",
            DEFAULT: "#658B4E",
            foreground: "#FFFFFF",
          },
          success: {
            DEFAULT: "#5A8F5A", // Rich green
            foreground: "#FFFFFF",
          },
          warning: {
            DEFAULT: "#8BA86B", // Sage green
            foreground: "#1C2E1C",
          },
          danger: {
            DEFAULT: "#6B5A4E", // Earthy brown from stems
            foreground: "#FFFFFF",
          },
        },
      },
      dark: {
        colors: {
          background: "#0D1A0D", // Very dark forest
          foreground: "#E8F0E8", // Soft light green
          primary: {
            50: "#152419",
            100: "#223A26",
            200: "#2F5033",
            300: "#3D6640",
            400: "#4A7C4A",
            500: "#7DAD75", // Brighter leaf green for dark
            600: "#A8C9A3",
            700: "#CCDFC9",
            800: "#E5EFE5",
            900: "#F2F7F2",
            DEFAULT: "#7DAD75",
            foreground: "#0D1A0D",
          },
          secondary: {
            50: "#182710",
            100: "#2B4020",
            200: "#3E5930",
            300: "#527240",
            400: "#658B4E",
            500: "#92AF7D", // Brighter mid-tone green
            600: "#B5CAA8",
            700: "#D1DFCB",
            800: "#E8EFE5",
            900: "#F4F7F2",
            DEFAULT: "#92AF7D",
            foreground: "#0D1A0D",
          },
          success: {
            DEFAULT: "#6FA86F", // Brighter rich green
            foreground: "#0D1A0D",
          },
          warning: {
            DEFAULT: "#A3BF85", // Brighter sage
            foreground: "#0D1A0D",
          },
          danger: {
            DEFAULT: "#8B7565", // Lighter earthy brown
            foreground: "#FFFFFF",
          },
        },
      },
    },
  })],
}
