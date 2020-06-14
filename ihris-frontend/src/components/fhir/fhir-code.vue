<template>
  <div>
    <v-container v-if="source.edit">
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
    <div v-else>
      <v-row dense>
        <v-col cols="3" class="font-weight-bold">{{display}}</v-col><v-col cols="9">{{displayValue}}</v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "fhir-code",
  props: ["field","min","max","base-min","base-max","label","binding","slotProps"],
  data: function() {
    return {
      value: "",
      loading: true,
      err_messages: null,
      error: false,
      items: [],
      source: { path: "", data: {}, edit: true }
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
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH CODE",this.field,this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData() {
      if ( this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {}, edit: this.slotProps.source.edit }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.value = this.source.data
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, this.field )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          if ( this.source.data.length == 1 ) {
            this.value = this.source.data[0]
          }
        }
        //console.log(this.source)
      }
    }
  },
  computed: {
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
    }
  }
}
</script>
