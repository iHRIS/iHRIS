<template>
  <v-form ref="form">
    <div v-for="field in fields" v-bind:key="field.id">
      <Base64Binary v-if="field.type == 'base64binary'" :label="field.name" :required="field.required" :ref="field.name" />
      <Boolean v-if="field.type == 'boolean'" :label="field.name" ref="active" />
      <Canonical v-if="field.type == 'canonical'" :label="field.name" :required="field.required" :ref="field.name" />
      <Code v-if="field.type == 'code'" :label="field.name" :required="field.required" :codes="field.options" :ref="field.name" />
      <Date v-if="field.type == 'date'" :label="field.name" :required="field.required" :ref="field.name" />
      <DateTime v-if="field.type == 'datetime'" :label="field.name" :required="field.required" :ref="field.name" />
      <Decimal v-if="field.type == 'decimal'" :label="field.name" :required="field.required" :ref="field.name" />
      <Id v-if="field.type == 'id'" :label="field.name" :required="field.required" :ref="field.name" />
      <Instant v-if="field.type == 'instant'" :label="field.name" :required="field.required" :ref="field.name" />
      <Integer v-if="field.type == 'integer'" :label="field.name" :required="field.required" :ref="field.name" />
      <Markdown v-if="field.type == 'markdown'" :label="field.name" :required="field.required" :ref="field.name" />
      <Oid v-if="field.type == 'oid'" :label="field.name" :required="field.required" :ref="field.name" />
      <PositiveInt v-if="field.type == 'positiveint'" :label="field.name" :required="field.required" :ref="field.name" />
      <String v-if="field.type == 'string'" :label="field.name" :required="field.required" :ref="field.name" />
      <Time v-if="field.type == 'time'" :label="field.name" :required="field.required" :ref="field.name" />
      <UnsignedInt v-if="field.type == 'unsignedint'" :label="field.name" :required="field.required" :ref="field.name" />
      <Uri v-if="field.type == 'uri'" :label="field.name" :required="field.required" :ref="field.name" />
      <Url v-if="field.type == 'url'" :label="field.name" :required="field.required" :ref="field.name" />
      <Uuid v-if="field.type == 'uuid'" :label="field.name" :required="field.required" :ref="field.name" />
    </div>

    <v-layout align-center justify-end fill-height>
      <v-btn @click="cancel">cancel</v-btn>
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
    let inputs = [];

    if (this.fields && this.fields.length) {
      this.fields.forEach(field => {
        inputs.push(field.name);
      });
    }

    this.inputs = inputs;
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
      inputs: [],
      use: ""
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    changeFields(fields) {
      this.fields = fields;
    },
    getInputs() {
      let inputs = {};

      for (let i of this.inputs) {
        inputs[i] = this.$refs[i][0].getInput();
      }

      return inputs;
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
    },
  },
  props: ["fields"]
};
</script>
