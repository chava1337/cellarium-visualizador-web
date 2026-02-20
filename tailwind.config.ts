import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: "#faf5f5",
          100: "#f5ebeb",
          200: "#e8d4d4",
          300: "#d4b4b4",
          400: "#bc8a8a",
          500: "#a66b6b",
          600: "#8f5252",
          700: "#764242",
          800: "#623838",
          900: "#523232",
          950: "#2c1818",
        },
      },
    },
  },
  plugins: [],
};

export default config;
