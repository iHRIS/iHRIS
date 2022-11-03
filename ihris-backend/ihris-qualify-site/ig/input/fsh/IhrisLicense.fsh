Profile:        IhrisBasicLicense
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-license
Title:          "iHRIS License"
Description:    "iHRIS Profile of the Basic resource for a License to the practioner."
* extension[practitioner].valueReference 0..1 MS
* extension[practitioner].valueReference ^label = "Licensed Staff"
* extension contains
    IhrisLicense named license 0..1 MS 
* extension[license].extension[licenseNumber].valueString 1..1 MS
* extension[license].extension[licenseNumber].valueString ^label = "License Number"
* extension[license].extension[startDate].valueDate 1..1 MS
* extension[license].extension[startDate].valueDate ^label = "Start Date"
* extension[license].extension[endDate].valueDate 0..1 MS
* extension[license].extension[endDate].valueDate ^label = "End Date"
* extension[license].extension[serialNumber].valueString 0..1 MS
* extension[license].extension[serialNumber].valueString ^label = "Serial Number"

Extension:      IhrisLicense
Id:             ihris-license
Title:          "License details"
* extension contains
   licenseNumber 1..1 MS and
   startDate 1..1 MS and
   endDate 0..1 MS and
   serialNumber 0..1 MS
* extension[licenseNumber].value[x] only string
* extension[licenseNumber].valueString 1..1 MS
* extension[licenseNumber].valueString ^label = "License Number" 
* extension[startDate].value[x] only date
* extension[startDate].valueDate 1..1 MS
* extension[startDate].valueDate ^label = "Start Date" 
* extension[endDate].value[x] only date
* extension[endDate].valueDate 0..1 MS
* extension[endDate].valueDate ^label = "End Date" 
* extension[serialNumber].value[x] only string
* extension[serialNumber].valueString 0..1 MS
* extension[serialNumber].valueString ^label = "Serial Number"

Instance:       ihris-page-license
InstanceOf:     IhrisPage
Title:          "iHRIS Basic License Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-license)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Licensed Staff"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "License Number|Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-license').extension.where(url='licenseNumber').valueString"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "License"
* extension[section][0].extension[description].valueString = "License details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:license.extension:licenseNumber.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:license.extension:startDate.value[x]:valueDate"
* extension[section][0].extension[field][3].valueString = "Basic.extension:license.extension:endDate.value[x]:valueDate"
* extension[section][0].extension[field][4].valueString = "Basic.extension:license.extension.serialNumber.value[x]:valueString"

Instance:       IhrisPractitionerWorkflowLicense
InstanceOf:      Questionnaire
Usage:          #definition
* title = "iHRIS License Workflow"
* description = "iHRIS workflow to record a License"
* id = "ihris-license"
* url = "http://ihris.org/fhir/Questionnaire/ihris-license"
* name = "ihris-license"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a License Information."

* item[0].linkId = "Basic"
* item[0].text = "License Information"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "License Number"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Start Date"
* item[0].item[1].type = #date
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "End date"
* item[0].item[2].type = #date
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Serial Number"
* item[0].item[3].type = #string
* item[0].item[3].required = false
* item[0].item[3].repeats = false

Instance:       IhrisPractitionerWorkflowRenewLicense
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "Renew License Workflow"
* description = "workflow to renew a license"
* id = "ihris-renew-license"
* url = "http://ihris.org/fhir/Questionnaire/ihris-renew-license"
* name = "ihris-renew-license"
* status = #active
* date = 2020-08-09
* purpose = "Workflow page for renewing a license"

* item[0].linkId = "Basic"
* item[0].text = "Renew License"
* item[0].type = #group

* item[0].item[0].linkId = "startDate"
* item[0].item[0].text = "Start Date"
* item[0].item[0].type = #date
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "endDate"
* item[0].item[1].text = "End Date"
* item[0].item[1].type = #date
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "serialNumber"
* item[0].item[2].text = "Serial Number"
* item[0].item[2].type = #string
* item[0].item[2].required = false
* item[0].item[2].repeats = false