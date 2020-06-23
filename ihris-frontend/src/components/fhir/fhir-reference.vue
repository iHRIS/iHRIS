<template>
  <v-card>
    <v-card-subtitle class="primary--text text-uppercase font-weight-bold">{{ label }}</v-card-subtitle>
    <v-card-text>
      <slot :source="source"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "fhir-reference",
  props: ["field","label","sliceName","targetprofile","min","max","base-min","base-max","slotProps","path"],
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
        //console.log("WATCH REFERENCE",this.path,this.slotProps)
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
          let expression = this.field
          if ( expression.includes('value[x]:') ) expression = expression.substring( 9 )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
        }
        //console.log(this.source)
      }
    }
  }
}
</script>
