/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      small: '600px',
      small1: '500px',
      small2: '650px',
      small3: '750px',
      extraSmall: '360px',
      large: '1100px',
      medium: '960px',
    },
    extend: {
      colors: {
        calm: '#ECF2FF',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        scaleIn: 'scaleIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
