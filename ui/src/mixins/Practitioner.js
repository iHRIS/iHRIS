import axios from "axios";

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
    getSections() {
      return axios.get(this.config.backend + "/practitioner/describe/definition/iHRISPractitioner").then(response => {
        let fields = response.data.differential.element;
        let sections = [];

        fields.forEach(field => {
          // ignore the extension field(s)
          if (
            field.id.endsWith(".extension") ||
            field.id.endsWith(".value[x].system") ||
            field.id.endsWith(".value[x].code") ||
            field.id.endsWith(".value[x]")
          ) {
            return;
          }

          sections.push(field);
        });

        return Promise.resolve(sections);
      });
    }
  }
};
