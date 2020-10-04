<template lang="pug">
  b-container(fluid)
    
    
    b-form-row
      b-col()
        b-row.pt-5(align-h="center")
          b-avatar(variant="success" icon="bag-plus" v-b-toggle.sidebar-1)  

      b-sidebar(v-model="draglistShow" id="sidebar-1" title="DRAGLIST" shadow)
        div(class="px-3 py-2")
          p Ma liste de composants

      b-col.mt-3( cols="10" style="background-color : #8D89A3; border-radius: 15px 50px;") 
        Form

      b-col
        b-row.pt-5(align-h="center")
          b-avatar(variant="info" icon="collection" v-b-toggle.sidebar-2)

      b-sidebar( v-model="versionTabShow" id="sidebar-2" title="Versions & Comments" right shadow)
        div(class="px-3 py-2")
          p Ma liste des versions
</template>


<script>
import Form from '../components/Form'

export default {
  components: {
    Form,
  },
  props: {
    msg: String
  },

  data() {
    return {
      draglistShow : false,
      versionTabShow : false,
    }
  },

}
</script>

<style scoped>

</style>
