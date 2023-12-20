<template>
  <ihris-template>
    Loading...
  </ihris-template>
</template>

<script>
// @ is an alias to /src

var questionnaire
var page
var pageId
import Vue from 'vue'

export default {
  name: "fhir-page",
  data: function() {
    return {
    }
  },
  created: function() {
    this.getTemplate()
  },
  methods: {
    getTemplate: function() {
      fetch( "/config/questionnaire/"+questionnaire +"/" + page ).then(response => {
        response.json().then(data => {
          if ( data.resourceType === "OperationOutcome" ) {
            Vue.component( 'ihris-template', {
              name: 'ihris-template',
              data: function() {
                return {
                  issues: data.issue
                }
              },
              components: {
                "ihris-outcome": () => import( "@/components/ihris/ihris-outcome" )
              },
              template: '<div><ihris-outcome :issues="issues"></ihris-outcome></div>'
            } )
          } else {
            Vue.component('ihris-template', {
              name: 'ihris-template',
              data: function() {
                return {
                  viewPage: page,
                  isEdit: true,
                  fhirId: pageId,
                  sectionMenu: data.data.sectionMenu,
                  hidden: data.data.hidden,
                  initials: data.data.initials,
                  constraints: data.data.constraints
                }
              },
              components: {
                "ihris-questionnaire": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-questionnaire" ),
                "ihris-questionnaire-section": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-questionnaire-section" ),
                "ihris-questionnaire-group": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-questionnaire-group" ),
                "ihris-display": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-display" ),
                "ihris-hidden": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/components/ihris/ihris-hidden" ),
                "ihris-array": () => import(/* webpackChunkName: "fhir-main" */ "@/components/ihris/ihris-array" ),
                "fhir-extension": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-extension" ),
                "fhir-codeable-concept": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-codeable-concept" ),
                "fhir-human-name": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-human-name" ),
                "fhir-contact-point": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-contact-point" ),
                "fhir-address": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-address" ),
                "fhir-backbone-element": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-backbone-element" ),
                "fhir-identifier": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-identifier" ),
                "fhir-reference": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-reference" ),
                "fhir-string": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-string" ),
                "fhir-text": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-text" ),
                "fhir-date": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date" ),
                "fhir-date-time": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date-time" ),
                "fhir-period": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-period" ),
                "fhir-boolean": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-boolean" ),
                "fhir-integer": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-integer" ),
                "fhir-choice": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-choice" ),
                "fhir-attachment": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-attachment" ),
                "fhir-decimal": () => import(/* webpackChunkName: "fhir-decimal" */ "@/components/fhir/fhir-decimal" )
              },
              template: data.template
            } )
          }
          this.$forceUpdate()
        }).catch(err => {
          console.log(err)
          Vue.component('ihris-template',{template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
          this.$forceUpdate()
        })
      }).catch(err => {
        console.log(err)
        Vue.component('ihris-template',{template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
        this.$forceUpdate()
      })
    }
  },
  beforeCreate: function() {
    questionnaire = this.$route.params.questionnaire
    page = this.$route.params.page
    pageId = this.$route.params.id
    Vue.component('ihris-template', { template: '<div>Loading...</div>' } )
  }
}

</script>
