<template>
  <ihris-complex-card
    :complexField="field"
    :slotProps="slotProps"
    :label="label"
    :errors="errors"
  >
    <template #default="slotProps">
      <slot :source="slotProps.source"></slot>
    </template>
  </ihris-complex-card>
</template>

<script>
import IhrisComplexCard from "../ihris/ihris-complex-card.vue"

export default {
  name: "fhir-contact-point",
  props: ["field", "slotProps","sliceName","min","max","base-min","base-max","label","path","edit","constraints"],
  data: function() {
    return {
      errors: []
    }
  },
  components: {
    IhrisComplexCard
  }
}
</script>
