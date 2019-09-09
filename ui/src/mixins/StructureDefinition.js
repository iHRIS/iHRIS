import axios from "axios";

export default {
  created() {
    const ParseConformance = require("fhir").ParseConformance;
    this.parser = new ParseConformance();
    this.config = require("../../config/config.json");
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
    describe(structureDefinition, parentDefinition) {
      let component = this;
      let url = "/practitioner/describe/definition/";

      if (structureDefinition == "BackboneElement") {
        url += parentDefinition;
      } else {
        url += structureDefinition.charAt(0).toUpperCase() + structureDefinition.slice(1);
      }

      return axios
        .get(url)
        .then(response => {
          if (response.status != 201) {
            return [];
          }

          let definition = this.parser.parseStructureDefinition(response.data);
          let fields = [];

          definition._properties.forEach(field => {
            fields = this.processField(field, fields, structureDefinition, response.data.snapshot.element, parentDefinition);
          });

          return Promise.resolve(fields);
        })
        .catch(err => {
          return [err];
        });
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
    processField(field, fields, structureDefinition, rawData, parentDefinition) {
      // skip fields we're not interested in
      if (field._type == "id" || field._type == "Extension" || field._type == "xhtml" || field._name == "id") {
        return fields;
      }

      if (this._self.primitiveTypes.indexOf(field._type) >= 0) {
        this._self.populate(field._name, structureDefinition, field, rawData);

        fields[field._name] = {
          subtitle: field._definition,
          title: field._name,
          id: field._name,
          options: field._short
            .split("|")
            .map(Function.prototype.call, String.prototype.trim),
          name: field._name,
          type: field._type,
          required: field._required,
          object: false,
          fields: []
        };
      } else if (field._type == "BackboneElement") {
        fields[field._name] = [];

        field._properties.forEach(subfield => {
          fields[field._name] = this._self.processField(subfield, fields[field._name], structureDefinition, rawData, parentDefinition);
        });
      } else if (this.structureDefinitions[field._type]) {
        fields[field._name] = this._self.structureDefinitions[field._type];
      } else {
        this._self.populate(field._name, structureDefinition, field, rawData);

        var options = field._short ? field._short.split("|")
            .map(Function.prototype.call, String.prototype.trim) : [];

        fields[field._name] = {
          subtitle: field._definition,
          title: field._name,
          id: field._name,
          options: options,
          name: field._name,
          type: field._type,
          required: field._required,
          object: true,
          fields: this._self.describe(
            field._type,
            structureDefinition
          )
        };

        this.structureDefinitions[field._type] = fields[field._name];
      }

      return fields;
    }
  }
};
