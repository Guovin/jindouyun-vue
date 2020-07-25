import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Button, Input, Icon, Alert } from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Icon.name, Icon)
Vue.component(Alert.name, Alert)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://localhost:8199'
global.axios = axios

//请求头拦截器，请求头加token
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
