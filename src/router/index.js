import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/add_players',
      name: 'addPlayers',
      component: () => import('../views/addPlayers.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/games.vue')
    },
  ]
})

export default router
