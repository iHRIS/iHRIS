const csv = require('csv-parser')
const fs = require('fs')

const input = process.argv[2]
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
        "http://ihe.net/fhir/StructureDefinition/IHE_mCSD_Location"
      ]
    },
    id: "",
    name: "",
    status: "active",
    identifier: [
      {
        use: "official",
        system: "urn:iso:std:iso:3166",
        value: ""
      }
    ],
    type: [
      {
        coding: [
          {
            system: "http://ihris.org/fhir/CodeSystem/ihris-jurisdiction",
            code: "country"
          }
        ],
        text: "Country"
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
    entry.resource.id = data.alpha_two
    entry.resource.name = data.name
    entry.resource.identifier[0].value = data.alpha_two
    entry.request.url += data.alpha_two
    bundle.entry.push( entry )
  } )
  .on ( 'end', () => {
    console.log(JSON.stringify(bundle, null, 2 ))
  } )
