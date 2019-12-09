<template>
  <v-layout row wrap class="pb-5">
    <v-flex xs1 v-if="practitioner.photo">
      <v-img :src="getProfilePicture()" contain />
    </v-flex>
    <v-flex xs6 class="display-2 text-xs-left pl-3" v-if="practitioner.name">
      {{ name }}
    </v-flex>
    <v-flex xs3 offset-xs3>
      <Alert ref="alert" />
    </v-flex>
  </v-layout>
</template>

<script>
import Alert from "@/components/Layout/Alert.vue";

export default {
  components: {
    Alert
  },
  computed: {
    name() {
      let name = "";

      if (this.practitioner.name[0].prefix) {
        name += this.practitioner.name[0].prefix[0] + " ";
      }

      if (this.practitioner.name[0].given) {
        name += this.practitioner.name[0].given[0] + " ";
      }

      if (this.practitioner.name[0].family) {
        name += this.practitioner.name[0].family + " ";
      }

      if (this.practitioner.name[0].suffix) {
        name += this.practitioner.name[0].suffix[0] + " ";
      }

      return name;
    }
  },
  methods: {
    changeMessage(message, type) {
      this.$refs.alert.changeMessage(message, type);
    },
    getProfilePicture() {
      return this.practitioner.photo[0].url;
    },
    reset() {
      this.$refs.alert.reset();
    }
  },
  props: ["practitioner"]
};
</script>
