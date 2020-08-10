'use strict'

jest.mock('axios')
const nconf = require('../modules/config')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

describe( 'Lookup short names for resources or codes', () => {

  const MOCK_CODE_LOOKUP = {
    "resourceType": "Parameters",
    "parameter": [ {
      "name": "display",
      "valueString": "Test"
    } ]
  }
  const MOCK_VALUESET_LOOKUP = {
    "resourceType": "ValueSet",
    "id": "test-valueset",
    "compose": {
      "include": [ {
        "system": "test-system",
        "concept": [ {
          "code": "test3",
          "display": "Test ValueSet",
        }
        ]
      }
      ]
    }
  }
  const MOCK_STANDARD_RESOURCE = {
    "resourceType": "Location",
    "id": "test",
    "name": "Test Location"
  }
  const MOCK_COMPLEX_RESOURCE = {
    "resourceType": "Practitioner",
    "id": "test",
    "name": [
      {
        "use": "official",
        "family": "Tester",
        "given": [ "Test", "E." ]
      },
      {
        "use": "maiden",
        "family": "Testing"
      },
      {
        "use": "official",
        "family": "Tested",
        "given": [ "Testy", "R." ]
      }
    ]
  }

  const fhirShortName = require('../modules/fhirShortName')

  test( 'Lookup a codesystem value that exists', () => {
    require('axios').__setFhirResults( DEFAULT_URL + "CodeSystem/$lookup?system=test-system&code=test", null, MOCK_CODE_LOOKUP )
    fhirShortName._invalidateCache()
    return fhirShortName.lookup( { system: "test-system", code: "test" } ).then( (display) => {
      expect( display ).toEqual( "Test" )
    } )
  } )

  test( 'Lookup a codesystem value that doesn\'t exist', () => {
    require('axios').__setFhirResults( DEFAULT_URL + "CodeSystem/$lookup", { system: "test-system", code: "test" }, MOCK_CODE_LOOKUP )
    fhirShortName._invalidateCache()
    return fhirShortName.lookup( { system: "test-system", code: "test2" } ).then( (display) => {
      expect( display ).toEqual( "test2" )
    } )
  } )

  test( 'Lookup a codesystem value that doesn\'t exist so fallback to valueset', () => {
    require('axios').__setFhirResults( DEFAULT_URL + "ValueSet/test-valueset", null, MOCK_VALUESET_LOOKUP )
    fhirShortName._invalidateCache()
    return fhirShortName.lookup( { system: "test-system", code: "test3", valueset: "test-valueset" } ).then( (display) => {
      expect( display ).toEqual( "Test ValueSet" )
    } )
  } )

  test( 'resource standard lookup', () => {
    require('axios').__setFhirResults( DEFAULT_URL + "Location/test", null, MOCK_STANDARD_RESOURCE )
    fhirShortName._invalidateCache()
    return fhirShortName.lookup( { reference: "Location/test" } ).then( (display) => {
      expect( display ).toEqual( "Test Location" )
    } )
  } )

  test( 'resource complex lookup', () => {
    require('axios').__setFhirResults( DEFAULT_URL + "Practitioner/test", null, MOCK_COMPLEX_RESOURCE )
    fhirShortName._invalidateCache()
    nconf.use('memory')
    nconf.set('shortname:Practitioner:format', '%s, %s [%s]')
    nconf.set('shortname:Practitioner:order', 'family,given,id')
    nconf.set('shortname:Practitioner:paths:family:fhirpath', "name.where(use='official').first().family")
    nconf.set('shortname:Practitioner:paths:given:fhirpath', "name.where(use='official').first().given")
    nconf.set('shortname:Practitioner:paths:given:join', '-')
    nconf.set('shortname:Practitioner:paths:id:fhirpath', 'id')
    return fhirShortName.lookup( { reference: "Practitioner/test" } ).then( (display) => {
      expect( display ).toEqual( "Tester, Test-E. [test]" )
    } )
  } )

} )
