import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
      imgUrl: ''
    }
  },
  getters: {
    double: (state) => state.count * 2,
    fourTimes: (state, getters) => getters.double * 2,
    customNum: (state, getters) => (num) => {
      if (num === 2) return getters.double
      if (num === 4) return getters.fourTimes
    }
  },
  mutations: {
    increment(state, { num = 1 }) {
      state.count += num
    },
    setImgUrl(state, { url }) {
      console.log(url);
      state.imgUrl = url
    }
  },
  actions: {
    increment({ commit, state, getters }, { num }) {
      setTimeout(() => {
        commit('increment', { num })
      }, 1000)
    },
    getImage({ commit }, { url }) {
      return fetch(url)
        .then(res => res.json())
        .then(({ images }) => {
          commit('setImgUrl', { url: images[0].url })
        })
    }
  }
})


createApp(App).use(store).mount('#app')
