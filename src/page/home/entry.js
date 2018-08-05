
import App from './App'
import 'mint-ui/lib/style.css'
import '@/css/iconfont.css'
import '@/css/com.scss'
import servicePlugin from '@/common/plugins/servicePlugin'
import {loginInit} from '@/common/utils/index'
import store from '@/store'
/* eslint-disable */

Vue.config.productionTip = false
Vue.use(servicePlugin)
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App },
  created(){
    loginInit()
  }
})

