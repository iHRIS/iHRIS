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
      code: "competency-type",
      description: "The type of this competency.",
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

fs.createReadStream( input ).pipe( csv() )
  .on( 'data', ( data ) => {
    let definition = null
    if ( def_field && data[def_field] ) {
      definition = data[def_field]
    }
    let competency_type = data.competency_type.substring(16)
    let code = competency_type + "-" + data.id.substring(11)
    let addition = { code: code, display: data.title, definition, property: [
      {
        code: "competency-type",
        valueCodeing: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-competency-type",
          code: competency_type
        }
      }
    ] }
    system.concept.push( addition )
  } )
  .on ( 'end', () => {
    console.log(JSON.stringify(system, null, 2 )) 
    console.log(JSON.stringify(valueset, null, 2 )) 
  } )
