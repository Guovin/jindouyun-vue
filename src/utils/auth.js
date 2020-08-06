import Cookies from 'js-cookie'

const auth = 'Authorization'

export function getToken() {
  return Cookies.get(auth)
}

export function setToken(token) {
  return Cookies.set(auth, token)
}

export function removeToken() {
  return Cookies.remove(auth)
}
