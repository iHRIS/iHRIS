<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title>
        {{ label }} List
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
        @click:row="clickIt"
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
      error_message: null
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
    for (let data of this.reportData.fieldsDetails) {
      for (let field of data.fields) {
        this.headers.push({ text: field[0], value: field[1] });
      }
    }
  },
  mounted: function() {
    this.getData(true);
  },
  methods: {
    clickIt: function(record) {
      this.$router.push({
        name: "resource_view",
        params: { page: this.page, id: record.id }
      });
    },
    getData(restart) {
      this.loading = true;
      this.error_message = null;
      let url = "";
      if (restart) this.options.page = 1;
      if (this.options.page > 1) {
        if (this.options.page === this.prevPage - 1) {
          url = this.link.find(link => link.relation === "previous").url;
        } else if (this.options.page === this.prevPage + 1) {
          url = this.link.find(link => link.relation === "next").url;
        }
        url = url.substring(url.indexOf("/fhir/"));
      }
      if (url === "") {
        let count = this.options.itemsPerPage || 10;
        let sort = "";
        for (let idx in this.options.sortBy) {
          if (sort) {
            sort += ",";
          }
          if (this.options.sortDesc[idx]) {
            sort += "-";
          }
          sort += this.options.sortBy[idx];
        }
        url = "/fhir/" + this.dataURL + "_count=" + count + "&_total=accurate";
        let sTerms = Object.keys(this.terms);
        for (let term of sTerms) {
          url += "&" + term + "=" + this.terms[term];
        }
        this.debug = url;
      }
      this.prevPage = this.options.page;
      fetch(url)
        .then(response => {
          response
            .json()
            .then(data => {
              this.results = [];
              if (data.total > 0) {
                this.link = data.link;
                for (let entry of data.entry) {
                  let resultIndexes = [];
                  if (
                    entry.resource.resourceType !==
                    this.reportData.primaryResource
                  ) {
                    let resConn = this.reportData.resourcesConnections.find(
                      conn => {
                        return (
                          conn.resourceType === entry.resource.resourceType
                        );
                      }
                    );
                    let linkElementVal = this.$fhirpath.evaluate(
                      entry.resource,
                      resConn.linkElement.replace(
                        resConn.resourceType + ".",
                        ""
                      )
                    );

                    // ensure values starts with resource types i.e 'Location/123
                    if (Array.isArray(linkElementVal)) {
                      for (let valInd in linkElementVal) {
                        if (linkElementVal[valInd].split("/").length !== 2) {
                          linkElementVal[valInd] =
                            resConn.resourceType + "/" + linkElementVal[valInd];
                        }
                      }
                    } else if (
                      linkElementVal.indexOf(resConn.resourceType + "/") === -1
                    ) {
                      linkElementVal =
                        resConn.resourceType + "/" + linkElementVal;
                    }
                    for (let resIndex in this.results) {
                      let linkToVal = this.results[resIndex][resConn.linkTo];
                      if (
                        Array.isArray(linkToVal) &&
                        Array.isArray(linkElementVal)
                      ) {
                        let found = linkToVal.some(
                          r => linkElementVal.indexOf(r) >= 0
                        );
                        if (found) {
                          resultIndexes.push(resIndex);
                        }
                      } else if (
                        Array.isArray(linkToVal) &&
                        linkToVal.indexOf(linkElementVal) !== -1
                      ) {
                        resultIndexes.push(resIndex);
                      } else if (
                        Array.isArray(linkElementVal) &&
                        linkElementVal.indexOf(linkToVal) !== -1
                      ) {
                        resultIndexes.push(resIndex);
                      } else if (linkToVal === linkElementVal) {
                        resultIndexes.push(resIndex);
                      }
                    }
                  } else {
                    let totalRes = this.results.push({
                      id: entry.resource.id
                    });
                    resultIndexes.push(totalRes - 1);
                  }
                  let fieldsDetails = this.reportData.fieldsDetails.find(
                    det => {
                      return det.resourceType === entry.resource.resourceType;
                    }
                  );
                  for (let field of fieldsDetails.fields) {
                    for (let resultIndex of resultIndexes) {
                      this.results[resultIndex][
                        field[1]
                      ] = this.$fhirpath.evaluate(entry.resource, field[1]);
                    }
                  }
                  if (
                    fieldsDetails.hiddenFields &&
                    Array.isArray(fieldsDetails.hiddenFields)
                  ) {
                    for (let field of fieldsDetails.hiddenFields) {
                      let fieldPath = field[1].split(".");
                      let pathValue = this.$fhirpath.evaluate(
                        entry.resource,
                        field[1]
                      );
                      if (fieldPath[fieldPath.length - 1] === "id") {
                        pathValue = fieldPath[0] + "/" + pathValue;
                      }
                      for (let resultIndex of resultIndexes) {
                        this.results[resultIndex][field[1]] = pathValue;
                      }
                    }
                  }
                }
              }
              this.total = data.total;
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
