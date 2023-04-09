import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Details from '../views/Details.vue'
import myTicket from '../views/myTicket.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/:id',
      name: 'details',
      component: Details,
      props:true
    },
    {
      path: '/myticket',
      name: 'myticket',
      component: myTicket,
    },

  ]
})

export default router
