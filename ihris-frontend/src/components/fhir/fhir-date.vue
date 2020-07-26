<template>
  <div>
    <v-container v-if="edit">
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
            prepend-inner-icon="mdi-calendar"
            readonly
            v-on="on"
            outlined
            hide-details="auto"
            dense
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
    <div v-else>
      <v-row dense>
        <v-col cols="3" class="font-weight-bold">{{label}}</v-col><v-col cols="9">{{value}}</v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "fhir-date",
  props: ["field","min","max","base-min","base-max", "label", "slotProps", "path", "edit","sliceName"],
  data: function() {
    return {
      value: null,
      menu: false,
      source: { path: "", data: {} },
      qField: "valueDate"
    }
  },
  created: function() {
    //console.log("CREATE STRING",this.field,this.slotProps)
    this.setupData()
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    slotProps: {
      handler() {
        //console.log("WATCH STRING",this.field,this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    }
  },
  methods: {
    setupData() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.value = this.source.data
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.field.substring( this.field.indexOf(':')+1 )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          if ( this.source.data.length == 1 ) {
            this.value = this.source.data[0]
          }
        }
        //console.log(this.source)
      }
    },
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
