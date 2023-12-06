<template>
  <ihris-element :edit="edit" :loading="loading" v-if="!hide">
    <template #form>
      <v-menu 
        v-if="displayType == 'tree'"
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
        max-height="500px"
        >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="displayValue"
            :label="$t(`App.fhir-resources-texts.${display}`)"
            readonly
            v-on="on"
            outlined
            hide-details="auto"
            :rules="rules"
            :error-messages="errors"
            :loading="loading"
            dense>
            <template #label>{{$t(`App.fhir-resources-texts.${display}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
          </v-text-field>
        </template>
        <v-card v-if="!((disabled) || (preset && $route.name === 'resource_add'))">
          <v-treeview
            :active.sync="active"
            :items="items"
            :load-children="fetchChildren"
            :open.sync="open"
            item-disabled="locked"
            activatable
            :multiple-active="false"
            selection-type="independent"
            :loading="loading"
            >
            <template slot="label" slot-scope="{ item }">
              {{ item.name }}
            </template>
          </v-treeview>
        </v-card>
      </v-menu>
      <!-- <v-text-field
        v-else-if="displayType === 'reportSelect'"
        @click="reportDialog = true"
        :error-messages="errors"
        @change="errors = []" 
        :disabled="disabled"
        :readonly="true"
        :label="$t(`App.fhir-resources-texts.${display}`)"
        v-model="select"
        outlined 
        hide-details="auto" 
        :rules="rules"
        dense
      >
        <template #label>{{$t(`App.fhir-resources-texts.${display}`)}}<span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-text-field> -->
      <v-autocomplete
        v-else-if="displayType === 'reportSelect'"
        @click="reportDialog = true"
        v-model="select"
        :loading="loading"
        :items="items"
        cache-items
        flat
        hide-no-data
        hide-details
        :label="display"
        outlined
        dense
        readonly
        :rules="rules"
        :disabled="(disabled) || (preset && $route.name === 'resource_add')"
        :error-messages="errors"
        @change="errors = []"
      >
        <template #label>{{$t(`App.fhir-resources-texts.${display}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-autocomplete>
      <v-autocomplete
        v-else
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        flat
        hide-no-data
        hide-details
        :label="display"
        outlined
        dense
        :placeholder="$t(`App.hardcoded-texts.Start typing for selection`)"
        :rules="rules"
        :disabled="(disabled) || (preset && $route.name === 'resource_add')"
        :error-messages="errors"
        @change="errors = []"
      >
        <template #label>{{$t(`App.fhir-resources-texts.${display}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-autocomplete>
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="1000"
        v-model="reportDialog"
      >
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >Click row to select value</v-toolbar>
          <v-progress-linear
            color="secondary"
            :indeterminate="loadingReportVal"
            rounded
            height="6"
          />
          <v-card-text v-if="!loadingReportVal">
            <es-report
              v-if="report"
              :report="report"
              :hideCheckboxes="true"
              :hideExport="true"
              :hideReportCustomization="true"
              @rowSelected="reportRowSelected"
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="reportDialog = false"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template #header>
      {{$t(`App.fhir-resources-texts.${display}`)}}
    </template>
    <template #value>
      {{displayValue}}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"

const querystring = require('querystring')
const fhirurl = "http://hl7.org/fhir/StructureDefinition/"
import { eventBus } from "@/main";
import { dataDisplay } from "@/mixins/dataDisplay"

