<template>
  <v-container class="my-3">
        
    <slot></slot>
    <v-overlay :value="overlay">
      <v-progress-circular
        size="50"
        color="primary"
        indeterminate
        ></v-progress-circular>
    </v-overlay>

    <v-navigation-drawer
      app
      right
      permanent
      clipped
      class="primary darken-1 white--text"
      style="z-index: 3;"
      v-if="sectionMenu"
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
        <v-subheader class="white--text"><h2>Sections</h2></v-subheader>
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
export default {
  name: "ihris-questionnaire",
  props: ["id", "title", "description", "purpose", "section-menu"],
  data: function() {
    return {
      fhir: {},
      loading: false,
      overlay: false,
      isEdit: false
    }
  },
  created: function() {
  },
  computed: {
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
      console.log("SAVE",this.fhir)
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
