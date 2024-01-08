<template>
  <v-container v-if="!hide">
    <v-autocomplete 
      :loading="loading" 
      :label="label" 
      v-model="valueCode" 
      :items="items.filter(x => !x.code.includes('(deactivated)'))"
      outlined 
      hide-details="auto" 
      :error-messages="errors"
      item-text="display"
      item-value="code"
      :rules="rules"
      dense
      @change="errors = []"
      >
      <template #label>{{$t(`App.fhir-resources-texts.${label}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
    </v-autocomplete>
  </v-container>
</template>

<script>
/*
const itemSort = (a,b) => {
  return (a.display === b.display ? (a.code === b.code ? 0 : (a.code < b.code ? -1: 1)) : (a.display < b.display ? -1 : 1) )
}
*/
import { eventBus } from "@/main";
import { dataDisplay } from "@/mixins/dataDisplay"
export default {
  name: "fhir-coding",
  props: ["id", "field", "definition", "label", "path", "binding", "edit", "min", "max", "constraints", "displayCondition","slotProps", "initial"],
  mixins: [dataDisplay],
  data: function() {
    return {
      value: { system: "", code: "", display: "" },
      savedValueCode: "",
      valueCode: "",
      loading: true,
      errors: [],
      //error: false,
      items: [],
      source: { path: "", data: {}, binding: this.binding },
      qField: "valueCoding",
      lockWatch: false
    }
  },
  created: function() {
    //this function is defined under dataDisplay mixin
    this.hideShowField(this.displayCondition)
    this.setupData()
    if(this.initial && !this.$route.params.id) {
      this.value = this.initial
    }
  },
  watch: {
    slotProps: {
      handler() {
        if ( !this.lockWatch ) {
          this.setupData()
        }
      },
      deep: true
    },
    valueCode: function() {
      if ( this.items ) {
        this.value = this.items.find( item => item.code === this.valueCode )
      }
      eventBus.$emit(this.path, this.value.system + "#" + this.value.code)
    }
  },
  methods: {
    setupData: function() {
      if ( this.slotProps && this.slotProps.source) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {}, 
          binding: this.binding || this.slotProps.source.binding }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.savedValueCode = this.source.data
          this.lockWatch = true
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
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
            if(typeof value === 'object') {
              this.value = value
              this.savedValueCode = this.value.code
            } else {
              this.savedValueCode = value
            }
            this.lockWatch = true
          }
        }
        this.disabled = this.readOnlyIfSet && (!!this.value)
      }
      let binding = this.binding || this.slotProps.source.binding
      this.$fhirutils.expand( binding ).then( items => {
        this.items = items
        let item = this.items.find( item => this.savedValueCode && item.code === this.savedValueCode )
        if(item) {
          this.value = item
        }
        if(this.value) {
          this.valueCode = this.value.code
        }
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
    required: function() {
      return this.min > 0 
    },
    rules: function() {
      if ( this.required ) {
        return [ v => !!v || this.label+" is required" ]
      } else {
        return []
      }
    }
  }
}
</script>
