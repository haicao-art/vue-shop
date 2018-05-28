
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import member from './modules/member'
import cart from './modules/cart'

Vue.use(Vuex)

const myPlugin = store => {
  store.subscribe((mutation, state) => {
    console.log(mutation)
    console.log(state)
  })
}

export default new Vuex.Store({
    modules: {
      member,
      cart
    },
    //plugins: [myPlugin],
    getters
})
