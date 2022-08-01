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
        fabchat: {
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
        },
      },
      animation: {
        'loading-spin': 'spin 2s ease-in-out infinite',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
