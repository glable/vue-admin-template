import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/bill/queryList',
    method: 'get',
    params: query
  })
}

