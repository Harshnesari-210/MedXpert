// tailwind.config.js
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: "#022c22",
          900: "#033d2d",
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        raleway: ['"Raleway Variable"', "sans-serif"],
        outfit: ['"Outfit Variable"', "sans-serif"],
      },
    },
  },
  plugins: [forms],
};
