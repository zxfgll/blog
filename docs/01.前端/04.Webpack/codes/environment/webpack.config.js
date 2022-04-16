var webpack = require('webpack');
const hwp = require('html-webpack-plugin')

var devFlagPlugin = new webpack.DefinePlugin({
  // __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  __DEV__: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    devFlagPlugin,
    new hwp(),
  ]
};
