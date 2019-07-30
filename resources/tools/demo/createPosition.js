const csv = require('csv-parser')
const fs = require('fs')

const input = process.argv[2]
const prefix = 'http://ihris.org/fhir/'

const systems = {
  department: "http://ihris.org/fhir/CodeSystem/ihris-department",
  job: "http://ihris.org/fhir/CodeSystem/ihris-job",
  position_type: "http://ihris.org/fhir/CodeSystem/ihris-position-type",
  salary_source: "http://ihris.org/fhir/CodeSystem/ihris-salary-source"
}
const ihrisFields = {
  department: "department",
  job: "job",
  position_type: "pos_type",
  salary_source: "source"
}
const fhirFields = {
  department: "department",
  job: "job",
  position_type: "positionType",
  salary_source: "salarySource"
}

let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: []
}

const posTemplate = {
  resource: {
    resourceType: "Basic",
    meta: {
      profile: [
        "http://ihris.org/fhir/StructureDefinition/iHRISPosition"
      ]
    },
    id: "",
    code: {
      coding: [
        {
          system: "http://ihris.org/fhir/CodeSystem/ihris-resource",
          code: "iHRISPosition"
        }
      ],
      text: "iHRISPosition"
    },
    extension: [
      {
        url: "http://ihris.org/fhir/StructureDefinition/iHIRSPositionDetails",
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
var lists = [ "region", "district", "facility" ]
var terminologies = [ "department", "job", "position_type", "salary_source" ]
var waiting = lists.length + terminologies.length
var lookup = { }

for( let list of lists ) {
  fs.createReadStream( input + list + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      if ( list === "district" ) {
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
      lookup[data.id] = data.code
    } ).on( 'end', () => {
      waiting--
    } )
}

var supervises = {}
processJobs()

function processJobs() {
  if ( !started && !waiting ) {
    started = true
    fs.createReadStream( input + "position.csv" ).pipe( csv() )
      .on( 'data', ( data ) => {

          let code = data.code.replace( /\s+/g, "-" ) + "." + data.id.substring(9)
          lookup[data.id] = code

          let entry = JSON.parse( JSON.stringify( posTemplate ) )
          entry.resource.id = code

          if ( data.supervisor ) {
            // Data isn't in order, so add supervisor at the end
            // when we know the new id for it
            if ( !supervises[ data.supervisor ] ) {
              supervises[ data.supervisor ] = []
            }
            supervises[ data.supervisor ].push( entry )

          }
          entry.request.url += code

          for ( let ts in systems ) {
            if ( data[ihrisFields[ts]] ) {
              entry.resource.extension[0].extension.push(
                {
                  url: fhirFields[ts],
                  valueCoding: {
                    system: systems[ts],
                    code: lookup[data[ihrisFields[ts]]]
                  }
                }
              )
            } else if ( ts === "position_type" ) {
              entry.resource.extension[0].extension.push(
                {
                  url: fhirFields[ts],
                  valueCoding: {
                    system: systems[ts],
                    code: "full-time"
                  }
                }
              )
            }
          }
          let stringFields = [ "description", "title", "comments" ]
          for ( let field of stringFields ) {
            if ( data[field] ) {
              entry.resource.extension[0].extension.push(
                {
                  url: field,
                  valueString: data[field]
                }
              )
            }
          }

          entry.resource.extension[0].extension.push(
            {
              url: "active",
              valueBoolean: ( data.status !== "position_status|discontinued" )
            }
          )

          entry.resource.extension[0].extension.push(
            {
              url: "location",
              valueReference: { reference: "Location/" + lookup[data.facility] }
            }
          )

          let listing = []
          listing.push(
            {
              url: "active",
              valueBoolean: ( data.status === "position_status|open" )
            }
          )
          if ( data.posted_date !== "0000-00-00 00:00:00" ) {
            listing.push(
              {
                url: "postedDate",
                valueDate: data.posted_date.substring( 0, 10 )
              }
            )
          }
          let period = {}
          if ( data.proposed_end_date !== "0000-00-00 00:00:00" ) {
            period.end = data.proposed_end_date.substring( 0, 10 )
          }
          if ( data.proposed_hiring_date !== "0000-00-00 00:00:00" ) {
            period.start = data.proposed_hiring_date.substring( 0, 10 )
          }
          if ( period.start || period.end ) {
            listing.push(
              {
                url: "proposedPeriod",
                valuePeriod: period
              }
            )
          }
          if ( data.interview_comments ) {
            // No date, so use posted_date for sample data.
            listing.push(
              {
                url: "interview",
                extension: [
                  {
                    url: "date",
                    valueDate: data.posted_date.substring( 0, 10 )
                  },
                  {
                    url: "notes",
                    valueString: data.interview_comments
                  }
                ]
              }
            )
          }

          entry.resource.extension[0].extension.push(
            {
              url: "listing",
              extension: listing
            }
          )

          bundle.entry.push( entry )

      } )
      .on ( 'end', () => {

        for( let supervisor in supervises ) {
          for( let entry of supervises[supervisor] ) {
            entry.resource.extension[0].extension.push(
              {
                url: "supervisor",
                valueReference: { reference: "Basic/" + lookup[supervisor] }
              }
            )
          }
        }
        console.log(JSON.stringify(bundle, null, 2 ))
      } )
  } else {
    console.error("Waiting...")
    setTimeout( () => processJobs(), 1000 )
  }
}
