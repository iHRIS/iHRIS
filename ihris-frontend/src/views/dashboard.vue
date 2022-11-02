<template>
  <iframe :src="'/dashboards/app/dashboards#/view/'+$route.params.id+'?embed=true'" width="100%" height="100%"></iframe>
</template>

<script>
export default {
  name: "dashboard",
  props: [ "id" ]
}
</script>
