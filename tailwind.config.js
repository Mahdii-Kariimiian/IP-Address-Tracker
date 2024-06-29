/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'desktop-bg': 'url("./assets/pattern-bg-desktop.png")' ,
        'mobile-bg' : 'url("./assets/pattern-bg-mobile.png")'
      }
    },
  },
  plugins: [],
}