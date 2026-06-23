/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8FAF3',
          100: '#EEF3E3',
          200: '#DCE8C5',
          300: '#BED294',
          400: '#8EAA55',
          500: '#5F7F2B',
          600: '#4F6B24',
          700: '#3E561F',
          800: '#1F3F2A',
          900: '#17301F',
        },
        school: {
          green: '#5F7F2B',
          dark: '#1F3F2A',
          gold: '#F2C94C',
          teal: '#2F6F73',
          light: '#F8FAF3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
