const crypto = require('crypto')
const requireFromString = require('require-from-string')
const nconf = require('./config')
const fhirAxios = nconf.fhirAxios

const fhirModules = {
  require: (mod, skipSecurity) => {
    return new Promise( (resolve, reject) => {
      fhirAxios.read( "Library", mod ).then( (library) => {
        let sign = library.content[0].data
        let module64 = Buffer.from( library.content[1].data, 'base64' )
        let module = module64.toString('utf8')


        let moduleAccepted = false

        if ( skipSecurity ) {
          console.log("SKIPPING SECURITY CHECK ON REMOTE MODULE:",mod,". This should only be done in development.")
          moduleAccepted = true
        } else {
          let verifier = crypto.createVerify( 'sha256' )
          verifier.update( module )

          let publicKeys = Object.values( nconf.get("keys") )
          for( let key of publicKeys ) {
            if ( verifier.verify( key, sign, 'base64' ) ) {
              moduleAccepted = true
              break
            }
          }
        }

        if ( moduleAccepted ) {
          resolve( requireFromString( module, library.name ) )
        } else {
          console.log("No valid keys for "+mod)
          reject( null )
        }

      } ).catch( (err) => {
        reject( err )
      } )
    } )
  }
}

module.exports = fhirModules
