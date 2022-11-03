Profile:        IhrisBasicDeployment
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-deployment
Title:          "iHRIS Deployment"
Description:    "iHRIS Profile of the Basic resource for a Deployment to the practioner."
* extension[practitioner].valueReference 0..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisDeployment named deployment 1..1 MS 
* extension[deployment].extension[healthFacility].valueReference 1..1 MS
* extension[deployment].extension[healthFacility].valueReference ^label = "Health Facility"
* extension[deployment].extension[date].valueDate 1..1 MS
* extension[deployment].extension[date].valueDate ^label = "Deployment Date"
* extension[deployment].extension[jobTitle].valueCoding 0..1 MS
* extension[deployment].extension[jobTitle].valueCoding ^label = "Job Title"

Extension:      IhrisDeployment
Id:             ihris-deployment
Title:          "Deployment details"
* extension contains
   healthFacility 1..1 MS and
   date 0..1 MS and
   jobTitle 0..1 MS
* extension[healthFacility].value[x] only Reference
* extension[healthFacility].valueReference only Reference(IhrisFacility) 
* extension[healthFacility].valueReference 1..1 MS
* extension[healthFacility].valueReference ^label = "Health Facility" 
* extension[date].value[x] only date
* extension[date].valueDate 1..1 MS
* extension[date].valueDate ^label = "Deployment Date" 
* extension[jobTitle].value[x] only Coding
* extension[jobTitle].valueCoding 0..1 MS
* extension[jobTitle].valueCoding ^label = "Job Title"
* extension[jobTitle].valueCoding from http://ihris.org/fhir/ValueSet/ihris-job (required)

Instance:       ihris-page-deployment
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Deployment Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-deployment)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Deploymentd Staff"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[search][0].valueString = "Practitioner|Basic.extension:practitioner"
* extension[display].extension[search][1].valueString = "Job Title|Basic.extension:deployment.extension.jobTitle.value[x]:valueCoding"
* extension[display].extension[search][2].valueString = "Practitioner|PractitionerRole.practitioner"
* extension[display].extension[search][3].valueString = "Facility|Basic.extension:deployment.extension:healthFacility.value[x]:valueReference"
* extension[display].extension[search][4].valueString = "Start Date|Basic.extension:deployment.extension:date.value[x]:valueDate"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Deployment"
* extension[section][0].extension[description].valueString = "Deployment Information"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:deployment.extension:healthFacility.value[x]:valueReference"
* extension[section][0].extension[field][2].valueString = "Basic.extension:deployment.extension:date.value[x]:valueDate"
* extension[section][0].extension[field][3].valueString = "Basic.extension:deployment.extension.jobTitle.value[x]:valueCoding"

Instance:       IhrisPractitionerWorkflowDeployment
InstanceOf:      Questionnaire
Usage:          #definition
* title = "iHRIS Deployment Workflow"
* description = "iHRIS workflow to record a Deployment"
* id = "ihris-deployment"
* url = "http://ihris.org/fhir/Questionnaire/ihris-deployment"
* name = "ihris-deployment"
* status = #active
* date = 2020-08-27
* purpose = "Workflow page for recording a Deployment Information."

* item[0].linkId = "Basic"
* item[0].text = "Deployment Information"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Health Facility"
* item[0].item[0].type = #reference
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Date"
* item[0].item[1].type = #date
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Job Title"
* item[0].item[2].type = #choice
* item[0].item[2].answerValueSet = "http://ihris.org/fhir/ValueSet/ihris-job"
* item[0].item[2].required = false
* item[0].item[2].repeats = false