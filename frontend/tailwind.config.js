/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,mdx}",
    "./components/**/*.{js,ts,jsx,mdx}",
    "./app/**/*.{js,ts,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Indigo 600
        secondary: "#4338ca", // Indigo 700
      },
    },
  },
  plugins: [],
};
