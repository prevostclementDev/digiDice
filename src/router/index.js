import { createRouter, createWebHistory } from 'vue-router'
import {useDigidiceStore} from "@/stores/digiDice";

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
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to,from)=>{
  const digidice = useDigidiceStore();
  if(to.name === 'games' && digidice.gameStatus === 'waiting' || digidice.gameStatus === 'finish') {
    router.push('/');
  }
  if(digidice.gameStatus === 'inprogress' && to.name === 'addPlayers') {
    router.push('/games');
  }
  return true;
})

export default router
