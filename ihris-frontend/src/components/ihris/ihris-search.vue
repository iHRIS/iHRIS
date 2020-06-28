<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        Search {{ label }}
        <v-spacer></v-spacer>
        <slot></slot>
      </v-card-title>
      <v-card-subtitle v-if="error_message" class="white--text error">{{ error_message }}</v-card-subtitle>
      <v-data-table
        style="cursor: pointer"
        :headers="headers"
        :items="results"
        :options.sync="options"
        :server-items-length="total"
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
  name: "ihris-search",
  props: ["profile","fields","label","terms","page"],
  data: function() {
    return {
      debug: "",
      headers: [],
      results: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      prevPage: -1,
      link: [],
      error_message: null
    }
  },
  watch: {
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
  },
  created: function() {
    for( let field of this.fields ) {
      this.headers.push( { text: field[0], value: field[1] } )
    }
  },
  mounted: function() {
    this.getData(true)
  },
  methods: {
    clickIt: function(record) {
      this.$router.push({ name:"resource_view", params: {page: this.page, id: record.id } })
    },
    getData(restart) {
      //console.log("getting data",restart)
      this.loading = true
      this.error_message = null
      let url = ""
      if ( restart ) this.options.page = 1
      if ( this.options.page > 1 ) {
        if ( this.options.page === this.prevPage - 1 ) {
          url = this.link.find(link => link.relation === "previous").url
        } else if ( this.options.page === this.prevPage + 1 ) {
          url = this.link.find(link => link.relation === "next").url
        }
        url = url.substring( url.indexOf('/fhir/') )
      }
      if ( url === "" ) {
        let count = this.options.itemsPerPage || 10
        let sort = ""
        for( let idx in this.options.sortBy ) {
          if ( sort ) {
            sort += ","
          }
          if ( this.options.sortDesc[idx] ) {
            sort += "-"
          }
          sort += this.options.sortBy[idx]
        }
        url = "/fhir/"+this.label+"?_count=" + count +
          "&_total=accurate&_profile=" + this.profile
        let sTerms = Object.keys( this.terms )
        for ( let term of sTerms  ) {
          url += "&" + term + "=" + this.terms[term]
        }
        this.debug=url
      }
      this.prevPage = this.options.page

      fetch( url ).then(response => {
        //console.log("fetching",url)
        response.json().then(data => {
          this.results = []
          if ( data.total > 0 ) {
            this.link = data.link
            for( let entry of data.entry ) {
              let result = { id: entry.resource.id }
              for( let field of this.fields ) {
                result[field[1]] = this.$fhirpath.evaluate(entry.resource, field[1])
              }
              this.results.push( result )
            }
          }
          this.total = data.total
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
