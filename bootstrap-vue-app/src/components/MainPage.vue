<template lang="pug">
  b-container(fluid)
    

    b-form-row
      //Bouton de la draglist
      b-col()
        b-row.pt-5(align-h="center")
          b-avatar(variant="success" icon="bag-plus" v-b-toggle.sidebar-1)  

      //Sidebar contenant la draglist
      b-sidebar(v-model="draglistShow" id="sidebar-1" title="DRAGLIST" shadow)

        //Input du libéllé de l'Input
        div(class="px-3 py-2")
          b-form(autocomplete="off")
            b-form-group(
              id="input-group-1"
              label="Topic : "
              label-for="input-1"
              description="Entrez le nom du champ que vous voulez renseigner.")
               b-form-input(
                id="input-1"
                v-model="form.topic"
                required
                placeholder="Libellé...")

        //Draglist
        div(class="row")
          div(class="col")
            h3 Drag
            draggable(class="dragArea list-group" :list="dragList" :group="{ name: 'formInput', pull: 'clone', put: false }" :sort="false" @end="onEnd")
              div(class="list-group-item" v-for="element in dragList" :key="element.name")
                div {{ element.name }}

        //InputRadio Dialog
        b-modal(id="radioDialog" @ok="oklife") 
           b-form-group(
            id="inputRadiodialog"
            label="Ici, rentrez une à une les valeurs de vos RadiosButtons : "
            label-for="RadioDialog"
            description="Entrez les une à une, en utilisant le bouton + ")
              b-form-input(
                id="inputRadio"
                v-model="radioInput"
                required
                placeholder="Entrez une valeur"
                autocomplete="off"
                )
              b-button(@click="addInput") +

                  
      //MainPage
      b-col.mt-3( cols="6" style="background-color : #8D89A3; border-radius: 15px 15px; padding: 10px" )
        h2 Drop here
        br
        Form(:dropList="dropList" @remove-row="removeRow" )
      
               
          
      //Bouton de la gestion des versions
      b-col
        b-row.pt-5(align-h="center")
          b-avatar(variant="info" icon="collection" v-b-toggle.sidebar-2)
      //Sidebar de la gestion des versions
      b-sidebar( v-model="versionTabShow" id="sidebar-2" title="Versions & Comments" right shadow)
        div(class="px-3 py-2")
          p Ma liste des versions
</template>


<script>
import Form from '../components/Form'
import draggable from 'vuedraggable'
import Vue from "vue";
import tabl from "./tabl.vue";
Vue.component("tabl", tabl);

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
      dragList: [
        { name: "Checkbox", id: 1, type : 'checkbox' },
        { name: "Text", id: 2, type : 'textArea' },
        {
          name: "Radios",
          type: "radios",
          label: "Type",
          model: "type",
          values: 0
          }
      ],
      dropList: [
        //Inputs
      ], 
      form: {
          topic: '',
      },
      myToggle: false,
      draglistShow : false,
      versionTabShow : false,
      inputDialog : false,
      show: true,
      text : '',
      radioInput : '',
      radioInputs : [],
    }
  },

  methods: {

    oklife : function() {
      let inputs;
      inputs = this.radioInputs;
      this.radioInputs = [];
      this.formancespek("radios", this.form.topic, inputs);
    },
    
    addInput : function() {
      this.radioInputs.push(this.radioInput);
      this.radioInput = ""; 
    },

    onEnd : function(evt){

      if (this.dragList[evt.oldIndex].type === "radios"){
        this.$bvModal.show("radioDialog");
        console.log("Wassup?", this.radioInputs);
      }

      else {
        this.formance(this.dragList[evt.oldIndex].type, this.form.topic);
        console.log("HELLO", );
      }

      this.form.topic = "";

    },
    
    formancespek : function(type, label, values) {
      var x ;

      console.log("VALEURS ICI !!!", values);
      x= {
          schema : {
            fields : [
              {
                type: type,
                label: label,
                model: label,
                values: values,
                default: true
              }
            ]
          },
          model: {

          }
      }
      console.log("SELECT stuff", x)
      this.dropList.push(x);
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
          },
          model: {

          }
      }
      console.log("HELLO", x)
      this.dropList.push(x);

    },

    removeRow(index) {
      console.log("HEY DUDE", index)
      this.dropList.splice(index, 1)
      console.log(this.dropList)
    }
  },

}
</script>

<style scoped>

</style>
