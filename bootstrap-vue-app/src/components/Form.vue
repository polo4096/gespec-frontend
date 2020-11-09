<template lang="pug">
    b-container
        draggable(class="dragArea list-group" :list="dropList" group="{name : 'formInput', put: false}")
          div(class="list-group-item" v-for="(element,index) in dropList" :key="element.name")
            a(href="#", @click.prevent="$emit('remove-row', index)" style="float: right") X
            div {{ element.name }}
            vue-form-generator(:schema="element.schema" :model="element.model" :options="formOptions")

        
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

            }
            
        },
        methods: {
            
        }
     
    }
</script>

<style lang="scss" scoped>

</style>