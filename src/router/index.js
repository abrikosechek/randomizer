import { createWebHistory, createRouter } from 'vue-router'

import PageNumber from '@/pages/Number'

const routes = [
  { path: '/', redirect: "/number" },
  { path: '/number', component: PageNumber },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router