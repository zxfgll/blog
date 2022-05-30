import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { debounce } from 'lodash'

const pinia = createPinia()

pinia.use(({ store, options }) => {
    if (options.debounce) {
        const actionsList = Object.keys(options.debounce) // 获取节流action列表
        actionsList.forEach((action) => {
            store[action] = debounce(store[action], options.debounce[action]) // action会被挂载到store的实例上，我们直接用节流后的action替代原来的action
        })
    }
})

createApp(App).use(pinia).mount('#app')
