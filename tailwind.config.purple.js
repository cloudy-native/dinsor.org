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
          background: "#F8FBF6", // Soft white/green background
          foreground: "#1F3A1F", // Deep forest green
          primary: {
            50: "#F3F0FF",
            100: "#E9E3FF",
            200: "#D4CCFF",
            300: "#B8A8FF",
            400: "#9B7FFF",
            500: "#7C5CDB", // Purple flower
            600: "#6B4BC2",
            700: "#5A3AA9",
            800: "#492A90",
            900: "#381B77",
            DEFAULT: "#7C5CDB",
            foreground: "#FFFFFF",
          },
          secondary: {
            50: "#F0FDF4",
            100: "#DCFCE7",
            200: "#BBF7D0",
            300: "#86EFAC",
            400: "#4ADE80",
            500: "#22C55E", // Vibrant leaf green
            600: "#16A34A",
            700: "#15803D",
            800: "#166534",
            900: "#14532D",
            DEFAULT: "#22C55E",
            foreground: "#FFFFFF",
          },
          success: {
            DEFAULT: "#10B981", // Fresh green
            foreground: "#FFFFFF",
          },
          warning: {
            DEFAULT: "#A78BFA", // Light purple accent
            foreground: "#1F3A1F",
          },
          danger: {
            DEFAULT: "#8B5CF6", // Deeper purple
            foreground: "#FFFFFF",
          },
        },
      },
      dark: {
        colors: {
          background: "#0F1A0F", // Dark forest
          foreground: "#E8F5E8", // Light green-tinted white
          primary: {
            50: "#381B77",
            100: "#492A90",
            200: "#5A3AA9",
            300: "#6B4BC2",
            400: "#7C5CDB",
            500: "#9B7FFF", // Brighter purple for dark mode
            600: "#B8A8FF",
            700: "#D4CCFF",
            800: "#E9E3FF",
            900: "#F3F0FF",
            DEFAULT: "#9B7FFF",
            foreground: "#0F1A0F",
          },
          secondary: {
            50: "#14532D",
            100: "#166534",
            200: "#15803D",
            300: "#16A34A",
            400: "#22C55E",
            500: "#4ADE80", // Brighter green for dark mode
            600: "#86EFAC",
            700: "#BBF7D0",
            800: "#DCFCE7",
            900: "#F0FDF4",
            DEFAULT: "#4ADE80",
            foreground: "#0F1A0F",
          },
          success: {
            DEFAULT: "#34D399", // Brighter fresh green
            foreground: "#0F1A0F",
          },
          warning: {
            DEFAULT: "#C4B5FD", // Lighter purple accent
            foreground: "#0F1A0F",
          },
          danger: {
            DEFAULT: "#A78BFA", // Lighter purple
            foreground: "#0F1A0F",
          },
        },
      },
    },
  })],
}
