import { createRouter, createWebHistory } from 'vue-router'
import UnosOtpada from '../components/UnosOtpada.vue'
import DnevniPregled from '../components/DnevniPregled.vue'
import Statistika from '../components/Statistika.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/unos' },
    { path: '/unos', name: 'unos', component: UnosOtpada },
    { path: '/pregled', name: 'pregled', component: DnevniPregled },
    { path: '/statistika', name: 'statistika', component: Statistika },
  ],
})

export default router
