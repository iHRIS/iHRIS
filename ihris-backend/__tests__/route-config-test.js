'use strict'

jest.mock('axios')

const DEFAULT_URL = "http://localhost:8080/hapi/fhir/"

const request = require("supertest")
const route = require("../routes/config.js")

const express = require('express')
const app = express()
const nconf = require('../modules/config')
app.use(express.urlencoded({extended: false}))
app.use("/", route)

describe( 'Test config routes', () => {

  test( 'test site details', () => {
    nconf.use( 'memory' )
    nconf.set( "site:title", "Test" )
    return request(app).get("/site").then( (response) => {
      console.log(response.body)
      expect(response.statusCode).toBe( 200 )
      expect(response.body.title).toEqual( "Test" )
      expect(response.body.user.loggedin).toBeFalsy()
    } )
  } )

} )
