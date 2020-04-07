export default {
  methods: {
    capitalize(value) {
      // if not a string, do nothing with it
      if (typeof value !== "string") {
        return value;
      }

      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
