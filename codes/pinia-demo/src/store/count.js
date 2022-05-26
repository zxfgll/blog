import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useCounterStore = defineStore('counter' , {
    state : ()=>({num : 0}),
    actions :{
        increment(){
            this.num ++
        }
    },
    getters:{
        userName : (state) => (name )=> `hello , count : ${state.num} , name :  ${name}`
    }
})

// export const useCounterStore = defineStore('counter' , ()=>{
//     const num = ref(0)
//     function increment(){
//         num.value ++
//     }
//     return {num , increment}
// })