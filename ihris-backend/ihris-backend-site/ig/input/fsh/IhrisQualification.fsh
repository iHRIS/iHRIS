Profile:        IhrisBasicQualification
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-qualification
Title:          "Professional Qualification Information"
Description:    "iHRIS Profile of the Basic resource for professional qualification information."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisQualification named qualification 1..1 MS
* extension[qualification].extension[qualification-name] ^label = "Qualification Name"
* extension[qualification].extension[qualification-name].valueString MS
* extension[qualification].extension[institution] ^label = "Institution"
* extension[qualification].extension[institution].valueString MS
* extension[qualification].extension[year-obtained] ^label = "Year Obtained"
* extension[qualification].extension[year-obtained].valueDate MS
* extension[qualification].extension[qualification-notes] ^label = "Additional Notes"
* extension[qualification].extension[qualification-notes].valueString 0..1

Extension: IhrisQualification
Id: ihris-qualification
Title: "iHRIS Professional Qualification Extension"
Description: "iHRIS extension for capturing professional qualification information for practitioners."
* extension contains
    qualification-name 1..1 MS and
    institution 1..1 MS and
    year-obtained 1..1 MS and
    qualification-notes 0..1 MS 
* extension[qualification-name].value[x] only string
* extension[qualification-name].valueString ^label = "Qualification Name"
* extension[institution].value[x] only string
* extension[institution].valueString ^label = "Institution"
* extension[year-obtained].value[x] only date
* extension[year-obtained].valueDate ^label = "Year Obtained"
* extension[qualification-notes].value[x] only string
* extension[qualification-notes].valueString ^label = "Additional Notes"

Instance:       IhrisPractitionerWorkflowQualification
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Qualification Workflow"
* description = "iHRIS workflow to record qualification"
* id = "ihris-qualification"
* url = "http://ihris.org/fhir/Questionnaire/ihris-qualification"
* name = "ihris-qualification"
* status = #active
* date = 2020-08-20
* purpose = "Workflow page for recording qualification information."

* item[0].linkId = "Basic"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-qualification"
* item[0].text = "Qualification Details"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0]"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-qualification#Basic.extension:qualification"
* item[0].item[0].text = "Details"
* item[0].item[0].type = #group

* item[0].item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-qualification#Basic.extension:qualification.extension:qualification-name.value[x]:valueString"
* item[0].item[0].item[0].text = "Qualification Name"
* item[0].item[0].item[0].type = #string
* item[0].item[0].item[0].required = true
* item[0].item[0].item[0].repeats = false

* item[0].item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-qualification#Basic.extension:qualification.extension:institution.value[x]:valueString"
* item[0].item[0].item[1].text = "Institution"
* item[0].item[0].item[1].type = #string
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false

* item[0].item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-qualification#Basic.extension:qualification.extension:year-obtained.value[x]:valueDate"
* item[0].item[0].item[2].text = "Year Obtained"
* item[0].item[0].item[2].type = #date
* item[0].item[0].item[2].required = true
* item[0].item[0].item[2].repeats = false

* item[0].item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-qualification#Basic.extension:qualification.extension:qualification-notes.value[x]:valueString"
* item[0].item[0].item[3].text = "Additional Notes"
* item[0].item[0].item[3].type = #text
* item[0].item[0].item[3].required = false
* item[0].item[0].item[3].repeats = false

Instance:       ihris-page-qualification
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Qualification Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-qualification)
* extension[display].extension[link].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link].extension[text].valueString = "View Health Worker"
* extension[display].extension[link].extension[button].valueBoolean = true
* extension[display].extension[link].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Qualification|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-qualification').extension.where(url='qualification-name').valueString"
* extension[display].extension[search][1].valueString = "Institution|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-qualification').extension.where(url='institution').valueString"
* extension[display].extension[search][2].valueString = "Year Obtained|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-qualification').extension.where(url='year-obtained').valueDate"
* extension[display].extension[search][3].valueString = "Practitioner|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[section][0].extension[title].valueString = "Professional Qualification"
* extension[section][0].extension[description].valueString = "Professional Qualification Information details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:qualification.extension:qualification-name.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:qualification.extension:institution.value[x]:valueString"
* extension[section][0].extension[field][3].valueString = "Basic.extension:qualification.extension:year-obtained.value[x]:valueDate"
* extension[section][0].extension[field][4].valueString = "Basic.extension:qualification.extension:qualification-notes.value[x]:valueString"