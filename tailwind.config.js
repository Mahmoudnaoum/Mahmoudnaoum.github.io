/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.src.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'] } } },
  plugins: [],
}
