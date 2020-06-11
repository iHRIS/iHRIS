<template>
  <div name="slot-outer">
    OUTER PRE SLOT
    <slot v-for="input in inputs" :input="input"></slot>
  </div>
</template>

<script>
export default {
  props: ["max" ],
  data: function() {
    let inputs = []
    for( let idx = 0; idx < this.max; idx++ ) {
      inputs.push( { index: idx } )
    }
    return {
      inputs: inputs
    } 
  },
  components: {
  }
}
</script>
