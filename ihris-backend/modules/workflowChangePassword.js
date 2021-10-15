const nconf = require('./config')
const user = require('./user').user
const winston = require('winston')
const crypto = require('crypto')
const fhirAxios = nconf.fhirAxios

const PASS_EXTENSION = "http://ihris.org/fhir/StructureDefinition/ihris-password"

const workflowChangePassword = {
  process: ( req ) => {
    return new Promise( async (resolve, reject) => {
      try {
        let bundle = {
          resourceType: "Bundle",
          type: "transaction",
          entry: []
        }
        let oldpassword = req.body.item[0].item[0].answer[0].valueString
        try {
          let details = req.user.resource.extension.find( ext => 
            ext.url === PASS_EXTENSION )
          if ( !details ) {
            winston.error( "Password details don't exist in user "+req.user.resource.name.text )
            resolve(await workflowChangePassword.outcome("Password details don't exist in user "+req.user.resource.name.text))
          }
          let hash = details.extension.find( ext => ext.url === "password" )
          let salt = details.extension.find( ext => ext.url === "salt" )
          if ( !hash || !hash.valueString || !salt || !salt.valueString ) {
            winston.error( "Hash or salt doesn't exist in user "+req.user.resource.name.text )
            resolve(await workflowChangePassword.outcome("Hash or salt doesn't exist in user "+req.user.resource.name.text))
          }
          let compare = await workflowChangePassword.hashPassword( oldpassword, salt.valueString )
          if ( compare.hash !== hash.valueString ) {
            resolve(await workflowChangePassword.outcome("Old Password doesn't match password on record for user "+req.user.resource.name.text))
          }
        } catch (err) {
          winston.error(err.message)
          resolve(await workflowChangePassword.outcome(err.message))
        }
        try {
          //winston.error(JSON.stringify(req.user))
          let userObj = req.user.resource
          userResource = await fhirAxios.search("Person", { _id: userObj.id })
          if ( userResource.total === 0 ) {
            winston.error("Could not change password - No User Found" )
            resolve(await workflowChangePassword.outcome("Could not change password - No User Found"))
          } else if ( userResource.total > 1 ) {
            winston.error("Too many users found" )
            resolve(await workflowChangePassword.outcome("Too many users found"))
          } else {
            let userObj = userResource.entry[0].resource
            try {
              let passwordExt = []
              let password = req.body.item[0].item[1].answer[0].valueString
              let salt = crypto.randomBytes(16).toString('hex')
              let hash = crypto.pbkdf2Sync( password, salt, 1000, 64, 'sha512' ).toString('hex')

              passwordExt.push({ url:"password",
                        valueString: hash
                        })
              passwordExt.push({ url:"salt",
                        valueString: salt
                        })
              let extension = { url: PASS_EXTENSION,
                                extension : passwordExt
                              }
                              
              let arrayIndex = userObj.extension.findIndex(ext => ext.url === PASS_EXTENSION)
              userObj.extension.splice(arrayIndex,1, extension)
              
              let url = "Person/"+userObj.id
              bundle.entry.push({
                resource: userObj,
                request: {
                  method: "PUT",
                  url: url
                }
              })
              resolve(bundle )
            } catch (err) {
              winston.error(err.message)
                winston.error("Error Setting New Password")
                resolve(await workflowChangePassword.outcome("Error Setting New Password"))
            }
          }
        } catch (err) {
          winston.error(err.message)
          winston.error("Error Getting User resource")
          resolve(await workflowChangePassword.outcome("Error Getting User's resource"))
        }   
      } catch (err){
        winston.error(err.message)
        resolve(await workflowChangePassword.outcome(err.message))
      }
    })
  },
  postProcess: ( req, results ) => {
    return new Promise( (resolve, reject) => {
        if ( results.entry && results.entry.length > 0 && results.entry[0].response.location ) {
          if ( !req.body.meta ) req.body.meta = {}
          if ( !req.body.meta.tag ) req.body.meta.tag = []
          req.body.meta.tag.push( { system: "http://ihris.org/fhir/tags/resource", code: results.entry[0].response.location } )
          resolve( req )
        }
    })
  },
  hashPassword: ( password, salt ) => {
    if ( !salt ) {
      salt = crypto.randomBytes(16).toString('hex')
    }
    let hash = crypto.pbkdf2Sync( password, salt, 1000, 64, 'sha512' ).toString('hex')
    return { hash: hash, salt: salt }
  },
  outcome: (message) => {
    return new Promise ((resolve, reject ) => {
      let outcomeBundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [{
          resource:{
            resourceType: "OperationOutcome",
            issue: [
            {
              severity: "error",
              code: "exception",
              diagnostics: message
            }]
          },
          request: {
            method: "POST",
            url: "OperationOutcome"
          }
        }]
      }
      winston.info(JSON.stringify(outcomeBundle,null,2))
      resolve(outcomeBundle)
    })
  }
}
module.exports = workflowChangePassword