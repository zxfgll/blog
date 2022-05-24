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
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })
  

createApp(App).use(store).mount('#app')
