
const common = {
    state: {
      showLoading: false
    },
    mutations: {
        SET_SHOWLOADING: (state, showLoading) => {
          state.showLoading = showLoading
        },
    },
    actions: {
      async onLoading({ commit }, showLoading) {
        console.log(showLoading)
        await new Promise((resolve, reject) => {
          commit('SET_SHOWLOADING', showLoading)
        })
      }
    }
}

export default common
