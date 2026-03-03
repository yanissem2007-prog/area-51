/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vault: '#2a1f14',
        olive: '#3a4a3f',
        sand: '#c2a97a',
        blood: '#8b0000',
      },
      fontFamily: {
        dossier: ['Special Elite', 'serif'],
        body: ['Barlow Condensed', 'sans-serif'],
      },
      animation: {
        radar: 'radar 4s linear infinite',
        pulseStamp: 'pulseStamp 2.8s ease-in-out infinite',
        glitch: 'glitch 2.5s infinite',
        floatSlow: 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseStamp: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-2px, 0)' },
          '80%': { transform: 'translate(2px, -1px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
