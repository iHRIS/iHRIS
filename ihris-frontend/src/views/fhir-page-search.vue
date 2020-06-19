<template>
  <fhir-template>
    Loading...
  </fhir-template>
</template>

<script>
// @ is an alias to /src

const searchComps = {
  "ihris-search": () => import(/* webpackChunkName: "fhir-search" */ "@/components/ihris/ihris-search" ),
  "ihris-search-term": () => import(/* webpackChunkName: "fhir-search" */ "@/components/ihris/ihris-search-term" )
}
var page

export default {
  name: "fhir-page",
  data: function() {
    return {
    }
  },
  components: {
    FhirTemplate: function() {
      return new Promise(resolve => {
        fetch( "/config/page/"+page ).then(response => {
            response.json().then(data => {
              resolve({
                components: searchComps, 
                template: data.search, 
                data: function() { return { fields: data.searchData, terms: {} } },
                methods: { searchData: function(expression, value) { this.$set(this.terms, expression, value) } }
              })
            }).catch(err => {
              console.log(err)
              resolve({template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
            })
        }).catch(err => {
          console.log(err)
          resolve({template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
        })
      })
    }
  },
  created: function() {
    page = this.$route.params.page
  }
}

</script>
