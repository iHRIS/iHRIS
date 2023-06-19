<template>
  <div :id="'section-'+id" class="ihris-section pb-4">
    <v-card
      class="mx-auto"
      max-width="700"
      outlined
    >
      <v-card-title class=" justify-center darken-1 primary white--text text-uppercase font-weight-bold">{{ $t(`App.fhir-resources-texts.${label}`) }}</v-card-title>
      <v-card-text v-for="(error,idx) in errors" :key="idx" class="error white--text font-weight-bold">{{error}}</v-card-text>
      <v-card-text class="my-3">
        <slot :source="source"></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ihris-questionnaire-section",
  props: ["id", "profile", "sliceName", "field", "slotProps", "label", 
          "description", "path", "constraints", "link-id", "link-field",
    "search-field", "search-field-target",],
  data: function() {
    return {
      isQuestionnaireGroup: true,
      resourceId: '',
      source: { path: "", data: [] },
      errors: []
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData: function() {
      if(this.searchField && this.linkId) {
        let url
        //for searchfield in the form Location:organization with Location being the primary resource, then use _include to retrieve secondary resources
        if(this.searchField.split(':').length === 2) {
          let resource = this.searchField.split(':')[0]
          url = "fhir/" + resource + "?_id=" + this.linkId + "&_include=" + this.searchField
        } else {
          url = "/fhir/" + this.field
          let queryStr = []
          if ( this.profile ) {
            queryStr.push( "_profile="+this.profile )
          }
          let filterValue = ""
          if(this.searchFieldTarget) {
            filterValue = this.searchFieldTarget + "/"
          }
          filterValue += this.linkId
          if ( this.searchField ) {
            queryStr.push( this.searchField+"="+filterValue )
          } else {
            queryStr.push( this.linkField.substring( this.linkField.indexOf('.') +1 ) +"="+filterValue )
          }
          url += "?" + queryStr.join("&")
        }
        url += '&_sort=-_id&_count=1'
        console.log(url);
        fetch( url ).then( response => {
          if ( response.status === 200 ) {
            response.json().then( async data => {
              if ( data.entry && data.entry.length > 0 ) {
                this.resourceId = data.entry[0].resource.id
                this.source = { path: this.field, data: data.entry[0].resource }
              }
            })
          }
        })
      } else {
          if ( this.slotProps && this.slotProps.source ) {
          this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
          if ( this.slotProps.source.fromArray ) {
            this.source.data = this.slotProps.source.data
          } else {
            let url
            if ( this.profile ) {
              url = this.profile
            } else {
              url = this.sliceName
            }

            if(url) {
              let expression = this.field.replace(/([^:]+):(.+)/, "$1.where(url='"+url+"')")
              this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
              if(this.limit) {
                this.source.data = this.$fhirpath.evaluate( this.source.data, this.limit)
              }
            } else {
              if(this.limit) {
                this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.limit )
              } else {
                this.source = this.slotProps.source
              }
            }
          }
          //console.log(this.source)
        }
      }
    }
  }
}
</script>
