import Vue from 'vue'
import VueRouter from 'vue-router'
import weather from '../pages/weather.vue'
import favoritesPage from '../pages/favoritesPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/weather/:cityName?',
    name: 'Weather',
    component: weather
  },
  {
    path: '/favorites',
    name: 'favoritesPage',
    component: favoritesPage
  },
  {
    path: '/',
    name: 'Weather',
    component: weather
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
