<template lang="pug">
    b-container
        h1 Titre du chapitre
        vue-form-generator(:schema="schema" :model="model" :options="formOptions")
</template>

<script>
    import Vue from 'vue'
    import VueFormGenerator from 'vue-form-generator'
    import 'vue-form-generator/dist/vfg.css'

    Vue.use(VueFormGenerator)

    export default {
        props: {
            schema: {
                type: Object,
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