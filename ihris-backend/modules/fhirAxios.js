const axios = require('axios')
const URL = require('url').URL


const fhirAxios = (options) => {
  options = options || {}

  var fhirBase = options.base || "http://localhost:8080/hapi/fhir/"
  const username = options.username || ""
  const password = options.password || ""
  if ( fhirBase.slice(-1) !== "/" ) {
    fhirBase += "/"
  }
  var baseUrl = new URL(fhirBase)

  return {
    fhirBase: fhirBase,
    read: ( resource, id, vid ) => {
      return new Promise( (resolve, reject) => {
        if ( resource === undefined ) {
          reject( new Error( "resource must be defined" ) )
        }
        let url = new URL(baseUrl.href)
        url.pathname += resource
        if ( id !== undefined ) {
          url.pathname += "/" + id
        }
        if ( vid !== undefined ) {
          url.pathname += "/_history/" + vid
        }

        var auth = {}
        if ( username && password ) {
          auth = { username: username, password: password }
        }
        axios.get( url.href, { auth: auth } ).then ( (response) => {
          resolve(response.data)
        } ).catch( (err) => {
          reject( err )
        } )

      } )
    }
  }

}

module.exports = fhirAxios
