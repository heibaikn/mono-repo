import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/virtual-list',
    name: 'virtualList',
    component: () => import('../views/virtual-list/index.vue')
  },
  {
    path: '/workflow',
    name: 'workflow',
    component: () => import('../views/workflow/index.vue')
  },
  {
    path: '/form-v3',
    name: 'formV3',
    component: () => import('../views/form-v3/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]
