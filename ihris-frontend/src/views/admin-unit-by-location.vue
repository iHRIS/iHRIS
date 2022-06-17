<template>
  <v-card class="mx-auto accent-4" max-width="100%" min-height="100%">
    <v-sheet class="primary py-4 pa-2 justify-center" dark>
      <h1 class="text-center">
        By Location
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
      <v-row class="mt-2" style="margin-left: 10%">
        <v-treeview
            :active.sync="active"
            :filter="filter"
            :items="items"
            :load-children="fetchChildren"
            :loading="loading"
            :multiple-active="false"
            :open.sync="open"
            :search="search"
            item-disabled="locked"
            open-all
            return-object
            selection-type="independent"
            style="font-size: 1.4em"
            @update:active="test"
        >
          <template slot="label" slot-scope="{ item }">
            <v-icon v-if="item.isFacility" class="pr-2" color="teal darken-2">
              mdi-domain
            </v-icon>
            <v-icon v-else class="pr-2" color="teal darken-2">
              mdi-map-marker
            </v-icon>
            {{ item.name }}
          </template>
        </v-treeview>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

const querystring = require('querystring')
export default {
  data: function () {
    return {
      dialog: false,
      editDialog: false,
      source: {path: "", data: {}},
      value: {reference: ""},
      loading: false,
      items: [{
        "id": "Location/ET",
        "name": "Ethiopia",
        "locked": true,
        "children": []
      }],
      select: "",
      displayValue: "",
      preset: false,
      active: [],
      open: [],
      treeLookup: {},
      allAllowed: true,
      isFacility: false,
      search: null,
      locationType: [],
      locationStatus: [],
      locationFilter: ['country', 'region'],
      locationData: {
        name: '',
        type: '',
        status: '',
      }
    }
  },
  created: function () {
    this.setupData();
    this.loadLocationType();
    this.loadLocationStatus();
  },
  watch: {
    items: () => {
      console.log("items changed")
    },
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
    active: function () {
      if (this.active.length) {
        this.select = this.active[0]
        this.displayValue = this.treeLookup[this.select]
        this.locationData.partof = this.select
      } else {
        this.select = undefined
        this.displayValue = ""
      }
    },
    search: function (val) {
      let url = `/fhir/Location?name=${val}&_include=Location:partof&_sort=name`
      this.items.children = [];
      if (val.length === 0) {
        this.setupData()
      } else {
        this.addItems(url, this.items)
      }
    }
  },
  methods: {
    test() {
      this.dialog = true;
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
      params._sort = "name"
      let url = `/fhir/Location?partof=Location%2FET&_sort=name`
      this.items.children = []
      this.addItems(url, this.items.children, false)
    },
    checkFacility: function (id) {
      let params = {
        "_id": id,
        "_profile": "http://ihris.org/fhir/StructureDefinition/ihris-facility",
      }
      let url = "/fhir/Facility?name=name&_sort=name" + "&" + querystring.stringify(params)
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
    checkForFacility: function (item) {
      let url = `/fhir/Location?facility-location=${item.id.split('/')[1]}&_sort=name`
      return new Promise(resolve => {
        fetch(url).then(response => {
          if (response.ok) {
            response.json().then((data) => {
              // item.children = []
              if (data.total && data.total > 0) {
                if (data.total && data.total > 0) {
                  item.children = []
                }
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
    checkChildren: function (item) {
      let params = {"partof": item.id, "_summary": "count"}
      let url = "/fhir/Location?_sort=name" + "&" + querystring.stringify(params)
      return new Promise(resolve => {
        fetch(url).then(response => {
          if (response.ok) {
            response.json().then((data) => {
              if (data.total && data.total > 0) {
                if (data.total && data.total > 0) {
                  item.children = []
                }
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
                  type: entry.resource.type[0].coding[0].code,
                  isFacility: entry.resource.meta.profile.includes("http://ihris.org/fhir/StructureDefinition/ihris-facility"),
                }
                await this.checkChildren(item)
                await this.checkForFacility(item)
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
          console.log("Failed to add items for", url, response.status)
          this.loading = false
        }
      }).catch(err => {
        console.log("Failed to add items for", url, err)
        this.loading = false
      })
    },
    fetchChildren: function (item) {
      let params = {"partof": item.id, _count: 5000}
      let url = "/fhir/Location?&_sort=name" + "&" + querystring.stringify(params)
      let facilityUrl = `/fhir/Location?facility-location=${item.id.split('/')[1]}&_sort=name`
      this.loading = true
      this.addItems(facilityUrl, item.children,)
      this.addItems(url, item.children,)

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
    getDisplay: function () {
      if ((!this.edit || this.preset) && this.value && this.value.reference) {
        this.loading = true
        this.$fhirutils.resourceLookup(this.value.reference).then(display => {
          this.displayValue = display
          if (this.displayType !== "tree") {
            this.items.children.push({text: display, value: this.value.reference})
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
                l => !this.locationFilter.includes(l.code.toLowerCase())
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
