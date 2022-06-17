<template>
  <v-card class="mx-auto accent-4" max-width="100%" min-height="100%">
    <v-sheet class="primary py-4 pa-2 justify-center" dark>
      <h1 class="text-center">
        By Reporting
      </h1>
    </v-sheet>
    <v-row class="primary pa-4 mx-0 pb-8 px-10" justify="center">
      <v-text-field
          v-model="search"
          class="text--black"
          clear-icon="mdi-close-circle-outline"
          clearable
          dark
          hide-details
          label="Search by Location(Region, Zone, Woreda, and City)"
          outlined
          style="max-width: 50%"
      ></v-text-field>
    </v-row>
    <v-card-text>
      <div class="text-center">
        <v-dialog
            v-model="dialog"
            width="80%"
        >
          <v-card>
            <v-card-title class="text-h6 justify-center grey lighten-2">
              <v-spacer></v-spacer>
              <v-icon class="pr-2" color="green darken-2">
                mdi-hospital-building
              </v-icon>
              {{ this.selected ? this.selected.name : '' }}
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-2"
                  outlined
                  small
                  @click="close()"
              >
                <v-icon color="red" left>
                  mdi-close-circle-outline
                </v-icon>
                Close
              </v-btn>
            </v-card-title>
            <v-card-text class=" pt-0">
              <v-container>
                <v-row class="pb-6" justify="end">
                  <v-switch
                      v-model="partOf"
                      color="indigo"
                      hide-details
                      value="indigo"
                  >
                    <template v-if="this.selected" #label>
                      <h5 class="description">Include Data from facility reporting to
                        <strong>{{ selected.name }}</strong></h5>
                    </template>
                  </v-switch>
                </v-row>
                <facility-information v-if="this.selected" :id="this.selected.id" :closed="this.dialog"
                                      :name="this.selected.name" :part-of="this.partOf"></facility-information>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <v-row class="mt-2" style="margin-left: 10%">
        <h2 v-if="items.length===0" class="mt-3">Loading...</h2>
        <v-treeview
            v-model='selection'
            :items="items"
            :load-children="fetchChildren"
            :loading="loading"
            :open.sync="open"
            :search="search"
            activatable
            item-disabled="locked"
            light
            open-on-click
            return-object
            selection-type="independent"
            style="font-size: 1.4em;"
        >
          <template slot="label" slot-scope="{ item }">
            <v-icon class="pr-2" color="teal darken-2">
              mdi-domain
            </v-icon>
            <a @click="openDialog(item)">{{ item.name }}</a>
          </template>
        </v-treeview>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import facilityInformation from './facility-information.vue'

