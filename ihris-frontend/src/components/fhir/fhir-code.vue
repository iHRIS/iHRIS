<template>
  <ihris-element :edit="edit" :loading="loading">
    <template #form>
      <v-select 
        :loading="loading" 
        :label="display" 
        v-model="value" 
        :items="items" 
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
        <template #label>{{display}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
      </v-select>
    </template>
    <template #header>
      {{display}}
    </template>
    <template #value>
      {{displayValue}}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"

/*
const itemSort = (a,b) => {
  return (a.display === b.display ? (a.code === b.code ? 0 : (a.code < b.code ? -1: 1)) : (a.display < b.display ? -1 : 1) )
}
*/
export default {
  name: "fhir-code",
  props: ["field","min","max","base-min","base-max","label","binding","slotProps","path","edit","sliceName","readOnlyIfSet","constraints"],
  components: {
    IhrisElement
  },
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
        return [ v => !!v || this.display+" is required" ]
      } else {
        return []
      }
    }
  }
}
</script>
