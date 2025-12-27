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
          background: "#F5F5F0", // Light stone/paver color
          foreground: "#2C3E2E", // Deep forest green
          primary: {
            50: "#F0F4E8",
            100: "#E1E9D1",
            200: "#C3D3A3",
            300: "#A5BD75",
            400: "#87A747",
            500: "#6B8E23", // Olive/moss green
            600: "#567219",
            700: "#415613",
            800: "#2C3A0D",
            900: "#171D06",
            DEFAULT: "#6B8E23",
            foreground: "#FFFFFF",
          },
          secondary: {
            50: "#F8F9FA",
            100: "#E9ECEF",
            200: "#DEE2E6",
            300: "#CED4DA",
            400: "#ADB5BD",
            500: "#6C757D", // Slate gray from pavers
            600: "#495057",
            700: "#343A40",
            800: "#212529",
            900: "#0D0F11",
            DEFAULT: "#6C757D",
            foreground: "#FFFFFF",
          },
          success: {
            DEFAULT: "#4A7C59", // Forest green
            foreground: "#FFFFFF",
          },
          warning: {
            DEFAULT: "#D4A574", // Warm autumn yellow/gold
            foreground: "#2C3E2E",
          },
          danger: {
            DEFAULT: "#8B4513", // Earthy brown
            foreground: "#FFFFFF",
          },
        },
      },
      dark: {
        colors: {
          background: "#1A1F1C", // Dark forest floor
          foreground: "#E8EDE6", // Light stone
          primary: {
            50: "#171D06",
            100: "#2C3A0D",
            200: "#415613",
            300: "#567219",
            400: "#6B8E23",
            500: "#87A747", // Brighter moss green for dark mode
            600: "#A5BD75",
            700: "#C3D3A3",
            800: "#E1E9D1",
            900: "#F0F4E8",
            DEFAULT: "#87A747",
            foreground: "#1A1F1C",
          },
          secondary: {
            50: "#0D0F11",
            100: "#212529",
            200: "#343A40",
            300: "#495057",
            400: "#6C757D",
            500: "#ADB5BD", // Lighter slate for dark mode
            600: "#CED4DA",
            700: "#DEE2E6",
            800: "#E9ECEF",
            900: "#F8F9FA",
            DEFAULT: "#ADB5BD",
            foreground: "#1A1F1C",
          },
          success: {
            DEFAULT: "#5A9C6E", // Brighter forest green
            foreground: "#1A1F1C",
          },
          warning: {
            DEFAULT: "#E4B584", // Brighter autumn gold
            foreground: "#1A1F1C",
          },
          danger: {
            DEFAULT: "#A0522D", // Lighter earthy brown
            foreground: "#FFFFFF",
          },
        },
      },
    },
  })],
}
