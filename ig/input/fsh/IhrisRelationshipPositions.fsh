Instance:       ihris-es-positions-report
InstanceOf:     IhrisRelationship
Title:          "NHWR Relationship"
Usage:          #example

* code.text = "iHRISRelationship"
* code.coding = #iHRISRelationship
* subject.reference = "StructureDefinition/ihris-practitioner"
* extension[reportdetails].extension[name].valueString = "practitioner"
* extension[reportdetails].extension[label].valueString = "NHWR Health Worker Roles Report"
* extension[reportdetails].extension[resource].valueString = "Practitioner"
* extension[reportdetails].extension[query].valueString = "active=true"
* extension[reportdetails].extension[reportelement][1].extension[label].valueString = "prefix"
* extension[reportdetails].extension[reportelement][1].extension[name].valueString = "name.prefix"
* extension[reportdetails].extension[reportelement][1].extension[display].valueString = "Prefix"

* extension[reportdetails].extension[reportelement][2].extension[label].valueString = "given"
* extension[reportdetails].extension[reportelement][2].extension[name].valueString = "name.where(use='official').first().given"
* extension[reportdetails].extension[reportelement][2].extension[display].valueString = "Given name"

* extension[reportdetails].extension[reportelement][3].extension[label].valueString = "family"
* extension[reportdetails].extension[reportelement][3].extension[name].valueString = "name.where(use='official').family"
* extension[reportdetails].extension[reportelement][3].extension[display].valueString = "Family name"

* extension[reportlink].extension[name].valueString = "role"
* extension[reportlink].extension[resource].valueString = "PractitionerRole"
* extension[reportlink].extension[linkElement].valueString = "PractitionerRole.practitioner.reference"
* extension[reportlink].extension[linkTo].valueString = "practitioner"
* extension[reportlink].extension[linkElementSearchParameter].valueString = "practitioner"
* extension[reportlink].extension[multiple].valueBoolean = false
* extension[reportlink].extension[reportelement][0].extension[label].valueString = "job"
* extension[reportlink].extension[reportelement][0].extension[name].valueString = "code.coding.where(system='http://ihris.org/fhir/CodeSystem/ihris-job').display"
* extension[reportlink].extension[reportelement][0].extension[display].valueString = "Job Title"

* extension[reportlink].extension[reportelement][1].extension[label].valueString = "startDate"
* extension[reportlink].extension[reportelement][1].extension[name].valueString = "period.start"
* extension[reportlink].extension[reportelement][1].extension[display].valueString = "Start Date"

* extension[reportlink].extension[reportelement][2].extension[label].valueString = "endDate"
* extension[reportlink].extension[reportelement][2].extension[name].valueString = "period.end"
* extension[reportlink].extension[reportelement][2].extension[display].valueString = "End Date"

* extension[reportlink].extension[reportelement][3].extension[label].valueString = "employmentTerms"
* extension[reportlink].extension[reportelement][3].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role-employment-terms').valueCoding.display"
* extension[reportlink].extension[reportelement][3].extension[display].valueString = "Employment Terms"

* extension[reportlink].extension[reportelement][4].extension[label].valueString = "positionType"
* extension[reportlink].extension[reportelement][4].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role-position-type').valueCoding.display"
* extension[reportlink].extension[reportelement][4].extension[display].valueString = "Position Type"

* extension[reportlink].extension[reportelement][5].extension[label].valueString = "fyear"
* extension[reportlink].extension[reportelement][5].extension[name].valueString = "year(period.start)"
* extension[reportlink].extension[reportelement][5].extension[display].valueString = "Year Started"

* extension[reportlink].extension[name].valueString = "facility"
* extension[reportlink].extension[resource].valueString = "Location"
* extension[reportlink].extension[linkElement].valueString = "Location.id"
* extension[reportlink].extension[linkTo].valueString = "role.location.reference"
* extension[reportlink].extension[multiple].valueBoolean = false
* extension[reportlink].extension[reportelement][0].extension[label].valueString = "dutyPost"
* extension[reportlink].extension[reportelement][0].extension[name].valueString = "name"
* extension[reportlink].extension[reportelement][0].extension[display].valueString = "Facility/Place of work"

