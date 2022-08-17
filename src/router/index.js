import { createRouter, createWebHistory } from 'vue-router'

const Feedbacks = () => import('../views/Feedbacks/index.vue')
const Home = () => import('../views/Home/index.vue')
const Credentials = () => import('../views/Credentials/index.vue')
const Dash = () => import('../views/Dash/index.vue')

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dash',
    name: 'Dash',
    component: Dash
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    component: Feedbacks,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: Credentials,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
