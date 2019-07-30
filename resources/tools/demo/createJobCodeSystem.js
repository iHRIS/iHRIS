const csv = require('csv-parser')
const fs = require('fs')

const input = process.argv[2]
const prefix = 'http://ihris.org/fhir/'
const id = process.argv[3]
const name = process.argv[4]
const title = process.argv[5]
let def_field = null
if ( process.argv.length === 7 ) {
  def_field = process.argv[6]
}

const systems = { 
  cadre: "http://ihris.org/fhir/CodeSystem/ihris-cadre",
  classification: "http://ihris.org/fhir/CodeSystem/ihris-classification",
  salary_grade: "http://ihris.org/fhir/CodeSystem/ihris-salary-grade"
}

let system = {
  resourceType: "CodeSystem",
  id: id,
  url: prefix + "CodeSystem/" + id,
  name: name,
  title: title,
  publisher: "iHRIS Foundation",
  contact: [
    {
      telecom: [
        {
          system: "url",
          value: "http://ihris.org"
        }
      ]
    }
  ],
  description: "Sample iHRIS CodeSystem for: " + name,
  content: "complete",
  property: [
    {
      code: "cadre",
      description: "The cadre of this job.",
      type: "Coding"
    },
    {
      code: "classification",
      description: "The classification of this job.",
      type: "Coding"
    },
    {
      code: "salary-grade",
      description: "The salary grade of this job.",
      type: "Coding"
    }
  ],
  concept: []
}

let valueset = {
  resourceType: "ValueSet",
  id: id,
  url: prefix + "ValueSet/" + id,
  name: name,
  title: title,
  status: "active",
  experimental: false,
  publisher: "iHRIS Foundation",
  contact: [
    {
      telecom: [
        {
          system: "url",
          value: "http://ihris.org"
        }
      ]
    }
  ],
  description: "Sample iHRIS ValueSet for: " + name,
  compose: {
    include: [
      {
        system: prefix + "CodeSystem/" + id,
      }
    ]
  }
}

var waiting = 3
var started = false
var lookup = { cadre: {}, classification: {}, salary_grade: {} }

for( let list of Object.keys( lookup ) ) {
  fs.createReadStream( input + list + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      lookup[ data.id ] = data.code
    } ).on( 'end', () => {
      waiting--
    } )
}


processJobs()

function processJobs() {
  if ( !started && !waiting ) {
    started = true
    fs.createReadStream( input + "job.csv" ).pipe( csv() )
      .on( 'data', ( data ) => {
        let definition = null
        if ( def_field && data[def_field] ) {
          definition = data[def_field]
        }
        let addition = { code: data.code, display: data.title, definition, property: [] }
        if ( data.cadre && lookup[ data.cadre ] ) {
          addition.property.push( {
            code: "cadre",
            valueCoding: {
              system: systems.cadre,
              code: lookup[ data.cadre ]
            }
          } )
        }
        if ( data.classification && lookup[ data.classification ]) {
          addition.property.push( {
            code: "classification",
            valueCoding: {
              system: systems.classification,
              code: lookup[ data.classification ]
            }
          } )
        }
        if ( data.salary_grade && lookup[ data.salary_grade ] ) {
          addition.property.push( {
            code: "salary-grade",
            valueCoding: {
              system: systems.salary_grade,
              code: lookup[ data.salary_grade ]
            }
          } )
        }
        system.concept.push( addition )
      } )
      .on ( 'end', () => {
        console.log(JSON.stringify(system, null, 2 )) 
        console.log(JSON.stringify(valueset, null, 2 )) 
      } )
  } else {
    console.log("Waiting...")
    setTimeout( () => processJobs(), 1000 )
  }
}
