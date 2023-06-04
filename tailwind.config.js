/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        loadingCircle: "loadingRotate 2s linear infinite",
        loadingPath: "loadingDash 1.5s ease-in-out infinite",
      },
      keyframes: {
        loadingDash: {
          "0%": {
            strokeDasharray: "1, 200",
            strokeDashoffset: "0",
          },
          "50%": {
            strokeDasharray: "89, 200",
            strokeDashoffset: "-35px",
          },
          "100%": {
            strokeDasharray: "89, 200",
            strokeDashoffset: "-124px",
          },
        },
        loadingRotate: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      fontFamily: {
        sans: "'Urbanist', sans-serif",
      },
    },
  },
  plugins: [],
};
