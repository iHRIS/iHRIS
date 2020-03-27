<template>
  <v-alert :type="alertType" dismissable :v-show="alertShow">
    {{ alertMessage }}
  </v-alert>
</template>

<script>
export default {
  computed: {
    alertMessage() {
      if (this.message !== null) {
        return this.message;
      }

      return this.text;
    },
    alertShow() {
      if (this.show !== null) {
        return this.show;
      }

      return this.visible;
    },
    alertType() {
      if (this.t !== null) {
        return this.t;
      }

      return this.type;
    }
  },
  data() {
    return {
      message: null,
      show: null,
      t: null
    };
  },
  methods: {
    changeMessage(message, type) {
      this.message = message;
      this.show = true;
      this.t = type;
    },
    reset() {
      this.message = null;
      this.show = false;
      this.t = null;
    }
  },
  props: ["type", "text", "visible"]
};
</script>
