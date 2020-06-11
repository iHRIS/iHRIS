<template>
  <v-container>
    <v-card>
      <v-system-bar
        color="secondary"
        dark
      >
        {{ label }}
        <v-spacer></v-spacer>
        <v-btn v-if="subAvailable" icon @click="removeRow()"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn v-if="addAvailable" icon @click="addRow()"><v-icon>mdi-plus</v-icon></v-btn>
        </v-system-bar>
      <slot v-for="input in inputs" :input="input"></slot>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "fhir-array",
  props: ["label", "min", "max", "id", "path"],
  data: function() {
    return {
      inputs: []
    }
  },
  created: function() {
    for( let idx = 0; idx < this.actualMin; idx++ ) {
      let label = this.label
      if ( this.displayIndex ) {
        label += " ("+(idx+1)+")"
      }
      this.inputs.push( { label: label, index: idx } )
    }
  },
  methods: {
    addRow: function() {
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
      return this.min < 1 ? 1 : this.min
    },
    addAvailable: function() {
      return this.max === "*" || this.inputs.length < this.max
    },
    displayIndex: function() {
      return this.max === "*" || this.max > 1
    },
    subAvailable: function() {
      return this.actualMin < this.inputs.length
    }
  }
}
</script>
