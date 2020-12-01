<template lang="pug">
  main-layout
    b-container(fluid :style="myStyle")
      b-card
        ul()
          li(v-for="chapter in matchingChapters" )
            div(@click="$store.commit('SET_ACTIVE_CHAPTER', chapter)")
              v-link( href="/form" ) {{ chapter.title }}(CA {{chapter.type}})


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
      },
      currentUrl: "",
      matchingChapters : [],
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
    },
    getParams(url) {
      var params = {};
      var parser = document.createElement('a');
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    },
    searchByProcess() {
      this.myChapters.forEach(chapter => {
        console.log("yoyo", chapter.title.toLowerCase().includes(this.currentUrl.word.toLowerCase().trim()));
        console.log(chapter.title.toLowerCase())
        if(chapter.title.toLowerCase().includes(this.currentUrl.word.toLowerCase().trim())){
          this.matchingChapters.push(chapter);
          console.log(this.matchingChapters);
        }
      })
    }
  },

  async created() {
    await this.$store.dispatch('loadChapters')
    this.currentUrl = this.getParams(window.location.href)
    this.searchByProcess();
  },

  mounted() {

  }

}
</script>

<style>
  body {
    min-height: 100%;
    background-color : #519AEE;
  }
</style>

