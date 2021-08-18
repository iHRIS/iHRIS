<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title v-if="!hideLabel">
        <v-layout row wrap>
          <v-flex xs10>
            {{ label }}
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs2>
            <v-btn
              color="info"
              @click="reportExport('csv')"
            >
              <v-progress-circular
                indeterminate
                color="amber"
                v-if="downloading"
              ></v-progress-circular>
              <v-icon left v-else>mdi-microsoft-excel</v-icon>
              Export
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-title v-if="!hideLabel">
        <slot></slot>
      </v-card-title>
      <v-card-subtitle
        v-if="error_message"
        class="white--text error"
      >{{ error_message }}</v-card-subtitle>
      <v-data-table
        style="cursor: pointer"
        :headers="headers"
        :items="results"
        :options.sync="options"
        :server-items-length="total"
        :footer-props="{ 'items-per-page-options': itemsPerPage }"
        :loading="loading"
        class="elevation-1"
        item-key="id"
        :show-select="reportData.displayCheckbox && !hideCheckboxes"
        v-model="selected"
      ></v-data-table>
    </v-card>

  </v-container>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "ihris-report",
  props: ["reportData", "label", "terms", "termsConditions", "dataURL", "page", "hideCheckboxes", "hideLabel"],
  data: function() {
    return {
      debug: "",
      downloading: false,
      headers: [],
      results: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      prevPage: -1,
      link: [],
      selected: [],
      error_message: null,
      selectAll: false
    };
  },
  watch: {
    selected() {
      if(this.selected.length !== this.results.length && this.selectAll) {
        this.selectAll = false
      }
      eventBus.$emit("ihris-report-selections", this.selected, this.reportData, this.terms, this.termsConditions, this.selectAll);
    },
    terms: {
      handler() {
        this.selectAll = false
        this.getTotalRecords();
        this.getData(true);
      },
      deep: true
    },
    termsConditions: {
      handler() {
        if(Object.keys(this.terms).length > 0) {
          this.selectAll = false
          this.getTotalRecords();
          this.getData(true);
        }
      },
      deep: true
    },
    options: {
      handler() {
        this.getTotalRecords();
        this.getData();
      },
      deep: true
    }
  },
  computed: {
    itemsPerPage() {
      let items = [5,10,20,50]
      return items
    }
  },
  created: function() {
    for (let field of this.reportData.fieldsDetails) {
      this.headers.push({ text: field[0], value: field[1] });
    }
    eventBus.$on("reload-report", () => {
      this.getTotalRecords();
      this.getData()
    })
    eventBus.$on("mhero-select-all", () => {
      this.selected = []
      this.selected = this.results
      this.selectAll = true
    })
  },
  methods: {
    clickIt: function(record) {
      this.$router.push({
        name: "resource_view",
        params: { page: this.page, id: record.id }
      });
    },
    buildTerms() {
      let body = {
        query: {
          bool: {
            must: [],
            must_not: []
          }
        }
      }
      if(Object.keys(this.terms).length > 0) {
        for(let sTerm in this.terms) {
          if(!this.terms[sTerm] || this.terms[sTerm].length === 0) {
            continue;
          }
          let sTermDet = this.reportData.filters.find((filter) => {
            return filter.field === sTerm
          })
          if(!sTermDet.isDropDown) {
            this.terms[sTerm] = this.terms[sTerm].replace(/\s+/g, ' ').trim()
          }
          let esFieldName
          if(sTermDet.isDropDown) {
            esFieldName = sTerm + '.keyword'
          } else {
            esFieldName = sTerm
          }
          if(Array.isArray(this.terms[sTerm])) {
            let terms = {
              terms: {}
            }
            terms.terms[esFieldName] = []
            for(let value of this.terms[sTerm]) {
              terms.terms[esFieldName].push(value)
            }
            if(this.termsConditions[sTerm] === 'exclude') {
              body.query.bool.must_not.push(terms)
            } else {
              body.query.bool.must.push(terms)
            }
          } else {
            if(!sTermDet.isDropDown) {
              let termArr = this.terms[sTerm].split(' ')
              for(let tm of termArr) {
                let query = {}
                if(this.reportData.mappings.mappings.properties[esFieldName] && this.reportData.mappings.mappings.properties[esFieldName].type === 'text') {
                  query.wildcard = {}
                  query.wildcard[esFieldName] = tm + '*'
                } else {
                  query.term = {}
                  query.term[esFieldName] = tm
                }
                if(this.termsConditions[sTerm] === 'exclude') {
                  body.query.bool.must_not.push(query)
                } else {
                  body.query.bool.must.push(query)
                }
              }
            } else {
              let terms = {
                terms: {}
              }
              terms.terms[esFieldName] = [this.terms[sTerm]]
              if(this.termsConditions[sTerm] === 'exclude') {
                body.query.bool.must_not.push(terms)
              } else {
                body.query.bool.must.push(terms)
              }
            }
          }
        }
      }
      eventBus.$emit('builtESTerms', body)
      return body
    },
    getTotalRecords() {
      let url = `/es/${this.reportData.indexName}/_count`
      let body = this.buildTerms()
      body.reportOptions = {
        locationBasedConstraint: this.reportData.locationBasedConstraint
      }
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then(response => {
          response
            .json()
            .then(data => {
              this.total = data.count
              eventBus.$emit("report-total-records", this.total)
            })
        })
    },
    getData(restart) {
      this.loading = true;
      this.error_message = null;
      let url = "";
      if (restart) this.options.page = 1;
      let count = this.options.itemsPerPage || 10;
      if(count === -1) {
        count = this.total
      }
      let from = (this.options.page * this.options.itemsPerPage) - this.options.itemsPerPage
      url = `/es/${this.reportData.indexName}/_search?size=${count}&from=${from}`
      this.prevPage = this.options.page;

      let body = this.buildTerms()
      body.reportOptions = {
        locationBasedConstraint: this.reportData.locationBasedConstraint
      }
      let sorting = []
      for(let index in this.options.sortBy) {
        let sortCol = this.options.sortBy[index]
        let sort = {}
        let sortColESName
        if(this.reportData.mappings.mappings.properties[sortCol] && this.reportData.mappings.mappings.properties[sortCol].type === 'text') {
          sortColESName = sortCol + '.keyword'
        } else {
          sortColESName = sortCol
        }
        if(this.options.sortDesc[index]) {
          sort[sortColESName] = 'desc'
        } else {
          sort[sortColESName] = 'asc'
        }
        sorting.push(sort)
      }
      body.sort = sorting
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }).then(response => {
          response
            .json()
            .then(data => {
              this.results = [];
              if (data.hits.total.value > 0) {
                this.link = data.link;
                for (let hit of data.hits.hits) {
                  let result = {}
                  for(let field in hit['_source']) {
                    result[field] = hit['_source'][field]
                  }
                  result.id = hit['_id']
                  this.results.push(result)
                }
              }
              if(this.selectAll) {
                this.selected = this.results
              }
              //  else {
              //   this.selected = []
              // }
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              this.error_message = "Unable to load results.";
              console.log(err);
            });
        })
        .catch(err => {
          this.loading = false;
          this.error_message = "Unable to load results.";
          console.log(err);
        });
    },
    reportExport(format) {
      this.downloading = true
      let url = `/es/export/${format}/${this.reportData.indexName}`
      let body = {
        query: this.buildTerms(),
        headers: this.headers,
        label: this.label
      }
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }).then((response) => {
        response
          .text()
          .then(exportFile => {
            this.downloading = false
            window.open(exportFile, "_self");
          })
      })
    }
  }
};
</script>
