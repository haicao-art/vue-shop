
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import common from './modules/common'
import member from './modules/member'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      member,
      cart,
      common
    },
    //plugins: [myPlugin],
    getters
})
