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
  create: ( resource ) => {
    return new Promise( (resolve, reject) => {
      if ( resource === undefined ) {
        reject( new Error( "resource must be defined" ) )
      }
      let url = new URL(fhirAxios.baseUrl.href)
      url.pathname += resource.resourceType 

      let auth = fhirAxios.__getAuth()
      axios.post( url.href, resource, { auth: auth } ).then ( (response) => {
        resolve( response.data )
      } ).catch( (err) => {
        reject( err )
      } )

    } )
  },
  delete: ( resource, id ) => {
    return new Promise( (resolve, reject) => {
      if ( resource === undefined ) {
        reject( new Error( "resource must be defined" ) )
      }
      if ( id === undefined ) {
        reject( new Error( "id must be defined" ) )
      }
      let url = new URL(fhirAxios.baseUrl.href)
      url.pathname += resource + "/" + id

      let auth = fhirAxios.__getAuth()
      axios.delete( url.href, { auth: auth } ).then ( (response) => {
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
      if ( !resource.hasOwnProperty("id") || !resource.id ) {
        reject( new Error( "resource must have an id field" ) )
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
  expand: ( valueset, params, complete, containsOnly ) => {
    return new Promise( (resolve, reject) => {
      if ( !valueset ) {
        reject( new Error( "valueset must be defined" ) )
      }
      let url = new URL( fhirAxios.baseUrl.href )
      url.pathname += "ValueSet/" + valueset + "/$expand"

      let auth = fhirAxios.__getAuth()
      axios.get( url.href, { auth: auth, params: params } ).then( (response) => {
        if ( complete ) {
          try {
            let total = response.data.expansion.total
            let count = response.data.expansion.parameter.find( param => param.name === "count" ).valueInteger
            let offset = response.data.expansion.offset

            if ( total > offset + count ) {
              offset += count
              let paging = { count: count, offset: offset }
              let newparams = { ...params, ...paging }
              fhirAxios.expand( valueset, newparams, complete, containsOnly ).then ( (continued) => {
                if ( containsOnly ) {
                  resolve( response.data.expansion.contains.concat( continued ) )
                } else {
                  response.data.expansion.contains = response.data.expansion.contains.concat( continued.expansion.contains )
                  resolve( response.data )
                }
              } ).catch( (err) => {
                reject ( err )
              } )
            } else {
              if ( containsOnly ) {
                resolve( response.data.expansion.contains )
              } else {
                resolve( response.data )
              }
            }
          } catch ( err ) {
            reject( err )
          }
        } else {
          if ( containsOnly ) {
            try {
              let total = response.data.expansion.total
              if ( total === response.data.expansion.contains.length ) {
                resolve( response.data.expansion.contains )
              } else {
                reject( new Error( "Unable to return only the contains expansion when the full expansion wasn't returned." ) )
              }
            } catch( err ) {
              reject( err )
            }
          } else {
            resolve( response.data )
          }
        }
      } ).catch( (err) => {
        reject ( err )
      } )
    } )
  }
}


module.exports = fhirAxios
