const csv = require('csv-parser')
const fs = require('fs')

const input = process.argv[2]
const prefix = 'http://ihris.org/fhir/'

let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: []
}

const salTemplate = {
  resource: {
    resourceType: "Basic",
    meta: {
      profile: [
        "http://ihris.org/fhir/StructureDefinition/iHRISSalary"
      ]
    },
    id: "",
    code: {
      coding: [
        {
          system: "http://ihris.org/fhir/CodeSystem/ihris-resource",
          code: "iHRISSalary"
        }
      ],
      text: "iHRISSalary"
    },
    extension: [
      {
        url: "http://ihris.org/fhir/StructureDefinition/iHIRSSalaryDetails",
        extension: []
      }
    ]
  },
  request: {
    method: "PUT",
    url: "Basic/"
  }
}

var started = false
var lists = [ "person_position" ]
var waiting = lists.length
var lookup = { }

for( let list of lists ) {
  fs.createReadStream( input + list + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      lookup[ data.id ] = "P" + data.parent.substring( 7 )
    } ).on( 'end', () => {
      waiting--
    } )
}

processJobs()

function processJobs() {
  if ( !started && !waiting ) {
    started = true
    fs.createReadStream( input + "salary.csv" ).pipe( csv() )
      .on( 'data', ( data ) => {

          let code = "salary-" + data.id.substring(7)

          let entry = JSON.parse( JSON.stringify( salTemplate ) )
          entry.resource.id = code


          entry.resource.extension[0].extension.push(
            {
              url: "practitioner",
              valueReference: { reference: "Practitioner/" + lookup[data.parent] }
            }
          )

          let period = {}
          if ( data.start_date !== "0000-00-00 00:00:00" ) {
            period.start = data.start_date.substring( 0, 10 )
          }
          if ( data.end_date !== "0000-00-00 00:00:00" ) {
            period.end = data.end_date.substring( 0, 10 )
          }

          entry.resource.extension[0].extension.push(
            {
              url: "period",
              valuePeriod: period
            }
          )

          // No salaries in sample data so just randomize for testing.
          entry.resource.extension[0].extension.push(
            {
              url: "salary",
              valueMoney: {
                value: Math.floor( Math.random() * 80 ) * 1000 + 20000 ,
                currency: "USD"
              }
            }
          )

          if ( data.notes ) {
            entry.resource.extension[0].extension.push(
              {
                url: "notes",
                valueString: data.notes
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
