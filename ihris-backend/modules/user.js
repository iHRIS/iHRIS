const nconf = require('./config')
const fhirAxios = nconf.fhirAxios
const crypto = require('crypto')

const user = {
  lookup: ( query ) => {
    return new Promise( (resolve, reject) => {
      fhirAxios.search( "Person", query ).then( (response) => {
        if ( response.total === 0 ) {
          resolve( false )
        } else if ( response.total > 1 ) {
          resolve( false )
        } else {
          resolve( new User( response.entry[0].resource ) )
        }
      } ).catch( (err) => {
        console.error(err)
        reject( err )
      } )
    } )
  },
  lookupByEmail: ( email ) => {
    return user.lookup( { telecom: "email|" + email } )
  },
  lookupByProvider: ( provider, id ) => {
    return user.lookup( { identifier: provider + "|" + id } )
  },
  find: ( id ) => {
    return new Promise( (resolve, reject) => {
      fhirAxios.read( "Person", id ).then( (response) => {
        resolve( new User( response ) )
      } ).catch( (err) => {
        console.error(err)
        reject( err )
      } )
    } )
  },
  hashPassword: ( password, salt ) => {
    if ( !salt ) {
      salt = crypto.randomBytes(16).toString('hex')
    }
    let hash = crypto.pbkdf2Sync( password, salt, 1000, 64, 'sha512' ).toString('hex')
    return { hash: hash, salt: salt }
  }
}

class User {

  constructor( resource ) {
    this.resource = resource
  }

  checkPassword( password ) {
    let details = this.resource.extension.find( ext => 
      ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password" )
    if ( !details ) {
      console.error( "Password details don't exist in user "+this.resource.id )
      return false
    }
    let hash = details.extension.find( ext => ext.url === "password" )
    let salt = details.extension.find( ext => ext.url === "salt" )
    if ( !hash || !hash.valueString || !salt || !salt.valueString ) {
      console.error( "Hash or salt doesn't exist in user "+this.resource.id )
      return false
    }
    let compare = user.hashPassword( password, salt.valueString )
    if ( compare.hash === hash.valueString ) {
      return true
    } else {
      return false
    }
  }

  update() {
    return fhirAxios.update( this.resource )
  }

}


module.exports = user
