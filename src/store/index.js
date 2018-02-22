import Vue            from 'vue'
import Vuex           from 'vuex'

/* Import Vuex dependencies and modules */
import { heroesData } from './modules/data'

Vue.use(Vuex)

const store = {
  modules: {
    heroesData
  }
}

export default new Vuex.Store(store)
