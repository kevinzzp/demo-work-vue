// import Vue from 'vue'
import App from './index'
// import router from './routers'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/css/iconfont.css'
import '@/css/com.scss'
import servicePlugin from '@/common/plugins/servicePlugin'
import utils from '@/common/utils/toJson'

// import * as dd from 'dingtalk-jsapi'

/* eslint-disable */

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(servicePlugin)
Vue.prototype.$utils = utils

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})