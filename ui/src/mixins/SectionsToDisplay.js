import axios from "axios";

import Practitioner from "@/mixins/Practitioner.js";

export default {
  created() {
    this.config = require("@/config/config.json");

    this.getSections().then(sections => {
      this.sections = sections;
    });

    axios
      .get(this.config.backend + "/practitioner/view/" + this.$route.params.id)
      .then(practitioner => {
        if (practitioner.status === 201) {
          this.practitioner = practitioner.data.entry[0].resource;
        }
      });
  },
  computed: {
    display() {
      let fields = {};

      for (var i in this.practitioner) {
        let field = this.practitioner[i];

        for (var j in this.sections) {
          let section = this.sections[j];

          if (section.id == "Practitioner." + i) {
            let label = section.label ? section.label : i;
            fields[label] = field;
          }
        }
      }

      return fields;
    }
  },
  data() {
    return {
      config: null,
      practitioner: {},
      sections: []
    };
  },
  mixins: [Practitioner]
};
