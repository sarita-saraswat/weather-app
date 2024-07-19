/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./WFA/src/.{index.html,script.js}"],
  theme: {
    extend: {},
    screens: {
      'sm': '370px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },

  },
  plugins: [],
}

