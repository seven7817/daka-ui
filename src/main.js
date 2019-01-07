// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {routes} from './routes'
import axios from 'axios'  

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueRouter)
/* eslint-disable no-new */
const router = new VueRouter({
  routes,
  mode:'history'
})
router.beforeEach((to,from,next)=>{
  if(to.path.indexOf('/mineMenu')!=-1){
    if(sessionStorage.getItem('isLogin')){
      next()
    }else{
      alert('请先登录 to.path:'+to.path+'from.path:'+from.path)
      next('/login')
    }
  }else{
    next()
  }
})
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
  // components: { App },
  // template: '<App/>'
})
