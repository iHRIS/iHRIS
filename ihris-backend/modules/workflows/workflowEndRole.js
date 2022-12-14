const nconf = require('../config')
const winston = require('winston')
const fhirAxios = nconf.fhirAxios

const workflowEndRole = {
  process: ( req ) => {
    return new Promise( async (resolve, reject) => {
      let bundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: []
      }
      //winston.info(JSON.stringify( req.body,null,2))
      fhirAxios.read( "PractitionerRole", req.query.practitioner ).then( (resource) => {
      try {
        if (resource){
          if ( req.body && req.body.item 
            && req.body.item && req.body.item[0].linkId === "PractitionerRole"
            && req.body.item[0].item && req.body.item[0].item[0].linkId === "period.end" 
            && req.body.item[0].item[0].answer && req.body.item[0].item[0].answer[0] 
            && req.body.item[0].item[0].answer[0].valueDate
            && req.body.item[0].item[1].linkId === "departure" 
            && req.body.item[0].item[1].answer && req.body.item[0].item[1].answer[0] 
            && req.body.item[0].item[1].answer[0].valueCoding ) {
              let reason = { url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-reason-departure",
                          valueCoding: req.body.item[0].item[1].answer[0].valueCoding }
              resource.extension.push(reason)
              let positionStatus = {url:"http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-position-status",
                          valueCoding: req.body.item[0].item[2].answer[0].valueCoding }
              resource.extension.push(positionStatus)
              resource.period.end = req.body.item[0].item[0].answer[0].valueDate
              resource.active = false
         
              //console.log("Resource ",resource.practitioner.reference)
              if ( req.query.practitioner ) {
                req.body.subject = { reference: "Practitioner/" +req.query.practitioner }
              }
              let extensions = []
              if ( resource.resourceType === "Practitioner") {
                  extensions.push({ url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
                  valueReference: { reference: "Practitioner/" +req.query.practitioner}
               })
              }

              let practitioner = await fhirAxios.read(
                "Practitioner",
                resource.practitioner.reference.replace("Practitioner/", "")
              );
              practitioner.active = false;

              bundle.entry.push( { 
                resource: resource,
                request: {
                  method: "PUT",
                  url: resource.resourceType +"/"+ resource.id
                }
              })
              
              bundle.entry.push({
                resource: practitioner,
                request: {
                  method: "PUT",
                  url: practitioner.resourceType + "/" + practitioner.id,
                },
              });
              resolve( bundle )
            } else {
              winston.info("No Position End Date or Reason For Depature")
              resolve(await workflowEndRole.outcome("Position End date or Reason for Depature not provided"))
            }
        } else{
          winston.info("No Position")
          resolve(await workflowEndRole.outcome("No Position Returned"))
        }
      } catch(err) {
        reject(err)
      }
    }).catch( (err) => {
      winston.error(err.message)
      reject(err)
    } )
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
 
module.exports = workflowEndRole
