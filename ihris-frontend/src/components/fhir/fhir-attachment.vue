<template>
  <ihris-element :edit="edit" :loading="false" v-if="!hide">
    <template #form>
      <v-file-input 
        :disabled="disabled" 
        :label="display" 
        :loading="loading"
        v-model="upload" 
        outlined 
        hide-details="auto" 
        :rules="rules" 
        dense
        @change='doUpload'
        :error-messages="errors"
      >
        <template #label>{{$t(`App.fhir-resources-texts.${display}`)}} <span v-if="required" class="red--text font-weight-bold">*</span></template>
        <template #append-outer>
          <v-menu 
            v-if="objURL"
            offset-y
            left
            eager
          >
            <template v-slot:activator="{on, attrs}">
              <v-btn
                color="accent"
                dark
                fab
                x-small
                v-bind="attrs"
                v-on="on"><v-icon>mdi-file-eye</v-icon></v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-img v-if="isImage" :src="objURL"/>
                <a v-else :download="value.title" :href="objURL">{{value.title}}</a>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-file-input>
    </template>
    <template #header>
      {{$t(`App.fhir-resources-texts.${display}`)}}
    </template>
    <template #value>
      <v-menu 
        v-if="isImage"
        absolute
        eager
        >
        <template v-slot:activator="{on, attrs}">
          <v-img :src="objURL" contain :max-height="150" position="left" v-bind="attrs" v-on="on" />
        </template>
        <v-list min-width="0">
          <v-list-item>
            <v-img :src="objURL" />
          </v-list-item>
        </v-list>
      </v-menu>
      <a v-else :href="objURL">{{value.title}}</a>
    </template>
  </ihris-element>
</template>

<script>
import { Buffer } from 'buffer';
import IhrisElement from "../ihris/ihris-element.vue"
import { eventBus } from "@/main";
import { dataDisplay } from "@/mixins/dataDisplay"

export default {
  name: "fhir-attachment",
  props: ["field", "label", "min", "max", "id", "path", "slotProps", "sliceName","base-min","base-max","edit","readOnlyIfSet",
    "constraints", "displayCondition"],
  components: {
    IhrisElement
  },
  mixins: [dataDisplay],
  data: function() {
    return {
      source: { path: "", data: {} },
      loading: false,
      upload: undefined,
      value: { contentType: "", data: "", title: "" },
      origValue: { contentType: "", data: "", title: "" },
      qField: "valueAttachment",
      disabled: false,
      objURL: "",
      errors: [],
      lockWatch: false
    }
  },
  created: function() {
    //this function is defined under dataDisplay mixin
    this.hideShowField(this.displayCondition)
    this.setupData()
  },
  watch: {
    slotProps: {
      handler() {
        //console.log("WATCH ATTACH",this.field,this.path,this.slotProps)
        if ( !this.lockWatch ) {
          this.setupData()
        }
      },
      deep: true
    },
    value(val) {
      eventBus.$emit(this.path, val)
    }
  },
  methods: {
    setupData() {
      if ( this.slotProps && this.slotProps.source ) {
        this.source = { path: this.slotProps.source.path+"."+this.field, data: {} }
        if ( this.slotProps.source.fromArray ) {
          this.source.data = this.slotProps.source.data
          this.value = this.source.data
          this.origValue = this.value
          this.lockWatch = true
          //console.log("SET value to ", this.source.data, this.slotProps.input)
        } else {
          let expression = this.$fhirutils.pathFieldExpression( this.field )
          this.source.data = this.$fhirpath.evaluate( this.slotProps.source.data, expression )
          //console.log("STR FHIRPATH", this.slotProps.source.data, this.field)
          let value = null
          if ( this.source.data.length == 1 ) {
            value = this.source.data[0]
          } else {
            //check if the path is an array and use path index to get value
            let pathSlices = this.path.split("[")
            let index
            for(let slice of pathSlices) {
              let slices = slice.split("]")
              if(Number.isInteger(parseInt(slices[0]))) {
                index = slices[0]
              }
            }
            if(index || index == 0) {
              value = this.source.data[index]
            }
          }
          if ( value != null ) {
            this.value = value
            this.origValue = this.value
            this.lockWatch = true
          }
        }
      }
      this.setObjectURL()
      this.disabled = this.readOnlyIfSet && (!!this.value)
      //console.log(this.source)
    },
    setObjectURL() {
      if ( this.objURL ) {
        URL.revokeObjectURL( this.objURL )
      }
      if ( this.value.data && this.value.contentType ) {
        let dataURL = "data:"+this.value.contentType+";base64,"+this.value.data
        fetch(dataURL).then( res => res.blob() ).then( blob => this.objURL = URL.createObjectURL( blob ) ).catch( e => {
          console.log("Failed to get data from base64.",e)
        } )
      }
    },
    doUpload() {
      this.errors = []
      if ( !this.upload ) {
        this.upload = undefined
        this.value = this.origValue
        this.objURL = ""
      } else {
        this.loading = true
        this.value.contentType = this.upload.type
        this.value.title = this.upload.name
        let reader = new FileReader()
        reader.readAsArrayBuffer( this.upload )
        reader.onload = () => {
          let data = Buffer.from( reader.result )
          this.value.data = data.toString('base64')
          this.loading = false
          this.objURL = URL.createObjectURL( this.upload )
        }
      }
    }
  },
  computed: {
    isImage: function() {
      return this.value.contentType && this.value.contentType.startsWith("image/")
    },
    index: function() {
      if ( this.slotProps && this.slotProps.input ) return this.slotProps.input.index
      else return undefined
    },
    display: function() {
      if ( this.slotProps && this.slotProps.input) return this.slotProps.input.label
      else return this.label
    },
    required: function() {
      return (this.index || 0) < this.min
    },
    rules: function() {
      if ( this.required ) {
        return [ v => !!v || this.display+" is required" ]
      } else {
        return []
      }
    }
  }
}
</script>
