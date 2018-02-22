import * as types from '../mutation-types'
import _          from 'lodash'

export const heroesData = {
  state    : {
    data: []
  },
  mutations: {
    [types.DATA_SET](state, payload) {
      return state.data = payload
    }
  },
  actions  : {}
}
