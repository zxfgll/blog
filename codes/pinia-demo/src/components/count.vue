<template>
    <div>
        {{num}}
        <button @click="add">add</button>
        <button @click="reset">reset</button>
    </div>
</template>

<script setup lang="ts">
import {useCounterStore} from '../store/count.js'
import { storeToRefs } from 'pinia';

const counter = useCounterStore() // 生成store

const {num} = storeToRefs(counter) // 丢失响应性

const add = () =>{
    // counter.num ++ // 直接操作state
    // counter.$patch({num : counter.num + 1}) // 定义一个局部state，增量更新源state
    // counter.$patch((state)=>{ // 如果你为patch传入了一个函数，pinia会提供state作为参数供你操作，从vuex开始就已经引入了immer，所以放心大胆的直接操作对象和数组吧
    //     state.num = state.num + 1
    // })
    counter.increment() // 调用方法
}

const reset = () =>{
    counter.$reset()
}

</script>
