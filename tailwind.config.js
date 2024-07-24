/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
    ['./src/**/*.{html,js}'], // Include all HTML and JS files in the src directory
  
  theme: {
    extend: {},
    screens: {
      'sm': '375px', // iPhone SE
      'md': '768px', // iPad Mini
      'lg': '1024px', // Desktop
      
    },
  },
  plugins: [],
}

