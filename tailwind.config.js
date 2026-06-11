/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#050d24',
          800: '#0B1437',
          700: '#112060',
          600: '#1a3080',
          500: '#1e40af',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: 'var(--gold-500)',
          600: '#d97706',
          700: '#b45309',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          hover:   'rgba(255,255,255,0.10)',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #050d24 0%, #0B1437 50%, #1a3080 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5A623 0%, #fbbf24 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.37)',
        gold:  '0 4px 24px rgba(245,166,35,0.3)',
        card:  '0 4px 24px rgba(0,0,0,0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease forwards',
        'slide-up':   'slideUp 0.6s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseGold: { '0%,100%': { boxShadow: '0 0 0 0 rgba(245,166,35,0.4)' }, '50%': { boxShadow: '0 0 0 12px rgba(245,166,35,0)' } },
      },
    },
  },
  plugins: [],
};
