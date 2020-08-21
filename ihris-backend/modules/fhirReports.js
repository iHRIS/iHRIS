const nconf = require('./config')
const winson = require('winston')
const axios = require('axios')
const { CacheFhirToES } = require('fhir2es')

const DEFAULT_DELAY = 900000

const fhirReports = {
  _caching: "",
  _cacheLoop: undefined,
  setup: () => {
    return new Promise( (resolve, reject) => {
      let server = nconf.get('elasticsearch:base') || "http://localhost:9200"
      let username = nconf.get("elasticsearch:username")
      let password = nconf.get("elasticsearch:password")
      let auth = {}
      if ( username && password ) {
        auth = { username: username, password: password }
      }

      axios.get( server, { auth: auth } ).then( (response) => {
        if ( response.status === 200 ) {
          fhirReports._caching = new CacheFhirToES( {
            ESBaseURL: server,
            ESUsername: username,
            ESPassword: password,
            ESMaxCompilationRate: nconf.get("elasticsearch:max_compiliation_rate") || "10000/1m",
            FHIRBaseURL: nconf.get("fhir:base") || "http://localhost:8080/hapi/fhir",
            FHIRUsername: nconf.get("fhir:username"),
            FHIRPassword: nconf.get("fhir:password")
          } )
          resolve(true)
        } else {
          reject(new Error("Couldn't connect to ElasticSearch: "+server))
        }
      } ).catch( (err) => {
        reject(err)
      } )
    } )
  },
  runReports: ( single ) => {
    fhirReports._caching.cache()
    if ( !single ) {
      if ( fhirReports._cacheLoop ) {
        clearTimeout( fhirReports._cacheLoop )
        fhirReports._cacheLoop = undefined
      }
      fhirReports._cacheLoop = setTimeout( () => {
        fhirReports.runReports()
      }, nconf.get("report:refresh") || DEFAULT_DELAY )
    }
  }
}


module.exports = fhirReports
