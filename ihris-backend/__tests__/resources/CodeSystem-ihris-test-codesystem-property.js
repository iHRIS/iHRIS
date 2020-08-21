module.exports = {
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 1,
  "entry": [ {
    "fullUrl": "http://ihris.org/fhir/CodeSystem/ihris-test-codesystem",
    "resource": {
      "resourceType": "CodeSystem",
      "id": "ihris-test-codesystem",
      "title": "iHRIS Test CodeSystem",
      "url": "//ihris.org/fhir/CodeSystem/ihris-test-codesystem",
      "property": [
        {
          "code": "prop1",
          "description": "First Property",
          "type": "string"
        },
        {
          "code": "prop2",
          "uri": "http://ihris.org/fhir/ValueSet/test",
          "description": "Second Property",
          "type": "Coding"
        }
      ]
    },
    "search": {
      "mode": "match"
    }
  } ]
}
