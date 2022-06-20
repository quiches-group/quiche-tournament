module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "quiche-purple": "#541690",
        "quiche-red": "#FF4949",
      },
      transitionDelay: {
        '3': '.3s',
      }
    },
  },
  plugins: [],
};
