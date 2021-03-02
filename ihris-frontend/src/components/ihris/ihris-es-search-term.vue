<template>
  <label>
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
    <template v-else-if="!hideFilters">
      <template v-if="filterDataType == 'date'">
        <v-menu
          ref="menu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="value"
              :label="label"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
              dense
              outlined
              hide-details
              shaped
              @input="updateSearch"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="value"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="updateSearch"
          ></v-date-picker>
        </v-menu>
      </template>
      <v-text-field v-else :label="label" v-model="value" dense outlined hide-details shaped clearable @change="updateSearch()" @click:clear="clearSearch()" />
    </template>
  </label>
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
      value: null,
      filterDataType: '',
      dateMenu: false,
    }
  },
  mounted: function() {
    this.filterDataType = this.reportData.mappings.mappings.properties[this.expression].type
    this.loading = true;
    if(this.isDropDown) {
      let url = `/es/populateFilter/${this.reportData.indexName}/${this.expression}?dataType=${this.filterDataType}`
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
  },
  watch: {
    dateMenu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
}
</script>
