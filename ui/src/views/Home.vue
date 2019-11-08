<template>
  <v-container>
    <Alert ref="alert" />

    Dashboard
  </v-container>
</template>

<script>
import Alert from "@/components/Layout/Alert.vue";

export default {
  components: {
    Alert
  },
  mounted() {
    if (this.login) {
      this.$refs.alert.changeMessage("Login successful", "success");
    }
  },
  props: {
    login: {
      default: false,
      type: Boolean
    }
  }
};
</script>
