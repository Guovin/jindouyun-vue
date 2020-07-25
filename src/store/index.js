import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //储存token
  state: {
    Authorization: localStorage.getItem('Authorization')
      ? localStorage.getItem('Authorization')
      : '',
  },
  //修改token
  mutations: {
    ChangeToken(state, Authorization) {
      state.Authorization = Authorization
      localStorage.setItem('Authorization', Authorization)
    },
  },
  actions: {},
  modules: {},
})
