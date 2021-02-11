<template>
  <v-autocomplete
    v-if="isDropDown && !hideFilters"
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
    <template v-slot:prepend-item>
      <v-radio-group
        v-model="filterType"
        @change="updateSearch()"
        row
      >
        <v-radio
          label="Include"
          value="include"
        ></v-radio>
        <v-radio
          label="Exclude"
          value="exclude"
        ></v-radio>
      </v-radio-group>
      <v-divider></v-divider>
    </template>
  </v-autocomplete>
  <v-text-field v-else-if="!hideFilters" :label="label" v-model="value" dense outlined hide-details shaped clearable @change="updateSearch()" @click:clear="clearSearch()">
  </v-text-field>
</template>

<script>
export default {
  name: "ihris-search-term",
  props: ["label","expression","isDropDown", "reportData", "hideFilters"],
  data: function() {
    return {
      loading: false,
      items: [],
      error: false,
      err_messages: null,
      filterType: 'include',
      value: []
    }
  },
  mounted: function() {
    this.loading = true;
    if(this.isDropDown) {
      let sTermDet = this.reportData.filters.find((filter) => {
        return filter.field === this.expression
      })
      let dataType = sTermDet.dataType
      let url = `/es/populateFilter/${this.reportData.indexName}/${this.expression}?dataType=${dataType}`
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
      this.$emit('termChange', this.expression, this.value, this.filterType)
    },
    clearSearch: function() {
      this.$emit('termChange', this.expression, [])
    }
  }
}
</script>
