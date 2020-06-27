'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const request = require("supertest")

const route = require("../routes/questionnaire.js")
const user = require("../modules/user")

const TEST_USER = user.restoreUser( {
  resource: { resourceType: "Person" },
  permissions: { 
    read : { 
      StructureDefinition : true, 
      CodeSystem : true, 
      Questionnaire : true, 
      ValueSet: { id: { "mock-test": true, "mock-field": { code : true } } }, 
      Person: { id: { "test-person": true } },
      DocumentReference: { constraint: { "category.exists(coding.exists(code = 'open'))": true } }
    }, 
    write: { QuestionnaireResponse: true } 
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

describe( 'Test FHIR Questionnaire middleware route', () => {

  const MOCK_QUESTIONNAIRE = {
    "resourceType": "Questionnaire",
    "id": "ihris-test",
    "title": "iHRIS Test Questionnaire",
    "description": "iHRIS Test initial data entry questionnaire.",
    "url": "http://ihris.org/fhir/Questionnaire/ihris-test",
    "name": "ihris-test",
    "status": "active",
    "date": "2020-06-24",
    "purpose": "Data entry page for test.",
    "item": [
      {
        "linkId": "Practitioner",
        "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner",
        "text": "Health Worker|Primary demographic details",
        "type": "group",
        "item": [
          {
            "linkId": "Practitioner.name[0]",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#name",
            "text": "Name",
            "type": "group",
            "item": [
              {
                "linkId": "Practitioner.name[0].use",
                "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#name.use",
                "text": "Name Usage",
                "type": "choice",
                "required": true,
                "repeats": false,
                "readOnly": true,
                "answerOption": [
                  {
                    "valueCoding": {
                      "code": "official",
                      "system": "http://hl7.org/fhir/name-use"
                    },
                    "initialSelected": true
                  }
                ]
              },
              {
                "linkId": "Practitioner.name[0].family",
                "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#name.family",
                "text": "Family Name",
                "type": "string",
                "required": true,
                "repeats": false
              },
              {
                "linkId": "Practitioner.name[0].given[0]",
                "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#name.given",
                "text": "Given Name(s)",
                "type": "string",
                "required": true,
                "repeats": true
              }
            ]
          },
          {
            "linkId": "Practitioner.birthDate",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#birthDate",
            "text": "Date of Birth",
            "type": "date",
            "required": false,
            "repeats": false
          },
          {
            "linkId": "Practitioner.gender",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#gender",
            "text": "Gender",
            "type": "choice",
            "answerValueSet": "http://hl7.org/fhir/ValueSet/administrative-gender",
            "required": false,
            "repeats": false
          }
        ]
      },
      {
        "linkId": "__Practitioner:contact",
        "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner",
        "text": "Contact Details|Address, email, phone numbers",
        "type": "group",
        "item": [
          {
            "linkId": "Practitioner.telecom[0].use",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#telecom.use",
            "text": "Telecom Use",
            "type": "choice",
            "required": true,
            "repeats": false,
            "readOnly": true,
            "answerOption": [
              {
                "valueCoding": {
                  "code": "mobile",
                  "system": "http://hl7.org/fhir/contact-point-use"
                },
                "initialSelected": true
              }
            ]
          },
          {
            "linkId": "Practitioner.telecom[0].system",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#telecom.system",
            "text": "Telecom System",
            "type": "choice",
            "required": true,
            "repeats": false,
            "readOnly": true,
            "answerOption": [
              {
                "valueCoding": {
                  "code": "phone",
                  "system": "http://hl7.org/fhir/contact-point-system"
                },
                "initialSelected": true
              }
            ]
          },
          {
            "linkId": "Practitioner.telecom[0].value",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#telecom.value",
            "text": "Mobile Phone",
            "type": "string",
            "required": false,
            "repeats": false
          },
          {
            "linkId": "Practitioner.telecom[1].use",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#telecom.use",
            "text": "Telecom Use",
            "type": "choice",
            "required": true,
            "repeats": false,
            "readOnly": true,
            "answerOption": [
              {
                "valueCoding": {
                  "code": "work",
                  "system": "http://hl7.org/fhir/contact-point-use"
                },
                "initialSelected": true
              }
            ]
          },
          {
            "linkId": "Practitioner.telecom[1].system",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#telecom.system",
            "text": "Telecom System",
            "type": "choice",
            "required": true,
            "repeats": false,
            "readOnly": true,
            "answerOption": [
              {
                "valueCoding": {
                  "code": "email",
                  "system": "http://hl7.org/fhir/contact-point-system"
                },
                "initialSelected": true
              }
            ]
          },
          {
            "linkId": "Practitioner.telecom[1].value",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#telecom.value",
            "text": "Work Email",
            "type": "string",
            "required": false,
            "repeats": false
          }
        ]
      },
      {
        "linkId": "PractitionerRole",
        "definition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole",
        "text": "Position|Position the person holds",
        "type": "group",
        "item": [
          {
            "linkId": "PractitionerRole.code",
            "definition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole#code",
            "text": "Job Title",
            "type": "choice",
            "answerValueSet": "http://ihris.org/fhir/ValueSet/ihris-job",
            "required": true,
            "repeats": false
          },
          {
            "linkId": "PractitionerRole.period.start",
            "definition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole#period.start",
            "text": "Start Date",
            "type": "date",
            "required": true,
            "repeats": false
          }
        ]
      },
      {
        "linkId": "Practitioner.identifier",
        "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner",
        "text": "Identifiers|Identifiers for the practitioner",
        "type": "group",
        "item": [
          {
            "linkId": "Practitioner.identifier[0]",
            "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#identifier",
            "text": "Identifier",
            "type": "group",
            "repeats": true,
            "required": false,
            "item": [
              {
                "linkId": "Practitioner.identifier[0].system",
                "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#identifier.system",
                "text": "System",
                "type": "string",
                "repeats": false,
                "required": false
              },
              {
                "linkId": "Practitioner.identifier[0].value",
                "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#identifier.value",
                "text": "ID Number",
                "type": "string",
                "repeats": false,
                "required": false
              },
              {
                "linkId": "Practitioner.identifier[0].type",
                "definition": "http://hl7.org/fhir/StructureDefinition/Practitioner#identifier.type",
                "text": "ID Type",
                "type": "choice",
                "answerValueSet": "http://hl7.org/fhir/ValueSet/identifier-type",
                "repeats": false,
                "required": false
              }
            ]
          }
        ]
      }
    ]
  }
  const MOCK_QUESTIONNAIRE_RESPONSE = {
    resourceType: "QuestionnaireResponse",
    questionnaire: "http://ihris.org/fhir/Questionnaire/ihris-test",
    status: "completed",
    "item": [
    ]
  }


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

  describe( 'Test POST /QuestionnaireReponse', () => {

    test( 'test POST response', () => {
      axios.__setFhirResults( DEFAULT_URL + "Questionnaire/ihris-test", null, MOCK_CODESYSTEM )
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

} )
