<template>
  <v-container class="mt-4">
    <v-card elevation="1">
      <v-card-title class="primary darken-1 white--text font-weight-bold justify-center">
        <v-icon class="mr-2" color="white">mdi-database-export-outline</v-icon>
        {{ $t('App.hardcoded-texts.Audit Logs') }}
      </v-card-title>
      <v-card-title class="pa-8">
        <v-layout row wrap>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="id"
                  :label="$t(`App.hardcoded-texts.ID`)"
                  dense
                  outlined
              />
            </v-col>
            <v-col>
              <v-autocomplete
                  v-model="actionSubType"
                  :items="auditEventSubType"
                  :label="$t(`App.hardcoded-texts.Action Type`)"
                  clearable
                  dense
                  item-text="display"
                  item-value="code"
                  multiple
                  outlined
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field
                  v-model="userEmail"
                  :label="$t(`App.hardcoded-texts.User Email`)"
                  dense
                  outlined
              />
            </v-col>
            <v-col>
              <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  max-width="290px"
                  min-width="290px"
                  offset-y
                  transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="startDate"
                      :label="$t(`App.hardcoded-texts.Start From`)"
                      dense
                      outlined
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="startDate"
                    :max="maxDate"
                    no-title
                    @input="startDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  max-width="290px"
                  min-width="290px"
                  offset-y
                  transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="dateTo"
                      :label="$t(`App.hardcoded-texts.To`)"
                      dense
                      outlined
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="dateTo"
                    :max="maxDate"
                    no-title
                    @input="endDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-autocomplete
                  v-model="operationOutcome"
                  :items="auditEventOutcome"
                  :label="$t(`App.hardcoded-texts.Operation Outcome`)"
                  clearable
                  dense
                  item-text="display"
                  item-value="code"
                  multiple
                  outlined
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-layout>
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-card-subtitle v-if="error_message" class="white--text error"
      >{{ error_message }}
      </v-card-subtitle>
      <v-card-text>
        <v-card-text>
          <v-data-table
              :footer-props="{ 'items-per-page-options': itemsPerPage }"
              :headers="auditLogHeader"
              :items="auditData"
              :loading="loading"
              :options.sync="options"
              :server-items-length="total"
              class="elevation-1 mt-3"
              item-key="id"
              style="cursor: pointer"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn v-if="item.resource"
                     class="ma-1"
                     color="primary"
                     outlined x-small
                     @click="openPage(item)"
              >
                {{ $t(`App.hardcoded-texts.View File`) }}
              </v-btn>
              <v-btn v-if="item.userId"
                     class="ma-1"
                     color="primary"
                     outlined
                     x-small
                     @click="openUser(item)"
              >
                {{ $t(`App.hardcoded-texts.View User`) }}
              </v-btn>
              <v-btn
                  v-if="item.resource"
                  class="ma-1"
                  color="primary"
                  outlined
                  x-small
                  @click="viewDifference(item)"
              >
                {{ $t(`App.hardcoded-texts.Compare The difference`) }}
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card-text>
      <v-dialog
          v-model="compareDialog"
          width="60%"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2 justify-center">
            {{ $t(`App.hardcoded-texts.Changed fields`) }}
          </v-card-title>
          <v-card-text>
            <template>
            </template>
            <v-row class="ma-4" no-gutters>
              <v-col>
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                  <v-card-title class="justify-center">{{ $t(`App.hardcoded-texts.Changes`) }}</v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <thead>
                      <tr>
                        <th class="text-left">{{ $t(`App.hardcoded-texts.Field`) }}</th>
                        <th class="text-left">{{ $t(`App.hardcoded-texts.Old Value`) }}</th>
                        <th class="text-left">{{ $t(`App.hardcoded-texts.New Value`) }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in differnce" :key="index">
                        <td>{{ item.path }}</td>
                        <td>{{ formatValue(item.old) }}</td>
                        <td>{{ formatValue(item.new) }}</td>
                      </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="compareDialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Audit Logs',
  created() {
    this.setUp()
    this.getData(true);
    this.fetchAuditEventSubType()
  },
  data: function () {
    return {
      auditData: [],
      id: null,
      userEmail: null,
      operationOutcome: null,
      total: 0,
      prevPage: -1,
      link: [],
      startDate: null,
      dateTo: null,
      auditLogHeader: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        {
          text: 'User Email',
          align: 'start',
          sortable: true,
          value: 'userEmail',
        },
        {
          text: 'Full Name',
          align: 'start',
          sortable: true,
          value: 'fullName',
        },
        {
          text: 'Resource',
          align: 'start',
          sortable: true,
          value: 'resource',
        },
        {
          text: 'Action',
          align: 'start',
          sortable: true,
          value: 'action',
        },
        {
          text: 'Recorded On',
          align: 'start',
          sortable: true,
          value: 'recorded',
        },
        {
          text: 'Operation Outcome',
          align: 'start',
          sortable: true,
          value: 'outcome',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        },
      ],
      startDateMenu: false,
      auditEventSubType: [],
      endDateMenu: false,
      error_message: null,
      options: {itemsPerPage: 10},
      loading: false,
      resource: 'AuditEvent',
      actionSubType: null,
      profile: 'http://ihris.org/fhir/StructureDefinition/ihris-auditevent',
      auditEventOutcome: [
        {
          "code": "0",
          "display": "Success",
          "definition": "The operation completed successfully (whether with warnings or not)."
        },
        {
          "code": "4",
          "display": "Minor failure",
          "definition": "The action was not successful due to some kind of minor failure (often equivalent to an HTTP 400 response)."
        },
        {
          "code": "8",
          "display": "Serious failure",
          "definition": "The action was not successful due to some kind of unexpected error (often equivalent to an HTTP 500 response)."
        },
        {
          "code": "12",
          "display": "Major failure",
          "definition": "An error of such magnitude occurred that the system is no longer available for use (i.e. the system died)."
        }],
      compareDialog: false,
      resourcePage: {},
      differnce: undefined
    }
  },
  methods: {
    setUp() {
      this.auditLogHeader = this.auditLogHeader.map((field) => {
        field.text = this.$t(`App.hardcoded-texts.${field.text}`);
        return field;
      });
      this.auditEventOutcome = this.auditEventOutcome.map((field) => {
        field.display = this.$t(`App.hardcoded-texts.${field.display}`);
        return field;
      });
      let url = "/fhir/Basic?_count=200&_format=json&_pretty=true&_profile=http://ihris.org/fhir/StructureDefinition/ihris-page"
      fetch(url).then(response => {
        response.json().then((data) => {
          data.entry.map((entry) => {
            let id = entry.resource.extension.find(y => y.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-display").extension.find(x => x.url === "resource").valueReference.reference
            let page = entry.resource.id.split("ihris-page-").pop()
            this.resourcePage[id] = page
          })
        })
      })
    },
    getData(restart) {
      this.loading = true
      let url = "";
      if (restart) this.options.page = 1;
      if (this.options.page > 1) {
        if (this.options.page === this.prevPage - 1) {
          url = this.link.find(link => link.relation === "previous").url;
        } else if (this.options.page === this.prevPage + 1) {
          url = this.link.find(link => link.relation === "next").url;
        }
        url = url.replace("/fhir?", "/fhir/" + this.resource + "?")
        url = url.substring(url.indexOf("/fhir/"));
        //some of the hapi instances requires _total=accurate to always be available for them to return total resources
        if (url.indexOf('_total=accurate') === -1) {
          url = url + '&_total=accurate'
        }
        //add profile to url
        if (this.profile) {
          url = url + '&_profile=' + this.profile
        }
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
        url =
            "/fhir/" +
            this.resource +
            "?_count=" +
            count +
            "&_elements=id,agent,subtype,entity,outcome,recorded" +
            "&_total=accurate&_profile=" +
            this.profile +
            "&_sort=-_lastUpdated";
      }
      if (this.id) {
        url = url + `&_id=${this.id}`
      }
      if (this.startDate) {
        url = url + `&date=ge${this.startDate}`
      }
      if (this.dateTo) {
        url = url + `&date=le${this.dateTo}`
      }
      if (this.actionSubType) {
        url = url + `&subtype=${this.actionSubType}`
      }
      if (this.userEmail) {
        url = url + `&altid:contains=${this.userEmail}`
      }
      if (this.operationOutcome) {
        url = url + `&outcome=${this.operationOutcome}`
      }
      this.prevPage = this.options.page;
      fetch(url).then(response => {
        response.json().then((data) => {
          this.link = data.link;
          this.total = data.total;
          this.auditData = []
          if (data.total > 0) {
            data.entry.map((entry) => {
              let resource = entry.resource.entity?.[0]?.what?.reference
              let auditData = {
                id: entry.resource.id,
                userId: entry.resource.agent[0]?.id,
                userEmail: entry.resource.agent[0]?.altId,
                action: entry.resource.subtype[0]?.display,
                fullName: entry.resource.agent[0]?.name,
                outcome: this.auditEventOutcome.find(x => x.code === entry.resource.outcome)?.display,
                recorded: entry.resource.recorded,
                resource: resource
              }
              if (auditData.userEmail) {
                let userUrl = `/fhir/Person?email=${auditData.userEmail}`
                fetch(userUrl).then(response => {
                  response.json().then((data) => {
                    auditData.userId = data.entry[0].resource.id
                  })
                }).catch(error => {
                  this.error_message = error.message
                })
              }
              this.auditData.push(auditData)
            })
          }
          this.loading = false
        })
            .catch(error => {
              this.loading = false
              this.error_message = error.message
            })
      })
    },
    fetchAuditEventSubType() {
      fetch("/fhir/ValueSet/audit-event-sub-type/$expand").then(response => {
        response.json().then((data) => {
          this.auditEventSubType = data.expansion.contains
        })
      })
    },
    openUser(item) {
      if (item?.userId) {
        const routeData = this.$router.resolve({
          name: "resource_view",
          params: {page: "user", id: item.userId}
        });
        window.open(routeData.href, '_blank');
      }
    },
    openPage(item) {
      if (item?.resource) {
        let split = item.resource.split("/")
        let url = `/fhir/${split[0]}/${split[1]}`
        fetch(url).then(response => {
          response.json().then((data) => {
            let profile = data.meta.profile[0].split("http://ihris.org/fhir/").pop()
            const routeData = this.$router.resolve({
              name: "resource_view",
              params: {page: this.resourcePage[profile], id: split[1]}
            });
            window.open(routeData.href, '_blank');
          })
        })
      }
    },
    viewDifference(item) {
      let input = item.resource;
      let basePath = input.split('/_history/')[0];
      let version = parseInt(input.split('/_history/')[1]);
      if (version === 1) {
        this.$toast.error("No previous version to compare with");
        return;
      }
      let newUrl = `/fhir/vRead/${basePath}/${version}`;
      let oldUrl = `/fhir/vRead/${basePath}/${version - 1}`;

      let oldData = {}
      let newData = {}
      this.compareDialog = true
      fetch(newUrl).then(response => {
        response.json().then((data) => {
          newData = data
          fetch(oldUrl).then(response => {
            response.json().then((data) => {
              oldData = data
              if (oldData && newData) {
                this.differnce = this.compareJSON(oldData, newData)
              }
            })
          })
        })
      })
    },
    compareJSON(json1, json2) {
      const obj1 = typeof json1 === 'string' ? JSON.parse(json1) : json1;
      const obj2 = typeof json2 === 'string' ? JSON.parse(json2) : json2;

      function compareObjects(obj1, obj2, path = '') {
        const differences = [];

        for (const key in obj1) {
          const currentPath = path ? `${path}.${key}` : key;
          if (!(key in obj2)) {
            differences.push({
              path: currentPath,
              old: obj1[key],
              new: null
            });
          } else if (typeof obj1[key] !== typeof obj2[key]) {
            differences.push({
              path: currentPath,
              old: obj1[key],
              new: obj2[key]
            });
          } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            differences.push(...compareObjects(obj1[key], obj2[key], currentPath));
          } else if (obj1[key] !== obj2[key]) {
            differences.push({
              path: currentPath,
              old: obj1[key],
              new: obj2[key]
            });
          }
        }
        for (const key in obj2) {
          const currentPath = path ? `${path}.${key}` : key;
          if (!(key in obj1)) {
            differences.push({
              path: currentPath,
              old: null,
              new: obj2[key]
            });
          }
        }
        return differences;
      }

      return compareObjects(obj1, obj2);
    },
    formatValue(value) {
      if (value === null) return "_";
      if (Array.isArray(value)) return JSON.stringify(value, null, 2);
      return value;
    }
  },
  computed: {
    maxDate() {
      return this.$moment().format("YYYY-MM-DD")
    },
    itemsPerPage() {
      return [5, 10, 50, 100];
    }
  },
  watch: {
    options: {
      handler() {
        this.getData();
      },
      deep: true
    },
    id() {
      this.getData()
    },
    startDate() {
      this.getData()
    },
    dateTo() {
      this.getData()
    },
    actionSubType() {
      this.getData()
    },
    userEmail() {
      this.getData()
    },
    operationOutcome() {
      this.getData()
    }
  }
}
</script>
