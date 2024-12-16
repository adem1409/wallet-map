/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: { DEFAULT: "#355942", dark: "#264030" },
        gold: { DEFAULT: "#fff7c9" },
        gray: { DEFAULT: "#656D9A" },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        rubik: ["var(--font-rubik)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
