/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "protest-riot": "Protest Riot",
        mono: "Mono",
        "roboto-serif": "Roboto Serif",
        roboto: "Roboto",
      },
    },
  },
  plugins: [],
};
