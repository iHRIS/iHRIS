<template>
  <v-container class="my-3">
    <slot :source="source"></slot>
  </v-container>
</template>

<script>
export default {
  name: "ihris-secondary",
  props: ["title","field","profile","slotProps","link-field"],
  data: function() {
    return {
      source: { data: {}, path: this.field, edit: true }
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
      if ( this.slotProps.source ) {
        this.source = { path: this.field, data: {}, edit: this.slotProps.source.edit }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
        } else {
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.field )
        }
        //console.log(this.source)
      }
    }
  }
}

</script>
