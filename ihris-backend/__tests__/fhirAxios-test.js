'use strict'

const jest_setup = require('../jest-setup')
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
  const MOCK_FHIR_INVALID = {
    "resourceType": "Parameters",
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
  const COMBINED_VALUESET_COMPLETE = {
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
      "contains": COMBINED_VALUESET
    }
  }
  const MOCK_VALUESET_FULL_OBJ = {
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
      "contains": COMBINED_VALUESET
    }
  }
  const MOCK_FHIR_OUTCOME = {
    "resourceType": "OperationOutcome",
    "issue": [
      {
        "severity": "error",
        "code": "test",
        "diagnostics": "This is just a test outcome and won't match real results."
      }
    ]
  }
  

  const fhirAxios = require('../modules/fhirAxios')
  fhirAxios.setOptions()
  const axios = require('axios')


  test( 'reads a FHIR resource', () => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters/test", null, MOCK_FHIR_OBJ )
    return fhirAxios.read( "Parameters", "test" ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
    } )
  } )

  test( 'reads a missing FHIR resource', () => {
    axios.__setFhirError( DEFAULT_URL + "Parameters/notfound", null, 404, MOCK_FHIR_OUTCOME )
    return fhirAxios.read( "Parameters", "notfound" ).then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect( err.response.status ).toBe( 404 )
      expect( err.response.data ).toEqual( MOCK_FHIR_OUTCOME )
    } )
  } )

  test( 'read without argument', () => {
    return fhirAxios.read().then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('resource must be defined')
    } )
 } )

  test( 'creates a FHIR resouce', () => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters", MOCK_FHIR_OBJ, MOCK_FHIR_OBJ )
    return fhirAxios.create( MOCK_FHIR_OBJ ).then( (response) => {
      expect( response.id ).toBe( "1" )
      expect( response.resourceType ).toEqual( MOCK_FHIR_OBJ.resourceType )
    } )
  } )

  test( 'create an invalid FHIR resource', () => {
    axios.__setFhirError( DEFAULT_URL + "Parameters", MOCK_FHIR_OBJ, 422, MOCK_FHIR_OUTCOME )
    return fhirAxios.create( MOCK_FHIR_OBJ ).then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect( err.response.status ).toBe( 422 )
      expect( err.response.data ).toEqual( MOCK_FHIR_OUTCOME )
    } )
  } )

  test( 'create without argument', () => {
    return fhirAxios.create().then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('resource must be defined')
    } )
  } )

  test( 'searches a FHIR resource', () => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters", { param: "query" }, MOCK_FHIR_OBJ )
    return fhirAxios.search( "Parameters", { param: "query" } ).then( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
    } )
  } )

  test( 'search without argument', () => {
    return fhirAxios.search().then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('resource must be defined')
    } )
  } )

  test( 'updates a FHIR resource', () => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters/test", MOCK_FHIR_OBJ, MOCK_FHIR_OBJ )
    return fhirAxios.update( MOCK_FHIR_OBJ ).then ( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OBJ )
    } )
  } )

  test( 'updates an invalid FHIR resource', () => {
    axios.__setFhirError( DEFAULT_URL + "Parameters/test", MOCK_FHIR_OBJ, 422, MOCK_FHIR_OUTCOME )
    return fhirAxios.update( MOCK_FHIR_OBJ ).then ( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect( err.response.status ).toBe( 422 )
      expect( err.response.data ).toEqual( MOCK_FHIR_OUTCOME )
    } )
  })

  test( 'update without argument', () => {
    return fhirAxios.update().then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('resource must be defined')
    } )
  } )

  test( 'update with missing id', () => {
    return fhirAxios.update( MOCK_FHIR_INVALID ).then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('resource must have an id field')
    } )
  } )


  test( 'deletes a FHIR resource', () => {
    axios.__setFhirResults( DEFAULT_URL + "Parameters/test", null, MOCK_FHIR_OUTCOME )
    return fhirAxios.delete( "Parameters", "test" ).then ( (response) => {
      expect( response ).toEqual( MOCK_FHIR_OUTCOME )
    } )
  } )

  test( 'deletes a missing FHIR resource', () => {
    axios.__setFhirError( DEFAULT_URL + "Parameters/test", null, 404, MOCK_FHIR_OUTCOME )
    return fhirAxios.delete( "Parameters", "test" ).then ( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect( err.response.status ).toBe( 404 )
      expect( err.response.data ).toEqual( MOCK_FHIR_OUTCOME )
    } )
  } )

  test( 'delete without arguments', () => {
    return fhirAxios.delete().then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('resource must be defined')
    } )
  } )

  test( 'delete without id', () => {
    return fhirAxios.delete( "Parameters" ).then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('id must be defined')
    } )
  } )


  test( 'expanding a FHIR ValueSet only returning contains array', () => {
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_FULL_OBJ )
    return fhirAxios.expand( "ihris-task-permission", null, false, true ).then( (results) => {
      expect( results ).toEqual( COMBINED_VALUESET )
    } )
  } )

  test( 'error when expanding a FHIR ValueSet only returning contains array', () => {
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_OBJ )
    return fhirAxios.expand( "ihris-task-permission", null, false, true ).then( (results) => {
      // This should throw an error and never reach here.
      expect( false ).toBeTruthy()
    } ).catch( (err) => {
      expect( err.message ).toEqual( "Unable to return only the contains element when the full expansion wasn't returned." )
    } )
  } )

  test( 'expands a FHIR ValueSet combining all results and only returning contains array', () => {
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_OBJ )
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", { offset: 2, count: 2 }, MOCK_VALUESET_OBJ_2 )
    return fhirAxios.expand( "ihris-task-permission", null, true, true ).then( (results) => {
      expect( results ).toEqual( COMBINED_VALUESET )
    } )
  } )

  test( 'expands a FHIR ValueSet combining all results', () => {
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_OBJ )
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", { offset: 2, count: 2 }, MOCK_VALUESET_OBJ_2 )
    return fhirAxios.expand( "ihris-task-permission", null, true ).then( (results) => {
      expect( results ).toEqual( COMBINED_VALUESET_COMPLETE )
    } )
  } )

  test( 'expand without a ValueSet', () => {
    return fhirAxios.expand().then( (response) => {
      // Shouldn't get here since it's an error so fail the test.
      expect( true ).toBeFalsy()
    } ).catch( (err) => {
      expect(err.message).toBe('valueset must be defined')
    } )
  } )

} )
