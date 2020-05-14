'use strict'

const axios = jest.genMockFromModule('axios')

let fhirResults = ""

function __setFhirResults( newFhirResults ) {
  fhirResults = newFhirResults
}

function get( url, config ) {
  return new Promise( (resolve, reject) => {
    resolve( { data: fhirResults, status: 200 } )
  } )
}

axios.__setFhirResults = __setFhirResults
axios.get = get

module.exports = axios
