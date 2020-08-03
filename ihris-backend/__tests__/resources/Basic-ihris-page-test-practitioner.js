module.exports = {
  "resourceType": "Basic",
  "id": "ihris-page-test-practitioner",
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
            "reference": "StructureDefinition/ihris-test-practitioner"
          }
        },
        {
          "url": "search",
          "valueString": "Surname|name.where(use='official').family"
        },
        {
          "url": "filter",
          "valueString": "Name|name:contains"
        },
        {
          "url": "search",
          "valueString": "Given Name(s)|name.where(use='official').given"
        },
        {
          "url": "search",
          "valueString": "Birth Date|birthDate"
        },
        {
          "url": "search",
          "valueString": "Gender|gender"
        },
        {
          "url": "filter",
          "valueString": "Gender|gender"
        }
      ]
    },
    {
      "extension": [
        {
          "url": "title",
          "valueString": "Health Worker"
        },
        {
          "url": "description",
          "valueString": "Primary demographic details"
        },
        {
          "url": "name",
          "valueString": "Practitioner"
        },
        {
          "url": "field",
          "valueString": "Practitioner.name"
        },
        {
          "url": "field",
          "valueString": "Practitioner.name.given"
        },
        {
          "url": "field",
          "valueString": "Practitioner.name.family"
        },
        {
          "url": "field",
          "valueString": "Practitioner.birthDate"
        },
        {
          "url": "field",
          "valueString": "Practitioner.gender"
        },
        {
          "url": "field",
          "valueString": "Practitioner.extension:residence"
        }
      ],
      "url": "http://ihris.org/fhir/StructureDefinition/ihris-page-section"
    },
    {
      "extension": [
        {
          "url": "title",
          "valueString": "Identifiers"
        },
        {
          "url": "description",
          "valueString": "Personal identifiers"
        },
        {
          "url": "name",
          "valueString": "identifiers"
        },
        {
          "url": "field",
          "valueString": "Practitioner.identifier"
        },
        {
          "url": "field",
          "valueString": "Practitioner.identifier.use"
        },
        {
          "url": "field",
          "valueString": "Practitioner.identifier.type"
        },
        {
          "url": "field",
          "valueString": "Practitioner.identifier.value"
        },
        {
          "url": "field",
          "valueString": "Practitioner.identifier.system"
        }
      ],
      "url": "http://ihris.org/fhir/StructureDefinition/ihris-page-section"
    },
    {
      "extension": [
        {
          "url": "title",
          "valueString": "Position"
        },
        {
          "url": "description",
          "valueString": "Position the person holds"
        },
        {
          "url": "name",
          "valueString": "position"
        },
        {
          "url": "field",
          "valueString": "PractitionerRole.code"
        },
        {
          "extension": [
            {
              "url": "resource",
              "valueReference": {
                "reference": "StructureDefinition/ihris-test-practitioner-role"
              }
            },
            {
              "url": "linkfield",
              "valueString": "PractitionerRole.practitioner"
            },
            {
              "url": "column",
              "extension": [
                {
                  "url": "header",
                  "valueString": "Job"
                },
                {
                  "url": "field",
                  "valueString": "PractitionerRole.code.coding[0]"
                }
              ]
            },
            {
              "extension": [
                {
                  "url": "header",
                  "valueString": "Start Date"
                },
                {
                  "url": "field",
                  "valueString": "PractitionerRole.period.start"
                }
              ],
              "url": "column"
            }
          ],
          "url": "resource"
        }
      ],
      "url": "http://ihris.org/fhir/StructureDefinition/ihris-page-section"
    }
  ]
}
