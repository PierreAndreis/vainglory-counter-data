import Vue    from 'vue'
import Router from 'vue-router'

const Index        = () => import('@/components/Index')
const Informations = () => import('@/components/Informations')

Vue.use(Router)

export default new Router({
  mode  : 'history',
  routes: [
    {
      path: '/', name: 'Index', component: Index
    },
    {
      path: '/informations', name: 'Informations', component: Informations
    }
  ]
})
