<template>
  <div>
    <slot :source="source"></slot>
  </div>
</template>

<script>
export default {
  name: "fhir-extension",
  props: ["field","sliceName","min","max","base-min","base-max","profile","slotProps","path", "edit","constraints"],
  data: function() {
    return {
      source: { path: "", data: [] },
      errors: [],
      isExtension: true
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
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
        }
        let url
        if ( this.profile ) {
          url = this.profile
        } else {
          url = this.sliceName
        }
        let expression = this.field.replace(/([^:]+):(.+)/, "$1.where(url='"+url+"')")
        this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
        if(this.source.data.length === 0 && expression.startsWith("extension.") && 
          ((!Array.isArray(this.slotProps.source.data)) || Array.isArray(this.slotProps.source.data) && !this.slotProps.source.data.find(dt => dt.extension))) {
          expression = expression.replace("extension.", "")
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
        }
      }
    }
  }
}
</script>
