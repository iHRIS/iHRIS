module.exports = {
  "resourceType": "Questionnaire",
  "id": "ihris-test",
  "title": "iHRIS Test Questionnaire",
  "description": "iHRIS Test initial data entry questionnaire.",
  "url": "http://ihris.org/fhir/Questionnaire/ihris-test",
  "name": "ihris-test",
  "status": "active",
  "date": "2020-06-24",
  "purpose": "Data entry page for test.",
  "item": [
    {
      "linkId": "Practitioner",
      "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner",
      "text": "Health Worker|Primary demographic details",
      "type": "group",
      "item": [
        {
          "linkId": "Practitioner.name[0]",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name",
          "text": "Name",
          "type": "group",
          "item": [
            {
              "linkId": "Practitioner.name[0].use",
              "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name.use",
              "text": "Name Usage",
              "type": "choice",
              "required": true,
              "repeats": false,
              "readOnly": true,
              "answerOption": [
                {
                  "valueCoding": {
                    "code": "official",
                    "system": "http://hl7.org/fhir/name-use"
                  },
                  "initialSelected": true
                }
              ]
            },
            {
              "linkId": "Practitioner.name[0].family",
              "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name.family",
              "text": "Family Name",
              "type": "string",
              "required": true,
              "repeats": false
            },
            {
              "linkId": "Practitioner.name[0].given[0]",
              "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name.given",
              "text": "Given Name(s)",
              "type": "string",
              "required": true,
              "repeats": true
            }
          ]
        },
        {
          "linkId": "Practitioner.birthDate",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.birthDate",
          "text": "Date of Birth",
          "type": "date",
          "required": false,
          "repeats": false
        },
        {
          "linkId": "Practitioner.gender",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.gender",
          "text": "Gender",
          "type": "choice",
          "answerValueSet": "http://hl7.org/fhir/ValueSet/administrative-gender",
          "required": false,
          "repeats": false
        }
      ]
    },
    {
      "linkId": "__Practitioner:contact",
      "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner",
      "text": "Contact Details|Address, email, phone numbers",
      "type": "group",
      "item": [
        {
          "linkId": "Practitioner.telecom[0].use",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.use",
          "text": "Telecom Use",
          "type": "choice",
          "required": true,
          "repeats": false,
          "readOnly": true,
          "answerOption": [
            {
              "valueCoding": {
                "code": "mobile",
                "system": "http://hl7.org/fhir/contact-point-use"
              },
              "initialSelected": true
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[0].system",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.system",
          "text": "Telecom System",
          "type": "choice",
          "required": true,
          "repeats": false,
          "readOnly": true,
          "answerOption": [
            {
              "valueCoding": {
                "code": "phone",
                "system": "http://hl7.org/fhir/contact-point-system"
              },
              "initialSelected": true
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[0].value",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.value",
          "text": "Mobile Phone",
          "type": "string",
          "required": false,
          "repeats": false
        },
        {
          "linkId": "Practitioner.telecom[1].use",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.use",
          "text": "Telecom Use",
          "type": "choice",
          "required": true,
          "repeats": false,
          "readOnly": true,
          "answerOption": [
            {
              "valueCoding": {
                "code": "work",
                "system": "http://hl7.org/fhir/contact-point-use"
              },
              "initialSelected": true
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[1].system",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.system",
          "text": "Telecom System",
          "type": "choice",
          "required": true,
          "repeats": false,
          "readOnly": true,
          "answerOption": [
            {
              "valueCoding": {
                "code": "email",
                "system": "http://hl7.org/fhir/contact-point-system"
              },
              "initialSelected": true
            }
          ]
        },
        {
          "linkId": "Practitioner.telecom[1].value",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.value",
          "text": "Work Email",
          "type": "string",
          "required": false,
          "repeats": false
        }
      ]
    },
    {
      "linkId": "PractitionerRole",
      "definition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole",
      "text": "Position|Position the person holds",
      "type": "group",
      "item": [
        {
          "linkId": "PractitionerRole.practitioner",
          "definition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole#PractitionerRole.practitioner",
          "text": "Practitioner",
          "type": "string",
          "required": true,
          "repeats": false,
          "readOnly" : true,
          "answerOption": [
            {
              "valueString": "__REPLACE__Practitioner",
              "initialSelected": true
            }
          ]
        },
        {
          "linkId": "PractitionerRole.code",
          "definition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole#PractitionerRole.code",
          "text": "Job Title",
          "type": "choice",
          "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-job",
          "required": true,
          "repeats": false
        },
        {
          "linkId": "PractitionerRole.period.start",
          "definition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole#PractitionerRole.period.start",
          "text": "Start Date",
          "type": "date",
          "required": true,
          "repeats": false
        }
      ]
    },
    {
      "linkId": "__Practitioner:identifier",
      "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier",
      "text": "Identifiers|Identifiers for the practitioner",
      "type": "group",
      "item": [
        {
          "linkId": "Practitioner.identifier[0]",
          "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier",
          "text": "Identifier",
          "type": "group",
          "repeats": true,
          "required": false,
          "item": [
            {
              "linkId": "Practitioner.identifier[0].system",
              "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier.system",
              "text": "System",
              "type": "string",
              "repeats": false,
              "required": false
            },
            {
              "linkId": "Practitioner.identifier[0].value",
              "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier.value",
              "text": "ID Number",
              "type": "string",
              "repeats": false,
              "required": false
            },
            {
              "linkId": "Practitioner.identifier[0].type",
              "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier.type",
              "text": "ID Type",
              "type": "choice",
              "answerValueSet": "http://hl7.org/fhir/ValueSet/identifier-type",
              "repeats": false,
              "required": false
            }
          ]
        }
      ]
    }
  ]
}
