const webpack = require('webpack');
const path = require('path');

const port = +process.env.PORT || 9000;

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: [
    'babel-polyfill',
    'setimmediate',
    'isomorphic-fetch',
    path.join(__dirname, 'src', 'client', 'assets', 'scss', 'main.scss'),
    path.join(__dirname, 'src', 'client', `index.prod`),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    // Avoids : https://facebook.github.io/react/warnings/refs-must-have-owner.html
    alias: {
      react: path.resolve('node_modules/react'),
    },
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'codelabs.js',
    library: 'CodeLabs',
    libraryTarget: 'umd',
    publicPath: '/',
    umdNamedDefine: true,
  },
  plugins: [
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'production'
      }
    }),
  ],
  module: {
    rules: [
      // Styles
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      { test: /\.(scss|sass)$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }] },
      { test: /\.less$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }] },

      // JS
      { test: /\.jsx?$/, use: [{ loader: 'babel-loader' }] },

      // Images
      { test: /\.(jpe?g|png|gif)$/i, use: [{ loader: 'url-loader', options: { limit: 10240 } }] },

      // Font
      { test: /\.svg(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 65000, mimetype: 'image/svg+xml' } }] },
      { test: /\.woff(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 65000, mimetype: 'application/font-woff' } }] },
      { test: /\.woff2(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 65000, mimetype: 'application/font-woff2' } }] },
      { test: /\.[ot]tf(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 65000, mimetype: 'application/octet-stream' } }] },
      { test: /\.eot(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 65000, mimetype: 'application/vnd.ms-fontobject' } }] },
    ],
  },
};
