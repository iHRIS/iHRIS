'use strict'

jest.mock('axios')

describe( 'interacts with FHIR server using axios', () => {
  const MOCK_FHIR_OBJ = {
    "resourceType": "Parameters",
    "parameter": [
      {
        "name": "site:name",
        "valueString": "iHRIS"
      },
      {
        "name": "logo",
        "part": [
          {
            "name": "ihris",
            "valueString": "ihris-logo.png"
          }
        ]
      }
    ]
  }

  beforeEach( () => {
    require('axios').__setFhirResults( MOCK_FHIR_OBJ )
  } )

  test( 'reads a FHIR resource', () => {
    const fhirAxios = require('../modules/fhirAxios')()
    fhirAxios.read( "Testing", "test" ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
    } ).catch( (err) => {
      done( err )
    } )
  } )

} )
