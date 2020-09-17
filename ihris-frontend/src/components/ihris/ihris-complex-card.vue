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
  name: "ihris-complex-card",
  props: ["complexField", "slotProps","label"],
  data: function() {
    return {
      source: { path: "", data: {} }
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH COMPLEX CARD",this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData: function() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.complexField, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.complexField )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
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
