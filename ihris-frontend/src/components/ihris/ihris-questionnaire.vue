<template>
  <v-container class="my-3">

    <v-form 
      ref="form"
      v-model="valid"
    >
        
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
            <v-btn v-if="valid" dark class="success darken-1" @click="processFHIR()" :disabled="!valid">
              <v-icon light>mdi-content-save</v-icon>
              <span>Save</span>
            </v-btn>
            <v-btn v-else dark class="warning" @click="$refs.form.validate()">
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
    </v-form>
  </v-container>

</template>

<script>
const querystring = require('querystring')
export default {
  name: "ihris-questionnaire",
  props: ["id", "url", "title", "description", "purpose", "section-menu", "view-page", "edit", "constraints"],
  data: function() {
    return {
      fhir: {},
      loading: false,
      overlay: false,
      isEdit: false,
      valid: true,
      advancedValid: true
    }
  },
  created: function() {
    //console.log("QUERY",this.$route.query)
  },
  methods: {
    processFHIR: async function() {
      this.$refs.form.validate()
      if ( !this.valid ) return
      this.advancedValid = true
      this.overlay = true
      this.loading = true

      const processChildren = async ( obj, children, itemMap ) => {
        //console.log("called on "+parent)
        if ( !itemMap ) itemMap = {}

        for ( let child of children ) {

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
            if ( child.constraints ) {
              child.errors = []
              try {
                this.advancedValid = await this.$fhirutils.checkConstraints( child.constraints, 
                  this.constraints, child.value, child.errors )
              } catch( err ) {
                this.advancedValid = false
                child.errors.push("An unknown error occurred.")
                console.log(err)
              }
            }
          }

          if ( child.$children ) {
            //console.log("PROCESSING CHILDREN OF",child.path)
            try {
              await processChildren( next, child.$children, myItemMap )
            } catch( err ) {
              this.advancedValid = false
              console.log(err)
            }

          } 
          if ( child.isQuestionnaireGroup && child.constraints ) {
            child.errors = []
            try {
              this.advancedValid = await this.$fhirutils.checkConstraints( child.constraints, 
                this.constraints, next, child.errors )
            } catch( err ) {
              this.advancedValid = false
              child.errors.push("An unknown error occurred.")
              console.log(err)
            }
          }


        }

      }


      //console.log(this.field)
      this.fhir = { 
        resourceType: "QuestionnaireResponse",
        questionnaire: this.url,
        status: "completed",
        item: []
      }
      //console.log(this)
      try {
        await processChildren( this.fhir.item, this.$children )
      } catch( err ) {
        this.advancedValid = false
        console.log(err)
      }
      if ( !this.advancedValid ) {
        this.overlay = false
        this.loading = false
        this.$store.commit('setMessage', { type: 'error', text: 'There were errors on the form.' })
        return
      }
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
            let subject
            if ( this.viewPage ) {
              if ( data.meta.tag ) {
                let redirect = data.meta.tag.find( tag => tag.system === "http://ihris.org/fhir/tags/resource" )
                if ( redirect && redirect.code ) {
                  subject = redirect.code
                }
              } 
              if ( !subject && data.subject && data.subject.reference ) {
                subject = data.subject.reference
              }
              if ( subject ) {
                let viewPageId = subject.split('/')
                if ( viewPageId[1] ) {
                  viewPageId = viewPageId[1]
                } else {
                  viewPageId = subject
                }
                this.$router.push({ name:"resource_view", params: {page: this.viewPage, id: viewPageId } })
              }
            }
            if ( !subject ) {
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


</script>
