Profile:      IhrisTestPractitioner
Parent:       Practitioner
Id:           ihris-test-practitioner
Description:  "iHRIS profile of Practitioner for tests."
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
* name 1..* MS
* name ^label = "Name"
* name.use MS
* name.use ^label = "Use"
* name.family MS
* name.family ^label = "Family"
* name.given MS
* name.given ^label = "Given Name"
* name.prefix MS
* name.prefix ^label = "Prefix"
* name.suffix MS
* name.suffix ^label = "Suffix"
* gender 1..1 MS
* gender ^label = "Gender"
* birthDate MS
* birthDate ^label = "Birth Date"
* extension contains
    IhrisTestResidence named residence 0..1 MS and
    IhrisTestDependent named dependent 0..* MS
* extension[residence].valueReference.reference MS
* extension[dependent] ^label = "Dependent Details"
* extension[dependent].extension[name].valueString MS
* extension[dependent].extension[birthDate].valueDate MS
* extension[dependent].extension[gender].valueCode MS

Extension:      IhrisTestResidence
Id:             ihris-test-residence
Title:          "iHRIS Practitioner Residence"
Description:    "iHRIS Test extension for Practitioner residence."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Reference
* valueReference 1..1 MS
* valueReference ^label = "Residence"
* valueReference only Reference(Location)
* valueReference.reference 1..1 MS
* valueReference.reference ^label = "Location"
* valueReference.type 0..0
* valueReference.identifier 0..0
* valueReference.display 0..0

Extension:      IhrisTestDependent
Id:             ihris-test-dependent
Title:          "iHRIS Practitioner Dependent Detail"
Description:    "iHRIS Test extension for Practitioner Dependent Detail."
* ^context.type = #element
* ^context.expression = "Practitioner"
* extension contains name 1..* MS and
    birthDate 1..1 MS and
    gender 1..1 MS
* extension[name].value[x] only string
* extension[name].valueString 1..1 MS
* extension[name].valueString ^label = "Dependent's Name"
* extension[birthDate].value[x] only date
* extension[birthDate].valueDate 1..1 MS
* extension[birthDate].valueDate ^label = "Dependent's Date of Birth"
* extension[gender].value[x] only code
* extension[gender].valueCode 1..1 MS
* extension[gender].valueCode from http://hl7.org/fhir/ValueSet/administrative-gender (required)
* extension[gender].valueCode ^label = "Dependent's Gender"

Profile:        IhrisTestPractitionerRole
Parent:         PractitionerRole
Id:             ihris-test-practitioner-role
Title:          "iHRIS Test Practitioner Role"
Description:    "iHRIS Test profile of Practitioner Role."
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
* period ^label = "Period of Employment"
* period.start 1..1 MS
* period.start ^label = "Start Date"
* period.end 0..1 MS
* period.end ^label = "End Date"
* practitioner 0..1 MS
* practitioner ^label = "Health Worker"
* code 1..1 MS
* code ^label = "Job"
* code from http://ihris.org/fhir/ValueSet/ihris-job
* code.coding 1..1 MS
* specialty 0..* MS
* specialty ^label = "Specialty"
* location 1..1 MS
* location ^label = "Facility"

CodeSystem:     IhrisTestCodeSystem
Id:             ihris-test-codesystem
Title:          "iHRIS Test CodeSystem"
* ^property[0].code = #prop1
* ^property[0].description = "First Property"
* ^property[0].type = #string
* ^property[1].code = #prop2
* ^property[1].uri = "http://ihris.org/fhir/ValueSet/test"
* ^property[1].description = "Second Property"
* ^property[1].type = #Coding
* #one  "One"   "First one" 
* #two  "Two"   "Second one"

Instance:       ihris-page-test-practitioner
InstanceOf:     IhrisPage
Title:          "iHRIS Test Practitioner Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-test-practitioner)
* extension[display].extension[search][0].valueString = "Surname|name.where(use='official').family"
* extension[display].extension[search][1].valueString = "Given Name(s)|name.where(use='official').given"
* extension[display].extension[search][2].valueString = "Birth Date|birthDate"
* extension[display].extension[search][3].valueString = "Gender|gender"
* extension[display].extension[filter][0].valueString = "Name|name:contains"
* extension[display].extension[filter][1].valueString = "Gender|gender"
* extension[section][0].extension[title].valueString = "Health Worker"
* extension[section][0].extension[description].valueString = "Primary demographic details"
* extension[section][0].extension[name].valueString = "Practitioner"
* extension[section][0].extension[field][0].valueString = "Practitioner.name"
* extension[section][0].extension[field][1].valueString = "Practitioner.name.given"
* extension[section][0].extension[field][2].valueString = "Practitioner.name.family"
* extension[section][0].extension[field][3].valueString = "Practitioner.birthDate"
* extension[section][0].extension[field][4].valueString = "Practitioner.gender"
* extension[section][0].extension[field][5].valueString = "Practitioner.extension:residence"
* extension[section][1].extension[title].valueString = "Identifiers"
* extension[section][1].extension[description].valueString = "Personal identifiers"
* extension[section][1].extension[name].valueString = "identifiers"
* extension[section][1].extension[field][0].valueString = "Practitioner.identifier"
* extension[section][1].extension[field][1].valueString = "Practitioner.identifier.use"
* extension[section][1].extension[field][2].valueString = "Practitioner.identifier.type"
* extension[section][1].extension[field][3].valueString = "Practitioner.identifier.value"
* extension[section][1].extension[field][4].valueString = "Practitioner.identifier.system"
* extension[section][2].extension[title].valueString = "Position"
* extension[section][2].extension[description].valueString = "Position the person holds"
* extension[section][2].extension[name].valueString = "position"
* extension[section][2].extension[field][0].valueString = "PractitionerRole.code"
* extension[section][2].extension[resource].extension[resource].valueReference = Reference(StructureDefinition/ihris-test-practitioner-role)
* extension[section][2].extension[resource].extension[linkfield].valueString = "PractitionerRole.practitioner"
* extension[section][2].extension[resource].extension[column][0].extension[header].valueString = "Job"
* extension[section][2].extension[resource].extension[column][0].extension[field].valueString = "PractitionerRole.code.coding[0]"
* extension[section][2].extension[resource].extension[column][1].extension[header].valueString = "Start Date"
* extension[section][2].extension[resource].extension[column][1].extension[field].valueString = "PractitionerRole.period.start"

Instance:       ihris-page-test-codesystem
InstanceOf:     IhrisPage
Title:          "iHRIS Test CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-test-codesystem)
* extension[display].extension[search][0].valueString = "Property One|prop1"
* extension[display].extension[search][1].valueString = "Property Two|prop2"
* extension[section][0].extension[title].valueString = "Test CodeSystem"
* extension[section][0].extension[description].valueString = "Code system details"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.code"
* extension[section][0].extension[field][1].valueString = "CodeSystem.definition"
* extension[section][0].extension[field][2].valueString = "CodeSystem.display"
* extension[section][0].extension[field][3].valueString = "CodeSystem.prop2"
* extension[section][0].extension[field][4].valueString = "CodeSystem.prop1"

