/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customStart: "#F5813D",
        customEnd: "#C24E0A",
      },
    },
  },
  plugins: [],
};
