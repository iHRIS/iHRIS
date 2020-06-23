<template>
  <div>
    <v-container v-if="source.edit">
      <v-text-field :label="display" v-model="value" outlined hide-details="auto" dense>
      </v-text-field>
    </v-container>
    <div v-else>
      <v-row dense>
        <v-col cols="3" class="font-weight-bold">{{ display }}</v-col><v-col cols="9">{{ value }}</v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "fhir-string",
  props: ["field", "label", "min", "max", "id", "path", "slotProps", "sliceName","base-min","base-max"],
  data: function() {
    return {
      source: { path: "", data: {}, edit: true },
      value: ""
    }
  },
  created: function() {
    //console.log("CREATE STRING",this.field,this.slotProps)
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH STRING",this.field,this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {}, edit: this.slotProps.source.edit }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.value = this.source.data
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.field
          if ( expression.includes('value[x]:') ) expression = expression.substring( 9 )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          if ( this.source.data.length == 1 ) {
            this.value = this.source.data[0]
          }
        }
        //console.log(this.source)
      }
    }
  },
  computed: {
    index: function() {
      if ( this.slotProps ) return this.slotProps.input
      else return undefined
    },
    display: function() {
      if ( this.slotProps && this.slotProps.input) return this.slotProps.input.label
      else return this.label
    }
  }
}
</script>
