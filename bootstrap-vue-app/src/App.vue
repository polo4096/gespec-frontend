<template lang="pug">
  b-container(id="app" fluid :style="{backgroundColor: #519AEE}")
    MainPage
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  },
  data() {
    return {
      myStyle: {
            backgroundColor: "#FFF"
      }
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #063872;
  background-color : #519AEE;
  height: 100%;
}

html {
  height: 100%;
  background-color : #519AEE;
}
body {
  min-height: 100%;
  background-color : #519AEE;
}
</style>
