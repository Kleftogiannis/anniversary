/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Soft, romantic pastel palette
        romantic: {
          50: '#fef5f9',
          100: '#fde9f2',
          200: '#fcd3e5',
          300: '#fab6d3',
          400: '#f78bb8',
          500: '#f06292',
          600: '#e91e63',
          pink: '#ffc1e0',
          rose: '#ffb3d9',
          lavender: '#e8d5f2',
          peach: '#ffd4b8',
          cream: '#fff9f0',
          blush: '#ffe8e8',
        },
        pastel: {
          // Main pastel colors - soft and dreamy
          pink: '#ffc8dd',
          rose: '#ffafcc',
          lavender: '#e0b0ff',
          lilac: '#d4b5f0',
          peach: '#ffd6a5',
          mint: '#caffbf',
          sky: '#bde0fe',
          cream: '#fff4e6',
          blush: '#ffe5ec',
          coral: '#ffccd5',
          // Accent pastels
          yellow: '#fdffb6',
          blue: '#a2d2ff',
          purple: '#cdb4db',
          green: '#d8f3dc',
        },
      },
      fontFamily: {
        sans: ['Pixelify Sans', 'Inter', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        handwriting: ['Dancing Script', 'cursive'],
        pixel: ['Pixelify Sans', 'monospace'],
        retro: ['Press Start 2P', 'monospace'],
      },
    },
  },
  plugins: [],
}