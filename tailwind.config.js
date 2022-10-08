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
    
    extend: {
      colors: {
        red : 'var(--red)',
        orange : 'var(--orange)',
        green: 'var(--green)',
        black : 'var(--black)',
        white : 'var(--white)',
        "primary-color" : 'var(--primary-color)',
        "second-color"  : 'var(--second-color)',
        "third-color"   : 'var(--third-color)',
        "forth-color": 'var(--forth-color)'
      },
    },
  },
  plugins: [],
}
