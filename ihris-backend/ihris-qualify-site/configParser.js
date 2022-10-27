const fs = require('fs')
module.exports = function(file) {
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
    logger.warn( "Invalid profile for configuration file: " + file )
  }
  return defaults
}