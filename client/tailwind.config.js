/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          600: '#4F46E5',
          700: '#4338CA',
        },
      },
    },
  },
  plugins: [],
};
