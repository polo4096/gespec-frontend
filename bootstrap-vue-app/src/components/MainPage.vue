<template lang="pug">
  b-container(fluid)
    
    
    b-form-row
      b-col()
        b-row.pt-5(align-h="center")
          b-avatar(variant="success" icon="bag-plus" v-b-toggle.sidebar-1)  

      b-sidebar(v-model="draglistShow" id="sidebar-1" title="DRAGLIST" shadow)
        div(class="px-3 py-2")
          b-form
            b-form-group(
              id="input-group-1"
              label="Libellé :"
              label-for="input-1"
              description="Entrez le nom du champ que vous voulez renseigner.")
               b-form-input(
                id="input-1"
                v-model="form.topic"
                type="topic"
                required
                placeholder="Libellé...")
          //p Ma liste de composants
          //b-button(variant="primary" v-b-modal.modal-1 ) Check Box
          //b-modal(id="modal-1" title="BootstrapVue"  @ok="formance('checkbox', text)")
            b-form-input(v-model="text" placeholder="What's to be checked ?")
            div(class="mt-2") Value: {{ text }}

        //div(class="px-3 py-2")    
          b-button(variant="secondary" v-b-modal.modal-2 ) Text Box
          b-modal(id="modal-2" title="BootstrapVue"  @ok="formance('textArea', text)")
            b-form-input(v-model="text" placeholder="What's the information needed ?")
            div(class="mt-2") Value: {{ text }}   

        div(class="row")
          div(class="col")
            h3 Drag
             draggable(class="dragArea list-group" :list="list1" :group="{ name: 'formInput', pull: 'clone', put: false }" @end="onEnd")
              div(class="list-group-item" v-for="element in list1" :key="element.name")
                div {{ element.name }}
                  

      b-col.mt-3( cols="6" style="background-color : #8D89A3; border-radius: 15px 50px;") 
        br
        br
        h2 Drop here
        br
        Form(:list2="list2")
      
            
          
          
         
      b-col
        b-row.pt-5(align-h="center")
          b-avatar(variant="info" icon="collection" v-b-toggle.sidebar-2)

      b-sidebar( v-model="versionTabShow" id="sidebar-2" title="Versions & Comments" right shadow)
        div(class="px-3 py-2")
          p Ma liste des versions
</template>


<script>
import Form from '../components/Form'
import draggable from 'vuedraggable'

export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable,
    Form,
  },
  props: {
    msg: String
  },

  data() {
    return {
      list1: [
        { name: "Checkbox", id: 1, type : 'checkbox' },
        { name: "Text", id: 2, type : 'textArea' },
        { name: "ex3", id: 3 },
        { name: "ex4", id: 4 }
      ],
      list2: [
        //Inputs
      ], 
      form: {
          topic: '',
      },
      myToggle: false,
      draglistShow : false,
      versionTabShow : false,
      show: true,
      text : '',
      schema: {
          fields: [
             

          ],
          groups: [
              {
                  //legend: "Sous section du chapitre",
                 /*  fields: [
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
                  ] */
              }
          ]
      },
    }
  },

  methods: {

    onEnd : function(evt){
      
      this.formance(this.list1[evt.oldIndex].type, this.form.topic);
      console.log("HELLO", );
    },
    
    formance : function(type, label) {
      var x ; 

      x= {
            schema : {
              fields : [
              {
                type: type,
                label: label,
                model: label,
                default: true
            }
          ]
        }
      }
      console.log("HELLO", x)
      this.list2.push(x);

    }
  },

}
</script>

<style scoped>

</style>
