'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const request = require("supertest")

const route = require("../routes/fhir.js")
const user = require("../modules/user")

const TEST_USER = user.restoreUser( {
  resource: { "resourceType": "Person" },
  permissions: { "read" : { "StructureDefinition" : true, "CodeSystem" : true, "ValueSet": true } }
} )

const express = require('express')
const app = express()
const axios = require('axios')

// Set up middleware to add mocks for anything that would exist in the request like session and user from passport
app.use( (req, res, next) => {
  req.user = TEST_USER
  next()
} )

app.use("/", route)

describe( 'Test FHIR routes', () => {

  test( 'test search CodeSystem: GET /resource?query', () => {
    const MOCK_CODESYSTEM = {
      resourceType: "Bundle",
      id: "mock-test",
      test: "test",
      entry: []
    }
    axios.__setFhirResults( DEFAULT_URL + "CodeSystem", { test: "test" }, MOCK_CODESYSTEM )

    return request(app).get("/CodeSystem").query("test=test").then( (response) => {
      expect(response.statusCode).toBe( 200 )
      expect(response.body).toEqual( MOCK_CODESYSTEM )
    } )
  } )

  test( 'test read StructureDefinition instance: GET /resource/id', () => {
    const MOCK_PROFILE = {
      resourceType: "StructureDefinition",
      id: "mock-test"
    }
    axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/mock-test", null, MOCK_PROFILE )

    return request(app).get("/StructureDefinition/mock-test").then( (response) => {
      expect(response.statusCode).toBe( 200 )
      expect(response.body).toEqual( MOCK_PROFILE )
    } )
  } )

  test( 'test expand ValueSet instance: GET /ValueSet/id/$expand', () => {
    const MOCK_VALUESET_EXPANSION = {
      resourceType: "ValueSet",
      id: "mock-test"
    }
    axios.__setFhirResults( DEFAULT_URL + "ValueSet/mock-test/$expand", null, MOCK_VALUESET_EXPANSION )

    return request(app).get("/ValueSet/mock-test/$expand").then( (response) => {
      expect(response.statusCode).toBe( 200 )
      expect(response.body).toEqual( MOCK_VALUESET_EXPANSION )
    } )
  } )


} )
