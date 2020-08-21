const fs = require('fs')
const crypto = require('crypto')
const winston = require('winston')

// Don't allow any settings to these values from a remote config
const invalidRemoteKeys = [ 'fhir', 'config', 'session', 'keys', 
  'logs', 'emnutt', 'elasticsearch', 'reports' ]

const fhirConfig = {
  checkBoolean: (value) => {
    return /^(true|yes|1)$/i.test(value)
  },
  parseFile: ( file ) => {
    let configString = fs.readFileSync( file )
    let config = JSON.parse( configString )

    let defaults = {}
    if ( config.meta && config.meta.profile 
      && config.meta.profile.includes( "http://ihris.org/fhir/StructureDefinition/ihris-parameters-local-config" ) ) {
      for ( let param of config.parameter ) {
        if( param.hasOwnProperty("valueString") ) {
          let split = param.name.split(':')
          let last = split.pop()
          let assign = defaults
          for( let level of split ) {
            if ( !assign.hasOwnProperty( level ) ) {
              assign[level] = {}
            }
            assign = assign[level]
          }
          assign[last] = param.valueString
        } else if ( param.hasOwnProperty("part") ) {
          if ( !defaults.hasOwnProperty( param.name ) ) {
            defaults[param.name] = {}
          }
          for ( let part of param.part ) {
            if( part.hasOwnProperty("valueString") ) {
              //defaults[param.name][part.name] = part.valueString
              let split = part.name.split(':')
              let last = split.pop()
              let assign = defaults[param.name]
              for( let level of split ) {
                if ( !assign.hasOwnProperty( level ) ) {
                  assign[level] = {}
                }
                assign = assign[level]
              }
              assign[last] = part.valueString
            }
          }
        }
      }
    } else {
      winston.warn( "Invalid profile for configuration file: " + file )
    }
    return defaults
  },
  parseRemote: ( config, keys, skipSignature ) => {

    let defaults = {}
    if ( config.meta && config.meta.profile 
      && config.meta.profile.includes( "http://ihris.org/fhir/StructureDefinition/ihris-parameters-remote-config" ) ) {

      let configAccepted = false
      let addconf = config.parameter.find( param => param.name === "config" )

      if ( skipSignature ) {
        winston.warn("SKIPPING SECURITY CHECK ON REMOTE CONFIG:",config.id,". This should only be done in development.")
        configAccepted = true
      } else {
        let sig = config.parameter.find( param => param.name === "signature" )
  
        let verifier = crypto.createVerify( 'sha256' )
        verifier.update( JSON.stringify( addconf.part ) )
  
        for( let key of keys ) {
          if ( verifier.verify( key, sig.valueSignature.data, 'base64' ) ) {
            configAccepted = true
            break
          }
        }
      }

      if ( configAccepted ) {
        for ( let param of addconf.part) {
          if( param.hasOwnProperty("valueString") ) {
            let split = param.name.split(':')
            if ( invalidRemoteKeys.includes( split[0] ) ) {
              winston.warn("Can't override "+split[0]+" from remote config file.")
              continue
            }
            let last = split.pop()
            let assign = defaults
            for( let level of split ) {
              if ( !assign.hasOwnProperty( level ) ) {
                assign[level] = {}
              }
              assign = assign[level]
            }
            assign[last] = param.valueString
          }
        }
      } else {
        winston.warn( "No valid key set for configuration Parameters " + config.id )
      }
    } else {
      winston.warn( "Invalid profile for remote configuration parameters for " + config.id )
    }

    return defaults
  }

}

module.exports = fhirConfig
