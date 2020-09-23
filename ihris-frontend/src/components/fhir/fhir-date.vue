<template>
  <ihris-element :edit="edit" :loading="false">
    <template #form>
      <v-text-field v-model="value" type="number" :disabled="disabled" :label="label" :min="minYear" :max="maxYear" v-if="pickerType==='year'"></v-text-field>
      <v-menu 
        ref="menu" 
        v-model="menu" 
        :close-on-content-click="false" 
        transition="scale-transition" 
        offset-y 
        min-width="290px"
        v-else
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="displayValue"
            :label="label"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-on="on"
            outlined
            hide-details="auto"
            dense
          ></v-text-field>
        </template>
        <v-container class="ma-0 pa-0" v-if="isEthiopian">
          <v-row no-gutters>
            <v-card >
              <v-card-subtitle class="primary white--text">Gregorian Calendar</v-card-subtitle>
              <v-date-picker
                ref="picker"
                color="secondary"
                :landscape="$vuetify.breakpoint.smAndUp"
                v-model="value"
                :max="maxValueDate"
                :min="minValueDate"
                :type="pickerType"
                :disabled="disabled"
                @change="save"
                ></v-date-picker>
            </v-card>
            <v-card>
              <v-card-subtitle class="primary white--text">Ethiopian Calendar</v-card-subtitle>
              <v-ethiopian-date-picker
                ref="etPicker"
                label="Ethiopian"
                color="secondary"
                :landscape="$vuetify.breakpoint.smAndUp"
                v-model="etValue"
                :max="maxValueETDate"
                :min="minValueETDate"
                :type="pickerType"
                :disabled="disabled"
                @change="save"
                locale="am"
                ></v-ethiopian-date-picker>
            </v-card>
          </v-row>
        </v-container>
        <v-date-picker
          v-else
          ref="picker"
          color="secondary"
          :landscape="$vuetify.breakpoint.smAndUp"
          v-model="value"
          :max="maxValueDate"
          :min="minValueDate"
          :type="pickerType"
          :disabled="disabled"
          @change="save"
          ></v-date-picker>

      </v-menu>
    </template>
    <template #header>
      {{label}}
    </template>
    <template #value>
      {{value}}
    </template>
  </ihris-element>
</template>

<script>
import IhrisElement from "../ihris/ihris-element.vue"
import VEthiopianDatePicker from "vuetify-ethiopian-calendar"
import ethiopic from "ethiopic-calendar"

export default {
  name: "fhir-date",
  props: ["field","min","max","base-min","base-max", "label", "slotProps", "path", "edit","sliceName", 
    "minValueDate", "maxValueDate", "displayType","readOnlyIfSet", "calendar"],
  components: {
    IhrisElement,
    VEthiopianDatePicker
  },
  data: function() {
    return {
      value: null,
      etValue: null,
      menu: false,
      source: { path: "", data: {} },
      qField: "valueDate",
      pickerType: "date",
      disabled: false
    }
  },
  created: function() {
    //console.log("CREATE STRING",this.field,this.slotProps)
    this.setupData()
  },
  computed: {
    minYear: function() {
      return this.minValueDate.substring(0,4)
    },
    maxYear: function() {
      return this.maxValueDate.substring(0,4)
    },
    isEthiopian: function() {
      return this.calendar === "Ethiopian"
    },
    minValueETDate: function() {
      if ( this.minValueDate ) {
        return this.convertGE( this.minValueDate )
      } else {
        return null
      }
    },
    maxValueETDate: function() {
      if ( this.maxValueDate ) {
        return this.convertGE( this.maxValueDate )
      } else {
        return null
      }
    },
    displayValue: function() {
      if ( this.isEthiopian ) {
        return this.value && "Gregorian: " + this.value + " Ethiopian: "+this.etValue
      } else {
        return this.value
      }
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR', this.$refs.etPicker.activePicker = 'YEAR'))
    },
    slotProps: {
      handler() {
        //console.log("WATCH STRING",this.field,this.path,this.slotProps)
        this.setupData()
      },
      deep: true
    },
    value (val) {
      this.etValue = this.convertGE( val )
      /*
      const [ year, month, day ] = val.split('-').map(Number)
      let etDate = ethiopic.ge( year, month || 1, day  || 1)
      this.etValue = etDate.year.toString().padStart(4,'0') + "-" + etDate.month.toString().padStart(2,'0') + "-" + etDate.day.toString().padStart(2, '0')
      */
    },
    etValue (val) {
      this.value = this.convertEG( val )
      /*
      const [ etYear, etMonth, etDay ] = val.split('-').map(Number)
      let gDate = ethiopic.eg( etYear, etMonth || 1, etDay  || 1)
      this.value = gDate.year.toString().padStart(4,'0') + "-" + gDate.month.toString().padStart(2,'0') + "-" + gDate.day.toString().padStart(2, '0')
      */
    }
  },
  methods: {
    convertGE(val) {
      const [ year, month, day ] = val.split('-').map(Number)
      let etDate = ethiopic.ge( year, month || 1, day  || 1)
      return etDate.year.toString().padStart(4,'0') + "-" + etDate.month.toString().padStart(2,'0') + "-" + etDate.day.toString().padStart(2, '0')
    },
    convertEG(val) {
      const [ etYear, etMonth, etDay ] = val.split('-').map(Number)
      let gDate = ethiopic.eg( etYear, etMonth || 1, etDay  || 1)
      return gDate.year.toString().padStart(4,'0') + "-" + gDate.month.toString().padStart(2,'0') + "-" + gDate.day.toString().padStart(2, '0')
    },
    setupData() {
      if ( this.displayType ) {
        this.pickerType = this.displayType
      }
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.value = this.source.data
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          if ( this.source.data.length == 1 ) {
            this.value = this.source.data[0]
          }
        }
        this.disabled = this.readOnlyIfSet && (!!this.value)
        //console.log(this.source)
      }
    },
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
