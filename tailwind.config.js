/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'page-background': "url('image/cliff-brige.jpg')"
      }
    },
  },
  plugins: [],
}
