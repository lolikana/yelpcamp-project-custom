/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.ts',
    './views/**/*.ejs',
    './views/layouts/boilerplate.ejs'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('prettier-plugin-tailwindcss')
  ]
};
