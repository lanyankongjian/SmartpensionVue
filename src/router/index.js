import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '@/components/cj/main.vue'
import physical from '@/components/cj/Healthmanagement/Physical.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children:[
        {
        path: '/physical',
        name: 'physical',
        component: physical,
      },
      ]
    }
  ],
  mode: 'history'
})
