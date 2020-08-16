const nconf = require('config')
const fhirAxios = nconf.fhirAxios

const workflowEndRole = {
  process: ( req ) => {
    return new Promise( (resolve, reject) => {
      let bundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: []
      }
      fhirAxios.read( "PractitionerRole", req.query.practitionerrole ).then( (resource) => {
        if ( req.body && req.body.item 
          && req.body.item && req.body.item[0].linkId === "PractitionerRole"
          && req.body.item[0].item && req.body.item[0].item[0].linkId === "period.end" 
          && req.body.item[0].item[0].answer && req.body.item[0].item[0].answer[0] 
          && req.body.item[0].item[0].answer[0].valueDate 
          && req.body.item[0].item[1].linkId === "code" 
          && req.body.item[0].item[1].answer && req.body.item[0].item[1].answer[0] 
          && req.body.item[0].item[1].answer[0].valueCoding ) {

          resource.period.end = req.body.item[0].item[0].answer[0].valueDate
          bundle.entry.push( { 
            resource: resource,
            request: {
              method: "PUT",
              url: resource.resourceType +"/"+ resource.id
            }
          } )
          if ( resource.practitioner && resource.practitioner.reference ) {
            req.body.subject = { reference: resource.practitioner.reference }
          }

          let newRole = {
            resourceType: "PractitionerRole",
            meta: {
              profile: [ resource.meta.profile[0] ]
            },
            practitioner: { reference: resource.practitioner.reference },
            code: [
              { coding: [ req.body.item[0].item[1].answer[0].valueCoding ] }
            ],
            period: { start: req.body.item[0].item[0].answer[0].valueDate },
          }

          bundle.entry.push( {
            resource: newRole,
            request: {
              method: "POST",
              url: "PractitionerRole"
            }
          } )

          resolve( bundle )
        } else {
          reject("Invalid input")
        }
      } ).catch( (err) => {
        reject(err)
      } )
    } )
  }
}
 
module.exports = workflowEndRole
