<template>
  <v-alert :type="type" v-show="show">
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      show: false,
      type: null
    };
  },
  methods: {
    changeMessage(message, type) {
      this.message = message;
      this.show = true;
      this.type = type;
    },
    reset() {
      this.message = null;
      this.show = false;
      this.type = null;
    }
  }
};
</script>
