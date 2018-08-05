import services from '@/services/index'
export default {
  install: function (Vue, options) {
    Vue.prototype.$service = services
  }
}
