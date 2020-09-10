<template>
  <ihris-complex-card 
    :field="field" 
    :slotProps="slotProps"
    :sliceName="sliceName"
    :min="min"
    :max="max"
    :base-min="baseMin"
    :base-max="baseMax"
    :label="label"
    :path="path"
    :edit="edit"
  >
    <template #default="slotProps">
      <slot :source="slotProps.source"></slot>
    </template>
  </ihris-complex-card>
</template>

<script>
import IhrisComplexCard from "../ihris/ihris-complex-card.vue"

export default {
  name: "fhir-backbone-element",
  props: ["field", "slotProps","sliceName","min","max","base-min","base-max","label","path","edit"],
  data: function() {
    return {}
  },
  components: {
    IhrisComplexCard
  }
}
</script>
