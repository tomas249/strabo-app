module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        poppins: ['--font-poppins', 'sans-serif'],
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        neutral: {
          50: '#F5F5F8',
          100: '#EBEBF0',
          200: '#D3D3E0',
          300: '#B5B5CA',
          400: '#9494B2',
          500: '#72729B',
          600: '#59597C',
          700: '#41415B',
          800: '#29293A',
          900: '#121219',
        },
        primary: {
          50: '#F9F8FF',
          100: '#ECEAFF',
          200: '#CEC9FF',
          300: '#A097FF',
          400: '#7468FF',
          500: '#5547F6',
          600: '#453ABE',
          700: '#342C8F',
          800: '#1E1D5F',
          900: '#100F30',
        },
        secondary: {
          50: '#EDFCFB',
          100: '#D7F8F8',
          200: '#B3F3F3',
          300: '#87E7E7',
          400: '#40C9D1',
          500: '#03A9B4',
          600: '#00868E',
          700: '#005C62',
          800: '#123F45',
          900: '#001F21',
        },
        success: {
          50: '#EDFBF5',
          100: '#DBF6EA',
          200: '#B8EED5',
          300: '#82E1B6',
          400: '#49D093',
          500: '#2BAE73',
          600: '#198655',
          700: '#136540',
          800: '#0C432A',
          900: '#062215',
        },
        warning: {
          50: '#FFF4F3',
          100: '#FFE6E5',
          200: '#FFC6C2',
          300: '#FF9B95',
          400: '#FF7067',
          500: '#F44336',
          600: '#C3362B',
          700: '#922820',
          800: '#621B16',
          900: '#310D0B',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
