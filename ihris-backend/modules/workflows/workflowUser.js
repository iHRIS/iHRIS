const winston = require('winston')
const crypto = require("crypto");
const ihrissmartrequire = require("ihrissmartrequire")
const fhirQuestionnaire = ihrissmartrequire('modules/fhir/fhirQuestionnaire')
const user = ihrissmartrequire('modules/user')

const workflowUser = {
  process: ( req ) => {
    return new Promise( (resolve, reject) => {
      fhirQuestionnaire.processQuestionnaire(req.body).then(async(bundle) => {
        let person = bundle.entry[0].resource
        let userEmail = person.telecom.find((tel) => {
          return tel.system === 'email'
        }).value
        let initialPassword = person.extension.find((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/initial-password'
        })
        let cInitialPassword = person.extension.find((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/confirm-initial-password'
        })
        if(initialPassword && cInitialPassword && initialPassword.valueString !== cInitialPassword.valueString ) {
          return reject({message: "Password missmatch"})
        }
        await user.lookupByEmail(userEmail).then((userObj) => {
          if(userObj) {
            if(req.query.editing) {
              let editingResources = JSON.parse(req.query.editingResources)
              if(editingResources[0].id !== userObj.resource.id) {
                return reject({message: "User exists into the system"})
              }
            } else {
              return reject({message: "User exists into the system"})
            }
          }
        })
        let salt = crypto.randomBytes(16).toString('hex')
        let hash = crypto.pbkdf2Sync( initialPassword.valueString, salt, 1000, 64, 'sha512' ).toString('hex')
        if(!person.extension) {
          person.extension = []
        }
        let passwdIndex = person.extension.findIndex((ext) => {
          return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password"
        })
        if(passwdIndex === -1) {
          passwdIndex = person.extension.length
        }
        person.extension[passwdIndex] = {
          url: "http://ihris.org/fhir/StructureDefinition/ihris-password",
          extension: [{
            url: "password",
            valueString: hash
          }, {
            url: "salt",
            valueString: salt
          }, {
            url: "passwordChanged",
            valueBoolean: false
          }]
        }
        let iniPassInd = person.extension.findIndex((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/initial-password'
        })
        if(iniPassInd) {
          person.extension.splice(iniPassInd, 1)
        }
        let cIniPassInd = person.extension.findIndex((ext) => {
          return ext.url === 'http://ihris.org/fhir/StructureDefinition/confirm-initial-password'
        })
        if(cIniPassInd) {
          person.extension.splice(cIniPassInd, 1)
        }
        return resolve(bundle)
      })
    } )
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
 
module.exports = workflowUser
