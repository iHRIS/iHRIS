'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const questionnaire = require('../modules/fhirQuestionnaire')
const axios = require('axios')
const nconf = require('../modules/config')

describe( 'Test FHIR Questionnaire processing', () => {

  const MOCK_QUESTIONNAIRE = require("./resources/Questionnaire-ihris-personal-information")

  const STRUCTUREDEFINITION_PRACTITIONER = require("./resources/StructureDefinition-ihris-personal-information")
  const STRUCTUREDEFINITION_PRACTITIONERROLE = require("./resources/StructureDefinition-ihris-job-description")
  const STRUCTUREDEFINITION_HUMANNAME = require("./resources/StructureDefinition-HumanName")
  const STRUCTUREDEFINITION_IDENTIFIER = require("./resources/StructureDefinition-Identifier")
  const STRUCTUREDEFINITION_CONTACTPOINT = require("./resources/StructureDefinition-ContactPoint")
  const STRUCTUREDEFINITION_PERIOD = require("./resources/StructureDefinition-Period")

  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ihris-personal-information", null, 
    STRUCTUREDEFINITION_PRACTITIONER )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ihris-job-description", null, 
    STRUCTUREDEFINITION_PRACTITIONERROLE )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/HumanName", null, 
    STRUCTUREDEFINITION_HUMANNAME )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/Identifier", null, 
    STRUCTUREDEFINITION_IDENTIFIER )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ContactPoint", null, 
    STRUCTUREDEFINITION_CONTACTPOINT )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/Period", null, 
    STRUCTUREDEFINITION_PERIOD )

  test( 'test setQuestionnairePaths', () => {
    //axios.__setFhirResults( DEFAULT_URL + "QuestionnaireResponse/ihris-test", null, MOCK_QUESTIONNAIRE_RESPONSE )

    const MOCK_QUESTIONNAIRE_RESPONSE = require("./resources/QuestionnaireResponse-ihris-ethiopia-test")
    let response = { ...MOCK_QUESTIONNAIRE_RESPONSE }
    questionnaire.setQuestionnairePaths( response )
    console.log(JSON.stringify(response,null,2))
    //const RESPONSE_PROCESSED = require("./resources/QuestionnaireResponse-ihris-test-processed")
    //expect(response).toEqual(RESPONSE_PROCESSED)
    //console.log("RESP",JSON.stringify(response,null,2))

  } )
  test( 'test processQuestionnaire', (done) => {
    axios.__setFhirResults( DEFAULT_URL + "Questionnaire/ihris-personal-information", null, MOCK_QUESTIONNAIRE )
    const MOCK_QUESTIONNAIRE_RESPONSE = require("./resources/QuestionnaireResponse-ihris-ethiopia-test")
    let response = { ...MOCK_QUESTIONNAIRE_RESPONSE }
    nconf.use('memory')
    nconf.set("fhir:uuid:namespace", "761678c1-3896-48ba-acd5-3f3a0de38135")
    questionnaire.processQuestionnaire( response ).then( (bundle) => {
      //const PROCESSED_BUNDLE = require("./resources/Bundle-ihris-test-questionnaire")
      //expect( bundle ).toEqual( PROCESSED_BUNDLE )
      console.log(JSON.stringify(bundle,null,2))
      done()
    } )
    /*
      const MOCK_CODESYSTEM = {
        resourceType: "Bundle",
        id: "mock-test",
        test: "test",
        entry: []
      }

      appUser = TEST_USER
      return request(app).get("/CodeSystem").query("test=test").then( (response) => {
        expect(response.statusCode).toBe( 200 )
        expect(response.body).toEqual( MOCK_CODESYSTEM )
      } )
      */
  } )


} )
