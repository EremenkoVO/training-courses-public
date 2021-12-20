const autoprefixer = await import('autoprefixer');
const tailwindcss = await import('tailwindcss');

module.exports = {
  plugins: [tailwindcss, autoprefixer],
};
