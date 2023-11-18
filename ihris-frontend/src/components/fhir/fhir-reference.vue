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
        placeholder="$t(`App.hardcoded-texts.Start typing for selection`)"
        :rules="rules"
        :disabled="(disabled) || (preset && $route.name === 'resource_add')"
        :error-messages="errors"
        @change="errors = []"
      >
        <template #label>{{$t(`App.fhir-resources-texts.${display}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-autocomplete>
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
    "initialValue", "overrideValue", "displayCondition", "searchParameter", "initialProfile", "pageTargetProfile"],
  components: {
    IhrisElement
  },
  mixins: [dataDisplay],
  data: function() {
    return {
      hide: false,
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
    setupData: function() {
      let targetProfile = this.targetProfile
      if(this.pageTargetProfile) {
        targetProfile = this.pageTargetProfile
      }
      if ( targetProfile && this.targetResource ) {
        if ( targetProfile.replace( fhirurl, "" ) === this.targetResource ) {
          this.allAllowed = true
        } else {
          this.allAllowed = false
        }
        this.resource = this.targetResource
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
    // getProfileParameter(profile) {
    //   let searchparams = this.searchParameter.split(":")
    //   if(!profile) {
    //     return searchparams[0].split("[")[0]
    //   }
    //   for(let searchparam of searchparams) {
    //     if(searchparam.endsWith(profile + ']')) {
    //       return searchparam.split("[")[0]
    //     }
    //   }
    // },
    // buildSearchParams(profile) {
    //   let treetop = this.initialValue
    //   let searchparam = this.searchParameter
    //   let params = {}
    //   if ( !this.searchParameter && treetop ) {
    //     params = { "partof": treetop }
    //   } else if(!this.searchParameter && !treetop) {
    //     params = { "partof:missing": true }
    //   } else if(this.searchParameter) {
    //     let searchparams = this.searchParameter.split(":")
    //     if(!profile) {
    //       let searchparam = searchparams[0]
    //       profile = searchparam.match(/\[(.*?)\]/)
    //       params[searchparams[0] + ":missing"] = true
    //       if(profile) {
    //         params["_profile"] = profile[1]
    //       }
    //     } else {
    //       for(let searchparam of searchparams) {

    //       }
    //     }
    //   }
    // },
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
            let targetProfile = this.targetProfile
            if(this.pageTargetProfile) {
              targetProfile = this.pageTargetProfile
            }
            if ( data.entry && data.entry.length > 0 ) {
              for( let entry of data.entry ) {
                let locked = this.allAllowed ? false : !entry.resource.meta.profile.includes( targetProfile )
                let name = entry.resource.name
                if(this.resource === 'Basic') {
                  name = entry.resource.extension.find((ext) => {
                    return ext.url === 'http://ihris.org/fhir/StructureDefinition/ihris-basic-name'
                  }).valueString
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
      let targetProfile = this.targetProfile
      if(this.pageTargetProfile) {
        targetProfile = this.pageTargetProfile
      }
      if ( !targetProfile.endsWith( this.resource ) ) {
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
        this.$fhirutils.resourceLookup( this.value.reference ).then( display => {
          this.displayValue = display
          if ( this.displayType !== "tree" ) {
            this.items.push( {text: display, value: this.value.reference} )
          }
          this.loading = false
        } )
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
