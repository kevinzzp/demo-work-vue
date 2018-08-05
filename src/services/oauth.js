import req from '../common/utils/request'

export function getConfig (body) {
  return req.get({
    url: '/api/ddOauth/getConfig',
    body
  })
}
export function getDict(type) {
  return req.get({
    url: `/api/dict/list/${type}`
  })
}
