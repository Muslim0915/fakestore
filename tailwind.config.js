/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('@/assets/images/main-bg.jpg')",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      }
    },
  },
  plugins: [],
}