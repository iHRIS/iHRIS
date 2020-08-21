<template>
  <v-select
    v-if="binding"
    :loading="loading"
    :label="label"
    v-model="value"
    :items="items"
    outlined
    :error-messages="err_messages"
    :error="error"
    shaped
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
  <v-text-field v-else :label="label" v-model="value" dense outlined hide-details shaped clearable @change="updateSearch()" @click:clear="clearSearch()">
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
