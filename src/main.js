// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import VueRouter from 'vue-router'
import {routes} from './routes'
import axios from 'axios'  
import store from './store'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

/* eslint-disable no-new */
const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next)=>{
  if(to.path.indexOf('/mineMenu')!=-1){
    if(sessionStorage.getItem('seesionIsLogin')){
      next()
    }else{
      alert('请先登录 to.path:'+to.path+'from.path:'+from.path)
      store.dispatch('setLoginFlag')
      store.dispatch('setSelect3','1')
    }
  }else{
    next()
  }
})
new Vue({
  el: '#app',
  store,
  router,
  render:h=>h(App)
  // components: { App },
  // template: '<App/>'
})
