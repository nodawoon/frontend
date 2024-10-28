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
      "light-gray": "#EEEEEE",
      "soft-gray": "#DDDDDD",
      "gray": "#BBBBBB",
      "medium-gray": "#777777",
      "dark-gray": "#444444",
      "black": "#000",
      "primary": "#5498FF",
      "primary-active": "#196FF0",
      "sub-sky": "#C4E1F6",
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
    },
  },
  plugins: [scrollbarPlugin],
};
