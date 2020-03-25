export default {
  created() {
    this.config = require("@/config/config.json");
  },
  data() {
    return {
      config: null
    };
  },
  methods: {
    isDemoMode() {
      // normally this would go in the created
      // but because we are using this in the router, i need to load it here
      const config = require("@/config/config.json");
      return config.demo && config.demo === true;
    },
    isMHeroEnabled() {
      // normally this would go in the created
      // but because we are using this in the router, i need to load it here
      const config = require("@/config/config.json");
      return config.mHero && config.mHero === true;
    }
  }
};
