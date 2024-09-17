/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "490px",
      },
    },
  },
  plugins: [],
};
