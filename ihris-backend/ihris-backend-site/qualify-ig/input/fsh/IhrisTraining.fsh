Profile:        IhrisBasicTraining
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-training
Title:          "Training Information"
Description:    "iHRIS Profile of the Basic resource for Training."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisTraining named training 1..1 MS
* extension[training].extension[institution].valueCoding 1..1 MS
* extension[training].extension[institution].valueCoding ^label = "Training Institution"
* extension[training].extension[indexNumber].valueString ^label = "Index Number"
* extension[training].extension[indexNumber].valueString 1..1 MS
* extension[training].extension[intakeDate].valueDate ^label = "Intake date"
* extension[training].extension[intakeDate].valueDate 1..1 MS
* extension[training].extension[gradDate].valueDate ^label = "Graduation Date"
* extension[training].extension[gradDate].valueDate 1..1 MS
    
Extension:      IhrisTraining
Id:             ihris-training
Title:          "Training Information"
* extension contains
      institution 1..1 MS and
      indexNumber 0..1 MS and
      intakeDate 0..1 MS and
      gradDate 0..1 MS
* extension[institution].value[x] only Coding
* extension[institution].valueCoding from IhrisTrainingInstitutionValueSet
* extension[institution].valueCoding ^label = "Training Institution"
* extension[indexNumber].value[x] only string
* extension[indexNumber].valueString ^label = "Index Number"
* extension[indexNumber].valueString 1..1 MS
* extension[intakeDate].value[x] only date
* extension[intakeDate].valueDate ^label = "Intake Date"
* extension[gradDate].value[x] only date
* extension[gradDate].valueDate ^label = "Graduation Date"

CodeSystem:      IhrisTrainingInstitution
Id:              ihris-training-institution
Title:           "Institution"
* ^date = "2020-11-10T08:41:04.362Z"
* ^version = "0.3.0"

ValueSet:         IhrisTrainingInstitutionValueSet
Id:               ihris-training-institution-valueset
Title:            "iHRIS Institution Value Set"
* ^date = "2020-11-10T08:41:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisTrainingInstitution

Instance:       ihris-page-training-institution
InstanceOf:     IhrisPage
Title:          "Training Institution"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(CodeSystem/ihris-training-institution)
* extension[display].extension[search][0].valueString = "Code|code"
* extension[display].extension[search][1].valueString = "Display|display"
* extension[display].extension[search][2].valueString = "Region|region"
* extension[display].extension[field][0].extension[path].valueString = "CodeSystem.code"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Training Institution"
* extension[section][0].extension[description].valueString = "Training Institution"
* extension[section][0].extension[name].valueString = "CodeSystem"
* extension[section][0].extension[field][0].valueString = "CodeSystem.code"
* extension[section][0].extension[field][1].valueString = "CodeSystem.definition"
* extension[section][0].extension[field][2].valueString = "CodeSystem.display"

Instance:       IhrisPractitionerWorkflowTraining
InstanceOf:      Questionnaire
Usage:          #definition
* title = "iHRIS Training History Workflow"
* description = "iHRIS workflow to record a Training History"
* id = "ihris-training"
* url = "http://ihris.org/fhir/Questionnaire/ihris-training"
* name = "ihris-training"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a Training Information."

* item[0].linkId = "Basic"
* item[0].text = "Training Information"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-training-institution-valueset"
* item[0].item[0].text = "Institution"
* item[0].item[0].type = #choice
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Index number"
* item[0].item[1].type = #string
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Intake Date"
* item[0].item[2].type = #date
* item[0].item[2].required = true
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Graduation Date"
* item[0].item[3].type = #date
* item[0].item[3].required = true
* item[0].item[3].repeats = false

