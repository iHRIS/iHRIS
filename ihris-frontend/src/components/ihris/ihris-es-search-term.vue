<template>
  <label>
    <v-autocomplete
        v-if="isDropDown && !hideFilters"
        v-model="value"
        :error="error"
        :error-messages="err_messages"
        :items="items"
        :label="label"
        :loading="loading"
        class="ma-1"
        clearable
        dense
        hide-details
        item-text="display"
        item-value="code"
        multiple
        outlined
        small-chips
        @change="updateSearch()"
        @click:clear="clearSearch()">
      <template v-slot:prepend-item>
        <v-radio-group
            v-model="filterType"
            row
            @change="updateSearch()"
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
        <v-container>
          <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              min-width="auto"
              offset-y
              transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="value"
                  :label="label"
                  clearable
                  class="internal-slot reverse-text"
                  dense
                  outlined
                  hide-details
                  readonly
                  v-bind="attrs"
                  @input="updateSearch"
                  v-on="on"
              >
                <template v-slot:prepend-inner>
                  <v-select
                      v-model="filters"
                      :items="comparisons"
                      menu-props="auto"
                      dense
                      solo
                      chips
                      hide-details
                      item-text="text"
                      item-value="value"
                      style="max-width: 80px;"
                      @change="changeFilter"
                      @input="updateSearch"
                  />
                </template>
              </v-text-field>
            </template>
            <v-date-picker
                ref="picker"
                v-model="value"
                :max="new Date().toISOString().substr(0, 10)"
                :range="isRange"
                min="1950-01-01"
                @change="updateSearch"
            ></v-date-picker>
          </v-menu>
        </v-container>

      </template>
      <v-text-field v-else v-model="value" :label="label" class="ma-1" clearable dense
                    hide-details outlined prepend-inner-icon="mdi-filter-variant" @change="updateSearch()"
                    @click:clear="clearSearch()"/>
    </template>
  </label>
</template>

<script>
export default {
  name: "ihris-search-term",
  props: ["label", "expression", "isDropDown", "reportData", "hideFilters"],
  data: function () {
    return {
      loading: false,
      items: [],
      error: false,
      err_messages: null,
      filterType: 'include',
      value: null,
      filterDataType: '',
      dateMenu: false,
      filters: null,
      comparisons: [
        {value: null, text: "="},
        {value: "gte", text: ">="},
        {value: "gt", text: ">"},
        {value: "lt", text: "<"},
        {value: "lte", text: "<="},
        {value: "range", text: "In"},
      ],
      isRange: false,
    }
  },
  mounted: function () {
    if (this.reportData.mappings.mappings.properties[this.expression]) {
      this.filterDataType = this.reportData.mappings.mappings.properties[this.expression].type
    }
    if (this.isDropDown && this.filterDataType) {
      this.loading = true;
      let url = `/es/populateFilter/${this.reportData.indexName}/${this.expression}?dataType=${this.filterDataType}`
      fetch(url, {
        method: 'GET'
      }).then(response => {
        response
            .json()
            .then(data => {
              this.loading = false;
              for (let bucket of data) {
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
    changeFilter(value) {
      this.filterType = value;
      this.$emit("termChange", this.expression, this.value, this.filterType);
    },
    updateSearch: function () {
      this.$emit('termChange', this.expression, this.value, this.filterType)
    },
    clearSearch: function () {
      this.$emit('termChange', this.expression, [])
    }
  },
  watch: {
    filters(val) {
      this.isRange = val === 'range';
    },
    dateMenu(val) {
      if (!this.isRange) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
  },
}
</script>

<style scoped>
::v-deep .internal-slot .v-input__prepend-inner{
  margin-top: 0px !important;
}
::v-deep .internal-slot .v-input__slot{
  padding: 2px !important;
}
.reverse-text::v-deep .v-label.v-label--active.theme--light {
  left: 0px !important;
  right: 10px !important;
}
</style>
