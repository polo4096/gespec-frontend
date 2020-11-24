<template lang="pug">
  main-layout
    p(v-if="this.myChapters[0]") Bienvenue sur le POC de gestion des spécifications ! Chapitre actif : {{this.actualChapter.title ? this.actualChapter.title :  this.myChapters[0].title + " (par défaut)"}}
    ul
      li( v-for="chapter in myChapters" @click="$store.commit('SET_ACTIVE_CHAPTER', chapter)" style="cursor: pointer; color: blue ") {{ chapter.title }}

</template>

<script>
import MainLayout from '../layouts/Main.vue'
export default {
  components: {
    MainLayout
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
  async created() {
    await this.$store.dispatch('loadChapters')
  }
}
</script>