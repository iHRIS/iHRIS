'use strict'

const hash = require('object-hash')
const axios = jest.genMockFromModule('axios')

let fhirResults = {}
let fhirErrors = {}

function __hashObject( obj ) {
  let objHash = ""
  if ( obj && Object.keys(obj).length > 0 ) {
    objHash = hash( obj )
  } else if ( obj && obj instanceof URLSearchParams ) {
    objHash = hash( obj.toString() )
  }
  return objHash
}

function __setFhirResults( url, data, newFhirResults ) {
  let objHash = __hashObject( data )
  fhirResults[ url + objHash ] = newFhirResults
}

function __setFhirError( url, data, status, newFhirResults ) {
  let objHash = __hashObject( data )
  fhirErrors[ url + objHash ] = { data: newFhirResults, status: status }
}

function get( url, config ) {
  let paramHash = __hashObject( config.params )
  return new Promise( (resolve, reject) => {
    if ( fhirErrors.hasOwnProperty( url + paramHash ) ) {
      reject( { response: fhirErrors[ url + paramHash ] } )
    } else if ( fhirResults.hasOwnProperty( url + paramHash ) ) {
      resolve( { data: fhirResults[ url + paramHash ], status: 200 } )
    } else {
      reject( { response: "Not found" } )
    }
  } )
}

function put( url, data, config ) {
  let objHash = __hashObject( data )
  return new Promise( (resolve, reject) => {
    if ( fhirErrors.hasOwnProperty( url + objHash ) ) {
      reject( { response: fhirErrors[ url + objHash ] } )
    } else if ( fhirResults.hasOwnProperty( url + objHash ) ) {
      resolve( { data: fhirResults[ url + objHash ], status: 200 } )
    } else {
      reject( { response: "Not found" } )
    }
  } )
}

function post( url, data, config ) {
  let objHash = __hashObject( data )
  return new Promise( (resolve, reject) => {
    if ( fhirErrors.hasOwnProperty( url + objHash ) ) {
      reject( { response: fhirErrors[ url + objHash ] } )
    } else if ( fhirResults.hasOwnProperty( url + objHash ) ) {
      let response = { ...fhirResults[ url + objHash ] }
      // overwrite the id like the server would on a create (or add it)
      response.id = "1"
      resolve( { data: response, status: 201 } )
    } else {
      reject( { response: "Not found" } )
    }
  } )
}

function remove( url, config ) {
  let paramHash = __hashObject( config.params )
  return new Promise( (resolve, reject) => {
    if ( fhirErrors.hasOwnProperty( url + paramHash ) ) {
      reject( { response: fhirErrors[ url + paramHash ] } )
    } else if ( fhirResults.hasOwnProperty( url + paramHash ) ) {
      resolve( { data: fhirResults[ url + paramHash ], status: 200 } )
    } else {
      reject( { response: "Not found" } )
    }
  } )
}

axios.__setFhirResults = __setFhirResults
axios.__setFhirError = __setFhirError
axios.get = get
axios.put = put
axios.post = post
axios.delete = remove

module.exports = axios
