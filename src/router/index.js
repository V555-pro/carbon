import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address')
  },
  {
    path: '/lorem1',
    name: 'Lorem1',
    component: () => import('../views/Lorem1')
  },
  {
    path: '/lorem_table',
    name: 'LoremTable',
    component: () => import('../views/LoremTable')
  }
]

const router = new VueRouter({
  routes
})

export default router
