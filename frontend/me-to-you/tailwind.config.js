/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from "tailwind-scrollbar";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "white": "#fff",
      "light-gray": "#F1F1F1",
      "soft-gray": "#DDDDDD",
      "gray": "#BBBBBB",
      "medium-gray": "#777777",
      "dark-gray": "#444444",
      "black": "#000",
      "primary": "#5498FF",
      "primary-active": "#196FF0",
      "sub-sky": "#C4E1F6",
      "green": "#91CEB3",
      "pink": "#F1B1AD",
      "yellow": "#FFF1BA",
    },
    screens: {
      mobile: "320px",
      tablet: "600px",
      desktop: "1024px",
    },
    extend: {
      fontFamily: {
        "light": ["Pretendard-Light", "system-ui"],
        "regular": ["Pretendard-Regular", "system-ui"],
        "medium": ["Pretendard-Medium", "system-ui"],
        "bold": ["Pretendard-Bold", "system-ui"],
        "extra-bold": ["Pretendard-ExtraBold", "system-ui"],
      },
      fontSize: {
        icon: "25px",
      },
      keyframes: {
        slideRight: {
          "0%": {
            transform: "scaleX(0)",
            opacity: "0",
          },
          "100%": {
            transform: "scaleX(1)",
            opacity: "1",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "slide-right": "slideRight 1s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [scrollbarPlugin],
};
