<template>
  <iframe :src="'kibana/app/kibana#/dashboard/'+$route.params.id+'?embed=true'" width="100%" height="100%"></iframe>
</template>

<script>
export default {
  name: "kibana-dashboard",
  props: [ "id" ]
}
</script>

// http://100.66.44.100:9001/app/dashboards#/view/a1685950-b387-11ec-b785-77bd68b3bb25