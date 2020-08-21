module.exports = {
  "CodeSystem": {
    "fields": {
      "code": {
        "field": "code",
        "id": "CodeSystem.code",
        "path": "CodeSystem.code",
        "label": "Code",
        "min": 1,
        "max": "1",
        "base-min": 1,
        "base-max": "1",
        "code": "string"
      },
      "display": {
        "field": "display",
        "id": "CodeSystem.display",
        "path": "CodeSystem.display",
        "label": "Display",
        "min": 1,
        "max": "1",
        "base-min": 1,
        "base-max": "1",
        "code": "string"
      },
      "definition": {
        "field": "definition",
        "id": "CodeSystem.definition",
        "path": "CodeSystem.definition",
        "label": "Definition",
        "min": 0,
        "max": "1",
        "base-min": 0,
        "base-max": "1",
        "code": "string"
      },
      "prop1": {
        "field": "prop1",
        "id": "CodeSystem.property.prop1",
        "path": "CodeSystem.property.prop1",
        "label": "First Property",
        "min": 0,
        "max": "1",
        "base-min": 0,
        "base-max": "1",
        "code": "string"
      },
      "prop2": {
        "field": "prop2",
        "id": "CodeSystem.property.prop2",
        "path": "CodeSystem.property.prop2",
        "label": "Second Property",
        "min": 0,
        "max": "1",
        "base-min": 0,
        "base-max": "1",
        "code": "Coding",
        "binding": "http://ihris.org/fhir/ValueSet/test"
      }
    }
  }
}
