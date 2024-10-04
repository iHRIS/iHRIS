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
  <v-menu
      v-else-if="!binding&&expression==='date'"
            ref="menu"
            v-model="dateMenu"
            :close-on-content-click="false"
            min-width="auto"
            offset-y
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateValue"
                :label="$t(`App.fhir-resources-texts.${label}`)"
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
              v-model="dateValue"
              :range="isRange"
              @change="updateSearch"
            ></v-date-picker>
          </v-menu>
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
      dateValue:null,
      error: false,
      err_messages: null,
      value: [],
      dateMenu: false,
      filters: 'eq',
      comparisons: [
        {value: "eq", text: "="},
        {value: "ge", text: ">="},
        {value: "gt", text: ">"},
        {value: "lt", text: "<"},
        {value: "le", text: "<="},
        {value: "range", text: "In"},
      ],
      isRange: false,
    }
  },
  mounted: function() {
    this.loading = true
    let params = undefined
      let language = this.$i18n.locale
      if(language){
        params = { language }
      }
    this.$fhirutils.expand( this.binding,params ).then( items => {
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
      if(!this.binding&&this.expression==='date'){
        let formatedValue
        if(this.isRange){
          formatedValue= `ge${this.dateValue[0]}&${this.expression}=lt${this.dateValue[1]}`
        }else{
          formatedValue= `${this.filters}${this.dateValue}`
        }
        this.$emit('termChange', this.expression,formatedValue)
      }else {
       this.$emit('termChange', this.expression, this.value)
      }
    },
    clearSearch: function() {
      this.$emit('termChange', this.expression, [])
    },
    changeFilter() {
      let formatedValue
        if(this.isRange){
          formatedValue= `ge${this.dateValue[0]}&${this.expression}=lt${this.dateValue[1]}`
        }else{
          formatedValue= `${this.filters}${this.dateValue}`
        }
      this.$emit("termChange", this.expression, formatedValue);
    },
  },
  watch:{
    filters(val) {
      this.isRange = val === 'range';
    },
  }
}
</script>
