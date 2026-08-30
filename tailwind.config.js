/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FBF9F5',
          50: '#FDFCF9',
          100: '#FBF9F5',
          200: '#F5F2EB',
          300: '#EDE8DE',
          400: '#DFD8CA',
          dark: '#E7E1D4',
        },
        ink: {
          DEFAULT: '#1C1917',
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917',
          900: '#0C0A09',
        },
        terracotta: {
          DEFAULT: '#C2410C',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        demand: {
          DEFAULT: '#2563EB',
          light: '#DBEAFE',
          dark: '#1D4ED8',
        },
        supply: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          dark: '#B91C1C',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'Playfair Display', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(28, 25, 23, 0.05)',
        'book': '0 1px 3px 0 rgba(28, 25, 23, 0.07), 0 1px 2px -1px rgba(28, 25, 23, 0.07)',
        'plate': '0 4px 6px -1px rgba(28, 25, 23, 0.06), 0 2px 4px -2px rgba(28, 25, 23, 0.06)',
        'elevated': '0 10px 15px -3px rgba(28, 25, 23, 0.08), 0 4px 6px -4px rgba(28, 25, 23, 0.05)',
        'tactile': '0 2px 0 0 rgba(28, 25, 23, 0.1)',
      },
      borderWidth: {
        'hairline': '0.5px',
      }
    },
  },
  plugins: [],
}
