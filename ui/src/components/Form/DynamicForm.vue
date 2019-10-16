<template>
  <v-form ref="form" v-if="data">
    <div v-for="field in data" v-bind:key="name + '-' + field.id">
      <Base64Binary
        v-if="field.type == 'base64binary'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Boolean
        v-if="field.type == 'boolean'"
        :label="field.label"
        ref="active"
        :value="field.value"
      />

      <Canonical
        v-if="field.type == 'canonical'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Code
        v-if="field.type == 'code'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :codes="field.options"
        :ref="field.name"
        :value="field.value"
      />

      <Date
        v-if="field.type == 'date'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <DateTime
        v-if="field.type == 'datetime'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :datetime="field.value"
      />

      <Decimal
        v-if="field.type == 'decimal'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Id
        v-if="field.type == 'id'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Instant
        v-if="field.type == 'instant'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Integer
        v-if="field.type == 'integer'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Markdown
        v-if="field.type == 'markdown'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Oid
        v-if="field.type == 'oid'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <PositiveInt
        v-if="field.type == 'positiveint'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <String
        v-if="field.type == 'string'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Time
        v-if="field.type == 'time'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <UnsignedInt
        v-if="field.type == 'unsignedint'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Uri
        v-if="field.type == 'uri'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Url
        v-if="field.type == 'url'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />

      <Uuid
        v-if="field.type == 'uuid'"
        :label="field.label"
        :max="field.max"
        :required="field.required"
        :ref="field.name"
        :value="field.value"
      />
    </div>

    <v-layout align-center justify-end fill-height>
      <v-btn @click="cancel">{{ this.cancelLabel }}</v-btn>
      <v-btn @click="submit" class="primary">submit</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import Base64Binary from "@/components/Form/Base64Binary.vue";
import Boolean from "@/components/Form/Boolean.vue";
import Canonical from "@/components/Form/Canonical.vue";
import Code from "@/components/Form/Code.vue";
import Date from "@/components/Form/Date.vue";
import DateTime from "@/components/Form/DateTime.vue";
import Decimal from "@/components/Form/Decimal.vue";
import Id from "@/components/Form/Id.vue";
import Instant from "@/components/Form/Instant.vue";
import Integer from "@/components/Form/Integer.vue";
import Markdown from "@/components/Form/Markdown.vue";
import Oid from "@/components/Form/Oid.vue";
import PositiveInt from "@/components/Form/PositiveInt.vue";
import String from "@/components/Form/String.vue";
import Time from "@/components/Form/Time.vue";
import UnsignedInt from "@/components/Form/UnsignedInt.vue";
import Uri from "@/components/Form/Uri.vue";
import Url from "@/components/Form/Url.vue";
import Uuid from "@/components/Form/Uuid.vue";

export default {
  created() {
    this.changeFields(this.fields);
  },
  components: {
    Base64Binary,
    Boolean,
    Canonical,
    Code,
    Date,
    DateTime,
    Decimal,
    Id,
    Instant,
    Integer,
    Markdown,
    Oid,
    PositiveInt,
    String,
    Time,
    UnsignedInt,
    Uri,
    Url,
    Uuid
  },
  data() {
    return {
      active: true,
      data: {},
      inputs: [],
      names: [],
      structure: {},
      use: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    changeFields(fields) {
      this.inputs = [];
      this.data = [];

      if (fields.fields) {
        this.structure = fields.fields;
      } else {
        this.structure = fields;
      }

      console.log(this.structure);

      //this.collapseFields(fields);
    },
    async collapseFields(fields, prefix) {
      let collapsedFields = [];
      let components = this;

      if (fields === null) {
        return [];
      }

      console.log("collapse fields");
      console.log(fields);

      if (fields.fields && (fields.fields instanceof Promise || Object.keys(fields.fields).length > 0 || fields.fields.length > 0)) {
        console.log("After collapse fields");
        fields.fields = await fields.fields;
      
        if (!this.names.includes(fields.name)) {
          let subfields = this.collapseFields(fields.fields, fields.name);

          for (var j in subfields) {
            this.inputs.push(subfields[j]);
            let data = subfields[j].name.replace(/([A-Z])/g, " $1");
            subfields[j].label = data.charAt(0).toUpperCase() + data.slice(1);
            this.names.push(subfields[j].label);
            this.data.push(subfields[j]);
          }
        }
      } else {
        console.log("else clause");
        for (var key in fields) {
          if (fields.hasOwnProperty(key)) {
            let subfieldsList = "";

            if (!fields[key]) {
              console.log("this is weird");
              console.log(fields);
            }

            console.log("checking promise");
            if (fields[key] && fields[key].fields instanceof Promise) {
              console.log("is a promise");
              subfieldsList = await fields[key].fields;
            } else {
              console.log("is not a promise");
              console.log(fields);
              subfieldsList = fields[key].fields;
            } 

            if (subfieldsList && (Object.keys(subfieldsList).length > 0 || subfieldsList.length > 0)) {
              if (!this.names.includes(key)) {
                let subfields = this.collapseFields(subfieldsList, key);

                for (var j in subfields) {
                  this.inputs.push(subfields[j]);

                  let data = subfields[j].name.replace(/([A-Z])/g, " $1");
                  subfields[j].label = data.charAt(0).toUpperCase() + data.slice(1);
                  this.data.push(subfields[j]);
                  this.names.push(key);
                }
              }
            } else {
              this.inputs.push(fields[key]);

              let data = fields[key].name.replace(/([A-Z])/g, " $1");
              fields[key].label = data.charAt(0).toUpperCase() + data.slice(1);
              this.data.push(fields[key]);
            }
          }
        }
      }

      return Promise.resolve(collapsedFields);
    },
    async getInputs(data) {
      let fields = {};
      let inputs = {};

      if (data) {
        fields = data;
      } else {
        fields = this.structure;
      }

      if (fields instanceof Object) {
        if (fields instanceof Promise) {
          fields = await fields;
        }

        await Promise.all(Object.keys(fields).forEach(async name => {
          if (fields[name].fields) {
            if (fields[name].fields instanceof Promise) {
              fields[name].fields = await fields[name].fields;
            }
  
            inputs[fields[name].id] = this.getInputs(fields[name].fields);
          } else {
            inputs[fields[name].id] = this.$refs[fields[name].id][0].getInput();
          }
        }));
      } else {
        for (let name in fields) {
          if (fields instanceof Promise) {
            fields = await fields;
          }

          if (fields[name].fields) {
            inputs[fields[name].id] = this.getInputs(fields[name].fields);
          } else {
            inputs[fields[name].id] = this.$refs[fields[name].id][0].getInput();
          }
        }
      }

      return inputs;
    },
    getName() {
      return this.name;
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit("successfulSubmit", this.getInputs());
      } else {
        this.$emit("failedSubmit");
      }
    }
  },
  props: {
    cancelLabel: {
      default: "cancel"
    },
    fields: {},
    name: {}
  }
};
</script>
