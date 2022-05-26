<template>
    <div>
        {{num}}
        <button @click="add">add</button>
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
    counter.increment() // 调用方法
}

</script>
