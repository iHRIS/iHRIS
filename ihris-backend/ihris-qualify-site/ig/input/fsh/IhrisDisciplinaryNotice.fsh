Profile:        IhrisBasicDiscipline
Parent:         IhrisPractitionerBasic
Id:             ihris-basic-discipline
Title:          "Discipline Information"
Description:    "iHRIS Profile of the Basic resource for Discipline."
* extension[practitioner].valueReference 1..1 MS
* extension[practitioner].valueReference ^label = "Health Worker"
* extension contains
    IhrisDiscipline named discipline 1..1 MS
* extension[discipline] ^label = "Discipline Notice"
* extension[discipline].extension[suspend].valueBoolean 1..1 MS
* extension[discipline].extension[actionDate].valueDate 1..1 MS
* extension[discipline].extension[reason].valueString 1..1 MS
* extension[discipline].extension[remark].valueString 0..1 MS
    
Extension:      IhrisDiscipline
Id:             ihris-discipline
Title:          "Discipline details"
* extension contains
    suspend 1..1 MS and
    actionDate 1..1 MS and
    reason 1..1 MS and
    remark 0..1 MS
* extension[actionDate].value[x] only date
* extension[actionDate].valueDate 1..1 MS
* extension[actionDate].valueDate ^label = "Date of Disciplinary Action"
* extension[suspend].value[x] only boolean
* extension[suspend].valueBoolean MS
* extension[suspend].valueBoolean ^label = "Suspend?"
* extension[reason].value[x] only string
* extension[reason].valueString 1..1 MS
* extension[reason].valueString ^label = "Reason"
* extension[remark].value[x] only string
* extension[remark].valueString 0..1 MS
* extension[remark].valueString ^label = "Remark"

Instance:       IhrisPractitionerWorkflowDiscipline
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Discipline Workflow"
* description = "iHRIS workflow to record a Discipline"
* id = "ihris-discipline"
* url = "http://ihris.org/fhir/Questionnaire/ihris-discipline"
* name = "ihris-discipline"
* status = #active
* date = 2020-09-02
* purpose = "Workflow page for recording a Discipline information."

* item[0].linkId = "Basic"
* item[0].text = "Disciplinary Notice"
* item[0].type = #group

* item[0].item[0].linkId = "Basic.extension[0].extension[0]"
* item[0].item[0].text = "Diciplinary Action Date"
* item[0].item[0].type = #dateTime
* item[0].item[0].required = true
* item[0].item[0].repeats = false

* item[0].item[1].linkId = "Basic.extension[0].extension[1]"
* item[0].item[1].text = "Reason"
* item[0].item[1].type = #text
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Basic.extension[0].extension[2]"
* item[0].item[2].text = "Remark"
* item[0].item[2].type = #text
* item[0].item[2].required = false
* item[0].item[2].repeats = false

* item[0].item[3].linkId = "Basic.extension[0].extension[3]"
* item[0].item[3].text = "Suspend?"
* item[0].item[3].type = #boolean
* item[0].item[3].required = true
* item[0].item[3].repeats = false

Instance:       ihris-page-discipline
InstanceOf:     IhrisPage
Title:          "iHRIS Basic Discipline Page"
Usage:          #example
* code = IhrisResourceCodeSystem#page
* extension[display].extension[resource].valueReference = Reference(StructureDefinition/ihris-basic-discipline)
* extension[display].extension[link][0].extension[field].valueString = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference').valueReference.reference"
* extension[display].extension[link][0].extension[text].valueString = "View Health Worker"
* extension[display].extension[link][0].extension[button].valueBoolean = true
* extension[display].extension[link][0].extension[icon].valueString = "mdi-account-arrow-right"
* extension[display].extension[link][0].extension[url].valueUrl = "/resource/view/practitioner/FIELD"
* extension[display].extension[field][0].extension[path].valueString = "Basic.extension:practitioner.value[x]:valueReference"
* extension[display].extension[field][0].extension[readOnlyIfSet].valueBoolean = true
* extension[section][0].extension[title].valueString = "Disciplinary Notice"
* extension[section][0].extension[description].valueString = "Disciplinary Notice details"
* extension[section][0].extension[name].valueString = "Basic"
* extension[section][0].extension[field][0].valueString = "Basic.extension:practitioner"
* extension[section][0].extension[field][1].valueString = "Basic.extension:discipline.extension:actionDate.value[x]:valueDate"
* extension[section][0].extension[field][2].valueString = "Basic.extension:discipline.extension:reason.value[x]:valueString"
* extension[section][0].extension[field][3].valueString = "Basic.extension:discipline.extension:remark.value[x]:valueString"
* extension[section][0].extension[field][4].valueString = "Basic.extension:discipline.extension:suspend.value[x]:valueBoolean"
