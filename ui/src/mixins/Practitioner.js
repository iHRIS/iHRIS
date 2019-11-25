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
        // differential contains the fields we want but snapshot contains more data that we need
        let fields = response.data.differential.element;
        let snapshot = response.data.snapshot.element;
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

          // find the matching field in the snapshot
          for (var i in snapshot) {
            if (field.id == snapshot[i].id && !field.definition && snapshot[i].definition) {
              field.definition = snapshot[i].definition;
              break;
            }
          }

          sections.push(field);
        });

        return Promise.resolve(sections);
      });
    }
  }
};
