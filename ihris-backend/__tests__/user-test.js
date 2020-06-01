'use strict'

jest.mock('axios')

describe( 'User module for working with users (Person resource)', () => {

  const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"
  const axios = require('axios')
  const user = require('../modules/user')


  describe( 'Checking non-user specific functionality', () => {
    const PERM_RESULTS_MANUAL = {
      "read": { "Practitioner": { "id": { "abc": true } } },
      "write": { "Practitioner": { "id": { "abc": true } } }
    }
    const MOCK_VALUESET_PERM = {
      "resourceType": "ValueSet",
      "status": "active",
      "compose": {
        "include": [
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission" }
        ]
      },
      "expansion": {
        "identifier": "79f1ee02-e2a2-4a89-ac68-bf348284bba3",
        "timestamp": "2020-05-31T06:13:32+00:00",
        "total": 4,
        "offset": 0,
        "parameter": [
          { "name": "offset", "valueInteger": 0 },
          { "name": "count", "valueInteger": 1000 }
        ],
        "contains": [
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission", "code": "*", "display": "All" },
          {
            "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission", "code": "read", "display": "Read" },
          {
            "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission", "code": "write", "display": "Write" },
          {
            "system": "http://ihris.org/fhir/CodeSystem/ihris-task-permission", "code": "delete", "display": "Delete" }
        ]
      }
    }
    const MOCK_VALUESET_RESOURCE = {
      "resourceType": "ValueSet",
      "status": "active",
      "compose": {
        "include": [
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-resource" }
        ]
      },
      "expansion": {
        "identifier": "776a1378-cbc7-471b-b7a2-a084e1b05da9",
        "timestamp": "2020-05-31T06:14:14+00:00",
        "total": 6,
        "offset": 0,
        "parameter": [
          { "name": "offset", "valueInteger": 0 },
          { "name": "count", "valueInteger": 1000 }
        ],
        "contains": [
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-resource", "code": "*", "display": "All" },
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-resource", "code": "Practitioner", "display": "Practitioner" },
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-resource", "code": "StructureDefinition", "display": "StructureDefinition" },
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-resource", "code": "ValueSet", "display": "ValueSet" },
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-task-resource", "code": "CodeSystem", "display": "CodeSystem" }
        ]
      }
    }
    const VALUESET_EXPANSION_PERM = [ '*', 'read', 'write', 'delete' ]
    const VALUESET_EXPANSION_RESOURCE = [ '*', 'Practitioner', 'StructureDefinition', 'ValueSet', 'CodeSystem' ]


    test( 'checks manual adding of permission', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_PERM )
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-resource/$expand", null, MOCK_VALUESET_RESOURCE )
      let userObj = user.__testUser()
      user.loadTaskList().then( () => {
        expect( userObj.addPermission( "read", "Practitioner", "abc" ) ).toBeTruthy()
        expect( userObj.addPermission( "write", "Practitioner", "abc" ) ).toBeTruthy()
        // Shouldn't include these
        expect( userObj.addPermission( "delete", "Practitioner", "abc" ) ).toBeFalsy()
        expect( userObj.addPermission( "delete", "Practitioner", null, null, "name" ) ).toBeFalsy()
        expect( userObj.permissions ).toEqual( PERM_RESULTS_MANUAL )
        done()
      } ).catch( (err) => {
        done( err )
      } )
    } )

    test( 'checks loading needed valuesets', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_PERM )
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-resource/$expand", null, MOCK_VALUESET_RESOURCE )
      expect( user.tasksLoading ).toBeFalsy()
      user.loadTaskList( true ).then( () => {
        expect( user.tasksLoaded ).toBeTruthy()
        expect( user.tasksLoading ).toBeFalsy()
        expect( user.valueSet["ihris-task-permission"] ).toEqual( VALUESET_EXPANSION_PERM )
        expect( user.valueSet["ihris-task-resource"] ).toEqual( VALUESET_EXPANSION_RESOURCE )
        done()
      } ).catch( (err) => {
        done( err )
      } )
    } )

    test( 'checks getting permissions', () => {
      let userObj = user.__testUser()
      expect( userObj.addPermission( "*", "*" ) ).toBeTruthy()
      expect( userObj.hasPermission( "read", "Practitioner" ) ).toBeTruthy()
      userObj.resetPermissions()

      expect( userObj.addPermission( "read", "Practitioner" ) ).toBeTruthy()
      expect( userObj.hasPermission( "read", "Practitioner", "1234" ) ).toBeTruthy()
      userObj.resetPermissions()


      expect( userObj.addPermission( "read", "Practitioner", null, null, "name" ) ).toBeTruthy()
      expect( userObj.addPermission( "read", "Practitioner", "123", null, "gender" ) ).toBeTruthy()
      expect( userObj.hasPermission( "read", "Practitioner", "123" ) ).toEqual( { "gender": true } )
      //console.log( userObj.hasPermission( "read", "Practitioner" ) )
      //console.log( JSON.stringify(userObj.permissions, null, 2) )
      expect( userObj.hasPermission( "read", "Practitioner" ) ).toEqual( { "*": { "name": true }, "id" : { "123": { "gender" : true } } } )
      expect( userObj.addPermission( "read", "Practitioner" ) ).toBeTruthy()
      expect( userObj.hasPermission( "read", "Practitioner" ) ).toBeTruthy()
      expect( userObj.hasPermission( "read", "Practitioner", "123" ) ).toBeTruthy()
      expect( userObj.hasPermission( "write", "Practitioner" ) ).toBeFalsy()

    } )

    test( 'checks adding invalid permissions', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-permission/$expand", null, MOCK_VALUESET_PERM )
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/ihris-task-resource/$expand", null, MOCK_VALUESET_RESOURCE )
      user.loadTaskList( true ).then( () => {
        let userObj = user.__testUser()
        expect( userObj.addPermission( "abc", "Practitioner" ) ).toBeFalsy()
        expect( userObj.addPermission( "read", "abc" ) ).toBeFalsy()
        expect( userObj.permissions ).toEqual( {} )
        done()
      } ).catch( (err) => {
        done( err )
      } )
    } )

  } )
  describe( 'Looking up local auth users', () => {

    const crypto = require('crypto')
    const password = crypto.randomBytes(8).toString('hex')

    const MOCK_LOCAL_OBJ = {
      "resourceType": "Person",
      "id": "ihris-user-test",
      "meta": {
        "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-person-user" ]
      },
      "extension": [
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-password",
          "extension": [
            { "url": "password", "valueString": "" },
            { "url": "salt", "valueString": "" }
          ]
        }
      ],
      "name": [
        { "use": "official", "text": "iHRIS Admin" }
      ],
      "telecom": [
        { "system": "email", "value": "admin@ihris.org" }
      ]
    }
    const MOCK_PERM_OBJ = {
      "resourceType": "Person",
      "id": "ihris-user-test",
      "meta": {
        "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-person-user" ]
      },
      "extension": [
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
          "valueReference": { "reference": "Basic/ihris-role-test" }
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-password",
          "extension": [
            { "url": "password", "valueString": "" },
            { "url": "salt", "valueString": "" }
          ]
        }
      ],
      "name": [
        { "use": "official", "text": "iHRIS Admin" }
      ],
      "telecom": [
        { "system": "email", "value": "admin@ihris.org" }
      ]
    }
    const MOCK_ROLE_OBJ = {
      "resourceType": "Basic",
      "id": "ihris-role-test",
      "meta": {
        "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-role" ]
      },
      "extension": [
        { "url": "http://ihris.org/fhir/StructureDefinition/ihris-role-primary", "valueBoolean": true },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
          "valueReference": { "reference": "Basic/ihris-role-test2" }
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueCode": "StructureDefinition" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueCode": "CodeSystem" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueCode": "ValueSet" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueCode": "Practitioner" },
            { "url": "id", "valueId": "1234" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "write" },
            { "url": "resource", "valueCode": "Practitioner" },
            { "url": "id", "valueId": "1234" },
            { "url": "field", "valueString": "name" }
          ]
        }
      ],
      "code": {
        "coding": [
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem", "code": "role" }
        ]
      }
    }
    const MOCK_ROLE_SECONDARY_OBJ = {
      "resourceType": "Basic",
      "id": "ihris-role-test2",
      "meta": {
        "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-role" ]
      },
      "extension": [
        { "url": "http://ihris.org/fhir/StructureDefinition/ihris-role-primary", "valueBoolean": false },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueCode": "ValueSet" },
            { "url": "id", "valueId": "ihris-test-valueset" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueCode": "Practitioner" },
            { "url": "id", "valueId": "1234" },
            { "url": "field", "valueString": "name" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "write" },
            { "url": "resource", "valueCode": "Practitioner" },
            { "url": "id", "valueId": "1234" },
            { "url": "field", "valueString": "name" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "write" },
            { "url": "resource", "valueCode": "Practitioner" },
            { "url": "id", "valueId": "1234" },
            { "url": "field", "valueString": "gender" }
          ]
        }
      ],
      "code": {
        "coding": [
          { "system": "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem", "code": "role" }
        ]
      }
    }
    const PERM_RESULTS = {
      "read": {
        "StructureDefinition": true,
        "CodeSystem": true,
        "ValueSet": true,
        "Practitioner": { "id": { "1234" : true } }
      },
      "write": { "Practitioner" : { "id": { "1234": { "name": true, "gender": true } } } }
    }


    test( 'looks up user by id', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "Person/ihris-user-test", null, MOCK_LOCAL_OBJ )
      user.find( 'ihris-user-test' ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOCAL_OBJ )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'checks password on user', (done) => {
      let hash = user.hashPassword( password )
      MOCK_LOCAL_OBJ.extension[0].extension[0].valueString = hash.hash
      MOCK_LOCAL_OBJ.extension[0].extension[1].valueString = hash.salt
      axios.__setFhirResults( DEFAULT_URL + "Person/ihris-user-test", null, MOCK_LOCAL_OBJ )
      user.find( 'ihris-user-test' ).then( (userObj) => {
        expect( userObj.checkPassword( password ) ).toBeTruthy()
        expect( userObj.checkPassword( 'fake' ) ).toBeFalsy()
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'checks role/permission loading', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "Person/ihris-user-test", null, MOCK_PERM_OBJ )
      axios.__setFhirResults( DEFAULT_URL + "Basic/ihris-role-test", null, MOCK_ROLE_OBJ )
      axios.__setFhirResults( DEFAULT_URL + "Basic/ihris-role-test2", null, MOCK_ROLE_SECONDARY_OBJ )
      user.find( 'ihris-user-test' ).then( (userObj) => {
        expect( userObj.permissions ).toEqual( PERM_RESULTS )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )


  } )

  describe( 'Looking up remote provider oauth users', () => {
    const MOCK_LOOKUP_OBJ = {
      "resourceType": "Bundle",
      "id": "e3cab7e5-13db-4183-a678-112dd3525ffb",
      "meta": { "lastUpdated": "2020-05-17T00:00:39.999+00:00" },
      "type": "searchset",
      "total": 1,
      "link": [
        { "relation": "self", "url": "http://localhost:8080/hapi/fhir/Person?_pretty=true&email=test%40test.org" }
      ],
      "entry": [
        {
          "fullUrl": "http://localhost:8080/hapi/fhir/Person/ihris-user-test",
          "resource": {
            "resourceType": "Person",
            "id": "ihris-user-test",
            "meta": {
              "versionId": "11",
              "lastUpdated": "2020-05-16T23:30:12.154+00:00",
              "source": "#88TpBVeXXpPxtrSF",
              "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-person-user" ]
            },
            "identifier": [
              { "system": "test_provider", "value": "08734987439874309587" }
            ],
            "name": [
              { "use": "official", "text": "Test User" }
            ],
            "telecom": [
              { "system": "email", "value": "test@test.org" }
            ]
          },
          "search": { "mode": "match" }
        }
      ]
    }


    test( 'looks up user by query', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "Person", { _id: "ihris-user-test" }, MOCK_LOOKUP_OBJ )
      user.lookup( { _id: 'ihris-user-test' } ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOOKUP_OBJ.entry[0].resource )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'looks up user by email', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "Person", { telecom: "email|test@test.org" }, MOCK_LOOKUP_OBJ )
      user.lookupByEmail( "test@test.org" ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOOKUP_OBJ.entry[0].resource )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'looks up user by provider id', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "Person", { identifier: "test_provider|08734987439874309587" }, MOCK_LOOKUP_OBJ )
      user.lookupByProvider( "test_provider", "08734987439874309587" ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOOKUP_OBJ.entry[0].resource )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )
  } )


} )
