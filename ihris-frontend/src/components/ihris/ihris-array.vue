<template>
  <div>
    <div v-if="simpleDisplay">
      <v-row dense>
        <v-col :cols="$store.state.cols.header" class="font-weight-bold">{{$t(`App.fhir-resources-texts.${label}`)}}</v-col><v-col :cols="$store.state.cols.header">{{simpleValue}}</v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
    <v-container v-else>
      <v-card
      elevation="0">
        <v-system-bar
            color="secondary"
            dark
          class="pa-4 white--text font-weight-bold"
          v-if="edit"
          >
          {{ $t(`App.fhir-resources-texts.${label}`) }}
          <v-spacer></v-spacer>
          <v-btn v-if="subAvailable" icon @click="removeRow()"><v-icon>mdi-minus-circle</v-icon></v-btn>
          <v-btn v-if="addAvailable" icon @click="addRow()"><v-icon color="green">mdi-plus-circle</v-icon></v-btn>
        </v-system-bar>
        <slot v-for="(input, index) in inputs" :count="index" :input="input" :source="input.source"></slot>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ihris-array",
  props: ["label", "min", "max", "id", "path", "slotProps", "field", "fieldType", "profile", "targetProfile", "sliceName", "edit" ],
  data: function() {
    return {
      inputs: [],
      source: { path: "", data: [] },
      isArray: true,
      lockWatch: false
    }
  },
  created: function() {
    this.setupInputs()
  },
  watch: {
    slotProps: {
      handler() {
        if ( !this.lockWatch ) {
          //console.log("WATCHARR",this.path,this.slotProps.source)
          this.setupInputs()
        }
      },
      deep: true
    }
  },
  methods: {
    setupInputs: function() {
      this.inputs = []
      this.source = { path: this.path, data: {} }
      let path = this.path
      if ( this.slotProps && this.slotProps.source ) {
        let expression = this.field
        if ( this.sliceName ) {
          let profile = this.profile
          if(!profile) {
            profile = this.sliceName
          }
          expression = this.field.replace(/([^:]+):(.+)/, "$1.where(url='"+profile+"')")
          // this is when a field is an extension and it has been set repeat true directly, repeat is not set to group
          if(expression.startsWith("value[x]")) {
            expression = expression.replace("value[x]", "extension")
          }
        }
        this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression)
        if ( this.source.data.length > 0 ) {
          this.lockWatch = true
        }
      }
      for( let idx = 0; idx < this.actualMin; idx++ ) {
        let label = this.label
        if ( this.displayIndex ) {
          label += " ("+(idx+1)+")"
        }
        let input = { label: label, index: idx, data: undefined } 
        if ( this.source.data[idx] ) {
          input.source = { data: this.source.data[idx], path: path+"["+idx+"]", fromArray: true }
        }
        this.inputs.push( input )
      }
    },
    addRow: function() {
      this.lockWatch = true
      if ( this.addAvailable ) {
        let label = this.label
        if ( this.displayIndex ) {
          label += " ("+(this.inputs.length+1)+")"
        }
        this.inputs.push( { label: label, index: this.inputs.length } )
      }
    },
    removeRow: function() {
      if ( this.subAvailable ) {
        this.inputs.splice(-1)
      }
    },
    getField: function() {
      return this.field
    }
  },
  computed: {
    actualMin: function() {
      return Math.max( this.min, ( this.source.data.length > 0 ? this.source.data.length : 0 ) )
      //return this.min < 1 ? 1 : this.min
    },
    addAvailable: function() {
      return this.max === "*" || this.inputs.length < this.max
    },
    displayIndex: function() {
      return this.max === "*" || this.max > 1
    },
    subAvailable: function() {
      return this.actualMin < this.inputs.length
    },
    simpleDisplay: function() {
      return !this.edit && [ "string" ].includes(this.fieldType)
    },
    simpleValue: function() {
      return this.source.data.join(" ")
    }

  }
}
</script>
