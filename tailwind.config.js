/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: "rgb(201, 75, 73)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
