const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 开发环境
  entry: './main.js', // 入口文件
  output: {
    filename: 'bundle.js' // 输出文件
  },
  plugins : [
    new HtmlWebpackPlugin(), // 
  ],
};
