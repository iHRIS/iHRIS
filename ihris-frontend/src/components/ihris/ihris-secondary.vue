<template>
  <v-container class="my-3" v-if="!edit">
    <v-data-table
      :headers="columns"
      :items="items"
      item-key="id"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
      dense
    >
      
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn 
            v-for="action in topActions" 
            :to="setupLink( action.link, {} )" 
            :color="action.class" 
            :key="action.text"
            small
            >
            {{ action.text }}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item._action="{ item }">
        <v-btn 
          v-for="action in item.actions" 
          :to="setupLink( action.link, item )" 
          :color="action.class" 
          :key="action.text"
          small
          rounded
          >
          {{ action.text }}
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
const isObject = (obj) => {
  return (!!obj) && (obj.constructor === Object)
}

export default {
  name: "ihris-secondary",
  props: ["title", "field", "profile", "slotProps", "link-id", "link-field", 
    "search-field", "edit", "columns", "actions"],
  data: function() {
    return {
      source: { data: {}, path: this.field },
      empty: true,
      items: [],
      loading: true,
      topActions: []
    }
  },
  mounted: function() {
    this.setupData()
  },
  watch: {
    /*
    slotProps: {
      handler() {
        this.setupData()
      }, 
      deep: true
    }
    */
  },
  methods: {
    setupData: function() {
      /*
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
        } else {
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.field )
        }
        //console.log(this.source)
      }
      */
      let url = "/fhir/" + this.field
      let queryStr = []
      if ( this.profile ) {
        queryStr.push( "_profile="+this.profile )
      }
      if ( this.searchField ) {
        queryStr.push( this.searchField+"="+this.linkId )
      } else {
        queryStr.push( this.linkField.substring( this.linkField.indexOf('.') +1 ) +"="+this.linkId )
      }
      url += "?" + queryStr.join("&")
      this.items = []
      this.loading = true
      this.addItems( url )
    },
    addItems: function (url) {
      fetch( url ).then( response => {
        if ( response.status === 200 ) {
          response.json().then( async data => {
            if ( data.entry && data.entry.length > 0 ) {
              for( let entry of data.entry ) {
                let row = { id: entry.resource.id }
                for( let header of this.columns ) {
                  if ( header.value === "_action" ) continue
                  try {
                    let content = this.$fhirpath.evaluate( entry.resource, header.value )
                    row[header.value] = await this.processContent( content )
                  } catch ( err ) {
                    console.log(err)
                  }
                }
                if ( !row.actions ) row.actions = []
                for( let action of this.actions ) {
                  if ( action.row ) {
                    if ( action.condition ) {
                      let meets = this.$fhirpath.evaluate( entry.resource, action.condition )
                      if ( meets.every( meet => meet ) ) {
                        row.actions.push( action )
                      }
                    } else {
                      row.actions.push( action )
                    }
                  } else {
                    if ( action.condition ) {
                      let meets = this.$fhirpath.evaluate( entry.resource, action.condition )
                      if ( action.hasOwnProperty("meets") ) {
                        action.meets = action.meets && meets.every( meet => meet )
                      } else {
                        action.meets = meets.every( meet => meet )
                      }
                    } else {
                      action.meets = true
                    }
                  }
                }
                this.items.push( row )
              }
            } else {
              for( let action of this.actions ) {
                if ( !action.row ) {
                  action.meets = action.emptyDisplay
                }
              }
            }
            this.topActions = this.actions.filter( action => !action.row && action.meets )


            if ( data.link ) {
              let next = data.link.find( link => link.relation === "next" )
              if ( next ) {
                this.addItems( next.url )
              } else {
                this.loading = false
              }
            } else {
              this.loading = false
            }
          } ).catch( err => {
            this.loading = false
            console.log(err)
          } )
        } else {
          this.loading = false
          console.log("Unable to fetch",url,response.status)
        }
      } ).catch( err => {
        this.loading = false
        console.log(err)
      } )

    },
    processContent: async function( content ) {
      if ( Array.isArray( content ) ) {
        let output = await Promise.all(content.map( this.processContent ))
        return output.join(" ")
      } else if ( isObject( content ) ) {
        if ( content.code && content.system ) {
          return await this.$fhirutils.codeLookup( content.system, content.code )
        } else if ( content.display ) {
          return content.display
        } else if ( content.code ) {
          return content.code
        } else if ( content.reference ) {
          return await this.$fhirutils.resourceLookup( content.reference)
        } else {
          console.log("Unable to process content:",content)
          return "Unknown"
        }
      } else {
        return content
      }
    },
    setupLink( link, item ) {
      return link.replace( "ITEMID", item.id ).replace( "FHIRID", this.linkId )
    }
  }
}

</script>
