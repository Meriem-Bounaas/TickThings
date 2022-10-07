/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'font': [ 'Inter Tight', 'sans-serif'],
      'logo': ['Yellowtail', 'cursive'],
      'title': ['Montserrat Alternates'],
    },
    colors: {
      'red' : '#dc2626',
      'orange' : '#ff8408',
      'green': '#179f4c',
      'black' : "#000000",
      'white' : "#ffffff",
      'primary-color' : '#1e293b',
      'second-color'  : '#1d4ed8',
      'third-color'   : '#d1d5db',
      'forth-color' : '#6d7075'
    },
    extend: {},
  },
  plugins: [],
}
