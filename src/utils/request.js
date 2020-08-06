import axios from 'axios'
// import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8199', // 默认访问地址
  timeout: 5000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() //请求头带上token
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器 (定义response返回格式)
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error.response.status, error.response.data.error)
    return Promise.reject(error)
  }
)

export default service
