/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: { 50: '#f0f7f2', 100: '#dceee2', 200: '#bcdcc8', 300: '#95c9aa', 400: '#69ae87', 500: '#32845f', 600: '#26734f', 700: '#215b41', 800: '#204a37', 900: '#1b3e2e', 950: '#10271e' },
        slate: { 50: '#f6f7f9', 100: '#eef2ef', 200: '#e0e7e2', 300: '#c4d1c8', 400: '#94a69b', 500: '#6a7d71', 600: '#52665a', 700: '#354e3e', 800: '#1c2d23', 900: '#15221b', 950: '#101a17' },
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      minHeight: {
        'screen': '100vh',
        'screen-dynamic': '100dvh',
      },
      height: {
        'screen-dynamic': '100dvh',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
