Profile:        DependentInformationProfile
Parent:         IhrisPractitionerBasic
Id:             dependent-information-profile
Title:          "Dependent Information"
Description:    "Dependent Information Profile."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Practitioner"
* extension contains
    PractitionerSurname named surname 1..1 MS and
    PractitionerGivenName named given 1..* MS and
    PractitionerGender named gender  0..1 MS and
    PractitionerBirthdate named birthdate 0..1 MS and
    DependentRelationship named relationship 1..1 MS and
    DependentStatus named status 0..1 MS
* extension[surname]  1..1 MS
* extension[surname]  ^label = "Surname"
* extension[surname].valueString MS
* extension[given]  1..* MS
* extension[given]  ^label = "Given Name(s)"
* extension[given].valueString MS
* extension[gender]  0..1 MS
* extension[gender]  ^label = "Gender"
* extension[gender].valueCoding MS
* extension[birthdate]  0..1 MS
* extension[birthdate]  ^label = "Birth Date"
* extension[birthdate].valueDate MS
* extension[relationship]  1..1 MS
* extension[relationship]  ^label = "Dependent Relationship"
* extension[relationship].valueCoding MS
* extension[status]  1..1 MS
* extension[status]  ^label = "Dependent Status"
* extension[status].valueCoding MS

Extension:      PractitionerSurname
Id:             practitioner-surname
Title:          "Practitioner Surname"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Surname"

Extension:      PractitionerGivenName
Id:             practitioner-given-name
Title:          "Practitioner Given Name"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Given Name"

Extension:      PractitionerGender
Id:             practitioner-gender
Title:          "Practitioner Gender"
Description:    "Practitioner Gender."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Gender"
* valueCoding from http://ihris.org/fhir/ValueSet/gender-valueset (required)

Extension:      PractitionerBirthdate
Id:             practitioner-birthdate
Title:          "Practitioner Birthdate"
Description:    "Practitioner Birthdate."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only date
* valueDate 1..1 MS
* valueDate ^label = "Birth Date"

Extension:      DependentRelationship
Id:             dependent-relationship
Title:          "Dependent Relationship"
Description:    "Dependent Relationship."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Relationship"
* valueCoding from http://ihris.org/fhir/ValueSet/dependent-relationship-valueset (required)

Extension:      DependentStatus
Id:             dependent-status
Title:          "Dependent Status"
Description:    "Dependent Status."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Dependent Status"
* valueCoding from http://ihris.org/fhir/ValueSet/dependent-status-valueset (required)

Instance:       DependentInformation
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Dependent Information Workflow"
* description = "iHRIS workflow to record a Dependent Information"
* id = "dependent-information"
* url = "http://ihris.org/fhir/Questionnaire/dependent-information"
* name = "dependent-information"
* status = #active
* date = 2020-09-02
* purpose = "Dependent information."

* item[0].linkId = "Basic"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/dependent-information-profile"
* item[0].text = "Dependent"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0]"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/dependent-information-profile#Basic.extension:surname.value[x]:valueString"
* item[0].item[0].text = "Surname"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[1]"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/dependent-information-profile#Basic.extension:given.value[x]:valueString"
* item[0].item[1].text = "Given Name(s)"
* item[0].item[1].type = #string
* item[0].item[1].required = true
* item[0].item[1].repeats = true

* item[0].item[2].linkId = "Basic.extension[2]"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/dependent-information-profile#Basic.extension:gender.value[x]:valueCoding"
* item[0].item[2].text = "Gender"
* item[0].item[2].type = #choice
* item[0].item[2].answerValueSet = "http://ihris.org/fhir/ValueSet/gender-valueset"
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[3]"
* item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/dependent-information-profile#Basic.extension:birthdate.value[x]:valueDate"
* item[0].item[3].text = "Date of Birth"
* item[0].item[3].type = #date
* item[0].item[3].required = false
* item[0].item[3].repeats = false

* item[0].item[4].linkId = "Basic.extension[4]"
* item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/dependent-information-profile#Basic.extension:relationship.value[x]:valueCoding"
* item[0].item[4].text = "Dependent Relationship"
* item[0].item[4].type = #choice
* item[0].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/dependent-relationship-valueset"
* item[0].item[4].required = true
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "Basic.extension[5]"
* item[0].item[5].definition = "http://ihris.org/fhir/StructureDefinition/dependent-information-profile#Basic.extension:status.value[x]:valueCoding"
* item[0].item[5].text = "Dependent Status"
* item[0].item[5].type = #choice
* item[0].item[5].answerValueSet = "http://ihris.org/fhir/ValueSet/dependent-status-valueset"
* item[0].item[5].required = false
* item[0].item[5].repeats = false

Instance:       ihris-page-dependent-information
InstanceOf:     IhrisPage
Title:          "Dependent Information Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/dependent-information-profile)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Dependent Name|extension.where(url='http://ihris.org/fhir/StructureDefinition/practitioner-surname').valueString"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Dependent Information"
* extension[section][0].extension[description].valueString = "Dependent Information"
* extension[section][0].extension[name].valueString = "dependentinformation"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:surname"
* extension[section][0].extension[field][2].valueString = "Basic.extension:given"
* extension[section][0].extension[field][3].valueString = "Basic.extension:gender"
* extension[section][0].extension[field][4].valueString = "Basic.extension:birthdate"
* extension[section][0].extension[field][5].valueString = "Basic.extension:relationship"
* extension[section][0].extension[field][6].valueString = "Basic.extension:status"