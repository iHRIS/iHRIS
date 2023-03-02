const csv = require('csv-parser')
const fs = require('fs')
const nconf = require('nconf')

nconf.argv()

const input = nconf.get('input')
const prefix = 'http://ihris.org/fhir/'


let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: []
}

const entryTemplate = {
  resource: {
    resourceType: "Location",
    meta: {
      profile: [
        "http://ihe.net/fhir/StructureDefinition/IHE_mCSD_Location",
        "http://ihris.org/fhir/StructureDefinition/ihris-jurisdiction"
      ]
    },
    id: "",
    name: "",
    status: "active",
    partOf: { reference: "Location/" },
    type: [
      {
        coding: [
          {
            system: "http://ihris.org/fhir/CodeSystem/ihris-jurisdiction",
            code: "subdistrict"
          }
        ],
        text: "Sub District"
      }
    ],
    physicalType: {
      coding: [
        {
          system: "http://hl7.org/fhir/codesystem-location-physical-type.html",
          code: "jdn"
        }
      ],
      text: "Jurisdiction"
    }
  },
  request: {
    method: "PUT",
    url: "Location/"
  }
}

//var waiting = 1
var started = false
//var lookup = { region: {} }

/*for( let list of Object.keys( lookup ) ) {
  fs.createReadStream( input + list + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      lookup[ data.id ] = data.code
    } ).on( 'end', () => {
      waiting--
    } )
}*/


//processJobs()

/*function processJobs() {
  if ( !started && !waiting ) {
    started = true*/
//console.log(lookup)
    fs.createReadStream( input).pipe( csv() )
      .on( 'data', ( data ) => {
        //if ( lookup[data.region] ) {
          let entry = JSON.parse( JSON.stringify( entryTemplate ) )
          //console.log(lookup[data.region] +" "+data.region)
          //let code = lookup[data.region] + "." + data.code
          let regionArray = data.code.split(".")
          let region = regionArray[0] + "." + regionArray[1]
          entry.resource.id = data.code
          entry.resource.name = data.name
          entry.resource.partOf.reference += region
          entry.request.url += data.code
          bundle.entry.push( entry )
       // } else {
       //   console.error("Skipping data outside timor-leste: "+data.region)
       // }

      } )
      .on ( 'end', () => {
        console.log(JSON.stringify(bundle, null, 2 ))
      } )
  /*} else {
    setTimeout( () => processJobs(), 1000 )
  }*/
