/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#42b883',
          dark: '#35a372',
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        'danger-dark': '#dc2626',
        info: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        secondary: '#6b7280',
      },
    },
  },
  plugins: [],
}

