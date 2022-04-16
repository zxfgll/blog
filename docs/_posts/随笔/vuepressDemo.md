---
title: vuepressDemo
date: 2022-04-15 20:40:46
permalink: /pages/7249b6/
categories: 
  - 随笔
tags: 
  - null
sidebar: auto
---


# markDown拓展
### 链接
-   [跳转到vuePress页面,外部链接会打开新页面](https://github.com/vuejs/vuepress)

### 自定义容器

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
:::

### 导入代码段
::: details 点击查看代码段
<<< @/docs/_posts/随笔/map.js
:::
::: tip 注意
由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，此处的 @ 默认值是 process.cwd()。
:::

### 导入局部代码段
::: details 点击查看代码段
<<< @/docs/_posts/随笔/map.js#snippet{1}
:::
::: tip 注意
此处使用的是[VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding)
:::

