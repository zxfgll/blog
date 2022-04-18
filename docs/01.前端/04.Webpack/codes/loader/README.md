### 什么是loader
返回一个对象的函数

### 多个loader如何执行
将上一个loader的结果作为下一个loader的参数

### loader runner
调用一系列loader的执行器

>   默认情况下 webpack 会对文件内容进行 UTF8 编码，当 loader 需要处理二进制数据时，需要设置 raw 为 true。此后，webpack 用使用 raw-loader 来加载所指定的文件，而不会对文件内容进行 UTF8 编码。