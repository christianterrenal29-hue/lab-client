/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
<<<<<<< HEAD
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
=======
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
>>>>>>> 6f02213f17862507603ace70185a986836e978b9
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
