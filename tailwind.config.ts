import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        test: {
          white: "#ECDFCC",
          black: "#1E201E",
          grey: "#3C3D37",
          green: "#697565"
        },
        char: {
          correctPos: "#FF9100",
          correct: "#FF9100",
          wrong: "#FFFBE6",
          default: "#00712D"
        }
      }
    },
  },
  plugins: [],
};
export default config;
