import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import token from './modules/token'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    token,
  },
  getters,
})

export default store
