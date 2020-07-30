<template>
  <ihris-template :key="$route.path">
    Loading...
  </ihris-template>
</template>

<script>
// @ is an alias to /src

var report;
import Vue from "vue";

export default {
  name: "fhir-report",
  props: ["report"],
  data: function() {
    return {};
  },
  created: function() {
    if (this.$route.params && this.$route.params.report) {
      report = this.$route.params.report;
    } else if (this.report) {
      report = this.report;
    }
    this.getTemplate();
  },
  methods: {
    getTemplate: function() {
      fetch("/config/report/" + report)
        .then(response => {
          response
            .json()
            .then(data => {
              Vue.component("ihris-template", {
                name: "ihris-template",
                data: function() {
                  return {
                    reportData: data.reportData,
                    dataURL: data.dataURL,
                    terms: {}
                  };
                },
                components: {
                  "ihris-report": () =>
                    import(
                      /* webpackChunkName: "fhir-search" */ "@/components/ihris/ihris-report"
                    ),
                  "ihris-search-term": () =>
                    import(
                      /* webpackChunkName: "fhir-search" */ "@/components/ihris/ihris-search-term"
                    )
                },
                template: data.reportTemplate,
                methods: {
                  searchData: function(expression, value) {
                    this.$set(this.terms, expression, value);
                  }
                }
              });
              this.$forceUpdate();
              console.log("updated template");
            })
            .catch(err => {
              console.log(err);
              Vue.component("ihris-template", {
                template:
                  "<div><h1>Error</h1><p>An error occurred trying to load this report</p>.</div>"
              });
              this.$forceUpdate();
            });
        })
        .catch(err => {
          console.log(err);
          Vue.component("ihris-template", {
            template:
              "<div><h1>Error</h1><p>An error occurred trying to load this report</p>.</div>"
          });
          this.$forceUpdate();
        });
    }
  },
  components: {},
  beforeCreate: function() {
    //Vue.component( 'ihris-template', this.getTemplate() )
    Vue.component("ihris-template", { template: "<div>Loading...</div>" });
  }
};
</script>
