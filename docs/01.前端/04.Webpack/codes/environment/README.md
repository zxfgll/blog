---
title: README
date: 2022-04-15 21:00:21
permalink: /pages/4a0fb7/
categories:
  - 前端
  - Webpack
  - codes
  - environment
tags:
  - 
---
cross-env: 运行跨平台设置和使用环境变量的脚本，屏蔽各平台差异

DefinePlugin: DefinePlugin 允许在 **编译时** 将你代码中的变量替换为其他值或表达式。替换的值将成为全局变量 , **webpack4之前使用**,
**webpack4**之后在配置文件中使用，如 `mode: 'development',`

### NODE_ENV
1. 是约定俗成的属性，process.env中不存在该属性
2. mode 和 NODE_ENV是不同的东西，一个在配置文件中写，一个在脚本中设置

### mode
-   development : 
会将 `process.env.NODE_ENV` 的值设为 development。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。

-   production :
会将 process.env.NODE_ENV 的值设为 production。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`。
