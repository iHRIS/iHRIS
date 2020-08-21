Instance:       IhrisTestQuestionnaire
InstanceOf:     Questionnaire
Usage:          #definition
* title = "iHRIS Test Questionnaire"
* description = "iHRIS Test initial data entry questionnaire."
* id = "ihris-test"
* url = "http://ihris.org/fhir/Questionnaire/ihris-test"
* name = "ihris-test"
* status = #active
* date = 2020-06-24
* purpose = "Data entry page for test."

* item[0].linkId = "Practitioner"
* item[0].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner"
* item[0].text = "Health Worker|Primary demographic details"
* item[0].type = #group

* item[0].item[0].linkId = "Practitioner.name[0]"
* item[0].item[0].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name"
* item[0].item[0].text = "Name"
* item[0].item[0].type = #group

* item[0].item[0].item[0].linkId = "Practitioner.name[0].use"
* item[0].item[0].item[0].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name.use"
* item[0].item[0].item[0].text = "Name Usage"
* item[0].item[0].item[0].type = #choice
* item[0].item[0].item[0].required = true
* item[0].item[0].item[0].repeats = false
* item[0].item[0].item[0].readOnly = true
* item[0].item[0].item[0].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
* item[0].item[0].item[0].answerOption.initialSelected = true

* item[0].item[0].item[1].linkId = "Practitioner.name[0].family"
* item[0].item[0].item[1].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name.family"
* item[0].item[0].item[1].text = "Family Name"
* item[0].item[0].item[1].type = #string
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false

* item[0].item[0].item[2].linkId = "Practitioner.name[0].given[0]"
* item[0].item[0].item[2].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.name.given"
* item[0].item[0].item[2].text = "Given Name(s)"
* item[0].item[0].item[2].type = #string
* item[0].item[0].item[2].required = true
* item[0].item[0].item[2].repeats = true

* item[0].item[1].linkId = "Practitioner.birthDate"
* item[0].item[1].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.birthDate"
* item[0].item[1].text = "Date of Birth"
* item[0].item[1].type = #date
* item[0].item[1].required = false
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Practitioner.gender"
* item[0].item[2].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.gender"
* item[0].item[2].text = "Gender"
* item[0].item[2].type = #choice
* item[0].item[2].answerValueSet = "http://hl7.org/fhir/ValueSet/administrative-gender"
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[1].linkId = "__Practitioner:contact"
* item[1].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner"
* item[1].text = "Contact Details|Address, email, phone numbers"
* item[1].type = #group

* item[1].item[0].linkId = "Practitioner.telecom[0].use"
* item[1].item[0].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.use"
* item[1].item[0].text = "Telecom Use"
* item[1].item[0].type = #choice
* item[1].item[0].required = true
* item[1].item[0].repeats = false
* item[1].item[0].readOnly = true
* item[1].item[0].answerOption.valueCoding = http://hl7.org/fhir/contact-point-use#mobile
* item[1].item[0].answerOption.initialSelected = true

* item[1].item[1].linkId = "Practitioner.telecom[0].system"
* item[1].item[1].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.system"
* item[1].item[1].text = "Telecom System"
* item[1].item[1].type = #choice
* item[1].item[1].required = true
* item[1].item[1].repeats = false
* item[1].item[1].readOnly = true
* item[1].item[1].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#phone
* item[1].item[1].answerOption.initialSelected = true

* item[1].item[2].linkId = "Practitioner.telecom[0].value"
* item[1].item[2].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.value"
* item[1].item[2].text = "Mobile Phone"
* item[1].item[2].type = #string
* item[1].item[2].required = false
* item[1].item[2].repeats = false

* item[1].item[3].linkId = "Practitioner.telecom[1].use"
* item[1].item[3].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.use"
* item[1].item[3].text = "Telecom Use"
* item[1].item[3].type = #choice
* item[1].item[3].required = true
* item[1].item[3].repeats = false
* item[1].item[3].readOnly = true
* item[1].item[3].answerOption.valueCoding = http://hl7.org/fhir/contact-point-use#work
* item[1].item[3].answerOption.initialSelected = true

* item[1].item[4].linkId = "Practitioner.telecom[1].system"
* item[1].item[4].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.system"
* item[1].item[4].text = "Telecom System"
* item[1].item[4].type = #choice
* item[1].item[4].required = true
* item[1].item[4].repeats = false
* item[1].item[4].readOnly = true
* item[1].item[4].answerOption.valueCoding = http://hl7.org/fhir/contact-point-system#email
* item[1].item[4].answerOption.initialSelected = true

* item[1].item[5].linkId = "Practitioner.telecom[1].value"
* item[1].item[5].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.telecom.value"
* item[1].item[5].text = "Work Email"
* item[1].item[5].type = #string
* item[1].item[5].required = false
* item[1].item[5].repeats = false

* item[2].linkId = "PractitionerRole"
* item[2].definition = "http://hl7.org/fhir/StructureDefinition/PractitionerRole"
* item[2].text = "Position|Position the person holds"
* item[2].type = #group

* item[2].item[0].linkId = "PractitionerRole.code"
* item[2].item[0].definition = "http://hl7.org/fhir/StructureDefinition/PractitionerRole#PractitionerRole.code"
* item[2].item[0].text = "Job Title"
* item[2].item[0].type = #choice
* item[2].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job"
* item[2].item[0].required = true
* item[2].item[0].repeats = false

* item[2].item[1].linkId = "PractitionerRole.period.start"
* item[2].item[1].definition = "http://hl7.org/fhir/StructureDefinition/PractitionerRole#PractitionerRole.period.start"
* item[2].item[1].text = "Start Date"
* item[2].item[1].type = #date
* item[2].item[1].required = true
* item[2].item[1].repeats = false

* item[3].linkId = "Practitioner.identifier"
* item[3].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner"
* item[3].text = "Identifiers|Identifiers for the practitioner"
* item[3].type = #group

* item[3].item[0].linkId = "Practitioner.identifier[0]"
* item[3].item[0].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier"
* item[3].item[0].text = "Identifier"
* item[3].item[0].type = #group
* item[3].item[0].repeats = true
* item[3].item[0].required = false

* item[3].item[0].item[0].linkId = "Practitioner.identifier[0].system"
* item[3].item[0].item[0].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier.system"
* item[3].item[0].item[0].text = "System"
* item[3].item[0].item[0].type = #string
* item[3].item[0].item[0].repeats = false
* item[3].item[0].item[0].required = false

* item[3].item[0].item[1].linkId = "Practitioner.identifier[0].value"
* item[3].item[0].item[1].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier.value"
* item[3].item[0].item[1].text = "ID Number"
* item[3].item[0].item[1].type = #string
* item[3].item[0].item[1].repeats = false
* item[3].item[0].item[1].required = false

* item[3].item[0].item[2].linkId = "Practitioner.identifier[0].type"
* item[3].item[0].item[2].definition = "http://hl7.org/fhir/StructureDefinition/Practitioner#Practitioner.identifier.type"
* item[3].item[0].item[2].text = "ID Type"
* item[3].item[0].item[2].type = #choice
* item[3].item[0].item[2].answerValueSet = "http://hl7.org/fhir/ValueSet/identifier-type"
* item[3].item[0].item[2].repeats = false
* item[3].item[0].item[2].required = false

