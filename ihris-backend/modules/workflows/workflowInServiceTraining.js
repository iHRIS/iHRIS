const nconf = require('../config')
const winston = require('winston')
const fhirAxios = nconf.fhirAxios

const workflowInServiceTraining = {
  process: ( req ) => {
    return new Promise( (resolve, reject) => {
      let bundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: []
      }
      fhirAxios.read( "Practitioner", req.query.practitioner ).then( (resource) => {
        if ( req.body && req.body.item 
          && req.body.item && req.body.item[0].linkId === "Basic"
          && req.body.item[0].item && req.body.item[0].item[0].linkId === "Basic.extension[0].extension[0]" 
          && req.body.item[0].item[0].answer && req.body.item[0].item[0].answer[0]) {
            if ( req.query.practitioner ) {
              req.body.subject = { reference: "Practitioner/" +req.query.practitioner }
            }
            let extensions = []
            if ( resource.resourceType === "Practitioner") {
                extensions.push({ url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
                valueReference: { reference: "Practitioner/" +req.query.practitioner}
             })
            }

            let complexExt = []
            if ( req.body.item[0].item[0].linkId === "Basic.extension[0].extension[0]" 
                && req.body.item[0].item[0].answer 
                && req.body.item[0].item[0].answer[0] 
                && req.body.item[0].item[0].answer[0].valueString){
                complexExt.push({ url: "provider",
                valueString: req.body.item[0].item[0].answer[0].valueString })
            }
            if (
              req.body.item[0].item[1].linkId ===
              "Basic.extension[0].extension[1]" &&
              req.body.item[0].item[1].answer &&
              req.body.item[0].item[1].answer[0] &&
              req.body.item[0].item[1].answer[0].valueCoding
          ) {
            complexExt.push({
              url: "training",
              valueCoding: req.body.item[0].item[1].answer[0].valueCoding,
            });
          }
            if ( req.body.item[0].item[2].linkId === "Basic.extension[0].extension[2]" 
                && req.body.item[0].item[2].answer 
                && req.body.item[0].item[2].answer[0] 
                && req.body.item[0].item[2].answer[0].valueString){
                complexExt.push({ url: "courseName",
                valueString: req.body.item[0].item[2].answer[0].valueString })
            }
            if ( req.body.item[0].item[3].linkId === "Basic.extension[0].extension[3]" 
                && req.body.item[0].item[3].answer 
                && req.body.item[0].item[3].answer[0] 
                && req.body.item[0].item[3].answer[0].valueInteger){
                complexExt.push({ url: "credits",
                valueInteger: req.body.item[0].item[3].answer[0].valueInteger })
            }
            if ( req.body.item[0].item[4].linkId === "Basic.extension[0].extension[4]" 
                && req.body.item[0].item[4].answer 
                && req.body.item[0].item[4].answer[0] 
                && req.body.item[0].item[4].answer[0].valueDate){
                complexExt.push({ url: "startDate",
                valueDate:req.body.item[0].item[4].answer[0].valueDate })
            }
            if ( req.body.item[0].item[5].linkId === "Basic.extension[0].extension[5]" 
                && req.body.item[0].item[5].answer 
                && req.body.item[0].item[5].answer[0] 
                && req.body.item[0].item[5].answer[0].valueDate){
                complexExt.push({ url: "endDate",
                valueDate:req.body.item[0].item[5].answer[0].valueDate })
            }
            if(complexExt){
                extensions.push({ url: "http://ihris.org/fhir/StructureDefinition/ihris-inservice-training",
                extension: complexExt})
            }
          let newInServiceTraining = {
            resourceType: "Basic",
            meta: {
              profile: [ "http://ihris.org/fhir/StructureDefinition/ihris-basic-inservice-training" ]
            },
            extension: extensions,
          }

          bundle.entry.push( {
            resource: newInServiceTraining,
            request: {
              method: "POST",
              url: "Basic"
            }
          } )
          resolve( bundle )
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
 
module.exports = workflowInServiceTraining
