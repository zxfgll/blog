// document.write("<h1>Hello World</h1>");
/**
 * Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.
 * 未能对“文档”执行“写入”：除非显式打开，否则无法从异步加载的外部脚本写入文档。
 * 
 * 解决方法：外部脚本不能直接操作文档，但可以操作dom节点
 */


 // 创建一个新的 div 元素
 let newDiv = document.createElement("div");
 // 给它一些内容
 let newContent = document.createTextNode("Hi there and greetings!");
 // 添加文本节点 到这个新的 div 元素
 newDiv.appendChild(newContent);

 document.body.appendChild(newDiv)