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
      code: "start",
      description: "The starting salary for this grade.",
      type: "Coding"
    },
    {
      code: "midpoint",
      description: "The midpoint salary for this grade.",
      type: "Coding"
    },
    {
      code: "end",
      description: "The end point salary for this grade.",
      type: "Coding"
    },
    {
      code: "currency",
      description: "The currency used (urn:iso:std:iso:4217).",
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
    system.concept.push( { code: data.code, display: data.name, definition } ) 
  } )
  .on ( 'end', () => {
    console.log(JSON.stringify(system, null, 2 )) 
    console.log(JSON.stringify(valueset, null, 2 )) 
  } )

