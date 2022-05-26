<template>
    <div>
        <img :src="imgUrl" alt="">
        <button @click="getImg">getImg</button>
    </div>
</template>

<script setup>
import { useImageStore } from '../store/image.js'
import { storeToRefs } from 'pinia';

const image = useImageStore() // 生成store
const unsubscribe = image.$onAction(
    ({ name, args, store, after, onError }) => {
        console.log('现在执行的action是：', name, '参数为：', args);
        
        after((res)=>{
            console.log('action成功完成！','结果为：' , res);
            console.log('当前的状态为' , store);
            _unsubscribe()
        })

        onError((err)=>{
            console.log('呜呜呜，出错了', "图片路径为：" , err)
        })
    })

const _unsubscribe = () =>{
    console.log('停止监听！');
    unsubscribe()
}

const { imgUrl } = storeToRefs(image)

const getImg = () =>{
    const url = 'https://api.waifu.im/random'
    image.getImg(url)
}


</script>
