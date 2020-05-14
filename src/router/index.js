import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    // redirect:'dataMaster',
    children:[]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: 'zkyc-mp',
  routes
})

export default router
