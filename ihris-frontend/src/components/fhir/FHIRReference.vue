<template>
  <div>
    <h1>REFERENCE {{ data }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FHIRReference",
  props: ["data"],
  data: function() {
    return {
    }
  }
}
</script>
