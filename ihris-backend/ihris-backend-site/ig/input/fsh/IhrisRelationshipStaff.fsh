Instance:       ihris-es-report-staff
InstanceOf:     IhrisRelationship
Title:          "Staff Relationship"
Usage:          #example

* code.text = "iHRISRelationship"
* code.coding = #iHRISRelationship
* subject.reference = "StructureDefinition/ihris-practitioner"
* extension[reportdetails].extension[name].valueString = "practitioner"
* extension[reportdetails].extension[label].valueString = "Staff Report"
* extension[reportdetails].extension[resource].valueString = "Practitioner"
* extension[reportdetails].extension[resourcePage].valueString = "practitioner"

* extension[reportdetails].extension[resourcePageID].valueString = "id"
* extension[reportdetails].extension[parameters][0].extension[esFieldName].valueString = "ES_DATA_ID"
* extension[reportdetails].extension[parameters][0].extension[parameter].valueString = "idParma"
* extension[reportdetails].extension[parameters][1].extension[esFieldName].valueString = "ES_DATA_NAME"
* extension[reportdetails].extension[parameters][1].extension[parameter].valueString = "nameParam"

* extension[reportdetails].extension[query].valueString = "active=true"
* extension[reportdetails].extension[displayCheckbox].valueBoolean = true
* extension[reportdetails].extension[locationBasedConstraint].valueBoolean = true

* extension[reportdetails].extension[reportelement][0].extension[name].valueString = "Id"
* extension[reportdetails].extension[reportelement][0].extension[fhirpath].valueString = "identifier.where(type.coding.where(code='NationalID' or code='Passport' or code='employeeId')).value"
* extension[reportdetails].extension[reportelement][0].extension[display].valueString = "Identifier(NID/PP/EmpID)"
* extension[reportdetails].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][0].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][1].extension[name].valueString = "prefix"
* extension[reportdetails].extension[reportelement][1].extension[fhirpath].valueString = "name.prefix"
* extension[reportdetails].extension[reportelement][1].extension[display].valueString = "Prefix"
* extension[reportdetails].extension[reportelement][1].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][1].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][2].extension[name].valueString = "given"
* extension[reportdetails].extension[reportelement][2].extension[fhirpath].valueString = "name.where(use='official').first().given"
* extension[reportdetails].extension[reportelement][2].extension[display].valueString = "Given name"
* extension[reportdetails].extension[reportelement][2].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][2].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][3].extension[name].valueString = "family"
* extension[reportdetails].extension[reportelement][3].extension[fhirpath].valueString = "name.where(use='official').family"
* extension[reportdetails].extension[reportelement][3].extension[display].valueString = "Family name"
* extension[reportdetails].extension[reportelement][3].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][3].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][4].extension[name].valueString = "gender"
* extension[reportdetails].extension[reportelement][4].extension[fhirpath].valueString = "gender"
* extension[reportdetails].extension[reportelement][4].extension[display].valueString = "Gender"
* extension[reportdetails].extension[reportelement][4].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][4].extension[dropDownFilter].valueBoolean = true

* extension[reportdetails].extension[reportelement][5].extension[name].valueString = "birthDate"
* extension[reportdetails].extension[reportelement][5].extension[fhirpath].valueString = "birthDate"
* extension[reportdetails].extension[reportelement][5].extension[display].valueString = "BirthDate"
* extension[reportdetails].extension[reportelement][5].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][5].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][6].extension[name].valueString = "residence"
* extension[reportdetails].extension[reportelement][6].extension[fhirpath].valueString = "Practitioner.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-residence').valueReference.reference"
* extension[reportdetails].extension[reportelement][6].extension[display].valueString = "Residence"
* extension[reportdetails].extension[reportelement][6].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][6].extension[dropDownFilter].valueBoolean = true

* extension[reportdetails].extension[reportelement][7].extension[name].valueString = "nationality"
* extension[reportdetails].extension[reportelement][7].extension[fhirpath].valueString = "Practitioner.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-nationality').valueCoding.display"
* extension[reportdetails].extension[reportelement][7].extension[display].valueString = "Citizenship"
* extension[reportdetails].extension[reportelement][7].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][7].extension[dropDownFilter].valueBoolean = true

