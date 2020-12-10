<template>
  <ihris-element :edit="edit" :loading="false">
    <template #form>
      <v-text-field 
        :error-messages="errors" 
        @change="errors = []" 
        :disabled="disabled" 
        :label="display" 
        v-model="value" 
        outlined 
        hide-details="auto" 
        :rules="rules" 
        :type="isPassword ? (showPassword ? 'text' : 'password') : 'text'"
        :append-icon="isPassword ? (showPassword ? 'mdi-eye' : 'mdi-eye-off') : ''"
        @click:append="showPassword = !showPassword"
        dense
      >
      <template #label>{{display}}<span v-if="required" class="red--text font-weight-bold">*</span></template>
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
  name: "fhir-string",
  props: ["field", "label", "min", "max", "id", "path", "slotProps", "sliceName","base-min","base-max","edit","readOnlyIfSet",
    "constraints", "displayType"],
  components: {
    IhrisElement
  },
  data: function() {
    return {
      source: { path: "", data: {} },
      value: "",
      showPassword: false,
      qField: "valueString",
      disabled: false,
      errors: [],
      lockWatch: false
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
        if ( !this.lockWatch ) {
          this.setupData()
        }
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
          this.lockWatch = true
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          if ( this.source.data.length == 1 ) {
            this.value = this.source.data[0]
            this.lockWatch = true
          }
        }
        this.disabled = this.readOnlyIfSet && (!!this.value)
        //console.log(this.source)
      }
    }
  },
  computed: {
    index: function() {
      if ( this.slotProps && this.slotProps.input ) return this.slotProps.input.index
      else return undefined
    },
    display: function() {
      if ( this.slotProps && this.slotProps.input) return this.slotProps.input.label
      else return this.label
    },
    required: function() {
      return (this.index || 0) < this.min 
    },
    rules: function() {
      if ( this.required ) {
        return [ v => !!v || this.display+" is required" ]
      } else {
        return []
      }
    },
    isPassword: function() {
      return this.displayType === 'password'
    }
  }
}
</script>
