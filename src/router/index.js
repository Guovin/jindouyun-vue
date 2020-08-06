import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'
import { getToken } from '@/utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Home',
    component: Home,
  },

  {
    path: '/',
    name: 'Main',
    component: Layout,
    redirect: '/main',
    children: [
      //嵌套路由
      {
        path: 'main',
        name: 'About',
        component: () => import('@/views/About.vue'),
        // 当 /main 匹配成功，
        // About.vue 会被渲染在 Layout.vue 的 <router-view> 中
      },
    ],
  },

  {
    path: '/company',
    name: 'Company',
    component: Layout,
    redirect: '/company/index', //需要重定向子路径才能正常显示
    children: [
      {
        path: 'index',
        component: () => import('@/views/Company.vue'),
      },
    ],
  },

  {
    path: '/staff',
    name: 'Staff',
    component: Layout,
    redirect: '/staff/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/Staff.vue'),
      },
    ],
  },

  {
    path: '/order',
    name: 'Order',
    component: Layout,
    redirect: '/order/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/Order.vue'),
      },
    ],
  },

  {
    path: '/setting',
    name: 'Setting',
    component: Layout,
    redirect: '/setting/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/NewPassword.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

//导航守卫
//使用router.beforeEach注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    let Authorization = getToken()
    //注意是全等===
    if (
      Authorization === null ||
      Authorization === '' ||
      Authorization === undefined
    ) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
