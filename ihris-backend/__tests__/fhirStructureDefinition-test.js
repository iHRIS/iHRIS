'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const structureDef = require('../modules/fhirStructureDefinition')
const axios = require('axios')

describe( 'Test FHIR StructureDefinition processing', () => {

  const STRUCTUREDEFINITION_PRACTITIONER = require("./resources/StructureDefinition-Practitioner")
  const STRUCTUREDEFINITION_CONTACTPOINT = require("./resources/StructureDefinition-ContactPoint")
  const STRUCTUREDEFINITION_PERIOD = require("./resources/StructureDefinition-Period")

  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/Practitioner", null, 
    STRUCTUREDEFINITION_PRACTITIONER )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/ContactPoint", null, 
    STRUCTUREDEFINITION_CONTACTPOINT )
  axios.__setFhirResults( DEFAULT_URL + "StructureDefinition/Period", null, 
    STRUCTUREDEFINITION_PERIOD )

  test( 'test getFieldDefinition', (done) => {
    structureDef.getFieldDefinition( "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.period.start" ).then( (field) => {
      expect(field.id).toEqual("Period.start")
      expect(field.type[0].code).toEqual("dateTime")
      done()
    } )
  } )


} )
