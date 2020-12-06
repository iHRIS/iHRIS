<template>
  <ihris-element :edit="edit" :loading="loading">
    <template #form>
      <v-autocomplete
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
        placeholder="Start typing for selection"
        :rules="rules"
        :disabled="(disabled) || (preset && $route.name === 'resource_add')"
        :error-messages="errors"
        @change="errors = []"
      >
        <template #label>{{display}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-autocomplete>
    </template>
    <template #header>
      {{display}}
    </template>
    <template #value>
      {{displayValue}}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"

const querystring = require('querystring')
export default {
  name: "fhir-reference",
  props: ["field","label","sliceName","targetProfile","min","max","base-min","base-max",
    "slotProps","path","sub-fields","edit","readOnlyIfSet","constraints"],
  components: {
    IhrisElement
  },
  data: function() {
    return {
      source: { path: "", data: {} },
      value: { reference: "" },
      qField: "valueReference",
      loading: false,
      search: "",
      items: [],
      select: "",
      resource: "",
      awaitingSearch: false,
      displayValue: "",
      preset: false,
      disabled: false,
      errors: [],
      lockWatch: false
    }
  },
  created: function() {
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
    }
  },
  methods: {
    setupData: function() {
      if ( this.targetProfile ) {
        this.resource = this.targetProfile.substring( this.targetProfile.lastIndexOf('/')+1 )
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
    querySelections: function( val ) {
      this.loading = true
      let url = "/fhir/"+this.resource+"?"+querystring.stringify( {
        "name:contains": val
      } )
      fetch( url ).then( response => {
        if ( response.ok ) {
          response.json().then( async (data) => {
            this.items = []
            for( let entry of data.entry ) {
              let ref = entry.resource.resourceType+"/"+entry.resource.id
              let item = { value: ref }
              item.text = await this.$fhirutils.resourceLookup( ref )
              this.items.push( item )
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
          this.items.push( {text: display, value: this.value.reference} )
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
