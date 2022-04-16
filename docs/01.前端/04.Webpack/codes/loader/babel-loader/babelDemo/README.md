---
title: README
date: 2022-04-15 21:00:21
permalink: /pages/fb0f81/
categories:
  - 前端
  - Webpack
  - codes
  - loader
  - babel-loader
  - babelDemo
tags:
  - 
---
[详细教程](https://www.jiangruitao.com/babel/) 

# 总体思路
1. 通过**preset-env** 设置目标环境
2. 通过**useBuiltIns**设置到**core.js**中查找脚本并执行代码转换（即实现polyfills）

# 逐步渐进
1.  比如要转化所有箭头函数：
```
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

2.  更好的方式是使用一个"preset"，其中包含一组预设的插件，安装插件**@babel/preset-env**
3.  通过命令行还是太麻烦，我们可以新建一个**babel.config.json**文件来编写配置


### preset-env ： 为代码的运行环境提供预设内容
##### 参数
**targets** ： 目标运行环境

-   不提供或显示提供 **"targets": "defaults"**，babel会以兼容最旧浏览器作为目标，即转换所有ES6代码为ES5代码
-   @babel/preset-env 会自动读取[browserslist config sources](https://github.com/browserslist/browserslist#queries)配置作为目标环境，官方推荐在package.json进行配置
```
{
    "browserslist": [ // 用户使用率大于1%的最后一个IE 10版本
    "last 1 version",
    "> 1%",
    "IE 10"
  ] 
}
```

# 相关术语：
-   **core-js** 是实现 JavaScript 标准运行库之一，它提供了从ES3～ES7+ 以及还处在提案阶段的 JavaScript 的实现。
-  **@babel/polyfill** 已被废弃
```
 // @babel/polyfill 等同于
  import 'core-js/stable'
  import 'regenerator-runtime/runtime' 
```
-  **@babel/cli** : @babel/cli 是一个允许你在终端使用 babel 的工具 ， 执行编译的cli命令 ： **npx babel 文件名 -o 输出文件名**
-  **@babel/core** : 核心代码


注： 高版本的浏览器已经支持了部分ES6语法，所以官网的配置下，编译前与编译后的箭头函数代码并没有不同。



