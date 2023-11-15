const http = require('http')
const axios = require('axios')
const nconf = require('nconf')
const fs = require('fs')
const URI = require('urijs');
const Fhir = require('fhir').Fhir

http.globalAgent.maxSockets = 8

//NOTE: Only use this script if you do not have any resources linked/referencing the locations like Practitioner, Practitionerrole... etc

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

const processLocation = async (dest, roles) => {
  try {
    console.log("Getting Location..")
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    for( let entry of bundle.entry ) {
      let locDel = {
        request: {
          method: "DELETE",
          url: "Location/"+entry.resource.id
        }
      }
      roles.push( locDel )
    }

    let next = bundle.link.find( link => link.relation === "next" )
    if ( next && next.url ) {
      await processLocation(next.url, roles)
    }
    console.log("Done Getting Location..")
  } catch (err) {
    console.log("FAILED TO GET Location",err)
  }
}

const processAuditEvent = async (dest, audits) => {
  try {
    console.log("Getting AuditEvents..")
    let results = await axios.get(dest, { _count: 100 } )
    let bundle = results.data
    
    for( let entry of bundle.entry ) {
      if(entry.resource.entity){
        if(entry.resource.entity[0].what){
          let reference = entry.resource.entity[0].what.reference
          if (reference.includes("Location")){
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
      await processAuditEvent(next.url, audits)
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
 let deleteFunctions = ["Location"]
 //let entries = []
 for(let func of deleteFunctions) {
  /*let delEntries = []
  let Lookup = URI(server).segment(func).toString()
  let runProcess = "process"+func
  await runProcess( auditLookup, audits )
  await saveBundle(audits)*/
  if (func == "Audit" ){
    //Deleting AuditEvent Resources
    let audits = []
    let auditLookup = URI(server).segment("AuditEvent").toString()
    await processAuditEvent( auditLookup, audits )
    await saveBundle(audits)
  } else if (func == "Location" ) {
    //Deleting Location Resources
    let locations = []
    let locationLookup = URI(server).segment("Location").toString()
    await processLocation( locationLookup, locations )
    await saveBundle(locations)
  }  else {

  }
 } 
 
 
}

start()