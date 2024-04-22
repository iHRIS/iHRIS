<template>
  <v-container class="py-5">
    <v-card>
      <v-card-title class="primary darken-1 white--text font-weight-bold justify-center">
        <v-icon class="mr-2" color="white">mdi-cog-sync-outline</v-icon>
        {{ $t(`App.menu['Manage Report']`) }}

      </v-card-title>
      <v-card-text class="my-2">
        <template>
          <v-expansion-panels>
            <v-expansion-panel v-for="(item, index) in reportData" :key="index">
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    <h4>  {{ $t(`App.menu.${item.text}`) }} {{ $t(`App.hardcoded-texts.Report`) }}</h4>

                  </v-col>
                  <v-col
                      class="text--secondary"
                      cols="8"
                  >
                    <v-fade-transition leave-absolute>
                      <span v-if="open">{{ $t(`App.hardcoded-texts.Configure`) }} {{ $t(`App.menu.${item.text}`) }} </span>
                      <v-row
                          v-else
                          no-gutters
                          style="width: 100%"
                      >
                        <v-col cols="6">
                          <h5>{{ $t(`App.hardcoded-texts['Last Began Indexing Time']`) }}:
                            {{ item.last_began_indexing_time }}</h5>
                        </v-col>
                        <v-col cols="6">
                          <h5>{{ $t(`App.hardcoded-texts['Last Ended Indexing Time']`) }}:
                            {{ item.last_ended_indexing_time }}</h5>
                        </v-col>
                      </v-row>
                    </v-fade-transition>
                  </v-col>
                  <v-progress-linear
                      v-if="cachingIndex&&item.reportFhirID === cachingIndexName"
                      buffer-value="0"
                      color="red-lighten-2"
                      stream
                  ></v-progress-linear>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row
                    justify="space-between"
                    no-gutters
                >
                  <v-col cols="5">
                    <v-simple-table light>
                      <tbody>
                      <tr>
                        <td class="body-2" style="text-align: left">{{ $t(`App.hardcoded-texts['Last Ended Indexing Time']`) }}:
                          <strong>{{ item.last_ended_indexing_time }}</strong></td>
                      </tr>
                      <tr>
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{ $t(`App.hardcoded-texts['Meta Data']`) }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-row
                                  no-gutters
                              >
                                <v-col
                                    class="py-2"
                                    cols="12"
                                >
                                  {{ $t(`App.hardcoded-texts['Index Name']`) }}: <strong>{{
                                    item.indexName
                                  }}</strong>
                                </v-col>
                                <v-col v-if="flattener==='fhir2es'" class="py-2"
                                       cols="12"> {{ $t(`App.hardcoded-texts['Last Began Indexing Time']`) }}:<strong>{{ item.last_began_indexing_time }}</strong></v-col>
                                <v-col class="py-2" cols="12">{{ $t(`App.hardcoded-texts['FHIR Report Version']`) }}:<strong>{{ item.reportFhirMeta.versionId }}</strong></v-col>
                                <v-col class="py-2" cols="12">{{ $t(`App.hardcoded-texts['FHIR Report Name']`) }}: <strong>{{ item.reportFhirID }}</strong>
                                </v-col>
                                <v-col class="py-2" cols="12"> {{ $t(`App.hardcoded-texts['FHIR Report Last Updated']`) }}:<strong>{{ item.reportFhirMeta.lastUpdated }}</strong></v-col>
                              </v-row>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>
                  <v-col cols="6">
                    <v-row
                        align="center"
                        class="mt-2"
                        justify="space-around"
                    >
                      <v-tooltip bottom color="secondary">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              :disabled="cachingIndex"
                              color="primary"
                              style="text-transform: none"
                              v-bind="attrs"
                              @click="cacheIndex(item.reportFhirID,item.last_ended_indexing_time)"
                              v-on="on"
                          >
                            <v-icon class="mr-2">mdi-reload</v-icon>
                             {{ $t(`App.hardcoded-texts.Reload`) }}
                          </v-btn>
                        </template>
                        <span>{{ $t(`App.hardcoded-texts.['This will cache the report from the last time it was cached.']`) }}</span>
                      </v-tooltip>

                      <v-tooltip bottom color="secondary">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                              :disabled="cachingIndex"
                              color="secondary"
                              style="text-transform: none"
                              v-bind="attrs"
                              @click="cacheIndex(item.reportFhirID)"
                              v-on="on"
                          >
                            <v-icon class="mr-2">mdi-reload</v-icon>
                           {{ $t(`App.hardcoded-texts['Fresh Load']`) }}
                          </v-btn>
                        </template>
                        <span>{{ $t(`App.hardcoded-texts['This will cache the report afresh']`) }}</span>
                      </v-tooltip>

                    </v-row>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "manage-report",
  data: () => ({
    reportData: [],
    cachingIndex: false,
    cachingIndexName: "",
    flattener: "fhir2es"
  }),
  created() {
    fetch("/config/getParameters").then((response) => {
      response.json().then(({fhir, site}) => {
            if (fhir?.flattener) {
              this.flattener = fhir.flattener
            }
            if (this.flattener === "fhir2es") {
              let url = `/es/syncdata/_search`
              let syncData = undefined
              fetch(url).then((response) => {
                response.json().then((data) => {
                  syncData = data;
                  if (site?.nav?.menu?.reports?.menu) {
                    let reportMenu = site.nav.menu.reports.menu
                    let menuName = Object.keys(reportMenu)
                    for (const key of menuName) {
                      let reportDetails = reportMenu[key]
                      let url = `/fhir/Basic/${reportMenu[key].url.split("/").pop()}`
                      fetch(url).then((response) => {
                        response.json().then((data) => {
                          reportDetails.reportFhirID = data.id
                          reportDetails.reportFhirMeta = data.meta
                          let indexName = data?.extension?.find(x => x.url === "http://ihris.org/fhir/StructureDefinition/iHRISReportDetails")?.extension.find(y => y.url === "name")?.valueString
                          reportDetails["indexName"] = indexName
                          if (syncData) {
                            let data = syncData.hits.hits.find(x => x._id === indexName)
                            if (data) {
                              reportDetails["last_began_indexing_time"] = data["_source"].lastBeganIndexingTime
                              reportDetails["last_ended_indexing_time"] = data["_source"].lastEndedIndexingTime
                            }
                          }
                          this.reportData.push(reportDetails)
                        })
                      })
                    }
                  }
                })
              })
            } else {
              let url = '/fhir2sql/reportData/fhir2sqlsyncdata'
              let fhir2sqlsyncdata = undefined
              fetch(url, {
                method: "POST", headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => {
                response.json().then((response) => {
                  fhir2sqlsyncdata = response
                  if (site?.nav?.menu?.reports?.menu) {
                    let reportMenu = site.nav.menu.reports.menu
                    let menuName = Object.keys(reportMenu)
                    for (const key of menuName) {
                      let reportDetails = reportMenu[key]
                      let url = `/fhir/Basic/${reportMenu[key].url.split("/").pop()}`
                      fetch(url).then((response) => {
                        response.json().then((data) => {
                          let indexName = data?.extension?.find(x => x.url === "http://ihris.org/fhir/StructureDefinition/iHRISReportDetails")?.extension.find(y => y.url === "name")?.valueString
                          reportDetails["indexName"] = indexName
                          reportDetails.reportFhirID = data.id
                          reportDetails.reportFhirMeta = data.meta
                          if (fhir2sqlsyncdata) {
                            let reportInfo = fhir2sqlsyncdata.find(x => x.id === indexName)
                            if (reportInfo) {
                              reportDetails["last_began_indexing_time"] = reportInfo["last_began_indexing_time"]
                              reportDetails["last_ended_indexing_time"] = reportInfo["last_ended_indexing_time"]
                            }
                          }
                          this.reportData.push(reportDetails)
                        })
                      })
                    }
                  }
                })
              })

            }
          }
      )
    })
  },
  methods:
      {
        cacheIndex(indexName, cacheTime) {
          this.cachingIndex = true
          this.cachingIndexName = indexName
          let url = `/es/cache/${indexName}`
          if (cacheTime) {
            url = `/es/cache/${indexName}/${cacheTime}`
          }
          fetch(url).then((response) => {
            if (response.status === 200) {
              this.cachingIndex = false
              this.cachingIndexName = ""
            }
          }).catch(() => {
            this.cachingIndex = false
            this.cachingIndexName = ""
          })
        }
      }
}
</script>
<style scoped>

</style>
