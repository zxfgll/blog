---
title: README
date: 2022-04-15 21:00:21
permalink: /pages/403c42/
categories:
  - 前端
  - Webpack
  - codes
tags:
  - 
---
源代码：https://github.com/ruanyf/webpack-demos

练习：
提升首屏加载速度（分包练习）
方案：
SplitChunks、externals


### SplitChunks
核心：
1. chunks
-   initial : 同步加载打包一次，异步加载打包一次
-   all :     同步异步都只打包一次
-   async :   异步加载打包一次

2. cacheGroups

参考链接：https://zhuanlan.zhihu.com/p/152097785


# webpack优化原则
默认：因为webpack不知道你使用了哪些npm包，所以它只能将整个node_modules打成一个包，或者将大于xxxkb的包拆分开来
目标：分包越多越好
 20/20 理论：如果站点的某些部分只有 20% 用户会访问，并且这部分的脚本量大于你整个站点的 20% 的话，你就应该考虑按需加载代码了

分包数量疑问：
1.  网络请求变多的时候是不是会变得更慢？
    使用HTTP1.1时是确实如此，但HTTP2会优化请求。

2. webpack打包的文件里会不会有多余的模板代码（包装代码）
    根据测试，一个 190 KB 的站点文件被划分为了19个文件，发送给浏览器的字节数大概多了 2%，结论是不影响



# HTTP2

### HTTP1.1和Http2的差异
-   多路复用
Http1.1 ： 并发多个请求，必须使用多个TCP链接，并且浏览器限制TCP链接数上限（6-8），基于文本格式传输
Http2   :  所有请求通过一个TCP连接并发完成，基于二进制格式传输

-   请求头header
http2 采用首部压缩策略。原理是缓存头部属性的键值对（首部表），发送之前先与上一次比较，只发送新的header。


### HTTP2 的 服务器推送（server push）和 websocket
-   http2的服务器推送：接受一个req，返回多个response
-   websocket的服务器推送： 不接受req，主动推送



备用链接
https://blog.csdn.net/mjzhang1993/article/details/86712439