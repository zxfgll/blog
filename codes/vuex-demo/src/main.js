import { createApp } from 'vue'
import App from './App.vue'
import {createStore} from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
    state () {
      return {
        count: 0
      }
    },
    getters:{
        double : (state)=> state.count * 2,
        fourTimes : (state ,getters) => getters.double * 2,
        customNum : (state , getters) => (num)=>{
            if(num === 2) return getters.double
            if(num === 4) return getters.fourTimes
        } 
    },
    mutations: {
      increment (state , {num = 1 }) {
        state.count += num
      }
    }
  })
  

createApp(App).use(store).mount('#app')
