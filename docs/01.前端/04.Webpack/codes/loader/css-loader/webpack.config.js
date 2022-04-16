const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode : 'development',
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template : path.join(__dirname , 'index.html')
    })
  ]
};

