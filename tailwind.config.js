/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.ts',
    './src/views/**/*.ejs',
    './src/views/layouts/boilerplate.ejs'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('prettier-plugin-tailwindcss')
  ]
};
