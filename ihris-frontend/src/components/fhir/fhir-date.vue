<template>
  <v-container>
    <h2>{{ label }}</h2>
    <v-menu 
      ref="menu" 
      v-model="menu" 
      :close-on-content-click="false" 
      transition="scale-transition" 
      offset-y 
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="value"
          :label="label"
          prepend-icon="mdi-calendar"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        color="secondary"
        :landscape="$vuetify.breakpoint.smAndUp"
        v-model="value"
        :max="new Date().toISOString().substr(0,10)"
        min="1920-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
    
  </v-container>
</template>

<script>
export default {
  name: "fhir-date",
  props: ["field","min","max","base-min","base-max", "label", "start-value"],
  data: function() {
    return {
      value: null,
      menu: false
    }
  },
  created: function() {
    this.value = this.startValue
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
