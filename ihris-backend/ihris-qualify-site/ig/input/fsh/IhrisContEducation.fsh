Profile:        IhrisBasicContEducation
Parent:         IhrisTrainingBasic
Id:             ihris-basic-cont-education
Title:          "iHRIS Continuing Education"
Description:    "iHRIS Profile of the Basic resource for a Continuing Education."
* extension[training].valueReference 0..1 MS
* extension[training].valueReference ^label = "Training"
* extension contains
    IhrisContEducation named conteducation 0..1 MS
* extension[conteducation].extension[provider].valueString 0..1 MS
* extension[conteducation].extension[provider].valueString ^label = "Provider" 
* extension[conteducation].extension[courseName].valueString 1..1 MS
* extension[conteducation].extension[courseName].valueString ^label = "Continuing Education Course Name"
* extension[conteducation].extension[credits].valueInteger 0..1 MS
* extension[conteducation].extension[credits].valueInteger ^label = ""
* extension[conteducation].extension[startDate].valueDate 1..1 MS
* extension[conteducation].extension[startDate].valueDate ^label = "Start Date"
* extension[conteducation].extension[endDate].valueDate 0..1 MS
* extension[conteducation].extension[endDate].valueDate ^label = "End Date"


Extension:      IhrisContEducation
Id:             ihris-cont-education
Title:          "Continuing Education details"
* extension contains
   provider 0..1 MS and
   courseName 1..1 MS and
   credits 0..1 MS and
   startDate 0..1 MS and
   endDate 0..1 MS 
* extension[provider].value[x] only string
* extension[provider].valueString 0..1 MS
* extension[provider].valueString ^label = "Provider" 
* extension[courseName].value[x] only string
* extension[courseName].valueString 0..1 MS
* extension[courseName].valueString ^label = "Continuing Education Course Name"
* extension[credits].value[x] only integer
* extension[credits].valueInteger 0..1 MS
* extension[credits].valueInteger ^label = "Credits" 
* extension[startDate].value[x] only date
* extension[startDate].valueDate 0..1 MS
* extension[startDate].valueDate ^label = "Start Date"
* extension[endDate].value[x] only date
* extension[endDate].valueDate 0..1 MS
* extension[endDate].valueDate ^label = "End Date" 


Instance:       ihris-page-cont-education
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Continuing Education Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-cont-education)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-training-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Training"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/training/FIELD"
* extension[display].extension[search][0].valueString = "Provider|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-cont-education').extension.where(url='provider').valueString"
* extension[display].extension[search][0].valueString = "Course Name|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-cont-education').extension.where(url='courseName').valueString"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:training.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Continuing Education"
* extension[section][0].extension[description].valueString = "Continuing Education details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:training"
* extension[section][0].extension[field][1].valueString = "Basic.extension:conteducation.extension:provider.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:conteducation.extension:courseName.value[x]:valueString"
* extension[section][0].extension[field][3].valueString = "Basic.extension:conteducation.extension:credits.value[x]:valueInterger"
* extension[section][0].extension[field][4].valueString = "Basic.extension:conteducation.extension:startDate.value[x]:valueDate"
* extension[section][0].extension[field][5].valueString = "Basic.extension:conteducation.extension:endDate.value[x]:valueDate"

Instance:       IhrisPractitionerWorkflowContEducation
InstanceOf:     Questionnaire
Usage:          #definition
* title = "iHRIS Continuing Education Workflow"
* description = "iHRIS workflow to record a Continuing Education"
* id = "ihris-conteducation"
* url = "http://ihris.org/fhir/Questionnaire/ihris-conteducation"
* name = "ihris-conteducation"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a Continuing Education Information."

* item[0].linkId = "Basic"
* item[0].text = "Continuing Education Information"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Provider"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Course Name"
* item[0].item[1].type = #string
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[1]"
* item[0].item[2].text = "Credits"
* item[0].item[2].type = #integer
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[2]"
* item[0].item[3].text = "Start Date"
* item[0].item[3].type = #date
* item[0].item[3].required = true
* item[0].item[3].repeats = false

* item[0].item[4].linkId = "Basic.extension[0].extension[3]"
* item[0].item[4].text = "End Date"
* item[0].item[4].type = #date
* item[0].item[4].required = true
* item[0].item[4].repeats = false
