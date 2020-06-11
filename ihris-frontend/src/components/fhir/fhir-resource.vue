<template>
  <v-container class="py-5">
    <v-card
      class="mx-auto my-5"
      max-width="800"
      outlined
    >
      <v-card-title v-if="id != ''" class="white--text primary darken-1">Add {{ field }}</v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          @click="processFHIR()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>

/*
const processSlots = function( parent, slots ) {
  slots.forEach( vNode => {
    // Seems to be extras that aren't needed.
    if ( vNode.tag ) {
      let fullField = parent+"."+vNode.componentOptions.propsData.field
      console.log( fullField + " - " + vNode.data.attrs.id )
      if ( vNode.context ) {
      console.log("has context")
      if ( vNode.context.$scopedSlots ) {
      console.log("has scopedslots")
      }
      }
      if ( vNode.context.$scopedSlots.default() ) {
      console.log( vNode.context.$scopedSlots.default() )
        processSlots( fullField, vNode.context.$scopedSlots.default() )
      }
    }
  } )
}
*/
const processChildren = function( parent, obj, children ) {
  //console.log("called on "+parent)

  children.forEach( child => {

    let fullField = parent

    let next = obj

    if ( child.field ) {
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
      /*
      if ( child.slotProps && child.slotProps.hasOwnProperty("input") && child.slotProps.input.hasOwnProperty("index") ) {
        //console.log("WHEN FOUND INDEX ",child.max, child.baseMax)
        fullField += "["+child.slotProps.input.index+"]"
        if ( !obj.hasOwnProperty(field) ) {
          next[field] = []
        }
      } else {
        //if ( !obj.hasOwnProperty(field) ) {
          //next[field] = {}
        //}
      }
      */
    /*
      if ( child.sliceName ) {
        if ( child.field.startsWith("value[x]") ) {
          field = child.field.substring(9)
          fullField += "." + field
          next[field] = {}
        } else {
          field = child.field.replace(":"+child.sliceName, "")
          fullField += "." + field
          if ( child.max !== "1" || child.baseMax !== "1" ) {
            if ( !obj.hasOwnProperty(field) ) {
              next[field] = []
            }
          } else {
            next[field] = {}
          }
        }
      } else {
        field = child.field
        fullField += "."+field
      }
      if ( child.slotProps && child.slotProps.hasOwnProperty("input") && child.slotProps.input.hasOwnProperty("index") ) {
        //console.log("WHEN FOUND INDEX ",child.max, child.baseMax)
        fullField += "["+child.slotProps.input.index+"]"
        if ( !obj.hasOwnProperty(field) ) {
          next[field] = []
        }
      } else {
        //if ( !obj.hasOwnProperty(field) ) {
          //next[field] = {}
        //}
      }
    */
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


export default {
  name: "fhir-resource",
  props: ["field","id","page"],
  data: function() {
    return {
      fhir: {}
    }
  },
  methods: {
    processFHIR: function() {
      //console.log(this.field)
      this.fhir = {}
      this.fhir.resourceType = this.field
      //console.log(this)
      processChildren( this.field, this.fhir, this.$children )
      console.log(this.fhir)

      /*
      console.log(this.$scopedSlots.default())
      processSlots( this.field, this.$scopedSlots.default() )
      */
    }
  }
}
</script>
