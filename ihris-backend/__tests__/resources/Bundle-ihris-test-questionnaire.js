module.exports = {
  "resourceType": "Bundle",
  "type": "transaction",
  "entry": [
    {
      "fullUrl": "urn:uuid:0b5467b9-c97a-53c8-b508-eb9a1e0a5210",
      "resource": {
        "resourceType": "Practitioner",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/StructureDefinition/Practitioner"
          ]
        },
        "name": [
          {
            "use": "official",
            "family": "Family",
            "given": [
              "First",
              "Middle"
            ]
          }
        ],
        "birthDate": "2001-10-22",
        "gender": "male",
        "telecom": [
          {
            "use": "mobile",
            "system": "phone",
            "value": "867-5309"
          },
          {
            "use": "work",
            "system": "email",
            "value": "test@ihris.org"
          }
        ],
        "identifier": [
          {
            "system": "http://ihris.org/ID/Test",
            "value": "123456789",
            "type": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                  "code": "FILL",
                  "display": "Filler Identifier"
                }
              ],
              "text": "Filler Identifier"
            }
          },
          {
            "system": "http://ihris.org/ID/Employee",
            "value": "123456789",
            "type": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                  "code": "EN",
                  "display": "Employee Number"
                }
              ],
              "text": "Employee Number"
            }
          }
        ]
      },
      "request": {
        "method": "POST",
        "url": "Practitioner"
      }
    },
    {
      "fullUrl": "urn:uuid:03a6822d-afb7-5b23-9be1-1c656cf7b991",
      "resource": {
        "resourceType": "PractitionerRole",
        "meta": {
          "profile": [
            "http://hl7.org/fhir/StructureDefinition/PractitionerRole"
          ]
        },
        "practitioner": {
          "reference": "urn:uuid:0b5467b9-c97a-53c8-b508-eb9a1e0a5210"
        },
        "code": {
          "coding": [
            {
              "code": "teacher",
              "system": "http://terminology.hl7.org/CodeSystem/practitioner-role"
            }
          ]
        },
        "period": {
          "start": "2020-01-20"
        }
      },
      "request": {
        "method": "POST",
        "url": "PractitionerRole"
      }
    }
  ]
}
