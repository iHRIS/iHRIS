<template>
  <v-container class="my-3">
        
    <slot></slot>
    <v-overlay :value="overlay">
      <v-progress-circular
        size="50"
        color="primary"
        indeterminate
        ></v-progress-circular>
      <v-btn icon @click="overlay = false"><v-icon>mdi-close</v-icon></v-btn>
    </v-overlay>

    <v-navigation-drawer
      app
      right
      permanent
      clipped
      class="primary darken-1 white--text"
      style="z-index: 3;"
      >
      <v-list class="white--text">
        <v-list-item>
          <v-btn dark class="accent darken-1" @click="$router.go(-1)" v-if="isEdit">
          <v-icon light>mdi-content-save</v-icon>
          <span>Back</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark class="success darken-1" @click="processFHIR()">
          <v-icon light>mdi-content-save</v-icon>
          <span>Save</span>
          </v-btn>
        </v-list-item>
        <v-divider color="white"></v-divider>
        <v-subheader class="white--text" v-if="sectionMenu"><h2>Sections</h2></v-subheader>
        <v-list-item v-for="section in sectionMenu" :href="'#section-'+section.id" :key="section.id">
          <v-list-item-content class="white--text">
            <v-list-item-title class="text-uppercase"><h4>{{ section.title }}</h4></v-list-item-title>
            <v-list-item-subtitle class="white--text">{{ section.desc }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-container>

</template>

<script>
const querystring = require('querystring')
export default {
  name: "ihris-questionnaire",
  props: ["id", "url", "title", "description", "purpose", "section-menu", "view-page", "edit"],
  data: function() {
    return {
      fhir: {},
      loading: false,
      overlay: false,
      isEdit: false
    }
  },
  created: function() {
    //console.log("QUERY",this.$route.query)
  },
  methods: {
    processFHIR: function() {
      this.overlay = true
      this.loading = true
      //console.log(this.field)
      this.fhir = { 
        resourceType: "QuestionnaireResponse",
        questionnaire: this.url,
        status: "completed",
        item: []
      }
      //console.log(this)
      processChildren( this.fhir.item, this.$children )
      console.log("SAVE",this.fhir)
      fetch( "/fhir/QuestionnaireResponse?"+querystring.stringify( this.$route.query ), {
        method: "POST",
        headers: {
          "Content-Type": "application/fhir+json"
        },
        redirect: 'manual',
        body: JSON.stringify(this.fhir)
      } ).then(response => {
        //console.log(response)
        //console.log(response.headers)
        if ( response.status === 201 ) {
          response.json().then(data => {
            this.overlay = false
            this.loading = false
            if ( this.viewPage && data.subject && data.subject.reference ) {
              let subject = data.subject.reference.split('/')
              if ( subject[1] ) {
                subject = subject[1]
              } else {
                subject = data.subject.reference
              }
              this.$router.push({ name:"resource_view", params: {page: this.viewPage, id: subject } })
            } else {
              this.$router.push({ name:"home" })
            }
            //console.log(data)
          })
          this.$store.commit('setMessage', { type: 'success', text: 'Update successful.' } )
        }
      } ).catch(err => {
        console.log(err)
        this.overlay = false
        this.loading = false
        this.$store.commit('setMessage', { type: 'error', text: 'Failed to update data.' } )
      } )
      //console.log(this.fhir)

      /*
      console.log(this.$scopedSlots.default())
      processSlots( this.field, this.$scopedSlots.default() )
      */
    }
  }
}

const processChildren = function( obj, children, itemMap ) {
  //console.log("called on "+parent)
  if ( !itemMap ) itemMap = {}

  children.forEach( child => {

    let next = obj
    let myItemMap = {}

    if ( child.isArray ) {
      //console.log("ARRAY", child.path)
    } else if ( child.isQuestionnaireGroup ) {
      //console.log("GROUP", child.path)
      let section = { linkId: child.path, text: child.label, item: [] } 
      next.push( section )
      next = section.item
    } else if ( child.qField ) {
      //console.log("PROCESS",path,child.qField,child.value)
      let item
      if ( itemMap.hasOwnProperty( child.path ) ) {
        item = itemMap[ child.path ]
      } else {
        item = { linkId: child.path, answer: [] }
        itemMap[child.path] = item
        next.push( item )
      }
      let answer = {}
      answer[child.qField] = child.value
      item.answer.push( answer )
    }

    if ( child.$children ) {
      //console.log("PROCESSING CHILDREN OF",child.path)
      processChildren( next, child.$children, myItemMap )
    } 

  } )

}


</script>
