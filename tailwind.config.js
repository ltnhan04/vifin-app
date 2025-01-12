/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        primary: {
          dark: "#081657",
          brightBlue: "#6BBDE3",
          deepBlue: "#316F95",
          blue: "#57A9D1",
          lightBlue: "#A8CFFF",
          skyBlue: "#9BBFFF",
        },
        secondary: {
          black: "#000000",
          white: "#FFFFFF",
          red: "#D15757",
          gray: { DEFAULT: "#F3F4F6", 100: "#D3D3D3", 200: "#71717A" },
          green: {
            100: "#4CAF50",
            200: "#31A04F",
          },
          yellow: "#FFD700",
          orange: "#FF8C00",
        },
      },
    },
  },
  plugins: [],
};
