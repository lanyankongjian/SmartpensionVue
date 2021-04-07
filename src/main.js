// 路由
router.beforeEach((to, from, next) => {
  // eslint-disable-next-line eqeqeq
  if (to.path == '/' || sessionStorage.getItem('token')) {
    next()
  } else {
    alert("请登录后再进行跳转！")
    next('/')
  }
  if(sessionStorage.getItem('token')&&to.matched.length === 0){
    next("/404")
  }
})
//router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  //if (to.meta.title) {
   // document.title = to.meta.title
  //}
  //next()
//})
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
//导入通用的全局对象
Vue.prototype.$axios = axios
Vue.prototype.qs=qs
import qs from 'qs'
//统一的跨域前缀
axios.defaults.baseURL = 'http://localhost:8089/';
//设置默认的请求超时时间。例如超过了5s，就会告知用户当前请求超时，请刷新等。
//axios.defaults.timeout = 5000;
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
