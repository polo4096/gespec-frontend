<template>
  <b-container fluid>

    <b-navbar toggleable="lg" type="dark" >
      <b-navbar-brand href="/">GESPEC</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item >
            <v-link href="/" style="color: white">Sommaire</v-link>
          </b-nav-item>
          <b-nav-item >
            <v-link href="/form" style="color: white">Edition</v-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button size="sm" class="my-2 my-sm-0" variant="danger" @click="onReset">Reset</b-button>
          </b-nav-item>
          <b-nav-text class="mr-3" v-if="this.myChapters[0]">
            Chapitre actif : {{this.actualChapter.title ? this.actualChapter.title :  this.myChapters[0].title + " (par défaut)"}}
          </b-nav-text>
          <b-nav-form>
            <b-form-input v-model="processText" size="sm" class="mr-sm-2" placeholder="Recherche par thème" ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" variant="dark"  :href="'/find?word=' + processText">Rechercher</b-button>
          </b-nav-form>


        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <slot></slot>
  </b-container>
</template>

<script>
import VLink from '../components/VLink.vue'
import axios from 'axios'
export default {
  components: {
    VLink
  },
  data() {
    return {
      processText : "",
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
    async onReset() {
       await axios
          .get('http://localhost:3000/reset')
          .then(response => (this.info = response))
      location.reload();
    }
  },

  mounted() {

  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 15px 30px;
  background: #f9f7f5;
}
</style>