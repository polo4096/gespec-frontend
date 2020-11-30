<template lang="pug">
  main-layout
    b-container(fluid :style="myStyle")

      b-card
        p(v-if="this.myChapters[0]") Bienvenue sur le POC de gestion des spécifications !


        ul( v-for="chapter in myChapters" v-if="chapter.type === 'PAIE' ") Paie
          li( v-for="chapter in myChapters" v-if="chapter.type === 'PAIE'" @click="$store.commit('SET_ACTIVE_CHAPTER', chapter)" style="cursor: pointer; color: blue ")
            v-link(href="/form" ) {{ chapter.title }}
            li.ml-4( v-for="chapterChild in myChapters" v-if="compareId(chapterChild.parentChapter, chapter._id)" @click="$store.commit('SET_ACTIVE_CHAPTER', chapterChild)" style="cursor: pointer; color: blue ")
              v-link(href="/form" ) {{ chapterChild.title }}

        ul( v-for="chapter in myChapters" v-if="chapter.type === 'GTA' ") GTA
          li( v-for="chapter in myChapters" v-if="chapter.type === 'GTA'" @click="$store.commit('SET_ACTIVE_CHAPTER', chapter )" style="cursor: pointer; color: blue " href="/form")
            v-link(href="/form" ) {{ chapter.title }}
            li.ml-4( v-for="chapterChild in myChapters" v-if="compareId(chapterChild.parentChapter, chapter._id)" @click="$store.commit('SET_ACTIVE_CHAPTER', chapterChild)" style="cursor: pointer; color: blue ")
              v-link(href="/form" ) {{ chapterChild.title }}
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import VLink from '../components/VLink.vue'
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
    await this.$store.dispatch('loadChapters')
  }
}
</script>

<style>
  body {
    min-height: 100%;
    background-color : #519AEE;
  }
</style>