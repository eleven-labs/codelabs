module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    jest: true,
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/self-closing-comp': 'off',
    'global-require': 'off',
    'spaced-comment': 'off',
    'arrow-parens': 'off',
    'no-plusplus': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-dynamic-require': 'off',
    'no-underscore-dangle': 'off',
  },
};
