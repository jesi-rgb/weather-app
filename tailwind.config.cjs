/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        text: ["Inter"],
        digits: ["IBM Plex Mono"],
      },
    },
  },
  plugins: [],
};
