Profile:        IhrisPractitioner
Parent:         Practitioner
Id:             ihris-practitioner
Title:          "iHRIS Practitioner"
Description:    "iHRIS profile of Practitioner."
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
* telecom 0..* MS
* telecom ^label = "Telecom"
* telecom.system MS
* telecom.system ^label = "Contact Type"
* telecom.use MS
* telecom.use ^label = "Use"
* telecom.value MS
* telecom.value ^label = "Value"
* address 0..* MS
* address ^label = "Address"
* address.use MS
* address.use ^label = "Use"
* address.type MS
* address.type ^label = "Type"
* address.line MS
* address.line ^label = "Line"
* address.city MS
* address.city ^label = "City"
* address.district MS
* address.district ^label = "District"
* address.state MS
* address.state ^label = "State"
* address.postalCode MS
* address.postalCode ^label = "Postal Code"
* address.country MS
* address.country ^label = "Country"
* gender 1..1 MS
* gender ^label = "Gender"
* birthDate MS
* birthDate ^label = "Birth Date"
* communication 0..* MS
* communication ^label = "Communication"
* communication.coding 1..1 MS
* communication.coding ^label = "Language"
* extension contains 
    IhrisPractitionerResidence named residence 0..1 MS and
    IhrisPractitionerNationality named nationality 0..1 and
    IhrisPractitionerMaritalStatus named maritalStatus 0..1 and
    IhrisPractitionerDependents named dependents 0..1 
* extension[residence].valueReference.reference MS


Extension:      IhrisPractitionerResidence
Id:             ihris-practitioner-residence
Title:          "iHRIS Practitioner Residence"
Description:    "iHRIS extension for Practitioner residence."
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

Extension:      IhrisPractitionerNationality
Id:             ihris-practitioner-nationality
Title:          "iHRIS Practitioner Nationality"
Description:    "iHRIS extension for Practitioner nationality."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Nationality"
* valueCoding from http://hl7.org/fhir/ValueSet/iso3166-1-2 (required)

Extension:      IhrisPractitionerMaritalStatus
Id:             ihris-practitioner-marital-status
Title:          "iHRIS Practitioner Marital Status"
Description:    "iHRIS extension for Practitioner marital status."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Marital Status"
* valueCoding from http://hl7.org/fhir/ValueSet/marital-status (required)

Extension:      IhrisPractitionerDependents
Id:             ihris-practitioner-dependents
Title:          "iHRIS Practitioner Dependents"
Description:    "iHRIS extension for Practitioner number of dependents."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only positiveInt
* valuePositiveInt 1..1 MS
* valuePositiveInt ^label = "Number of Dependents"

Instance:       IhrisPractitionerQuestionnaire
InstanceOf:     Questionnaire
Usage:          #definition
* title = "iHRIS Practitioner Questionnaire"
* description = "iHRIS Practitioner initial data entry questionnaire."
* id = "ihris-practitioner"
* name = "ihris-practitioner"
* status = #active
* date = 2020-06-22
* purpose = "Data entry page for practitioners."

* item[0].linkId = "Practitioner"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner"
* item[0].text = "Health Worker|Primary demographic details"
* item[0].type = #group

* item[0].item[0].linkId = "Practitioner.name[0]"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#name"
* item[0].item[0].text = "Name"
* item[0].item[0].type = #group

* item[0].item[0].item[0].linkId = "Practitioner.name[0].use"
* item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#name.use"
* item[0].item[0].item[0].text = "Name Usage"
* item[0].item[0].item[0].type = #choice
* item[0].item[0].item[0].required = true
* item[0].item[0].item[0].repeats = false
* item[0].item[0].item[0].readOnly = true
* item[0].item[0].item[0].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
* item[0].item[0].item[0].answerOption.initialSelected = true

* item[0].item[0].item[1].linkId = "Practitioner.name[0].family"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#name.family"
* item[0].item[0].item[1].text = "Family Name"
* item[0].item[0].item[1].type = #string
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false

* item[0].item[0].item[2].linkId = "Practitioner.name[0].given[0]"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#name.given"
* item[0].item[0].item[2].text = "Given Name(s)"
* item[0].item[0].item[2].type = #string
* item[0].item[0].item[2].required = true
* item[0].item[0].item[2].repeats = true

* item[0].item[0].item[3].linkId = "Practitioner.name[0].prefix"
* item[0].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#name.prefix"
* item[0].item[0].item[3].text = "Prefix"
* item[0].item[0].item[3].type = #string
* item[0].item[0].item[3].required = false
* item[0].item[0].item[3].repeats = true

* item[0].item[0].item[4].linkId = "Practitioner.name[0].suffix"
* item[0].item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#name.suffix"
* item[0].item[0].item[4].text = "Suffix"
* item[0].item[0].item[4].type = #string
* item[0].item[0].item[4].required = false
* item[0].item[0].item[4].repeats = true

* item[0].item[1].linkId = "Practitioner.birthDate"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#birthDate"
* item[0].item[1].text = "Date of Birth"
* item[0].item[1].type = #date
* item[0].item[1].required = false
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Practitioner.gender"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#gender"
* item[0].item[2].text = "Gender"
* item[0].item[2].type = #choice
* item[0].item[2].answerValueSet = "http://hl7.org/fhir/ValueSet/administrative-gender"
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Practitioner.extension[0]"
* item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#extension:residence"
* item[0].item[3].text = "Residence"
* item[0].item[3].type = #reference
* item[0].item[3].required = false
* item[0].item[3].repeats = false

