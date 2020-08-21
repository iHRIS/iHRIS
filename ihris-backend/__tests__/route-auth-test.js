'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const request = require("supertest")
const route = require("../routes/auth.js")

const express = require('express')
const app = express()
app.use(express.urlencoded({extended: false}))
app.use("/", route)

describe( 'Test auth routes', () => {

  describe( 'Test logged out user', () => {
    test( 'test logged out user setup', () => {

      const MOCK_LOGGEDOUT_USER = {
        "resourceType": "Person",
        "id": "ihris-user-loggedout",
        "meta": {
          "profile": [
            "http://ihris.org/fhir/StructureDefinition/ihris-person-user"
          ]
        },
        "name": [
          {
            "use": "official",
            "text": "Logged Out"
          }
        ],
        "telecom": [
          {
            "system": "email",
            "value": "loggedout@ihris.org"
          }
        ]
      }

      require('axios').__setFhirResults( DEFAULT_URL + "Person/ihris-user-loggedout", null, MOCK_LOGGEDOUT_USER )

      return request(app).get("/").then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.body).toEqual( {ok: true} )
      } )
    } )

  } )

  describe( 'Test local user', () => {
    const MOCK_LOCAL_LOOKUP = {
      "resourceType": "Bundle",
      "type": "searchset",
      "total": 1,
      "entry": [
        {
          "furllUrl": DEFAULT_URL + "Person/ihris-user-test",
          "resource": {
            "resourceType": "Person",
            "id": "ihris-user-test",
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
                    "valueString": "52ff39c8804b58e66b014d9879849575b3aff09ae601ef52cae17f6de23133c54495617b4a8bb92eb693d0e9e7f2ca392dc51e131d5cf2cb1026d486ab83c6de"
                  },
                  {
                    "url": "salt",
                    "valueString": "511c63e0b319f21176904ef9879e95f5"
                  }
                ]
              }
            ],
            "name": [
              {
                "use": "official",
                "text": "iHRIS Test User"
              }
            ],
            "telecom": [
              {
                "system": "email",
                "value": "test@ihris.org"
              }
            ]
          }
        } 
      ]
    }

    require('axios').__setFhirResults( DEFAULT_URL + "Person", {telecom: "email|test@ihris.org"}, MOCK_LOCAL_LOOKUP )

    test( 'test local user login', () => {
      return request(app).post("/login").send( "username=test@ihris.org&password=test" ).then ( (response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ok:true,name:"iHRIS Test User"})
      } )
    } )

    test( 'test invalid password', () => {
      return request(app).post("/login").send( "username=test@ihris.org&password=wrong" ).then ( (response) => {
        expect(response.statusCode).toBe(401)
      } )
    } )

    test( 'test invalid user', () => {
      const MOCK_LOCAL_MISSING = {
        "resourceType": "Bundle",
        "type": "searchset",
        "total": 0,
        "entry": [
        ]
      }    
      require('axios').__setFhirResults( DEFAULT_URL + "Person", {telecom: "email|notfound@ihris.org"}, MOCK_LOCAL_MISSING )
      return request(app).post("/login").send( "username=notfound@ihris.org&password=wrong" ).then ( (response) => {
        expect(response.statusCode).toBe(401)
      } )

    } )


  } )


} )
