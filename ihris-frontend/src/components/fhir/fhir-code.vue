<template>
  <ihris-element :edit="edit" :loading="loading" v-if="!hide">
    <template #form>
      <v-autocomplete 
        :loading="loading" 
        :label="$t(`App.fhir-resources-texts.${display}`)"
        v-model="value" 
        :items="items.filter(x => !x.code.includes('(deactivated)'))"
        outlined 
        hide-details="auto" 
        :error-messages="errors"
        item-text="display"
        item-value="code"
        :disabled="disabled"
        :rules="rules"
        dense
        @change="errors = []"
      >
        <template #label>{{$t(`App.fhir-resources-texts.${display}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-autocomplete>
    </template>
    <template #header>
      {{$t(`App.fhir-resources-texts.${display}`)}}
    </template>
    <template #value>
      {{displayValue}}
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
  name: "fhir-code",
  props: ["field","min","max","base-min","base-max","label","binding","slotProps","path","edit","sliceName","readOnlyIfSet","constraints", "displayCondition", "enableBehavior"],
  components: {
    IhrisElement
  },
  mixins: [dataDisplay],
  data: function() {
    return {
      value: "",
      loading: true,
      errors: [],
      //error: false,
      items: [],
      source: { path: "", data: {}, binding: this.binding },
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
    slotProps: {
      handler() {
        //console.log("WATCH CODE",this.field,this.path,this.slotProps)
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
            this.lockWatch = true
          }
        }
        this.disabled = this.readOnlyIfSet && (!!this.value)
        //console.log(this.source)
      }
      let binding = this.binding || this.slotProps.source.binding
      this.$fhirutils.expand( binding ).then( items => {
        this.items = items 
        this.loading = false
      } ).catch( err => {
        console.log(err)
        //this.error = true
        this.errors.push( err.message )
        this.loading = false
      } )
    }
  },
  computed: {
    index: function () {
      if ( this.slotProps && this.slotProps.input ) return this.slotProps.input.index
      else return undefined
    },
    display: function() {
      if ( this.slotProps && this.slotProps.input) return this.slotProps.input.label
      else return this.label
    },
    displayValue: function() {
      let found = this.items.find( item => item.code === this.value )
      if ( found ) {
        return found.display
      } else {
        return ""
      }
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
    }
  }
}
</script>
