'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const request = require("supertest")

const route = require("../routes/fhir.js")
const user = require("../modules/user")

const TEST_USER = user.restoreUser( {
  resource: { resourceType: "Person" },
  permissions: { 
    read : { 
      StructureDefinition : true, 
      CodeSystem : true, 
      ValueSet: { id: { "mock-test": true, "mock-field": { code : true } } }, 
      Person: { id: { "test-person": true } },
      DocumentReference: { constraint: { "category.exists(coding.exists(code = 'open'))": true } }
    }, 
    write: { Person: { id: { "test-person": true } } } 
  }
} )
const TEST_USER2 = user.restoreUser( {
  resource: { resourceType: "Person" },
  permissions: { read : { StructureDefinition : true, CodeSystem : true, DocumentReference: true } },
} )

const express = require('express')
const app = express()
app.use(express.json())
const axios = require('axios')

// Set up middleware to add mocks for anything that would exist in the request like session and user from passport
var appUser = TEST_USER
app.use( (req, res, next) => {
  req.user = appUser
  next()
} )


app.use("/", route)

describe( 'Test FHIR routes', () => {
  const MOCK_PERSON = {
    resourceType: "Person",
    id: "test-person",
    name: [ { use: "official", family: "Tester", given: [ "Test", "E." ] } ]
  }
  const MOCK_PERSON_FAIL = {
    resourceType: "Person",
    id: "test-fail",
    name: [ { use: "official", family: "Tester", given: [ "Test", "E." ] } ]
  }
  const NOTLOGGEDIN_OUTCOME = {
    resourceType: "OperationOutcome",
    issue: [
      {
        severity: "error",
        code: "forbidden",
        diagnostics: "Not logged in"
      }
    ]
  }
  const DENIED_OUTCOME = {
    resourceType: "OperationOutcome",
    issue: [
      {
        severity: "error",
        code: "forbidden",
        diagnostics: "Access Denied"
      }
    ]
  }

  describe( 'Test GET /resource?query', () => {

    test( 'test search CodeSystem', () => {
      const MOCK_CODESYSTEM = {
        resourceType: "Bundle",
        id: "mock-test",
        test: "test",
        entry: []
      }
      axios.__setFhirResults( DEFAULT_URL + "CodeSystem", { test: "test" }, MOCK_CODESYSTEM )

      appUser = TEST_USER
      return request(app).get("/CodeSystem").query("test=test").then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.body).toEqual( MOCK_CODESYSTEM )
      } )
    } )

    test( 'test search CodeSystem without user', () => {
      appUser = null
      return request(app).get("/CodeSystem").query("test=test").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( NOTLOGGEDIN_OUTCOME )
      } )
    } )

    test( 'test search Practitioner without access', () => {
      appUser = TEST_USER
      return request(app).get("/Practitioner").query("test=test").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( DENIED_OUTCOME )
      } )

    } )

  } )

  describe( 'test GET /resource/id', () => {

    test( 'test read StructureDefinition instance', () => {
      const MOCK_PROFILE = {
        resourceType: "StructureDefinition",
        id: "mock-test"
      }
      axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/mock-test", null, MOCK_PROFILE )

      appUser = TEST_USER
      return request(app).get("/StructureDefinition/mock-test").then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.body).toEqual( MOCK_PROFILE )
      } )
    } )

    test( 'test read Practitioner without user', () => {
      appUser = null
      return request(app).get("/Practitioner/test-practitioner").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( NOTLOGGEDIN_OUTCOME )
      } )
    } )

    test( 'test read Person without access', () => {
      axios.__setFhirResults( DEFAULT_URL + "Person/test-fail", null, MOCK_PERSON_FAIL )
      appUser = TEST_USER
      return request(app).get("/Person/test-fail").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( DENIED_OUTCOME )
      } )
    } )

  } )

  describe( 'test GET /ValueSet/id/$expand', () => {
    const MOCK_VALUESET_EXPANSION = {
      resourceType: "ValueSet",
      id: "mock-test"
    }

    test( 'test expand ValueSet instance', () => {
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/mock-test/$expand", null, MOCK_VALUESET_EXPANSION )

      appUser = TEST_USER
      return request(app).get("/ValueSet/mock-test/$expand").then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.body).toEqual( MOCK_VALUESET_EXPANSION )
      } )
    } )

    test( 'test expand ValueSet instance without user', () => {
      appUser = null
      return request(app).get("/ValueSet/mock-test/$expand").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( NOTLOGGEDIN_OUTCOME )
      } )
    } )

    test( 'test expand ValueSet without access', () => {
      appUser = TEST_USER2
      return request(app).get("/ValueSet/mock-fail/$expand").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( DENIED_OUTCOME )
      } )
    } )

    test( 'test expand ValueSet with field level access', () => {
      axios.__setFhirResults( DEFAULT_URL + "ValueSet/mock-field/$expand", null, MOCK_VALUESET_EXPANSION )
      appUser = TEST_USER
      return request(app).get("/ValueSet/mock-field/$expand").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( DENIED_OUTCOME )
      } )
    } )
  } )

  describe( 'test POST /resource', () => {
    test( 'test create Person', () => {
      axios.__setFhirResults( DEFAULT_URL + "Person", MOCK_PERSON, MOCK_PERSON )

      appUser = TEST_USER
      return request(app).post("/Person").send( MOCK_PERSON ).then( (response) => {
        let output = { ...MOCK_PERSON }
        output.id = "1"
        expect(response.statusCode).toBe( 201 )
        expect(response.body).toEqual( output )
      } )
    } )

    test( 'test create Person without user', () => {
      appUser = null
      return request(app).post("/Person").send( MOCK_PERSON ).then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( NOTLOGGEDIN_OUTCOME )
      } )
    } )

    test( 'test create Person without access', () => {
      axios.__setFhirResults( DEFAULT_URL + "Person", MOCK_PERSON_FAIL, MOCK_PERSON_FAIL )
      appUser = TEST_USER
      return request(app).post("/Person").send( MOCK_PERSON_FAIL ).then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( DENIED_OUTCOME )
      } )
    } )

  } )

  describe( 'test PUT /resource/id', () => {
    test( 'test update resource: PUT /Person/test-person', () => {
      axios.__setFhirResults( DEFAULT_URL + "Person/test-person", MOCK_PERSON, MOCK_PERSON )

      appUser = TEST_USER
      return request(app).put("/Person/test-person").send( MOCK_PERSON ).then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.body).toEqual( MOCK_PERSON )
      } )
    } )

    test( 'test create Person without user', () => {
      appUser = null
      return request(app).put("/Person/test-person").send( MOCK_PERSON ).then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( NOTLOGGEDIN_OUTCOME )
      } )
    } )

    test( 'test create Person without access', () => {
      axios.__setFhirResults( DEFAULT_URL + "Person/test-fail", MOCK_PERSON_FAIL, MOCK_PERSON_FAIL )
      appUser = TEST_USER
      return request(app).put("/Person/test-fail").send( MOCK_PERSON_FAIL ).then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( DENIED_OUTCOME )
      } )
    } )

  } )

  describe( 'test GET /DocumentReference/id/$html', () => {
    const MOCK_OPEN_DOCUMENT = {
      "resourceType": "DocumentReference",
      "id": "page-test",
      "meta": { "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-document" ] },
      "status": "current",
      "docStatus": "final",
      "date": "2020-06-07T14:54:00Z",
      "category": [
        {
          "coding": [
            { "code": "open", "system": "http://ihris.org/fhir/CodeSystem/ihris-document-category", "display": "Open Access" }
          ]
        }
      ],
      "content": [
        {
          "attachment": {
            "contentType": "text/markdown",
            "title": "Testing",
            "data": "IyBUZXN0aW5nCg=="
          }
        }
      ]
    }
    const MOCK_DOCUMENT = "<h1 id=\"testing\">Testing</h1>\n"
    const MOCK_RESTRICTED_DOCUMENT = {
      "resourceType": "DocumentReference",
      "id": "page-test",
      "meta": { "profile": [ "http://ihris.org/fhir/StructureDefinition/ihris-document" ] },
      "status": "current",
      "docStatus": "final",
      "date": "2020-06-07T14:54:00Z",
      "category": [
        {
          "coding": [
            { "code": "restricted", "system": "http://ihris.org/fhir/CodeSystem/ihris-document-category", "display": "Open Access" }
          ]
        }
      ],
      "content": [
        {
          "attachment": {
            "contentType": "text/markdown",
            "title": "Testing",
            "data": "IyBUZXN0aW5nCg=="
          }
        }
      ]
    }
 
    test( 'test open DocumentReference to HTML instance for open user', () => {
      axios.__setFhirResults( DEFAULT_URL + "DocumentReference/page-test", null, MOCK_OPEN_DOCUMENT )

      appUser = TEST_USER
      return request(app).get("/DocumentReference/page-test/$html").then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.text).toEqual( MOCK_DOCUMENT )
      } )
    } )

    test( 'test restricted DocumentReference to HTML instance for open user', () => {
      axios.__setFhirResults( DEFAULT_URL + "DocumentReference/page-test", null, MOCK_RESTRICTED_DOCUMENT )

      appUser = TEST_USER
      return request(app).get("/DocumentReference/page-test/$html").then( (response) => {
        expect(response.statusCode).toBe( 401 )
        expect(response.body).toEqual( DENIED_OUTCOME )
      } )
    } )

    test( 'test restricted DocumentReference to HTML instance for restricted user', () => {
      axios.__setFhirResults( DEFAULT_URL + "DocumentReference/page-test", null, MOCK_RESTRICTED_DOCUMENT )

      appUser = TEST_USER2
      return request(app).get("/DocumentReference/page-test/$html").then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.text).toEqual( MOCK_DOCUMENT )
      } )
    } )

  } )


} )
