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

  const fhirAxios = require('../modules/fhirAxios')
  fhirAxios.setOptions()

  beforeEach( () => {
    require('axios').__setFhirResults( MOCK_FHIR_OBJ )
  } )

  test( 'reads a FHIR resource', (done) => {
    fhirAxios.read( "Testing", "test" ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

  test( 'searches a FHIR resource', (done) => {
    fhirAxios.search( "Testing", { param: "query" } ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

  test( 'updates a FHIR resource', (done) => {
    fhirAxios.update( MOCK_FHIR_OBJ ).then ( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

} )
