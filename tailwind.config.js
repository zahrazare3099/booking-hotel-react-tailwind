/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#f3f4f6",
        "primary-700": "#4338ca",
        "primary-600": "#4f46e5",
        "primary-100": "#e0e7ff",
        "rose-500": "#f43f5e",
      },
    },
  },
  plugins: [],
};
