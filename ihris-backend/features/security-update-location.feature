Feature: Add security metadata to a new Location

Scenario: Add a new Location
    Given A Location hierarchy exists
      """
      {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/country2",
            "resource": {
              "resourceType": "Location",
              "id": "country2",
              "name": "Country2"
            }
          }
        ]
      }
      """
    Given A Facility exists
      """
      {
        "resourceType": "Location",
        "id": "facility",
        "meta": {
          "versionId": "1",
          "security": [
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
        "status": "active",
        "name": "Facility",
        "partOf": { "reference": "Location/district" }
      }
      """        
    Given A District exists
      """
      {
        "resourceType": "Location",
        "id": "district",
        "meta": {
          "versionId": "1",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            }
          ]
        },
        "status": "active",
        "name": "District",
        "partOf": { "reference": "Location/country" }
      }
      """        
     When A District is updated
      """
      {
        "resourceType": "Location",
        "id": "district",
        "status": "active",
        "name": "District",
        "partOf": { "reference": "Location/country2" }
      }
      """
    Then Security should be added on preProcess
      """
      {
        "resourceType": "Location",
        "id": "district",
        "meta": {
          "security": [
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country2"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            }
          ]
        },
        "status": "active",
        "name": "District",
        "partOf": { "reference": "Location/country2" }
      }
      """
    Then The Location should be saved
      """
      {
        "resourceType": "Location",
        "id": "district",
        "meta": {
          "versionId": "2",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country2"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            }
          ]
        },
        "status": "active",
        "name": "District",
        "partOf": { "reference": "Location/country2" }
      }
      """
    Then Search results for location security are updated
      """
      {
        "resourceType": "Bundle",
        "type": "searchset",
        "entry": [
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/facility",
            "resource": {
              "resourceType": "Location",
              "id": "facility",
              "meta": {
                "versionId": "1",
                "security": [
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
              "status": "active",
              "name": "Facility",
              "partOf": { "reference": "Location/district" }
            }
          },
          {
            "fullUrl": "http://localhost:8080/hapi/fhir/Location/district",
            "resource": {
              "resourceType": "Location",
              "id": "district",
              "meta": {
                "versionId": "2",
                "security": [
                  {
                    "system": "http://ihris.org/fhir/security/location",
                    "code": "Location/country2"
                  },
                  {
                    "system": "http://ihris.org/fhir/security/location",
                    "code": "Location/district"
                  }
                ]
              },
              "status": "active",
              "name": "District",
              "partOf": { "reference": "Location/country2" }
            }
          }
        ]
      }
      """
    Then Facility should be updated
      """
      {
        "resourceType": "Location",
        "id": "facility",
        "meta": {
          "versionId": "1",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/facility"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country2"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            }
          ]
        },
        "status": "active",
        "name": "Facility",
        "partOf": { "reference": "Location/district" }
      }
      """
    Then Nothing should be added on postProcess
      """
      {
        "resourceType": "Location",
        "id": "district",
        "meta": {
          "versionId": "2",
          "security": [
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/country2"
            },
            {
              "system": "http://ihris.org/fhir/security/location",
              "code": "Location/district"
            }
          ]
        },
        "status": "active",
        "name": "District",
        "partOf": { "reference": "Location/country2" }
      }
      """ 
