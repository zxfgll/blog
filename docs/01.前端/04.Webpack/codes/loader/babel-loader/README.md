# [babel-loader](https://www.webpackjs.com/loaders/babel-loader/)

### 什么是loader
预处理代码文件的处理器。

### 什么是babel-loader
babel-loader 是一个webpack插件，意为在webpack中运用babel转换**ES2015**代码。

用法：
1.  添加babel-loader到module的loaders列表中
2.  通过options属性给loader传递对象

关于性能优化：
1. 为了确保转译尽可能少的文件，应该排除node_modules文件夹
2. cacheDirectory选项可以将转义结果缓存起来，加快转义速度
3. 使用babel runtime来避免重复引入，[参考](http://babeljs.io/docs/plugins/transform-runtime/)

注：
对于Babel配置复杂的情况，我们可以在工程根目录单独建立一个Babel配置文件，例如**babel.config.js**。presets和plugins等配置项就不写在babel-loader的options里了，而是放在babel.config.js，babel-loader会自动读取使用其默认配置文件的配置。

其他链接： [Babel 中文文档 - 印记中文](https://babel.docschina.org/)

# __dirname ||  path.dirname()
当前模块的文件名。 这是当前模块文件的已解析符号链接的绝对路径。
功能：为了确保在各个系统端的**当前路径信息**相同