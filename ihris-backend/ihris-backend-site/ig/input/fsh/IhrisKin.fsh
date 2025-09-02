Profile:        IhrisBasicKin
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-kin
Title:          "Next of Kin Information"
Description:    "iHRIS Profile of the Basic resource for next of kin information."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisKin named kin 1..1 MS
* extension[kin].extension[kin-name] ^label = "Full Name"
* extension[kin].extension[kin-name].valueString MS
* extension[kin].extension[kin-phone] ^label = "Phone Number"
* extension[kin].extension[kin-phone].valueString MS
* extension[kin].extension[kin-email] ^label = "Email"
* extension[kin].extension[kin-email].valueString 0..1
* extension[kin].extension[kin-email].valueString MS
* extension[kin].extension[kin-notes] ^label = "Additional Notes"
* extension[kin].extension[kin-notes].valueString 0..1

Extension: IhrisKin
Id: ihris-kin
Title: "iHRIS Next of Kin Information Extension"
Description: "iHRIS extension for capturing next of kin information for practitioners."
* extension contains
    kin-name 1..1 MS and
    kin-phone 1..1 MS and
    kin-email 0..1 MS and
    kin-notes 0..1 MS 
* extension[kin-name].value[x] only string
* extension[kin-name].valueString ^label = "Full Name"
* extension[kin-phone].value[x] only string
* extension[kin-phone].valueString ^label = "Phone Number"
* extension[kin-email].value[x] only string
* extension[kin-email].valueString ^label = "Email"
* extension[kin-notes].value[x] only string
* extension[kin-notes].valueString ^label = "Additional Notes"

Instance:       IhrisPractitionerWorkflowKin
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Kin Workflow"
* description = "iHRIS workflow to record kin"
* id = "ihris-kin"
* url = "http://ihris.org/fhir/Questionnaire/ihris-kin"
* name = "ihris-kin"
* status = #active
* date = 2020-08-20
* purpose = "Workflow page for recording kin information."

* item[0].linkId = "Basic"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-kin"
* item[0].text = "kin Details"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0]"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-kin#Basic.extension:kin"
* item[0].item[0].text = "Details"
* item[0].item[0].type = #group

* item[0].item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-kin#Basic.extension:kin.extension:kin-name.value[x]:valueString"
* item[0].item[0].item[0].text = "Full Name"
* item[0].item[0].item[0].type = #string
* item[0].item[0].item[0].required = true
* item[0].item[0].item[0].repeats = false

* item[0].item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-kin#Basic.extension:kin.extension:kin-phone.value[x]:valueString"
* item[0].item[0].item[1].text = "Phone Number"
* item[0].item[0].item[1].type = #string
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false

* item[0].item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-kin#Basic.extension:kin.extension:kin-email.value[x]:valueString"
* item[0].item[0].item[2].text = "Email"
* item[0].item[0].item[2].type = #string
* item[0].item[0].item[2].required = false
* item[0].item[0].item[2].repeats = false

* item[0].item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-basic-kin#Basic.extension:kin.extension:kin-notes.value[x]:valueString"
* item[0].item[0].item[3].text = "Additional Notes"
* item[0].item[0].item[3].type = #text
* item[0].item[0].item[3].required = false
* item[0].item[0].item[3].repeats = false

Instance:       ihris-page-kin
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Kin Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-kin)
* extension[display].extension[link].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link].extension[text].valueString = "View Health Worker"
* extension[display].extension[link].extension[button].valueBoolean = true
* extension[display].extension[link].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Full Name|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-kin').extension.where(url='kin-name').valueString"
* extension[display].extension[search][1].valueString = "Phone Number|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-kin').extension.where(url='kin-phone').valueString"
* extension[display].extension[search][2].valueString = "Email|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-kin').extension.where(url='kin-email').valueString"
* extension[display].extension[search][3].valueString = "Practitioner|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[section][0].extension[title].valueString = "Next of Kin"
* extension[section][0].extension[description].valueString = "Next of Kin Information details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:kin.extension:kin-name"
* extension[section][0].extension[field][2].valueString = "Basic.extension:kin.extension:kin-phone"
* extension[section][0].extension[field][3].valueString = "Basic.extension:kin.extension:kin-email"
* extension[section][0].extension[field][4].valueString = "Basic.extension:kin.extension:kin-notes"

Instance:       ihris-page-kin-relationship
InstanceOf:     IhrisPage
Title:          "iHRIS Kin Relationship CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-kin-relationship-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[section][0].extension[title].valueString = "Kin Relationship Type"
* extension[section][0].extension[description].valueString = "Kin Relationship Type"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"