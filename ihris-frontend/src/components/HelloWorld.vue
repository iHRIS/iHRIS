<template>
  <v-container>
    <StaticPage></StaticPage>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({}),
  components: {
    StaticPage: () => {
      return new Promise(resolve => {
        fetch("/fhir/DocumentReference/page-about/$html").then(response => {
          response.text().then(data => {
            resolve({template: data})
          }).catch(err=>{
            console.log(err.message)
            resolve({template: "<h1>Error</h1><p>Failed to access requested resource.</p>"})
          })
        }).catch(err=> {
          console.log(err.message)
          resolve({template: "<h1>Error</h1><p>Failed to access requested resource.</p>"})
        })
      })
    }
  }
};
</script>
