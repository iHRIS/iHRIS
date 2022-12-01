Profile:        IhrisBasicRegistration
Parent:         IhrisTrainingBasic
Id:             ihris-basic-registration
Title:          "iHRIS Registration"
Description:    "iHRIS Profile of the Basic resource for a Registration to the practioner."
* extension[training-basic].valueReference 1..1 MS
* extension[training-basic].valueReference ^label = "Training"
* extension contains
    IhrisRegistration named registration 0..1 MS 
* extension[registration].extension[registrationNumber].valueString 1..1 MS
* extension[registration].extension[registrationNumber].valueString ^label = "Registration Number"
* extension[registration].extension[registrationDate].valueDate 1..1 MS
* extension[registration].extension[registrationDate].valueDate ^label = "Registration Date"
* extension[registration].extension[cadre].valueCoding 1..1 MS
* extension[registration].extension[cadre].valueCoding ^label = "Cadre"
* extension[registration].extension[serialNumber].valueString 0..1 MS
* extension[registration].extension[serialNumber].valueString ^label = "Serial Number"

Extension:      IhrisRegistration
Id:             ihris-registration
Title:          "Registration details"
* extension contains
   registrationNumber 1..1 MS and
   registrationDate 1..1 MS and
   cadre 1..1 MS and
   endDate 1..1 MS and
   serialNumber 0..1 MS
* extension[registrationNumber].value[x] only string
* extension[registrationNumber].valueString 1..1 MS
* extension[registrationNumber].valueString ^label = "Registration Number" 
* extension[registrationDate].value[x] only date
* extension[registrationDate].valueDate 1..1 MS
* extension[registrationDate].valueDate ^label = "Registration Date" 
* extension[cadre].value[x] only Coding
* extension[cadre].valueCoding 1..1 MS
* extension[cadre].valueCoding ^label = "Cadre" 
* extension[cadre].valueCoding from IhrisCadre (required)
* extension[serialNumber].value[x] only string
* extension[serialNumber].valueString 0..1 MS
* extension[serialNumber].valueString ^label = "Serial Number"

Instance:       ihris-page-registration
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Registration Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-registration)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-training-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Training"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/training/FIELD"
* extension[display].extension[search][0].valueString = "Registration Number|Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-registration').extension.where(url='registrationNumber').valueString"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:training.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Registration"
* extension[section][0].extension[description].valueString = "Registration details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:training"
* extension[section][0].extension[field][1].valueString = "Basic.extension:registration.extension:registrationNumber.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:registration.extension:registrationDate.value[x]:valueDate"
* extension[section][0].extension[field][3].valueString = "Basic.extension:registration.extension:endDate.value[x]:valueCoding"
* extension[section][0].extension[field][4].valueString = "Basic.extension:registration.extension.serialNumber.value[x]:valueString"

Instance:       IhrisPractitionerWorkflowRegistration
InstanceOf:      Questionnaire
Usage:          #definition
* title = "iHRIS Registration Workflow"
* description = "iHRIS workflow to record a Registration"
* id = "ihris-registration"
* url = "http://ihris.org/fhir/Questionnaire/ihris-registration"
* name = "ihris-registration"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a Registration Information."

* item[0].linkId = "Basic"
* item[0].text = "Registration Information"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Registration Number"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Registration Date"
* item[0].item[1].type = #date
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Cadre"
* item[0].item[2].type = #choice
* item[0].item[2].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-cadre"
* item[0].item[2].required = true
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Serial Number"
* item[0].item[3].type = #string
* item[0].item[3].required = false
* item[0].item[3].repeats = false