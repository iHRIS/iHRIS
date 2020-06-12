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
  "fhir-date": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date" )
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
              data.template = data.template.replace('fhir-resource name=', 'fhir-resource page="'+page+'" name=')
              resolve({components: comps, template: data.template})
            }).catch(err => {
              console.log(err)
              resolve({template: '<template><h1>Error</h1><p>An error occurred trying to load this page</p>.</template>'})
            })
        }).catch(err => {
          console.log(err)
          resolve({template: '<template><h1>Error</h1><p>An error occurred trying to load this page</p>.</template>'})
        })
      })
    }
  },
  created: function() {
    page = this.$route.params.page
  }
}

</script>
