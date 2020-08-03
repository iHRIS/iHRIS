<template>
  <ihris-template :key="$route.path">
    Loading...
  </ihris-template>
</template>

<script>
// @ is an alias to /src

var page
import Vue from 'vue'

export default {
  name: "fhir-page-search",
  data: function() {
    return {
    }
  },
  created: function() {
    this.getTemplate()
  },
  methods: {
    getTemplate: function() {
      fetch( "/config/page/"+page ).then(response => {
        response.json().then(data => {
          Vue.component( 'ihris-template', {
            name: 'ihris-template',
            data: function() { 
              return { 
                fields: data.searchData, 
                terms: {} 
              } 
            },
            components: {
              "ihris-search": () => import(/* webpackChunkName: "fhir-search" */ "@/components/ihris/ihris-search" ),
              "ihris-search-code": () => import(/* webpackChunkName: "fhir-search" */ "@/components/ihris/ihris-search-code" ),
              "ihris-search-term": () => import(/* webpackChunkName: "fhir-search" */ "@/components/ihris/ihris-search-term" )
            }, 
            template: data.search, 
            methods: { 
              searchData: function(expression, value) { 
                this.$set(this.terms, expression, value) 
              } 
            }
          })
          this.$forceUpdate()
          console.log("updated template")
        }).catch(err => {
          console.log(err)
          Vue.component( 'ihris-template', {template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
          this.$forceUpdate()
        })
      }).catch(err => {
        console.log(err)
        Vue.component( 'ihris-template', {template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
        this.$forceUpdate()
      })
    }
  },
  components: {
  },
  beforeCreate: function() {
    page = this.$route.params.page
    //Vue.component( 'ihris-template', this.getTemplate() )
    Vue.component('ihris-template', { template: '<div>Loading...</div>' } )
  }
}

</script>
