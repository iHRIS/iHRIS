import axios from "axios";

import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
  methods: {
    getSections() {
      return axios
        .get(
          this.getBackendUrl() +
            "/practitioner/describe/definition/iHRISPractitioner"
        )
        .then(response => {
          let fields = response.data.snapshot.element;
          let sections = [];

          fields.forEach(field => {
            if (
              // ignore extension fields
              field.id.endsWith(".extension") ||
              // these are all custom extensions but duplicated fields
              field.id.endsWith(".id") ||
              field.id.endsWith(".url") ||
              field.id.includes(".value[x]") ||
              // ignore practitioner and meta fields since they can't be customized
              field.id == "Practitioner" ||
              field.id == "Practitioner.meta" ||
              // hide active, that's handled separately
              field.id === "Practitioner.active" ||
              // if someone sets the max to be 0, then don't show it
              field.max == 0 ||
              // qualification lists additional fields so ignore them
              (field.id.includes("qualification") &&
                !field.id.endsWith("qualification"))
            ) {
              return;
            }

            sections.push(field);
          });

          // also add practitioner role for work history
          sections.push({
            id: "iHRISPractitionerRole.workHistory",
            path: "iHRISPractitionerRole.workHistory",
            short: "Roles/organizations the practitioner is associated with",
            definition:
              "A specific set of Roles/Locations/specialties/services that a practitioner may perform at an organization for a period of time.",
            min: 0,
            max: "*",
            type: [{ code: "iHRISPractitionerRole" }]
          });

          return Promise.resolve(sections);
        }).catch(() => {
          return Promise.reject([]);
        });
    }
  },
  mixins: [ConfigSettings]
};
