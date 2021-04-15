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
  name: "fhir-page-add",
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
          if ( data.resourceType === "OperationOutcome" ) {
            Vue.component( 'ihris-template', {
              name: 'ihris-template',
              data: function() {
                return {
                  issues: data.issue
                }
              },
              components: {
                "ihris-outcome": () => import(/* webpackChunkName: "fhir-outcome" */ "@/components/ihris/ihris-outcome" )
              },
              template: '<div><ihris-outcome :issues="issues"></ihris-outcome></div>'
            } )
          } else {
            Vue.component('ihris-template', {
              name: 'ihris-template',
              data: function() {
                return {
                  isEdit: true,
                  fhirId: undefined,
                  sectionMenu: data.data.sectionMenu,
                  subFields: data.data.subFields,
                  columns: data.data.columns,
                  actions: data.data.actions,
                  links: data.data.links,
                  constraints: data.data.constraints
                }
              },
              components: {
                "ihris-resource": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/ihris/ihris-resource" ),
                "ihris-codesystem": () => import(/* webpackChunkName: "fhir-codesystem" */ "@/components/ihris/ihris-codesystem" ),
                "ihris-section": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/ihris/ihris-section" ),
                "ihris-secondary": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/ihris/ihris-secondary" ),
                "ihris-array": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/ihris/ihris-array" ),
                "fhir-extension": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-extension" ),
                "fhir-reference": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-reference" ),
                "fhir-backbone-element": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-backbone-element" ),
                "fhir-string": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-string" ),
                "fhir-attachment": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-attachment" ),
                "fhir-human-name": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-human-name" ),
                "fhir-code": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-code" ),
                "fhir-date": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-date" ),
                "fhir-date-time": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-date-time" ),
                "fhir-period": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-period" ),
                "fhir-identifier": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-identifier" ),
                "fhir-contact-point": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-contact-point" ),
                "fhir-address": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-address" ),
                "fhir-codeable-concept": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-codeable-concept" ),
                "fhir-uri": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-uri" ),
                "fhir-boolean": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-boolean" ),
                "fhir-positive-int": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-positive-int" ),
                "fhir-unsigned-int": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-unsigned-int" ),
                "fhir-integer": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-integer" ),
                "fhir-coding": () => import(/* webpackChunkName: "fhir-primary" */ "@/components/fhir/fhir-coding" ),
                "fhir-money": () => import(/* webpackChunkName: "fhir-secondary" */ "@/components/fhir/fhir-money" ),
                "fhir-decimal": () => import(/* webpackChunkName: "fhir-decimal" */ "@/components/fhir/fhir-decimal" )
              },
              template: data.template
            } )
          }
          this.$forceUpdate()
        }).catch(err => {
          console.log(err)
          Vue.component('ihris-template', {template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
          this.$forceUpdate()
        })
      }).catch(err => {
        console.log(err)
        Vue.component('ihris-template', {template: '<div><h1>Error</h1><p>An error occurred trying to load this page</p>.</div>'})
        this.$forceUpdate()
      })
    }
  },
  components: {
  },
  beforeCreate: function() {
    page = this.$route.params.page
    Vue.component('ihris-template', { template: '<div>Loading...</div>' } )
  }
}

</script>
