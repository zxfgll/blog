const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const plugins = [
  new HtmlWebpackPlugin({
    template : path.join(__dirname , 'index.html')
  }),
]

// 如果输入指定命令，展示可视化打包页面
// if (TARGET == "build:test" || TARGET == "build:pro") {
//   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//   plugins.push(new BundleAnalyzerPlugin({
//     analyzerMode: 'server',       // 默认值：server，共有server，static，json，disabled四种模式
//     analyzerHost: '127.0.0.1',    // 默认值：127.0.0.1，在server模式下使用的主机启动HTTP服务器。
//     analyzerPort: 8889,           // 默认值：8888，在server模式下使用的端口号
//     reportFilename: "report.html", // 默认值：report.html，在static模式下生成的捆绑报告文件的路径名
//     openAnalyzer: true,            // 默认值：true，是否在默认浏览器中自动打开报告
//   }))
// }

module.exports = {
  mode : 'development',
  entry: './main.jsx',
  output: {
    filename: '[name].js'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // 插件 @babel/preset-env  @babel/preset-react
          }
        }
      },
    ]
  },
};
