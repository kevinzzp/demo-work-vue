import req from '../common/utils/request'

export function postSaveXxCustom(body) {
  return req.post({
    url: '/api/customAdmin/saveXxCustom',
    body
  }).then(function (data) {
    return data
  })
}
export function postGetXxCustoms(body) {
  return req.post({
    url: '/api/customAdmin/getXxCustoms',
    body
  })
}
export function postgetXxSpaces(body) {
  return req.post({
    url: '/api/customAdmin/getXxSpaces',
    body
  })
}
export function GetXxCustomeDetail(body) {
  return req.post({
    url: '/api/customAdmin/getXxCustom',
    body
  })
}
export function GetXxCustomDetails(body) {
  return req.post({
    url: '/api/customAdmin/getXxCustomDetails',
    body
  })
}
export function postSaveXxSpaceOrderAndCustomEt(body) {
  return req.post({
    url: '/api/customAdmin/saveXxSpaceOrderAndCustomEt',
    body
  }).then(function (data) {
    return data
  })
}
export function getOneXxContractDetail(body) {
  return req.post({
    url: '/api/contract/getOneXxContractDetail',
    body
  }).then(function (data) {
    return data
  })
}