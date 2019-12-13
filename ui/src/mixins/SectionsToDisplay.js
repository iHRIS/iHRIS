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
            label = label.replace(".", "");

            if (label === "photo" || label === "active") {
              continue;
            }

            if (label === "qualification") {
              for (var k in field) {
                let qualification = {};

                if (field[k].code) {
                  qualification.type = field[k].code.text;
                }

                if (field[k].issuer) {
                  qualification.issuerCouncilOrStructure = field[k].issuer.name;
                }

                if (field[k].identifier) {
                  qualification.qualificationNumberOrId =
                    field[k].identifier[0].value;
                }

                if (field[k].period) {
                  qualification.dateReceived = field[k].period.start;
                  qualification.expirationDate = field[k].period.end;
                }

                field[k] = qualification;
              }
            }

            fields[label] = field;
          }
        }
      }

      // extensions are handled separately
      if (this.practitioner.extension) {
        for (i in this.practitioner.extension) {
          let extension = this.practitioner.extension[i];

          for (j in this.sections) {
            let section = this.sections[j];

            if (section.type[0].profile) {
              let profile = section.type[0].profile[0];

              if (profile == extension.url) {
                let data = {};

                // customize the output a bit
                for (k in extension) {
                  if (k !== "url") {
                    data = extension[k];
                  }
                }

                fields[section.label] = data;
              }
            }
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
