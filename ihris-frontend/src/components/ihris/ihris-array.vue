<template>
  <div>
    <div v-if="simpleDisplay">
      <v-row v-if="simpleDisplay" dense>
        <v-col cols="3" class="font-weight-bold">{{label}}</v-col><v-col cols="9">{{simpleValue}}</v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
    <div v-else>
      <v-card>
        <v-system-bar
          color="secondary"
          dark
          v-if="source.edit"
        >
          {{ label }}
          <v-spacer></v-spacer>
          <v-btn v-if="subAvailable" icon @click="removeRow()"><v-icon>mdi-minus</v-icon></v-btn>
          <v-btn v-if="addAvailable" icon @click="addRow()"><v-icon>mdi-plus</v-icon></v-btn>
          </v-system-bar>
        <slot v-for="input in inputs" :input="input" :source="input.source"></slot>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ihris-array",
  props: ["label", "min", "max", "id", "path", "slotProps", "field", "fieldType", "profile", "targetProfile", "sliceName" ],
  data: function() {
    return {
      inputs: [],
      source: { path: "", data: [], edit: true },
      baseIndex: 0
    }
  },
  created: function() {
    this.setupInputs()
  },
  watch: {
    slotProps: {
      handler() {

        //console.log("WATCHARR",this.path,this.slotProps.source)
        this.setupInputs()
      },
      deep: true
    }
  },
  methods: {
    setupInputs: function() {
      this.inputs = []
      this.source = { path: this.path, data: {}, edit: true }
      let path = this.path
      if ( path.endsWith( ']' ) ) {
        let lastIdx = path.lastIndexOf( '[' )
        try {
          this.baseIndex = Number.parseInt(path.substring( lastIdx+1, path.length-1 ) )
          path = path.substring(0, lastIdx)
        } catch( err ) {
          console.log("Invalid index in",path)
        }
      }
      if ( this.slotProps && this.slotProps.source ) {
        this.source.edit = this.slotProps.source.edit
        let expression = this.field.replace(/([^:]+):(.+)/, "$1.where(url='"+this.profile+"')")
        this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression)
      }
      for( let idx = 0; idx < this.actualMin; idx++ ) {
        let label = this.label
        if ( this.displayIndex ) {
          label += " ("+(idx+1)+")"
        }
        let input = { label: label, index: idx, data: undefined } 
        if ( this.source.data[idx] ) {
          input.source = { data: this.source.data[idx], path: path+"["+(this.baseIndex+idx)+"]", fromArray: true, edit: true }
          if ( this.slotProps && this.slotProps.source ) {
            input.source.edit = this.slotProps.source.edit
          }
        }
        this.inputs.push( input )
      }
    },
    addRow: function() {
      if ( this.addAvailable ) {
        let label = this.label
        if ( this.displayIndex ) {
          label += " ("+(this.inputs.length+1)+")"
        }
        this.inputs.push( { label: label, index: this.baseIndex + this.inputs.length } )
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
      return Math.max( this.min, ( this.source.data.length > 0 ? this.source.data.length : 1 ) )
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
      return !this.source.edit && [ "string" ].includes(this.fieldType)
    },
    simpleValue: function() {
      return this.source.data.join(" ")
    }

  }
}
</script>