* item[1].linkId = "__Practitioner:contact"
* item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner"
* item[1].text = "Contact Details|Address, email, phone numbers"
* item[1].type = #group

* item[1].item[0].linkId = "Practitioner.address[0]"
* item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#address"
* item[1].item[0].text = "Home Address"
* item[1].item[0].type = #group

* item[1].item[0].item[0].linkId = "Practitioner.address[0].use"
* item[1].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#address.use"
* item[1].item[0].item[0].text = "Address Use"
* item[1].item[0].item[0].type = #choice
* item[1].item[0].item[0].required = true
* item[1].item[0].item[0].repeats = false
* item[1].item[0].item[0].readOnly = true
* item[1].item[0].item[0].answerOption.valueCoding = http://hl7.org/fhir/address-use#home
* item[1].item[0].item[0].answerOption.initialSelected = true

* item[1].item[0].item[1].linkId = "Practitioner.address[0].type"
* item[1].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#address.type"
* item[1].item[0].item[1].text = "Address Type"
* item[1].item[0].item[1].type = #choice
* item[1].item[0].item[1].required = true
* item[1].item[0].item[1].repeats = false
* item[1].item[0].item[1].readOnly = true
* item[1].item[0].item[1].answerOption.valueCoding = http://hl7.org/fhir/address-type#physical
* item[1].item[0].item[1].answerOption.initialSelected = true

* item[1].item[0].item[2].linkId = "Practitioner.address[0].text"
* item[1].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#address.text"
* item[1].item[0].item[2].text = "Address"
* item[1].item[0].item[2].type = #string
* item[1].item[0].item[2].required = false
* item[1].item[0].item[2].repeats = false

* item[1].item[1].linkId = "Practitioner.telecom[0]"
* item[1].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom"
* item[1].item[1].text = "Mobile Phone"
* item[1].item[1].type = #group

* item[1].item[1].item[0].linkId = "Practitioner.telecom[0].use"
* item[1].item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom.use"
* item[1].item[1].item[0].text = "Telecom Use"
* item[1].item[1].item[0].type = #choice
* item[1].item[1].item[0].required = true
* item[1].item[1].item[0].repeats = false
* item[1].item[1].item[0].readOnly = true
* item[1].item[1].item[0].answerOption.valueCoding = http://hl7.org/fhir/contact-point-use#mobile
* item[1].item[1].item[0].answerOption.initialSelected = true

* item[1].item[1].item[1].linkId = "Practitioner.telecom[0].system"
* item[1].item[1].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom.system"
* item[1].item[1].item[1].text = "Telecom System"
* item[1].item[1].item[1].type = #choice
* item[1].item[1].item[1].required = true
* item[1].item[1].item[1].repeats = false
* item[1].item[1].item[1].readOnly = true
* item[1].item[1].item[1].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#phone
* item[1].item[1].item[1].answerOption.initialSelected = true

* item[1].item[1].item[2].linkId = "Practitioner.telecom[0].value"
* item[1].item[1].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom.value"
* item[1].item[1].item[2].text = "Mobile Phone"
* item[1].item[1].item[2].type = #string
* item[1].item[1].item[2].required = false
* item[1].item[1].item[2].repeats = false

* item[1].item[2].linkId = "Practitioner.telecom[1]"
* item[1].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom"
* item[1].item[2].text = "Work Email"
* item[1].item[2].type = #group

* item[1].item[2].item[0].linkId = "Practitioner.telecom[1].use"
* item[1].item[2].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom.use"
* item[1].item[2].item[0].text = "Telecom Use"
* item[1].item[2].item[0].type = #choice
* item[1].item[2].item[0].required = true
* item[1].item[2].item[0].repeats = false
* item[1].item[2].item[0].readOnly = true
* item[1].item[2].item[0].answerOption.valueCoding = http://hl7.org/fhir/contact-point-use#work
* item[1].item[2].item[0].answerOption.initialSelected = true

* item[1].item[2].item[1].linkId = "Practitioner.telecom[1].system"
* item[1].item[2].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom.system"
* item[1].item[2].item[1].text = "Telecom System"
* item[1].item[2].item[1].type = #choice
* item[1].item[2].item[1].required = true
* item[1].item[2].item[1].repeats = false
* item[1].item[2].item[1].readOnly = true
* item[1].item[2].item[1].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#email
* item[1].item[2].item[1].answerOption.initialSelected = true

* item[1].item[2].item[2].linkId = "Practitioner.telecom[1].value"
* item[1].item[2].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#telecom.value"
* item[1].item[2].item[2].text = "Work Email"
* item[1].item[2].item[2].type = #string
* item[1].item[2].item[2].required = false
* item[1].item[2].item[2].repeats = false

* item[2].linkId = "PractitionerRole"
* item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role"
* item[2].text = "Position|Position the person holds"
* item[2].type = #group

* item[2].item[0].linkId = "PractitionerRole.code"
* item[2].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#code"
* item[2].item[0].text = "Job Title"
* item[2].item[0].type = #choice
* item[2].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job"
* item[2].item[0].required = true
* item[2].item[0].repeats = false

* item[2].item[1].linkId = "PractitionerRole.period.start"
* item[2].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#period.start"
* item[2].item[1].text = "Start Date"
* item[2].item[1].type = #date
* item[2].item[1].required = true
* item[2].item[1].repeats = false

* item[2].item[2].linkId = "PractitionerRole.period.end"
* item[2].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role#period.end"
* item[2].item[2].text = "End Date"
* item[2].item[2].type = #date
* item[2].item[2].required = false
* item[2].item[2].repeats = false

