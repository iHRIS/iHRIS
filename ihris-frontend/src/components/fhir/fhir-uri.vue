<template>
  <ihris-element :edit="edit" :loading="false" v-if="!hide">
    <template #form>
      <v-text-field :error-messages="errors" @change="errors = []" :disabled="disabled" :label="display" v-model="value" outlined hide-details="auto" :rules="rules" dense>
        <template #label>{{$t(`App.fhir-resources-texts.${display}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-text-field>
    </template>
    <template #header>
      {{$t(`App.fhir-resources-texts.${display}`)}}
    </template>
    <template #value>
      {{value}}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"
import { eventBus } from "@/main";
import { dataDisplay } from "@/mixins/dataDisplay"

export default {
  name: "fhir-uri",
  props: ["field", "label", "min", "max", "id", "path", "slotProps", "sliceName","base-min","base-max", "edit","readOnlyIfSet",
    "constraints", "displayCondition"],
  components: {
    IhrisElement
  },
  mixins: [dataDisplay],
  data: function() {
    return {
      source: { path: "", data: {} },
      value: "",
      qField: "valueUri",
      disabled: false,
      errors: [],
      lockWatch: false
    }
  },
  created: function() {
    //this function is defined under dataDisplay mixin 
    this.hideShowField(this.displayCondition)
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH URI",this.field,this.path,this.slotProps)
        if ( !this.lockWatch ) {
          this.setupData()
        }
      },
      deep: true
    },
    value(val) {
      eventBus.$emit(this.path, val)
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
      if ( this.slotProps ) return this.slotProps.input
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
      let rules = [ v => /^\S*$/.test(v) || this.display+" must be a URI" ]
      if ( this.required ) {
        rules.push( v => !!v || this.display+" is required" )
      }
      return rules
    }
  }
}
</script>
