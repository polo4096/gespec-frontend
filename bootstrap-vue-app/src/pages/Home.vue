<template lang="pug">
  main-layout
    b-container(fluid :style="myStyle")

      b-card
        p(v-if="this.myChapters[0]") Bienvenue sur le POC de gestion des spécifications !
        b-list-group
          b-list-group-item
            b-row(align-v="center")
              b-col(cols="1")
                h3 Paie
              ul()
                li( v-for="chapter in myChapters" :key="chapter._id" v-if="chapter.type === 'PAIE' && chapter.parentChapter === undefined"   style=" color: blue ")
                  div(@click="$store.commit('SET_ACTIVE_CHAPTER', chapter)")
                      v-link( href="/form" ) {{ chapter.title }}
                  div.ml-4( v-for="chapterChild in myChapters" :key="chapterChild._id" v-if="chapter != undefined && compareId(chapterChild.parentChapter, chapter._id)" @click="$store.commit('SET_ACTIVE_CHAPTER', chapterChild)" style="cursor: pointer; color: blue ")
                    v-link(href="/form" ) {{ chapterChild.title }}
          b-list-group-item
            b-row(align-v="center")
              b-col(cols="1")
                h3 Smart
              ul()
                li( v-for="chapter in myChapters" :key="chapter._id" v-if="chapter.type === 'SMART' && chapter.parentChapter === undefined"   style=" color: blue ")
                  div(@click="$store.commit('SET_ACTIVE_CHAPTER', chapter)")
                    v-link( href="/form" ) {{ chapter.title }}
                  div.ml-4( v-for="chapterChild in myChapters" :key="chapterChild._id" v-if="chapter != undefined && compareId(chapterChild.parentChapter, chapter._id)" @click="$store.commit('SET_ACTIVE_CHAPTER', chapterChild)" style="cursor: pointer; color: blue ")
                    v-link(href="/form" ) {{ chapterChild.title }}
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import VLink from '../components/VLink.vue'
import axios from 'axios'
var _ = require('lodash');
export default {
  components: {
    MainLayout,
    VLink
  },
  data() {
    return {
      myStyle:{
        backgroundColor:"#519AEE"
      }
    }
  },
  computed: {
    actualChapter: {
      get() {
        return this.$store.state.activeChapter || this.myChapters[0]
      },
      set(value) {
        this.$store.commit('SET_ACTIVE_CHAPTER', value)
      }
    },
    myChapters: {
      get() {
        return this.$store.state.chapters
      },
      set(value) {
        this.$store.commit('SET_CHAPTERS', value)
      }
    },
  },
  methods: {
    compareId(id1,id2) {
      return _.isEqual(id1,id2);
    }
  },

  async created() {
    console.log(this.$store.state.chapters.length)
    await this.$store.dispatch('loadChapters')
    console.log(this.$store.state.chapters.length)
    if(this.$store.state.chapters.length === 0) {
      await axios
          .get('http://localhost:3000/reset')
          .then(response => (this.info = response))
      await this.$store.dispatch('loadChapters')
      await this.$store.dispatch('loadPrevious', {chapterId: this.actualChapter._id})
      await this.$store.dispatch('loadOneChapter', {chapterId: this.actualChapter._id})
    }
  }
}
</script>

<style>
  body {
    min-height: 100%;
    background-color : #519AEE;
  }
</style>