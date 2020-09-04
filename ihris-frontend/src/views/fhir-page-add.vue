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
                links: data.data.links
              }
            },
            components: {
              "ihris-resource": () => import(/* webpackChunkName: "fhir-main" */ "@/components/ihris/ihris-resource" ),
              "ihris-codesystem": () => import(/* webpackChunkName: "fhir-main" */ "@/components/ihris/ihris-codesystem" ),
              "ihris-section": () => import(/* webpackChunkName: "fhir-main" */ "@/components/ihris/ihris-section" ),
              "ihris-secondary": () => import(/* webpackChunkName: "fhir-main" */ "@/components/ihris/ihris-secondary" ),
              "ihris-array": () => import(/* webpackChunkName: "fhir-main" */ "@/components/ihris/ihris-array" ),
              "fhir-extension": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-extension" ),
              "fhir-reference": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-reference" ),
              "fhir-string": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-string" ),
              "fhir-human-name": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-human-name" ),
              "fhir-code": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-code" ),
              "fhir-date": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date" ),
              "fhir-date-time": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-date-time" ),
              "fhir-period": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-period" ),
              "fhir-identifier": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-identifier" ),
              "fhir-contact-point": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-contact-point" ),
              "fhir-address": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-address" ),
              "fhir-codeable-concept": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-codeable-concept" ),
              "fhir-uri": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-uri" ),
              "fhir-boolean": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-boolean" ),
              "fhir-positive-int": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-positive-int" ),
              "fhir-coding": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-coding" ),
              "fhir-money": () => import(/* webpackChunkName: "fhir-main" */ "@/components/fhir/fhir-money" )
            },
            template: data.template
          } )
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
