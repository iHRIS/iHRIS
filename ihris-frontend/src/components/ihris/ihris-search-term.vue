<template>
  <v-text-field :label="label" v-model="value" outlined hide-details shaped clearable @change="updateSearch()" @click:clear="clearSearch()">
  </v-text-field>
</template>

<script>
export default {
  name: "ihris-search-term",
  props: ["label","expression"],
  data: function() {
    return {
      value: ""
    }
  },
  methods: {
    updateSearch: function() {
      this.$emit('termChange', this.expression, this.value)
    },
    clearSearch: function() {
      this.$emit('termChange', this.expression, "")
    }
  }
}
</script>
