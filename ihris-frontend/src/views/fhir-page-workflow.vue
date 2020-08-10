<template>
  <v-container>
  <h1>Testing</h1>
  <p>Testing this out: {{ workflow }} {{ $route.query }}</p>
  <p>{{ $route.params }}</p>
  </v-container>
</template>

<script>
// @ is an alias to /src

//const comps = { 
  //"ihris-questionnaire": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-questionnaire" ),
  //"ihris-questionnaire-section": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-questionnaire-section" ),
  //"ihris-questionnaire-group": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-questionnaire-group" ),
  //"ihris-hidden": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-hidden" ),
  //"ihris-array": () => import(/* webpackChunkName: "fhir-main" */ "@/components/ihris/ihris-array" ),
  //"fhir-reference": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-reference" ),
  //"fhir-string": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-string" ),
  //"fhir-text": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-text" ),
  //"fhir-date": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date" ),
  //"fhir-date-time": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date-time" ),
  //"fhir-boolean": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-boolean" ),
  //"fhir-choice": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-choice" )
//}

//var questionnaire
//var page

export default {
  name: "fhir-page",
  data: function() {
    return {
      //page: "",
      workflow: ""
    }
  },
      /*
  components: {
    FhirTemplate: function() {
      return new Promise(resolve => {
        fetch( "/config/questionnaire/"+questionnaire ).then(response => {
            response.json().then(data => {
              resolve( {
                data: function() { return { viewPage: page, isEdit: true } }, 
                components: comps, 
                template: data.template
              } )
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
      */
  created: function() {
    this.workflow = this.$route.params.workflow
  },
  beforeCreate: function() {
    this.workflow = this.$route.params.workflow
    //this.page = this.$route.params.page
  }
}

</script>
