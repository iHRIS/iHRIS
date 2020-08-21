<template>
  <v-container>
    <v-card v-if="rawHTML">
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
  props: [ "id", "blank-on-err" ],
  data: function() {
    return {
      rawHTML: null,
      title: "Loading..."
    }
  },
  created: function() {
    if ( !this.blankOnErr ) {
      this.rawHTML = "Loading..."
    }
    fetch("/fhir/DocumentReference/"+(this.id || this.$route.params.id)+"/$html").then(response => {
      if ( response.ok ) {
        response.json().then(data => {
          this.rawHTML = data.html
          this.title = data.title 
        }).catch(err=>{
          console.log(err)
          if ( this.blankOnErr ) {
            this.rawHTML = null
          } else {
            this.title = "Error"
            this.rawHTML = "<p>Failed to access requested resource.</p>"
          }
        })
      } else {
        if ( this.blankOnErr ) {
          this.rawHTML = null
        } else {
          this.title = "Error"
          this.rawHTML = "<p>Failed to access requested resource.</p>"
        }
      }
    }).catch(err=> {
      console.log(err)
      if ( this.blankOnErr ) {
        this.rawHTML = null
      } else {
        this.title = "Error"
        this.rawHTML = "<p>Failed to access requested resource.</p>"
      }
    })
  }
}
</script>
