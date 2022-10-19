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
        "forth-color": 'var(--forth-color)',
        "fivth-color": 'var(--fivth-color)',
        "sixth-color": 'var(--sixth-color)'
      },
      boxShadow: {
        '3xl': 'rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset',
      }
    },
  },
  plugins: [],
}
