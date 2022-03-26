Instance:       ihris-es-report-staff
InstanceOf:     IhrisRelationship
Title:          "NHWR Relationship"
Usage:          #example

* code.text = "iHRISRelationship"
* code.coding = #iHRISRelationship
* subject.reference = "StructureDefinition/ihris-practitioner"
* extension[reportdetails].extension[name].valueString = "practitioner"
* extension[reportdetails].extension[label].valueString = "NHWR Report"
* extension[reportdetails].extension[resource].valueString = "Practitioner"
* extension[reportdetails].extension[query].valueString = "active=true"
* extension[reportdetails].extension[displayCheckbox].valueBoolean = true
* extension[reportdetails].extension[locationBasedConstraint].valueBoolean = true
* extension[reportdetails].extension[reportelement][0].extension[label].valueString = "nationalId"
* extension[reportdetails].extension[reportelement][0].extension[name].valueString = "identifier.where(type.coding.where(code='nin')).value"
* extension[reportdetails].extension[reportelement][0].extension[display].valueString = "National Id"
* extension[reportdetails].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][0].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][1].extension[label].valueString = "family"
* extension[reportdetails].extension[reportelement][1].extension[name].valueString = "name.where(use='official').family"
* extension[reportdetails].extension[reportelement][1].extension[display].valueString = "Family name"
* extension[reportdetails].extension[reportelement][1].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][1].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][2].extension[label].valueString = "given"
* extension[reportdetails].extension[reportelement][2].extension[name].valueString = "name.where(use='official').first().given"
* extension[reportdetails].extension[reportelement][2].extension[display].valueString = "Given name"
* extension[reportdetails].extension[reportelement][2].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][2].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][3].extension[label].valueString = "gender"
* extension[reportdetails].extension[reportelement][3].extension[name].valueString = "gender"
* extension[reportdetails].extension[reportelement][3].extension[display].valueString = "Gender"
* extension[reportdetails].extension[reportelement][3].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][3].extension[dropDownFilter].valueBoolean = true

* extension[reportdetails].extension[reportelement][4].extension[label].valueString = "phone"
* extension[reportdetails].extension[reportelement][4].extension[name].valueString = "telecom.where(system='phone').value"
* extension[reportdetails].extension[reportelement][4].extension[display].valueString = "Phone"

* extension[reportdetails].extension[reportelement][5].extension[label].valueString = "email"
* extension[reportdetails].extension[reportelement][5].extension[name].valueString = "telecom.where(system='email').value"
* extension[reportdetails].extension[reportelement][5].extension[display].valueString = "Email"

* extension[reportdetails].extension[reportelement][6].extension[label].valueString = "address"
* extension[reportdetails].extension[reportelement][6].extension[name].valueString = "address.where(use='work').district"
* extension[reportdetails].extension[reportelement][6].extension[display].valueString = "District"

* extension[reportdetails].extension[reportelement][7].extension[label].valueString = "institutionCategory"
* extension[reportdetails].extension[reportelement][7].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-institution-category').valueString"
* extension[reportdetails].extension[reportelement][7].extension[display].valueString = "Institution Category"
* extension[reportdetails].extension[reportelement][7].extension[filter].valueBoolean = true

* extension[reportdetails].extension[reportelement][8].extension[label].valueString = "institutionType"
* extension[reportdetails].extension[reportelement][8].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-institution-type').valueString"
* extension[reportdetails].extension[reportelement][8].extension[display].valueString = "Institution Type"
* extension[reportdetails].extension[reportelement][8].extension[filter].valueBoolean = true


* extension[reportdetails].extension[reportelement][9].extension[label].valueString = "facility"
* extension[reportdetails].extension[reportelement][9].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-facility').valueString"
* extension[reportdetails].extension[reportelement][9].extension[display].valueString = "Facility"
* extension[reportdetails].extension[reportelement][9].extension[filter].valueBoolean = true


* extension[reportdetails].extension[reportelement][10].extension[label].valueString = "facilityType"
* extension[reportdetails].extension[reportelement][10].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-facility-type').valueString"
* extension[reportdetails].extension[reportelement][10].extension[display].valueString = "Facility Type"
* extension[reportdetails].extension[reportelement][10].extension[filter].valueBoolean = true


* extension[reportdetails].extension[reportelement][11].extension[label].valueString = "region"
* extension[reportdetails].extension[reportelement][11].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-region').valueString"
* extension[reportdetails].extension[reportelement][11].extension[display].valueString = "Region"

* extension[reportdetails].extension[reportelement][12].extension[label].valueString = "registrationBoard"
* extension[reportdetails].extension[reportelement][12].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-registration-board').valueString"
* extension[reportdetails].extension[reportelement][12].extension[display].valueString = "Registration Board"
* extension[reportdetails].extension[reportelement][12].extension[filter].valueBoolean = true


