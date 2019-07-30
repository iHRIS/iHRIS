const csv = require('csv-parser')
const fs = require('fs')

const input = process.argv[2]
const prefix = 'http://ihris.org/fhir/'


let bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: []
}

const pracTemplate = {
  resource: {
    resourceType: "Practitioner",
    meta: {
      profile: [
        "http://ihris.org/fhir/StructureDefinition/iHRISPractitioner"
      ]
    },
    id: "",
    active: true,
    name: [
      {
        use: "official",
        text: "",
        given: [],
        family: ""
      }
    ],
    telecom: [],
    address: [],
    qualification: [],
    extension: []
  },
  request: {
    method: "PUT",
    url: "Practitioner/"
  }
}

const quals = {
  Secretary: [ "BA" ],
  Counselor: [ "BS" ],
  'Medical Doctor': [ "BS", "MD" ],
  'Specialized Doctor': [ "BS", "MD" ],
  'Manager of Administration': [ "BA", "MBA" ],
  Nurse: [ "BSN", ],
  'Dental Technician': [ "BS", "MT" ],
  Accountant: [ "BA" ],
  Receptionist: [ "BA" ],
  Opthalmologist: [ "BS", "MD" ],
  'Chief Nurse': [ "BSN", "RN", "CNP" ],
  'Lab Technician': [ "BS", "MT" ],
  Administrator: [ "BBA" ],
  Cashier: [ "HS" ],
  'Deputy Chief Nurse': [ "BSN", "RN" ],
  'Clinical Nurse': [ "BSN", "RN" ],
  'PMTCT Nurse': [ "BSN", "RN" ],
  'VCT Nurse': [ "BSN", "RN" ],
  Midwife: [ "BN" ],
  'Pediatic Nurse': [ "BSN", "RN", "CPNP" ],
  'Clinical Social Worker': [ "BA" ],
  'Chief Archivist': [ "BA" ],
  'Specialist Doctor': [ "BS", "MD" ],
  'Nurse Midwife Assistant': [ "CMA" ],
  'Hygienist Aide': [ "CMA" ],
  'Physiotherapist Aide': [ "CMA" ],
  Orthopedist: [ "BS", "MD" ],
  'Laboratory Technician': [ "BS", "MT" ],
  'Orthopedist Aide': [ "CMA" ],
  'Laboratory Assistant': [ "CMA" ],
  Archivist: [ "BA" ],
  'Medical Assistant': [ "BS", "MDA" ],
  'Nutritionist Aide': [ "BS" ],
  Anesthesiologist: [ "BS", "MD" ],
  Nutritionist: [ "BS" ],
  'Physiotherapist  ': [ "BS" ],
  'Radiology Technician': [ "BS", "MT" ],
  'Socal Work Assistant': [ "BA" ],
  'Social Worker': [ "BA" ],
  Electrician: [ "BS" ],
  Manager: [ "BA" ],
  Driver: [ "TS" ],
  Mechanic: [ "BS" ],
  'Anesthesist Technician': [ "BS", "MT" ],
  'Environmental Health Worker': [ "BS" ],
  'Pharmacy Technician': [ "BS", "MT" ],
  Surgeon: [ "BS", "MD"],
  Dentist: [ "BS", "MD" ],
  Hygienist: [ "BS" ],
  Pharmacist: [ "BS", "PharmD" ],
  Physiotherapist: [ "BS" ],
  'Radiography Technician': [ "BS", "MT" ],
  Gardener: [],
  Guard: [ "HS" ],
  'Anesthesiology Technician': [ "BS", "MT" ],
  'Social Worker Aid': [ "BA" ],
  'Social Worker  ': [ "BA" ],
  'Nurse Midwife Aid': [ "BS", "CMA" ],
  'Physiotherapy Aide': [ "BS", "CMA" ],
  'Hygienist  ': [ "BS" ],
  'Social Work Aid': [ "BA" ],
  'Social Work Aide': [ "BA" ],
  'Anesthesiology Assistant': [ "BS", "CMA" ],
  'Clinical Psychologist': [ "BS", "MD" ]
}

const qualText = {
  BA: "Bachelor of Arts",
  BBA: "Bachelor of Business Administration",
  BN: "Bachelor of Nursing",
  B: "Bachelor of Science",
  BSN: "Bachelor on Science - Nursing",
  BT: "Bachelor of Theology",
  CMA: "Certified Medical Assistant",
  CNP: "Certified Nurse Practitioner",
  CPNP: "Certified Pediatric Nurse Practitioner",
  HS: "High School Graduate",
  MBA: "Master of Business Administration",
  MD: "Doctor of Medicine",
  MDA: "Medical Assistant",
  MT: "Medical Technician",
  NP: "Nurse Practitioner",
  PharmD: "Doctor of Pharmacy",
  RN: "Registered Nurse",
  TS: "Trade School Graduate"
}


