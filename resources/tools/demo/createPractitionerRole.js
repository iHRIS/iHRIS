const csv = require('csv-parser')
const fs = require('fs')

const input = process.argv[2]
const prefix = 'http://ihris.org/fhir/'

let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: []
}

const ppTemplate = {
  resource: {
    resourceType: "PractitionerRole",
    meta: {
      profile: [
        "http://ihris.org/fhir/StructureDefinition/iHRISPractitionerRole"
      ]
    },
    id: "",
    active: true,
    code: [
      {
        coding: [
          {
            system: "http://ihris.org/fhir/CodeSystem/ihris-job",
            code: ""
          }
        ],
      text: ""
      }
    ],
    practitioner: { reference: "Practitioner/P" },
    location: [],
    period: {},
    extension: [
      {
        url: "http://ihris.org/fhir/StructureDefinition/iHRISPractitionerRoleDetails",
        extension: []
      }
    ]
  },
  request: {
    method: "PUT",
    url: "PractitionerRole/"
  }
}

var started = false
var lists = [ "position", "region", "district", "facility" ]
var terminologies = [ "job", "pos_change_reason" ]
var waiting = lists.length + terminologies.length
var lookup = { }

for( let list of lists ) {
  fs.createReadStream( input + list + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      if ( list === "position" ) {
        lookup[ data.id ] = {
          code: data.code.replace( /\s+/g, "-" ) + "." + data.id.substring(9),
          job: data.job,
          location: data.facility
        }
      } else if ( list === "district" ) {
        if ( lookup[ data.region ] ) {
          lookup[ data.id ] = lookup[ data.region ] + "." + data.code
        }
      } else if ( list === "facility" ) {
        lookup[ data.id ] = lookup[ data.location ] + "." + data.id.substring(9)
      } else {
        lookup[ data.id ] = data.code
      }
    } ).on( 'end', () => {
      waiting--
    } )
}


for( let ts of terminologies ) {
  fs.createReadStream( "terminologies/DemoManage_43_table_hippo_"+ts+".csv" ).pipe( csv() )
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
    fs.createReadStream( input + "person_position.csv" ).pipe( csv() )
      .on( 'data', ( data ) => {

          let code = "PR" + data.id.substring(16)

          let entry = JSON.parse( JSON.stringify( ppTemplate ) )
          entry.resource.id = code

          entry.resource.practitioner.reference += data.parent.substring(7)

          let period = {}
          if ( data.start_date !== "0000-00-00 00:00:00" ) {
            period.start = data.start_date.substring( 0, 10 )
          }
          if ( data.end_date !== "0000-00-00 00:00:00" ) {
            period.end = data.end_date.substring( 0, 10 )
          }
          entry.resource.period = period

          entry.resource.code[0].text = lookup[ lookup[ data.position ].job ].title
          entry.resource.code[0].coding[0].code = lookup[ lookup[ data.position ].job ].code

          entry.resource.location.push( {
            reference: "Location/" + lookup[ lookup[ data.position ].location ]
          } )

          entry.resource.extension[0].extension.push(
            {
              url: "position",
              valueReference: { reference: "Basic/" + lookup[ data.position ].code }
            }
          )

          if ( data.reason ) {
            entry.resource.extension[0].extension.push(
              {
                url: "reason",
                valueCoding: {
                  system: "http://ihris.org/fhir/CodeSystem/ihris-position-change-reason",
                  code: lookup[ data.reason ].code
                }
              }
            )
          }

          entry.request.url += code
          bundle.entry.push( entry )

      } )
      .on ( 'end', () => {
        console.log(JSON.stringify(bundle, null, 2 ))
      } )
  } else {
    console.error("Waiting...")
    setTimeout( () => processJobs(), 1000 )
  }
}
