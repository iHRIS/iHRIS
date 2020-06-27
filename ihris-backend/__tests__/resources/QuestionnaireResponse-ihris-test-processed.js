module.exports = {
  "resourceType": "QuestionnaireResponse",
  "questionnaire": "http://ihris.org/fhir/Questionnaire/ihris-test",
  "status": "completed",
  "item": [
    {
      "linkId": "Practitioner",
      "path": "Practitioner",
      "item": [
        {
          "linkId": "Practitioner.name[0]",
          "path": "Practitioner.name[X]",
          "item": [
            {
              "linkId": "Practitioner.name[0].use",
              "path": "Practitioner.name[0].use",
              "answer": [
                {
                  "valueCoding": {
                    "code": "official",
                    "system": "http://hl7.org/fhir/name-use"
                  }
                }
              ]
            },
            {
              "linkId": "Practitioner.name[0].family",
              "path": "Practitioner.name[0].family",
              "answer": [
                {
                  "valueString": "Family"
                }
              ]
            },
            {
              "linkId": "Practitioner.name[0].given[0]",
              "path": "Practitioner.name[0].given[0]",
              "answer": [
                {
                  "valueString": "First"
                },
                {
                  "valueString": "Middle"
                }
              ]
            }
          ]
        },
        {
          "linkId": "Practitioner.birthDate",
          "path": "Practitioner.birthDate",
          "answer": [
            {
              "valueDate": "2001-10-22"
            }
          ]
        },
        {
          "linkId": "Practitioner.gender",
          "path": "Practitioner.gender",
          "answer": [
            {
              "valueCoding": {
                "system": "http://hl7.org/fhir/administrative-gender",
                "code": "male"
              }
            }
          ]
        }
      ]
    },
    {
      "linkId": "__Practitioner:contact",
      "path": "__Practitioner:contact",
      "item": [
        {
          "linkId": "Practitioner.telecom[0].use",
          "path": "Practitioner.telecom[0].use",
          "answer": [
            {
              "valueCoding": {
                "code": "mobile",
                "system": "http://hl7.org/fhir/contact-point-use"
              }
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[0].system",
          "path": "Practitioner.telecom[0].system",
          "answer": [
            {
              "valueCoding": {
                "code": "phone",
                "system": "http://hl7.org/fhir/contact-point-system"
              }
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[0].value",
          "path": "Practitioner.telecom[0].value",
          "answer": [
            {
              "valueString": "867-5309"
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[1].use",
          "path": "Practitioner.telecom[1].use",
          "answer": [
            {
              "valueCoding": {
                "code": "work",
                "system": "http://hl7.org/fhir/contact-point-use"
              }
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[1].system",
          "path": "Practitioner.telecom[1].system",
          "answer": [
            {
              "valueCoding": {
                "code": "email",
                "system": "http://hl7.org/fhir/contact-point-system"
              }
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[1].value",
          "path": "Practitioner.telecom[1].value",
          "answer": [
            {
              "valueString": "test@ihris.org"
            }
          ]
        }
      ]
    },
    {
      "linkId": "PractitionerRole",
      "path": "PractitionerRole",
      "item": [
        {
          "linkId": "PractitionerRole.practitioner",
          "path": "PractitionerRole.practitioner",
          "answer": [
            {
              "valueString": "__REPLACE__Practitioner"
            }
          ]
        },
        {
          "linkId": "PractitionerRole.code",
          "path": "PractitionerRole.code",
          "answer": [
            {
              "valueCoding": {
                "code": "teacher",
                "system": "http://terminology.hl7.org/CodeSystem/practitioner-role"
              }
            }
          ]
        },
        {
          "linkId": "PractitionerRole.period.start",
          "path": "PractitionerRole.period.start",
          "answer": [
            {
              "valueDate": "2020-01-20"
            }
          ]
        }
      ]
    },
    {
      "linkId": "__Practitioner:identifier",
      "path": "__Practitioner:identifier",
      "item": [
        {
          "linkId": "Practitioner.identifier[0]",
          "path": "Practitioner.identifier[X]",
          "item": [
            {
              "linkId": "Practitioner.identifier[0].system",
              "path": "Practitioner.identifier[0].system",
              "answer": [
                {
                  "valueString": "http://ihris.org/ID/Test"
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[0].value",
              "path": "Practitioner.identifier[0].value",
              "answer": [
                {
                  "valueString": "123456789"
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[0].type",
              "path": "Practitioner.identifier[0].type",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                    "code": "FILL",
                    "display": "Filler Identifier"
                  }
                }
              ]
            }
          ]
        },
        {
          "linkId": "Practitioner.identifier[0]",
          "path": "Practitioner.identifier[X]",
          "item": [
            {
              "linkId": "Practitioner.identifier[0].system",
              "path": "Practitioner.identifier[1].system",
              "answer": [
                {
                  "valueString": "http://ihris.org/ID/Employee"
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[0].value",
              "path": "Practitioner.identifier[1].value",
              "answer": [
                {
                  "valueString": "123456789"
                }
              ]
            },
            {
              "linkId": "Practitioner.identifier[0].type",
              "path": "Practitioner.identifier[1].type",
              "answer": [
                {
                  "valueCoding": {
                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                    "code": "EN",
                    "display": "Employee Number"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
