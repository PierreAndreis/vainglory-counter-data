import Vue    from 'vue'
import Router from 'vue-router'

const Index        = () => import('@/components/Index')
const HeroStats    = () => import('@/components/HeroStats')

Vue.use(Router)

export default new Router({
  mode  : 'history',
  routes: [
    {
      path: '/', name: 'Index', component: Index
    },
    {
      path: '/:heroName', name: 'Informations', component: HeroStats
    }
  ]
})
