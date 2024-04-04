const nconf = require('../config')
const axios = require('axios')
const logger = require('../../winston')

const DEFAULT_DELAY = 900000
const DEFAULT_SHORT_DELAY = 5000

const fhirReports = {
  _caching: "",
  _cacheLoop: undefined,
  _delayRun: undefined,
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
          if(nconf.get("fhir:flattener") === "fhir2sql") {
            const { CacheFhirToES } = require('fhir2sql')
            fhirReports._caching = new CacheFhirToES( {
              FHIRBaseURL: nconf.get("fhir:base") || "http://localhost:8080/hapi/fhir",
              FHIRUsername: nconf.get("fhir:username"),
              FHIRPassword: nconf.get("fhir:password"),
              relationshipsIDs: [],
              ESModulesBasePath: nconf.get("app:site:path") + "/modules/es",
              DBConnection: {
                database: nconf.get("database:name"),
                username: nconf.get("database:username"),
                password: nconf.get("database:password"),
                dialect: nconf.get("database:dialect") /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
              }
            } )
          } else {
            const { CacheFhirToES } = require('fhir2es')
            fhirReports._caching = new CacheFhirToES( {
              ESBaseURL: server,
              ESUsername: username,
              ESPassword: password,
              relationshipsIDs: [],
              ESMaxCompilationRate: nconf.get("elasticsearch:max_compiliation_rate") || "100000/1m",
              ESMaxScrollContext: nconf.get("elasticsearch:max_scroll_context") || "100000",
              FHIRBaseURL: nconf.get("fhir:base") || "http://localhost:8080/hapi/fhir",
              FHIRUsername: nconf.get("fhir:username"),
              FHIRPassword: nconf.get("fhir:password"),
              ESModulesBasePath: nconf.get("app:site:path") + "/modules/es"
            } )
          }
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
    if ( !fhirReports._caching ) {
      logger.error("Tried to run reports but the caching isn't available.")
      return
    }
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
  },
  delayedRun: ( delay ) => {
    if ( !delay ) {
      delay = DEFAULT_SHORT_DELAY
    }
    if ( fhirReports._delayRun ) {
      clearTimeout( fhirReports._delayRun )
      fhirReports._delayRun = undefined
    }
    fhirReports._delayRun = setTimeout( () => {
      fhirReports.runReports()
    }, delay )
  }
}


module.exports = fhirReports
