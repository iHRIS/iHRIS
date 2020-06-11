<template>
  <v-container>
    <v-select 
      :loading="loading" 
      :label="display" 
      :name="field" 
      v-model="value" 
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
</template>

<script>
export default {
  name: "fhir-code",
  props: ["field","min","max","base-min","base-max","label","start-value", "binding"],
  data: function() {
    return {
      value: "",
      loading: true,
      err_messages: null,
      error: false,
      items: []
    }
  },
  created: function() {
    this.value = this.startValue
    let lastSlash = this.binding.lastIndexOf('/')
    let lastPipe = this.binding.lastIndexOf('|')
    let valueSetId = this.binding.slice(lastSlash+1, (lastPipe !== -1 ? lastPipe : null ))
    fetch("/fhir/ValueSet/"+valueSetId+"/$expand").then(response=> {
      response.json().then(data=>{
        this.loading = false
        try {
          this.items = data.expansion.contains
          /*
          for( let code of data.expansion.contains ) {
            this.items.push( code )
          }
          */
        } catch(err) {
          this.error = true
          this.err_messages = "Invalid response from server."
        }
      }).catch(err=>{
        this.err_messages = err.message
        this.error = true
        this.loading = false
      })
    }).catch(err=>{
      this.err_messages = err.message
      this.error = true
      this.loading = false
    })
  },
  methods: {
  },
  computed: {
    display: function() {
      if ( this.slotProps ) return this.slotProps.input.label
      else return this.label
    }
  }
}
</script>
