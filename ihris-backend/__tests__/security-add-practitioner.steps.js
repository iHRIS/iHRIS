const { defineFeature, loadFeature } = require( "jest-cucumber" )

const fhirSecurity = require('../modules/fhirSecurity')

const feature = loadFeature("features/security-add-practitioner.feature")

defineFeature( feature, test => {
  test("Add a new Practitioner", ({ given, when, then }) => {
    let submittedPractitioner
    let expectedPractitioner
    let uuid
    given("A new Practitioner", newPractitioner => {
      submittedPractitioner = JSON.parse(newPractitioner)
    } )
    when("The Practitioner is submitted", () => {
      // Not testing the full post so nothing to do here
    } )
    then("Nothing should be added on preProcess", async (preProcessExpected) => {
      uuid = await fhirSecurity.preProcess( submittedPractitioner )
      expect( submittedPractitioner ).toEqual( JSON.parse(preProcessExpected) )
    } )
    then("The Practitioner should be saved", savedResource => {
      // Not testing fhir save here
      submittedPractitioner = JSON.parse(savedResource)
    } )
    then("Security tags should be added on postProcess", async (securityTags) => {
      let output = await fhirSecurity.postProcess( submittedPractitioner, uuid )
      expect( submittedPractitioner ).toEqual( JSON.parse(securityTags) )
    } )
  } )
} )

