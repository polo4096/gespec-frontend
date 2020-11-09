import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import Vuex from 'vuex'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    chapters: 0
  },
  mutations: {
    SET_CHAPTERS (state, chapters) {
      state.chapters = chapters
    }
  },
  actions: {
    loadChapters ({ commit }) {
      axios
          .get('http://localhost:3000/chapter')
          .then(r => r.data)
          .then(chapters => {
            console.log(chapters)
            commit('SET_CHAPTERS', chapters)
          })
    }
  }
})

Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue ({
  el: '#app',
  render(h) { return h(App) },
  store: store,
 });
