<template>
  <div>
    <v-container v-if="source.edit">
      <v-select 
        :loading="loading" 
        :label="display" 
        v-model="valueCode" 
        :items="items" 
        outlined 
        hide-details="auto" 
        :error-messages="err_messages"
        :error="error"
        item-text="display"
        item-value="code"
        dense
      ></v-select>
    </v-container>
    <div v-else>
      <v-row dense>
        <v-col cols="3" class="font-weight-bold">{{display}}</v-col><v-col cols="9">{{value.display}}</v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
const itemSort = (a,b) => {
  return (a.display === b.display ? (a.code === b.code ? 0 : (a.code < b.code ? -1: 1)) : (a.display < b.display ? -1 : 1) )
}
export default {
  name: "fhir-coding",
  props: ["field","label","sliceName","targetprofile","min","max","base-min","base-max","slotProps","path","binding"],
  data: function() {
    return {
      value: { system: "", code: "", display: "" },
      valueCode: "",
      loading: true,
      err_messages: null,
      error: false,
      items: [],
      source: { path: "", data: {}, edit: true, binding: this.binding }
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH CODING",this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    },
    valueCode: function() {
      if ( this.items ) {
        this.value = this.items.find( item => item.code === this.valueCode )
      }
    }
  },
  methods: {
    setupData: function() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {}, 
          edit: this.slotProps.source.edit, binding: this.binding || this.slotProps.source.binding }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          // Need to see if this works and figure out what it needs to be
          this.value = this.source.data
        } else {
          let expression = this.field.substring( this.field.indexOf(':')+1 )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          this.value = this.source.data[0]
        }
      }
      let binding = this.binding || this.slotProps.source.binding
      //console.log("CODING",binding)
      let lastSlash = binding.lastIndexOf('/')
      let lastPipe = binding.lastIndexOf('|')
      let valueSetId = binding.slice(lastSlash+1, (lastPipe !== -1 ? lastPipe : binding.length ))
      //console.log("CODING",lastSlash,lastPipe,valueSetId)
      fetch("/fhir/ValueSet/"+valueSetId+"/$expand").then(response=> {
        if( response.ok ) {
          response.json().then(data=>{
            this.loading = false
            try {
              this.items = data.expansion.contains
              this.items.sort( itemSort )
            } catch(err) {
              this.error = true
              this.err_messages = "Invalid response from server."
            }
          }).catch(err=>{
            this.err_messages = err.message
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
                this.err_messages = err.message
                this.error = true
                this.loading = false
              })
            } else {
              this.error = true
              this.err_messages = "Invalid response from server."
              this.loading = false
            }
          }).catch(err=>{
            this.err_messages = err.message
            this.error = true
            this.loading = false
          })

        }
      }).catch(err=>{
        this.err_messages = err.message
        this.error = true
        this.loading = false
      })
    }
  },
  computed: {
    display: function() {
      if ( this.slotProps && this.slotProps.input) return this.slotProps.input.label
      else return this.label
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
