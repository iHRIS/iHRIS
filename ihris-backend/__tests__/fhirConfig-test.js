'use strict'

jest.mock('fs')

describe( 'converts a FHIR Parameters resource into configuration data', () => {
  const FILE_OUTPUT = {
    "fhir": { "base": "http://localhost:8080/hapi/fhir/" }, 
    "keys": { "ihris": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdeFrJr76IQ+SYAoAIw8crZKNW\nir2re7Z7Iu+XzeYYop5+36Ux6uEQKSXo7s1xY2ou9nCkVAddZ1qehBo0e2MCtk62\nmQJbBT18fiZ3veQPvb0LC/9aFl64RuOguPrCZC+sbZLegQ6Wwf96UWyqmR49gaHO\nEdXwdFdSVyBGyS7dmwIDAQAB\n-----END PUBLIC KEY-----" }
  }
  const REMOTE_OUTPUT = {
    "site": { "title": "iHRIS", "logo": "ihris-logo.png" }
  }
  const MOCK_OBJ = {
    "resourceType": "Parameters",
    "id": "base-config",
    "meta": {
      "profile": [
        "http://ihris.org/fhir/StructureDefinition/ihris-parameters-local-config"
      ]
    },
    "parameter": [
      {
        "name": "fhir:base",
        "valueString": "http://localhost:8080/hapi/fhir/"
      },
      {
        "name": "keys",
        "part": [
          {
            "name": "ihris",
            "valueString": "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdeFrJr76IQ+SYAoAIw8crZKNW\nir2re7Z7Iu+XzeYYop5+36Ux6uEQKSXo7s1xY2ou9nCkVAddZ1qehBo0e2MCtk62\nmQJbBT18fiZ3veQPvb0LC/9aFl64RuOguPrCZC+sbZLegQ6Wwf96UWyqmR49gaHO\nEdXwdFdSVyBGyS7dmwIDAQAB\n-----END PUBLIC KEY-----"
          }
        ]
      }
    ]
  }
  const MOCK_FILE_DATA = JSON.stringify( MOCK_OBJ )
  const MOCK_KEYS = [ MOCK_OBJ.parameter[1].part[0].valueString ]
  const MOCK_REMOTE_OBJ = {
    "resourceType": "Parameters",
    "id": "ihris-config",
    "meta": {
      "profile": [
        "http://ihris.org/fhir/StructureDefinition/ihris-parameters-remote-config"
      ]
    },
    "parameter": [
      {
        "name": "signature",
        "valueSignature": {
          "type": [
            {
              "code": "1.2.840.10065.1.12.1.14",
              "system": "urn:iso-astm:E1762-95:2013"
            }
          ],
          "data": "WjeTOCdz9Ol70fTl5q6S+bJKA0E/26nj7Ym/d+VVqsnkwh6TxIHqKKtjk7zfwa3X9Il76CQApk+KAZ1EKyagGrGp70H4pzX0zI9Vc1/iz2hGdIkMR+XRnER/LjNqwITLfARLrTWc9Pysc5ic1Cmjk12rfNn7eGJKQP/VX6AiPvA=",
          "when": "2020-05-13T00:00:00Z",
          "who": {
            "reference": "http://ihris.org/fhir/Organization/ihris"
          }
        }
      },
      {
        "name": "config",
        "part": [
          {
            "name": "site:title",
            "valueString": "iHRIS"
          },
          {
            "name": "site:logo",
            "valueString": "ihris-logo.png"
          },
          {
            "name": "fhir:invalid",
            "valueString": "This should be removed."
          }
        ]
      }
    ]
  }
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
          "code": "code",
          "binding": "http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1"
        }
      }
    }
  }



  const fhirConfig = require('../modules/fhirConfig')


  test( 'parses a FHIR Parameters resource from a file', () => {
    require('fs').__setMockFile( MOCK_FILE_DATA )
    const config = fhirConfig.parseFile( 'baseConfig.js' )

    expect( config ).toEqual( FILE_OUTPUT )
  } )

  test( 'parses a FHIR Parameters resource from a remote source', () => {
    const config = fhirConfig.parseRemote( MOCK_REMOTE_OBJ, MOCK_KEYS )

    expect( config ).toEqual( REMOTE_OUTPUT )
  } )

  test( 'parses a FHIR StructureDefinition based on mustSupport', () => {
    const structure = fhirConfig.parseStructureDefinition( MOCK_STRUCTUREDEFINITION )

    expect( structure ).toEqual( STRUCTURE )
  } )

} )
