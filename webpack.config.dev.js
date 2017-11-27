const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
const mode = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const port = +process.env.PORT || 9000;

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
    path: path.join(__dirname, '_posts'),
    filename: 'codelabs.js',
    library: 'CodeLabs',
    libraryTarget: 'umd',
    publicPath: '/',
    umdNamedDefine: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
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
  devServer: {
    historyApiFallback: true,
    contentBase: 'public/',
    hot: true,
    inline: true,
    port,
    proxy: [
      {
        context: ['/api/**'],
        target: 'http://localhost:3000',
        secure: false,
      },
    ],
    stats: {
      chunks: false,
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};
