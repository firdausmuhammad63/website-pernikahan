/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",              // semua file HTML di root
    "./src/**/*.{html,js}",  // semua HTML & JS di dalam folder src
  ],
  theme: {
    extend: {
      fontFamily: {
        soft: ['Poppins', 'sans-serif'], 
        lato: ['Lato', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        'primary': '#3b82f6',
        'light': '#60a5fa',
        'bg': '#fff8e7',
        'navy': '#000080',
      },
    },
  },
  plugins: [],
}
