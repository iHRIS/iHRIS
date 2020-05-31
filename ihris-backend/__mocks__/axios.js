'use strict'

const hash = require('object-hash')
const axios = jest.genMockFromModule('axios')

let fhirResults = {}

function __hashObject( obj ) {
  let objHash = ""
  if ( obj ) {
    objHash = hash( obj )
  }
  return objHash
}

function __setFhirResults( url, data, newFhirResults ) {
  let objHash = __hashObject( data )
  fhirResults[ url + objHash ] = newFhirResults
}

function get( url, config ) {
  let paramHash = __hashObject( config.params )
  return new Promise( (resolve, reject) => {
    resolve( { data: fhirResults[ url + paramHash ], status: 200 } )
  } )
}

function put( url, data, config ) {
  let objHash = __hashObject( data )
  return new Promise( (resolve, reject) => {
    resolve( { data: fhirResults[ url + objHash ], status: 200 } )
  } )
}

axios.__setFhirResults = __setFhirResults
axios.get = get
axios.put = put

module.exports = axios
