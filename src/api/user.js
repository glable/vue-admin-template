import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/userList',
    method: 'get',
    params: query
  })
}

export function addUser(query) {
  return request({
    url: '/user/addUser',
    method: 'post',
    params: query
  })
}

export function editUser(query) {
  return request({
    url: '/user/editUser',
    method: 'post',
    params: query
  })
}

export function deleteUser(query) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    params: query
  })
}
