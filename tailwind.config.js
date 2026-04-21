/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5D77E',
          dark: '#A8891E',
          pale: '#FDF3D0',
        },
        islamic: {
          green: '#1B4332',
          'green-mid': '#2D6A4F',
          'green-light': '#40916C',
          cream: '#FAF7F0',
          'cream-dark': '#EDE0C4',
          burgundy: '#722F37',
          dark: '#0D0A08',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        amiri: ['Amiri', 'serif'],
        inter: ['Inter', 'sans-serif'],
        scheherazade: ['Scheherazade New', 'serif'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 3s infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'rotate-slow-rev': 'rotate-slow-rev 25s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'draw': 'draw 2s ease-in-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'rotate-slow-rev': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,175,55,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(212,175,55,0.8)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.5)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5D77E 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0D0A08 0%, #1B4332 100%)',
        'invitation-bg': 'linear-gradient(180deg, #FAF7F0 0%, #EDE0C4 100%)',
      },
    },
  },
  plugins: [],
}
