'use strict'

jest.mock('axios')
jest.mock('fs')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

describe( 'Load modules from FHIR server', () => {
  const MOCK_CONFIG_OBJ = {
    "resourceType": "Parameters",
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
        "name": "config",
        "part": [
          {
            "name": "ihris",
            "valueString": "ihris-config"
          }
        ]
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
  const MOCK_FILE_DATA = JSON.stringify( MOCK_CONFIG_OBJ )
  const MOCK_FHIR_OBJ = {
    "resourceType": "Library",
    "id": "test-module",
    "meta": {
      "profile": [
        "http://ihris.org/fhir/StructureDefinition/ihris-module"
      ]
    },
    "type": {
      "coding": [
        {
          "code": "logic-library"
        }
      ]
    },
    "content": [
      {
        "title": "module-signature",
        "contentType": "text/x-sig",
        "data": "GgOdwlKjqehRbf1x8DpuDcndVpbqAEXc4879sbmPAkGuK0JixNmd1uovy4EJRD2PFYM2XyMZdoYUQLBErFb1IJ4NgjUdxN5yuZybaCXMusKZYMK91hJzHQgG6kkDioSWaZa3/e+hKn425eYNu2qNSROW1Tb9Jhw8jZvmtu4IEHM="
      },
      {
        "title": "module-code",
        "contentType": "application/javascript",
        "data": "Y29uc3QgdGVzdG1vZCA9IHsKICBsb2FkZWQ6IHRydWUsCiAgdGVzdFN0cmluZzogKCkgPT4gewogICAgcmV0dXJuICJ0ZXN0IgogIH0KfQoKbW9kdWxlLmV4cG9ydHMgPSB0ZXN0bW9kCg=="
      }
    ],
    "status": "active",
    "name": "ihris-example",
    "title": "iHRIS Example Module",
    "author": [
      {
        "name": "Test Author",
        "telecom": [
          {
            "system": "email",
            "value": "test@ihris.org"
          }
        ]
      }
    ]
  }





  beforeEach( () => {
    require('fs').__setMockFile( MOCK_FILE_DATA )
    require('axios').__setFhirResults( DEFAULT_URL + "Library/test-module", null, MOCK_FHIR_OBJ )
  } )

  test( 'load a module from FHIR', () => {
    const fhirModules = require('../modules/fhirModules')
    return fhirModules.require( "test-module" ).then( (requiredModule) => {
      expect( requiredModule.loaded ).toBeTruthy()
      expect( requiredModule.testString() ).toEqual( "test" )
    } )
  } )


} )
