import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
//import App from './App.vue'
//import Home from './pages/Home'
import Vuex from 'vuex'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import routes from './routes'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    activeChapter : {},
    mostRecentActiveChapter : {},
    chapters: [],
    oldChapters: []
  },
  mutations: {
    SET_CHAPTERS (state, chapters) {
      state.chapters = chapters
    },
    SET_ACTIVE_CHAPTER (state, chapter) {
      state.activeChapter = chapter
    },
    SET_RECENT_ACTIVE_CHAPTER (state, chapter) {
      state.mostRecentActiveChapter = chapter
    },
    SET_OLD_CHAPTERS (state, chapters) {
        state.oldChapters = chapters
    }
  },
  actions: {
      async loadOneChapter({commit}, payload) {
          const params ={
              chapterId: payload.chapterId
          }
          let url = "http://localhost:3000/chapter/" + params.chapterId

          return axios
              .get(url)
              .then(r => r.data)
              .then(chapter => {

                  commit('SET_RECENT_ACTIVE_CHAPTER', chapter)
              })
      },
      async loadChapters ({ commit }) {

          return axios
          .get('http://localhost:3000/chapter')
          .then(r => r.data)
          .then(chapters => {

            commit('SET_CHAPTERS', chapters)
          })
    },
      async loadPrevious({commit}, payload) {
          const params ={
              chapterId: payload.chapterId
          }
          let url = "http://localhost:3000/old_chapter/" + params.chapterId

          return axios
              .get(url)
              .then(r => r.data)
              .then(chapters => {
                  commit('SET_OLD_CHAPTERS', chapters)
              })
      },

      async updateChapter({dispatch}, payload) {
          const params = payload
          let url = "http://localhost:3000/chapter/" + params._id
          return axios
              .post(url,params)
              .then(r => r.data)
              .then(chapters => {
                  dispatch('loadChapters')
                  console.log(("UPDATED :"), chapters)
              })
      }
  }
})

Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

const app = new Vue ({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            const matchingView = routes[this.currentRoute]
            return matchingView
                ? require('./pages/' + matchingView + '.vue').default
                : require('./pages/404.vue')
        }
    },
    render(h) { return h(this.ViewComponent) },
    store: store,
 });

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname
})


