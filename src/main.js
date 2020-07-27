import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  Button,
  Input,
  Icon,
  Alert,
  Menu,
  Layout,
  Table,
  Popconfirm,
  Row,
  Col,
  Card,
  Statistic,
} from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Icon.name, Icon)
Vue.component(Alert.name, Alert)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
Vue.component(Layout.name, Layout)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Table.name, Table)
Vue.component(Popconfirm.name, Popconfirm)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Card.name, Card)
Vue.component(Statistic.name, Statistic)

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
