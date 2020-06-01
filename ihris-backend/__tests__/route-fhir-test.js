'use strict'

jest.mock('axios')

const request = require("supertest")

const route = require("../routes/fhir.js")

const TEST_USER = {
  resource: {
    "resourceType": "Person"
  }
}

const express = require('express')
const app = express()

// Set up middleware to add mocks for anything that would exist in the request like session and user from passport
app.use( (req, res, next) => {
  req.user = TEST_USER
  next()
} )

app.use("/", route)

describe( 'Test FHIR routes', () => {

  test( 'test GET resource', () => {
    return request(app).get("/Practitioner").then( (response) => {
      expect(response.statusCode).toBe( 200 )
      console.log(response.body)
    } )
  } )


} )
