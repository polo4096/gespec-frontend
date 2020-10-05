<template lang="pug">
  b-container(fluid)
    
    
    b-form-row
      b-col()
        b-row.pt-5(align-h="center")
          b-avatar(variant="success" icon="bag-plus" v-b-toggle.sidebar-1)  

      b-sidebar(v-model="draglistShow" id="sidebar-1" title="DRAGLIST" shadow)
        div(class="px-3 py-2")
          p Ma liste de composants
          b-button(variant="primary" v-b-modal.modal-1 ) Check Box
          b-modal(id="modal-1" title="BootstrapVue"  @ok="formance('checkbox', text)")
            b-form-input(v-model="text" placeholder="Enter your name")
            div(class="mt-2") Value: {{ text }}

        div(class="px-3 py-2")    
          b-button(variant="secondary" v-b-modal.modal-2 ) Text Box
          b-modal(id="modal-2" title="BootstrapVue"  @ok="formance('textArea', text)")
            b-form-input(v-model="text" placeholder="Enter your name")
            div(class="mt-2") Value: {{ text }}   

      b-col.mt-3( cols="6" style="background-color : #8D89A3; border-radius: 15px 50px;") 
        Form(:schema="schema")
         
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
      myToggle: false,
      draglistShow : false,
      versionTabShow : false,
      text : '',
      schema: {
          fields: [
             

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
    }
  },

  methods: {
    
    formance : function(type, label) {
      var x ; 

      x= {
          type: type,
          label: label,
          model: label,
          default: true
      }
      console.log("HELLO", x)
      this.schema.fields.push(x);

    }
  },

}
</script>

<style scoped>

</style>
