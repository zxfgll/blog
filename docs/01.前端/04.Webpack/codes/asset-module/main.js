// 参考连接： https://www.jiangruitao.com/webpack/url-loader/

import img1 from './big.png'
import img2 from './small.png'
import txt from './myTxt.txt?raw'

const dom = `<img src=${img2} />`

window.onload = () => {
    // 插入元素方法1
    document.getElementById('img2').innerHTML = dom;

    const myImg = document.createElement('img')
    myImg.src = img1
    const myDiv = document.createElement('div')
    const content = document.createTextNode(txt)
    myDiv.appendChild(content)
    // 插入元素方法2
    document.body.appendChild(myImg)
    document.body.appendChild(myDiv)

}

