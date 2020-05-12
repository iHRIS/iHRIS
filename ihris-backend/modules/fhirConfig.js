const fs = require('fs')

const fhirConfig = {
  parseFile: ( file ) => {
    let configString = fs.readFileSync( file )
    return fhirConfig.parseString( configString )
  },
  parseString: ( configString ) => {
    let config = JSON.parse( configString )
    return fhirConfig.parse( config )
  },
  parse: ( config ) => {

    let defaults = {}
    for ( let param of config.parameter ) {
      if( param.hasOwnProperty("valueString") ) {
        defaults[param.name] = param.valueString
      } else if ( param.hasOwnProperty("part") ) {
        for ( let part of param.part ) {
          if( part.hasOwnProperty("valueString") ) {
            defaults[param.name+":"+part.name] = part.valueString
          }
        }
      }
    }

    return defaults
  }
}

module.exports = fhirConfig
