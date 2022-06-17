const { defineFeature, loadFeature } = require( "jest-cucumber" )

jest.mock('axios')
const axios = require('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const fhirSecurity = require('../modules/fhirSecurity')

const feature = loadFeature("features/security-update-location.feature")

defineFeature( feature, test => {
  test("Add a new Location", ({ given, when, then }) => {
    let submittedLocation
    let uuid
    given("A Location hierarchy exists", searchResults => {
      let results = JSON.parse(searchResults)
      axios.__setFhirResults( DEFAULT_URL + "Location",
        { _id: "Location/country2", status: "active", "_include:iterate": "Location:partof" }, results )
    } )
    given("A Facility exists", location => {
    } )
    given("A District exists", location => {
      let exists = JSON.parse(location)
      axios.__setFhirResults( DEFAULT_URL + "Location/district", null, exists )
    } )
    when("A District is updated", location => {
      submittedLocation = JSON.parse(location)
    } )
    then("Security should be added on preProcess", async (preProcessExpected) => {
      uuid = await fhirSecurity.preProcess( submittedLocation )
      expect( submittedLocation ).toEqual( JSON.parse(preProcessExpected) )
    } )
    then("The Location should be saved", savedResource => {
      // Not testing fhir save here
      submittedLocation = JSON.parse(savedResource)
    } )
    then("Search results for location security are updated", searchResults => {
      let results = JSON.parse(searchResults)
      axios.__setFhirResults( DEFAULT_URL + "Location",
        { _security: fhirSecurity.modules.fhirSecurityLocation.system + "|Location/district" }, results )
      let notfound = { resourceType: "Bundle", type: "searchset", entry: [] }
      axios.__setFhirResults( DEFAULT_URL + "Practitioner",
        { _security: fhirSecurity.modules.fhirSecurityLocation.system + "|Location/district" }, notfound )
      axios.__setFhirResults( DEFAULT_URL + "PractitionerRole",
        { _security: fhirSecurity.modules.fhirSecurityLocation.system + "|Location/district" }, notfound )
      axios.__setFhirResults( DEFAULT_URL + "Basic",
        { _security: fhirSecurity.modules.fhirSecurityLocation.system + "|Location/district" }, notfound )
    } )
    then("Facility should be updated", expectedFacility => {
      let expected = JSON.parse(expectedFacility)
      axios.__setFhirResults( DEFAULT_URL + "Location/facility", expected, expected )
      //axios.__setFhirResults( DEFAULT_URL + "Location/district", submittedLocation, submittedLocation )
    } )
    then("Nothing should be added on postProcess", async (securityTags) => {
      let finalLoc = JSON.parse( securityTags )
      //axios.__setFhirResults( DEFAULT_URL + "Location/district", finalLoc, finalLoc )
      let output = await fhirSecurity.postProcess( submittedLocation, uuid )
      expect( submittedLocation ).toEqual( finalLoc )
    } )
  } )
} )

