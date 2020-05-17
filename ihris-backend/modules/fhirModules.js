const fs = require('fs')
const crypto = require('crypto')
const nconf = require('./config')
const requireFromString = require('require-from-string')

const fhirModules = {
  require: () => {
    const libraryString = fs.readFileSync( "/files/iHRIS.V/iHRIS-5/ihris-backend/Library-test-module.json" )
    let library = JSON.parse( libraryString )
    let sign = library.content[0].data
    let module64 = Buffer.from( library.content[1].data, 'base64' )
    let module = module64.toString('ascii')
    let publicKeys = Object.values( nconf.get("keys") )
    let verifier = crypto.createVerify( 'sha256' )
    console.log(module)

    verifier.update( module )

    let moduleAccepted = false
    for( let key of publicKeys ) {
      if ( verifier.verify( key, sign, 'base64' ) ) {
        moduleAccepted = true
        break
      }
    }

    if ( moduleAccepted ) {
      return requireFromString( module, library.name )
    }

  }
}

module.exports = fhirModules
