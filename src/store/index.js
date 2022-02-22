import Vue from 'vue';
import Vuex from 'vuex';

Vue.use (Vuex);

export default new Vuex.Store ({
  state: {
    users: new Map (),
    role: '',
  },
  mutations: {
    addNewUser (state, payload) {
      let id = Object.keys (payload)[0];
      state.users.set (id, payload[id]);
      localStorage.setItem (
        'allUsers',
        JSON.stringify (Object.fromEntries (state.users))
      );
    },
    addDataToStore (state, payload) {
      let newMap = new Map (Object.entries (JSON.parse (payload.data)));
      state.users = new Map ([...state.users, ...newMap]);
    },
    setRole (state, payload) {
      state.role = payload;
    },
    updateUserInfo (state, payload) {
      let key = Object.keys (payload)[0];
      if ('birthday' in payload[key]) {
        let tmpData = {};
        tmpData['personal'] = payload[key];
        let tmpObj = {[key]: {...state.users.get (key), ...tmpData}};
        state.users = new Map ([
          ...state.users,
          ...new Map (Object.entries (tmpObj)),
        ]);
      } else {
        let tmpObj = {[key]: {...state.users.get (key), ...payload[key]}};
        state.users = new Map ([
          ...state.users,
          ...new Map (Object.entries (tmpObj)),
        ]);
      }
      localStorage.setItem (
        'allUsers',
        JSON.stringify (Object.fromEntries (state.users))
      );
    },
    addCarToservice (state, payload) {
      let key = payload.personal.email;
      let tmpData = {};
      tmpData['carInfo'] = payload['carInfo'];
      let tmpObj = {[key]: {...state.users.get (key), ...tmpData}};
      state.users = new Map ([
        ...state.users,
        ...new Map (Object.entries (tmpObj)),
      ]);
      localStorage.setItem (
        'allUsers',
        JSON.stringify (Object.fromEntries (state.users))
      );
    },
  },
  getters: {
    getUser: state => id => {
      return state.users.get (id);
    },
  },
  actions: {},
  modules: {},
});
