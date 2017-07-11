module.exports = {
  extends: 'airbnb-base',
  plugins: ['import', 'html'],
  settings: {
    'html/html-extensions': ['.html', '.jsx'],
  },
  env: {
    jest: true,
    browser: true,
  },
};
