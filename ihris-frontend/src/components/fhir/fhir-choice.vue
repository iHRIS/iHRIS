<template>
  <v-container>
    <v-select 
      :loading="loading" 
      :label="label" 
      v-model="valueCode" 
      :items="items" 
      outlined 
      hide-details="auto" 
      :error-messages="errors"
      item-text="display"
      item-value="code"
      :rules="rules"
      dense
      @change="errors = []"
      >
      <template #label>{{label}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
    </v-select>
  </v-container>
</template>

<script>
/*
const itemSort = (a,b) => {
  return (a.display === b.display ? (a.code === b.code ? 0 : (a.code < b.code ? -1: 1)) : (a.display < b.display ? -1 : 1) )
}
*/
export default {
  name: "fhir-coding",
  props: ["label", "path", "binding", "edit", "min", "max","constraints"],
  data: function() {
    return {
      value: { system: "", code: "", display: "" },
      valueCode: "",
      loading: true,
      errors: [],
      //error: false,
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
