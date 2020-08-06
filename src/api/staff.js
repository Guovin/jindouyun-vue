import request from '@/utils/request'

//获取员工信息
export function getStaff() {
  return request({
    method: 'get',
    url: '/selectStaff',
  })
}

//删除员工
export function deleteStaff(key) {
  return request({
    method: 'post',
    url: '/deleteStaff',
    data: {
      id: key,
    },
  })
}

//更新员工信息
export function updateStaff(key, name, age, address) {
  return request({
    method: 'post',
    url: '/updateStaff',
    data: {
      id: key,
      name: name,
      age: age,
      address: address,
    },
  })
}

//保存全部
export function saveStaff(dataSource) {
  return request({
    method: 'post',
    url: '/saveStaff',
    data: {
      source: dataSource,
    },
  })
}
