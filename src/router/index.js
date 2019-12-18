import Vue from 'vue'
import VueRouter from 'vue-router'

import Minute from '@/components/minute.vue';
import Heure from '@/components/heure.vue';
import Jour from '@/components/jour.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'minute',
    component: Minute
  },
  {
    path: '/heure',
    name: 'heure',
    component: Heure
  },
  {
    path: '/jour',
    name: 'jour',
    component: Jour
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
