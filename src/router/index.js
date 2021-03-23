/* eslint-disable no-undef */
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
    path: '/address',
    name: 'Address',
    component: () => System.import('../views/Address')
  },
  {
    path: '/lorem1',
    name: 'Lorem1',
    component: () => System.import('../views/Lorem1')
  },
  {
    path: '/lorem_table',
    name: 'LoremTable',
    component: () => System.import('../views/LoremTable')
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => System.import('../views/Chart')
  }
]

const router = new VueRouter({
  routes
})

export default router
