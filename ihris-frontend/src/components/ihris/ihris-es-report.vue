<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        {{ label }}
        <v-spacer></v-spacer>
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
        :footer-props="{ 'items-per-page-options': [5,10,20,50] }"
        :loading="loading"
        class="elevation-1"
        item-key="id"
        :show-select="reportData.displayCheckbox"
        v-model="selected"
      ></v-data-table>
    </v-card>

  </v-container>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "ihris-report",
  props: ["profile", "reportData", "label", "terms", "dataURL", "page"],
  data: function() {
    return {
      debug: "",
      headers: [],
      results: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      prevPage: -1,
      link: [],
      selected: [],
      error_message: null,
    };
  },
  watch: {
    selected() {
      eventBus.$emit("ihris-report-selections", this.selected, this.reportData);
    },
    terms: {
      handler() {
        this.getData(true);
      },
      deep: true
    },
    options: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  created: function() {
    for (let field of this.reportData.fieldsDetails) {
      this.headers.push({ text: field[0], value: field[1] });
    }
    eventBus.$on("reload-report", () => {
      this.getData()
    })
  },
  mounted: function() {
    this.getTotalRecords();
    this.getData(true);
  },
  methods: {
    clickIt: function(record) {
      this.$router.push({
        name: "resource_view",
        params: { page: this.page, id: record.id }
      });
    },
    getTotalRecords() {
    let url = `/es/${this.reportData.indexName}/_count`
    fetch(url, {
        method: 'GET'
      }).then(response => {
        response
          .json()
          .then(data => {
            this.total = data.count
          })
      })
    },
    getData(restart) {
      this.loading = true;
      this.error_message = null;
      let url = "";
      if (restart) this.options.page = 1;
      let count = this.options.itemsPerPage || 10;
      let from = (this.options.page * this.options.itemsPerPage) - this.options.itemsPerPage
      url = `/es/${this.reportData.indexName}/_search?size=${count}&from=${from}`
      this.prevPage = this.options.page;

      let body = {
        query: {
          bool: {
            must: []
          }
        }
      }
      if(Object.keys(this.terms).length > 0) {
        for(let sTerm in this.terms) {
          let terms = {
            terms: {}
          }
          if(!this.terms[sTerm] || this.terms[sTerm].length === 0) {
            continue;
          }
          let sTermDet = this.reportData.filters.find((filter) => {
            return filter.field === sTerm
          })
          let esFieldName
          if(sTermDet.dataType === 'text') {
            esFieldName = sTerm + '.keyword'
          } else {
            esFieldName = sTerm
          }
          if(Array.isArray(this.terms[sTerm])) {
            terms.terms[esFieldName] = []
            for(let value of this.terms[sTerm]) {
              terms.terms[esFieldName].push(value)
            }
          } else {
            terms.terms[esFieldName] = [this.terms[sTerm]]
          }
          body.query.bool.must.push(terms)
        }
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
              // this.total = data.hits.total.value;
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
    }
  }
};
</script>
