<template>
  <ihris-element :edit="edit" :loading="false">
    <template #form>
      <v-text-field :label="display" :disabled="disabled" :name="field" v-model.number="value" outlined hide-details="auto" :rules="rules" dense>
        <template #label>{{display}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-text-field>
    </template>
    <template #header>
      {{display}}
    </template>
    <template #value>
      {{value}}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"

export default {
  name: "fhir-positive-int",
  props: ["field", "label", "min", "max", "id", "path", "slotProps", "sliceName","base-min","base-max", "edit", "readOnlyIfSet"],
  components: {
    IhrisElement
  },
  data: function() {
    return {
      source: { path: "", data: {} },
      value: "",
      disabled: false
    }
  },
  created: function() {
    //console.log("CREATE POSITIVE INT",this.field,this.slotProps)
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH POSITIVE INT",this.field,this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.value = this.source.data
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          if ( this.source.data.length == 1 ) {
            this.value = this.source.data[0]
          }
        }
        this.disabled = this.readOnlyIfSet && (!!this.value)
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
      if ( this.slotProps && this.slotProps.input ) return this.slotProps.input.label
      else return this.label
    },
    required: function() {
      return (this.index || 0) < this.min
    },
    rules: function() {
      const num_check = v => {
        let num = Number(v)
        return (Number.isInteger(num) && num >= 0) || this.display+" must be a positive integer"
      }
      let rules = [ num_check ]
      if ( this.required ) {
        rules.push ( v => !!v || this.display+" is required" )
      }
      return rules
    }
  }
}
</script>
