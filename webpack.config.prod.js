const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const mode = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: [
    'babel-polyfill',
    'setimmediate',
    'isomorphic-fetch',
    path.join(__dirname, 'node_modules', 'highlight.js', 'styles', 'railscasts.css'),
    path.join(__dirname, 'node_modules', 'font-awesome', 'scss', 'font-awesome.scss'),
    path.join(__dirname, 'src', 'assets', 'scss', 'main.scss'),
    path.join(__dirname, 'src', `index.${mode}`),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    // Avoids : https://facebook.github.io/react/warnings/refs-must-have-owner.html
    alias: {
      react: path.resolve('node_modules/react'),
    },
  },
  output: {
    path: path.join(__dirname, 'nginx/www'),
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
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Eleven\'s Codelabs',
      template: './src/index.ejs',
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

      // md
      { test: /\.md$/, use: [{ loader: 'raw-loader' }] },

      // Images
      { test: /\.(jpe?g|png|gif)$/i, use: [{ loader: 'url-loader' }] },

      // Font
      { test: /\.svg(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader' }] },
      { test: /\.woff(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader' }] },
      { test: /\.woff2(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader' }] },
      { test: /\.[ot]tf(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader' }] },
      { test: /\.eot(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader' }] },
    ],
  },
};
