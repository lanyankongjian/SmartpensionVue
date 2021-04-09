import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import main from '@/components/cj/main.vue'
import physical from '@/components/cj/Healthmanagement/Physical.vue'
import medical from '@/components/cj/Healthmanagement/Medical.vue'
import assessment from '@/components/cj/Healthmanagement/Assessment.vue'
import login from '@/components/cj/Login.vue'
import Not from '@/components/cj/404.vue'
//黄志杰
import chaxun from '@/components/hzj/chaxun.vue'
import jiesuan from '@/components/hzj/jiesuan.vue'
import dengji from '@/components/hzj/dengji.vue'
//雷锦斌
import consult from '@/components/ljb/consult.vue'
import occupation from '@/components/ljb/occupation'
import addOld from '@/components/ljb/addOld'
import bed from '@/components/ljb/subcomponents/bed'
import family from '@/components/ljb/subcomponents/family'
import health from '@/components/ljb/subcomponents/health'
import nursing from '@/components/ljb/subcomponents/nursing'
import oldInfo from '@/components/ljb/subcomponents/oldInfo'
import totalcost from '@/components/ljb/subcomponents/totalcost'
//罗滨滨
import Prestore from '@/components/lbb/Prestore'
import AddPrestore from '@/components/lbb/AddPrestore'
import Other from '@/components/lbb/Other'
import Stream from '@/components/lbb/Stream'
import Deposit from '@/components/lbb/Deposit'
import Category from '@/components/lbb/Category'
import Payment from '@/components/lbb/Payment'
import Arrear from '@/components/lbb/Arrear'
//陈志豪
import foodControl from '@/components/fbm/FoodControl.vue'
import order from '@/components/fbm/Order.vue'
import foodLei from '@/components/fbm/FoodLei.vue'
//易湘君
import drug from "@/components/yxj/Drug";
import deposite from "@/components/yxj/Deposite";
//liqing
import Register from "../components/liqing/Register";
import Visit from "../components/liqing/Visit";
import Actype from "../components/liqing/Actype";
import Accident from "../components/liqing/Accident";
Vue.use(Router)

export default new Router({
  routes: [{
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
      children: [{
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
        //黄志杰--退住管理
        {
          path: '/chaxun',
          name: 'chaxun',
          component: chaxun,
        },
        {
          path: '/jiesuan',
          name: 'jiesuan',
          component: jiesuan,
        },
        {
          path: '/dengji',
          name: 'dengji',
          component: dengji,
        },
        //雷锦斌
        {
          path: '/consult',
          name: 'consult',
          component: consult
        }, {
          path: '/occupation',
          name: 'occupation',
          component: occupation
        }, {
          path: '/addOld',
          name: 'addOld',
          component: addOld,
          redirect: '/oldInfo',
          children: [{
              path: '/bed',
              name: 'bed',
              component: bed,
            },
            {
              path: '/family',
              name: 'family',
              component: family,
            },
            {
              path: '/health',
              name: 'health',
              component: health,
            },
            {
              path: '/nursing',
              name: 'nursing',
              component: nursing,
            },
            {
              path: '/oldInfo',
              name: 'oldInfo',
              component: oldInfo,
            },
            {
              path: '/totalcost',
              name: 'totalcost',
              component: totalcost,
            },

          ]
        },
        //罗滨滨
        /* 预存*/
        {
          path: '/Prestore',
          name: 'Prestore',
          component: Prestore,
        },
        /* 新增预存*/
        {
          path: '/AddPrestore',
          name: 'AddPrestore',
          component: AddPrestore,
        },
        /* 消费登记*/
        {
          path: '/Other',
          name: 'Other',
          component: Other,
        },
        /* 费用流水*/
        {
          path: '/Stream',
          name: 'Stream',
          component: Stream,
        },
        /* 押金管理*/
        {
          path: '/Deposit',
          name: 'Deposit',
          component: Deposit,
        },
        /* 费用类别*/
        {
          path: '/Category',
          name: 'Category',
          component: Category,
        },
        /* 交费登记*/
        {
          path: '/Payment',
          name: 'Payment',
          component: Payment,
        },
        /* 欠费管理*/
        {
          path: '/Arrear',
          name: 'Arrear',
          component: Arrear,
        },
        //陈志豪
        {
          path: '/foodControl',
          name: 'foodControl',
          component: foodControl,
        },
        {
          path: '/order',
          name: 'order',
          component: order,
        },
        {
          path: '/foodLei',
          name: 'foodLei',
          component: foodLei,
        },
        //易湘君
        {
          path: '/drug',
          name: 'drug',
          component: drug,
        },
        {
          path: '/deposite',
          name: 'deposite',
          component: deposite,
        },
        //外出登记
        {
          path: '/register',
          name: 'Register',
          component: Register,
        },
        //探视来访
        {
          path: '/visit',
          name: 'Visit,',
          component: Visit,
        },
        //事故记录类型
        {
          path: '/actype',
          name: 'Actype,',
          component: Actype,
        },
        //事故记录
        {
          path: '/accident',
          name: 'Accident,',
          component: Accident,
        }

      ]
    }
  ],
  mode: 'history'
})