const querystring = require('querystring')
export default {
  components: {facilityInformation},
  data: function () {
    return {
      partOf: false,
      dialog: false,
      source: {path: "", data: {}},
      value: {reference: ""},
      loading: false,
      items: [],
      selection: [],
      select: "",
      displayValue: "",
      preset: false,
      open: [],
      treeLookup: {},
      allAllowed: true,
      isFacility: false,
      search: null,
      selected: null,
      locationData: {
        name: '',
        type: '',
        status: '',
      },
    }
  },
  created: function () {
    this.setupData();
    this.loadLocationType();
    this.loadLocationStatus();
  },
  watch: {
    slotProps: {
      handler() {
        this.setupData()
      },
      deep: true
    },
    select: function (val) {
      this.value.reference = val
      this.getDisplay()
    },
    search: function (val) {
      let url = `/fhir/Location?name=${val}&_include=Location:partof&_sort=name`
      this.items = [];
      if (val.length === 0) {
        this.setupData()
      } else {
        this.addItems(url, this.items)
      }
    }
  },
  methods: {
    close() {
      this.dialog = false;
    },
    openDialog(item) {
      this.dialog = true;
      this.selected = item;
    },
    setupData: function () {
      this.setupTreeItems()
    },
    setupTreeItems: async function () {
      let treetop = this.initialValue
      if (this.overrideValue) {
        treetop = this.overrideValue
      }
      this.loading = true
      let params = {}
      if (treetop) {
        await this.checkFacility(treetop)
        if (this.isFacility) {
          params = {"_id": treetop}
        } else {
          params = {"partof": treetop}
        }
      } else {
        params = {"partof:missing": true}
      }
      params.sort = "name"
      params._count = 500
      let facilityId = "federal-ministry-of-health"
      // let facilityId = this.$store.state.user.facilityId
      let url = `/fhir/Location?_profile=http://ihris.org/fhir/StructureDefinition/ihris-facility&_sort=name&_id=${facilityId}&_count=500`
      this.items = []
      this.addItems(url, this.items)
    },
    checkFacility: function (id) {
      // let params = {
      //   "_id": id,
      //   "_profile": "http://ihris.org/fhir/StructureDefinition/ihris-facility",
      //   "_summary": "count"
      // }
      console.log(id)
      let url = "/fhir/Facility?name=name&_sort=name"
      return new Promise(resolve => {
        fetch(url).then(response => {
          if (response.ok) {
            response.json().then(data => {
              if (data.total && data.total == 1) {
                this.isFacility = true
              }
              resolve()
            }).catch(err => {
              console.log("failed to check facility for", url, err)
              resolve()
            })
          } else {
            console.log("failed to check facility for", url, response.status)
            resolve()
          }
        }).catch(err => {
          console.log("failed to check facility for", url, err)
          resolve()
        })
      })
    },
    checkChildren: function (item) {
      let params = {"partof": item.id, "_summary": "count"}
      let url = "/fhir/Location?_sort=name" + "&" + querystring.stringify(params)
      return new Promise(resolve => {
        fetch(url).then(response => {
          if (response.ok) {
            response.json().then(data => {
              if (data.total && data.total > 0) {
                item.children = []
              }
              resolve()
            }).catch(err => {
              console.log("failed to check children for", url, err)
              resolve()
            })
          } else {
            console.log("failed to check children for", url, response.status)
            resolve()
          }
        }).catch(err => {
          console.log("failed to check children for", url, err)
          resolve()
        })
      })
    },
    addItems: function (url, items) {
      console.log("the url", url)
      fetch(url).then(response => {
        if (response.ok) {
          response.json().then(async data => {
            if (data.entry && data.entry.length > 0) {
              for (let entry of data.entry) {
                let locked = this.allAllowed ? false : !entry.resource.meta.profile.includes(this.targetProfile)
                let item = {
                  id: entry.resource.resourceType + "/" + entry.resource.id,
                  name: entry.resource.name,
                  locked: locked,
                  isFacility: this.targetProfile === "http://ihris.org/fhir/StructureDefinition/ihris-facility",
                }
                await this.checkChildren(item)
                this.treeLookup[item.id] = item.name
                items.push(item)
              }
            }
            if (data.link) {
              let next = data.link.find(link => link.relation === "next")
              if (next) {
                this.addItems(next.url, items)
              } else {
                this.loading = false
              }
            } else {
              this.loading = false
            }
          }).catch(err => {
            console.log("Failed to add items for", url, err)
            this.loading = false
          })
        } else {
          console.log("//////////////////////////////")
          console.log("Failed to add items for", url, response.status)
          this.loading = false
        }
      }).catch(err => {
        console.log("Failed to add items for", url, err)
        this.loading = false
      })
    },
    fetchChildren: function (item) {
      let params = {"partof": item.id, "_count": 5000}
      let url = "/fhir/Location?&_sort=name" + "&" + querystring.stringify(params)
      this.loading = true

      this.addItems(url, item.children)


      return new Promise(resolve => {
        let count = 0
        const checkLoading = () => {
          if (!this.loading || count++ > 100) {
            resolve()
          } else {
            setTimeout(checkLoading, 200)
          }
        }
        checkLoading()
      })
    },
    querySelections: function (val) {
      this.loading = true
      let params = {"name:contains": val}
      if (!this.targetProfile.endsWith(this.resource)) {
        params._profile = this.targetProfile
      }
      let url = "/fhir/Location?_sort=name" + "&" + querystring.stringify(params)
      fetch(url).then(response => {
        if (response.ok) {
          response.json().then(async (data) => {
            this.items = []
            if (data.entry && data.entry.length) {
              for (let entry of data.entry) {
                let ref = entry.resource.resourceType + "/" + entry.resource.id
                let item = {value: ref}
                item.text = await this.$fhirutils.resourceLookup(ref)
                this.items.push(item)
              }
            }
            this.loading = false
          })
        } else {
          console.log("Failed to retrieve", this.resource)
          this.loading = false
        }
      })
    },
    getDisplay: function () {
      if ((!this.edit || this.preset) && this.value && this.value.reference) {
        this.loading = true
        this.$fhirutils.resourceLookup(this.value.reference).then(display => {
          this.displayValue = display
          if (this.displayType !== "tree") {
            this.items.push({text: display, value: this.value.reference})
          }
          this.loading = false
        })
      }
    },
    loadLocationType: function () {
      let url = '/fhir/ValueSet/ihris-jurisdiction-type/$expand';
      fetch(url).then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.locationType = data.expansion.contains.filter(
                l => !this.locationFilter?.includes(l.code.toLowerCase())
            );
          })
        }
      })

    },
    loadLocationStatus: function () {
      let url = '/fhir/ValueSet/location-status/$expand';
      fetch(url).then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.locationStatus = data.expansion.contains;
          })
        }
      })
    }
  },
  computed: {
    index: function () {
      if (this.slotProps) return this.slotProps.input
      else return undefined
    },
    display: function () {
      if (this.slotProps && this.slotProps.input) return this.slotProps.input.label
      else return this.label
    },
    required: function () {
      return (this.index || 0) < this.min
    },
    rules: function () {
      if (this.required) {
        return [v => !!v || this.display + " is required"]
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>
.description {
  color: #000;
}

.description strong {
  color: #e00e0e;
}
</style>
