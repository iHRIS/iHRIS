'use strict'

const jest_setup = require('../jest-setup')

describe( 'Tests the FHIR Filter module', () => {
  const fhirFilter = require("../modules/fhirFilter")

  const MOCK_OBJ = {
    resourceType: "Practitioner",
    id: "test-practitioner",
    meta: {
      profile: [ "http://ihris.org/fhir/StructureDefinition/ihris-practitioner" ]
    },
    identifier: [
      { use: "official", system: "http://ihris.org/ID/Employee", value: "1234567890" },
      { use: "official", system: "http://ihris.org/ID/Passport", value: "392345854" }
    ],
    active: true,
    name: [
      {
        use: "official",
        family: "Tester",
        given: [ "Test", "E." ],
        text: "Test E. Tester",
        suffix: [ "Jr" ],
        prefix: [ "Dr" ]
      },
      {
        use: "nickname",
        given: [ "Testy" ],
        family: "Tester",
        period: { start: "2020-05-01", end: "2020-05-31" }
      }
    ],
    telecom: [
      { system: "phone", use: "mobile", value: "406-555-1212" },
      { system: "phone", use: "work", value: "919-555-1212" },
      { system: "email", use: "work", value: "test@ihris.org" },
      { system: "email", use: "home", value: "testy@ihris.org" }
    ],
    gender: "male",
    birthDate: "1980-06-01",
    qualification: [
      {
        identifier: [ { system: "http://ihris.org/Qualification/PHD", value: "7387" } ],
        code: {
          coding: [ { system: "http://terminology.hl7.org/CodeSystem/v2-0360|2.7", code: "PHD" } ],
          text: "PhD"
        }
      },
      {
        identifier: [ { system: "http://ihris.org/Qualification/Trainer", value: "abc" } ],
        code: {
          coding: [ { system: "http://ihris.org/fhir/CodeSystem/Test", code: "trainer" } ],
          text: "Trainer"
        }
      }
    ]
  }

  describe( 'Tests constraints', () => {
    test( 'Checks identifier system constraint', () => {
      let meets = fhirFilter.meetsConstraint( MOCK_OBJ, "identifier.exists(system = 'http://ihris.org/ID/Employee')" )
      expect( meets ).toBeTruthy()

      meets = fhirFilter.meetsConstraint( MOCK_OBJ, "identifier.exists(system = 'http://ihris.org/ID/Government')" )
      expect( meets ).toBeFalsy()
    } )

    test( 'Checks profile constraint', () => {
      let meets = fhirFilter.meetsConstraint( MOCK_OBJ, "meta.profile.exists($this = 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner')" )
      expect( meets ).toBeTruthy()

      meets = fhirFilter.meetsConstraint( MOCK_OBJ, "meta.profile.exists($this = 'http://ihris.org/fhir/StructureDefinition/ihris-user')" )
      expect( meets ).toBeFalsy()
    } )

    test( 'Checks specific email constraint', () => {
      let meets = fhirFilter.meetsConstraint( MOCK_OBJ, "telecom.exists( system = 'email' and use = 'work' and value = 'test@ihris.org' )" )
      expect( meets ).toBeTruthy()

      meets = fhirFilter.meetsConstraint( MOCK_OBJ, "telecom.exists( system = 'email' and use = 'work' and value = 'fail@ihris.org' )" )
      expect( meets ).toBeFalsy()
    } )

    test( 'Checks qualification code constraint', () => {
      let meets = fhirFilter.meetsConstraint( MOCK_OBJ, "qualification.exists( code.coding.exists( system = 'http://terminology.hl7.org/CodeSystem/v2-0360|2.7' and code = 'PHD' ) )" )
      expect( meets ).toBeTruthy()

      meets = fhirFilter.meetsConstraint( MOCK_OBJ, "qualification.exists( code.coding.exists( system = 'http://terminology.hl7.org/CodeSystem/v2-0360|2.7' and code = 'MD' ) )" )
      expect( meets ).toBeFalsy()
    } )

    test( 'Checks qualification identifier system constraint', () => {
      let meets = fhirFilter.meetsConstraint( MOCK_OBJ, "qualification.exists( identifier.exists( system = 'http://ihris.org/Qualification/Trainer' ) )" )
      expect( meets ).toBeTruthy()

      meets = fhirFilter.meetsConstraint( MOCK_OBJ, "qualification.exists( identifier.exists( system = 'http://ihris.org/Qualification/Teacher' ) )" )
      expect( meets ).toBeFalsy()
    } )

    test( 'Checks name period', () => {
      let meets = fhirFilter.meetsConstraint( MOCK_OBJ, "name.exists( period.start <= '2020-05-15' and ( period.end >= '2020-05-15' or period.end.empty() ) )" )
      expect( meets ).toBeTruthy()

      meets = fhirFilter.meetsConstraint( MOCK_OBJ, "name.exists( period.start <= today() and ( period.end >= today() or period.end.empty() ) )" )
      expect( meets ).toBeFalsy()
    } )

  } )

  describe( 'Tests filters on standard resources', () => {

    test( 'Filters only name', () => {
      const NAME_RESULTS = {
        "resourceType": "Practitioner",
        "id": "test-practitioner",
        "meta": {
          "profile": [
            "http://ihris.org/fhir/StructureDefinition/ihris-practitioner"
          ],
          "tag": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationValue",
              "code": "SUBSETTED"
            }
          ]
        },
        "name": [
          {
            "use": "official",
            "family": "Tester",
            "given": [
              "Test",
              "E."
            ],
            "text": "Test E. Tester",
            "suffix": [
              "Jr"
            ],
            "prefix": [
              "Dr"
            ]
          },
          {
            "use": "nickname",
            "given": [
              "Testy"
            ],
            "family": "Tester",
            "period": {
              "start": "2020-05-01",
              "end": "2020-05-31"
            }
          }
        ]
      }
      expect( fhirFilter.filter( MOCK_OBJ, [ "name" ] ) ).toEqual( NAME_RESULTS )
    } )

    test( 'Filters identifier and qualifications', () => {
      const IDQUAL_RESULTS = {
        "resourceType": "Practitioner",
        "id": "test-practitioner",
        "meta": {
          "profile": [
            "http://ihris.org/fhir/StructureDefinition/ihris-practitioner"
          ],
          "tag": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationValue",
              "code": "SUBSETTED"
            }
          ]
        },
        "identifier": [
          {
            "use": "official",
            "system": "http://ihris.org/ID/Employee",
            "value": "1234567890"
          },
          {
            "use": "official",
            "system": "http://ihris.org/ID/Passport",
            "value": "392345854"
          }
        ],
        "qualification": [
          {
            "identifier": [
              {
                "system": "http://ihris.org/Qualification/PHD",
                "value": "7387"
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/v2-0360|2.7",
                  "code": "PHD"
                }
              ],
              "text": "PhD"
            }
          },
          {
            "identifier": [
              {
                "system": "http://ihris.org/Qualification/Trainer",
                "value": "abc"
              }
            ],
            "code": {
              "coding": [
                {
                  "system": "http://ihris.org/fhir/CodeSystem/Test",
                  "code": "trainer"
                }
              ],
              "text": "Trainer"
            }
          }
        ]
      }

      expect( fhirFilter.filter( MOCK_OBJ, [ "identifier", "qualification" ] ) ).toEqual( IDQUAL_RESULTS )
    } )

    test( 'Filters gender and birthDate with no defaults', () => {
      const NODEF_RESULTS =     {
        "gender": "male",
        "birthDate": "1980-06-01"
      }

      expect( fhirFilter.filter( MOCK_OBJ, [ "gender", "birthDate" ], true ) ).toEqual( NODEF_RESULTS )
    } )


  } )
  describe( 'Tests filters on Bundle resources', () => {

    // mock default data
    const user = require('../modules/user')
    user.tasksLoaded = true
    user.valueSet[ "ihris-task-permission" ] = [ '*', 'read', 'write', 'delete' ]
    user.valueSet[ "ihris-task-resource" ] = [ '*', 'Person', 'Location', 'Practitioner', 'CodeSystem', 'ValueSet', 'StructureDefinition' ]

    const MOCK_PERSON_ENTRY = {
      resourceType: "Person",
      id: "test-person",
      meta: {},
      name: [ { text: "Test E. Tester" } ],
      birthDate: "1990-07-29",
      gender: "male",
      link: [
        {
          target: { reference: "Practitioner/test-practitioner" }
        }
      ]
    }
    const MOCK_PRACTITIONER_ENTRY = {
      resourceType: "Practitioner",
      id: "test-practitioner",
      meta: {},
      name: [ { text: "Test E. Tester" } ],
      birthDate: "1990-07-29",
      gender: "male"
    }
    const MOCK_PERSON2_ENTRY = {
      resourceType: "Person",
      id: "test-person2",
      meta: {},
      name: [ { text: "Betty Tester" } ],
      birthDate: "1995-03-22",
      gender: "female",
      link: [
        {
          target: { reference: "Practitioner/test-practitioner2" }
        }
      ]
    }
    const MOCK_PRACTITIONER2_ENTRY = {
      resourceType: "Practitioner",
      id: "test-practitioner2",
      meta: {},
      name: [ { text: "Betty Tester" } ],
      birthDate: "1995-03-22",
      gender: "female"
    }
    const MOCK_LOCATION_ENTRY = {
      resourceType: "Location",
      id: "test-location",
      meta: {},
      name: "Test Location",
      status: "active",
      alias: [ "Tester Location" ]
    }
    const MOCK_BUNDLE = {
      resourceType: "Bundle",
      type: "searchset",
      total: 2,
      entry: [
        {
          resource: MOCK_PERSON_ENTRY,
          search: { mode: "match" }
        },
        {
          resource: MOCK_PRACTITIONER_ENTRY,
          search: { mode: "include" }
        },
        {
          resource: MOCK_PERSON2_ENTRY,
          search: { mode: "match" }
        },
        {
          resource: MOCK_PRACTITIONER2_ENTRY,
          search: { mode: "include" }
        },
        {
          resource: MOCK_LOCATION_ENTRY,
          search: { mode: "include" }
        }
      ]
    }
    const FILTERED_BUNDLE = {
      "resourceType": "Bundle",
      "type": "searchset",
      "total": 2,
      "entry": [
        {
          "resource": {
            "resourceType": "Person",
            "id": "test-person",
            "meta": { "tag": [ { "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationValue", "code": "SUBSETTED" } ] },
            "name": [ { "text": "Test E. Tester" } ]
          },
          "search": { "mode": "match" }
        },
        {
          "resource": {
            "resourceType": "OperationOutcome",
            "issue": [ { "severity": "error", "code": "forbidden", "diagnostics": "Access Denied" } ]
          },
          "search": { "mode": "outcome" }
        },
        {
          "resource": {
            "resourceType": "Person",
            "id": "test-person2",
            "meta": { "tag": [ { "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationValue", "code": "SUBSETTED" } ]
            },
            "name": [ { "text": "Betty Tester" } ],
            "gender": "female"
          },
          "search": { "mode": "match" }
        },
        {
          "resource": {
            "resourceType": "Practitioner",
            "id": "test-practitioner2",
            "meta": {},
            "name": [ { "text": "Betty Tester" } ],
            "birthDate": "1995-03-22",
            "gender": "female"
          },
          "search": { "mode": "include" }
        },
        {
          "resource": {
            "resourceType": "Location",
            "id": "test-location",
            "meta": { "tag": [ { "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationValue", "code": "SUBSETTED" } ]
            },
            "name": "Test Location"
          },
          "search": { "mode": "include" }
        }
      ]
    }


    test( 'test single Practitioner access', () => {
      let userObj = user.__testUser()
      expect( userObj.addPermission( "read", "Practitioner", "test-practitioner2" ) ).toBeTruthy()
      expect( userObj.addPermission( "read", "Person", null, null, "name" ) ).toBeTruthy()
      expect( userObj.addPermission( "read", "Person", null, "gender = 'female'", "gender" ) ).toBeTruthy()
      expect( userObj.addPermission( "read", "Location", null, null, "name" ) ).toBeTruthy()
      let bundle = JSON.parse( JSON.stringify( MOCK_BUNDLE ) )
      fhirFilter.filterBundle( "read", bundle, userObj )
      expect( bundle ).toEqual( FILTERED_BUNDLE )
    } )

  } )


} )
