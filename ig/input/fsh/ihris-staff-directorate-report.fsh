Alias: $ihris-resource = http://ihris.org/fhir/ValueSet/ihris-resource

Instance: ihris-es-report-staff-directorate
InstanceOf: Basic
Usage: #example
* extension.url = "http://ihris.org/fhir/StructureDefinition/iHRISReportDetails"
* extension.extension[0].url = "label"
* extension.extension[=].valueString = "Staff Directorate"
* extension.extension[+].url = "displayCheckbox"
* extension.extension[=].valueBoolean = false
* extension.extension[+].url = "name"
* extension.extension[=].valueString = "staffdirectorate"
* extension.extension[+].url = "locationBasedConstraint"
* extension.extension[=].valueBoolean = true
* extension.extension[+].url = "resource"
* extension.extension[=].valueString = "Practitioner"
* extension.extension[+].url = "resourcePage"
* extension.extension[=].valueString = "practitioner"
* extension.extension[+].url = "http://ihris.org/fhir/StructureDefinition/iHRISReportElement"
* extension.extension[=].extension[0].url = "display"
* extension.extension[=].extension[=].valueString = "Fullname"
* extension.extension[=].extension[+].url = "name"
* extension.extension[=].extension[=].valueString = "fullname"
* extension.extension[=].extension[+].url = "displayformat"
* extension.extension[=].extension[=].extension[0].url = "format"
* extension.extension[=].extension[=].extension[=].valueString = "%s, %s"
* extension.extension[=].extension[=].extension[+].url = "order"
* extension.extension[=].extension[=].extension[=].valueString = "given, family"
* extension.extension[=].extension[=].extension[+].url = "paths:given:fhirpath"
* extension.extension[=].extension[=].extension[=].valueString = "name.where(use='official').given"
* extension.extension[=].extension[=].extension[+].url = "paths:given:join"
* extension.extension[=].extension[=].extension[=].valueString = "-"
* extension.extension[=].extension[=].extension[+].url = "paths:family:fhirpath"
* extension.extension[=].extension[=].extension[=].valueString = "name.where(use='official').family"
* extension.extension[=].extension[+].url = "filter"
* extension.extension[=].extension[=].valueBoolean = true
* extension.extension[=].extension[+].url = "dropDownFilter"
* extension.extension[=].extension[=].valueBoolean = false
* extension.extension[=].extension[+].url = "order"
* extension.extension[=].extension[=].valueInteger = 0
* extension.extension[+].url = "http://ihris.org/fhir/StructureDefinition/iHRISReportElement"
* extension.extension[=].extension[0].url = "display"
* extension.extension[=].extension[=].valueString = "Gender"
* extension.extension[=].extension[+].url = "name"
* extension.extension[=].extension[=].valueString = "gender"
* extension.extension[=].extension[+].url = "fhirpath"
* extension.extension[=].extension[=].valueString = "gender"
* extension.extension[=].extension[+].url = "filter"
* extension.extension[=].extension[=].valueBoolean = true
* extension.extension[=].extension[+].url = "dropDownFilter"
* extension.extension[=].extension[=].valueBoolean = true
* extension.extension[=].extension[+].url = "order"
* extension.extension[=].extension[=].valueInteger = 1
* extension.extension[+].url = "http://ihris.org/fhir/StructureDefinition/iHRISReportElement"
* extension.extension[=].extension[0].url = "display"
* extension.extension[=].extension[=].valueString = "Date of Birth"
* extension.extension[=].extension[+].url = "name"
* extension.extension[=].extension[=].valueString = "dob"
* extension.extension[=].extension[+].url = "fhirpath"
* extension.extension[=].extension[=].valueString = "birthDate"
* extension.extension[=].extension[+].url = "filter"
* extension.extension[=].extension[=].valueBoolean = true
* extension.extension[=].extension[+].url = "dropDownFilter"
* extension.extension[=].extension[=].valueBoolean = false
* extension.extension[=].extension[+].url = "order"
* extension.extension[=].extension[=].valueInteger = 4
* extension.extension[+].url = "http://ihris.org/fhir/StructureDefinition/iHRISReportElement"
* extension.extension[=].extension[0].url = "display"
* extension.extension[=].extension[=].valueString = "Phone Number"
* extension.extension[=].extension[+].url = "name"
* extension.extension[=].extension[=].valueString = "phone"
* extension.extension[=].extension[+].url = "fhirpath"
* extension.extension[=].extension[=].valueString = "telecom.where(system='phone').value"
* extension.extension[=].extension[+].url = "filter"
* extension.extension[=].extension[=].valueBoolean = true
* extension.extension[=].extension[+].url = "order"
* extension.extension[=].extension[=].valueInteger = 2
* extension.extension[+].url = "http://ihris.org/fhir/StructureDefinition/iHRISReportElement"
* extension.extension[=].extension[0].url = "name"
* extension.extension[=].extension[=].valueString = "ihris-related-group"
* extension.extension[=].extension[+].url = "fhirpath"
* extension.extension[=].extension[=].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension.where(url='location').valueString"
* code = $ihris-resource#iHRISRelationship
* code.text = "iHRISRelationship"