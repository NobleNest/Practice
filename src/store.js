import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store = new Vuex.Store({
   plugins:[createPersistedState({ storage: window.localStorage })],
   state: {
     count: 0
   },
   mutations: {
       setCount: (state, count) => state.count = count,
   },
   getters: {
       getCount: (state) =>
       {
           return state.count
       }
   }
 })
 export default store;