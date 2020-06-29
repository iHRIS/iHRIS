<template>
  <div :id="'section-'+name" class="ihris-section" v-if="!edit || !secondary">
    <v-card 
      class="mx-auto"
      max-width="700"
      outlined
      >
      <v-card-title class="primary darken-1 white--text text-uppercase font-weight-bold">{{ title }}</v-card-title>
      <v-card-text class="my-3">
        <slot :source="slotProps.source"></slot>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ihris-section",
  props: ["name", "slotProps","title","description", "edit", "secondary"],
  data: function() {
    return {
      //source: { path: "", data: {} }
    }
  },
  created: function() {
    //this.setupData()
  },
  watch: {
    /*
    slotProps: {
      handler() {
        //console.log("WATCH SECTION",this.path,this.slotProps.source)
        this.setupData()
      },
      deep: true
    }
    */
  },
  methods: {
    /*
    setupData: function() {
      if ( this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.field )
      }
    }
    */
  }
}
</script>
