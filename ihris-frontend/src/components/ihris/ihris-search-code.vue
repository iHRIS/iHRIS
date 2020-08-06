<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        {{ label }}
        <v-spacer></v-spacer>
        <slot></slot>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details>
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn class="primary" :to="'/resource/add/'+page">
          <v-icon>mdi-database-plus</v-icon>
          Add {{label}}
        </v-btn>
      </v-card-title>
      <v-card-subtitle v-if="error_message" class="white--text error">{{ error_message }}</v-card-subtitle>
      <v-data-table
        style="cursor: pointer"
        :headers="headers"
        :items="results"
        item-key="code"
        :search="search"
        :options.sync="options"
        :footer-props="{ 'items-per-page-options': [5,10,20,50] }"
        :loading="loading"
        class="elevation-1"
        @click:row="clickIt"
      ></v-data-table>
    </v-card>

  </v-container>
</template>

<script>

export default {
  name: "ihris-search-code",
  props: ["profile","fields","label","terms","page","resource"],
  data: function() {
    return {
      debug: "",
      search: "",
      headers: [],
      results: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      error_message: null
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
    getData: function () {
      //console.log("getting data",restart)
      this.loading = true
      this.error_message = null
      let url = "/fhir/CodeSystem"+this.profile.substring(this.profile.lastIndexOf("/"))

      fetch( url ).then(response => {
        //console.log("fetching",url)
        response.json().then(async (data) => {
          this.results = []
          if ( data.concept && data.concept.length > 0 ) {
            for( let entry of data.concept ) {
              let result = { code: entry.code, display: entry.display, definition: entry.definition }
              if ( entry.property && data.property ) {
                for ( let prop of data.property ) {
                  let property = entry.property.find( conceptProp => conceptProp.code === prop.code )
                  if ( property ) {
                    if ( prop.type === "code" ) {
                      if ( property.valueCode ) {
                        result[ prop.code ] = await this.$fhirutils.codeLookup( prop.uri, property.valueCode )
                      } else {
                        result[ prop.code ] = ""
                      }
                    } else if ( prop.type === "Coding" ) {
                      if ( property.valueCoding ) {
                        result[ prop.code ] = await this.$fhirutils.codeLookup( property.valueCoding.system, property.valueCoding.code )
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
              this.results.push( result )
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
