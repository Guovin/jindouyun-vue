import request from '@/utils/request'

//登陆
export function login(tel, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      tel: tel,
      password: password,
    },
  })
}

//获取用户信息
export function getUser() {
  return request({
    method: 'get',
    url: '/user',
  })
}

//注销
export function logOut() {
  return request({
    method: 'get',
    url: '/logout',
  })
}

//修改密码
export function updatePassword(password) {
  return request({
    method: 'post',
    url: '/updatePassword',
    data: {
      password: password,
    },
  })
}