export default {
  name: "fhir-reference",
  props: ["field","label","sliceName","targetProfile","targetResource","min","max","base-min","base-max",
    "slotProps","path","sub-fields","edit","readOnlyIfSet","constraints", "displayType", 
    "initialValue", "overrideValue", "displayCondition", "searchParameter", "initialProfile", "allowedProfiles", "pageTargetProfile", "report", "reportReturnValue", "referenceDisplayPath"],
  components: {
    IhrisElement,
    "es-report": () => import(/* webpackChunkName: "fhir-questionnaire" */ "@/views/es-report" )
  },
  mixins: [dataDisplay],
  data: function() {
    return {
      hide: false,
      reportDialog: false,
      loadingReportVal: false,
      source: { path: "", data: {} },
      value: { reference: "" },
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
      errors: [],
      lockWatch: false,
      active: [],
      open: [],
      treeLookup: {},
      allAllowed: true,
      pathes: {}
    }
  },
  created: function() {
    //this function is defined under dataDisplay mixin
    this.hideShowField(this.displayCondition)
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH REFERENCE",this.path,this.slotProps)
        if ( !this.lockWatch ) {
          this.setupData()
        }
      },
      deep: true
    },
    search: function (val) {
      if ( !this.awaitingSearch) {
        setTimeout( () => {
          val && val.length > 1 && this.querySelections( this.search )
          this.awaitingSearch = false
        }, 500 )
      }
      this.awaitingSearch = true
    },
    select: function(val) {
      this.value.reference = val
      this.getDisplay()
      eventBus.$emit(this.path, val)
    },
    active: function() {
      if ( this.active.length ) {
        this.select = this.active[0]
        this.displayValue = this.treeLookup[ this.select ]
      } else {
        this.select = undefined
        this.displayValue = ""
      }
      this.menu = false
    }
  },
  methods: {
    reportRowSelected(row) {
      this.loadingReportVal = true
      let id
      if(this.reportReturnValue && this.reportReturnValue.split(".").length > 1) {
        let returnVal = this.reportReturnValue.split(".")[1]
        id = row[returnVal]
      } else {
        id = row.id
      }
      if(id.split("/").length !== 2) {
        for(let idx in row) {
          let val = row[idx]
          if(!val) {
            continue
          }
          if(val.split("/").length > 1 && val.split("/")[1] == id) {
            id = val
          }
        }
      }
      if(this.referenceDisplayPath) {
        fetch("/fhir/" + id).then((response) => {
          response.json().then((data) => {
            let displayVal = this.$fhirpath.evaluate(data, this.referenceDisplayPath)
            if(typeof displayVal === 'object') {
              displayVal = displayVal.join(", ")
            }
            this.items = [{
              value: id,
              text: displayVal
            }]
            this.select = id
            this.loadingReportVal = false
            this.reportDialog = false
          })
        })
      } else {
        this.$fhirutils.resourceLookup( id ).then( display => {
          this.displayValue = display
          this.items.push( {text: display, value: id} )
          this.select = id
          this.loadingReportVal = false
          this.reportDialog = false
        } )
      }
    },
    targetResourceMatchProfile() {
      let targetProfiles = this.targetProfile.split(",")
      if(this.pageTargetProfile) {
        targetProfiles = [this.pageTargetProfile]
      }
      let targetResources = this.targetResource.split(",")
      let same = false
      for(let idx in targetProfiles) {
        if(targetProfiles[idx].replace( fhirurl, "" ) === targetResources[idx]) {
          same = true
          break
        }
      }
      return same
    },
    setupData: function() {
      let targetProfile = this.targetProfile.split(",")
      let targetResources = this.targetResource.split(",")
      if(this.pageTargetProfile) {
        targetProfile = [this.pageTargetProfile]
      }
      if ( targetProfile.length > 0 && targetResources.length > 0 ) {
        if ( this.targetResourceMatchProfile() ) {
          this.allAllowed = true
        } else {
          this.allAllowed = false
        }
        this.resource = targetResources[0]
      }
      if ( this.displayType === "tree" ) {
        this.setupTreeItems()
      }
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          let results = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          this.source.data = results[0]
        }
        if( this.source.data ) {
          this.preset = true
          this.select = this.source.data.reference
          this.lockWatch = true
        }
      }
      this.disabled = this.readOnlyIfSet && this.preset
    },
    setupTreeItems: async function() {
      let treetop = this.initialValue
      let searchparam = this.searchParameter
      if ( this.overrideValue ) {
        treetop = this.overrideValue
      }
      this.loading = true
      let params = {}
      if(searchparam) {
        if ( treetop ) {
          params = { searchparam : treetop }
        } else if(!treetop) {
          params[searchparam + ":missing"] = true
          if(this.initialProfile) {
            params['_profile'] = this.initialProfile
          } else if(this.allowedProfiles) {
            params['_profile'] = this.allowedProfiles
          }
        }
      } else {
        if (treetop ) {
          params = { "partof": treetop }
        } else {
          params = { "partof:missing": true }
        }
      }
      params._count = 500
      let url = "/fhir/"+this.resource+"?_sort=name&"+querystring.stringify( params )
      this.items = []
      this.addItems( url, this.items )

    },
    checkChildren: function(item) {
      let params = {}
      if ( this.searchParameter ) {
        params[this.searchParameter] = item.id
        if(this.allowedProfiles) {
          params['_profile'] = this.allowedProfiles
        }
      } else {
        params = { "partof": item.id }
      }
      params["_summary"] = "count"
      let url = "/fhir/"+this.resource+ "?_sort=name&"+querystring.stringify( params )
      return new Promise( resolve => {
        fetch( url ).then( response => {
          if ( response.ok ) {
            response.json().then( data => {
              if ( data.total && data.total > 0 ) {
                item.children = []
              }
              resolve()
            } ).catch( err => {
              console.log("failed to check children for",url,err)
              resolve()
            } )
          } else {
            console.log("failed to check children for",url,response.status)
            resolve()
          }
        } ).catch( err => {
          console.log("failed to check children for",url,err)
          resolve()
        } )
      } )
    },
    addItems: function(url, items) {
      fetch( url ).then( response => {
        if ( response.ok ) {
          response.json().then( async data => {
            let targetProfile = this.targetProfile.split(",")
            if(this.pageTargetProfile) {
              targetProfile = [this.pageTargetProfile]
            }
            if ( data.entry && data.entry.length > 0 ) {
              for( let entry of data.entry ) {
                let locked = this.allAllowed ? false : !entry.resource.meta.profile.find(profile => targetProfile.includes(profile))
                let name = entry.resource.name
                if(this.resource === 'Basic') {
                  name = entry.resource.extension.find((ext) => {
                    return ext.url === 'http://ihris.org/fhir/StructureDefinition/ihris-basic-name'
                  })
                  if(name) {
                    name = name.valueString
                  }
                }
                let profile = []
                if(entry.resource.meta && entry.resource.meta.profile) {
                  profile = entry.resource.meta.profile
                }
                let item = {
                  profile,
                  id: entry.resource.resourceType+"/"+entry.resource.id,
                  name,
                  locked: locked
                }
                await this.checkChildren( item )
                this.treeLookup[ item.id ] = item.name
                items.push( item )
              }
            }
            if ( data.link ) {
              let next = data.link.find( link => link.relation === "next" )
              if ( next ) {
                this.addItems( next.url, items )
              } else {
                this.loading = false
              }
            } else {
              this.loading = false
            }
          } ).catch( err => {
            console.log("Failed to add items for",url,err)
            this.loading = false
          } )
        } else {
          console.log("//////////////////////////////")
          console.log("Failed to add items for",url,response.status)
          this.loading = false
        }
      } ).catch( err => {
        console.log("Failed to add items for",url,err)
        this.loading = false
      } )
    },
    fetchChildren: function(item) {
      let params = {}
      if ( this.searchParameter ) {
        params[this.searchParameter] = item.id
        if(this.allowedProfiles) {
          params['_profile'] = this.allowedProfiles
        }
        params["_count"] = 500
      } else {
        params = { "partof": item.id, _count: 500 }
      }
      let url = "/fhir/"+this.resource+"?"+querystring.stringify( params )
      this.loading = true
      this.addItems( url, item.children )
      return new Promise( resolve => {
        let count = 0
        const checkLoading = () => {
          if ( !this.loading || count++ > 100) {
            resolve()
          } else {
            setTimeout( checkLoading, 200 )
          }
        }
        checkLoading()
      } )
    },
    querySelections: function( val ) {
      this.loading = true
      let params = { "name:contains": val }
      let targetProfile = this.targetProfile.split(",")
      if(this.pageTargetProfile) {
        targetProfile = [this.pageTargetProfile]
      }
      if ( !targetProfile[0].endsWith( this.resource ) ) {
        params._profile = targetProfile
      }
      let url = "/fhir/"+this.resource+"?"+querystring.stringify( params )
      fetch( url ).then( response => {
        if ( response.ok ) {
          response.json().then( async (data) => {
            this.items = []
            if ( data.entry && data.entry.length ) {
              for( let entry of data.entry ) {
                let ref = entry.resource.resourceType+"/"+entry.resource.id
                let item = { value: ref }
                item.text = await this.$fhirutils.resourceLookup( ref )
                this.items.push( item )
              }
            }
            this.loading = false
          } )
        } else {
          console.log("Failed to retrieve",this.resource)
          this.loading = false
        }
      } )
    },
    getDisplay: function() {
      if ( (!this.edit || this.preset) && this.value && this.value.reference ) {
        this.loading = true
        if(!this.referenceDisplayPath) {
          this.$fhirutils.resourceLookup( this.value.reference ).then( display => {
            this.displayValue = display
            if ( this.displayType !== "tree" ) {
              this.items.push( {text: display, value: this.value.reference} )
            }
            this.loading = false
          } )
        } else {
          fetch("/fhir/" + this.value.reference).then((response) => {
            response.json().then((data) => {
              let displayVal = this.$fhirpath.evaluate(data, this.referenceDisplayPath)
              if(typeof displayVal === 'object') {
                displayVal = displayVal.join(", ")
              }
              this.items = [{
                value: this.value.reference,
                text: displayVal
              }]
              this.displayValue = displayVal
              this.loading = false
            })
          })
        }
      }
    }
  },
  computed: {
    index: function() {
      if ( this.slotProps ) return this.slotProps.input
      else return undefined
    },
    display: function() {
      if ( this.slotProps && this.slotProps.input) return this.slotProps.input.label
      else return this.label
    },
    required: function() {
      return (this.index || 0) < this.min
    },
    rules: function() {
      if ( this.required ) {
        return [ v => !!v || this.display+" is required" ]
      } else {
        return []
      }
    }
  }

}
</script>
