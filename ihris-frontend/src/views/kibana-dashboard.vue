<template>
  <iframe
      :src="'/dashboards/app/home#/'"
      height="100%"
      style="border: none;"
      width="100%"
  ></iframe>
</template>

<script>
export default {
  name: "kibana-dashboard",
  created() {
    this.$store.state.minidrawer = true
  }
}
</script>
