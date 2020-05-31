'use strict'

jest.mock('axios')

describe( 'User module for working with users (Person resource)', () => {

  const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"
  const axios = require('axios')

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
            { "url": "profile", "valueCode": "StructureDefinition" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "profile", "valueCode": "CodeSystem" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "profile", "valueCode": "ValueSet" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueReference": { "reference": "Practitioner/1234" } }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "write" },
            { "url": "resource", "valueReference": { "reference": "Practitioner/1234" } },
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
            { "url": "resource", "valueReference": { "reference": "ValueSet/ihris-test-valueset" } }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "read" },
            { "url": "resource", "valueReference": { "reference": "Practitioner/1234" } },
            { "url": "field", "valueString": "name" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "write" },
            { "url": "resource", "valueReference": { "reference": "Practitioner/1234" } },
            { "url": "field", "valueString": "name" }
          ]
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-task",
          "extension": [
            { "url": "permission", "valueCode": "write" },
            { "url": "resource", "valueReference": { "reference": "Practitioner/1234" } },
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
        "Practitioner/1234": true,
        "ValueSet/ihris-test-valueset": true
      },
      "write": { "Practitioner/1234": { "name": true, "gender": true } }
    }
    const PERM_RESULTS_MANUAL = {
      "read": { "Practitioner/abc": true },
      "write": { "Practitioner/abc": true }
    }


    const user = require('../modules/user')

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

    test( 'checks manual adding of permission', (done) => {
      axios.__setFhirResults( DEFAULT_URL + "Person/ihris-user-test", null, MOCK_LOCAL_OBJ )
      user.find( 'ihris-user-test' ).then( (userObj) => {
        userObj.addPermission( "read", "Practitioner/abc" )
        userObj.addPermission( "write", "Practitioner/abc" )
        // Shouldn't include these
        userObj.addPermission( "delete", "Practitioner/abc" )
        userObj.addPermission( "delete", "Practitioner", "name" )
        expect( userObj.permissions ).toEqual( PERM_RESULTS_MANUAL )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'checks getting permissions', () => {
      let test = user.__testUser()
      test.addPermission( "*", "*" )
      expect( test.getPermission( "read", "Practitioner" ) ).toBeTruthy()
      test.resetPermissions()

      test.addPermission( "read", "Practitioner" )
      expect( test.getPermission( "read", "Practitioner/1234" ) ).toBeTruthy()
      test.resetPermissions()


      test.addPermission( "read", "Practitioner", "name" )
      test.addPermission( "read", "Practitioner/123", "gender" )
      expect( test.getPermission( "read", "Practitioner/123" ) ).toEqual( { "name": true, "gender": true } )
      expect( test.getPermission( "read", "Practitioner" ) ).toEqual( { "name": true } )
      test.addPermission( "read", "Practitioner" )
      expect( test.getPermission( "read", "Practitioner" ) ).toBeTruthy()
      expect( test.getPermission( "read", "Practitioner/123" ) ).toBeTruthy()
      expect( test.getPermission( "write", "Practitioner" ) ).toBeFalsy()

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

    const user = require('../modules/user')

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
