'use strict'

const jest_setup = require('../jest-setup')
jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const def = require('../modules/fhirDefinition')
const axios = require('axios')

describe( 'Test FHIR StructureDefinition processing', () => {

  const STRUCTUREDEFINITION_PRACTITIONER = require("./resources/StructureDefinition-Practitioner")
  const STRUCTUREDEFINITION_CONTACTPOINT = require("./resources/StructureDefinition-ContactPoint")
  const STRUCTUREDEFINITION_PERIOD = require("./resources/StructureDefinition-Period")
  const MOCK_STRUCTUREDEFINITION = {
    "resourceType": "StructureDefinition",
    "id": "test-practitioner",
    "snapshot": {
      "element": [
        {
          "id": "Practitioner",
          "path": "Practitioner",
          "short": "A person with a  formal responsibility in the provisioning of healthcare or related services",
          "definition": "A person who is directly or indirectly involved in the provisioning of healthcare.",
          "min": 0,
          "max": "*",
          "base": { "path": "Practitioner", "min": 0, "max": "*" },
        },
        {
          "id": "Practitioner.extension",
          "path": "Practitioner.extension",
          "slicing": {
            "discriminator": [ { "type": "value", "path": "url" } ],
            "ordered": false,
            "rules": "open"
          },
          "max": "*",
          "base": { "path": "DomainResource.extension", "min": 0, "max": "*" },
          "type": [ { "code": "Extension" } ]
        },
        {
          "id": "Practitioner.extension:residence",
          "path": "Practitioner.extension",
          "sliceName": "residence",
          "min": 0,
          "max": "1",
          "base": { "path": "DomainResource.extension", "min": 0, "max": "*" },
          "type": [ { "code": "Extension", "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-residence" ] } ],
          "mustSupport": true
        },
        {
          "id": "Practitioner.extension:residence.value[x]:valueReference",
          "path": "Practitioner.extension.value[x]",
          "sliceName": "valueReference",
          "label": "Residence",
          "min": 1,
          "max": "1",
          "base": { "path": "Extension.value[x]", "min": 0, "max": "1" },
          "type": [ { "code": "Reference", "targetProfile": [ "http://hl7.org/fhir/StructureDefinition/Location" ] } ],
          "mustSupport": true
        },
        {
          "id": "Practitioner.extension:residence.value[x]:valueReference.reference",
          "path": "Practitioner.extension.value[x].reference",
          "label": "Location",
          "min": 1,
          "max": "1",
          "base": { "path": "Reference.reference", "min": 0, "max": "1" },
          "type": [ { "code": "string" } ],
          "mustSupport": true
        },
        {
          "id": "Practitioner.gender",
          "path": "Practitioner.gender",
          "label": "Gender",
          "min": 1,
          "max": "1",
          "base": { "path": "Practitioner.gender", "min": 0, "max": "1" },
          "type": [ { "code": "code" } ],
          "mustSupport": true,
          "binding": { "valueSet": "http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1" }
        }
      ]
    }
  }
  const STRUCTURE = {
    "Practitioner": {
      "fields": {
        "extension:residence": {
          "field": "extension:residence",
          "id": "Practitioner.extension:residence",
          "path": "Practitioner.extension",
          "sliceName": "residence",
          "min": 0,
          "max": "1",
          "base-min": 0,
          "base-max": "*",
          "code": "Extension",
          "profile": [
            "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-residence"
          ],
          "fields": {
            "value[x]:valueReference": {
              "field": "value[x]:valueReference",
              "id": "Practitioner.extension:residence.value[x]:valueReference",
              "path": "Practitioner.extension.value[x]",
              "label": "Residence",
              "sliceName": "valueReference",
              "min": 1,
              "max": "1",
              "base-min": 0,
              "base-max": "1",
              "code": "Reference",
              "targetProfile": [ "http://hl7.org/fhir/StructureDefinition/Location" ],
              "fields": {
                "reference": {
                  "field": "reference",
                  "id": "Practitioner.extension:residence.value[x]:valueReference.reference",
                  "path": "Practitioner.extension.value[x].reference",
                  "label": "Location",
                  "min": 1,
                  "max": "1",
                  "base-min": 0,
                  "base-max": "1",
                  "code": "string"
                }
              }
            }
          }
        },
        "gender": {
          "field": "gender",
          "id": "Practitioner.gender",
          "path": "Practitioner.gender",
          "label": "Gender",
          "min": 1,
          "max": "1",
          "base-min": 0,
          "base-max": "1",
          "code": "code",
          "binding": "http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1"
        }
      }
    }
  }

  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/Practitioner", null, 
    STRUCTUREDEFINITION_PRACTITIONER )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ContactPoint", null, 
    STRUCTUREDEFINITION_CONTACTPOINT )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/Period", null, 
    STRUCTUREDEFINITION_PERIOD )

  test( 'test getFieldDefinition', (done) => {
    def.getFieldDefinition( "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.period.start" ).then( (field) => {
      expect(field.id).toEqual("Period.start")
      expect(field.type[0].code).toEqual("dateTime")
      done()
    } )
  } )

  test( 'parses a FHIR StructureDefinition based on mustSupport', () => {
    const structure = def.parseStructureDefinition( MOCK_STRUCTUREDEFINITION )

    expect( structure ).toEqual( STRUCTURE )
  } )
  test( 'parses a FHIR CodeSystem to get properties', () => {
    const CODESYSTEM_PROPERTY = require("./resources/CodeSystem-ihris-test-codesystem-property")
    const CODESYSTEM_STRUCTURE = require("./resources/codesystem-property-output")
    const resource = CODESYSTEM_PROPERTY.entry[0].resource
    const structure = def.parseCodeSystem( resource )
    expect(structure).toEqual(CODESYSTEM_STRUCTURE)
  } )


} )
