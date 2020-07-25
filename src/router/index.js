import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/',
    redirect: '/login',
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
    let Authorization = localStorage.getItem('Authorization')
    //注意是全等===
    if (Authorization === null || Authorization === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
