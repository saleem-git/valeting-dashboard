import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users :new Map()
  },
  mutations: {
    addNewUser (state,payload) {
      let id = Object.keys(payload)[0]
      state.users.set(id,payload[id])
      localStorage.setItem('allUsers',JSON.stringify(Object.fromEntries(state.users)))
    },
    addDataToStore (state,payload) {
      let newMap = new Map(Object.entries(JSON.parse(payload.data)));
      state.users = new Map([...state.users, ...newMap])
    }
  },
  actions: {},
  modules: {},
})
