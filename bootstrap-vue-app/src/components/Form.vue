<template lang="pug">

    b-container(fluid)
      draggable(class="dragArea list-group" :list="dropList" group="{name : 'formInput', put: false}" )
        div(class="list-group-item" v-for="(element,index) in dropList" :key="element.name")
          a( @click.prevent="$emit('remove-row', index)" style="float: right") X
          div {{ element.name }}
          vue-form-generator(:schema="element.schema" :model="element.model" :options="formOptions")
        div(class="list-group-item disabled mt-4" style="width: 100%; min-height: 200px; border: dashed black; text-align: center; text-justify: center" ) Drop your input here

        
</template>

<script>
    import Vue from 'vue'
    import VueFormGenerator from 'vue-form-generator'
    import draggable from 'vuedraggable'
    import 'vue-form-generator/dist/vfg.css'

    Vue.use(VueFormGenerator)

    export default {
        components: {
            draggable
        },
        props: {
            dropList: {
                type: Array,
            },
        },
        data() {
            return {
              formOptions: {

              }
            }
            
        },
        methods: {
            
        }
     
    }
</script>

<style lang="scss" scoped>

  .disabled {
    pointer-events:none; //This makes it not clickable
    opacity:0.6;         //This grays it out to look disabled
  }

</style>