Feature: Add security metadata to an updated Practitioner

Scenario: Update a Practitioner
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
    When An update to that Practitioner is submitted
      """
      {
        "resourceType": "Practitioner",
        "id": "1",
        "name": [
          {
            "family": "Tester",
            "given": "Test"
          }
        ],
        "birthDate": "1991-08-06",
        "gender": "female"
      }
      """
    Then Previous security should be updated on preProcess
      """
      {
        "resourceType": "Practitioner",
        "id": "1",
        "meta": {
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
        "birthDate": "1991-08-06",
        "gender": "female"
      }
      """
    Then The Practitioner should be saved
      """
      {
        "resourceType": "Practitioner",
        "id": "1",
        "meta": {
          "versionId": "2",
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
        "birthDate": "1991-08-06",
        "gender": "female"
      }
      """
    Then Nothing should be added on postProcess
      """
      {
        "resourceType": "Practitioner",
        "id": "1",
        "meta": {
          "versionId": "2",
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
        "birthDate": "1991-08-06",
        "gender": "female"
      }
      """    
