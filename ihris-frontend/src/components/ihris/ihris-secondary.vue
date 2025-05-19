<template>
  <v-container :id="computedId" class="my-3" v-if="!edit">
    <v-data-table
      v-if="emptyDisplay != 'false'"
      :headers="translatedHeader"
      :items="items"
      item-key="id"
      :items-per-page="itemsPerPage"
      :loading="loading"
      class="elevation-1"
      dense
      :footer-props="{ 'items-per-page-text':$t('App.hardcoded-texts.tableText'), 'items-per-page-options': itemsPerPageOptions }"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            {{ $t(`App.fhir-resources-texts.${title}`) }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            v-for="action in topActions"
            :to="setupLink( action.link, {} )"
            :color="action.class"
            :key="action.text"
            id="elementToHide"
            small
            >
            {{ $t(`App.fhir-resources-texts.${action.text}`) }}
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
          id="elementToHide"
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
    "search-field", "search-field-target", "edit", "columns", "actions", "empty-display","dateFormat"],
  data: function() {
    return {
      source: { data: {}, path: this.field },
      empty: true,
      itemsPerPage: 5,
      itemsPerPageOptions: [5,10,20,50,{ text: 'All', value: -1 }],
      items: [],
      loading: true,
      topActions: [],
      translatedHeader:[]
    }
  },
  mounted: function() {
    this.setupData()
    this.$root.$on("printPage", this.setItemsPerPageForPrint)

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
      this.translatedHeader =  this.columns.map((x)=> ({
        text: this.$t(`App.fhir-resources-texts.${x.text}`),
        value: x.value
      }))
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
      let url
      //for searchfield in the form Location:organization with Location being the primary resource, then use _include to retrieve secondary resources
      if(this.searchField.split(':').length === 2) {
        let resource = this.searchField.split(':')[0]
        url = "fhir/" + resource + "?_id=" + this.linkId + "&_include=" + this.searchField
      } else {
        url = "/fhir/" + this.field
        let queryStr = []
        if ( this.profile ) {
          queryStr.push( "_profile="+this.profile )
        }
        let filterValue = ""
        if(this.searchFieldTarget) {
          filterValue = this.searchFieldTarget + "/"
        }
        filterValue += this.linkId
        if ( this.searchField ) {
          queryStr.push( this.searchField+"="+filterValue )
        } else {
          queryStr.push( this.linkField.substring( this.linkField.indexOf('.') +1 ) +"="+filterValue )
        }
        url += "?" + queryStr.join("&")
      }
      url += '&_sort=-_id'
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
                if(this.searchField.split(':').length === 2 && entry.resource.resourceType === this.searchField.split(':')[0]) {
                  continue
                }
                let row = { id: entry.resource.id }
                for( let header of this.columns ) {
                  if ( header.value === "_action" ) continue
                  try {
                    let content = this.$fhirpath.evaluate( entry.resource, header.value )
                    row[header.value] = await this.processContent( content )
                    if(!this.$t(`App.hardcoded-texts.${row[header.value].toString()}`).startsWith('App.hardcoded-texts')) {
                      row[header.value] = this.$t(`App.hardcoded-texts.${row[header.value].toString()}`)
                    } else if(!this.$t(`App.fhir-resources-texts.${row[header.value].toString()}`).startsWith('App.fhir-resources-texts')) {
                      row[header.value] = this.$t(`App.fhir-resources-texts.${row[header.value].toString()}`)
                    }
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
                    //non row actions has to be tested against the latest resource
                    if ( action.condition ) {
                      let meets = this.$fhirpath.evaluate( data.entry[0].resource, action.condition )
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
                if(this.dateFormat){
                  const dateRegex = /\d{4}-\d{2}-\d{2}/g;
                  row = JSON.parse(JSON.stringify(row).replace(dateRegex,  match => {
                  return this.$moment(match).format(this.dateFormat);
                }));
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
    },
    setItemsPerPageForPrint() {
      this.itemsPerPage = -1
    },
  },
  computed: {
    computedId() {
      return this.items.length > 0 ? "" : 'section-element-to-hide';
    }
  }
}

</script>

<style>
tbody tr:nth-of-type(even) {
  background-color: #E0F2F1;
}

@media print {
    #elementToHide {
      display: none;
    }
  }
</style>
