/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 80px rgba(120, 74, 30, 0.18)',
      },
      backgroundImage: {
        'brew-gradient': 'radial-gradient(circle at top, rgba(255, 225, 194, 0.95), rgba(247, 189, 118, 0.72) 34%, rgba(246, 240, 229, 0.98) 75%)',
        'brew-night': 'radial-gradient(circle at top, rgba(62, 47, 36, 0.98), rgba(25, 21, 19, 0.98) 65%)',
      },
      colors: {
        brew: {
          cream: '#fff8ef',
          latte: '#f6d7b0',
          caramel: '#c77b3b',
          espresso: '#3a2417',
          tea: '#7d9b75',
          mint: '#d9f1e4',
          rose: '#e9b4ad',
          cocoa: '#5a3826',
          night: '#15100f',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out both',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.75' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
