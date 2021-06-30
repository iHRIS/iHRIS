<template>
  <iframe :src="'/kibana/app/kibana#/dashboard/'+$route.params.id+'?embed=true'" width="100%" height="100%"></iframe>
</template>

<script>
export default {
  name: "kibana-dashboard",
  props: [ "id" ],
  created() {
    console.log('/kibana/app/kibana#/dashboard/'+this.$route.params.id+'?embed=true');
  }
}
</script>
