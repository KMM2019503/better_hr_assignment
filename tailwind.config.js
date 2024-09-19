// tailwind.config.js
module.exports = {
  important: true,
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: [
    "./src/**/*.{vue,js,ts}",
    "./presets/**/*.{js,vue,ts}", // Make sure this is correct
  ],
  plugins: [require("tailwindcss-primeui")],
};
