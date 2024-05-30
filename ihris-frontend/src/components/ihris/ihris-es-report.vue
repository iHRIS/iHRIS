<template>
  <v-container class="py-5">
    <v-card class="py-4 px-2">
      <v-card-title class="ma-4">
        <v-layout row wrap>
          <v-icon class="mr-2" color="#0d3552">mdi-table-large</v-icon>
          <h4 v-if="!hideLabel" class="font-weight-bold" style="color: #0d3552">
            {{ $t(`App.reports.${label}`) }}
          </h4>
          <v-row align="center" class="pr-4" justify="end">
            <v-btn
              v-if="!hideReportCustomization"
              class="mr-2"
              color="primary"
              small
              @click="dialog = true"
            >
              <v-icon left>mdi-chart-box-plus-outline</v-icon>
              {{ $t("App.hardcoded-texts.Customize Report") }}
            </v-btn>
            <v-btn v-if="!hideExport" small color="info" @click="reportExport('csv')">
              <v-progress-circular
                v-if="downloading"
                color="amber"
                indeterminate
              ></v-progress-circular>
              <v-icon v-else left>mdi-microsoft-excel</v-icon>
              {{ $t("App.hardcoded-texts.Export") }}
            </v-btn>
          </v-row>
        </v-layout>
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-expansion-panels class="elevation-0" hover>
        <v-expansion-panel>
          <v-expansion-panel-header color="blue-grey darken-2">
            <h3 class="font-weight-bold subtitle-2 white--text">
              <v-icon class="mr-2" color="white">mdi-filter-variant</v-icon>
              {{ $t(`App.hardcoded-texts.Filters`) }}
            </h3>
            <template v-slot:actions>
              <v-icon color="white"> $expand </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-title v-if="!hideLabel" class="elevation-0">
              <slot></slot>
            </v-card-title>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-subtitle v-if="error_message" class="white--text error"
        >{{ error_message }}
      </v-card-subtitle>
      <v-data-table
        v-model="selected"
        :footer-props="{ 'items-per-page-options': itemsPerPage }"
        :headers="headers"
        :items="results"
        :loading="loading"
        :options.sync="options"
        :server-items-length="total"
        :show-select="reportData.displayCheckbox && !hideCheckboxes"
        class="elevation-1 mt-3"
        item-key="id"
        style="cursor: pointer"
        @click:row="rowClicked"
        dense
      ></v-data-table>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="80%" persistent>
        <v-card class="px-6 py-4">
          <v-card-title class="justify-center">
            <span class="text-h6"
              ><v-icon class="mr-2" color="primary" large
                >mdi-table-check</v-icon
              >{{ $t("App.hardcoded-texts.selectFeild") }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="item in allHeaders"
                  :key="item.value"
                  cols="12"
                  md="4"
                  sm="4"
                >
                  <!-- {{item}} -->
                  <v-checkbox
                    v-model="selectedColumns"
                    :label="item.text"
                    :value="item.value"
                    color="primary"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="warning"
              @click="
                () => {
                  dialog = false;
                }
              "
            >
              <v-icon left>mdi-close-box-multiple</v-icon>
              {{ $t("App.hardcoded-texts.Close") }}
            </v-btn>
            <v-btn color="warning" @click="reset">
              <v-icon left>mdi-close-box-multiple</v-icon>
              {{ $t("App.hardcoded-texts.Reset") }}
            </v-btn>
            <v-btn color="primary" @click="onFilter">
              <v-icon left>mdi-content-save-check-outline</v-icon>
              {{ $t("App.hardcoded-texts.Apply") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from "@/main";
import axios from "axios";

export default {
  name: "ihris-report",
  props: [
    "reportData",
    "label",
    "terms",
    "termsConditions",
    "dataURL",
    "page",
    "hideCheckboxes",
    "hideLabel",
    "hideExport",
    "hideReportCustomization",
    "disableOpenResourcePage"
  ],
  data: function () {
    return {
      debug: "",
      downloading: false,
      headers: [],
      allHeaders: [],
      results: [],
      selectedColumns: [],
      options: { itemsPerPage: 10 },
      loading: false,
      total: 0,
      prevPage: -1,
      link: [],
      selected: [],
      error_message: null,
      selectAll: false,
      //custom report
      dialog: false,
      resourcePage: "",
    };
  },
  watch: {
    selected() {
      if (this.selected.length !== this.results.length && this.selectAll) {
        this.selectAll = false;
      }
      eventBus.$emit(
        "ihris-report-selections",
        this.selected,
        this.reportData,
        this.terms,
        this.termsConditions,
        this.selectAll
      );
    },
    terms: {
      handler() {
        this.selectAll = false;
        this.getTotalRecords();
        this.getData(true);
        eventBus.$emit("changedTerms", this.terms);
      },
      deep: true,
    },
    termsConditions: {
      handler() {
        if (Object.keys(this.terms).length > 0) {
          this.selectAll = false;
          this.getTotalRecords();
          this.getData(true);
        }
      },
      deep: true,
    },
    options: {
      handler() {
        this.getTotalRecords();
        this.getData();
      },
      deep: true,
    },
  },
  computed: {
    itemsPerPage() {
      let items = [5, 10, 20, 50];
      return items;
    },
  },
  created: function () {
    this.getResourcePage();
    //sorting columns
    if (this.reportData && this.reportData.fieldsDetails) {
      this.reportData.fieldsDetails.sort((a, b) => {
        if (
          (a[2] != null && b[2] == null) ||
          (a[2] != null && b[2] != null && a[2] < b[2])
        ) {
          return -1;
        } else if (
          (b[2] != null && a[2] == null) ||
          (a[2] != null && b[2] != null && a[2] > b[2])
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    for (let field of this.reportData.fieldsDetails) {
      this.headers.push({ text: this.$t(`App.reports.${field[0]}`), value: field[1] });
      this.allHeaders.push({ text: this.$t(`App.reports.${field[0]}`), value: field[1] });
    }
    eventBus.$on("reload-report", () => {
      this.getTotalRecords();
      this.getData();
    });
    eventBus.$on("mhero-select-all", () => {
      this.selected = [];
      this.selected = this.results;
      this.selectAll = true;
    });
  },
  methods: {
    rowClicked(row) {
      this.$emit('rowSelected', row)
      if(this.resourcePage && !this.disableOpenResourcePage) {
        this.$router.push({
          name: "resource_view",
          params: {page: this.resourcePage, id: row[this.resourcePageId]},
          query: this.queryParams
        });
      }
    },
    reset() {
      this.headers = this.allHeaders;
      this.dialog = false;
    },
    onFilter() {
      this.dialog = false;
      this.headers = this.allHeaders.filter((item) => {
        if (this.selectedColumns.includes(item.value)) {
          return item;
        }
      });
    },
    clickIt: function (record) {
      this.$router.push({
        name: "resource_view",
        params: { page: this.page, id: record.id },
      });
    },
    buildTerms() {
      let filter = this.termsConditions
      let body = {};
      body = {
        query: {
          bool: {
            must: [],
            must_not: [],
            filter: [],
          },
        },
      };
      let sTermDet;
      if (Object.keys(this.terms).length > 0) {
        for (let sTerm in this.terms) {
          if (!this.terms[sTerm] || this.terms[sTerm].length === 0) {
            continue;
          }
          sTermDet = this.reportData.filters.find((filter) => {
            return filter.field === sTerm;
          });

          if (!sTermDet.isDropDown && !Array.isArray(this.terms[sTerm])) {
            this.terms[sTerm] = this.terms[sTerm].replace(/\s+/g, " ").trim();
          }
          let esFieldName;
          if (sTermDet.isDropDown && this.reportData.mappings.mappings.properties[sTerm].fields && this.reportData.mappings.mappings.properties[sTerm].fields.keyword) {
            esFieldName = sTerm + ".keyword";
          } else {
            esFieldName = sTerm;
          }
          if (Array.isArray(this.terms[sTerm])) {
            let terms = {
              terms: {},
            };
            terms.terms[esFieldName] = [];
            for (let value of this.terms[sTerm]) {
              terms.terms[esFieldName].push(value);
            }
            if (this.termsConditions[sTerm] === "exclude") {
              body.query.bool.must_not.push(terms);
            } else {
              body.query.bool.must.push(terms);
            }
          } else {
            if (!sTermDet.isDropDown) {
              let termArr = this.terms[sTerm].split(" ");
              for (let tm of termArr) {
                let query = {};
                if (
                  this.reportData.mappings.mappings.properties[esFieldName] &&
                  this.reportData.mappings.mappings.properties[esFieldName].fields &&
                  this.reportData.mappings.mappings.properties[esFieldName].fields.keyword
                ) {
                  query.wildcard = {};
                  query.wildcard[esFieldName + '.keyword'] = {
                    value: "*" + tm + "*",
                    case_insensitive: true
                  };
                } else {
                  query.term = {};
                  query.term[esFieldName] = tm;
                }
                if (this.termsConditions[sTerm] === "exclude") {
                  body.query.bool.must_not.push(query);
                } else {
                  body.query.bool.must.push(query);
                }
              }
            } else {
              let terms = {
                terms: {},
              };
              terms.terms[esFieldName] = [this.terms[sTerm]];
              if (this.termsConditions[sTerm] === "exclude") {
                body.query.bool.must_not.push(terms);
              } else {
                body.query.bool.must.push(terms);
              }
            }
          }
        }
      }

      if (sTermDet && sTermDet.field) {
        if (sTermDet.field == "startDate" || sTermDet.field == "endDate") {
          let defEndDate = new Date().toISOString().slice(0, 10);
          let defStartDate;
          if (sTermDet.field == "startDate") {
            defStartDate = this.terms.startDate;
          }
          if (sTermDet.field == "endDate") {
            defEndDate = this.terms.endDate;
          }

          body = {
            query: {
              bool: {
                filter: [
                  {
                    range: {
                      startDate: {
                        gte: defStartDate,
                      },
                    },
                  },
                  {
                    range: {
                      endDate: {
                        lte: defEndDate,
                      },
                    },
                  },
                ],
              },
            },
          };
        }
      }

      if (sTermDet && (sTermDet?.dataType === "date" || sTermDet?.dataType === "long") && sTermDet.field) {
        let date = this.terms
        let filterDate = []
        let c = sTermDet.field
        if (filter[c] && filter[c] !== 'include') {
          if (filter[c] === 'range') {
            let sortedDate = date[c].sort()
            let rangeOne = sortedDate[0]
            let rangeTwo = sortedDate[1]
            let filterWith = {
              "gte": rangeOne,
              "lte": rangeTwo
            }
            let a = {}
            let b = {}
            b[c] = filterWith
            a['range'] = b
            filterDate.push(a)
            body.query.bool.must = body.query.bool.must.filter(p => {
              if (p.terms) {
                return !Object.keys(p.terms).includes(c)
              }
              return true
            })
          } else {
            let filterWith = {}
            let a = {}
            let b = {}
            filterWith[filter[c]] = date[c];
            b[c] = filterWith
            a['range'] = b
            filterDate.push(a)
            body.query.bool.must = body.query.bool.must.filter(p => {
              if (p.term) {
                return !Object.keys(p.term).includes(c)
              }
              return true
            })
          }
        }
        body.query.bool.filter = filterDate
      }
      eventBus.$emit("builtESTerms", body);
      return body;
    },
    getTotalRecords() {
      let url = `/es/${this.reportData.indexName}/_count`;

      let body = this.buildTerms();

      body.reportOptions = {
        locationBasedConstraint: this.reportData.locationBasedConstraint,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) => {
        response.json().then((data) => {
          this.total = data.count;
          eventBus.$emit("report-total-records", this.total);
        });
      });
    },
    getData(restart) {
      this.loading = true;
      this.error_message = null;
      let url = "";
      if (restart) this.options.page = 1;
      let count = this.options.itemsPerPage || 10;
      if (count === -1) {
        count = this.total;
      }
      let from =
        this.options.page * this.options.itemsPerPage -
        this.options.itemsPerPage;
      url = `/es/${this.reportData.indexName}/_search?size=${count}&from=${from}`;
      this.prevPage = this.options.page;
      let body = this.buildTerms();

      body.reportOptions = {
        locationBasedConstraint: true,
      };
      let sorting = [];
      for (let index in this.options.sortBy) {
        let sortCol = this.options.sortBy[index];
        let sort = {};
        let sortColESName;
        if (
          this.reportData.mappings.mappings.properties[sortCol] &&
          this.reportData.mappings.mappings.properties[sortCol].fields &&
          this.reportData.mappings.mappings.properties[sortCol].fields.keyword
        ) {
          sortColESName = sortCol + ".keyword";
        } else {
          sortColESName = sortCol;
        }
        if (this.options.sortDesc[index]) {
          sort[sortColESName] = "desc";
        } else {
          sort[sortColESName] = "asc";
        }
        sorting.push(sort);
      }
      body.sort = sorting;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          response
            .json()
            .then((data) => {
              this.results = [];
              if (data.hits.total.value > 0) {
                this.link = data.link;
                for (let hit of data.hits.hits) {
                  let result = {};
                  for (let field in hit["_source"]) {
                    result[field] = hit["_source"][field];
                  }
                  result.id = hit["_id"];
                  this.results.push(result);
                }
              }
              if (this.selectAll) {
                this.selected = this.results;
              }
              //  else {
              //   this.selected = []
              // }
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.error_message = "Unable to load results.";
              console.log(err);
            });
        })
        .catch((err) => {
          this.loading = false;
          this.error_message = "Unable to load results.";
          console.log(err);
        });
    },
    reportExport(format) {
      this.downloading = true;
      let url = `/es/export/${format}/${this.reportData.indexName}`;
      let body = {
        query: this.buildTerms(),
        headers: this.headers,
        label: this.$t(`App.reports.${this.label}`),
        selected: this.selected,
      };
      axios({
        url: url,
        method: "POST",
        responseType: "blob",
        data: body,
      }).then((response) => {
        this.downloading = false;
        let blob = new Blob([response.data], { type: "text/csv" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = this.$t(`App.reports.${this.label}`) + '.' + format;
        link.click();
      });
    },
    getResourcePage() {
      let url = `/fhir/Basic/${this.page}?_pretty=true`;
      fetch(url).then((response) => {
        response.json().then((data) => {
          let extension = data.extension.find(
            (x) =>
                x.url === "http://ihris.org/fhir/StructureDefinition/iHRISReportDetails"
          );
          let resource = extension.extension.find(
            (x) => x.url === "resourcePage"
          )?.valueString;
          let resourcePageId = extension.extension.find(
            (x) => x.url === "resourcePageID"
          )?.valueString;
          this.resourcePage = resource;
          this.resourcePageId = resourcePageId;
          if(!this.resourcePageId) {
            this.resourcePageId = "id"
          }

          let params = extension.extension.filter(x => x.url === "http://ihris.org/fhir/StructureDefinition/iHRISReportParameters")
          params.map(x => {
            let name;
            let param;
            x.extension.map(y => {
              if (y.url === "esFieldName") {
                name = y.valueString;
              }
              if (y.url === "parameter") {
                param = y.valueString;
              }
            })
            this.queryParams[name] = param;
          })
        });
      });
    },
  },
};
</script>
<style>
tbody tr:nth-of-type(even) {
  background-color: #e0f2f1;
}
</style>