var started = false
var lists = [ "region", "district", "position" ]
var maps = [ "marital_status", "gender" ]
var supplemental = [ "demographic", "person_contact_work", "person_position" ]
var waiting = lists.length + maps.length + supplemental.length
var lookup = { }

for( let list of lists ) {
  fs.createReadStream( input + list + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      if ( list === "district" ) {
        if ( lookup[ data.region ] ) {
          lookup[ data.id ] = lookup[ data.region ] + "." + data.code
        }
      } else if ( list === "position" ) {
        lookup[ data.id ] = data
      } else {
        lookup[ data.id ] = data.code
      }
    } ).on( 'end', () => {
      waiting--
    } )
}

for( let map of maps ) {
  fs.createReadStream( "maps/"+map+".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      lookup[data.id] = data
    } ).on( 'end', () => {
      waiting--
    } )
}

for( let supp of supplemental ) {
  lookup[ supp ] = {}
  fs.createReadStream( input + supp + ".csv" ).pipe( csv() )
    .on( 'data', ( data ) => {
      lookup[ supp ][ data.parent ] = data
    } ).on( 'end', () => {
      waiting--
    } )
}

processJobs()

function processJobs() {
  if ( !started && !waiting ) {
    started = true
    fs.createReadStream( input + "person.csv" ).pipe( csv() )
      .on( 'data', ( data ) => {

          let code = "P" + data.id.substring( 7 )

          let entry = JSON.parse( JSON.stringify( pracTemplate ) )
          entry.resource.id = code
          entry.resource.name[0].given.push( data.firstname )
          for( let other of data.othername.split(" ") ) {
            if ( other ) entry.resource.name[0].given.push( other )
          }
          entry.resource.name[0].family = data.surname
          entry.resource.name[0].text = entry.resource.name[0].given.join(" ") + " " + data.surname

          if ( lookup["person_position"][data.id] ) {
            for( let qual of quals[ lookup[ lookup[ "person_position" ][ data.id ].position ].title ] ) {
              entry.resource.qualification.push( {
                code: {
                  coding: [
                    {
                      system: "http://terminology.hl7.org/CodeSystem/v2-0360|2.7",
                      code: qual
                    }
                  ],
                  text: qualText[qual]
                }
              } )
            }
          }

          if ( data.nationality ) {
            entry.resource.extension.push(
              {
                url: "http://ihris.org/fhir/StructureDefinition/iHRISPractitionerNationality",
                valueCoding: {
                  system: "urn:iso:std:iso:3166",
                  code: data.nationality.substring( 8 )
                }
              }
            )
          }
          if ( data.residence ) {
            entry.resource.extension.push(
              {
                url: "http://ihris.org/fhir/StructureDefinition/iHRISPractitionerResidence",
                valueReference: {
                  reference: "Location/" + lookup[ data.residence ]
                }
              }
            )
          }

          if ( lookup.demographic[ data.id ] ) {
            let demo = lookup.demographic[ data.id ]
            if ( demo.gender ) entry.resource.gender = lookup[ demo.gender ].code
            if ( demo.birth_date !== "0000-00-00 00:00:00" ) entry.resource.birthDate = demo.birth_date.substring( 0, 10 )
            if ( demo.marital_status ) {
              entry.resource.extension.push(
                {
                  url: "http://ihris.org/fhir/StructureDefinition/iHRISPractitionerMaritalStatus",
                  valueCoding: {
                    system: lookup[ demo.marital_status ].system,
                    code: lookup[ demo.marital_status ].code
                  }
                }
              )
            }
            if ( demo.dependents ) {
              entry.resource.extension.push(
                {
                  url: "http://ihris.org/fhir/StructureDefinition/iHRISPractitionerDependents",
                  valueInteger: demo.dependents
                }
              )
            }
          }

          if ( lookup.person_contact_work[ data.id ] ) {
            let work = lookup.person_contact_work[ data.id ]
            if ( work.address ) {
              entry.resource.address.push( {
                use: "work",
                text: work.address,
              } )
            }
            if ( work.email ) {
              entry.resource.telecom.push( {
                use: "work",
                system: "email",
                value: work.email,
                rank: 1
              })
            }
            if ( work.telephone ) {
              entry.resource.telecom.push( {
                use: "work",
                system: "phone",
                value: work.telephone,
                rank: 1
              })
            }
            if ( work.alt_telephone ) {
              entry.resource.telecom.push( {
                use: "work",
                system: "phone",
                value: work.alt_telephone,
                rank: 2
              })
            }
            if ( work.mobile_phone ) {
              entry.resource.telecom.push( {
                use: "mobile",
                system: "phone",
                value: work.mobile_phone,
                rank: 1
              })
            }
            if ( work.fax ) {
              entry.resource.telecom.push( {
                use: "work",
                system: "fax",
                value: work.fax,
                rank: 1
              })
            }
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
