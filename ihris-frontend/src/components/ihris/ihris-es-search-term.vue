<template>
  <v-select
    v-if="isDropDown"
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
  props: ["label","expression","isDropDown", "reportData"],
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
    this.loading = true;
    if(this.isDropDown) {
      let url = `/es/populateFilter/${this.reportData.indexName}/${this.expression}`
    fetch(url, {
      method: 'GET'
    }).then(response => {
        response
          .json()
          .then(data => {
            this.loading = false;
            for(let bucket of data) {
              this.items.push(
                bucket.key.value
              )
            }
          })
          .catch(err => {
            this.loading = false;
            this.error_message = "Unable to load results.";
            console.log(err);
          });
      })
      .catch(err => {
        this.loading = false;
        this.error_message = "Unable to load results.";
        console.log(err);
      });
    }
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
