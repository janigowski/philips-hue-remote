/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#18191A',
        darkSurface: '#23272F',
        accent: '#4F8CFF',
        neumorphShadow: 'rgba(0,0,0,0.6)',
        neumorphHighlight: 'rgba(255,255,255,0.05)'
      },
      boxShadow: {
        neumorph: '8px 8px 16px #141518, -8px -8px 16px #23272F',
        neumorphInset: 'inset 4px 4px 8px #141518, inset -4px -4px 8px #23272F'
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
}