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
      use: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    changeFields(fields) {
      let inputs = [];

      if (fields && fields.length) {
        fields.forEach(field => {
          inputs.push(field.name);

          let data = field.name.replace(/([A-Z])/g, " $1");
          field.label = data.charAt(0).toUpperCase() + data.slice(1);
        });
      }

      this.data = fields;
      this.inputs = inputs;
    },
    getInputs() {
      let inputs = {};

      for (let i of this.inputs) {
        inputs[i] = this.$refs[i][0].getInput();
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
