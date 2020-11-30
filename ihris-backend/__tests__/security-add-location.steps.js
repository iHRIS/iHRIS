const { defineFeature, loadFeature } = require( "jest-cucumber" )

jest.mock('axios')
const axios = require('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const fhirSecurity = require('../modules/fhirSecurity')

const feature = loadFeature("features/security-add-location.feature")

defineFeature( feature, test => {
  test("Add a new Location", ({ given, when, then }) => {
    let submittedLocation
    let uuid
    given("A Location hierarchy exists", searchResults => {
      let results = JSON.parse(searchResults)
      axios.__setFhirResults( DEFAULT_URL + "Location",
        { _id: "Location/district", status: "active", "_include:iterate": "Location:partof" }, results )
    } )
    when("A new Location is submitted", location => {
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
    then("Location id should be added on postProcess", async (securityTags) => {
      let finalLoc = JSON.parse( securityTags )
      axios.__setFhirResults( DEFAULT_URL + "Location/1", finalLoc, finalLoc )
      let output = await fhirSecurity.postProcess( submittedLocation, uuid )
      expect( submittedLocation ).toEqual( finalLoc )
    } )
  } )
} )

