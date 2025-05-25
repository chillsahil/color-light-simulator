/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}'
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"VCR OSD Mono"', 'monospace'],
        retro: ['"VHS Gothic"', 'cursive'],
      },
      colors: {
        background: '#2E003E',
        text: '#FBD2FF',
        accent: '#FFFFFF',
        boxBg: 'rgba(46,0,62,0.7)',
        border: '#5E3370',
        link: '#FF92ED',
      },
      boxShadow: {
        retro: '0 0 0 4px var(--tw-border-color)',
      },
    },
  },
  plugins: [],
}
