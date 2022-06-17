Feature: Add security metadata to a new Basic

Scenario: Add a new Basic
    Given An existing Practitioner
      """
      {
        "resourceType": "Practitioner",
        "id": "1",
        "meta": {
          "versionId": "1",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            }
          ]
        },
        "name": [
          {
            "family": "Tester",
            "given": "Test"
          }
        ],
        "birthDate": "1991-08-06"
      }
      """
    When A new Basic is submitted
      """
      {
        "resourceType": "Basic",
        "extension": [
          {
            "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
            "valueReference": { "reference": "Practitioner/1" }
          }
        ]
      }
      """
    Then Security should be added on preProcess
      """
      {
        "resourceType": "Basic",
        "meta": {
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            }
          ]
        },
        "extension": [
          {
            "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
            "valueReference": { "reference": "Practitioner/1" }
          }
        ]
      }
      """
    Then The Basic should be saved
      """
      {
        "resourceType": "Basic",
        "meta": {
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            }
          ]
        },
        "extension": [
          {
            "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
            "valueReference": { "reference": "Practitioner/1" }
          }
        ]
      }
      """
    Then Nothing should be added on postProcess
      """
      {
        "resourceType": "Basic",
        "meta": {
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            }
          ]
        },
        "extension": [
          {
            "url": "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
            "valueReference": { "reference": "Practitioner/1" }
          }
        ]
      }
      """    
