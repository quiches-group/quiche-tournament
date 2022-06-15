import { createRouter, createWebHistory } from 'vue-router'
import VersusView from '../views/VersusView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VersusView
    }
  ]
})

export default router
