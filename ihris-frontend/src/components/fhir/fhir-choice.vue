<template>
  <div>
    <v-select 
      :loading="loading" 
      :label="label" 
      v-model="valueCode" 
      :items="items" 
      outlined 
      hide-details="auto" 
      :error-messages="err_messages"
      :error="error"
      item-text="display"
      item-value="code"
      dense
      >
    </v-select>
  </div>
</template>

<script>
const itemSort = (a,b) => {
  return (a.display === b.display ? (a.code === b.code ? 0 : (a.code < b.code ? -1: 1)) : (a.display < b.display ? -1 : 1) )
}
export default {
  name: "fhir-coding",
  props: ["label", "path", "binding", "edit"],
  data: function() {
    return {
      value: { system: "", code: "", display: "" },
      valueCode: "",
      loading: true,
      err_messages: null,
      error: false,
      items: [],
      qField: "valueCoding"
    }
  },
  created: function() {
    this.setupData()
  },
  watch: {
    valueCode: function() {
      if ( this.items ) {
        this.value = this.items.find( item => item.code === this.valueCode )
      }
    }
  },
  methods: {
    setupData: function() {
      let binding = this.binding 
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
  }
}
</script>
