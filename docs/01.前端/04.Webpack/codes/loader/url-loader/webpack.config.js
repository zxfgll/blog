const hwp = require('html-webpack-plugin')
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
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new hwp({
      template : path.join(__dirname , 'index.html')
    })
  ]
};
