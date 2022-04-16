const hwp = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset',// 默认8Kb
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        test: /\.(txt)$/,
        resourceQuery: /raw/, // 查询相匹配的条件，例import txt from './myTxt.txt?row' ，即?后面的内容
        type: 'asset/source'
      }
    ]
  },
  plugins: [
    new hwp({
      template: path.join(__dirname, 'index.html')
    })
  ]
};
