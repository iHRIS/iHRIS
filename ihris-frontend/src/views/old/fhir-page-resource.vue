<template>
  <ihris-template :key="$route.fullPath">
    Loading...
  </ihris-template>
</template>

<script>
// @ is an alias to /src

var pageId
var page
var type

export default {
  name: "fhir-page-resource",
  data: function() {
    return {
      componentKey: "ihris-template"
    }
  },
  beforeCreate: function() {
    pageId = this.$route.params.id 
    page = this.$route.params.page
    type = this.$route.params.type
  },
  created: function() {
    this.componentKey = this.$route.path
    console.log("KEY", this.componentKey)
  },
  watch: {
    $route(to, from) {
      console.log("PRE ROUTE KEY", this.componentKey)
      this.componentKey = to.path
      console.log(to,from)
      console.log("POST ROUTE KEY", this.componentKey)
      console.log(this)
      /*
      if (to.path !== from.path) {
        this.$router.go(0)
      }
      */
    }
  },
  components: {
    IhrisTemplate: function() {
      console.log("CALLED THIS")
      return new Promise(resolve => {
        fetch( "/config/page/"+page ).then(response => {
          response.json().then(data => {
            if ( type === "search" ) {
              resolve({
                name: 'ihris-template',
                components: {
                  "ihris-search": () => import(/* webpackChunkName: "fhir-search" */ 
                    "@/components/ihris/ihris-search" ),
                  "ihris-search-term": () => import(/* webpackChunkName: "fhir-search" */ 
                    "@/components/ihris/ihris-search-term" )
                },
                template: data.search,
                data: function() { 
                  return { 
                    fields: data.searchData, 
                    terms: {} 
                  } 
                },
                methods: { 
                  searchData: function(expression, value) { 
                    this.$set(this.terms, expression, value) 
                  } 
                }
              })

            } else {
              resolve( {
                name: 'ihris-template', 
                data: function() { 
                  return { 
                    fhirId: pageId, 
                    isEdit: type !== "view",
                    type: type,
                    page: page
                  } 
                }, 
                components: { 
                  "ihris-resource": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/ihris/ihris-resource" ),
                  "ihris-section": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/ihris/ihris-section" ),
                  "ihris-secondary": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/ihris/ihris-secondary" ),
                  "ihris-array": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/ihris/ihris-array" ),
                  "fhir-extension": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-extension" ),
                  "fhir-reference": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-reference" ),
                  "fhir-string": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-string" ),
                  "fhir-human-name": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-human-name" ),
                  "fhir-code": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-code" ),
                  "fhir-date": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-date" ),
                  "fhir-date-time": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-date-time" ),
                  "fhir-period": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-period" ),
                  "fhir-identifier": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-identifier" ),
                  "fhir-contact-point": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-contact-point" ),
                  "fhir-address": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-address" ),
                  "fhir-codeable-concept": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-codeable-concept" ),
                  "fhir-uri": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-uri" ),
                  "fhir-boolean": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-boolean" ),
                  "fhir-positive-int": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-positive-int" ),
                  "fhir-coding": () => import(/* webpackChunkName: "fhir-main" */ 
                    "@/components/fhir/fhir-coding" )
                },
                template: data.template,
                methods: {
                  setEdit: function(val) {
                    if ( type === "view" ) {
                      console.log("got",val)
                      this.isEdit = val
                    }
                  }
                }
              } )
              //console.log(data.template)
              }
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
  }
}

</script>
