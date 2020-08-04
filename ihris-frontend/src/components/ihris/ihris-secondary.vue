<template>
  <v-container class="my-3" v-if="!edit">
    <v-data-table
      :headers="columns"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
const isObject = (obj) => {
  return (!!obj) && (obj.constructor === Object)
}

export default {
  name: "ihris-secondary",
  props: ["title", "field", "profile", "slotProps", "link-id", "link-field", "search-field", "edit", "columns"],
  data: function() {
    return {
      source: { data: {}, path: this.field },
      empty: true,
      items: [],
      loading: true
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
            if ( data.entry ) {
              for( let entry of data.entry ) {
                let row = {}
                for( let header of this.columns ) {
                  try {
                    let content = this.$fhirpath.evaluate( entry.resource, header.value )
                    row[header.value] = await this.processContent( content )
                  } catch ( err ) {
                    console.log(err)
                  }
                }
                this.items.push( row )
              }
            }

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
        } else {
          console.log("Unable to process content:",content)
          return "Unknown"
        }
      } else {
        return content
      }
    }
  }
}

</script>
