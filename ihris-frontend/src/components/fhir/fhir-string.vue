<template>
  <v-container>
    <v-text-field :label="display" :name="field" v-model="value" outlined hide-details="auto" dense>
    </v-text-field>
  </v-container>
</template>

<script>
export default {
  name: "fhir-string",
  props: ["field", "label", "min", "max", "id", "path", "slotProps", "start-value","sliceName","base-min","base-max"],
  data: function() {
    return {
      value: ""
    }
  },
  created: function() {
    this.value = this.startValue
  },
  computed: {
    index: function() {
      if ( this.slotProps ) return this.slotProps.input
      else return undefined
    },
    display: function() {
      if ( this.slotProps ) return this.slotProps.input.label
      else return this.label
    }
  }
}
</script>
