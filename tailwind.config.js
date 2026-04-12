/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F5',
        charcoal: '#1A1A1A',
        'charcoal-soft': '#2E2E2E',
        'charcoal-muted': '#6B6B6B',
        'accent-blue': '#3B82C4',
        'accent-blue-light': '#EBF3FB',
        'accent-green': '#4A9B78',
        'accent-green-light': '#EAF5EE',
        border: '#E5E5E2',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        snug: '-0.01em',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
