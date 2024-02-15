<template>
  <v-card 
    class="mx-auto"
    max-width="700"
    outlined
    >
    <v-card-title class="primary white--text font-weight-bold">{{ $t(`App.fhir-resources-texts.${label}`) }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text v-for="(error,idx) in errors" :key="idx" class="error white--text font-weight-bold">{{error}}</v-card-text>
    <v-card-text class="my-3">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ihris-questionnaire-group",
  props: ["label", "path", "constraints"],
  data: function() {
    return {
      isQuestionnaireGroup: true,
      errors: []
    }
<<<<<<< HEAD
=======
  },
  created: function() {
    this.hideShowField(this.displayCondition)
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
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.source.fromArray = true
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
        if(this.source.data.length > 1) {
          //check if the path is an array and use path index to get value
          let pathSlices = this.path.split("[")
          let index
          for(let slice of pathSlices) {
            let slices = slice.split("]")
            if(Number.isInteger(parseInt(slices[0]))) {
              index = slices[0]
            }
          }
          if(index || index == 0) {
            this.source.data = this.source.data[index]
          }
        }
      }
    }
>>>>>>> upstream/master
  }
}
</script>
