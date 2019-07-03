<template>
  <v-form>
    <div v-for="field in fields" v-bind:key="field.id">
      <Base64Binary v-if="field.type == 'base64binary'" :label="field.name" :required="field.required" />
      <Boolean v-if="field.type == 'boolean'" :label="field.name" />
      <Canonical v-if="field.type == 'canonical'" :label="field.name" :required="field.required" />
      <Code v-if="field.type == 'code'" :label="field.name" :required="field.required" :codes="field.options" />
      <Date v-if="field.type == 'date'" :label="field.name" :required="field.required" />
      <DateTime v-if="field.type == 'datetime'" :label="field.name" :required="field.required" />
      <Decimal v-if="field.type == 'decimal'" :label="field.name" :required="field.required" />
      <Id v-if="field.type == 'id'" :label="field.name" :required="field.required" />
      <Instant v-if="field.type == 'instant'" :label="field.name" :required="field.required" />
      <Integer v-if="field.type == 'integer'" :label="field.name" :required="field.required" />
      <Markdown v-if="field.type == 'markdown'" :label="field.name" :required="field.required" />
      <Oid v-if="field.type == 'oid'" :label="field.name" :required="field.required" />
      <PositiveInt v-if="field.type == 'positiveint'" :label="field.name" :required="field.required" />
      <String v-if="field.type == 'string'" :label="field.name" :required="field.required" />
      <Time v-if="field.type == 'time'" :label="field.name" :required="field.required" />
      <UnsignedInt v-if="field.type == 'unsignedint'" :label="field.name" :required="field.required" />
      <Uri v-if="field.type == 'uri'" :label="field.name" :required="field.required" />
      <Url v-if="field.type == 'url'" :label="field.name" :required="field.required" />
      <Uuid v-if="field.type == 'uuid'" :label="field.name" :required="field.required" />
    </div>
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
  props: ["fields"]
};
</script>
