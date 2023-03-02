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
        "http://ihe.net/fhir/StructureDefinition/IHE.mCSD.Location",
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
            system: "http://ihris.org/fhir/CodeSystem/ihris-jurisdiction-type",
            code: "municipality"
          }
        ],
        text: "Municipality"
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

fs.createReadStream( input ).pipe( csv() )
  .on( 'data', ( data ) => {
    let entry = JSON.parse( JSON.stringify( entryTemplate ) )
    //console.log(JSON.parse(JSON.stringify(data)))
    let country = 'TL'
    entry.resource.id = data.code
    entry.resource.name = data.name
    entry.resource.partOf.reference += country
    entry.request.url += data.code
    bundle.entry.push( entry )
  } )
  .on ( 'end', () => {
    console.log(JSON.stringify(bundle, null, 2 ))
  } )
