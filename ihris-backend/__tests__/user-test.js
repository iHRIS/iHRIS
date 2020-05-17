'use strict'

jest.mock('axios')

describe( 'User module for working with users (Person resource)', () => {
  describe( 'Looking up local auth users', () => {

    const crypto = require('crypto')
    const password = crypto.randomBytes(8).toString('hex')

    const MOCK_LOCAL_OBJ = {
      "resourceType": "Person",
      "id": "ihris-user-admin",
      "meta": {
        "profile": [
          "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
        ]
      },
      "extension": [
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-user-role",
          "valueReference": {
            "reference": "Basic/ihris-role-admin"
          }
        },
        {
          "url": "http://ihris.org/fhir/StructureDefinition/ihris-password",
          "extension": [
            {
              "url": "password",
              "valueString": ""
            },
            {
              "url": "salt",
              "valueString": ""
            }
          ]
        }
      ],
      "name": [
        {
          "use": "official",
          "text": "iHRIS Admin"
        }
      ],
      "telecom": [
        {
          "system": "email",
          "value": "admin@ihris.org"
        }
      ]
    }

    const user = require('../modules/user')

    beforeEach( () => {
      require('axios').__setFhirResults( MOCK_LOCAL_OBJ )
      let hash = user.hashPassword( password )
      MOCK_LOCAL_OBJ.extension[1].extension[0].valueString = hash.hash
      MOCK_LOCAL_OBJ.extension[1].extension[1].valueString = hash.salt
    } )

    test( 'looks up user by id', (done) => {
      user.find( 'ihris-user-admin' ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOCAL_OBJ )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'checks password on user', (done) => {
      user.find( 'ihris-user-admin' ).then( (userObj) => {
        expect( userObj.checkPassword( password ) ).toBeTruthy()
        expect( userObj.checkPassword( 'fake' ) ).toBeFalsy()
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
      "meta": {
        "lastUpdated": "2020-05-17T00:00:39.999+00:00"
      },
      "type": "searchset",
      "total": 1,
      "link": [
        {
          "relation": "self",
          "url": "http://localhost:8080/hapi/fhir/Person?_pretty=true&email=test%40test.org"
        }
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
              "profile": [
                "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
              ]
            },
            "extension": [
              {
                "url": "http://ihris.org/fhir/StructureDefinition/ihris-user-role",
                "valueReference": {
                  "reference": "Basic/ihris-role-test"
                }
              }
            ],
            "identifier": [
              {
                "system": "test_provider",
                "value": "08734987439874309587"
              }
            ],
            "name": [
              {
                "use": "official",
                "text": "Test User"
              }
            ],
            "telecom": [
              {
                "system": "email",
                "value": "test@test.org"
              }
            ]
          },
          "search": {
            "mode": "match"
          }
        }
      ]
    }

    const user = require('../modules/user')

    beforeEach( () => {
      require('axios').__setFhirResults( MOCK_LOOKUP_OBJ )
    } )

    test( 'looks up user by query', (done) => {
      user.lookup( { _id: 'ihris-user-test' } ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOOKUP_OBJ.entry[0].resource )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'looks up user by email', (done) => {
      user.lookupByEmail( "test@test.org" ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOOKUP_OBJ.entry[0].resource )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )

    test( 'looks up user by provider id', (done) => {
      user.lookupByProvider( "test_provider", "08734987439874309587" ).then( (userObj) => {
        expect( userObj.resource ).toEqual( MOCK_LOOKUP_OBJ.entry[0].resource )
        done()
      } ).catch( (err) => {
        done(err)
      } )
    } )
  } )


} )
