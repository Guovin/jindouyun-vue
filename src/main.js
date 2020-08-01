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
  Modal,
  Avatar,
  Form,
  message,
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
Vue.component(Avatar.name, Avatar)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.prototype.$confirm = Modal.confirm
Vue.use(Modal)

Vue.prototype.$message = message

message.config({
  duration: 2, // 持续时间
  // top: `100px`, // 到页面顶部距离
  maxCount: 1, // 最大显示数, 超过限制时，最早的消息会被自动关闭
})

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
