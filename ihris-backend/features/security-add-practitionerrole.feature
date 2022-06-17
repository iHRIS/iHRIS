Feature: Add security metadata to a new PractitionerRole

Scenario: Add a new PractitionerRole
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
    Given Practitioner search results for security
      """
      {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Practitioner/1",
            "resource": {
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
          }
        ]
      }
      """
    Given Basic search results for security
      """
      {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
        ]
      }
      """
    Given A Location hierarchy exists
      """
      {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/country",
            "resource": {
              "resourceType": "Location",
              "id": "country",
              "name": "Country"
            }
          },
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/district",
            "resource": {
              "resourceType": "Location",
              "id": "district",
              "name": "District",
              "partOf": { "reference": "Location/country" }
            }
          },
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/facility",
            "resource": {
              "resourceType": "Location",
              "id": "facility",
              "name": "Facility",
              "partOf": { "reference": "Location/district" }
            }
          }
        ]
      }
      """
    When A new PractitionerRole is submitted
      """
      {
        "resourceType": "PractitionerRole",
        "active": true,
        "practitioner": { "reference": "Practitioner/1" },
        "location": { "reference": "Location/facility" }
      }
      """
    Then Security should be added on preProcess
      """
      {
        "resourceType": "PractitionerRole",
        "active": true,
        "meta": {
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/facility"
            }
          ]
        },
        "practitioner": { "reference": "Practitioner/1" },
        "location": { "reference": "Location/facility" }
      }
      """
    Then The PractitionerRole should be saved
      """
      {
        "resourceType": "PractitionerRole",
        "id": "1",
        "active": true,
        "meta": {
          "versionId": "1",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/facility"
            }
          ]
        },
        "practitioner": { "reference": "Practitioner/1" },
        "location": { "reference": "Location/facility" }
      }
      """
    Then PractitionerRole search results for security
      """
      {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/PractitionerRole/1",
            "resource": {
              "resourceType": "PractitionerRole",
              "id": "1",
              "active": true,
              "meta": {
                "versionId": "1",
                "security": [
                  {
                    "system": "http://ihris.org/fhir/security/practitioner",
                    "code": "Practitioner/1"
                  },
                  {
                    "system": "http://ihris.org/fhir/security/location",
                    "code": "Location/country"
                  },
                  {
                    "system": "http://ihris.org/fhir/security/location",
                    "code": "Location/district"
                  },
                  {
                    "system": "http://ihris.org/fhir/security/location",
                    "code": "Location/facility"
                  }
                ]
              },
              "practitioner": { "reference": "Practitioner/1" },
              "location": { "reference": "Location/facility" }
            }
          }
        ]
      }
      """
    Then Role Locations should exist
      """
      {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/PractitionerRole/1",
            "resource": {
              "resourceType": "PractitionerRole",
              "id": "1",
              "active": true,
              "practitioner": { "reference": "Practitioner/1" },
              "location": { "reference": "Location/facility" }
            }
          },
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/country",
            "resource": {
              "resourceType": "Location",
              "id": "country",
              "name": "Country"
            }
          },
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/district",
            "resource": {
              "resourceType": "Location",
              "id": "district",
              "name": "District",
              "partOf": { "reference": "Location/country" }
            }
          },
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/facility",
            "resource": {
              "resourceType": "Location",
              "id": "facility",
              "name": "Facility",
              "partOf": { "reference": "Location/district" }
            }
          }
        ]
      }
      """
    Then Should attempt to update Practitioner
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
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/facility"
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
    Then Should attempt to update PractitionerRole
      """
      {
        "resourceType": "PractitionerRole",
        "id": "1",
        "active": true,
        "meta": {
          "versionId": "1",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/facility"
            }
          ]
        },
        "practitioner": {
          "reference": "Practitioner/1"
        },
        "location": {
          "reference": "Location/facility"
        }
      }
      """
    Then Nothing should be added on postProcess
      """
      {
        "resourceType": "PractitionerRole",
        "id": "1",
        "active": true,
        "meta": {
          "versionId": "1",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/practitioner",
              "code": "Practitioner/1"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/facility"
            }
          ]
        },
        "practitioner": { "reference": "Practitioner/1" },
        "location": { "reference": "Location/facility" }
      }
      """    
