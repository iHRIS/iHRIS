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
  const MOCK_VALUESET_OBJ = {
    "resourceType": "ValueSet",
    "status": "active",
    "compose": {
      "include": [
        {
          "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission"
        }
      ]
    },
    "expansion": {
      "identifier": "e70e692c-1155-41ae-95d2-3bae153914b9",
      "timestamp": "2020-05-31T05:29:38+00:00",
      "total": 4,
      "offset": 0,
      "parameter": [
        {
          "name": "offset",
          "valueInteger": 0
        },
        {
          "name": "count",
          "valueInteger": 2
        }
      ],
      "contains": [
        {
          "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
          "code": "*",
          "display": "All"
        },
        {
          "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
          "code": "read",
          "display": "Read"
        }
      ]
    }
  }
  const MOCK_VALUESET_OBJ_2 = {
    "resourceType": "ValueSet",
    "status": "active",
    "compose": {
      "include": [
        {
          "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission"
        }
      ]
    },
    "expansion": {
      "identifier": "e70e692c-1155-41ae-95d2-3bae153914b9",
      "timestamp": "2020-05-31T05:29:38+00:00",
      "total": 4,
      "offset": 2,
      "parameter": [
        {
          "name": "offset",
          "valueInteger": 2
        },
        {
          "name": "count",
          "valueInteger": 2
        }
      ],
      "contains": [
        {
          "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
          "code": "write",
          "display": "Write"
        },
        {
          "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
          "code": "delete",
          "display": "Delete"
        }
      ]
    }
  }
  const COMBINED_VALUESET =[
    {
      "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
      "code": "*",
      "display": "All"
    },
    {
      "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
      "code": "read",
      "display": "Read"
    },
    {
      "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
      "code": "write",
      "display": "Write"
    },
    {
      "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission",
      "code": "delete",
      "display": "Delete"
    }
  ]

  

  const fhirAxios = require('../modules/fhirAxios')
  fhirAxios.setOptions()
  const axios = require('axios')


  test( 'reads a FHIR resource', (done) => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters/test", null, MOCK_FHIR_OBJ )
    fhirAxios.read( "Parameters", "test" ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

  test( 'searches a FHIR resource', (done) => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters", { param: "query" }, MOCK_FHIR_OBJ )
    fhirAxios.search( "Parameters", { param: "query" } ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

  test( 'updates a FHIR resource', (done) => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters/test", MOCK_FHIR_OBJ, MOCK_FHIR_OBJ )
    fhirAxios.update( MOCK_FHIR_OBJ ).then ( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
      done()
    } ).catch( (err) => {
      done( err )
    } )
  } )

  test( 'expands a FHIR ValueSet', (done) => {
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_OBJ )
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", { offset: 2, count: 2 }, MOCK_VALUESET_OBJ_2 )
    fhirAxios.expand( "ihris-task-permission" ).then( (results) => {
      expect( results ).toEqual( COMBINED_VALUESET )
      done()
    } ).catch( (err) => {
      done( err )
    } )

  } )

} )
