import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '@/components/cj/main.vue'
import physical from '@/components/cj/Healthmanagement/Physical.vue'
import medical from '@/components/cj/Healthmanagement/Medical.vue'
import assessment from '@/components/cj/Healthmanagement/Assessment.vue'
import login from '@/components/cj/Login.vue'
import Not from '@/components/cj/404.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/404',
      name: 'Not',
      component: Not
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children:[
        {
          path: '/HelloWorld',
          name: 'HelloWorld',
          component: HelloWorld,
        },
        {
        path: '/physical',
        name: 'physical',
        component: physical,
      },
      {
        path: '/medical',
        name: 'medical',
        component: medical,
      },
      {
        path: '/assessment',
        name: 'assessment',
        component: assessment,
      },
      ]
    }
  ],
  mode: 'history'
})
