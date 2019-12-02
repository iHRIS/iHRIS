import axios from "axios";

export default {
  created() {
    const ParseConformance = require("fhir").ParseConformance;
    this.parser = new ParseConformance();
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
    describe(structureDefinition, parentDefinition, id) {
      let url = "/practitioner/describe/definition/";

      if (!structureDefinition) {
        return;
      }

      if (structureDefinition == "BackboneElement") {
        url += parentDefinition;
      } else {
        url += structureDefinition;
      }

      return axios
        .get(this.config.backend + url)
        .then(response => {
          if (response.status != 201) {
            return [];
          }

          let definition = response.data.snapshot.element;

          let fields = {};
          let promises = [];

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
            if (this.primitiveTypes.indexOf(type) >= 0) {
              fields[field.id] = this.formatField(field);
            } else {
              // this is going to require a recursive load of the properties
              // if the type is a reference then we need to load what it is referencing
              if (type == "Reference") {
                // this is a special case, let's come back to it later
                return;
              } else {
                let subfields = this.getFields(field.type[0].code);

                if (subfields) {
                  fields[field.id] = subfields;
                }
              }
            }
          });

          return Promise.resolve({
            id: id,
            fields: fields
          });
        })
        .catch(err => {
          return [err];
        });
    },
    getFields(structureDefinition) {
      switch (structureDefinition) {
        case "Identifier":
          return this.getIdentifierFields();
      }

      return null;
    },
    getIdentifierFields() {

    },
    recursiveDescribe(structureDefinition, id) {
      let url = "/practitioner/describe/definition/";

      if (!structureDefinition) {
        return;
      }

      url += structureDefinition;

      console.log("Recursive " + structureDefinition);

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

            let type = field.type[0].code;

            // if this is a primitive type, we are done
            if (this.primitiveTypes.indexOf(type) >= 0) {
              fields[field.id] = this.formatField(field);
            }
          });

          return Promise.resolve(fields);
        })
        .catch(err => {
          return [err];
        });
    },
    formatField(field) {
      let name = field.id.slice(field.id.indexOf(".") + 1);
      let options = field.short
        ? field.short
            .split("|")
            .map(Function.prototype.call, String.prototype.trim)
        : [];
      let type = field.type[0].code;

      let formatted = {
        subtitle: field.definition,
        short: field.short,
        title: name,
        id: field.id,
        max: field.max,
        options: options,
        name: name,
        type: type,
        required: field.min > 0,
        object: false,
        fields: {}
      };

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
    }
  }
};
