const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    backgroundImage: {
      'landing-background': "url('/images/background-landing.jpeg')"
    },
    extend: {
      colors: {
        fabchat: { //darkmint Theme
          primary: 'rgb(33, 72, 220)',
          background: '#191E29',
          hoverBackground: '#132D46',
          hoverPrimary: 'rgba(1, 195, 141, 0.25)',
          hoverSecondary: '#f5f5f5',
          addServerBtn: 'rgba(1, 195, 141, 1)' ,
          text: '#fafafa',
          white: '#ffffff',
          black: '#000000',
          inputBackground: 'linear-gradient(0deg, rgb(15, 33, 73), rgba(15, 33, 73, 1))',
          topLeft: '#2f3136',
          subtext: 'rgba(1, 195, 141, 1)',
        },
      },
      animation: {
        'loading-spin': 'spin 2s ease-in-out infinite',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
