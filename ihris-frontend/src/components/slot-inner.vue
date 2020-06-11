<template>
  <div name="slot-inner">
    INNER PRE SLOT {{ input }}
    <slot/>
  </div>
</template>

<script>
export default {
  props: ["slotProps"],
  data: function() {
    return {
    } 
  },
  computed: {
    input: function() {
      if ( this.slotProps ) return this.slotProps.input
      else return undefined
    }
  }
}
</script>
