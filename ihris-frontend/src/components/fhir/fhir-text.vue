<template>
  <v-textarea :label="label" v-model="value" outlined hide-details="auto" dense>
  </v-textarea>
</template>

<script>
export default {
  name: "fhir-text",
  props: [ "field", "label", "min", "max", "path", "edit", "sliceName", "slotProps" ],
  data: function() {
    return {
      source: { path: "", data: {} },
      value: ""
    }
  }
}
</script>
