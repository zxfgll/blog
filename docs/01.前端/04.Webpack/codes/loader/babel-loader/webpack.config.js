const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 编译对象
        exclude: /node_modules/, // 排除对象,需要配合test使用
        use: {
          loader: 'babel-loader', // 加载器：babel-loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // 插件 @babel/preset-env  @babel/preset-react
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'), // 指定项目的html文件路径
    }),
  ],
};
