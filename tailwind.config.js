// czechBlue: '#11457E',
// czechRed: '#D7141A',

/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
  
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  purge: [
    "./src/**/*/*.tsx",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        red: colors.red,
        blue: colors.blue,
        green: colors.green,
      }
    },  
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@vechaiui/core")({
      colors: ["red", "blue", "green"],
    }),
  ],
};