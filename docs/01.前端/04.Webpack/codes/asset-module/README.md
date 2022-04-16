---
title: README
date: 2022-04-15 21:00:21
permalink: /pages/fd7323/
categories:
  - 前端
  - Webpack
  - codes
  - asset-module
tags:
  - 
---
摘抄于[webpack官网](https://webpack.docschina.org/guides/asset-modules/)

# 资源模块
资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

### 迁移

在 webpack 5 之前，通常使用：
-   raw-loader 将文件导入为字符串
-   url-loader 将文件作为 data URI 内联到 bundle 中
-   file-loader 将文件发送到输出目录

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。  （txt文件）
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

### generator
generator : 调用第三方库，官方实例
```
const path = require('path');
 const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
       generator: {
         dataUrl: content => {
           content = content.toString();
           return svgToMiniDataURI(content);
         }
       }
      }
    ]
  },
};
```

