const { defineFeature, loadFeature } = require( "jest-cucumber" )

jest.mock('axios')
const axios = require('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const fhirSecurity = require('../modules/fhirSecurity')

const feature = loadFeature("features/security-add-basic-practitioner.feature")

defineFeature( feature, test => {
  test("Add a new Basic", ({ given, when, then }) => {
    let submittedBasic
    let uuid
    given("An existing Practitioner", existing => {
      let practitioner = JSON.parse(existing)
      axios.__setFhirResults( DEFAULT_URL + practitioner.resourceType+"/"+practitioner.id, null, practitioner )
    } )
    when("A new Basic is submitted", resource => {
      submittedBasic = JSON.parse(resource)
    } )
    then("Security should be added on preProcess", async (preProcessExpected) => {
      uuid = await fhirSecurity.preProcess( submittedBasic )
      console.log(submittedBasic)
      expect( submittedBasic ).toEqual( JSON.parse(preProcessExpected) )
    } )
    then("The Basic should be saved", savedResource => {
      // Not testing fhir save here
      submittedBasic = JSON.parse(savedResource)
    } )
    then("Nothing should be added on postProcess", async (securityTags) => {
      let output = await fhirSecurity.postProcess( submittedBasic, uuid )
      expect( submittedBasic ).toEqual( JSON.parse(securityTags) )
    } )
  } )
} )

