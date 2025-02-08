/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc2c2',
          300: '#ff9999',
          400: '#ff7070',
          500: '#ff4747',
          600: '#cc3939',
          700: '#992b2b',
          800: '#661d1d',
          900: '#330e0e',
        },
        status: {
          waiting: '#FFB020',
          inProgress: '#2196F3',
          success: '#14B8A6',
          error: '#D14343',
          warning: '#FFB020',
        },
        surface: {
          light: '#FFFFFF',
          DEFAULT: '#F8F9FA',
          dark: '#E9ECEF',
        },
        background: {
          light: '#F8F9FA',
          DEFAULT: '#F1F3F5',
          dark: '#E9ECEF',
        },
        card: {
          light: '#FFFFFF',
          DEFAULT: '#F8F9FA',
          dark: '#E9ECEF',
        },
        border: {
          light: '#E9ECEF',
          DEFAULT: '#DEE2E6',
          dark: '#CED4DA',
        },
        text: {
          primary: '#212529',
          secondary: '#495057',
          muted: '#868E96',
        },
        navy: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d2d9e7',
          300: '#a7b7d2',
          400: '#7790b9',
          500: '#516fa1',
          600: '#3d5584',
          700: '#32446b',
          800: '#2b3959',
          900: '#1a2236',
        }
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'card-hover': '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
        'header': '0 2px 4px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}