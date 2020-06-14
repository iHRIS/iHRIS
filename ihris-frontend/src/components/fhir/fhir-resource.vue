<template>
  <v-container class="py-5">
    <v-card
      class="mx-auto my-5"
      max-width="800"
      outlined
    >
      <v-card-title v-if="!fhirId" class="white--text primary darken-1">
        <v-progress-circular indeterminate v-if="loading" color="primary"></v-progress-circular>
        Add {{ field }}
      </v-card-title>
      <v-card-title v-else class="white--text primary darken-1">
        <v-progress-circular indeterminate v-if="loading" color="primary"></v-progress-circular>
        Edit {{ field }}
      </v-card-title>
      <v-card-text class="mt-5">
        <slot :source="source"></slot>
      </v-card-text>
      <v-card-actions v-if="!fhirId">
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="processFHIR()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular
        size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <v-btn icon @click="overlay = false"><v-icon>mdi-close</v-icon></v-btn>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: "fhir-resource",
  props: ["field","fhir-id","page","profile"],
  data: function() {
    return {
      fhir: {},
      source: { data: {}, path: "", edit: true },
      loading: false,
      overlay: false
    }
  },
  created: function() {
    if ( this.fhirId ) {
      this.loading = true
      //console.log("getting",this.field,this.fhirId)
      fetch( "/fhir/"+this.field+"/"+this.fhirId ).then(response => {
        response.json().then(data => {
          //this.$store.commit('setCurrentResource', data)
          this.source = { data: data, path: this.field, edit: false }
          this.loading = false
          //console.log(data)
        }).catch(err=> {
          console.log(this.field,this.fhirId,err)
        })
      }).catch(err=> {
        console.log(this.field,this.fhirId,err)
      })
    }
  },
  computed: {
    hasFhirId: function() {
      if ( this.fhirId == '' ) {
        console.log("blank")
        return false
      } else if ( !this.fhirId ) {
        console.log("fhirid is falsy")
        return false
      } else {
        console.log("fhirid else")
        return true
      }
    }
    /*
    source: function() {
      return this.$store.state.fhir
    }
    */
  },
  methods: {
    processFHIR: function() {
      this.overlay = true
      this.loading = true
      //console.log(this.field)
      this.fhir = { 
        resourceType: this.field,
        meta: {
          profile: [ this.profile ]
        }
      }
      //console.log(this)
      processChildren( this.field, this.fhir, this.$children )
      console.log("SAVING",this.fhir)
      fetch( "/fhir/"+this.field, {
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
            this.$router.push({ name:"resource_view", params: {page: this.page, id: data.id} })
          })
        }
      } )
      //console.log(this.fhir)

      /*
      console.log(this.$scopedSlots.default())
      processSlots( this.field, this.$scopedSlots.default() )
      */
    }
  }
}

const processChildren = function( parent, obj, children ) {
  //console.log("called on "+parent)

  children.forEach( child => {

    let fullField = parent

    let next = obj

    if ( child.field && !child.fieldType /* ignore arrays */ ) {
      //console.log("working on "+parent+" . "+child.field)
      let field
      if ( child.sliceName ) {
        if ( child.field.startsWith("value[x]") ) {
          field = child.field.substring(9)
          fullField += "." + field
        } else {
          field = child.field.replace(":"+child.sliceName, "")
          fullField += "." + field
        }
      } else {
        field = child.field
        fullField += "."+field
      }
      if ( child.max !== "1" || child.baseMax !== "1" ) {
        if ( !obj.hasOwnProperty(field) ) {
          next[field] = []
        }
      } else {
        next[field] = {}
      }
      //console.log(fullField)
        //console.log(child.max, child.baseMax)
      //console.log(child)
      if ( child.hasOwnProperty("value") ) {
        //console.log( fullField +"="+ child.value )
        if ( Array.isArray( next[field] ) ) {
          next[field].push( child.value )
        } else {
          next[field] = child.value
        }
        next = next[field]
      } else {
        if ( Array.isArray( next[field] ) ) {
          let sub = {}
          if ( child.profile ) {
            sub.url = child.profile
          }
          next[field].push( sub )
          next = sub
        } else {
          next = next[field]
        }
      }
    }

    if ( child.$children ) {
      processChildren( fullField, next, child.$children )
    } 

  } )

}


</script>
