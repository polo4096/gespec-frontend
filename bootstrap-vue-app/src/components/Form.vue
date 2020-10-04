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
        data() {
            return {
                model: {
                    id: "420"
                },
                schema: {
                    fields: [
                        {
                            type: "checkbox",
                            label: "Status",
                            model: "status",
                            default: true
                        }
                    ],
                    groups: [
                        {
                            legend: "Sous section du chapitre",
                            fields: [
                                {
                                    type: "input",
                                    inputType: "number",
                                    id: "current_smic",
                                    label: "Smic",
                                    model: "smic",
                                    onChanged: function(model, newVal, oldVal) {
                                        console.log(`Model's name changed from ${oldVal} to ${newVal}. Model:`, model);
                                    },
                                }
                            ]
                        }
                    ]
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