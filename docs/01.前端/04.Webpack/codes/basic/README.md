---
title: README
date: 2022-04-15 21:00:21
permalink: /pages/fb3efb/
categories:
  - 前端
  - Webpack
  - codes
  - basic
tags:
  - 
---
# webpack-dev-server

webpack-dev-server 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能

webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。

webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中， 如要更改，请在webpack.config中对 devMiddleware.publicPath 选项进行修改。

**启动命令：** webpack serve --open || webpack-dev-server

