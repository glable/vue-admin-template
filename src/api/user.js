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
    url: '/user/saveUser',
    method: 'post',
    params: query
  })
}

export function getUser(username) {
  return request({
    url: '/user/getUser/' + username + '/',
    method: 'get'
  })
}

export function editUser(query) {
  return request({
    url: '/user/editUser',
    method: 'post',
    params: query
  })
}

export function deleteUser(username) {
  return request({
    url: '/user/deleteUser/' + username,
    method: 'delete'
  })
}
