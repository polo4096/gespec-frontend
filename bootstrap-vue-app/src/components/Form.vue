<template lang="pug">
    b-container
        draggable(class="dragArea list-group" :list="list2" group="formInput")
          div(class="list-group-item" v-for="element in list2" :key="element.name")
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
            list2: {
                type: Array,
            },
        },
        data() {
            return {
                model: {
                    
                },
                
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>