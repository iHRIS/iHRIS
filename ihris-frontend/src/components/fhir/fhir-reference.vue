<template>
  <v-card>
    <v-card-subtitle class="text-uppercase font-weight-bold">{{ label }}</v-card-subtitle>
    <v-card-text>
      <v-autocomplete
        v-if="edit"
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        :label="display"
        outlined
      ></v-autocomplete>
      <v-row dense v-else>
        <v-col cols="3" class="font-weight-bold">{{display}}</v-col>
        <v-col cols="9" v-if="loading">
          <v-progress-linear indeterminate color="primary"></v-progress-linear>
        </v-col>
        <v-col cols="9" v-else>{{displayValue}}</v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>
const querystring = require('querystring')
export default {
  name: "fhir-reference",
  props: ["field","label","sliceName","targetProfile","min","max","base-min","base-max",
    "slotProps","path","sub-fields","edit"],
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
      displayValue: ""
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH REFERENCE",this.path,this.slotProps)
        this.setupData()
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
          this.select = this.source.data.reference
          //this.select.reference = this.value.reference
        }
      }
    },
    querySelections: function( val ) {
      this.loading = true
      let url = "/fhir/"+this.resource+"?"+querystring.stringify( {
        "name:contains": val,
        "_elements": "name"
      } )
      fetch( url ).then( response => {
        response.json().then( data => {
          this.items = []
          for( let entry of data.entry ) {
            this.items.push( {text: entry.resource.name, value: entry.resource.resourceType+"/"+entry.resource.id} )
          }
          this.loading = false
        } )
      } )
    },
    getDisplay: function() {
      if ( !this.edit && this.value && this.value.reference ) {
        this.loading = true
        fetch( "/fhir/"+this.value.reference +"?_elements=name" ).then( response => {
          response.json().then( data => {
            this.displayValue = data.name
            this.items.push({text: data.name, value: this.value.reference})
            this.loading = false
          } )
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
    }
  }

}
</script>
