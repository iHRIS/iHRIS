const { defineFeature, loadFeature } = require( "jest-cucumber" )

jest.mock('axios')
const axios = require('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const fhirSecurity = require('../modules/fhirSecurity')

const feature = loadFeature("features/security-update-practitionerrole.feature")

defineFeature( feature, test => {
  test("Add a new PractitionerRole", ({ given, when, then }) => {
    let submittedRole
    let uuid
    given("An existing Practitioner", existing => {
      let practitioner = JSON.parse(existing)
      axios.__setFhirResults( DEFAULT_URL + practitioner.resourceType+"/"+practitioner.id, null, practitioner )
    } )
    given("Practitioner search results for security", searchResults => {
      let results = JSON.parse(searchResults)
      axios.__setFhirResults( DEFAULT_URL + "Practitioner",
        { _security: fhirSecurity.modules.fhirSecurityPractitioner.system + "|Practitioner/1" }, results )
    } )
    given("Basic search results for security", searchResults => {
      let results = JSON.parse(searchResults)
      axios.__setFhirResults( DEFAULT_URL + "Basic",
        { _security: fhirSecurity.modules.fhirSecurityPractitioner.system + "|Practitioner/1" }, results )
    } )
    given("A Location hierarchy exists", searchResults => {
      let results = JSON.parse(searchResults)
      //axios.__setFhirResults( DEFAULT_URL + "Location?_id=Location/facility&status=active&_include:iterate=Location:partof",
      axios.__setFhirResults( DEFAULT_URL + "Location",
        { _id: "Location/newfacility", status: "active", "_include:iterate": "Location:partof" }, results )
    } )
    given("A PractitionerRole exists", existing => {
      let role = JSON.parse(existing)
      axios.__setFhirResults( DEFAULT_URL + role.resourceType+"/"+role.id, null, role )
    } )
    when("A PractitionerRole is updated", role => {
      submittedRole = JSON.parse(role)
    } )
    then("Security should be added on preProcess", async (preProcessExpected) => {
      uuid = await fhirSecurity.preProcess( submittedRole )
      expect( submittedRole ).toEqual( JSON.parse(preProcessExpected) )
    } )
    then("The PractitionerRole should be saved", savedResource => {
      // Not testing fhir save here
      submittedRole = JSON.parse(savedResource)
    } )
    then("PractitionerRole search results for security", (searchResults) => {
      let results = JSON.parse(searchResults)
      axios.__setFhirResults( DEFAULT_URL + "PractitionerRole",
        { _security: fhirSecurity.modules.fhirSecurityPractitioner.system + "|Practitioner/1" }, results )
    } )
    then("Role Locations should exist", (searchResults) => {
      let now = new Date()
      let nowsplit = now.toISOString().split('T')
      let params = new URLSearchParams()
      params.append( "practitioner", "Practitioner/1" )
      params.append( "date", "ge"+nowsplit[0] )
      params.append( "active", "true" )
      params.append( "_include", "PractitionerRole:location" )
      params.append( "_include:iterate", "Location:partof" )

      let results = JSON.parse(searchResults)
      axios.__setFhirResults( DEFAULT_URL + "PractitionerRole", params, results )
    } )
    then("Should attempt to update Practitioner", (update) => {
      let resource = JSON.parse(update)
      axios.__setFhirResults( DEFAULT_URL + "Practitioner/1", resource, resource )
    } )
    then("Should attempt to update PractitionerRole", (update) => {
      let resource = JSON.parse(update)
      axios.__setFhirResults( DEFAULT_URL + "PractitionerRole/1", resource, resource )
    } )
    then("Nothing should be added on postProcess", async (securityTags) => {
      let output = await fhirSecurity.postProcess( submittedRole, uuid )
      expect( submittedRole ).toEqual( JSON.parse(securityTags) )
    } )
  } )
} )

