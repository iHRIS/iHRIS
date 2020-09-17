<template>
  <ihris-complex-card
    :complexField="field"
    :slotProps="slotProps"
    :label="label"
  >
    <template #default="slotProps">
      <slot :source="slotProps.source"></slot>
    </template>
  </ihris-complex-card>
</template>

<script>
import IhrisComplexCard from "../ihris/ihris-complex-card.vue"

export default {
  name: "fhir-period",
  props: ["field", "slotProps","sliceName","min","max","base-min","base-max","label","path","edit"],
  data: function() {
    return { }
  },
  components: {
    IhrisComplexCard
  }
}
</script>
