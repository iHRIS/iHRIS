Feature: Add security metadata to a new Location

Scenario: Add a new Location
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
          }
        ]
      }
      """
    When A new Location is submitted
      """
      {
        "resourceType": "Location",
        "status": "active",
        "name": "Facility",
        "partOf": { "reference": "Location/district" }
      }
      """
    Then Security should be added on preProcess
      """
      {
        "resourceType": "Location",
        "meta": {
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
        "name": "Facility",
        "partOf": { "reference": "Location/district" }
      }
      """
    Then The Location should be saved
      """
      {
        "resourceType": "Location",
        "id": "1",
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
        "name": "Facility",
        "partOf": { "reference": "Location/district" }
      }
      """
    Then Location id should be added on postProcess
      """
      {
        "resourceType": "Location",
        "id": "1",
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
              "code": "Location/1"
            }
          ]
        },
        "status": "active",
        "name": "Facility",
        "partOf": { "reference": "Location/district" }
      }
      """    