Instance:       ihris-page-training
InstanceOf:     IhrisPage
Title:          "Training History"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-training)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[link][1].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][1].extension[text].valueString = "Add Another"
* extension[display].extension[link][1].extension[button].valueBoolean = true
* extension[display].extension[link][1].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][1].extension[url].valueUrl = "/questionnaire/ihris-training/basic-training?practitioner=FIELD"
* extension[display].extension[search][0].valueString = "Institution|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-training').extension.where(url='institution').valueReference.reference"
* extension[display].extension[search][1].valueString = "Academic Level|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-training').extension.where(url='academicLevel').valueCoding.display"
* extension[display].extension[search][2].valueString = "Year|extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-training').extension.where(url='year').valueDate"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[display].extension[field][1].extension[path].valueString = "Basic.extension:training.extension:year.value[x]:valueDate"
* extension[display].extension[field][1].extension[type].valueString = "year"
* extension[section][0].extension[title].valueString = "Training Information"
* extension[section][0].extension[description].valueString = "Training Information details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:training.extension:institution.value[x]:valueCoding"
* extension[section][0].extension[field][2].valueString = "Basic.extension:training.extension:indexNumber.value[x]:valueString"
* extension[section][0].extension[field][3].valueString = "Basic.extension:training.extension:intakeDate.value[x]:valueDate"
* extension[section][0].extension[field][4].valueString = "Basic.extension:training.extension:gradDate.value[x]:valueDate"
* extension[section][1].extension[title].valueString = "Registration"
* extension[section][1].extension[description].valueString = "Registration for this training"
* extension[section][1].extension[name].valueString = "registration"
* extension[section][1].extension[resource].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-registration)
* extension[section][1].extension[resource].extension[searchfield].valueString = "training"
* extension[section][1].extension[resource].extension[linkfield].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-training-basic').valueReference.reference"
* extension[section][1].extension[resource].extension[column][0].extension[header].valueString = "Registration Number"
* extension[section][1].extension[resource].extension[column][0].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-registraion').extension.where(url='registrationNumber').valueString"
* extension[section][1].extension[resource].extension[column][1].extension[header].valueString = "Cadre"
* extension[section][1].extension[resource].extension[column][1].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-registraion').extension.where(url='cadre').valueCoding.display"
* extension[section][1].extension[resource].extension[column][2].extension[header].valueString = "Registration Date"
* extension[section][1].extension[resource].extension[column][2].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-registraion').extension.where(url='registrationDate').valueDate"
* extension[section][1].extension[resource].extension[column][3].extension[header].valueString = "Serial Number"
* extension[section][1].extension[resource].extension[column][3].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-registraion').extension.where(url='serialNumber').valueString"
* extension[section][1].extension[resource].extension[column][4].extension[header].valueString = "Actions"
* extension[section][1].extension[resource].extension[column][4].extension[field].valueString = "_action"
* extension[section][1].extension[resource].extension[action][0].extension[link].valueString = "/questionnaire/ihris-registration/registration?training=FHIRID"
* extension[section][1].extension[resource].extension[action][0].extension[text].valueString = "Add Registration"
* extension[section][1].extension[resource].extension[action][0].extension[row].valueBoolean = false
* extension[section][1].extension[resource].extension[action][0].extension[emptyDisplay].valueBoolean = true
* extension[section][1].extension[resource].extension[action][0].extension[condition].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-registraion').extension.where(url='registrationNumber').valueString.exists()"
* extension[section][1].extension[resource].extension[action][0].extension[class].valueString = "primary"
* extension[section][1].extension[resource].extension[action][1].extension[link].valueString = "/resource/view/registration/ITEMID"
* extension[section][1].extension[resource].extension[action][1].extension[text].valueString = "View"
* extension[section][1].extension[resource].extension[action][1].extension[row].valueBoolean = true
* extension[section][1].extension[resource].extension[action][1].extension[class].valueString = "primary"
* extension[section][2].extension[title].valueString = "Continuing Education"
* extension[section][2].extension[description].valueString = "Continuing Education for this training"
* extension[section][2].extension[name].valueString = "conteducation"
* extension[section][2].extension[resource].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-cont-education)
* extension[section][2].extension[resource].extension[searchfield].valueString = "training"
* extension[section][2].extension[resource].extension[linkfield].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-training-basic').valueReference.reference"
* extension[section][2].extension[resource].extension[column][0].extension[header].valueString = "Provider"
* extension[section][2].extension[resource].extension[column][0].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-cont-education').extension.where(url='provider').valueString"
* extension[section][2].extension[resource].extension[column][1].extension[header].valueString = "Course"
* extension[section][2].extension[resource].extension[column][1].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-cont-education').extension.where(url='courseName').valueString"
* extension[section][2].extension[resource].extension[column][2].extension[header].valueString = "Start Date"
* extension[section][2].extension[resource].extension[column][2].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-cont-education').extension.where(url='startDate').valueDate"
* extension[section][2].extension[resource].extension[column][3].extension[header].valueString = "End Date"
* extension[section][2].extension[resource].extension[column][3].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-cont-education').extension.where(url='endDate').valueDate"
* extension[section][2].extension[resource].extension[column][4].extension[header].valueString = "Credits"
* extension[section][2].extension[resource].extension[column][4].extension[field].valueString = "extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-cont-education').extension.where(url='credits').valueInteger"
* extension[section][2].extension[resource].extension[column][5].extension[header].valueString = "Actions"
* extension[section][2].extension[resource].extension[column][5].extension[field].valueString = "_action"
* extension[section][2].extension[resource].extension[action][0].extension[link].valueString = "/questionnaire/ihris-conteducation/cont-education?training=FHIRID"
* extension[section][2].extension[resource].extension[action][0].extension[text].valueString = "Add Continuing Education"
* extension[section][2].extension[resource].extension[action][0].extension[row].valueBoolean = false
* extension[section][2].extension[resource].extension[action][0].extension[emptyDisplay].valueBoolean = true
* extension[section][2].extension[resource].extension[action][0].extension[class].valueString = "primary"
* extension[section][2].extension[resource].extension[action][1].extension[link].valueString = "/resource/view/cont-education/ITEMID"
* extension[section][2].extension[resource].extension[action][1].extension[text].valueString = "View"
* extension[section][2].extension[resource].extension[action][1].extension[row].valueBoolean = true
* extension[section][2].extension[resource].extension[action][1].extension[class].valueString = "primary"