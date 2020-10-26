<template>
  <div>
    <div v-if="simpleDisplay">
      <v-row dense>
        <v-col :cols="$store.state.cols.header" class="font-weight-bold">{{label}}</v-col><v-col :cols="$store.state.cols.header">{{simpleValue}}</v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
    <v-container v-else>
      <v-card>
        <v-system-bar
          color="secondary"
          dark
          v-if="edit"
          >
          {{ label }}
          <v-spacer></v-spacer>
          <v-btn v-if="subAvailable" icon @click="removeRow()"><v-icon class="font-weight-bold">mdi-minus</v-icon></v-btn>
          <v-btn v-if="addAvailable" icon @click="addRow()"><v-icon>mdi-plus</v-icon></v-btn>
        </v-system-bar>
        <slot v-for="input in inputs" :input="input" :source="input.source"></slot>
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
          this.lockWatch = true
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
          expression = this.field.replace(/([^:]+):(.+)/, "$1.where(url='"+this.profile+"')")
        }
        this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression)
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
      //console.log("ARR inputs",this.id,this.source,this.inputs)
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
      console.log(this.inputs)
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
