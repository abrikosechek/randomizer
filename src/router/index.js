import { createWebHistory, createRouter } from 'vue-router'

import PageNumber from '@/pages/Number'
import PageDice from "@/pages/Dice"

const routes = [
  { path: '/', redirect: "/number" },
  { path: '/number', component: PageNumber },
  { path: '/dice', component: PageDice },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router