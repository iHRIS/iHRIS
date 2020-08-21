'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const request = require("supertest")
const route = require("../routes/config.js")
const axios = require('axios')
const user = require("../modules/user")
const outcomes = require("../config/operationOutcomes")

const express = require('express')
const app = express()
const nconf = require('../modules/config')
app.use(express.urlencoded({extended: false}))

const TEST_ALLOWED = user.restoreUser( {
  resource: { resourceType: "Person" },
  permissions: { read: { "*" : true } }
} )
const TEST_NOT_ALLOWED = user.restoreUser( {
  resource: { resourceType: "Person" },
  permissions: { read : { StructureDefinition: true } }
} )

var appUser = TEST_ALLOWED
app.use( (req, res, next) => {
  req.user = appUser
  next()
} )

app.use("/", route)


describe( 'Test config routes', () => {

  test( 'test site details', () => {
    nconf.use( 'memory' )
    nconf.set( "site:title", "Test" )
    appUser = null
    return request(app).get("/site").then( (response) => {
      expect(response.statusCode).toBe( 200 )
      expect(response.body.title).toEqual( "Test" )
      expect(response.body.user.loggedin).toBeFalsy()
    } )
  } )

  test( 'test resource page config', () => {
    const MOCK_PAGE = require("./resources/Basic-ihris-page-test-practitioner")
    const STRUCTUREDEFINITION_PRACTITIONER = require("./resources/StructureDefinition-ihris-test-practitioner")
    const STRUCTUREDEFINITION_PRACTITIONERROLE = require("./resources/StructureDefinition-ihris-test-practitioner-role")


    axios.__setFhirResults( DEFAULT_URL + "Basic/ihris-page-test-practitioner", null, 
      MOCK_PAGE )
    axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ihris-test-practitioner", null, 
      STRUCTUREDEFINITION_PRACTITIONER )
    axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ihris-test-practitioner-role", null, 
      STRUCTUREDEFINITION_PRACTITIONERROLE )

    appUser = TEST_ALLOWED
    return request(app).get("/page/test-practitioner").then( (response) => {
      const RESOURCE_RESULTS = require("./resources/page-resource-output")

      let subKeys = Object.keys(response.body.data.subFields)
      for( let idx in subKeys ) {
        RESOURCE_RESULTS.template = RESOURCE_RESULTS.template.replace('__SUBFIELDS_TEST_REPLACE_'+idx+'__', subKeys[idx])
        expect( response.body.data.subFields[subKeys[idx]] ).toEqual( RESOURCE_RESULTS.data.subFields['TEST'+idx] )
      }

      let sectKeys = Object.keys(response.body.data.columns)
      for( let idx in sectKeys ) {
        RESOURCE_RESULTS.template = RESOURCE_RESULTS.template.replace('__COLUMNS_TEST_REPLACE_'+idx+'__', sectKeys[idx])
        RESOURCE_RESULTS.template = RESOURCE_RESULTS.template.replace('__ACTIONS_TEST_REPLACE_'+idx+'__', sectKeys[idx])
        expect( response.body.data.columns[sectKeys[idx]] ).toEqual( RESOURCE_RESULTS.data.columns['TEST'+idx] )
        expect( response.body.data.actions[sectKeys[idx]] ).toEqual( RESOURCE_RESULTS.data.actions['TEST'+idx] )
      }

      //console.log(JSON.stringify(response.body,null,2))
      expect(response.body.data.sectionMenu ).toEqual( RESOURCE_RESULTS.data.sectionMenu )
      expect(response.body.template).toEqual(RESOURCE_RESULTS.template)
    } )

  } )

  test( 'test resource page search config', () => {
    const MOCK_PAGE = require("./resources/Basic-ihris-page-test-practitioner")
    const STRUCTUREDEFINITION_PRACTITIONER = require("./resources/StructureDefinition-ihris-test-practitioner")
    const STRUCTUREDEFINITION_PRACTITIONERROLE = require("./resources/StructureDefinition-ihris-test-practitioner-role")


    axios.__setFhirResults( DEFAULT_URL + "Basic/ihris-page-test-practitioner", null, 
      MOCK_PAGE )
    axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ihris-test-practitioner", null, 
      STRUCTUREDEFINITION_PRACTITIONER )
    axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ihris-test-practitioner-role", null, 
      STRUCTUREDEFINITION_PRACTITIONERROLE )

    appUser = TEST_ALLOWED
    return request(app).get("/page/test-practitioner/search").then( (response) => {
      const RESOURCE_RESULTS = require("./resources/page-resource-search-output")

      expect(response.body).toEqual(RESOURCE_RESULTS)
    } )

  } )

  test( 'test page config no user', () => {
    appUser = null
    return request(app).get("/page/test-practitioner").then( (response) => {
      expect(response.body).toEqual(outcomes.NOTLOGGEDIN)
    } )
  } )

  test( 'test page config no access', () => {
    appUser = TEST_NOT_ALLOWED
    return request(app).get("/page/test-practitioner").then( (response) => {
      expect(response.body).toEqual(outcomes.DENIED)
    } )
  } )

  test( 'test codesystem page config', () => {
    const MOCK_PAGE = require("./resources/Basic-ihris-page-test-codesystem")

    const CODESYSTEM_PROPERTY = require("./resources/CodeSystem-ihris-test-codesystem-property")
    axios.__setFhirResults( DEFAULT_URL + "Basic/ihris-page-test-codesystem", null, 
      MOCK_PAGE )
    axios.__setFhirResults( DEFAULT_URL + "CodeSystem", 
      { _id: "ihris-test-codesystem", _elements: "url,title,property" }, CODESYSTEM_PROPERTY )

    appUser = TEST_ALLOWED
    return request(app).get("/page/test-codesystem").then( (response) => {
      const CODESYSTEM_RESULTS = require("./resources/page-codesystem-output")
      expect(response.body).toEqual(CODESYSTEM_RESULTS)
    } )
  } )

  test( 'test codesystem page search config', () => {
    const MOCK_PAGE = require("./resources/Basic-ihris-page-test-codesystem")

    const CODESYSTEM_PROPERTY = require("./resources/CodeSystem-ihris-test-codesystem-property")
    axios.__setFhirResults( DEFAULT_URL + "Basic/ihris-page-test-codesystem", null, 
      MOCK_PAGE )
    axios.__setFhirResults( DEFAULT_URL + "CodeSystem", 
      { _id: "ihris-test-codesystem", _elements: "url,title,property" }, CODESYSTEM_PROPERTY )

    appUser = TEST_ALLOWED
    return request(app).get("/page/test-codesystem/search").then( (response) => {
      const CODESYSTEM_RESULTS = require("./resources/page-codesystem-search-output")
      expect(response.body).toEqual(CODESYSTEM_RESULTS)
    } )
  } )

} )
