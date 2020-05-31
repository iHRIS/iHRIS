'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

describe( 'interacts with FHIR server using axios', () => {
  const MOCK_FHIR_OBJ = {
    "resourceType": "Parameters",
    "id": "test",
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


  test( 'reads a FHIR resource', (done) => {
    require('axios').__setFhirResults( DEFAULT_URL + "Parameters/test", null, MOCK_FHIR_OBJ )
    fhirAxios.read( "Parameters", "test" ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

  test( 'searches a FHIR resource', (done) => {
    require('axios').__setFhirResults( DEFAULT_URL + "Parameters", { param: "query" }, MOCK_FHIR_OBJ )
    fhirAxios.search( "Parameters", { param: "query" } ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

  test( 'updates a FHIR resource', (done) => {
    require('axios').__setFhirResults( DEFAULT_URL + "Parameters/test", MOCK_FHIR_OBJ, MOCK_FHIR_OBJ )
    fhirAxios.update( MOCK_FHIR_OBJ ).then ( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

} )
