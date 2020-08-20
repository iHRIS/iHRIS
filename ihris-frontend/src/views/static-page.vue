<template>
  <v-container>
    <v-card>
      <v-card-title v-if="title" class="primary white--text" dark primary-title><h2>{{title}}</h2></v-card-title>
      <v-card-text class="pa-5">
        <div v-html="rawHTML"></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "static-page",
  data: function() {
    return {
      rawHTML: "Loading...",
      title: "Loading..."
    }
  },
  created: function() {
    fetch("/fhir/DocumentReference/"+this.$route.params.id+"/$html").then(response => {
      response.json().then(data => {
        this.rawHTML = data.html
        this.title = data.title 
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
