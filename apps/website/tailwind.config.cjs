/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
"primary": "#16102B",
"secondary": "#361540",
"accent": "#5C7493",
"neutral": "#181925",
"base-100": "#FAF5FF",
"info": "#7ED0E7",
"success": "#289F65",
"warning": "#fcd34d",
"error": "#dc2626",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
};
