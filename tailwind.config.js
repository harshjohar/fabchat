<<<<<<< HEAD
const { url } = require("inspector");
=======
const { color } = require('@mui/system');
const { url } = require('inspector');
const colors= require("tailwindcss/colors")
>>>>>>> fb26bd65819356ba587c1d67e105e6ca636301b6

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
<<<<<<< HEAD
      "landing-background": "url('/images/background-landing.jpeg')",
=======
      'landing-background': "url('/images/background.png')"
>>>>>>> fb26bd65819356ba587c1d67e105e6ca636301b6
    },
    extend: {
      colors: {
        fabchat: {
          //NEW darkmint Theme
          primary: "#191E29",
          background: "#191E29",
          hoverBackground: "#132D46",
          hoverPrimary: "rgba(1, 195, 141, 0.25)",
          hoverSecondary: "#f5f5f5",
          addServerBtn: "rgba(1, 195, 141, 1)", //added color for + button
          text: "#fafafa",
          white: "#ffffff",
          black: "#000000",
          inputBackground:
            "linear-gradient(0deg, rgb(15, 33, 73), rgba(15, 33, 73, 1))",
          topLeft: "#2f3136",
          subtext: "rgba(1, 195, 141, 1)",
        },
<<<<<<< HEAD
        fabchatOriginal: {
          //Original Blue Theme
          primary: "rgb(33, 72, 220)",
          background: "rgba(1, 25, 54, 1)",
          hoverBackground: "#0A214D",
          hoverPrimary: "#2B6CB0",
          hoverSecondary: "#f5f5f5",
          text: "#fafafa",
          white: "#ffffff",
          black: "#000000",
          inputBackground:
            "linear-gradient(0deg, rgb(15, 33, 73), rgba(15, 33, 73, 1))",
          topLeft: "#2f3136",
          subtext: "rgba(172, 181, 199, 1)",
        },
=======
        fabchatOriginal: { //Original Blue Theme
          primary: 'rgb(33, 72, 220)',
          background: 'rgba(1, 25, 54, 1)',
          hoverBackground: '#0A214D',
          hoverPrimary: '#2B6CB0',
          hoverSecondary: '#f5f5f5',
          text: '#fafafa',
          white: '#ffffff',
          black: '#000000',
          inputBackground: 'linear-gradient(0deg, rgb(15, 33, 73), rgba(15, 33, 73, 1))',
          topLeft: '#2f3136',
          subtext: 'rgba(172, 181, 199, 1)',
        }
>>>>>>> fb26bd65819356ba587c1d67e105e6ca636301b6
      },
      animation: {
        "loading-spin": "spin 2s ease-in-out infinite",
      },
      fontFamily: {
        frederikaone: ["FrederikaOne", "sans-serif"],
<<<<<<< HEAD

        itim: ["Itim", "cursive"],
        SourceSansPro: ["Source Sans Pro", "cursive"],
      },
=======
        Londrina: "'Londrina Solid', cursive" ,
        LondrinaThin: "'Londrina Thin', cursive",
      }
>>>>>>> fb26bd65819356ba587c1d67e105e6ca636301b6
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
