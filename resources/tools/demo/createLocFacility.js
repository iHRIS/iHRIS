const csv = require('csv-parser')
const fs = require('fs')

const input = process.argv[2]
const prefix = 'http://ihris.org/fhir/'


let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: []
}

const locTemplate = {
  resource: {
    resourceType: "Location",
    meta: {
      profile: [
        "http://ihe.net/fhir/StructureDefinition/IHE_mCSD_Location",
        "http://ihe.net/fhir/StructureDefinition/IHE_mCSD_FacilityLocation"
      ]
    },
    id: "",
    name: "",
    status: "active",
    partOf: { reference: "Location/" },
    managingOrganization: "Organization/",
    type: [
      {
        coding: [
          {
            system: "urn:ietf:rfc:3986",
            code: "urn:ihe:iti:mcsd:2019:facility"
          }
        ],
        text: "Facility"
      },
      {
        coding: [
          {
            system: "",
            code: ""
          }
        ],
        text: ""
      }
    ],
    physicalType: {
      coding: [
        {
          system: "http://hl7.org/fhir/codesystem-location-physical-type.html",
          code: "bu"
        }
      ],
      text: "Building"
    }
  },
  request: {
    method: "PUT",
    url: "Location/"
  }
}
const orgTemplate = {
  resource: {
    resourceType: "Organization",
    meta: {
      profile: [
        "http://ihe.net/fhir/StructureDefinition/IHE_mCSD_Organization",
        "http://ihe.net/fhir/StructureDefinition/IHE_mCSD_FacilityOrganization"
      ]
    },
    id: "",
    name: "",
    active: true,
    type: [
      {
        coding: [
          {
            system: "urn:ietf:rfc:3986",
            code: "urn:ihe:iti:mcsd:2019:facility"
          }
        ],
        text: "Facility"
      },
      {
        coding: [
          {
            system: "",
            code: ""
          }
        ],
        text: ""
      }
    ]
  },
  request: {
    method: "PUT",
    url: "Organization/"
  }
}
var waiting = 3
var started = false
var lists = [ "region", "district" ]
var lookup = { }

for( let list of lists ) {
  fs.createReadStream( input + list + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      if ( list === "district" ) {
        if ( lookup[ data.region ] ) {
          lookup[ data.id ] = lookup[ data.region ] + "." + data.code
        }
      } else {
        lookup[ data.id ] = data.code
      }
    } ).on( 'end', () => {
      waiting--
    } )
}

var maps = [ "facility_type" ]

for( let map of maps ) {
  fs.createReadStream( "maps/"+map+".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      lookup[data.id] = data
    } ).on( 'end', () => {
      waiting--
    } )
}


processJobs()

function processJobs() {
  if ( !started && !waiting ) {
    started = true
    fs.createReadStream( input + "facility.csv" ).pipe( csv() )
      .on( 'data', ( data ) => {
        if ( lookup[data.location] ) {
          let code = lookup[data.location]+"."+data.id.substring(9)

          let org = JSON.parse( JSON.stringify( orgTemplate ) )
          org.resource.id = code
          org.resource.name = data.name
          org.resource.type[1].text = lookup[ data.facility_type ].code
          org.resource.type[1].coding[0].system = lookup[ data.facility_type ].system
          org.resource.type[1].coding[0].code = lookup[ data.facility_type ].code

          org.request.url += code
          bundle.entry.push( org )

          let entry = JSON.parse( JSON.stringify( locTemplate ) )
          entry.resource.id = code
          entry.resource.name = data.name
          entry.resource.partOf.reference += lookup[data.location]
          entry.resource.managingOrganization += code
          entry.resource.type[1].text = lookup[ data.facility_type ].code
          entry.resource.type[1].coding[0].system = lookup[ data.facility_type ].system
          entry.resource.type[1].coding[0].code = lookup[ data.facility_type ].code

          entry.request.url += code
          bundle.entry.push( entry )


        } else {
          console.error("Skipping data outside Taifafeki: "+data.location)
        }

      } )
      .on ( 'end', () => {
        console.log(JSON.stringify(bundle, null, 2 ))
      } )
  } else {
    console.error("Waiting...")
    setTimeout( () => processJobs(), 1000 )
  }
}
