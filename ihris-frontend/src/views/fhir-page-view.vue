<template>
  <fhir-template>
    Loading...
  </fhir-template>
</template>

<script>
// @ is an alias to /src

const comps = { 
  "fhir-resource": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-resource" ),
  "fhir-array": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-array" ),
  "fhir-extension": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-extension" ),
  "fhir-reference": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-reference" ),
  "fhir-string": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-string" ),
  "fhir-human-name": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-human-name" ),
  "fhir-code": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-code" ),
  "fhir-date": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date" ),
  "fhir-identifier": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-identifier" ),
  "fhir-contact-point": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-contact-point" ),
  "fhir-address": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-address" ),
  "fhir-codeable-concept": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-codeable-concept" ),
  "fhir-uri": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-uri" ),
  "fhir-positive-int": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-positive-int" ),
  "fhir-coding": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-coding" )
}
var pageId
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
              data.template = data.template.replace('fhir-resource profile=', 'fhir-resource fhir-id="'+pageId+'" profile=')
              resolve({components: comps, template: data.template})
              //console.log(data.template)
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
  beforeCreate: function() {
    pageId = this.$route.params.id 
    page = this.$route.params.page
  }
}

</script>
