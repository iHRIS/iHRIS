const axios = require('axios')
const URL = require('url').URL

const fhirAxios = {
  options: { base: undefined, username: undefined, password: undefined },
  baseUrl: undefined,
  configured: false,
  setOptions: (options) => {
    if ( fhirAxios.configured ) {
      throw new Error( "fhirAxios has already been configured!" )
    } else {
      options = options || {}
      fhirAxios.options.base = options.base || "http://localhost:8080/hapi/fhir/"
      fhirAxios.options.username = options.username || ""
      fhirAxios.options.password = options.password || ""
      if ( fhirAxios.options.base.slice(-1) !== "/" ) {
        fhirAxios.options.base += "/"
      }
      fhirAxios.baseUrl = new URL(fhirAxios.options.base)
      fhirAxios.configured = true
    }
  },
  __getAuth: () => {
    if ( fhirAxios.options.username && fhirAxios.options.password ) {
      return { username: fhirAxios.options.username, password: fhirAxios.options.password }
    } else {
      return {}
    }
  },
  read: ( resource, id, vid ) => {
    return new Promise( (resolve, reject) => {
      if ( resource === undefined ) {
        reject( new Error( "resource must be defined" ) )
      }
      let url = new URL(fhirAxios.baseUrl.href)
      url.pathname += resource
      if ( id !== undefined ) {
        url.pathname += "/" + id
      }
      if ( vid !== undefined ) {
        url.pathname += "/_history/" + vid
      }

      let auth = fhirAxios.__getAuth()
      axios.get( url.href, { auth: auth } ).then ( (response) => {
        resolve(response.data)
      } ).catch( (err) => {
        reject( err )
      } )

    } )
  },
  search: ( resource, params ) => {
    return new Promise( (resolve, reject) => {
      if ( resource === undefined ) {
        reject( new Error( "resource must be defined" ) )
      }
      let url = new URL(fhirAxios.baseUrl.href)
      url.pathname += resource
      let auth = fhirAxios.__getAuth()

      axios.get( url.href, { auth: auth, params: params } ).then( (response) => {
        resolve( response.data )
      } ).catch( (err) => {
        reject( err )
      } )

    } )
  },
  update: ( resource ) => {
    return new Promise( (resolve, reject) => {
      if ( resource === undefined ) {
        reject( new Error( "resource must be defined" ) )
      }
      let url = new URL(fhirAxios.baseUrl.href)
      url.pathname += resource.resourceType + "/" + resource.id

      let auth = fhirAxios.__getAuth()
      axios.put( url.href, resource, { auth: auth } ).then ( (response) => {
        resolve( response.data )
      } ).catch( (err) => {
        reject( err )
      } )

    } )
  },
  expand: ( valueset, params ) => {
    return new Promise( (resolve, reject) => {
      if ( !valueset ) {
        reject( new Error( "valueset must be defined" ) )
      }
      let url = new URL( fhirAxios.baseUrl.href )
      url.pathname += "ValueSet/" + valueset + "/$expand"

      let auth = fhirAxios.__getAuth()
      axios.get( url.href, { auth: auth, params: params } ).then( (response) => {
        try {
          let total = response.data.expansion.total
          let count = response.data.expansion.parameter.find( param => param.name === "count" ).valueInteger
          let offset = response.data.expansion.offset

          if ( total > offset + count ) {
            offset += count
            fhirAxios.expand( valueset, { count: count, offset: offset } ).then ( (contains) => {
              resolve( response.data.expansion.contains.concat( contains ) )
            } ).catch( (err) => {
              reject ( err )
            } )
          } else {
            resolve( response.data.expansion.contains )
          }
        } catch ( err ) {
          reject( err )
        }
      } ).catch( (err) => {
        reject ( err )
      } )
    } )
  }
}


module.exports = fhirAxios
