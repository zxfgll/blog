// 参考连接： https://www.jiangruitao.com/webpack/url-loader/

import img1 from './big.png'
import img2 from './small.png'


const dom = `<img src=${img2} />`

window.onload = () => {
    document.getElementById('img2').innerHTML = dom;
    const myImg = document.createElement('img')
    myImg.src = img1
    document.body.appendChild(myImg)
}

