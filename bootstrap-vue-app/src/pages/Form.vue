<template lang="pug">
  main-layout
    b-container(id="app" fluid :style="myStyle")
      MainPage
</template>

<script>
import MainPage from '../components/MainPage.vue'
import MainLayout from '../layouts/Main.vue'

export default {
  name: 'App',
  components: {
    MainPage,
    MainLayout
  },
  data() {
    return {
      myStyle:{
        backgroundColor:"#519AEE"
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
  color: #2c3e50;

  height: 100%;
}

html {
  height: 100%;
}
body {
  min-height: 100%;
  background-color : #519AEE;
}
</style>