/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fabchat: {
          primary: '#36393f',
          blurple: '#5865F2',
          green: '#57F287',
          yellow: '#FEE75C',
          fuchsia: '#EB459E',
          red: '#ED4245',
          white: '#ffffff',
          black: '#000000',
          sidebarleft: '#202225',
          topLeft: '#2f3136',
          selectedOption: 'rgba(79,84,92,0.32)',
        },
      },
      animation: {
        'loading-spin': 'spin 2s ease-in-out infinite',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
