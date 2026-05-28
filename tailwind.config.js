/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        shine: "shine 4s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "220% 0" },
          "100%": { backgroundPosition: "-220% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(255, 255, 255, 0.18)",
      },
    },
  },
  plugins: [],
};
