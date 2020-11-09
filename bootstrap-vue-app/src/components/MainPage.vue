<template lang="pug">
  b-container(fluid)

    b-form-row
      //Bouton de la draglist
      b-col()
        b-row.pt-5(align-h="center")
          b-avatar(variant="success" icon="bag-plus" v-b-toggle.sidebar-1)  
      //Sidebar contenant la draglist
      b-sidebar(v-model="draglistShow" id="sidebar-1" title="DRAGLIST" shadow style=" pointer-events: all; position: absolute")
        //Input du libéllé de l'Input
        div(class="row mx-3 py-2")
          b-form(autocomplete="off")
            b-form-group(
              id="input-group-1"
              label="Libellé :"
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
            draggable(class="dragArea list-group" :list="dragList" :group="{ name: 'formInput', pull: 'clone', put: false }" :sort="false" @start="onStart" @end="onEnd")
              div(class="list-group-item" v-for="element in dragList" :key="element.name")
                div {{ element.name }}
                  
      //MainPage
      b-col.mt-3( cols="6" @mouseover="mouseOver()" @mouseleave="mouseLeave()" style="background-color : #8D89A3; border-radius: 15px 50px; padding: 10px;" )
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
        { name: "Text", id: 2, type : 'textArea' }
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
      show: true,
      text : '',

      activeCopy: false
    }
  },

  methods: {
    onStart : function () {
      this.draglistShow = ! this.draglistShow
    },
    onEnd : function(evt){

      this.formance(this.dragList[evt.oldIndex].type, this.form.topic);
      console.log("HELLO BATARD", );

      this.draglistShow = ! this.draglistShow
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
    },
    mouseOver: function(){
      this.activeCopy = true
      console.log("TRUEE !")
    },
    mouseLeave: function(){
      this.activeCopy = false
      console.log("FALSEE !")
    }

  },

  mounted () {
    this.$store.dispatch('loadChapters')
  },

}
</script>

<style scoped>

</style>
