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
    chapters: [],
    oldChapters: []
  },
  mutations: {
    SET_CHAPTERS (state, chapters) {
      state.chapters = chapters
    },
    SET_OLD_CHAPTERS (state, chapters) {
        state.oldChapters = chapters
    }
  },
  actions: {
      async loadChapters ({ commit }) {
          console.log("YO")
          return axios
          .get('http://localhost:3000/chapter')
          .then(r => r.data)
          .then(chapters => {
            console.log(chapters)
            commit('SET_CHAPTERS', chapters)
          })
    },
      async loadPrevious({commit}, payload) {
          const params ={
              chapterId: payload.chapterId
          }
          let url = "http://localhost:3000/old_chapter/" + params.chapterId
          console.log("URL :", url)
          console.log("chapterId :", params)
          return axios
              .get(url)
              .then(r => r.data)
              .then(chapters => {
                  console.log(("AXIOS CHAPTERS :"), chapters)
                  commit('SET_OLD_CHAPTERS', chapters)
              })
      },

      async updateChapter({dispatch}, payload) {
          const params = payload
          console.log("PARAMS : ", params)
          let url = "http://localhost:3000/chapter/" + params._id
          console.log("URL :", url)
          console.log("chapterId :", params)
          return axios
              .post(url,params)
              .then(r => r.data)
              .then(chapters => {
                  dispatch('loadChapters')
                  console.log(("UPDATED:"), chapters)

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
