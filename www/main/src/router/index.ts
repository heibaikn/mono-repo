import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Lifecycle from '../views/lifecycle/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter in route[] config', to.fullPath)
        next()
      }
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      // component: () => import('../views/lifecycle/index.vue'),
      component: Lifecycle,
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter in route[] config', to.fullPath)
        next()
      }
    },
    {
      path: '/lifecycle-toggle',
      name: 'targetLifecycle',
      component: () => import('../views/lifecycle/target-index.vue'),
      // component: Lifecycle,
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter in route[] config', to.fullPath)
        next()
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(new URL(import.meta.url).pathname, 'router钩子开始了~~~~~~~~~~~~~~~~~~~')
  console.log('beforeEach', to.fullPath)
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve', to.fullPath)
  next()
})
router.afterEach((to, from, failure) => {
  console.log('afterEach', to.fullPath)
})
export default router
