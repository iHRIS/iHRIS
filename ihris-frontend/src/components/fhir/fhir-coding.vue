<template>
  <ihris-element :edit="edit" :loading="loading">
    <template #form>
      <v-select 
        :loading="loading" 
        :label="display" 
        v-model="valueCode" 
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
      {{valueDisplay || value.display || ""}}
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
  name: "fhir-coding",
  props: ["field","label","sliceName","targetprofile","min","max","base-min","base-max","slotProps","path","binding","edit","readOnlyIfSet",
    "constraints"],
  components: {
    IhrisElement
  },
  data: function() {
    return {
      value: { system: "", code: "", display: "" },
      valueCode: "",
      valueDisplay: "",
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
        //console.log("WATCH CODING",this.path,this.slotProps)
        if ( !this.lockWatch ) {
          this.setupData()
        }
      },
      deep: true
    },
    valueCode: function( code ) {
      if ( this.items ) {
        let findValue = this.items.find( item => item.code === code )
        if ( findValue ) {
          this.value = findValue
        }
      }
      if ( this.value.system && this.value.code ) {
        this.$fhirutils.codeLookup( this.value.system, this.value.code, this.binding || this.source.binding ).then( display => {
          this.valueDisplay = display
        } )
      }
    }
  },
  methods: {
    setupData: function() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {}, 
          binding: this.binding || this.slotProps.source.binding }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          // Need to see if this works and figure out what it needs to be
          if ( this.source.data ) {
            this.value = this.source.data
            this.valueCode = this.value.code
            this.lockWatch = true
            //console.log("set",this.value,this.valueCode)
          }
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("FPATH info",this.path,this.slotProps)
          //console.log("FPATH setting value to",this.field,this.source.data[0],expression,this.slotProps.source.data)
          if ( this.source.data[0] ) {
            this.value = this.source.data[0]
            this.valueCode = this.value.code
            this.lockWatch = true
          }
        }
        this.disabled = this.readOnlyIfSet && (!!this.valueCode)
      }
      let binding = this.binding || this.slotProps.source.binding
      this.$fhirutils.expand( binding ).then( items => {
        this.items = items 
        this.loading = false
      } ).catch( err => {
        console.log(err)
        //this.error = true
        this.errors = err.message
        this.loading = false
      } )
      //console.log("CODING",binding)
      /*
      let lastSlash = binding.lastIndexOf('/')
      let lastPipe = binding.lastIndexOf('|')
      let valueSetId = binding.slice(lastSlash+1, (lastPipe !== -1 ? lastPipe : binding.length ))
      //console.log("CODING",lastSlash,lastPipe,valueSetId)
      fetch("/fhir/ValueSet/"+valueSetId+"/$expand").then(response=> {
        if( response.ok ) {
          response.json().then(data=>{
            try {
              if ( data.expansion.contains && data.expansion.contains.length > 0 ) {
                if ( data.expansion.contains[0].hasOwnProperty("display") ) {
                  this.items = data.expansion.contains
                } else if ( data.compose && data.compose.include ) {
                  this.items = data.expansion.contains.map( code => {
                    let include = data.compose.include.find( inc => inc.system === code.system )
                    if ( include && include.concept ) {
                      let display = include.concept.find( concept => concept.code === code.code )
                      if ( display ) {
                        code.display = display.display
                      }
                    }
                    return code
                  } )
                }
              }
              this.items.sort( itemSort )
            } catch(err) {
              this.error = true
              this.errors = "Invalid response from server."
            }
            this.loading = false
          }).catch(err=>{
            this.errors = err.message
            this.error = true
            this.loading = false
          })
        } else {
          // Try loading valueset without expansion if expand failed.
          console.log("Failed to get ValueSet Expansion for "+valueSetId)
          fetch("/fhir/ValueSet/"+valueSetId).then(response=> {
            if ( response.ok ) {
              response.json().then(data=> {
                this.items = []
                if ( data.compose && data.compose.include ) {
                  for( let include of data.compose.include ) {
                    if ( include.concept ) {
                      for ( let concept of include.concept ) {
                        concept.system = include.system
                        this.items.push( concept )
                        //this.items.push( { system: include.system, ...concept } )
                      }
                    }
                  }
                }
                this.items.sort( itemSort )
                this.loading = false
              }).catch(err=>{
                this.errors = err.message
                this.error = true
                this.loading = false
              })
            } else {
              this.error = true
              this.errors = "Invalid response from server."
              this.loading = false
            }
          }).catch(err=>{
            this.errors = err.message
            this.error = true
            this.loading = false
          })

        }
      }).catch(err=>{
        this.errors = err.message
        this.error = true
        this.loading = false
      })
      */
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
    }
    /*
    displayValue: function() {
      let found = this.items.find( item => item.code === this.valueCode )
      if ( found ) {
        return found.display
      } else {
        return ""
      }
    }
    */
  }
}
</script>
