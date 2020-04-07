import axios from "axios";

import Capitalize from "@/mixins/Capitalize.js";
import ConfigSettings from "@/mixins/ConfigSettings.js";

export default {
  data() {
    return {
      primitiveTypes: [
        "base64Binary",
        "boolean",
        "canonical",
        "code",
        "date",
        "dateTime",
        "decimal",
        "id",
        "instant",
        "integer",
        "markdown",
        "oid",
        "positiveInt",
        "string",
        "time",
        "unsignedInt",
        "uri",
        "url",
        "uuid",
        "xhtml"
      ],
      structureDefinitions: []
    };
  },
  methods: {
    describe(structureDefinition, parentDefinition, title) {
      let url = "/practitioner/describe/definition/";

      if (!structureDefinition) {
        return;
      }

      if (structureDefinition == "BackboneElement") {
        url += parentDefinition;
      } else {
        url += structureDefinition;
      }

      // qualification is a special case
      if (title == "Qualifications") {
        let fields = this.getFields(title);
        let qualification = [];

        fields.forEach(field => {
          qualification[field.id] = this.formatField(field);
        });

        return Promise.resolve({
          id: title,
          fields: qualification
        });
      }

      return axios
        .get(this.getBackendUrl() + url)
        .then(response => {
          if (response.status != 201) {
            return [];
          }

          let definition = response.data.snapshot.element;
          let fields = {};

          definition.forEach(field => {
            // if it doesn't have a type, ignore it
            if (!field.type) {
              return;
            }

            // ignore id fields
            if (field.id.endsWith(".id")) {
              return;
            }

            let type = field.type[0].code;

            // if this is a primitive type, we are done
            if (
              this.primitiveTypes.indexOf(type) >= 0 ||
              type === "Reference"
            ) {
              fields[field.id] = this.formatField(field, type);
            } else {
              let subfields = this.getFields(field.type[0].code, field);

              subfields.forEach(subfield => {
                fields[subfield.id] = this.formatField(
                  subfield,
                  field.type[0].code
                );
              });
            }
          });

          return Promise.resolve({
            id: title,
            fields: fields
          });
        })
        .catch(err => {
          return [err];
        });
    },
    getCodeableConceptFields(field) {
      return [
        {
          definition: field.definition,
          short: field.short,
          id: field.id + ".text",
          labelOverride: this.capitalize(
            field.id.slice(field.id.lastIndexOf(".") + 1)
          ),
          max: field.max,
          type: [{ code: "string" }],
          min: field.min
        }
      ];
    },
    getCodingFields() {
      return [
        {
          definition: null,
          short: null,
          id: "Coding.code",
          max: "1",
          type: [{ code: "string" }],
          min: 0
        }
      ];
    },
    getPeriodFields(field) {
      return [
        {
          definition: field.definition,
          short: field.short,
          id: field.id + ".start",
          labelOverride: "Start",
          max: field.max,
          min: field.min,
          type: [{ code: "dateTime" }]
        },
        {
          definition: field.definition,
          short: field.short,
          id: field.id + ".end",
          labelOverride: "End",
          max: field.max,
          min: field.min,
          type: [{ code: "dateTime" }]
        }
      ];
    },
    getQualificationFields() {
      return [
        {
          definition: null,
          short: "Registration | License | Other Certification",
          id: "Qualification.type",
          max: 1,
          path: "qualification.code.text",
          type: [{ code: "code" }],
          min: 0
        },
        {
          short: null,
          definition: "Issuer council or structure",
          id: "Qualification.issuer",
          max: 1,
          path: "qualification.issuer",
          type: [
            {
              code: "Reference",
              targetProfile: [
                "http://hl7.org/fhir/StructureDefinition/Organization"
              ]
            }
          ],
          min: 0
        },
        {
          short: null,
          definition: "Qualification number / ID",
          id: "Qualification.number",
          max: 1,
          path: "qualification.identifier.value",
          type: [{ code: "string" }],
          min: 0
        },
        {
          short: null,
          definition: "Date received",
          id: "Qualification.received",
          max: 1,
          path: "qualification.period.start",
          type: [{ code: "date" }],
          min: 0
        },
        {
          short: null,
          definition: "Expiration date",
          id: "Qualification.expiration",
          max: 1,
          path: "qualification.period.end",
          type: [{ code: "date" }],
          min: 0
        }
      ];
    },
    getFields(structureDefinition, field) {
      if (structureDefinition) {
        structureDefinition = structureDefinition.toLowerCase();
      }

      switch (structureDefinition) {
        case "codeableconcept":
          return this.getCodeableConceptFields(field);

        case "coding":
          return this.getCodingFields();

        case "period":
          return this.getPeriodFields(field);

        case "qualification":
        case "qualifications":
          return this.getQualificationFields();

        default:
          return [];
      }
    },
    formatField(field, parentType) {
      let name = field.id.slice(field.id.indexOf(".") + 1);
      let options = field.short
        ? field.short
            .split("|")
            .map(Function.prototype.call, String.prototype.trim)
        : [];

      let type = field.type[0].code;

      name = name.replace("[x]", "");

      let formatted = {
        labelOverride: field.labelOverride,
        subtitle: field.definition,
        short: field.short,
        title: name,
        id: field.id,
        max: field.max,
        path: field.path,
        options: options,
        name: name,
        type: type,
        parentType: parentType,
        required: field.min > 0,
        reference: name,
        object: false,
        fields: {}
      };

      if (type === "Reference") {
        formatted.reference = field.type[0].targetProfile[0];
      }

      return formatted;
    },
    showForm(title, definition, data) {
      if (this.primitiveTypes.includes(definition)) {
        let fields = [];
        fields.push(this.formatField(data, definition));
        this.$emit("toggleForm", fields, title);
        return Promise.resolve(fields);
      } else {
        return this.describe(definition, "Practitioner", title).then(fields => {
          // sometimes we don't want all the fields so we limit them here
          if (title === "photo") {
            let customFields = {};
            customFields["Attachment.url"] = fields.fields["Attachment.url"];
            fields.fields = customFields;
          }

          // we don't want to show the practitioner field, we'll fill that in ourselves
          if (definition === "iHRISPractitionerRole") {
            delete fields.fields["PractitionerRole.practitioner"];
          }

          this.$emit("toggleForm", fields.fields, title, data);
          return fields.fields;
        });
      }
    }
  },
  mixins: [Capitalize, ConfigSettings]
};
