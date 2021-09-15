const winston = require('winston');
const nconf = require('./modules/config')

let runEnv = process.env.NODE_ENV || "production"
let logOpts = nconf.get("logs:"+runEnv)
if ( !logOpts ) {
  winston.add( new winston.transports.Console( {
    level: "error",
    format: winston.format.combine( winston.format.errors({stack:true}), winston.format.prettyPrint() )
  } ) )
} else {
  for( let transport of Object.keys(logOpts) ) {
    if ( transport === "console" ) {
      winston.add( new winston.transports.Console( {
        level: logOpts[transport].level || "error",
        format: winston.format.combine( winston.format.errors({stack:true}), winston.format.prettyPrint() )
      } ) )
    } else if ( transport === "file" ) {
      for( let type of Object.keys(logOpts[transport]) ) {
        if ( !logOpts[transport][type].file ) {
          console.log("Logging by file for "+type+" config needs a file set.")
        } else {
          winston.add( new winston.transports.File( {
            level: logOpts[transport][type].level || "error",
            filename: logOpts[transport][type].file
          } ) )
        }
      }
    }
  }
}

winston.verbose(nconf.get())
module.exports = winston