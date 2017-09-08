module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['import', 'html'],
  settings: {
    'html/html-extensions': ['.html', '.jsx'],
  },
  env: {
    jest: true,
    browser: true,
  },
};
