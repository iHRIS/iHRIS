<template>
  <div v-html="rawHTML"></div>
</template>

<script>
export default {
  name: "static-page",
  data: function() {
    return {
      rawHTML: "Loading..."
    }
  },
  created: function() {
    fetch("/fhir/DocumentReference/"+this.$route.params.id+"/$html").then(response => {
      response.text().then(data => {
        this.rawHTML = data
      }).catch(err=>{
        console.log(err)
        this.rawHTML = "<h1>Error</h1><p>Failed to access requested resource.</p>"
      })
    }).catch(err=> {
      console.log(err)
      this.rawHTML = "<h1>Error</h1><p>Failed to access requested resource.</p>"
    })
  }
}
</script>
