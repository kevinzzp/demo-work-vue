import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import customer from '@/pages/customer/index'
Vue.use(Router)
const routes = [
  { path: '/', component: Home },
  { path: '/customer', component: customer },
  { path: '*', redirect: '/' }
  // { path: '/bar', component: HomePage }
]
export default new Router({routes})
