<template>
  <ihris-element :edit="edit" :loading="false">
    <template #form>
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
            v-model="displayValue"
            :label="label"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-on="on"
            outlined
            hide-details="auto"
            :rules="rules"
            :error-messages="errors"
            dense
          >
            <template #label>{{label}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
          </v-text-field>
        </template>
        <v-container class="ma-0 pa-0" v-if="isEthiopian">
          <v-row no-gutters>
            <v-card min-width="300px">
              <v-card-title class="primary white--text">
                Ethiopian Calendar<v-spacer/><v-btn
                  dark
                  class="white--text"
                  icon
                  @click="showGregorian = !showGregorian"
                  group
                  small
                  ><v-icon v-if="!showGregorian" >mdi-calendar-multiple</v-icon><v-icon v-else>mdi-calendar</v-icon></v-btn>
              </v-card-title>
              <v-card-text v-if="pickerType==='year'">
                <br />
                <v-text-field 
                  v-model="etValue" 
                  clearable
                  type="number" 
                  :disabled="disabled" 
                  :label="label" 
                  :min="minYearET" 
                  :max="maxYearET" 
                  :rules="rules" 
                  :error-messages="errors"
                  @change="errors = []"
                  dense
                >
                </v-text-field>
              </v-card-text>
              <v-ethiopian-date-picker
                v-else
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
            <v-card v-if="showGregorian" min-width="300px">
              <v-card-title class="primary white--text">
                Gregorian Calendar<v-spacer/><v-btn
                  dark
                  class="white--text"
                  icon
                  @click="showGregorian = false"
                  group
                  small
                  ><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text v-if="pickerType==='year'">
                <br />
                <v-text-field 
                  v-model="value" 
                  clearable
                  type="number" 
                  :disabled="disabled" 
                  :label="label" 
                  :min="minYear" 
                  :max="maxYear" 
                  :rules="rules" 
                  :error-messages="errors"
                  @change="errors = []"
                  dense
                >
                </v-text-field>
              </v-card-text>
              <v-date-picker
                v-else
                ref="gPicker"
                color="secondary"
                :landscape="$vuetify.breakpoint.smAndUp"
                v-model="value"
                :max="dateValueMax"
                :min="dateValueMin"
                :type="pickerType"
                :disabled="disabled"
                @change="save"
                ></v-date-picker>
            </v-card>
          </v-row>
        </v-container>
        <v-card min-width="300px" v-else-if="pickerType==='year'" >
          <v-card-text>
            <br />
            <v-text-field 
              v-model="value" 
              type="number" 
              :disabled="disabled" 
              :label="label" 
              :min="minYear" 
              :max="maxYear" 
              :rules="rules" 
              :error-messages="errors"
              @change="errors = []"
              dense
            >
            </v-text-field>
          </v-card-text>
        </v-card>
        <v-date-picker
          v-else
          ref="picker"
          color="secondary"
          :landscape="$vuetify.breakpoint.smAndUp"
          v-model="value"
          :max="dateValueMax"
          :min="dateValueMin"
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
      {{displayValue}}
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
    "minValueDate", "maxValueDate", "minValueQuantity", "maxValueQuantity", "displayType","readOnlyIfSet", "calendar",
    "constraints" ],
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
      disabled: false,
      showGregorian: false,
      errors: [],
      lockWatch: false
    }
  },
  created: function() {
    //console.log("CREATE STRING",this.field,this.slotProps)
    this.setupData()
  },
  computed: {
    dateValueMax: function() {
      if ( this.maxValueQuantity ) {
        let maxDate = this.convertQuantity( this.maxValueQuantity, "add" )
        if ( maxDate ) {
          return maxDate
        }
      } 
      if ( this.maxValueDate ) {
        return this.maxValueDate
      }
      return undefined
    },
    dateValueMin: function() {
      if ( this.minValueQuantity ) {
        let minDate = this.convertQuantity( this.minValueQuantity, "subtract" )
        if ( minDate ) {
          return minDate
        }
      } else if ( this.minValueDate ) {
        return this.minValueDate
      }
      return undefined
    },
    minYear: function() {
      return this.dateValueMin ? this.dateValueMin.substring(0,4) : undefined
    },
    maxYear: function() {
      return this.dateValueMax ? this.dateValueMax.substring(0,4) : undefined
    },
    minYearET: function() {
      return this.minValueETDate ? this.minValueETDate.substring(0,4) : undefined
    },
    maxYearET: function() {
      return this.maxValueETDate ? this.maxValueETDate.substring(0,4) : undefined
    },
    isEthiopian: function() {
      return this.calendar === "Ethiopian"
    },
    minValueETDate: function() {
      if ( this.dateValueMin ) {
        return this.convertGE( this.dateValueMin )
      } else {
        return null
      }
    },
    maxValueETDate: function() {
      if ( this.dateValueMax ) {
        return this.convertGE( this.dateValueMax )
      } else {
        return null
      }
    },
    displayValue: function() {
      if ( this.isEthiopian ) {
        return this.value && "Ethiopian: " + this.etValue + " Gregorian: " + this.value 
      } else {
        return this.value
      }
    },
    index: function() {
      if ( this.slotProps && this.slotProps.input ) return this.slotProps.input.index
      else return undefined
    },
    required: function() {
      return (this.index || 0) < this.min 
    },
    rules: function() {
      if ( this.required ) {
        return [ v => !!v || this.label+" is required" ]
      } else {
        return []
      }
    }
  },
  watch: {
    menu (val) {
      if ( this.pickerType !== 'year' ) {
        if ( this.isEthiopian ) {
          !this.value && val && setTimeout(() => (this.$refs.etPicker.activePicker = 'YEAR'))
        } else {
          !this.value && val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
      }
    },
    showGregorian (val) {
      !this.value && val && setTimeout(() => (this.$refs.gPicker.activePicker = 'YEAR'))
    },
    slotProps: {
      handler() {
        //console.log("WATCH STRING",this.field,this.path,this.slotProps)
        if ( !this.lockWatch ) {
          this.setupData()
        }
      },
      deep: true
    },
    value (val) {
      if ( !val ) {
        this.etValue = val
      } else if ( this.pickerType === 'year' ) {
        if ( val.length === 4 ) {
          this.etValue = this.convertGE( val )
        }
       } else {
        this.etValue = this.convertGE( val )
      }
      /*
      const [ year, month, day ] = val.split('-').map(Number)
      let etDate = ethiopic.ge( year, month || 1, day  || 1)
      this.etValue = etDate.year.toString().padStart(4,'0') + "-" + etDate.month.toString().padStart(2,'0') + "-" + etDate.day.toString().padStart(2, '0')
      */
    },
    etValue (val) {
      if ( !val ) {
        this.value = val
      } else if ( this.pickerType === 'year' ) {
        if ( val.length === 4 ) {
          this.value = this.convertEG( val )
        }
      } else {
        this.value = this.convertEG( val )
      }
      /*
      const [ etYear, etMonth, etDay ] = val.split('-').map(Number)
      let gDate = ethiopic.eg( etYear, etMonth || 1, etDay  || 1)
      this.value = gDate.year.toString().padStart(4,'0') + "-" + gDate.month.toString().padStart(2,'0') + "-" + gDate.day.toString().padStart(2, '0')
      */
    }
  },
  methods: {
    convertQuantity(val, direction) {
      const unitsofmeasure = {
        'a': 'years',
        'mo': 'months',
        'wk': 'weeks',
        'd': 'days',
      }
      const quant = /(-?\d+)([a-z]{1,3})/

      let match = val.match( quant )
      if ( match.length === 3 ) {
        try {
          let value = match[1]
          let unit = unitsofmeasure[ match[2] ]
          if ( direction === "subtract" ) {
            return this.$moment( this.$moment().subtract(value, unit) ).format('YYYY-MM-DD')
          } else {
            return this.$moment( this.$moment().add(value, unit) ).format('YYYY-MM-DD')
          }
        } catch (e) {
          console.log("Failed to get date from quantity",e)
        }
      }
      return undefined
    },
    convertGE(val) {
      if ( !val ) return val
      const [ year, month, day ] = val.split('-').map(Number)
      if ( this.pickerType === 'year' ) {
        let etDate = ethiopic.ge( year, month || 6, day || 1) // so it will be the same year in both directions
        return etDate.year.toString().padStart(4,'0') 
      } else {
        let etDate = ethiopic.ge( year, month || 1, day || 1)
        return etDate.year.toString().padStart(4,'0') + "-" + etDate.month.toString().padStart(2,'0') + "-" + etDate.day.toString().padStart(2, '0')
      }
    },
    convertEG(val) {
      if ( !val ) return val
      const [ etYear, etMonth, etDay ] = val.split('-').map(Number)
      if ( this.pickerType === 'year' ) {
        let gDate = ethiopic.eg( etYear, etMonth|| 6, etDay || 1) // so it will be the same year in both directions
        return gDate.year.toString().padStart(4,'0') 
      } else {
        let gDate = ethiopic.eg( etYear, etMonth || 1, etDay || 1)
        return gDate.year.toString().padStart(4,'0') + "-" + gDate.month.toString().padStart(2,'0') + "-" + gDate.day.toString().padStart(2, '0')
      }
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
          this.lockWatch = true
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          if ( this.source.data.length == 1 ) {
            this.value = this.source.data[0]
            this.lockWatch = true
          }
        }
        this.disabled = this.readOnlyIfSet && (!!this.value)
        //console.log(this.source)
      }
    },
    save (date) {
      this.errors = []
      this.$refs.menu.save(date)
    }
  }
}
</script>
