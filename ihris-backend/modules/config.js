const nconf = require('nconf')
const fhirConfig = require('./fhirConfig')

nconf.argv().env( {
  separator: '__',
  lowerCase: true,
  parseValues: true,
  transform: (obj) => {
    if ( obj.key.match( /^ihris_/ ) ) {
      obj.key = obj.key.substring(6)
      return obj
    } else {
      return
    }
  }
} )

let baseConfig = fhirConfig.parseFile( './config/baseConfig.json' )
nconf.add('base', { type: 'literal', store: baseConfig } )

const fhirAxios = require('./fhirAxios')

fhirAxios.setOptions( { 
  base: nconf.get("fhir:base"),
  username: nconf.get("fhir:username"),
  password: nconf.get("fhir:password")
} )

nconf.getBool = (key) => {
  return fhirConfig.checkBoolean( nconf.get(key) )
}

nconf.fhirAxios = fhirAxios
nconf.loadRemote = async() => {
  let remoteConfigs = nconf.get('config')
  if ( remoteConfigs ) {
    let configKeys = Object.keys( remoteConfigs )
    let publicKeys = Object.values( nconf.get("keys") )
    for( let conf of configKeys ) {
      try {
        let response = await fhirAxios.read( "Parameters", remoteConfigs[conf] )
        let newConfig = fhirConfig.parseRemote( response, publicKeys, nconf.getBool("security:disabled") )
        nconf.add( conf, { type: 'literal', store: newConfig } )
      } catch(err) {
        console.error( "Unable to retrieve configuration Parameters "+remoteConfigs[conf]+" from FHIR server ("+nconf.get("fhir:base")+")" )
        console.error( err.message )
        process.exit(1)
      } 
    }
  }
}


module.exports = nconf
