Profile:        IhrisPractitionerRole
Parent:         PractitionerRole
Id:             ihris-practitioner-role
Title:          "iHRIS Practitioner Role"
Description:    "iHRIS profile of Practitioner Role."
* identifier 0..* MS
* identifier ^label = "Identifier"
* identifier.use MS
* identifier.use ^label = "Use"
* identifier.type MS
* identifier.type ^label = "Type"
* identifier.type.coding 1..1 MS
* identifier.system MS
* identifier.system ^label = "System"
* identifier.value MS
* identifier.value ^label = "Value"
* active 1..1 MS
* active ^label = "Active"
* period 1..1 MS
* period.start 1..1 MS
* period.start ^label = "Start Date"
* period.end 0..1 MS
* period.end ^label = "End Date"
* practitioner 0..1 MS
* practitioner ^label = "Health Worker"
* code 1..* MS
* code ^label = "Job"
* code from http://ihris.org/fhir/ValueSet/ihris-job
* code.coding 1..1 MS
* specialty 0..* MS
* specialty ^label = "Specialty"
