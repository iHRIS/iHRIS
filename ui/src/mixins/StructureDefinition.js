import axios from "axios";

export default {
  created() {
    this.config = require("@/config/config.json");
  },
  data() {
    return {
      config: null,
      parser: null,
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
      if (title == "qualification") {
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
        .get(this.config.backend + url)
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
            if (this.primitiveTypes.indexOf(type) >= 0 || type === "Reference") {
              fields[field.id] = this.formatField(field, type);
            } else {
              let subfields = this.getFields(field.type[0].code);

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
          path: "qualification.issuer.name",
          type: [{ code: "string" }],
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
    getFields(structureDefinition) {
      if (structureDefinition) {
        structureDefinition = structureDefinition.toLowerCase();
      }

      switch (structureDefinition) {
        case "coding":
          return this.getCodingFields();

        case "qualification":
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
        reference: null,
        object: false,
        fields: {}
      };

      if (type === "Reference") {
        formatted.reference = field.type[0].targetProfile[0];
      }

      return formatted;
    },
    populate(name, structureDefinition, field, rawData) {
      for (var i = 0; i < rawData.length; i++) {
        let sanitizedField =
          (structureDefinition == "BackboneElement" ? name.toLowerCase() : "") +
          rawData[i].id.slice(rawData[i].id.indexOf(".") + 1);

        if (sanitizedField == name) {
          field._short = rawData[i].short;
          field._definition = rawData[i].definition;

          break;
        }
      }
    },
    processField(
      field,
      fields,
      structureDefinition,
      rawData,
      parentDefinition
    ) {
      // skip fields we're not interested in
      if (
        field._type == "id" ||
        field._type == "Extension" ||
        field._type == "xhtml" ||
        field._name == "id"
      ) {
        return fields;
      }

      let options = [];

      if (this._self.primitiveTypes.indexOf(field._type) >= 0) {
        this._self.populate(field._name, structureDefinition, field, rawData);

        options = field._short
          ? field._short
              .split("|")
              .map(Function.prototype.call, String.prototype.trim)
          : [];

        fields[field._name] = {
          subtitle: field._definition,
          title: field._name,
          id: field._name,
          max: field._multiple ? "*" : 1,
          options: options,
          name: field._name,
          type: field._type,
          required: field._required,
          object: false,
          fields: {}
        };
      } else if (field._type == "BackboneElement") {
        this._self.populate(field._name, structureDefinition, field, rawData);

        options = field._short
          ? field._short
              .split("|")
              .map(Function.prototype.call, String.prototype.trim)
          : [];

        fields[field._name] = {
          subtitle: field._definition,
          title: field._name,
          id: field._name,
          max: field._multiple ? "*" : 1,
          options: options,
          name: field._name,
          type: field._type,
          required: field._required,
          object: true,
          fields: {}
        };

        field._properties.forEach(subfield => {
          let result = this._self.processField(
            subfield,
            [],
            structureDefinition,
            rawData,
            parentDefinition
          );

          if (result) {
            Object.keys(result).forEach(key => {
              fields[field._name].fields[key] = result[key];
            });
          }
        });
      } else if (this.structureDefinitions[field._type]) {
        fields[field._name] = this._self.structureDefinitions[field._type];
      } else {
        this._self.populate(field._name, structureDefinition, field, rawData);

        options = field._short
          ? field._short
              .split("|")
              .map(Function.prototype.call, String.prototype.trim)
          : [];

        fields[field._name] = {
          subtitle: field._definition,
          title: field._name,
          id: field._name,
          max: field._multiple ? "*" : 1,
          options: options,
          name: field._name,
          type: field._type,
          required: field._required,
          object: true,
          fields: this._self.describe(field._type, structureDefinition)
        };

        this.structureDefinitions[field._type] = fields[field._name];
      }

      return fields;
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

          this.$emit("toggleForm", fields.fields, title, data);
          return fields.fields;
        });
      }
    }
  }
};
