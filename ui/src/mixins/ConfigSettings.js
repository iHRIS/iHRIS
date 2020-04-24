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
    getBackendUrl() {
      let backend = this.config.backend;

      if (backend === undefined) {
        return null;
      }

      return backend;
    },
    getDashboards() {
      if (!this.config.dashboards) {
        return [];
      }

      if (!Array.isArray(this.config.dashboards)) {
        return [this.config.dashboards];
      }

      return this.config.dashboards;
    },
    getKibanaLink() {
      let kibana = this.config.kibana;

      if (kibana === undefined) {
        return null;
      }

      return kibana;
    },
    getMHeroDashboards() {
      if (!this.config.mHero) {
        return [];
      }

      if (!this.config.mHero.dashboards) {
        return [];
      }

      if (!Array.isArray(this.config.mHero.dashboards)) {
        return [this.config.mHero.dashboards];
      }

      return this.config.mHero.dashboards;
    },
    getSamplePractitioner() {
      // because this gets called in the data method, this might not
      // be loaded yet so check
      let config = this.config;

      if (!config) {
        config = require("@/config/config.json");
      }

      if (!config.samplePractitioner) {
        return false;
      }

      return config.samplePractitioner;
    },
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
      return config.mHero && config.mHero.installed === true;
    }
  }
};
