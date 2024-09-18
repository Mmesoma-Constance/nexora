/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "490px",
        xmd: "1024px",
        xlg: "1300px",
      },
    },
  },
  plugins: [],
};
