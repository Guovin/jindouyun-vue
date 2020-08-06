import { login, getUser, logOut } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    User: null,
  },

  mutations: {
    ChangeUser(state, User) {
      state.User = User
    },
  },

  actions: {
    //注意actions，不能命名错误
    //登陆
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.tel, userInfo.password)
          .then((response) => {
            if (response.data == 200) {
              setToken(response.headers.authorization)
              commit('ChangeToken', response.headers.authorization)
              resolve()
            } else {
              reject('Login: 账号或密码错误!')
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    //获取用户信息
    GetUser({ commit }) {
      return new Promise((resolve, reject) => {
        getUser()
          .then((response) => {
            if (response.status == 200) {
              commit('ChangeUser', response.data.name)
              resolve()
            } else {
              reject('GetUser: 获取用户信息失败!')
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    //注销
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logOut()
          .then((response) => {
            if (response.data == 200) {
              //修改store的authorization为空并清除token
              commit('ChangeToken', response.headers.authorization)
              removeToken()
              commit('ChangeUser', '')
              resolve()
            } else {
              reject('LogOut: 注销失败!')
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}
export default user
