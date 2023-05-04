Profile:        IhrisBasicInServiceTraining
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-inservice-training
Title:          "iHRIS In-Service Training"
Description:    "iHRIS Profile of the Basic resource for a In-Service Training."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisInServiceTraining named inservicetraining 0..1 MS
* extension[inservicetraining].extension[provider].valueString 0..1 MS
* extension[inservicetraining].extension[provider].valueString ^label = "Provider" 
* extension[inservicetraining].extension[training].valueCoding 0..1 MS
* extension[inservicetraining].extension[training].valueCoding ^label = "In-Service Training Type/Category"
* extension[inservicetraining].extension[courseName].valueString 1..1 MS
* extension[inservicetraining].extension[courseName].valueString ^label = "In-Service Training Course Name"
* extension[inservicetraining].extension[credits].valueInteger 0..1 MS
* extension[inservicetraining].extension[credits].valueInteger ^label = "Credits"
* extension[inservicetraining].extension[startDate].valueDate 1..1 MS
* extension[inservicetraining].extension[startDate].valueDate ^label = "Start Date"
* extension[inservicetraining].extension[endDate].valueDate 0..1 MS
* extension[inservicetraining].extension[endDate].valueDate ^label = "End Date"


Extension:      IhrisInServiceTraining
Id:             ihris-inservice-training
Title:          "In-Service Training details"
* extension contains
   provider 0..1 MS and
   training 0..* MS and
   courseName 1..1 MS and
   credits 0..1 MS and
   startDate 0..1 MS and
   endDate 0..1 MS 
* extension[provider].value[x] only string
* extension[provider].valueString 0..1 MS
* extension[provider].valueString ^label = "Provider" 
* extension[training].value[x] only Coding
* extension[training].valueCoding 0..1 MS
* extension[training].valueCoding from IhrisTrainingValueSet (required)
* extension[training].valueCoding ^label = "In-Service Training Type/Category"
* extension[courseName].value[x] only string
* extension[courseName].valueString 0..1 MS
* extension[courseName].valueString ^label = "In-Service Training Course Name"
* extension[credits].value[x] only integer
* extension[credits].valueInteger 0..1 MS
* extension[credits].valueInteger ^label = "Credits" 
* extension[startDate].value[x] only date
* extension[startDate].valueDate 0..1 MS
* extension[startDate].valueDate ^label = "Start Date"
* extension[endDate].value[x] only date
* extension[endDate].valueDate 0..1 MS
* extension[endDate].valueDate ^label = "End Date" 


Instance:       ihris-page-inservice-training
InstanceOf:     IhrisPage
Title:          "iHRIS Basic In-Service Training Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-inservice-training)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Provider|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-inservice-training').extension.where(url='provider').valueString"
* extension[display].extension[search][1].valueString = "Course Name|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-inservice-training').extension.where(url='courseName').valueString"
* extension[display].extension[search][2].valueString = "Practitioner|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[search][3].valueString = "Start Date|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-inservice-training').extension.where(url='startDate').valueDate"
* extension[display].extension[search][4].valueString = "End Date|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-inservice-training').extension.where(url='endDate').valueDate"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:training.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "In-Service Training"
* extension[section][0].extension[description].valueString = "In-Service Training details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:inservicetraining.extension:provider.value[x]:valueString"
* extension[section][0].extension[field][2].valueString = "Basic.extension:inservicetraining.extension:training.value[x]:valueCoding"
* extension[section][0].extension[field][3].valueString = "Basic.extension:inservicetraining.extension:courseName.value[x]:valueString"
* extension[section][0].extension[field][4].valueString = "Basic.extension:inservicetraining.extension:credits.value[x]:valueInterger"
* extension[section][0].extension[field][5].valueString = "Basic.extension:inservicetraining.extension:startDate.value[x]:valueDate"
* extension[section][0].extension[field][5].valueString = "Basic.extension:inservicetraining.extension:endDate.value[x]:valueDate"

Instance:       ihris-page-training
InstanceOf:     IhrisPage
Title:          "iHRIS Training CodeSystem Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-training-codesystem)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[section][0].extension[title].valueString = "In-Service Training Type/Category"
* extension[section][0].extension[description].valueString = "In-Service Training"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.display"
* extension[section][0].extension[field][1].valueString = "CodeSystem.code"
* extension[section][0].extension[field][2].valueString = "CodeSystem.definition"

CodeSystem:      IhrisTrainingCodeSystem
Id:              ihris-training-codesystem
Title:           "In-Service Training"
* ^version = "0.2.0"

ValueSet:         IhrisTrainingValueSet
Id:               ihris-training-valueset
Title:            "iHRIS In-Service Training ValueSet"
* ^version = "0.2.0"
* codes from system IhrisTrainingCodeSystem

Instance:       IhrisPractitionerWorkflowInServiceTraining
InstanceOf:     Questionnaire
Usage:          #definition
* title = "iHRIS In-Service Training Workflow"
* description = "iHRIS workflow to record a In-Service Training"
* id = "ihris-inservice-training"
* url = "http://ihris.org/fhir/Questionnaire/ihris-inservice-training"
* name = "ihris-inservice-training"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a In-Service Training Information."

* item[0].linkId = "Basic"
* item[0].text = "In-Service Training Information"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "In-Service Training Provider"
* item[0].item[0].type = #string
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "In-Service Training Type/Category"
* item[0].item[1].type = #choice
* item[0].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-training-valueset"
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "In-Service Training Course Name"
* item[0].item[2].type = #string
* item[0].item[2].required = true
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Credits"
* item[0].item[3].type = #integer
* item[0].item[3].required = false
* item[0].item[3].repeats = false

* item[0].item[4].linkId = "Basic.extension[0].extension[4]"
* item[0].item[4].text = "Start Date"
* item[0].item[4].type = #date
* item[0].item[4].required = true
* item[0].item[4].repeats = false

* item[0].item[5].linkId = "Basic.extension[0].extension[5]"
* item[0].item[5].text = "End Date"
* item[0].item[5].type = #date
* item[0].item[5].required = true
* item[0].item[5].repeats = false
