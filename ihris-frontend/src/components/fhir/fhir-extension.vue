<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "fhir-extension",
  props: ["field","sliceName","min","max","base-min","base-max","profile"],
  data: function() {
    return {
    }
  }
}
</script>
