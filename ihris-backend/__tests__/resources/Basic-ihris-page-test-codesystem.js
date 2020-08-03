module.exports = {
  "resourceType": "Basic",
  "id": "ihris-page-test-codesystem",
  "meta": {
    "profile": [
      "http://ihris.org/fhir/StructureDefinition/ihris-page"
    ]
  },
  "code": {
    "coding": [
      {
        "code": "page",
        "system": "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem"
      }
    ]
  },
  "extension": [
    {
      "url": "http://ihris.org/fhir/StructureDefinition/ihris-page-display",
      "extension": [
        {
          "url": "resource",
          "valueReference": {
            "reference": "CodeSystem/ihris-test-codesystem"
          }
        },
        {
          "url": "search",
          "valueString": "Property One|prop1"
        },
        {
          "url": "search",
          "valueString": "Property Two|prop2"
        }
      ]
    },
    {
      "extension": [
        {
          "url": "title",
          "valueString": "Test CodeSystem"
        },
        {
          "url": "description",
          "valueString": "Code system details"
        },
        {
          "url": "name",
          "valueString": "CodeSystem"
        },
        {
          "url": "field",
          "valueString": "CodeSystem.code"
        },
        {
          "url": "field",
          "valueString": "CodeSystem.definition"
        },
        {
          "url": "field",
          "valueString": "CodeSystem.display"
        },
        {
          "url": "field",
          "valueString": "CodeSystem.prop2"
        },
        {
          "url": "field",
          "valueString": "CodeSystem.prop1"
        }
      ],
      "url": "http://ihris.org/fhir/StructureDefinition/ihris-page-section"
    }
  ]
}

