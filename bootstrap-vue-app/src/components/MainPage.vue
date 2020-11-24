<template lang="pug">
  b-container(fluid)
    

    b-form-row
      //Bouton de la draglist
      b-col()
        b-row.pt-5(align-h="center")
          b-avatar(variant="light" icon="bag-plus" v-b-toggle.sidebar-1)  

      //Sidebar contenant la draglist

      b-sidebar(v-model="draglistShow" id="sidebar-1" title="DRAGLIST" shadow style=" pointer-events: all; position: absolute")

        //Input du libéllé de l'Input
        div(class="row mx-3 py-2")
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
            draggable(class="dragArea list-group" :list="dragList" :group="{ name: 'formInput', pull: 'clone', put: false }" :sort="false" @start="onStart" @end="onEnd")
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

      b-col.mt-3( cols="6" @mouseover="mouseOver()" @mouseleave="mouseLeave()" style="background-color : #f8f9fa; border-radius: 10px 00px; padding: 10px;" )
        h2 {{this.actualChapter.title}}

        br
        Form(:dropList="dropList" @remove-row="removeRow" )
      
               
          
      //Bouton de la gestion des versions
      b-col
        b-row.pt-5(align-h="center")
          b-btn(@click="saveChapter()" variant="primary" class="mx-4") Versionner
          b-avatar(variant="light" icon="collection" v-b-toggle.sidebar-2)

      //Sidebar de la gestion des versions
      b-sidebar( v-model="versionTabShow" id="sidebar-2" title="Versionning" right shadow)
        h4 Version en production
        div(class="py-2")
          b-button(v-if="this.mostRecentChapter" @click="changeChapter(mostRecentChapter)" variant="success") {{this.mostRecentChapter.title}} V: {{this.mostRecentChapter._version}}.0
        h4 Versions antérieurs
        div(class="py-2")
          div(v-for="version in previousChapters")
            b-button(@click="changeChapter(version)" class="my-2" variant="info") {{version.title}} V: {{version._version}}.0
            //div(@click="changeChapter(version)" style="cursor: pointer") {{version.title}} V: {{version._version}}.0
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
      //actualChapter: {},
      activeCopy: false,
      //mostRecentChapter : {}
      radioInput : '',
      radioInputs : [],

    }
  },
  watch: {
    actualChapter: async function (val) {
      await this.$store.dispatch('loadPrevious', {chapterId: val._id})
      await this.$store.dispatch('loadOneChapter', {chapterId: val._id})
      this.dropList = []
      this.actualChapter.topics.forEach(el => {
        let x ;
        x = {
          schema : {
            fields : el.schema.fields
          },
          model: el.model
        }
        this.dropList.push(x)
      })
    }

  },
  computed: {
    actualChapter: {
      get() {
        return this.$store.state.activeChapter || this.myChapters[0]
      },
      set(value) {
        this.$store.commit('SET_ACTIVE_CHAPTER', value)
      }
    },
    mostRecentChapter: {
      get() {
        return this.$store.state.mostRecentActiveChapter
      },
      set(value) {
        this.$store.commit('SET_RECENT_ACTIVE_CHAPTER', value)
      }
    },
    myChapters: {
      get() {
        return this.$store.state.chapters
      },
      set(value) {
        this.$store.commit('SET_CHAPTERS', value)
      }
    },
    previousChapters: {
      get() {
        let array = this.$store.state.oldChapters
        array.reverse()
        return array
      },
      set(value) {
        this.$store.commit('SET_OLD_CHAPTERS', value)
      }
    },
  },



  methods: {
    onStart : function () {
      this.draglistShow = ! this.draglistShow
    },

    oklife : function() {
      let inputs;
      inputs = this.radioInputs;
      this.radioInputs = [];
      this.formancespek("radios", this.form.topic, inputs);
      this.form.topic = "";
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
        this.form.topic = "";
      }
      this.draglistShow = ! this.draglistShow
      

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
      this.dropList.push(x);
    },

    removeRow(index) {
      this.dropList.splice(index, 1)
    },
    mouseOver: function(){
      this.activeCopy = true
    },
    mouseLeave: function(){
      this.activeCopy = false
    },
    changeChapter(newChapter) {
      this.actualChapter = newChapter
      console.log("CHAPTER CHANGED")
    },
    async saveChapter() {
      this.actualChapter.topics = this.dropList
      await this.$store.dispatch('updateChapter', this.actualChapter)
      await this.$store.dispatch('loadPrevious', {chapterId: this.actualChapter._id})
      await this.$store.dispatch('loadOneChapter', {chapterId: this.actualChapter._id})
      console.log("CHAPTER SAVED")
    }

  },
  async created() {
    //await this.$store.dispatch('loadChapters')
    //this.actualChapter = this.myChapters[0]
    if(this.actualChapter.topics === undefined){
      this.actualChapter = this.myChapters[0]
    }

    this.actualChapter.topics.forEach(el => {
      let x ;
      x = {
        schema : {
          fields : el.schema.fields
        },
        model:  el.model
      }
      this.dropList.push(x)
    })
    console.log("Created")
  },

  async mounted () {
    await this.$store.dispatch('loadPrevious', {chapterId: this.actualChapter._id})
    await this.$store.dispatch('loadOneChapter', {chapterId: this.actualChapter._id})
     //this.dropList = this.actualChapter.topics
    console.log("Mounted")
  },

}
</script>

<style scoped>

</style>
