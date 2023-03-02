const fhirpath = require('fhirpath')

/*const fragment = {
  name: "Luke Duncan",
  start:"2012-02-07",
  end: "2012-08-08" 
}*/
const bundle = {
  resourceType: "Bundle",
  id: "57f95079-89ab-451c-b9a5-30f2a24a4c4e",
  meta: {
    lastUpdated: "2021-04-14T01:55:32.160-07:00"
  },
  type: "searchset",
  total: 2,
  link: [ {
    relation: "self",
    url: "http://localhost:8080/noberthapi/fhir/PractitionerRole"
  } ],
  entry: [ {
    fullUrl: "http://localhost:8080/noberthapi/fhir/PractitionerRole/9162",
    resource: {
      resourceType: "PractitionerRole",
      id: "9162",
      meta: {
        versionId: "5",
        lastUpdated: "2021-03-31T02:55:10.861-07:00",
        source: "#bqLpi9JFy34YXaIm",
        profile: [ "http://ihris.org/fhir/StructureDefinition/ihris-job-description" ]
      },
      extension: [ {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status",
        valueCoding: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-employment-status-codesystem",
          code: "permanent",
          display: "Permanent"
        }
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-position-status",
        valueCoding: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-position-status",
          code: "closed",
          display: "Closed"
        }
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-type",
        valueCoding: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-job-type-codesystem",
          code: "NewHire",
          display: "New Hire"
        }
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-first-employment-date",
        valueDate: "2021-03-10"
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-reason-departure",
        valueCoding: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-reason-departure-codesystem",
          code: "quit",
          display: "Quit"
        }
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
        extension: [ {
          url: "practitioner",
          valueString: "Practitioner/9161"
        } ]
      } ],
      active: true,
      period: {
        start: "2021-03-10",
        end: "2021-03-14"
      },
      practitioner: {
        reference: "Practitioner/9161"
      },
      code: [ {
        coding: [ {
          system: "http://ihris.org/fhir/CodeSystem/ihris-job-ethiopia",
          code: "BEIV",
          display: "Biomedical Engineer IV"
        } ]
      } ],
      location: [ {
        reference: "Location/ET.R1.Z110.F2"
      } ]
    },
    search: {
      mode: "match"
    }
  }, {
    fullUrl: "http://localhost:8080/noberthapi/fhir/PractitionerRole/9780",
    resource: {
      resourceType: "PractitionerRole",
      id: "9780",
      meta: {
        versionId: "2",
        lastUpdated: "2021-03-31T06:56:49.059-07:00",
        source: "#J3wCTw7jdR5SJmIY",
        profile: [ "http://ihris.org/fhir/StructureDefinition/ihris-job-description" ]
      },
      extension: [ {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status",
        valueCoding: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-employment-status-codesystem",
          code: "contract"
        }
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-type",
        valueCoding: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-job-type-codesystem",
          code: "ReHire",
          display: "Re-Hire"
        }
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-first-employment-date",
        valueDate: "2021-03-10"
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-position-status",
        valueCoding: {
          system: "http://ihris.org/fhir/CodeSystem/ihris-position-status",
          code: "occupied"
        }
      }, {
        url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
        extension: [ {
          url: "location",
          valueString: "Location/ET.R1.Z110.F1"
        }, {
          url: "location",
          valueString: "Location/ET.R1.Z110"
        }, {
          url: "location",
          valueString: "Location/ET.R1"
        }, {
          url: "location",
          valueString: "Location/ET"
        }, {
          url: "practitioner",
          valueString: "Practitioner/9161"
        } ]
      } ],
      period: {
        start: "2021-03-15",
        end: "2022-03-14"
      },
      practitioner: {
        reference: "Practitioner/9161"
      },
      organization: {
        reference: "Organization/9623"
      },
      code: [ {
        coding: [ {
          system: "http://ihris.org/fhir/CodeSystem/ihris-job-ethiopia",
          code: "BEIV",
          display: "Biomedical Engineer IV"
        } ]
      } ],
      location: [ {
        reference: "Location/ET.R1.Z110.F1"
      } ]
    },
    search: {
      mode: "match"
    }
  } ]
}
//console.log( fhirpath.evaluate( fragment.name, "matches('^[A-Za-z ]*$')" ) )
//console.log( fhirpath.evaluate( bundle, "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status').valueCoding.code='contract'" )
//  )
for(let entry of bundle.entry) {
  console.log( fhirpath.evaluate( entry.resource, "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status').valueCoding.code='contract'" )
  )
}
  


