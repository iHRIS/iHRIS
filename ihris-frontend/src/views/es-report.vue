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
  props: {
    report: {
      type: String,
      default: ""
    },
    terms: {
      type: Object,
      default: function() {
        return {};
      }
    },
    termsConditions: {
      type: Object,
      default: function() {
        return {};
      }
    },
    hideFilters: {
      type: Boolean,
      default: false
    },
    hideCheckboxes: {
      type: Boolean,
      default: false
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    hideExport: {
      type: Boolean,
      default: false
    },
    hideReportCustomization: {
      type: Boolean,
      default: false
    },
    disableOpenResourcePage: {
      type: Boolean,
      default: false
    }
  },
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
      fetch("/config/report/es/" + report)
        .then(response => {
          response
            .json()
            .then(data => {
              let terms = this.terms
              let termsConditions = this.termsConditions
              let hideFilters = this.hideFilters
              let hideCheckboxes = this.hideCheckboxes
              let hideLabel = this.hideLabel
              let hideExport = this.hideExport
              let hideReportCustomization = this.hideReportCustomization
              let disableOpenResourcePage = this.disableOpenResourcePage
              let rowSelected = (row) => {
                this.$emit('rowSelected', row)
              }
              Vue.component("ihris-template", {
                name: "ihris-template",
                data: function() {
                  return {
                    reportData: data.reportData,
                    dataURL: data.dataURL,
                    terms: terms,
                    termsConditions: termsConditions,
                    hideLabel,
                    hideFilters,
                    hideCheckboxes,
                    hideExport,
                    hideReportCustomization,
                    disableOpenResourcePage
                  };
                },
                components: {
                  "ihris-es-report": () =>
                    import(
                      /* webpackChunkName: "ihris-es-report" */ "@/components/ihris/ihris-es-report"
                    ),
                  "ihris-es-search-term": () =>
                    import(
                      /* webpackChunkName: "ihris-es-search-term" */ "@/components/ihris/ihris-es-search-term"
                    ),
                    "ihris-sql-report": () =>
                    import(
                      /* webpackChunkName: "ihris-es-report" */ "@/components/ihris/ihris-sql-report"
                    ),
                  "ihris-sql-search-term": () =>
                    import(
                      /* webpackChunkName: "ihris-es-search-term" */ "@/components/ihris/ihris-sql-search-term"
                    )
                },
                template: data.reportTemplate,
                methods: {
                  rowSelected(row) {
                    rowSelected(row)
                  },
                  searchData: function(expression, value, filterType) {
                    this.$set(this.terms, expression, value);
                    if((this.terms[expression] && typeof this.terms[expression] === 'object' && this.terms[expression].length > 0) || (typeof this.terms[expression] === 'string' && this.terms[expression] !== '')) {
                      this.$set(this.termsConditions, expression, filterType);
                    }
                  }
                }
              });
              this.$forceUpdate();
            })
            .catch(err => {
              console.log('error');
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
