const { defineFeature, loadFeature } = require( "jest-cucumber" )

const jest_setup = require('../jest-setup')
jest.mock('axios')
const axios = require('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const fhirSecurity = require('../modules/fhirSecurity')

const feature = loadFeature("features/security-update-practitioner.feature")

defineFeature( feature, test => {
  test("Update a Practitioner", ({ given, when, then }) => {
    let submittedPractitioner
    let expectedPractitioner
    let uuid
    given("An existing Practitioner", oldPractitioner => {
      let practitioner = JSON.parse(oldPractitioner)
      axios.__setFhirResults( DEFAULT_URL + practitioner.resourceType + "/" + practitioner.id, null, practitioner )
    } )
    when("An update to that Practitioner is submitted", newPractitioner => {
      submittedPractitioner = JSON.parse(newPractitioner)
    } )
    then("Previous security should be updated on preProcess", async (preProcessExpected) => {
      uuid = await fhirSecurity.preProcess( submittedPractitioner )
      expect( submittedPractitioner ).toEqual( JSON.parse(preProcessExpected) )
    } )
    then("The Practitioner should be saved", savedResource => {
      // Not testing fhir save here
      submittedPractitioner = JSON.parse(savedResource)
    } )
    then("Nothing should be added on postProcess", async (securityTags) => {
      let output = await fhirSecurity.postProcess( submittedPractitioner, uuid )
      expect( submittedPractitioner ).toEqual( JSON.parse(securityTags) )
    } )
  } )
} )

