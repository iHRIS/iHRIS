Feature: Add security metadata to a new Practitioner

Scenario: Add a new Practitioner
    Given A new Practitioner
      """
      {
        "resourceType": "Practitioner",
        "name": [
          {
            "family": "Tester",
            "given": "Test"
          }
        ],
        "birthDate": "1991-08-06"
      }
      """
    When The Practitioner is submitted
    Then Nothing should be added on preProcess
      """
      {
        "resourceType": "Practitioner",
        "meta": {
          "security": []
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
    Then The Practitioner should be saved
      """
      {
        "resourceType": "Practitioner",
        "id": "1",
        "meta": {
          "versionId": "1",
          "security": []
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
    Then Security tags should be added on postProcess
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
