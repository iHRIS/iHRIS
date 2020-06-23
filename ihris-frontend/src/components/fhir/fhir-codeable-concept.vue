<template>
  <v-card>
    <v-card-subtitle class="primary--text text-uppercase font-weight-bold">{{ display }}</v-card-subtitle>
    <v-card-text>
      <slot :source="source"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "fhir-codeable-concept",
  props: ["field", "slotProps","sliceName","min","max","base-min","base-max","label","path","binding"],
  data: function() {
    return {
      source: { path: "", data: {}, edit: true, binding: this.binding }
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH CODEABLECONCEPT",this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData: function() {
      //console.log("CC",this.field,this.path,this.source,this.slotProps)
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {}, 
          edit: this.slotProps.source.edit, binding: this.binding }
        //console.log("CC binding",this.binding)
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
        } else {
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.field )
        }
        //console.log("CC",this.source)
      }
    }
  },
  computed: {
    display: function() {
      if ( this.slotProps && this.slotProps.input ) return this.slotProps.input.label
      else return this.label
    }
  }
}
</script>
