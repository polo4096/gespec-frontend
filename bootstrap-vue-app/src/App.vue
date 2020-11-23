<template lang="pug">
  b-container(id="app" fluid :style="myStyle")
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
  color: #063872;
  
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
