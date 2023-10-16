<template>
  <ihris-element :edit="edit" :loading="loading">
    <template #form>
      <v-menu
          v-if="displayType == 'tree'"
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          max-height="500px"
          min-width="290px"
          offset-y
          transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
              v-model="displayValue"
              :disabled="disabledAll || disabled"
              :error-messages="errors"
              :label="display"
              :loading="loading"
              :rules="rules"
              append-icon="mdi-arrow-down-drop-circle-outline"
              dense
              hide-details="auto"
              outlined
              readonly
              v-on="on">
            <template #label>{{ display }} <span v-if="required" class="red--text font-weight-bold">*</span></template>
          </v-text-field>
        </template>
        <v-card v-if="!((disabled) || (preset && $route.name === 'resource_add'))">
          <v-treeview
              :active.sync="active"
              :items="items"
              :load-children="fetchChildren"
              :loading="loading"
              :multiple-active="false"
              :open.sync="open"
              activatable
              item-disabled="locked"
              return-object
              selection-type="independent"
          ></v-treeview>
        </v-card>
      </v-menu>
    </template>
    <template #header>
      {{ display }}
    </template>
    <template #value>
      {{ displayValue }}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"

const querystring = require('querystring')
const fhirurl = "http://hl7.org/fhir/StructureDefinition/"
export default {
  name: "fhir-reference-dashboard",
  props: ["field", "label", "sliceName", "targetProfile", "targetResource", "min", "max", "base-min", "base-max",
    "slotProps", "path", "sub-fields", "edit", "readOnlyIfSet", "constraints", "displayType", "initialValue", "overrideValue"],
  components: {
    IhrisElement
  },
  data: function () {
    return {
      source: {path: "", data: {}},
      value: {reference: ""},
      qField: "valueReference",
      loading: false,
      search: "",
      menu: false,
      items: [],
      select: "",
      resource: "",
      awaitingSearch: false,
      displayValue: "",
      preset: false,
      disabled: false,
      disabledAll: false,
      errors: [],
      lockWatch: false,
      active: [],
      open: [],
      treeLookup: {},
      allAllowed: true,
      isFacility: false
    }
  },
  created: function () {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        if (!this.lockWatch) {
          this.setupData()
        }
      },
      deep: true,
    },
    search: function (val) {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          val && val.length > 1 && this.querySelections(this.search)
          this.awaitingSearch = false
        }, 500)
      }
      this.awaitingSearch = true
    },
    select: function (val) {
      if (this.$route.path === "/dashboard/"+this.$route.params.id) {
        this.$emit("selectFacilityForDashboard", val);
      }
      this.value.reference = val
      this.getDisplay()
    },
    active: function () {
      if (this.active.length) {
        this.select = this.active[0]
        this.displayValue = this.treeLookup[this.select.id]
      } else {
        this.select = undefined
        this.displayValue = ""
      }
      this.menu = false
    }
  },
  methods: {
    setupData: function () {
      this.targetResource = "Location"
      this.targetProfile = "Location"
      if (this.targetProfile && this.targetResource) {
        if (this.targetProfile.replace(fhirurl, "") === this.targetResource) {
          this.allAllowed = true
        } else {
          this.allAllowed = false
        }
        this.resource = this.targetResource
      }
      if (this.displayType === "tree") {
        this.setupTreeItems()
      }
      if (this.slotProps && this.slotProps.source) {
        this.source = {path: this.slotProps.source.path + "." + this.field, data: {}}
        if (this.slotProps.source.fromArray) {
          this.source.data = this.slotProps.source.data
        } else {
          let expression = this.$fhirutils.pathFieldExpression(this.field)
          let results = this.$fhirpath.evaluate(this.slotProps.source.data, expression)
          this.source.data = results[0]
        }
        if (this.source.data) {
          this.preset = true
          this.select = this.source.data.reference
          this.lockWatch = true
        }
      }
      this.disabled = this.readOnlyIfSet && this.preset
    },
    setupTreeItems: async function () {
      let treetop = this.initialValue
      if ( this.overrideValue ) {
        treetop = this.overrideValue
      }
      this.loading = true
      let params = {} 
      if ( treetop ) {
        params = { "partof": treetop }
      } else {
        params = { "partof:missing": true }
      }
      params._count = 500
      let url = "/fhir/"+this.resource+"?_sort=name&"+querystring.stringify( params )
      this.items = []
      this.addItems( url, this.items )
    },
    checkFacility: function (id) {
      let params = {
        "_id": id,
        "_profile": "http://ihris.org/fhir/StructureDefinition/ihris-facility",
        "_summary": "count"
      }
      let url = "/fhir/" + this.resource + "?_sort=name" + "&" + querystring.stringify(params)
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
      let url = "/fhir/" + this.resource + "?_sort=name" + "&" + querystring.stringify(params)
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
      fetch(url).then(response => {
        if (response.ok) {
          response.json().then(async data => {
            if (data.entry && data.entry.length > 0) {
              for (let entry of data.entry) {
                let locked = this.allAllowed ? false : !entry.resource.meta.profile.includes( this.targetProfile )
                let item = { 
                  id: entry.resource.resourceType+"/"+entry.resource.id,
                  name: entry.resource.name,
                  locked: locked
                }
                await this.checkChildren( item )
                this.treeLookup[ item.id ] = item.name
                items.push( item )
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
      let params = {"partof": item.id, "_count": 1000}
      let url = "/fhir/" + this.resource + "?_sort=name" + "&" + querystring.stringify(params)
      this.loading = true
      this.addItems( url, item.children )
      return new Promise(resolve => {
        let count = 0
        const checkLoading = () => {
          if (!this.loading || count++ > 200) {
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
      let url = "/fhir/" + this.resource + "?_sort=name" + "&" + querystring.stringify(params)
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
          if (!this.edit && this.targetProfile === "http://ihris.org/fhir/StructureDefinition/ihris-jurisdiction") {
            let params = {
              _id: this.value.reference.split('/').pop(), status: "active", "_include:iterate": "Location:partof",
            };
            let url = "/fhir/Location?_sort=name" + "&" + querystring.stringify(params)
            let locations = []
            let type = []
            //let type = ["region", "district", "subcounty"]
            fetch(url).then(response => {
              if (response.ok) {
                response.json().then((response) => {
                  for (let loc of type) {
                    let res = response.entry.find(x => x.resource.type[0].coding[0].code == loc)
                    locations.push(res.resource.name)
                  }
                  this.displayValue = locations.join(',')
                })
              }
            })
          } else {
            this.displayValue = display
          }
          if (this.displayType !== "tree") {
            this.items.push({text: display, value: this.value.reference})
          }
          this.loading = false
        })
      }
    },
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