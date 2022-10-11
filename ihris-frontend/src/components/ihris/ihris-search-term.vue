<template>
  <v-select
    v-if="binding"
    :loading="loading"
    :label="$t(`App.fhir-resources-texts.${label}`)"
    v-model="value"
    :items="items.filter(x => !x.code.includes('(deactivated)'))"
    outlined
    :error-messages="err_messages"
    :error="error"
    class="ma-2"
    clearable
    hide-details
    small-chips
    dense
    multiple
    @change="updateSearch()"
    @click:clear="clearSearch()"
    item-text="display"
    item-value="code">
  </v-select>
  <v-text-field v-else :label="$t(`App.fhir-resources-texts.${label}`)" class="ma-2" v-model="value" dense outlined hide-details  clearable @change="updateSearch()" @click:clear="clearSearch()">
  </v-text-field>
</template>

<script>
export default {
  name: "ihris-search-term",
  props: ["label","expression","binding"],
  data: function() {
    return {
      loading: false,
      items: [],
      error: false,
      err_messages: null,
      value: []
    }
  },
  mounted: function() {
    this.loading = true
    this.$fhirutils.expand( this.binding ).then( items => {
      this.items = items
      this.loading = false
    } ).catch( err => {
      this.error = true
      this.err_messages = err.message
      this.loading = false
    } )
  },
  methods: {
    updateSearch: function() {
      this.$emit('termChange', this.expression, this.value)
    },
    clearSearch: function() {
      this.$emit('termChange', this.expression, [])
    }
  }
}
</script>
