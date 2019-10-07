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

      this.collapseFields(fields);
    },
    collapseFields(fields, prefix) {
      let collapsedFields = [];
      let components = this;

      if (fields.fields && (Object.keys(fields.fields).length > 0 || fields.fields.length > 0)) {
        if (fields.fields instanceof Promise) {
          return fields.fields.then(result => {
            let subfields = this.collapseFields(result, fields.name);

            for (var j in subfields) {
              this.inputs.push(subfields[j]);

              let data = subfields[j].name.replace(/([A-Z])/g, " $1");
              subfields[j].label = data.charAt(0).toUpperCase() + data.slice(1);
              this.data.push(subfields[j]);
            }

            return Promise.resolve(collapsedFields);
          });
        } else {
          let subfields = this.collapseFields(fields.fields, fields.name);

          for (var j in subfields) {
            this.inputs.push(subfields[j]);
              let data = subfields[j].name.replace(/([A-Z])/g, " $1");
              subfields[j].label = data.charAt(0).toUpperCase() + data.slice(1);
              this.data.push(subfields[j]);
          }
        }
      } else {
        for (var key in fields) {
          if (fields.hasOwnProperty(key)) {
            if (fields[key].fields instanceof Promise) {
              return fields[key].fields.then(result => {
                if (result && (Object.keys(result).length > 0 || result.length > 0)) {
                  let subfields = this.collapseFields(result, key);

                  for (var j in subfields) {
                    this.inputs.push(subfields[j]);

                    let data = subfields[j].name.replace(/([A-Z])/g, " $1");
                    subfields[j].label = data.charAt(0).toUpperCase() + data.slice(1);
                    this.data.push(subfields[j]);
                  }
                } else {
                  this.inputs.push(fields[key]);

                  let data = fields[key].name.replace(/([A-Z])/g, " $1");
                  fields[key].label = data.charAt(0).toUpperCase() + data.slice(1);
                  this.data.push(fields[key]);
                }

                return Promise.resolve(collapsedFields);
              });
            } else {
              if (fields[key].fields && (Object.keys(fields[key].fields).length > 0 || fields[key].fields.length > 0)) {
                let subfields = this.collapseFields(fields[key].fields, key);

                for (var j in subfields) {
                  this.inputs.push(subfields[j]);

                  let data = subfields[j].name.replace(/([A-Z])/g, " $1");
                  subfields[j].label = data.charAt(0).toUpperCase() + data.slice(1);
                  this.data.push(subfields[j]);
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
      }

      return Promise.resolve(collapsedFields);
    },
    getInputs(data) {
      console.log("Get inputs");
      let fields = {};
      let inputs = {};

      if (data) {
        console.log("This is setting to whatever data is");
        fields = data;

        console.log(typeof fields);
        console.log(data);
      } else {
        console.log("Structure");
        console.log(this.structure);

        fields = this.structure;
      }

      return {};

      console.log("Fields");
      console.log(fields);

      if (fields instanceof Object) {
        //console.log("Length: " + Object.keys(fields).length);
        //console.log(typeof fields);

        if (Object.keys(fields).length == 0) {
          //console.log(fields);
        }

        if (fields instanceof Promise) {
          //console.log("This is a promise");
        }

        Object.keys(fields).forEach(name => {
          //console.log(name);
          //console.log(typeof fields);

          if (fields instanceof Array) {
            //console.log("This is an array");
          } else {
            //console.log("This is not an array");
          }

          if (fields instanceof Promise) {
            fields.then(result => {
              //console.log("Result");
              //console.log(result);

              if (fields[name].fields) {
                if (fields[name].fields instanceof Promise) {
                  fields[name].fields.then(result => {
                    //console.log("Begin recursion promise");
                    //console.log(fields[name].fields);
                    inputs[fields[name].id] = this.getInputs(fields[name].fields);
                  });
                } else {
                  //console.log("Begin recursion");
                  //console.log(fields[name].fields);
                  inputs[fields[name].id] = this.getInputs(fields[name].fields);
                }
              } else {
                //console.log("Do not go recursive");
                inputs[fields[name].id] = this.$refs[fields[name].id][0].getInput();
              }
            });
          } else if (fields[name].fields) {
            //console.log("Begin recursion");
            //console.log(fields[name].fields);
            //console.log(fields[name]);

            if (fields[name].fields instanceof Promise) {
              //console.log("Subfields is a promise");

              fields[name].fields.then(result => {
                inputs[fields[name].id] = this.getInputs(fields[name].fields);
              });
            } else {
              //console.log("Subfields is not a promise");

              inputs[fields[name].id] = this.getInputs(fields[name].fields);
            }
          } else {
            //console.log("Do not go recursive");
            inputs[fields[name].id] = this.$refs[fields[name].id][0].getInput();
          }
        });

        //console.log("Concluded loop");
      } else {
        //console.log("Im in the array loop");

        for (let name in fields) {
          if (fields instanceof Promise) {
            fields.then(result => {
              if (fields[name].fields) {
                //console.log("Begin recursion");
                //console.log(fields[name].fields);
                inputs[fields[name].id] = this.getInputs(fields[name].fields);
              } else {
                //console.log("Do not go recursive");
                inputs[fields[name].id] = this.$refs[fields[name].id][0].getInput();
              }
            });
          } else {
            if (fields[name].fields) {
              //console.log("Begin recursion");
              //console.log(fields[name].fields);
              inputs[fields[name].id] = this.getInputs(fields[name].fields);
            } else {
              //console.log("Do not go recursive");
              inputs[fields[name].id] = this.$refs[fields[name].id][0].getInput();
            }
          }
        }
      }

      //console.log("Data");
      //console.log(inputs);

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
