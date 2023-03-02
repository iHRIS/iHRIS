const http = require('http')
const axios = require('axios')
const nconf = require('nconf')
const fs = require('fs')
const URI = require('urijs');
const Fhir = require('fhir').Fhir

http.globalAgent.maxSockets = 8

nconf.argv()

const convert = new Fhir()
const server = nconf.get('server')
const save = nconf.get("save")

if ( !server ) {
    console.log("invalid arguments")
    process.exit(0)
}

const resourceSave = (fhir) => {
  let dest = URI(server).toString()
  axios.post( dest, fhir ).then( ( res ) => {
    console.log( dest+": "+ res.status )
    console.log( res.headers['content-location'] )
  } ).catch( (err) => {
    console.error(err)
    console.error(JSON.stringify(err.response.data,null,2))
  } )
}

const processPractitionerRole = async (dest, roles) => {
  try {
    console.log("Getting PractitionerRole..")
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      let roleDel = {
        request: {
          method: "DELETE",
          url: "PractitionerRole/"+entry.resource.id
        }
      }
      roles.push( roleDel )
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processPractitionerRole(next.url, roles)
    }
    console.log("Done Getting PractitionerRole..")
  } catch (err) {
    console.log("FAILED TO GET PractitionerRole",err)
  }
}
const processPractitioner = async (dest, pracs) => {
  try {
    console.log("Getting Practitioner..")
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      let pracsDel = {
        request: {
          method: "DELETE",
          url: "Practitioner/"+entry.resource.id
        }
      }
      pracs.push( pracsDel )
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processPractitioner(next.url, pracs)
    }
    console.log("Done Getting Practitioner..")
  } catch (err) {
    console.log("FAILED TO GET Practitioner",err)
  }
}
const processBasic = async (dest, basics) => {
  try {
    console.log("Getting Basic..")
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      if ( entry.resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference" ) ) {
        let basicDel = {
          request: {
            method: "DELETE",
            url: "Basic/"+entry.resource.id
          }
        }
        basics.push( basicDel )
      }
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processBasic(next.url, basics)
    }
    console.log("Done Getting Basic..")
  } catch (err) {
    console.log("FAILED TO GET Basic",err)
  }
}

const processQuestionnaire = async (dest, questions) => {
  try {
    console.log("Getting QuestionnaireResponse..")
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      if(entry.resource.subject){
        //console.log(JSON.stringify(entry.resource.subject.reference,null,2))
        if (entry.resource.subject.reference.includes("Practitioner")){
          let basicQN = {
            request: {
              method: "DELETE",
              url: "QuestionnaireResponse/"+entry.resource.id
            }
          }
          questions.push( basicQN )
        }
      }
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processQuestionnaire(next.url, questions)
    }
    console.log("Done Getting QuestionnaireResponse..")
  } catch (err) {
    console.log("FAILED TO GET Questionnaire",err)
  }
}

const processAudit = async (dest, audits) => {
  try {
    console.log("Getting AuditEvents..")
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    
    for( let entry of bundle.entry ) {
      if(entry.resource.entity){
        if(entry.resource.entity[0].what){
          let reference = entry.resource.entity[0].what.reference
          if (reference.includes("Practitioner") || reference.includes("QuestionnaireResponse") || reference.includes("Basic")){
            let basicAudit = {
              request: {
                method: "DELETE",
                url: "AuditEvent/"+entry.resource.id
              }
            }
            audits.push( basicAudit )
          }
        }
      }
      
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processAudit(next.url, audits)
    }
    console.log("Done Getting AuditEvents..")

  } catch (err) {
    console.log("FAILED TO GET Audits",err)
  }
}

const saveBundle = async(entries) => {
  let bundle = {
    resourceType: "Bundle",
    type: "transaction",
    entry: entries
  }
  if ( save ) {
    console.log("Saving  Bundle")
    resourceSave( bundle )
  } else {
    console.log(JSON.stringify(bundle,null,2))
  }
}
const start = async() => {
 let deleteFunctions = ["AuditEvent","QuestionnaireResponse","Basic","PractitionerRole","Practitioner"]
 //let entries = []
 for(let func of deleteFunctions) {
  let delEntries = []
  let Lookup = URI(server).segment(func).toString()
  let runProcess = "process"+func
  await runProcess( auditLookup, audits )
  await saveBundle(audits)
  if (func == "Audit" ){
    //Deleting AuditEvent Resources
    let audits = []
    let auditLookup = URI(server).segment("AuditEvent").toString()
    await processAuditEvent( auditLookup, audits )
    await saveBundle(audits)
  } else if (func == "QuestionnaireResponse" ) {
    //Deleting QuestionnaireResponse Resources
    let questions = []
    let questionLookup = URI(server).segment("QuestionnaireResponse").toString()
    await processQuestionnaire( questionLookup, questions )
    await saveBundle(questions)
  } else if (func == "Basic" ) {
    //Deleting Basic Resources
    let basics = []
    let basicLookup = URI(server).segment("Basic").toString()
    await processBasic( basicLookup, basics )
    await saveBundle(basics)
  } else if (func == "PractitionerRole" ) {
    //Deleting PractitionerRole Resources
    let roles = []
    let roleLookup = URI(server).segment("PractitionerRole").toString()
    await processPractitionerRole( roleLookup, roles )
    await saveBundle(roles)
  } else if (func == "Practitioner" ) {
    //Deleting Practitioner Resources
    let pracs = []
    let pracLookup = URI(server).segment("Practitioner").toString()
    await processPractitioner( pracLookup, pracs )
    await saveBundle(pracs)
  } else {

  }
 } 
 
 
}

start()


