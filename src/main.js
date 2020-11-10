import Vue from 'vue'
import App from './components/App.vue'
import Add from './components/Add.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
    
    Vue.use(VueAxios, axios)


new Vue({
   render: h => h(App),
   el: '#app',
})

new Vue({
    render: h => h(Add),
    el: '#converter',
 })
