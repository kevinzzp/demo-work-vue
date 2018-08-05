import * as customer from './customer'
import * as oauth from './oauth'
import * as contract from './contract'
let extServices = {}
const service = {
  customer,
  oauth,
  contract
}
Object.keys(service).forEach((item) => {
  Object.keys(service[item]).forEach((itemNxt) => {
    if (!extServices.itemNxt) {
      extServices[itemNxt] = service[item][itemNxt]
    } else {
      throw new Error('重复的service方法定义：' + itemNxt)
    }
  })
})
export default extServices
