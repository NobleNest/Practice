import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store = new Vuex.Store({
   plugins:[createPersistedState({ storage: window.localStorage })],
   state: {
     count: 0,
     style: window.localStorage.style
   },
   mutations: {
       setCount: (state, count) => state.count = count,
       setStyle: (state, style) => state.style = style,
   },
   getters: {
       getCount: (state) =>
       {
           return state.count
       },
       getStyle: (state) =>
       {
         return state.style
       }
   }
 })
 export default store;