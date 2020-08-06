import { getToken } from '@/utils/auth'

const token = {
  //储存token
  state: {
    Authorization: getToken(),
  },
  //修改token
  mutations: {
    ChangeToken(state, Authorization) {
      state.Authorization = Authorization
    },
  },
}
export default token
