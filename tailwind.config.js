const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite'
      },
      screens: {
        'xs': '480px'
      }
    },
    colors: {
      'primary': '#7367F0',
      'primary-hover': '#6053EB',
      'black-light': '#495977',
      'black-dark': '#1E293B',
      'black-dark-hover': '#11243E',
      'success': '#33BE80',
      'success-hover': '#21A86C',
      'success-medium': '#D4F4EE',
      'success-light': '#F0FBF9',
      'warning': '#FFB138',
      'warning-hover': '#F49E19',
      'warning-medium': '#FAD59D',
      'warning-light': '#FDF3E4',
      'error': '#FC4D5E',
      'error-hover': '#E54151',
      'error-medium': '#FFACB4',
      'error-light': '#FFF6F7',
      'violet': '#7367F0',
      'violet-hover': '#6053EB',
      'violet-medium': '#9A96F9',
      'violet-light': '#EBEAFF',
      'cyan': '#60D1FA',
      'cyan-hover': '#45BFEB',
      'cyan-medium': '#81DDFF',
      'cyan-light': '#C3EFFF',
      'gray': '#7F9DBF',
      'gray-hover': '#6E8BAC',
      'gray-medium': '#9EAFC2',
      'gray-light': '#BECBDB',
      'paragraph': '#495977',
      'title': '#1E293B',
      'white-dark': '#F7FAFD',
      'white': '#FFFFFF',
    }
  }
}
