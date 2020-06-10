<template>
  <div>
    <h1>EXTENSION {{ data }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FHIRExtension",
  props: ["data"],
  data: function() {
    return {
    }
  }
}
</script>
