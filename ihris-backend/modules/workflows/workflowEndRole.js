const ihrissmartrequire = require("ihrissmartrequire")
const moment = require("moment")
const nconf = ihrissmartrequire('modules/config')
const winston = require('winston')
const fhirQuestionnaire = ihrissmartrequire('modules/fhir/fhirQuestionnaire')
const fhirAxios = nconf.fhirAxios

const workflowDiscipline = {
  process: ( req ) => {
    return new Promise( (resolve, reject) => {
      fhirQuestionnaire.processQuestionnaire( req.body ).then(async(bundle) => {
        fhirAxios.read("PractitionerRole", req.query.practitionerrole).then((role) => {
          let end = bundle.entry[0].resource.period.end
          let reason = bundle.entry[0].resource.extension.find((ext) => {
            return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-reason-departure"
          })
          if(moment(role.period.start).isAfter(end)) {
            return reject({message: "End date is before start date of the position"})
          }
          role.period.end = end
          let reasonIndex = role.extension.findIndex((ext) => {
            return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-reason-departure"
          })
          if(reasonIndex === -1) {
            reasonIndex = role.extension.length
          }
          role.extension[reasonIndex] = reason
          bundle.entry[0].resource = role
          bundle.entry[0].request.method = "PUT"
          bundle.entry[0].request.url = "PractitionerRole/" + req.query.practitionerrole
          return resolve(bundle)
        }).catch((err) => {
          console.log(err);
          return reject({message: "internal error has occured"})
        })
      })
    } )
  },
  postProcess: ( req, results ) => {
    return new Promise((resolve, reject) => {
      if ( !req.body.meta ) req.body.meta = {}
      if ( !req.body.meta.tag ) req.body.meta.tag = []
      req.body.meta.tag.push({ system: "http://ihris.org/fhir/tags/resource", code: results.entry[0].response.location })
      resolve( req )
    })
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
 
module.exports = workflowDiscipline
