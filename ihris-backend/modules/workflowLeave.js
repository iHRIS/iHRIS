const nconf = require('./config')
const winston = require('winston')
const differenceInBusinessDays = require('date-fns/differenceInBusinessDays')
const fhirAxios = nconf.fhirAxios

const workflowLeave = {
  process: ( req ) => {
    return new Promise( (resolve, reject) => {
      let bundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: []
      }
      winston.info(JSON.stringify( req.body,null,2))
      fhirAxios.read( "Practitioner", req.query.practitioner ).then( (resource) => {
        if ( req.body && req.body.item 
          && req.body.item && req.body.item[0].linkId === "Basic"
          && req.body.item[0].item && req.body.item[0].item[0].linkId === "Basic.extension[0].extension[0]" 
          && req.body.item[0].item[0].answer && req.body.item[0].item[0].answer[0] 
          && req.body.item[0].item[0].answer[0].valueCoding) {
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
                && req.body.item[0].item[0].answer[0].valueCoding){
                complexExt.push({ url: "leave-type",
                valueCoding:req.body.item[0].item[0].answer[0].valueCoding })
            }
            if ( (req.body.item[0].item[1].linkId === "Basic.extension[0].extension[1]" 
                && req.body.item[0].item[1].answer 
                && req.body.item[0].item[1].answer[0] 
                && req.body.item[0].item[1].answer[0].valueDate)||(
                req.body.item[0].item[2].linkId === "Basic.extension[0].extension[2]" 
                && req.body.item[0].item[2].answer 
                && req.body.item[0].item[2].answer[0] 
                && req.body.item[0].item[2].answer[0].valueDate
                )){
                complexExt.push({ url: "period",
                valuePeriod:{ start:req.body.item[0].item[1].answer[0].valueDate,
                              end:req.body.item[0].item[2].answer[0].valueDate}
                             })
                let requestedDays = differenceInBusinessDays(new Date(req.body.item[0].item[2].answer[0].valueDate),new Date(req.body.item[0].item[1].answer[0].valueDate))
                complexExt.push({ url: "daysRequested",
                valueInteger:requestedDays})
            }
            /*if ( req.body.item[0].item[3].linkId === "Basic.extension[0].extension[3]" 
                && req.body.item[0].item[3].answer 
                && req.body.item[0].item[3].answer[0] 
                && req.body.item[0].item[3].answer[0].valueInteger){
                complexExt.push({ url: "daysRequested",
                valueInteger:req.body.item[0].item[3].answer[0].valueInteger })
                winston.info(JSON.stringify(complexExt,null,2))
            } */
            if ( req.body.item[0].item[3].linkId === "Basic.extension[0].extension[4]" 
                && req.body.item[0].item[3].answer 
                && req.body.item[0].item[3].answer[0] 
                && req.body.item[0].item[3].answer[0].valueDate){
                complexExt.push({ url: "dateRequested",
                valueDate:req.body.item[0].item[3].answer[0].valueDate })
            }
            if(complexExt){
                extensions.push({ url: "http://ihris.org/fhir/StructureDefinition/ihris-leave",
                extension: complexExt})
            }
          let newLeave = {
            resourceType: "Basic",
            meta: {
              profile: [ "http://ihris.org/fhir/StructureDefinition/ihris-basic-leave" ]
            },
            extension: extensions,
          }

          bundle.entry.push( {
            resource: newLeave,
            request: {
              method: "POST",
              url: "Basic"
            }
          } )
          resolve( bundle )
        } else {
          reject("Invalid input")
        }
      } ).catch( (err) => {
        winston.error(err)
        reject(err)
      } )
    } )
  }
}
 
module.exports = workflowLeave
