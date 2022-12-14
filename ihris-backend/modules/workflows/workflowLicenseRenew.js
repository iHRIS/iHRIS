const nconf = require('../config')
const winston = require('winston')
const fhirAxios = nconf.fhirAxios

const workflowLicenseRenew = {
  process: ( req ) => {
    return new Promise( async (resolve, reject) => {
      let bundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: []
      }
      await fhirAxios.read( "Practitioner", req.query.practitioner ).then( async (resource) => {
        if ( req.body && req.body.item 
          && req.body.item && req.body.item[0].linkId === "Basic"
          && req.body.item[0].item && req.body.item[0].item[0].linkId === "Basic.extension[0].extension[0]" 
          && req.body.item[0].item[0].answer && req.body.item[0].item[0].answer[0]) {
            if ( req.query.practitioner ) {
              req.body.subject = { reference: "Practitioner/" +req.query.practitioner }
            }
            let oldLicense = await fhirAxios.search("Basic",{ profile: "http://ihris.org/fhir/StructureDefinition/ihris-basic-license" , practitioner: "Practitioner/" +req.query.practitioner })
            if (oldLicense.entry) {
              let oldLicenseID = oldLicense.entry[0].resource.id
              let resource = oldLicense.entry[0].resource
              if ( req.body.item[0].item[1].linkId === "startDate" 
                && req.body.item[0].item[1].answer 
                && req.body.item[0].item[1].answer[0] 
                && req.body.item[0].item[1].answer[0].valueDate){
                resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-license").extension.find(complexExt => complexExt.url === "startDate" ).valueDate = req.body.item[0].item[1].answer[0].valueDate
              }
              if ( req.body.item[0].item[2].linkId === "endDate" 
              && req.body.item[0].item[2].answer 
              && req.body.item[0].item[2].answer[0] 
              && req.body.item[0].item[2].answer[0].valueDate){
               resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-license").extension.find(complexExt => complexExt.url === "endDate" ).valueDate = req.body.item[0].item[2].answer[0].valueDate
              } 
              if ( req.body.item[0].item[3].linkId === "serialNumber" 
                && req.body.item[0].item[3].answer 
                && req.body.item[0].item[3].answer[0] 
                && req.body.item[0].item[3].answer[0].valueString){
                resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-license").extension.find(complexExt => complexExt.url === "serialNumber" ).valueString = req.body.item[0].item[3].answer[0].valueString
              }
              bundle.entry.push( {
                resource: resource,
                request: {
                  method: "PUT",
                  url: "Basic/"+ oldLicenseID
                }
              } )
              resolve( bundle )
            } else {
              resolve(workflowLicenseRenew.outcome("No Old License Found. Use add new License section"))
            }
        } 
      } )
    } )
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
 
module.exports = workflowLicenseRenew
