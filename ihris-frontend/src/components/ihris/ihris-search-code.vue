<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        Search {{ label }}
        <v-spacer></v-spacer>
        <slot></slot>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details>
        </v-text-field>
      </v-card-title>
      <v-card-subtitle v-if="error_message" class="white--text error">{{ error_message }}</v-card-subtitle>
      <v-data-table
        style="cursor: pointer"
        :headers="headers"
        :items="results"
        item-key="code"
        :search="search"
        :options.sync="options"
        :server-items-length="total"
        :footer-props="{ 'items-per-page-options': [5,10,20,50] }"
        :loading="loading"
        class="elevation-1"
        @click:row="clickIt"
      >
      </v-data-table>
    </v-card>

  </v-container>
</template>

<script>

export default {
  name: "ihris-search-code",
  props: ["profile","fields","label","terms","page"],
  data: function() {
    return {
      debug: "",
      search: "",
      headers: [],
      results: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      error_message: null,
      lookup_cache: {},
      lookup_loading: {}
    }
  },
  watch: {
    /*
    terms: {
      handler() {
        this.getData(true)
      },
      deep: true
    },
    options: {
      handler() {
        this.getData()
      },
      deep: true
    }
    */
  },
  created: function() {
    for( let field of this.fields ) {
      this.headers.push( { text: field[0], value: field[1] } )
    }
  },
  mounted: function() {
    this.getData()
  },
  methods: {
    clickIt: function(record) {
      this.$router.push({ name:"resource_view", params: {page: this.page, id: record.code } })
    },
    codeLookup: function ( system, code ) {
      return new Promise ( (resolve ) => {
        let lookup = system + "#" + code
        if ( this.lookup_loading[ lookup ] ) {
          setTimeout( () => {
            resolve( this.codeLookup( system, code ) )
          }, 100 )
        } else if ( !this.lookup_cache[ lookup ] ) {
          this.lookup_loading[ lookup ] = true
          console.log('looking up',lookup)
          fetch( "/fhir/CodeSystem/$lookup?system="+system+"&code="+code ).then(response => {
            if ( response.status === 200 ) {
              response.json().then( data => {
                if ( data.parameter ) {
                  let display = data.parameter.find( param => param.name === "display" )
                  if ( display ) {
                    this.lookup_cache[ lookup ] = display.valueString
                    this.lookup_loading[ lookup ] = false
                    resolve(this.lookup_cache[lookup])
                  } else {
                    console.log("No display data found",data)
                    this.lookup_cache[ lookup ] = "Unknown"
                    this.lookup_loading[ lookup ] = false
                    resolve(this.lookup_cache[lookup])
                  }
                } else {
                  console.log("No display data found",data)
                  this.lookup_cache[ lookup ] = "Unknown"
                  this.lookup_loading[ lookup ] = false
                  resolve(this.lookup_cache[lookup])
                }
              } ).catch( err => {
                console.log(err)
                this.lookup_cache[ lookup ] = "Error"
                this.lookup_loading[ lookup ] = false
                resolve(this.lookup_cache[lookup])
               } )
            }
          } ).catch( err => {
            console.log(err)
            this.lookup_cache[ lookup ] = "Error"
            this.lookup_loading[ lookup ] = false
            resolve(this.lookup_cache[lookup])
          } )
          setTimeout( () => {
            this.lookup_cache[ lookup ] = "found"
            this.lookup_loading[ lookup ] = false
          }, 200 )
        } else {
          resolve (this.lookup_cache[ lookup ])
        }
      } )
    },
    getData: function () {
      //console.log("getting data",restart)
      this.loading = true
      this.error_message = null
      let url = "/fhir/CodeSystem"+this.profile.substring(this.profile.lastIndexOf("/"))
      console.log(url)

      fetch( url ).then(response => {
        //console.log("fetching",url)
        response.json().then(async (data) => {
          this.results = []
          if ( data.concept && data.concept.length > 0 ) {
            for( let entry of data.concept ) {
              let result = { code: entry.code, display: entry.display, definition: entry.definition }
              let pending = false
              if ( entry.property ) {
                for ( let prop of data.property ) {
                  let property = entry.property.find( conceptProp => conceptProp.code === prop.code )
                  if ( property ) {
                    if ( prop.type === "code" ) {
                      if ( property.valueCode ) {
                        result[ prop.code ] = await this.codeLookup( prop.uri, property.valueCode )
                      } else {
                        result[ prop.code ] = ""
                      }
                    } else if ( prop.type === "Coding" ) {
                      if ( property.valueCoding ) {
                        result[ prop.code ] = await this.codeLookup( property.valueCoding.system, property.valueCoding.code )
                      } else {
                        result[ prop.code ] = ""
                      }
                    } else {
                      result[ prop.code ] = property["value"+prop.type.charAt(0).toUpperCase() + prop.type.slice(1)]
                    }
                  }
                  //result[field[1]] = this.$fhirpath.evaluate(entry.resource, field[1])
                }
              }
              if ( pending ) {
                this.pending.push( result )
              } else {
                this.results.push( result )
              }
            }
          }
          this.total = data.concept.length
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.error_message = "Unable to load results."
          console.log(err)
        })
      }).catch(err => {
        this.loading = false
        this.error_message = "Unable to load results."
        console.log(err)
      })


    }
  }
}
</script>
