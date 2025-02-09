/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e25300",
        primary_light: "#f76917",
        border: "#A5A5A5",
        bg: "#EDEDED",
        charcoal: "#31333C",
      },
      borderRadius: {
        roundedCustom: "67% 33% 80% 20% / 42% 47% 53% 58%  ",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Poppins font
      },
      backgroundImage: {
        "main-bg": "url('/src/assets/svg/hexagon.svg')",
        card_gradient:
          "linear-gradient(45deg, rgba(252,255,250,1) 0%, rgba(238,234,231,1) 100%);",
      },
      "rounded-custom": {
        "border-radius": "67% 33% 80% 20% / 42% 47% 53% 58%",
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
        gradient: "gradient 8s linear infinite",
      },
    },

    plugins: [],
  },
};
