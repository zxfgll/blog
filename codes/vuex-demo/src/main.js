import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'

const imgModule = {
  namespaced : true,
  state(){
    return {
      imgUrl : ''
    }
  },
  getters:{
    someGetter (state, getters, rootState, rootGetters) {
      getters.someOtherGetter // -> 'foo/someOtherGetter'
      rootGetters.someOtherGetter // -> 'someOtherGetter'
    },
  },
  mutations: {
    setImgUrl(state, { url }) {  // 这里的 `state` 对象是模块的局部状态
      console.log(url);
      state.imgUrl = url
    }
  },
  actions: {
    getImage({ commit , state , rootState ,rootGetters  }, { url }) { // 用state 和 rootState区分模块的状态的store状态
      return fetch(url)
        .then(res => res.json())
        .then(({ images }) => {
          commit('setImgUrl', { url: images[0].url })
        })
    },

    getImage :{
      root : true,
      handler({ commit , state , rootState ,rootGetters  }, { url }) { // 用state 和 rootState区分模块的状态的store状态
        return fetch(url)
          .then(res => res.json())
          .then(({ images }) => {
            commit('setImgUrl', { url: images[0].url })
          })
      },
    }
    
  },
  
}

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
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
  },
  actions: {
    increment({ commit, state, getters }, { num }) {
      setTimeout(() => {
        commit('increment', { num })
      }, 1000)
    },
  },
  modules:{
    imgModule
  }
})


createApp(App).use(store).mount('#app')
