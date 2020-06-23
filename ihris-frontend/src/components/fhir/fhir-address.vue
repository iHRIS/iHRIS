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
  name: "fhir-address",
  props: ["field", "slotProps","sliceName","min","max","base-min","base-max","label","path"],
  data: function() {
    return {
      source: { path: "", data: {}, edit: true }
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH CPOINT",this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData: function() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {}, edit: this.slotProps.source.edit }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
        } else {
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.field )
        }
        //console.log(this.source)
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
