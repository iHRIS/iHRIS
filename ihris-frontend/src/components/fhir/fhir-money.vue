<template>
  <ihris-element :edit="edit" :loading="loading" v-if="!hide">
    <template #form>
      <v-autocomplete 
        :loading="loading" 
        :label="'$t(`App.hardcoded-texts.Currency`) ('+display+')'" 
        v-model="valueCurrency" 
        :items="items.filter(x => !x.code.includes('(deactivated)'))"
        outlined 
        hide-details="auto" 
        :error-messages="err_messages"
        item-text="display"
        item-value="code"
        :disabled="disabled"
        :rules="rules"
        dense
      >
        <template #label>{{$t('App.hardcoded-texts.Currency')}} ({{display}}) <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-autocomplete>
      <v-text-field :error-messages="errors" @change="errors = []" :label="display" :disabled="disabled" v-model="value.value" outlined hide-details="auto" :rules="rules_val" dense>
        <template #label>{{display}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-text-field>
    </template>
    <template #header>
      {{display}}
    </template>
    <template #value v-if="value.currency">
      {{value.currency}} {{value.value.toLocaleString()}}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"
import { eventBus } from "@/main";
import { dataDisplay } from "@/mixins/dataDisplay"

/*
const itemSort = (a,b) => {
  return (a.display === b.display ? (a.code === b.code ? 0 : (a.code < b.code ? -1: 1)) : (a.display < b.display ? -1 : 1) )
}
*/
export default {
  name: "fhir-coding",
  props: ["field","label","sliceName","targetprofile","min","max","base-min","base-max","slotProps","path","binding","edit","readOnlyIfSet",
    "constraints", "displayCondition", "enableBehavior"],
  components: {
    IhrisElement
  },
  mixins: [dataDisplay],
  data: function() {
    return {
      value: { value: "", currency: "" },
      valueCurrency: "",
      valueDisplay: "",
      currencySystem: "urn:iso:std:iso:4217",
      currencyValueSet: "http://hl7.org/fhir/ValueSet/currencies",
      loading: true,
      err_messages: null,
      errors: [],
      //error: false,
      items: [],
      source: { path: "", data: {} },
      disabled: false,
      lockWatch: false
    }
  },
  created: function() {
    //this function is defined under dataDisplay mixin
    this.hideShowField(this.displayCondition, this.enableBehavior)
    this.setupData()
  },
  watch: {
    hide(val) {
      if(val) {
        this.value = { value: "", currency: "" }
      }
    },
    slotProps: {
      handler() {
        //console.log("WATCH CODING",this.path,this.slotProps)
        if ( !this.lockWatch ) {
          this.setupData()
        }
      },
      deep: true
    },
    valueCurrency: function( code ) {
      /*
      if ( this.items ) {
        let findValue = this.items.find( item => item.code === code )
        if ( findValue ) {
          this.value = findValue
        }
      }
      */
      this.value.currency = code
      if ( this.value.currency ) {
        this.$fhirutils.codeLookup( this.currencySystem, this.value.value, this.currencyValueSet ).then( display => {
          this.valueDisplay = display
        } )
      }
      eventBus.$emit(this.path, this.value.value)
    }
  },
  methods: {
    setupData: function() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          // Need to see if this works and figure out what it needs to be
          if ( this.source.data ) {
            this.value = this.source.data
            this.disabled = this.readOnlyIfSet && (!!this.value.value)
            this.valueCurrency = this.value.currency
            this.lockWatch = true
            //console.log("set",this.value,this.valueCurrency)
          }
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("FPATH info",this.path,this.slotProps)
          //console.log("FPATH setting value to",this.field,this.source.data[0],expression,this.slotProps.source.data)
          let value = null
          if ( this.source.data.length == 1 ) {
            value = this.source.data[0]
          } else {
            //check if the path is an array and use path index to get value
            let pathSlices = this.path.split("[")
            let index
            for(let slice of pathSlices) {
              let slices = slice.split("]")
              if(Number.isInteger(parseInt(slices[0]))) {
                index = slices[0]
              }
            }
            if(index || index == 0) {
              value = this.source.data[index]
            }
          }
          if ( value != null ) {
            this.value = value
            this.disabled = this.readOnlyIfSet && (!!this.value.value)
            this.valueCurrency = this.value.currency
            this.lockWatch = true
          }
        }
      }
      let binding = this.currencyValueSet
      let params = undefined
      let language = this.$i18n.locale
      if(language){
        params = { language }
      }
      this.$fhirutils.expand( binding,params ).then( items => {
        this.items = items
        this.loading = false
      } ).catch( err => {
        console.log(err)
        //this.error = true
        this.err_messages = err.message
        this.loading = false
      } )
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
        return [ v => !!v || this.$t(`App.fhir-resources-texts.${this.display}`)+" " + this.$t(`App.hardcoded-texts.is required`) ]
      } else {
        return []
      }
    },
    rules_val: function() {
      const num_check = v => {
        let num = Number(v)
        return !Number.isNaN(num) || this.$t(`App.fhir-resources-texts.${this.display}`)+" " + this.$t(`App.hardcoded-texts.must be a number`)
      }
      let rules = [ num_check ]
      if ( (this.index || 0) < this.min ) {
        rules.push ( v => !!v || this.$t(`App.fhir-resources-texts.${this.display}`)+" " + this.$t(`App.hardcoded-texts.is required`) )
      }
      return rules
    }
  }
}
</script>
