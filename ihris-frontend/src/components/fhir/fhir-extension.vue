<template>
  <div>
    <slot :source="source"></slot>
  </div>
</template>

<script>
export default {
  name: "fhir-extension",
  props: ["field","sliceName","min","max","base-min","base-max","profile","slotProps","path"],
  data: function() {
    return {
      source: { path: "", data: [], edit: true }
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH EXTENSION",this.path,this.slotProps)
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
          let expression = this.field.replace(/([^:]+):(.+)/, "$1.where(url='"+this.profile+"')")
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
        }
        //console.log(this.source)
      }
    }
  }
}
</script>
