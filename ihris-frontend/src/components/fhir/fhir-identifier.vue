<template>
  <div>
    <v-card-title>{{ display }}</v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: "fhir-identifier",
  props: ["field", "slotProps","sliceName","min","max","base-min","base-max","label"],
  data: function() {
    return {
    }
  },
  computed: {
    display: function() {
      if ( this.slotProps ) return this.slotProps.input.label
      else return this.label
    }
  }
}
</script>
