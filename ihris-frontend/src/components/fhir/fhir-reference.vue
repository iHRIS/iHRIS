<template>
  <div>
    <h2>{{label}}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "fhir-reference",
  props: ["field","label","sliceName","targetprofile","min","max","base-min","base-max"],
  data: function() {
    return {
    }
  },
  mounted: function() {
             /*
    this.$slots.default.forEach(vNode => {
      console.log(vNode)
    })
    */
  }
}
</script>