* extension[reportdetails].extension[reportelement][8].extension[name].valueString = "phone"
* extension[reportdetails].extension[reportelement][8].extension[fhirpath].valueString = "Practitioner.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-phone').valueString"
* extension[reportdetails].extension[reportelement][8].extension[display].valueString = "Phone Number"
* extension[reportdetails].extension[reportelement][8].extension[filter].valueBoolean = false
* extension[reportdetails].extension[reportelement][8].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][9].extension[name].valueString = "martialStatus"
* extension[reportdetails].extension[reportelement][9].extension[fhirpath].valueString = "Practitioner.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-marital-status').valueCoding.display"
* extension[reportdetails].extension[reportelement][9].extension[display].valueString = "Marital Status"
* extension[reportdetails].extension[reportelement][9].extension[filter].valueBoolean = true
* extension[reportdetails].extension[reportelement][9].extension[dropDownFilter].valueBoolean = true

* extension[reportdetails].extension[reportelement][10].extension[name].valueString = "ihris-related-group"
* extension[reportdetails].extension[reportelement][10].extension[fhirpath].valueString = "Practitioner.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension.where(url='location').valueString"
* extension[reportdetails].extension[reportelement][10].extension[filter].valueBoolean = false
* extension[reportdetails].extension[reportelement][10].extension[dropDownFilter].valueBoolean = false

* extension[reportdetails].extension[reportelement][11].extension[name].valueString = "res-id"
* extension[reportdetails].extension[reportelement][11].extension[fhirpath].valueString = "Practitioner.id"
* extension[reportdetails].extension[reportelement][11].extension[filter].valueBoolean = false
* extension[reportdetails].extension[reportelement][11].extension[dropDownFilter].valueBoolean = false

* extension[reportlink][0].extension[name].valueString = "role"
* extension[reportlink][0].extension[resource].valueString = "PractitionerRole"
* extension[reportlink][0].extension[linkElement].valueString = "PractitionerRole.practitioner.reference"
* extension[reportlink][0].extension[linkTo].valueString = "practitioner"
* extension[reportlink][0].extension[linkElementSearchParameter].valueString = "practitioner"
* extension[reportlink][0].extension[multiple].valueBoolean = false

* extension[reportlink][0].extension[reportelement][0].extension[name].valueString = "job"
* extension[reportlink][0].extension[reportelement][0].extension[fhirpath].valueString = "code.coding.display"
* extension[reportlink][0].extension[reportelement][0].extension[display].valueString = "Job Title"
* extension[reportlink][0].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true

* extension[reportlink][0].extension[reportelement][1].extension[name].valueString = "startDate"
* extension[reportlink][0].extension[reportelement][1].extension[fhirpath].valueString = "period.start"
* extension[reportlink][0].extension[reportelement][1].extension[display].valueString = "Start Date"
* extension[reportlink][0].extension[reportelement][1].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][1].extension[dropDownFilter].valueBoolean = false

* extension[reportlink][0].extension[reportelement][2].extension[name].valueString = "endDate"
* extension[reportlink][0].extension[reportelement][2].extension[fhirpath].valueString = "period.end"
* extension[reportlink][0].extension[reportelement][2].extension[display].valueString = "End Date"
* extension[reportlink][0].extension[reportelement][2].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][2].extension[dropDownFilter].valueBoolean = false

* extension[reportlink][0].extension[reportelement][3].extension[name].valueString = "speciality"
* extension[reportlink][0].extension[reportelement][3].extension[fhirpath].valueString = "speciality.coding.display"
* extension[reportlink][0].extension[reportelement][3].extension[display].valueString = "speciality"
* extension[reportlink][0].extension[reportelement][3].extension[filter].valueBoolean = true
* extension[reportlink][0].extension[reportelement][3].extension[dropDownFilter].valueBoolean = true

* extension[reportlink][1].extension[name].valueString = "facility"
* extension[reportlink][1].extension[resource].valueString = "Location"
* extension[reportlink][1].extension[linkElement].valueString = "Location.id"
* extension[reportlink][1].extension[linkTo].valueString = "role.location.reference"
* extension[reportlink][1].extension[multiple].valueBoolean = false
* extension[reportlink][1].extension[reportelement][0].extension[name].valueString = "dutyPost"
* extension[reportlink][1].extension[reportelement][0].extension[fhirpath].valueString = "name"
* extension[reportlink][1].extension[reportelement][0].extension[display].valueString = "Facility/Place of work"
* extension[reportlink][1].extension[reportelement][0].extension[filter].valueBoolean = true
* extension[reportlink][1].extension[reportelement][0].extension[dropDownFilter].valueBoolean = true