* extension[reportdetails].extension[reportelement][13].extension[label].valueString = "practitionerCategory"
* extension[reportdetails].extension[reportelement][13].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-category').valueString"
* extension[reportdetails].extension[reportelement][13].extension[display].valueString = "Health Category"
* extension[reportdetails].extension[reportelement][13].extension[filter].valueBoolean = true


* extension[reportdetails].extension[reportelement][14].extension[label].valueString = "submitingSystem"
* extension[reportdetails].extension[reportelement][14].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-submitting-system').valueString"
* extension[reportdetails].extension[reportelement][14].extension[display].valueString = "Submitting System"
* extension[reportdetails].extension[reportelement][14].extension[filter].valueBoolean = true

* extension[reportdetails].extension[reportelement][15].extension[label].valueString = "identificationNumber"
* extension[reportdetails].extension[reportelement][15].extension[name].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-identification-number).valueString"
* extension[reportdetails].extension[reportelement][15].extension[display].valueString = "Identification Number"
* extension[reportdetails].extension[reportelement][15].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][15].extension[dropDownFilter].valueBoolean = false


* extension[reportlink][0].extension[name].valueString = "role"
* extension[reportlink][0].extension[resource].valueString = "PractitionerRole"
* extension[reportlink][0].extension[linkElement].valueString = "PractitionerRole.practitioner.reference"
* extension[reportlink][0].extension[linkTo].valueString = "practitioner"
* extension[reportlink][0].extension[linkElementSearchParameter].valueString = "practitioner"
* extension[reportlink][0].extension[multiple].valueBoolean = false
* extension[reportlink][0].extension[reportelement][0].extension[label].valueString = "job"
* extension[reportlink][0].extension[reportelement][0].extension[name].valueString = "code.coding.where(system='http://ihris.org/fhir/CodeSystem/ihris-job').display"
* extension[reportlink][0].extension[reportelement][0].extension[display].valueString = "Job Title"
* extension[reportlink][0].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true

// * extension[reportlink][0].extension[reportelement][1].extension[label].valueString = "startDate"
// * extension[reportlink][0].extension[reportelement][1].extension[name].valueString = "period.start"
// * extension[reportlink][0].extension[reportelement][1].extension[display].valueString = "Start Date"
// * extension[reportlink][0].extension[reportelement][1].extension[filter].valueBoolean = true
// * extension[reportlink][0].extension[reportelement][1].extension[dropDownFilter].valueBoolean = false

// * extension[reportlink][0].extension[reportelement][2].extension[label].valueString = "endDate"
// * extension[reportlink][0].extension[reportelement][2].extension[name].valueString = "period.end"
// * extension[reportlink][0].extension[reportelement][2].extension[display].valueString = "End Date"
// * extension[reportlink][0].extension[reportelement][2].extension[filter].valueBoolean = true
// * extension[reportlink][0].extension[reportelement][2].extension[dropDownFilter].valueBoolean = false

* extension[reportlink][0].extension[reportelement][1].extension[label].valueString = "cadre"
* extension[reportlink][0].extension[reportelement][1].extension[name].valueString = "PractitionerRole.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-cadre').valueCoding.display"
* extension[reportlink][0].extension[reportelement][1].extension[display].valueString = "Cadre"
* extension[reportlink][0].extension[reportelement][1].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][1].extension[dropDownFilter].valueBoolean = true


// * extension[reportlink][0].extension[reportelement][5].extension[label].valueString = "fyear"
// * extension[reportlink][0].extension[reportelement][5].extension[name].valueString = "year(period.start)"
// * extension[reportlink][0].extension[reportelement][5].extension[display].valueString = "Year Started"
// * extension[reportlink][0].extension[reportelement][5].extension[filter].valueBoolean = false
// * extension[reportlink][0].extension[reportelement][5].extension[dropDownFilter].valueBoolean = true

* extension[reportlink][1].extension[name].valueString = "facility"
* extension[reportlink][1].extension[resource].valueString = "Location"
* extension[reportlink][1].extension[linkElement].valueString = "Location.id"
* extension[reportlink][1].extension[linkTo].valueString = "role.location.reference"
* extension[reportlink][1].extension[multiple].valueBoolean = false
* extension[reportlink][1].extension[reportelement][0].extension[label].valueString = "dutyPost"
* extension[reportlink][1].extension[reportelement][0].extension[name].valueString = "name"
* extension[reportlink][1].extension[reportelement][0].extension[display].valueString = "Facility/Place of work"
* extension[reportlink][1].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink][1].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true